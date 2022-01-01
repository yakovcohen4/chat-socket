const cors = require('cors');
const http = require('http');
const express = require('express');
const app = express();

app.use(cors('*'));
app.use(express.json());
const server = http.createServer(app);
const PORT = 4000;

// DB
// let connectedUsers = require('./database');

//Routers
const usersRouter = require('./routers/userRouter');
// const { chat } = require('./controller/chat');

//MiddleWares
const { errorHandlerMiddleware } = require('./middlewares/errorHandler');

const io = require('socket.io')(server, {
  cors: {
    origin: [`http://localhost:3000`],
  },
});
// module.exports = io;

// add user to DB
app.use('/users', usersRouter);

// Connection
const rooms = ['general', 'room1', 'room2'];
let connectedUsers = [];
let countUsersOnline = 0;

io.on('connection', socket => {
  const userName = socket.handshake.auth.user;
  const room = socket.handshake.auth.room;
  const id = socket.id;
  console.log('new connect with ' + id + ' ' + userName);

  //Push User
  const user = {
    id: id,
    name: userName,
  };
  connectedUsers.push(user);
  countUsersOnline++;

  // send user name
  socket.emit('online', connectedUsers);
  console.log(connectedUsers);

  // Sens message - user connect
  socket.broadcast.emit('messageBack', {
    name: userName,
    message: 'connect',
    room: room,
  });

  // user send message
  socket.on('message', ({ name, message, room }) => {
    io.emit('messageBack', { name, message, room });
  });

  // rooms
  socket.on('create', function (room) {
    console.log(room);
    if (rooms.includes(room)) {
      socket.join(room);
      return socket.emit('you join room');
    } else {
      return socket.emit('error not found room');
    }
  });

  // user send private message
  // socket.on('privateMessage',{})

  // user disconnect
  socket.on('disconnect', () => {
    //  delete the user that disconnected
    let pos = connectedUsers
      .map(function (e) {
        return e.id;
      })
      .indexOf(id);

    connectedUsers.splice(pos, 1);
    countUsersOnline--;

    socket.emit('online', { connectedUsers });
    io.emit('messageBack', {
      name: userName,
      message: 'disconnect',
      room: room,
    });
  });
});

app.use(errorHandlerMiddleware);

server.listen(PORT, function () {
  console.log(`listening on port ${PORT}`);
});

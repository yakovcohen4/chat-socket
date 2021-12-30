const cors = require('cors');
const http = require('http');
const express = require('express');
const app = express();

app.use(cors('*'));
app.use(express.json());
const server = http.createServer(app);
const PORT = 4000;

//Routers
const usersRouter = require('./routers/userRouter');

//MiddleWares
const { errorHandlerMiddleware } = require('./middlewares/errorHandler');

const io = require('socket.io')(server, {
  cors: {
    origin: [`http://localhost:3000`],
  },
});

const connectedUsers = require('./database');

app.use('/users', usersRouter);

io.on('connection', socket => {
  console.log('new connect with ' + socket.id);
  const userName = socket.handshake.auth.user;

  // user connect
  socket.broadcast.emit('messageBack', { name: userName, message: 'connect' });

  // user send message
  socket.on('message', ({ name, message }) => {
    io.emit('messageBack', { name, message });
  });

  // user disconnect
  socket.on('disconnect', () => {
    io.emit('messageBack', { name: userName, message: 'disconnect' });
  });
});

app.use(errorHandlerMiddleware);

server.listen(PORT, function () {
  console.log(`listening on port ${PORT}`);
});

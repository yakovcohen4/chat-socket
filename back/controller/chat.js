const connectedUsers = require('../database');
// const io = require('../index');
const io = require('socket.io');

exports.chat = socket => {
  console.log('new connect with ' + socket.id);
  const userName = socket.handshake.auth.user;
  console.log(userName);

  // user connect
  socket.broadcast.emit('messageBack', {
    name: userName,
    message: 'connect',
  });

  // users-online
  // socket.on('online,'({name})=>{
  //   io.emit
  // })
  //   socket.emit('online', { listOfUsers: connectedUsers });

  // user send message
  socket.on('message', ({ name, message }) => {
    console.log(name);
    console.log(message);
    console.log(io);
    io.emit('messageBack', { name, message });
  });

  // user disconnect
  socket.on('disconnect', () => {
    //   users = connectedUsers.filter(user => user.name !== userName);
    io.emit('messageBack', { name: userName, message: 'disconnect' });
  });
};

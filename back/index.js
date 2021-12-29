const cors = require('cors');
const http = require('http');
const app = require('express')();

app.use(cors('*'));
const server = http.createServer(app);
const PORT = 4000;

const io = require('socket.io')(server, {
  cors: {
    origin: [`http://localhost:3000`],
  },
});

io.on('connection', socket => {
  console.log('new connect with ' + socket.id);
  socket.on('message', ({ name, message }) => {
    io.emit('messageBack', { name, message });
  });

  socket.on('disconnect', () => {
    io.emit('messageBack', { name: 'wow', message: 'render' });
  });
});

server.listen(PORT, function () {
  console.log(`listening on port ${PORT}`);
});

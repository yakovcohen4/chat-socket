const app = require('express')();
const cors = require('cors');
app.use(cors('*'));
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const PORT = 3000;

io.on('connection', socket => {
  socket.on('message', ({ name, message }) => {
    io.emit('messageBack', { name, message });
  });

  socket.on('disconnect', () => {
    io.emit('messageBack', { name: 'wow', message: 'render' });
  });
});

http.listen(PORT, function () {
  console.log(`listening on port ${PORT}`);
});

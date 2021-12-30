const connectedUsers = require('../database');

exports.login = (req, res) => {
  const { userName } = req.body;
  console.log(connectedUsers);

  if (connectedUsers.includes(userName)) {
    console.log('you cant get');
    throw { status: 409, message: 'Username already exits' };
  }

  connectedUsers.push(userName);

  res.send('You log in');
};

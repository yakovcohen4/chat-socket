const express = require('express');
const router = express.Router();
const { login } = require('../controller/user');

// localhost:4000/users

router.post('/login', login);

module.exports = router;

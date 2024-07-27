const express = require('express');
const router = express.Router();
const {register, login} = require('../services/UserService');

router.post('/register', register);
router.post('/login', login);

module.exports = router;

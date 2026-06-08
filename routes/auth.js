const express = require('express');
const router = express.Router();

const  login  = require('../controllers/authController');

router.post('/login', login.login);
router.post('/register', login.register);

module.exports = router;
const express = require('express');
const router = express.Router();
const { register, login, registerUser, loginUser } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.post('/register/user', registerUser);
router.post('/login/user', loginUser);

module.exports = router;

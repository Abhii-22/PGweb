const express = require('express');
const router = express.Router();
const { loginOwner, loginUser } = require('../controllers/authController');

router.post('/login', loginOwner);
router.post('/user/login', loginUser);

module.exports = router;

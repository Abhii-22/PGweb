const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema({
  email: String,
  userType: String,
  success: Boolean,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Login', loginSchema);



const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  name: String,
  email: String,
  sharing: String,
  phoneNumber: String,
  pgName: String,
  price: String,
  gender: String,
});

const Registration = mongoose.model('Registration', registrationSchema);

module.exports = Registration;

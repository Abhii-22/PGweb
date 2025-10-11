const mongoose = require('mongoose');

const pgSchema = new mongoose.Schema({
  name: String,
  images: [String],
  price: Number,
  sharing: String,
  rating: Number,
  gender: String,
  location: String,
  description: String,
  facilities: [String],
  area: String,
  ownerEmail: { type: String, required: true, index: true }
});

const Pg = mongoose.model('Pg', pgSchema);

module.exports = Pg;

const Pg = require('../models/Pg');

// @desc    Get all pgs
// @route   GET /api/pgs
// @access  Public
const getPgs = async (req, res) => {
  try {
    const pgs = await Pg.find();
    res.json(pgs);
  } catch (error) {
    console.error('Error fetching PGs:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Create a new pg
// @route   POST /api/pgs
// @access  Private
const createPg = async (req, res) => {
  try {
    const newPg = new Pg(req.body);
    await newPg.save();
    res.status(201).json(newPg);
  } catch (error) {
    console.error('Error creating PG:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Update a pg
// @route   PUT /api/pgs/:id
// @access  Private
const updatePg = async (req, res) => {
  try {
    const updatedPg = await Pg.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedPg);
  } catch (error) {
    console.error('Error updating PG:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Delete a pg
// @route   DELETE /api/pgs/:id
// @access  Private
const deletePg = async (req, res) => {
  try {
    await Pg.findByIdAndDelete(req.params.id);
    res.json({ message: 'PG deleted successfully' });
  } catch (error) {
    console.error('Error deleting PG:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get logged in user pgs
// @route   GET /api/pgs/my-pgs
// @access  Private
const getMyPgs = async (req, res) => {
  try {
    const pgs = await Pg.find({ ownerEmail: req.query.email });
    res.json(pgs);
  } catch (error) {
    console.error('Error fetching user PGs:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getPgs,
  createPg,
  updatePg,
  deletePg,
  getMyPgs,
};

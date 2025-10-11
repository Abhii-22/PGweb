const Pg = require('../models/Pg');

// @desc    Get all pgs
// @route   GET /api/pgs
// @access  Public
const getPgs = async (req, res) => {
  try {
    const pgs = await Pg.find();
    res.json(pgs);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
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
    res.status(500).json({ message: 'Server error', error });
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
    res.status(500).json({ message: 'Server error', error });
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
    res.status(500).json({ message: 'Server error', error });
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
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = {
  getPgs,
  createPg,
  updatePg,
  deletePg,
  getMyPgs,
};

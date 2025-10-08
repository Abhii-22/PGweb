const express = require('express');
const router = express.Router();
const Pg = require('../models/Pg');

// GET all pgs
router.get('/', async (req, res) => {
  try {
    const pgs = await Pg.find();
    res.json(pgs);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// POST a new pg
router.post('/', async (req, res) => {
  try {
    const newPg = new Pg(req.body);
    await newPg.save();
    res.status(201).json(newPg);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// PUT (update) a pg
router.put('/:id', async (req, res) => {
  try {
    const updatedPg = await Pg.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedPg);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// DELETE a pg
router.delete('/:id', async (req, res) => {
  try {
    await Pg.findByIdAndDelete(req.params.id);
    res.json({ message: 'PG deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;

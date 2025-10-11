const Tenant = require('../models/Tenant');

// @desc    Get all tenants
// @route   GET /api/tenants
// @access  Private
exports.getTenants = async (req, res) => {
  try {
    const tenants = await Tenant.find().sort({ createdAt: -1 });
    res.json(tenants);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// @desc    Create a new tenant
// @route   POST /api/tenants
// @access  Private
exports.createTenant = async (req, res) => {
  try {
    const newTenant = new Tenant(req.body);
    await newTenant.save();
    res.status(201).json(newTenant);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Email or Aadhar already exists.' });
    }
    res.status(500).json({ message: 'Server error', error });
  }
};

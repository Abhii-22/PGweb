const PgOwner = require('../models/PgOwner');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, 'your_jwt_secret', { // Replace 'your_jwt_secret' with an environment variable
    expiresIn: '30d',
  });
};

// @desc    Register a new PG owner
// @route   POST /api/auth/register
// @access  Public
const register = async (req, res) => {
  const { email, password } = req.body;

  try {
    let owner = await PgOwner.findOne({ email });

    if (owner) {
      return res.status(400).json({ message: 'User already exists' });
    }

    owner = new PgOwner({
      email,
      password,
    });

    await owner.save();

    const token = generateToken(owner._id);

    res.status(201).json({
      _id: owner._id,
      email: owner.email,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// @desc    Login a PG owner
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const owner = await PgOwner.findOne({ email }).select('+password');

    if (!owner) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await owner.matchPassword(password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(owner._id);

    res.status(200).json({
      _id: owner._id,
      email: owner.email,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// @desc    Register a new User
// @route   POST /api/auth/register/user
// @access  Public
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    user = new User({
      name,
      email,
      password,
    });

    await user.save();

    const token = generateToken(user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// @desc    Login a User
// @route   POST /api/auth/login/user
// @access  Public
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = {
  register,
  login,
  registerUser,
  loginUser,
};

const Login = require('../models/Login');
const User = require('../models/User');

// @desc    Login for PG Owners
// @route   POST /api/login
// @access  Public
const loginOwner = async (req, res) => {
  try {
    const { email, password, userType } = req.body || {};
    if (userType !== 'pgOwner') {
      try { await Login.create({ email, userType, success: false }); } catch (_) {}
      return res.status(400).json({ message: 'Unsupported user type' });
    }
    const owners = [
      { email: 'owner1@example.com', password: 'password1' },
      { email: 'owner2@example.com', password: 'password2' },
      { email: 'owner3@example.com', password: 'password3' },
      { email: 'owner4@example.com', password: 'password4' },
      { email: 'owner5@example.com', password: 'password5' },
      { email: 'owner6@example.com', password: 'password6' },
      { email: 'owner7@example.com', password: 'password7' },
      { email: 'owner8@example.com', password: 'password8' },
      { email: 'owner9@example.com', password: 'password9' },
      { email: 'owner10@example.com', password: 'password10' },
    ];
    const ok = owners.find(o => o.email === email && o.password === password);
    if (!ok) {
      try { await Login.create({ email, userType, success: false }); } catch (_) {}
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    try { await Login.create({ email, userType, success: true }); } catch (_) {}
    return res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};

// @desc    Login for Users
// @route   POST /api/user/login
// @access  Public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      try { await Login.create({ email, userType: 'user', success: false }); } catch (_) {}
      return res.status(400).json({ message: 'Email and password are required' });
    }
    let user = await User.findOne({ email });
    if (!user) {
      // Create a simple user record on first login
      user = await User.create({ email, password });
    }
    const success = user && user.password === password;
    try { await Login.create({ email, userType: 'user', success }); } catch (_) {}
    if (!success) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    return res.status(200).json({ message: 'Login successful', email: user.email });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = {
  loginOwner,
  loginUser,
};

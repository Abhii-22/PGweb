// At the very top
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// Routes
const pgRoutes = require('./routes/pgs');
const mainRoutes = require('./routes/main');
const authRoutes = require('./routes/auth');
const uploadRoutes = require('./routes/upload');
const tenantRoutes = require('./routes/tenants');

const app = express();

// Environment variables
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// CORS configuration
const corsOptions = {
  origin: [
    'http://localhost:5173',  // Local development
    'https://p-gweb-tgya.vercel.app/'  // Production Vercel frontend
  ],
  credentials: true
};
app.use(cors(corsOptions));

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', uploadRoutes);
app.use('/api/tenants', tenantRoutes);
app.use('/api/pgs', pgRoutes);
app.use('/', mainRoutes);

// MongoDB connection
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected successfully'))
.catch(err => console.error('❌ MongoDB connection error:', err));

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
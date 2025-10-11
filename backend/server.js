const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const pgRoutes = require('./routes/pgs');
const mainRoutes = require('./routes/main');
const authRoutes = require('./routes/auth');
const uploadRoutes = require('./routes/upload');
const tenantRoutes = require('./routes/tenants');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', uploadRoutes);
app.use('/api/tenants', tenantRoutes);
app.use('/api/pgs', pgRoutes);
app.use('/', mainRoutes);

const mongoURI = 'mongodb://localhost:27017/pg-website';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.log('MongoDB connection error:', err));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

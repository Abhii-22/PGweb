const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const pgRoutes = require('./routes/pgs');
const mainRoutes = require('./routes/main');

const app = express();
const port = 5000;

// Ensure the uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(uploadsDir)); // Serve uploaded files statically

// Routes
app.use('/api/pgs', pgRoutes);
app.use('/', mainRoutes);

const mongoURI = 'mongodb://localhost:27017/pg-website';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.log('MongoDB connection error:', err));



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

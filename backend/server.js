// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const session = require('express-session');
const passport = require('./config/passport');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(session({ secret: 'temp_secret', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// === ROUTES ===
const profileRoutes = require('./routes/profile');
app.use('/api/profile', profileRoutes);

// Test route
app.get('/api/test', (req, res) => {
    res.json({ message: 'Backend alive!' });
});

// Connect to MongoDB
if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
  })
      .then(() => console.log('MongoDB connected'))
      .catch(err => console.error('MongoDB connection error:', err));
}

// Routes
const authRoutes = require('./routes/auth');
const contribRoutes = require('./routes/contributions');
app.use('/api/auth', authRoutes);
app.use('/api/contributions', contribRoutes);

// Start server
const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
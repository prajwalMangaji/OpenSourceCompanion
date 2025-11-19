// backend/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, sparse: true, lowercase: true },
  password: { type: String }, // null if only GitHub login
  githubId: { type: String, unique: true, sparse: true },
  githubUsername: { type: String },
  githubAccessToken: { type: String }, // REQUIRED for PR verification
  skills: [{
    language: String,
    frameworks: [String],
    level: { type: String, enum: ['beginner', 'intermediate', 'advanced'] }
  }],
  points: { type: Number, default: 0 },
  badges: [String],
  leaderboardOptOut: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  issueUrl: { type: String, required: true },
  repoFullName: String,        // owner/repo
  issueNumber: Number,
  status: { type: String, enum: ['enrolled', 'submitted', 'completed'], default: 'enrolled' },
  prUrl: String,
  difficulty: String,
  pointsAwarded: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Contribution', schema);

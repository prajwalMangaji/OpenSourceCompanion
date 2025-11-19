const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Contribution = require('../models/Contribution');
const User = require('../models/User');
const axios = require('axios');

// Enroll in an issue
router.post('/enroll', auth, async (req, res) => {
  const active = await Contribution.countDocuments({ user: req.user.id, status: { $ne: 'completed' } });
  if (active >= 3) return res.status(400).json({ msg: 'Max 3 active' });

  const { issueUrl, difficulty } = req.body;
  const contrib = new Contribution({ user: req.user.id, issueUrl, difficulty });
  await contrib.save();
  res.json(contrib);
});

// Submit PR URL
router.post('/submit-pr', auth, async (req, res) => {
  const { contribId, prUrl } = req.body;
  const contrib = await Contribution.findOne({ _id: contribId, user: req.user.id });
  if (!contrib) return res.status(404).json({ msg: 'Not found' });

  contrib.prUrl = prUrl;
  contrib.status = 'submitted';
  await contrib.save();

  // Auto-verify after 30 seconds (in real app use GitHub webhook)
  setTimeout(() => verifyAndAwardPoints(contrib._id), 30000);

  res.json({ msg: 'Submitted – checking merge status' });
});

async function verifyAndAwardPoints(contribId) {
  const contrib = await Contribution.findById(contribId).populate('user');
  if (!contrib || contrib.status !== 'submitted') return;

  const match = contrib.prUrl.match(/github\.com\/([^\/]+)\/([^\/]+)\/pull\/(\d+)/);
  if (!match) return;

  const [_, owner, repo, prNumber] = match;

  try {
    const headers = { Authorization: `token ${contrib.user.githubAccessToken}` };
    const pr = await axios.get(`https://api.github.com/repos/${owner}/${repo}/pulls/${prNumber}`, { headers });

    if (pr.data.user.login !== contrib.user.githubUsername) return;
    if (pr.data.merged) {
      contrib.status = 'completed';
      const points = contrib.difficulty === 'easy' ? 20 : contrib.difficulty === 'medium' ? 35 : 50;
      contrib.pointsAwarded = points;
      await contrib.save();

      await User.findByIdAndUpdate(contrib.user._id, { $inc: { points } });
      console.log(`Awarded ${points} points to ${contrib.user.githubUsername}`);
    }
  } catch (e) {
    console.log('PR verification failed', e.message);
  }
}

module.exports = router;

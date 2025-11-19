// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

<<<<<<< feature/Gamification
// Connect to MongoDB (optional for demo mode)
if (process.env.MONGO_URI) {
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(() => console.log('MongoDB connected'))
        .catch(err => console.error('MongoDB connection error:', err));
} else {
    console.log('Running in demo mode without MongoDB (set MONGO_URI to connect)');
}

// Test route
app.get('/api/test', (req, res) => {
    res.json({ message: 'Backend alive!' });
});

// Demo data routes used by frontend
app.get('/api/issues', (req, res) => {
    const issues = [
        { id: '1', title: 'Fix typo in README', repository: 'octocat/hello-world', labels: ['good-first-issue'], description: 'Correct spelling in the README file.', issueUrl: 'https://github.com/octocat/hello-world/issues/1', repoUrl: 'https://github.com/octocat/hello-world' },
        { id: '2', title: 'Improve docs for setup', repository: 'vitejs/vite', labels: ['help-wanted'], description: 'Clarify steps for Windows setup.', issueUrl: 'https://github.com/vitejs/vite/issues/2', repoUrl: 'https://github.com/vitejs/vite' },
        { id: '3', title: 'Add tests to utils', repository: 'reactjs/react', labels: ['good-first-issue','help-wanted'], description: 'Write unit tests for utility functions.', issueUrl: 'https://github.com/reactjs/react/issues/3', repoUrl: 'https://github.com/reactjs/react' },
    ];
    res.json(issues);
});

app.post('/api/claim/:id', (req, res) => {
    const { id } = req.params;
    // In a real app, record claim in DB with user identity
    res.json({ ok: true, claimedId: id });
});

app.get('/api/profile', (req, res) => {
    res.json({
        username: 'Demo User',
        points: 230,
        avatar: '👩‍💻',
        badges: [
            { icon: '🔥', title: '5-Day Streak', description: 'Contributed 5 days in a row', unlocked: true },
            { icon: '🌟', title: 'First PR', description: 'Merged your first pull request', unlocked: true },
            { icon: '⏳', title: 'Onboarding', description: 'Started your first issue', unlocked: false },
        ],
    });
});

app.get('/api/leaderboard', (req, res) => {
    const users = Array.from({ length: 25 }, (_, i) => ({
        id: i + 1,
        username: `User ${i + 1}`,
        avatar: i < 3 ? ['🥇', '🥈', '🥉'][i] : '👤',
        points: Math.floor(Math.random() * 500),
        badges: [
            { icon: '🔥', title: '5-Day Streak', description: 'Contributed 5 days in a row', unlocked: Math.random() > 0.5 },
            { icon: '🌟', title: 'First PR', description: 'Merged your first pull request', unlocked: Math.random() > 0.2 },
        ],
    }));
    res.json({ users });
});

=======
// === ROUTES ===
const profileRoutes = require('./routes/profile');
app.use('/api/profile', profileRoutes);

// Test route
app.get('/api/test', (req, res) => {
    res.json({ message: 'Backend alive!' });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

>>>>>>> main
// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
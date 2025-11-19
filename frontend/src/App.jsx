// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './styles.css';

import IssuesPage from './pages/IssuesPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import LeaderboardPage from './pages/LeaderboardPage.jsx';

const Home = () => (
  <div className="container py-4">
    <header className="my-4">
      <h1>OpenSource Companion</h1>
      <p className="text-muted">Your friendly guide to contributing in open source.</p>
    </header>
    <p>Use the navigation to explore issues, check your profile, and climb the leaderboard.</p>
  </div>
);

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
        <NavLink to="/" className="navbar-brand">Good First Issue Finder</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav" aria-controls="mainNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="mainNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink to="/issues" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Issues</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/leaderboard" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Leaderboard</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/profile" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Profile</NavLink>
            </li>
          </ul>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/issues" element={<IssuesPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
      </Routes>
    </Router>
  );
}

export default App;
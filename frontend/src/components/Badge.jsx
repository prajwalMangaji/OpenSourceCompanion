import React from 'react';

// Badge.jsx - Reusable gamification badge component
// Props: icon (string), title (string), description (string), unlocked (bool)
export default function Badge({ icon = '🏅', title, description, unlocked = false }) {
  const classes = `badge-tile d-flex align-items-center p-2 rounded ${unlocked ? '' : 'badge-locked'}`;
  const tooltip = `${title} — ${description}`;
  return (
    <div className={classes} title={tooltip} aria-label={tooltip} role="img">
      <span className="badge-icon fs-4 me-2">{icon}</span>
      <div className="badge-content">
        <div className="fw-semibold">{title}</div>
        <div className="text-muted small">{description}</div>
      </div>
    </div>
  );
}
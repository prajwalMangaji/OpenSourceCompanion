import React from 'react';

// GuidancePanel.jsx - Reusable panel that guides beginners through contributing
// Props: issue (object), user (object)
export default function GuidancePanel({ issue, user }) {
  const labels = (issue?.labels || []).join(' / ') || 'good-first-issue / help-wanted';
  const difficulty = 'Beginner-friendly';
  const skills = 'JavaScript, Beginner';

  return (
    <div className="card shadow-sm guidance-panel">
      <div className="card-body">
        <h5 className="card-title">🧭 Guidance Panel</h5>
        <div className="mb-3">
          <h6>Why This Issue Is Good for You</h6>
          <ul className="list-unstyled mb-1">
            <li>Based on your skills: {skills}</li>
            <li>Difficulty: {difficulty}</li>
            <li>Labels: {labels}</li>
            <li>Estimated Time: 1–3 hours</li>
          </ul>
        </div>

        <div className="mb-3">
          <h6>Step-by-Step Contribution Plan</h6>
          <ol className="mb-1">
            <li>Fork the repository</li>
            <li>Clone it locally</li>
            <li>Create a new branch</li>
            <li>Read the CONTRIBUTING.md</li>
            <li>Run the project locally</li>
            <li>Make the fix / enhancement</li>
            <li>Push your branch</li>
            <li>Create a Pull Request</li>
          </ol>
        </div>

        <div className="mb-3">
          <h6>Tips Before You Start</h6>
          <ul>
            <li>Read the existing code around the issue.</li>
            <li>Search for similar issues/PRs before starting.</li>
            <li>Ask clarifying questions if required.</li>
          </ul>
        </div>

        <div>
          <h6>What Happens After You Submit PR</h6>
          <ul className="list-unstyled mb-0">
            <li>Maintainer reviews → approves → merges</li>
            <li>You earn points + badges automatically.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
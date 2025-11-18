import React from 'react';

// IssueCard.jsx - Displays an issue summary in a card
// Props: issue (object), onOpen (function)
export default function IssueCard({ issue, onOpen }) {
  const {
    title = 'Untitled Issue',
    repository = 'Unknown Repo',
    labels = [],
    description = '',
  } = issue || {};

  const difficultyTags = labels.filter(
    (l) => ['good-first-issue', 'help-wanted'].includes(l)
  );

  return (
    <div className="card h-100 shadow-sm issue-card">
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{title}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{repository}</h6>
        <div className="mb-2">
          {difficultyTags.map((tag) => (
            <span key={tag} className="badge bg-primary me-2 tag-badge">
              {tag}
            </span>
          ))}
        </div>
        <p className="card-text flex-grow-1">{description?.slice(0, 140)}{description && description.length > 140 ? '…' : ''}</p>
        <div className="mt-auto d-flex justify-content-between align-items-center">
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={() => onOpen(issue)}
            aria-label={`View details for ${title}`}
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
}
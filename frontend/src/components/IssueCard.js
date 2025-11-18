import React from 'react';

export default function IssueCard({ issue, onClick }) {
  const difficultyColors = {
    Easy: 'bg-green-100 text-green-700',
    Medium: 'bg-yellow-100 text-yellow-700',
    Hard: 'bg-red-100 text-red-700',
  };

  return (
    <button
      type="button"
      className="w-full text-left rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md transition p-4"
      onClick={() => onClick?.(issue)}
      data-testid="issue-card"
    >
      <div className="flex items-start justify-between">
        <h3 className="text-lg font-semibold text-gray-900">{issue.title}</h3>
        <span className={`ml-3 px-2 py-1 text-xs rounded ${difficultyColors[issue.difficulty] || 'bg-gray-100 text-gray-700'}`}>
          {issue.difficulty || 'Unknown'}
        </span>
      </div>
      <p className="mt-1 text-sm text-gray-600">{issue.repo}</p>

      <div className="mt-3 flex flex-wrap gap-2">
        {(issue.labels || []).map((label) => (
          <span
            key={label}
            className="inline-block px-2 py-0.5 text-xs rounded-full bg-blue-50 text-blue-700 border border-blue-100"
          >
            {label}
          </span>
        ))}
      </div>
    </button>
  );
}
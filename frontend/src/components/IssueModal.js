import React, { useEffect } from 'react';
import IssueGuidance from './IssueGuidance';

export default function IssueModal({ issue, isOpen, onClose, onStart }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape' && isOpen) onClose?.();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen || !issue) return null;

  const issueUrl = issue.url || (issue.repo ? `https://github.com/${issue.repo}/issues` : '#');

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative max-w-2xl w-full mx-4 bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-start justify-between">
          <h2 className="text-xl font-semibold text-gray-900">{issue.title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="ml-3 rounded p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100"
            aria-label="Close"
          >
            ✕
          </button>
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
          {issue.difficulty && (
            <span className="inline-block px-2 py-0.5 text-xs rounded-full bg-green-50 text-green-700 border border-green-100">
              {issue.difficulty}
            </span>
          )}
        </div>

        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-900">Why this issue is beginner-friendly</h3>
          <p className="mt-1 text-sm text-gray-700">{issue.guidance?.reason || 'No guidance provided.'}</p>

          <h4 className="mt-4 text-sm font-medium text-gray-900">Steps to get started</h4>
          <ul className="mt-1 list-disc list-inside text-sm text-gray-700 space-y-1">
            {(issue.guidance?.steps || []).map((step, idx) => (
              <li key={idx}>{step}</li>
            ))}
          </ul>

          {/* Guidance section */}
          <div className="mt-6">
            {/* Use reusable guidance component */}
            <IssueGuidance guidance={issue.guidance} />
  
            {/* Keep "Required skills" below guidance */}
            <div className="mt-4 text-sm text-gray-700">
              <span className="font-medium">Required skills: </span>
              <span>{(issue.skills || ['Basics of Git', 'Reading README']).join(', ')}</span>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={issueUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Open on GitHub
          </a>
          <button
            type="button"
            onClick={() => {
              console.log('Start Issue', issue?.id || issue?.title);
              onStart?.(issue);
            }}
            className="inline-flex items-center gap-2 rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700"
          >
            Start Issue
          </button>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-2 rounded-md bg-gray-100 px-4 py-2 text-gray-700 hover:bg-gray-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
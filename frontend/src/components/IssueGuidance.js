import React from 'react';

export default function IssueGuidance({ guidance }) {
  const steps = guidance?.steps || [];

  return (
    <div className="mt-6">
      <h3 className="text-sm font-medium text-gray-900">Why this issue is beginner-friendly</h3>
      <p className="mt-1 text-sm text-gray-700">{guidance?.reason || 'No guidance provided.'}</p>

      <h4 className="mt-4 text-sm font-medium text-gray-900">Steps to get started</h4>
      <ul className="mt-1 list-disc list-inside text-sm text-gray-700 space-y-1">
        {steps.map((step, idx) => (
          <li key={idx}>{step}</li>
        ))}
      </ul>

      <div className="mt-4 rounded-md bg-gray-50 border border-gray-200 p-3">
        <p className="text-sm text-gray-600">
          Tips: Look for CONTRIBUTING.md and CODE_OF_CONDUCT in the repository. Read the issue comments
          for context, and ask clarifying questions if needed.
        </p>
      </div>
    </div>
  );
}
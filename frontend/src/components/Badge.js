import React from 'react';

export default function Badge({ title, icon, requirement, earned }) {
  const stateClasses = earned
    ? 'bg-green-50 border-green-200'
    : 'bg-gray-50 border-gray-200';

  const labelClasses = earned
    ? 'text-green-700 bg-green-100'
    : 'text-gray-700 bg-gray-100';

  return (
    <div
      className={`rounded-lg border ${stateClasses} p-4 flex items-center gap-3`}
      data-testid="badge"
      aria-label={earned ? 'badge-earned' : 'badge-locked'}
    >
      <div className="text-2xl" aria-hidden="true">{icon}</div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold text-gray-900">{title}</h4>
          <span className={`text-xs px-2 py-0.5 rounded ${labelClasses}`}>
            {earned ? 'Earned' : 'Locked'}
          </span>
        </div>
        <p className="mt-1 text-xs text-gray-600">{requirement}</p>
      </div>
    </div>
  );
}
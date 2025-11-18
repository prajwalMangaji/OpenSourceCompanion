import React, { useEffect, useState } from 'react';
import IssueCard from '../components/IssueCard';
import IssueModal from '../components/IssueModal';
import useModal from '../hooks/useModal';

const mockIssues = [
  {
    id: 1,
    title: 'Add dark mode toggle',
    repo: 'openui/design-system',
    labels: ['good first issue', 'frontend'],
    difficulty: 'Easy',
    guidance: {
      reason: 'Small self-contained UI change.',
      steps: ['Clone repo', 'Run locally', 'Implement toggle', 'Submit PR'],
    },
  },
  {
    id: 2,
    title: 'Improve README formatting',
    repo: 'docs/awesome-project',
    labels: ['documentation', 'good first issue'],
    difficulty: 'Easy',
    guidance: {
      reason: 'Requires Markdown edits only.',
      steps: ['Fork repo', 'Edit README', 'Preview changes', 'Open PR'],
    },
  },
];

export default function DiscoverIssues() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const modal = useModal();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setIssues(mockIssues);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleStart = (issue) => {
    // placeholder for future integration
    console.log('User started issue:', issue?.id || issue?.title);
    modal.close();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Discover Issues</h1>
        <p className="mt-1 text-sm text-gray-600">Find beginner-friendly issues tailored for you.</p>
      </header>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(4)].map((_, idx) => (
            <div key={idx} className="rounded-lg border border-gray-200 bg-white p-4 animate-pulse">
              <div className="h-5 w-1/2 bg-gray-200 rounded" />
              <div className="mt-2 h-4 w-1/3 bg-gray-200 rounded" />
              <div className="mt-3 flex gap-2">
                <div className="h-4 w-16 bg-gray-200 rounded-full" />
                <div className="h-4 w-20 bg-gray-200 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {issues.map((issue) => (
            <IssueCard key={issue.id} issue={issue} onClick={(it) => modal.openWith(it)} />
          ))}
        </div>
      )}

      <IssueModal
        issue={modal.data}
        isOpen={modal.isOpen}
        onClose={modal.close}
        onStart={handleStart}
      />
    </div>
  );
}
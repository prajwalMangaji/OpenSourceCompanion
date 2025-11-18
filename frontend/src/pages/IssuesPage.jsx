import React, { useEffect, useState } from 'react';
import IssueCard from '../components/IssueCard.jsx';
import IssueModal from '../components/IssueModal.jsx';

export default function IssuesPage() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState(null);

  const user = { id: 'demo-user', name: 'Demo User', skills: ['JavaScript'] };

  useEffect(() => {
    let isMounted = true;
    const fetchIssues = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch('/api/issues');
        if (!res.ok) throw new Error('Failed to load issues');
        const data = await res.json();
        if (isMounted) setIssues(Array.isArray(data) ? data : data?.issues || []);
      } catch (err) {
        // Fallback demo data for local UI dev if backend not ready
        const demo = [
          { id: '1', title: 'Fix typo in README', repository: 'octocat/hello-world', labels: ['good-first-issue'], description: 'Correct spelling in the README file.', issueUrl: '#', repoUrl: '#' },
          { id: '2', title: 'Improve docs for setup', repository: 'vitejs/vite', labels: ['help-wanted'], description: 'Clarify steps for Windows setup.', issueUrl: '#', repoUrl: '#' },
          { id: '3', title: 'Add tests to utils', repository: 'reactjs/react', labels: ['good-first-issue', 'help-wanted'], description: 'Write unit tests for utility functions.', issueUrl: '#', repoUrl: '#' },
        ];
        if (isMounted) {
          setIssues(demo);
          setError(err.message || 'Error loading issues (showing demo data)');
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchIssues();
    return () => { isMounted = false; };
  }, []);

  const handleOpenModal = (issue) => setSelected(issue);
  const handleCloseModal = () => setSelected(null);
  const handleClaimSuccess = () => {
    // Optional: show toast or update state
  };

  return (
    <div className="container py-4">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h2 className="mb-0">Explore Issues</h2>
        <div className="text-muted small">Find beginner-friendly tasks to contribute</div>
      </div>
      {error && <div className="alert alert-warning" role="alert">{error}</div>}
      {loading ? (
        <div className="text-center py-5">Loading issues…</div>
      ) : (
        <div className="row g-3">
          {issues.map((issue) => (
            <div key={issue._id || issue.id} className="col-12 col-sm-6 col-md-4">
              <IssueCard issue={issue} onOpen={handleOpenModal} />
            </div>
          ))}
        </div>
      )}

      {selected && (
        <IssueModal
          issue={selected}
          user={user}
          onClose={handleCloseModal}
          onClaim={handleClaimSuccess}
        />
      )}
    </div>
  );
}
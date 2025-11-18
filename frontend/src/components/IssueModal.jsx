import React, { useEffect, useRef, useState } from 'react';
import GuidancePanel from './GuidancePanel.jsx';

// IssueModal.jsx - Accessible modal for issue details and guidance
// Props: issue, user, onClose, onClaim
export default function IssueModal({ issue, user, onClose, onClaim }) {
  const overlayRef = useRef(null);
  const modalRef = useRef(null);
  const [claiming, setClaiming] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const focusableSelectors = [
      'a[href]', 'button', 'textarea', 'input', 'select', '[tabindex]:not([tabindex="-1"])',
    ];

    const trapFocus = (e) => {
      if (!modalRef.current) return;
      const focusables = modalRef.current.querySelectorAll(focusableSelectors.join(','));
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    const onOverlayClick = (e) => {
      if (e.target === overlayRef.current) onClose();
    };

    document.addEventListener('keydown', trapFocus);
    overlayRef.current?.addEventListener('click', onOverlayClick);
    // Focus first focusable element when modal opens
    setTimeout(() => {
      const firstBtn = modalRef.current?.querySelector('button');
      firstBtn?.focus();
    }, 0);

    return () => {
      document.removeEventListener('keydown', trapFocus);
      overlayRef.current?.removeEventListener('click', onOverlayClick);
    };
  }, [onClose]);

  const handleClaim = async () => {
    if (!issue?._id && !issue?.id) return;
    setClaiming(true);
    setError('');
    try {
      const issueId = issue._id || issue.id;
      const res = await fetch(`/api/claim/${issueId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });
      if (!res.ok) throw new Error('Failed to claim issue');
      onClaim?.(issue);
    } catch (err) {
      setError(err.message || 'Error claiming issue');
    } finally {
      setClaiming(false);
    }
  };

  const {
    title = 'Untitled Issue',
    description = '',
    labels = [],
    repository = 'Unknown Repo',
    issueUrl = '#',
    repoUrl = '#',
  } = issue || {};

  return (
    <div className="modal-overlay" ref={overlayRef} role="dialog" aria-modal="true" aria-labelledby="issueModalTitle">
      <div className="modal-content custom-modal" ref={modalRef}>
        <div className="modal-header">
          <h5 className="modal-title" id="issueModalTitle">{title}</h5>
          <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
        </div>
        <div className="modal-body">
          <div className="row">
            <div className="col-12 col-lg-6 mb-3">
              <div className="mb-2">
                <span className="badge bg-secondary me-2">{repository}</span>
                {labels.map((l) => (
                  <span key={l} className="badge bg-info text-dark me-2 tag-badge">{l}</span>
                ))}
              </div>
              <p className="text-muted">{description}</p>
              <div className="d-flex gap-2 mb-3">
                <a href={repoUrl} target="_blank" rel="noreferrer" className="btn btn-outline-secondary">Repo</a>
                <a href={issueUrl} target="_blank" rel="noreferrer" className="btn btn-outline-secondary">Issue</a>
              </div>
              <button className="btn btn-primary" onClick={handleClaim} disabled={claiming}>
                {claiming ? 'Claiming…' : 'Claim Issue'}
              </button>
              {error && <div className="alert alert-danger mt-2" role="alert">{error}</div>}
            </div>
            <div className="col-12 col-lg-6">
              <GuidancePanel issue={issue} user={user} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
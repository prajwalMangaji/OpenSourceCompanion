import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import IssueModal from './IssueModal.jsx';

describe('IssueModal', () => {
  const issue = {
    id: '1',
    title: 'Fix typo',
    description: 'Correct spelling in README',
    labels: ['good-first-issue'],
    repository: 'octocat/hello-world',
    issueUrl: '#',
    repoUrl: '#',
  };

  test('renders title and guidance panel', () => {
    const onClose = vi.fn();
    render(<IssueModal issue={issue} user={{}} onClose={onClose} />);
    expect(screen.getByText(/Fix typo/i)).toBeInTheDocument();
    expect(screen.getByText(/Guidance Panel/i)).toBeInTheDocument();
  });

  test('closes when clicking close button', () => {
    const onClose = vi.fn();
    render(<IssueModal issue={issue} user={{}} onClose={onClose} />);
    const btn = screen.getByRole('button', { name: /close/i });
    fireEvent.click(btn);
    expect(onClose).toHaveBeenCalled();
  });

  test('claim issue calls backend and onClaim', async () => {
    const onClose = vi.fn();
    const onClaim = vi.fn();
    global.fetch = vi.fn().mockResolvedValue({ ok: true, json: async () => ({}) });
    render(<IssueModal issue={issue} user={{}} onClose={onClose} onClaim={onClaim} />);

    const claimBtn = screen.getByRole('button', { name: /Claim Issue/i });
    fireEvent.click(claimBtn);
    await waitFor(() => expect(onClaim).toHaveBeenCalled());
  });
});
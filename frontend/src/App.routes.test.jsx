import React from 'react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App.jsx';

// Mock fetch to return deterministic data for pages
beforeEach(() => {
  vi.stubGlobal('fetch', (url) => {
    if (typeof url === 'string' && url.includes('/api/issues')) {
      return Promise.resolve({
        ok: true,
        json: async () => ([
          { id: 't1', title: 'Test Issue', repository: 'repo/a', labels: ['good-first-issue'], description: 'Desc', issueUrl: 'https://x', repoUrl: 'https://r' },
        ]),
      });
    }
    if (typeof url === 'string' && url.includes('/api/profile')) {
      return Promise.resolve({ ok: true, json: async () => ({ username: 'Tester', points: 100, avatar: '👤', badges: [] }) });
    }
    if (typeof url === 'string' && url.includes('/api/leaderboard')) {
      return Promise.resolve({ ok: true, json: async () => ({ users: [{ id: 1, username: 'A', avatar: '👤', points: 10, badges: [] }] }) });
    }
    return Promise.resolve({ ok: false, json: async () => ({}) });
  });
});

describe('App routing and data flows', () => {
  it('navigates via navbar and loads Issues data', async () => {
    render(<App />);
    const issuesLink = screen.getByRole('link', { name: /issues/i });
    await userEvent.click(issuesLink);
    await waitFor(() => {
      expect(screen.getByText(/Test Issue/i)).toBeInTheDocument();
    });
  });

  it('shows Profile data when navigating to Profile', async () => {
    render(<App />);
    const profileLink = screen.getByRole('link', { name: /profile/i });
    await userEvent.click(profileLink);
    await waitFor(() => {
      expect(screen.getByText(/Tester/i)).toBeInTheDocument();
    });
  });

  it('renders Leaderboard and loads users', async () => {
    render(<App />);
    const leaderboardLink = screen.getByRole('link', { name: /leaderboard/i });
    await userEvent.click(leaderboardLink);
    expect(await screen.findByText(/Page 1 of/i)).toBeInTheDocument();
  });
});
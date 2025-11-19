import React from 'react';
import { render, screen } from '@testing-library/react';
import LeaderboardPage from './LeaderboardPage.jsx';

describe('LeaderboardPage', () => {
  test('renders heading and pagination', async () => {
    // Force fetch to fail so demo data is used
    global.fetch = vi.fn().mockResolvedValue({ ok: false });
    render(<LeaderboardPage />);
    expect(await screen.findByText(/Leaderboard/i)).toBeInTheDocument();
    expect(await screen.findByText(/Page 1 of/i)).toBeInTheDocument();
  });
});
import React from 'react';
import { render, screen } from '@testing-library/react';
import Badge from './Badge.jsx';

describe('Badge', () => {
  test('shows unlocked badge without locked class', () => {
    render(<Badge icon="🌟" title="First PR" description="Merged your first pull request" unlocked />);
    const tile = screen.getByRole('img', { name: /First PR — Merged your first pull request/i });
    expect(tile).toBeInTheDocument();
    expect(tile.className).not.toMatch(/badge-locked/);
  });

  test('shows locked badge with locked styling', () => {
    render(<Badge icon="⏳" title="Onboarding" description="Started your first issue" unlocked={false} />);
    const tile = screen.getByRole('img', { name: /Onboarding — Started your first issue/i });
    expect(tile).toBeInTheDocument();
    expect(tile.className).toMatch(/badge-locked/);
  });
});
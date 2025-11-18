import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app navbar brand and home header', () => {
  render(<App />);
  expect(screen.getByText(/Good First Issue Finder/i)).toBeInTheDocument();
  expect(screen.getByText(/OpenSource Companion/i)).toBeInTheDocument();
});

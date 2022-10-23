import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

// smoke testing to check if things render without crashing

test('it renders without crashing', () => {
  render(<App />)
})
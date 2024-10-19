import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Interactive Music Grid heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/Interactive Music Grid/i);
  expect(headingElement).toBeInTheDocument();
});

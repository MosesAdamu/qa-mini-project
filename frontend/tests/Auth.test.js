import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../src/components/Auth/Login';

test('renders login form', () => {
  render(<Login />);
  const usernameInput = screen.getByPlaceholderText('Username');
  const passwordInput = screen.getByPlaceholderText('Password');
  expect(usernameInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
});

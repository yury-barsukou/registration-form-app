import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SignInForm from './SignInForm';


describe('SignInForm', () => {
  test('renders the sign-in form with all fields', () => {
    render(<SignInForm />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  test('allows entry of email', () => {
    render(<SignInForm />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'user@example.com' } });
    expect(screen.getByLabelText(/email/i).value).toBe('user@example.com');
  });

  test('allows entry of password', () => {
    render(<SignInForm />);
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    expect(screen.getByLabelText(/password/i).value).toBe('password123');
  });

  test('validates email format correctly', () => {
    render(<SignInForm />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'invalid' } });
    expect(screen.queryByText(/please enter a valid email address/i)).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'user@example.com' } });
    expect(screen.queryByText(/please enter a valid email address/i)).toBeNull();
  });

  test('validates password length correctly', () => {
    render(<SignInForm />);
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'short' } });
    expect(screen.queryByText(/your password must have at least 8 characters/i)).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'longenough' } });
    expect(screen.queryByText(/your password must have at least 8 characters/i)).toBeNull();
  });

  test('disables sign-in button with invalid form', () => {
    render(<SignInForm />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'invalid' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'short' } });
    expect(screen.getByRole('button', { name: /sign in/i })).toBeDisabled();
  });

  test('enables sign-in button with valid form', () => {
    render(<SignInForm />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'user@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    expect(screen.getByRole('button', { name: /sign in/i })).not.toBeDisabled();
  });

  test('calls submit handler with correct data on valid form submission', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    render(<SignInForm />);

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'user@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    expect(consoleSpy).toHaveBeenLastCalledWith('Sign In submitted:', {
      email: 'user@example.com',
      password: 'password123',
    });

    consoleSpy.mockRestore();
  });
// Test for displaying validation messages upon invalid inputs
test('displays validation messages for invalid email and password', () => {
  render(<SignInForm />);
  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'invalid_email' } });
  fireEvent.change(screen.getByLabelText(/password/i), { target: { value: '123' } });
  fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

  expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
  expect(screen.getByText(/your password must have at least 8 characters/i)).toBeInTheDocument();
});

// Test form submission with invalid inputs
test('prevents form submission and shows errors with invalid email and password', () => {
  const consoleErrorSpy = jest.spyOn(console, 'error');
  render(<SignInForm />);

  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'invalid_email' } });
  fireEvent.change(screen.getByLabelText(/password/i), { target: { value: '123' } });
  fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

  expect(consoleErrorSpy).toHaveBeenCalledWith('Sign In form is invalid');
  consoleErrorSpy.mockRestore();
});

// Test for "Forgot Password?" link
test('"Forgot Password?" link is present and clickable', () => {
  render(<SignInForm />);
  expect(screen.getByText(/forgot password\?/i).closest('a')).toHaveAttribute('href', '#');
});

// Test form submission without filling fields
test('prevents form submission with empty fields', () => {
  render(<SignInForm />);
  fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

  expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
  expect(screen.getByText(/your password must have at least 8 characters/i)).toBeInTheDocument();
});
});
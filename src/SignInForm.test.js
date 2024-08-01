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

  describe('SignInForm - Additional Tests', () => {
  
  test('displays error messages when submitting the form with empty fields', () => {
    render(<SignInForm />);
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));
    expect(screen.queryByText(/please enter a valid email address/i)).toBeInTheDocument();
    expect(screen.queryByText(/your password must have at least 8 characters/i)).toBeInTheDocument();
  });

  test('toggles error messages visibility with field content changes', () => {
    render(<SignInForm />);
    // Trigger error state
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'invalid' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'short' } });
    // Clear error state
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'user@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    // Re-trigger error state
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'stillinvalid' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'tiny' } });
    
    expect(screen.queryByText(/please enter a valid email address/i)).toBeInTheDocument();
    expect(screen.queryByText(/your password must have at least 8 characters/i)).toBeInTheDocument();
  });

  test.each([
    ['user@', 'user@ is not a valid email'],
    ['@example.com', '@example.com is missing local part'],
    ['userexample.com', 'userexample.com is missing @ symbol'],
    ['user@example', 'user@example is missing domain extension']
  ])('validates the email format: %s', (email, _) => {
    render(<SignInForm />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: email } });
    expect(screen.queryByText(/please enter a valid email address/i)).toBeInTheDocument();
  });

  test('form submission with empty password field', () => {
    render(<SignInForm />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'user@example.com' } });
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));
    expect(screen.queryByText(/your password must have at least 8 characters/i)).toBeInTheDocument();
  });

  test('accepts a password that is exactly 8 characters long', () => {
    render(<SignInForm />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'user@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: '12345678' } });
    expect(screen.queryByText(/your password must have at least 8 characters/i)).toBeNull();
    expect(screen.getByRole('button', { name: /sign in/i })).not.toBeDisabled();
  });
});
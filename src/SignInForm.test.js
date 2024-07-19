import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SignInForm from './SignInForm';

describe('SignInForm', () => {
  test('validates email correctly', () => {
    const { getByLabelText, queryByText } = render(<SignInForm />);
    const emailInput = getByLabelText('Email');
    
    fireEvent.change(emailInput, { target: { value: 'invalidemail', name: 'email' } });
    expect(queryByText('Please enter a valid email address')).toBeInTheDocument();

    fireEvent.change(emailInput, { target: { value: 'valid@example.com', name: 'email' } });
    expect(queryByText('Please enter a valid email address')).toBeNull();
  });

  test('validates password length correctly', () => {
    const { getByLabelText, queryByText } = render(<SignInForm />);
    const passwordInput = getByLabelText('Password');
    
    fireEvent.change(passwordInput, { target: { value: 'short', name: 'password' } });
    expect(queryByText('Your password must have at least 8 characters')).toBeInTheDocument();

    fireEvent.change(passwordInput, { target: { value: 'longenoughpassword', name: 'password' } });
    expect(queryByText('Your password must have at least 8 characters')).toBeNull();
  });

  test('enables sign in button only when form is valid', () => {
    const { getByLabelText, getByText } = render(<SignInForm />);
    const emailInput = getByLabelText('Email');
    const passwordInput = getByLabelText('Password');
    const signInButton = getByText('Sign In').closest('button');

    fireEvent.change(emailInput, { target: { value: 'valid@example.com', name: 'email' } });
    fireEvent.change(passwordInput, { target: { value: 'longenoughpassword', name: 'password' } });
    
    expect(signInButton).not.toBeDisabled();
  });

  test('logs to console on valid form submission', () => {
    console.log = jest.fn();
    console.error = jest.fn();

    const { getByLabelText, getByText } = render(<SignInForm />);
    const emailInput = getByLabelText('Email');
    const passwordInput = getByLabelText('Password');
    const form = getByText('Sign In').closest('form');

    fireEvent.change(emailInput, { target: { value: 'valid@example.com', name: 'email' } });
    fireEvent.change(passwordInput, { target: { value: 'longenoughpassword', name: 'password' } });
    fireEvent.submit(form);

    expect(console.log).toHaveBeenCalledWith('Sign In submitted:', { email: 'valid@example.com', password: 'longenoughpassword' });
    expect(console.error).not.toHaveBeenCalled();
  });

  test('logs error to console on invalid form submission', () => {
    console.log = jest.fn();
    console.error = jest.fn();

    const { getByText } = render(<SignInForm />);
    const form = getByText('Sign In').closest('form');

    fireEvent.submit(form);

    expect(console.error).toHaveBeenCalledWith('Sign In form is invalid');
    expect(console.log).not.toHaveBeenCalled();
  });
});


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
});
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SignInForm from './SignInForm';


describe('SignInForm Component', () => {
  test('initial state', () => {
    render(<SignInForm />);
    expect(screen.getByLabelText(/email/i)).toHaveValue('');
    expect(screen.getByLabelText(/password/i)).toHaveValue('');
    expect(screen.getByText(/sign in/i)).toBeDisabled();
  });

  test('input value updates', () => {
    render(<SignInForm />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'user@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    expect(screen.getByLabelText(/email/i)).toHaveValue('user@example.com');
    expect(screen.getByLabelText(/password/i)).toHaveValue('password123');
  });

  test('validates email and password correctly', () => {
    render(<SignInForm />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'invalid' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'short' } });
    expect(screen.queryByText(/please enter a valid email address/i)).toBeInTheDocument();
    expect(screen.queryByText(/your password must have at least 8 characters/i)).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'user@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    expect(screen.queryByText(/please enter a valid email address/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/your password must have at least 8 characters/i)).not.toBeInTheDocument();
  });

  test('enables sign in button when form is valid', () => {
    render(<SignInForm />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'user@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    expect(screen.getByText(/sign in/i)).not.toBeDisabled();
  });

  test('submits form with valid data', () => {
    console.log = jest.fn();
    render(<SignInForm />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'user@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByText(/sign in/i));
    expect(console.log).toHaveBeenCalledWith('Sign In submitted:', { email: 'user@example.com', password: 'password123' });
  });
});;
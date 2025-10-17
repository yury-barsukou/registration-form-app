import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SignInForm from './SignInForm';

describe('SignInForm Component', () => {
  test('renders email and password input fields and Sign In button', () => {
    render(<SignInForm />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  test('displays validation error if required fields are empty', () => {
    render(<SignInForm />);
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));
    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/password is required/i)).toBeInTheDocument();
  });

  test('displays error for invalid email format', () => {
    render(<SignInForm />);
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'invalid-email' },
    });
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));
    expect(screen.getByText(/invalid email format/i)).toBeInTheDocument();
  });

  test('enables Sign In button only when fields are valid', () => {
    render(<SignInForm />);
    const signInButton = screen.getByRole('button', { name: /sign in/i });
    expect(signInButton).toBeDisabled();

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' },
    });
    expect(signInButton).not.toBeDisabled();
  });

  test('calls onSubmit with correct data when form is submitted', () => {
    const mockOnSubmit = jest.fn();
    render(<SignInForm onSubmit={mockOnSubmit} />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    expect(mockOnSubmit).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    });
  });
});
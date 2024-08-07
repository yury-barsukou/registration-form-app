import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SignUpForm from '../SignUpForm';

describe('SignUpForm Component', () => {
  // Existing tests
  test('renders the sign-up form with all fields', () => {
    render(<SignUpForm />);
    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument();
  });

  test('allows entry of all fields', () => {
    render(<SignUpForm />);
    fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'Password123' } });
    expect(screen.getByLabelText(/first name/i).value).toBe('John');
    expect(screen.getByLabelText(/last name/i).value).toBe('Doe');
    expect(screen.getByLabelText(/email/i).value).toBe('john.doe@example.com');
    expect(screen.getByLabelText(/password/i).value).toBe('Password123');
  });

  // New tests
  test('validates email format correctly', () => {
    render(<SignUpForm />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'invalidEmail' } });
    fireEvent.blur(screen.getByLabelText(/email/i)); // simulate leaving the email field
    expect(screen.getByText(/invalid email address/i)).toBeInTheDocument();
  });

  test('validates password minimum length', () => {
    render(<SignUpForm />);
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'short' } });
    fireEvent.blur(screen.getByLabelText(/password/i)); // simulate leaving the password field
    expect(screen.getByText(/password must be at least 8 characters/i)).toBeInTheDocument();
  });

  test('enables create account button when all fields are valid', () => {
    render(<SignUpForm />);
    fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'Password123' } });
    expect(screen.getByRole('button', { name: /create account/i })).not.toBeDisabled();
  });

  test('disables create account button when form is incomplete or invalid', () => {
    render(<SignUpForm />);
    fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: '' } }); // Leave this field empty
    fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'Password123' } });
    expect(screen.getByRole('button', { name: /create account/i })).toBeDisabled();
  });

  test('submits form with correct data when create account button is clicked', () => {
    const mockSubmit = jest.fn();
    render(<SignUpForm onSubmit={mockSubmit} />);
    fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'Password123' } });
    fireEvent.click(screen.getByRole('button', { name: /create account/i }));
    expect(mockSubmit).toHaveBeenCalledWith({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'Password123',
    });
  });
});
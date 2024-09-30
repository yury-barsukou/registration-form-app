import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SignUpForm from '../SignUpForm';

describe('SignUpForm', () => {
  test('renders the sign-up form with all fields', () => {
    render(<SignUpForm />);
    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument();
  });

  test('allows entry of first name', () => {
    render(<SignUpForm />);
    fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: 'John' } });
    expect(screen.getByLabelText(/first name/i).value).toBe('John');
  });

  test('allows entry of last name', () => {
    render(<SignUpForm />);
    fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: 'Doe' } });
    expect(screen.getByLabelText(/last name/i).value).toBe('Doe');
  });

  test('allows entry of email', () => {
    render(<SignUpForm />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'user@example.com' } });
    expect(screen.getByLabelText(/email/i).value).toBe('user@example.com');
  });

  test('allows entry of password', () => {
    render(<SignUpForm />);
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'Password123' } });
    expect(screen.getByLabelText(/password/i).value).toBe('Password123');
  });

  test.each([
    { password: 'Password1', isValid: true },
    { password: 'pass', isValid: false },
    { password: '12345678', isValid: false },
    { password: 'PASSWORD123', isValid: false },
  ])('validates password correctly with $password', ({ password, isValid }) => {
    render(<SignUpForm />);
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: password } });

    const createAccountButton = screen.getByRole('button', { name: /create account/i });

    if (isValid) {
      expect(createAccountButton).not.toBeDisabled();
    } else {
      expect(createAccountButton).toBeDisabled();
    }
  });

  test('validates email format correctly', () => {
    render(<SignUpForm />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'invalid' } });
    expect(screen.queryByText(/please enter a valid email address/i)).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'user@example.com' } });
    expect(screen.queryByText(/please enter a valid email address/i)).toBeNull();
  });

  test('enables create account button with valid form', () => {
    render(<SignUpForm />);
    fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'user@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'Password123' } });
    expect(screen.getByRole('button', { name: /create account/i })).not.toBeDisabled();
  });

  test('disables create account button with invalid form', () => {
    render(<SignUpForm />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'invalid' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'short' } });
    expect(screen.getByRole('button', { name: /create account/i })).toBeDisabled();
  });

  test('calls submit handler with correct data on valid form submission', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    render(<SignUpForm />);

    fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'user@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'Password123' } });
    fireEvent.click(screen.getByRole('button', { name: /create account/i }));

    expect(consoleSpy).toHaveBeenLastCalledWith('Form submitted:', {
      firstName: 'John',
      lastName: 'Doe',
      email: 'user@example.com',
      password: 'Password123',
    });

    consoleSpy.mockRestore();
  });
});
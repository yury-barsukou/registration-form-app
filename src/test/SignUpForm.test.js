import '@testing-library/jest-dom';
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import SignUpForm from '../SignUpForm';

describe('SignUpForm', () => {
  // Tests for SignUpForm will be similar to SignInForm but adapted for the sign-up form specifics
  test('renders the sign-up form with all fields', () => {
    render(<SignUpForm />);
    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument();
  });

  // Additional tests specific to SignUpForm requirements
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

  test('validates email format correctly in the sign-up form', () => {
    render(<SignUpForm />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'invalid' } });
    expect(screen.queryByText(/please enter a valid email address/i)).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'user@example.com' } });
    expect(screen.queryByText(/please enter a valid email address/i)).toBeNull();
  });

  test('validates password requirements correctly', () => {
    render(<SignUpForm />);
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'Weak' } });
    expect(screen.queryByText(/1 uppercase character/i)).toBeInTheDocument();
    expect(screen.queryByText(/1 lowercase character/i)).toBeInTheDocument();
    expect(screen.queryByText(/1 number/i)).toBeInTheDocument();
    expect(screen.queryByText(/minimum 8 characters/i)).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'StrongPassword1' } });
    expect(screen.queryByText(/1 uppercase character/i)).toBeNull();
    expect(screen.queryByText(/1 lowercase character/i)).toBeNull();
    expect(screen.queryByText(/1 number/i)).toBeNull();
    expect(screen.queryByText(/minimum 8 characters/i)).toBeNull();
  });

  test('disables create account button with invalid form', () => {
    render(<SignUpForm />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'invalid' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'short' } });
    expect(screen.getByRole('button', { name: /create account/i })).toBeDisabled();
  });

  test('enables create account button with valid form', () => {
    render(<SignUpForm />);
    fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'user@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'StrongPassword1' } });
    expect(screen.getByRole('button', { name: /create account/i })).not.toBeDisabled();
  });

  test('calls submit handler with correct data on valid form submission', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    render(<SignUpForm />);

    fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'user@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'StrongPassword1' } });
    fireEvent.click(screen.getByRole('button', { name: /create account/i }));

    expect(consoleSpy).toHaveBeenLastCalledWith('Form submitted:', {
      firstName: 'John',
      lastName: 'Doe',
      email: 'user@example.com',
      password: 'StrongPassword1',
    });

    consoleSpy.mockRestore();
  });
});
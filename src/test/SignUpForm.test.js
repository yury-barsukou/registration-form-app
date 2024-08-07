import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SignUpForm from '../SignUpForm';

describe('SignUpForm', () => {
  test('renders all fields and the create account button', () => {
    render(<SignUpForm />);
    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument();
  });

  test.each([
    ['firstName', 'John'],
    ['lastName', 'Doe'],
    ['email', 'john.doe@example.com'],
    ['password', 'Password123'],
  ])('allows entry of %s', (fieldName, value) => {
    render(<SignUpForm />);
    fireEvent.change(screen.getByLabelText(new RegExp(fieldName, 'i')), { target: { value } });
    expect(screen.getByLabelText(new RegExp(fieldName, 'i')).value).toBe(value);
  });

  test('validates email format correctly', () => {
    render(<SignUpForm />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'invalid' } });
    expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'user@example.com' } });
    expect(screen.queryByText(/please enter a valid email address/i)).toBeNull();
  });

  test('validates password requirements correctly', () => {
    render(<SignUpForm />);
    const passwordField = screen.getByLabelText(/password/i);

    fireEvent.change(passwordField, { target: { value: 'short' } });
    expect(screen.getByText(/minimum 8 characters/i)).toHaveClass('invalid');
    fireEvent.change(passwordField, { target: { value: 'Long123' } });
    expect(screen.getByText(/minimum 8 characters/i)).toHaveClass('valid');
    expect(screen.getByText(/1 uppercase character/i)).toHaveClass('valid');
    expect(screen.getByText(/1 lowercase character/i)).toHaveClass('valid');
    expect(screen.getByText(/1 number/i)).toHaveClass('valid');
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
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'Password123' } });
    expect(screen.getByRole('button', { name: /create account/i })).not.toBeDisabled();
  });

  test('calls console.log with correct data on valid form submission', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    render(<SignUpForm />);

    fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'user@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'Password123' } });
    fireEvent.click(screen.getByRole('button', { name: /create account/i }));

    expect(consoleSpy).toHaveBeenCalledWith('Form submitted:', {
      firstName: 'John',
      lastName: 'Doe',
      email: 'user@example.com',
      password: 'Password123',
    });

    consoleSpy.mockRestore();
  });
});
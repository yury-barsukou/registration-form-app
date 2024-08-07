import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SignUpForm from '../SignUpForm';

describe('SignUpForm', () => {
  // Test for rendering all input fields and button
  test('renders the sign-up form with all fields', () => {
    render(<SignUpForm />);
    const inputFields = [
      screen.getByLabelText(/first name/i),
      screen.getByLabelText(/last name/i),
      screen.getByLabelText(/email/i),
      screen.getByLabelText(/password/i)
    ];
    inputFields.forEach(input => expect(input).toBeInTheDocument());
    expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument();
  });

  // Test for input value changes
  test('allows entry of first name, last name, email, and password', () => {
    render(<SignUpForm />);
    const testData = [
      { label: /first name/i, value: 'John' },
      { label: /last name/i, value: 'Doe' },
      { label: /email/i, value: 'user@example.com' },
      { label: /password/i, value: 'Password123' }
    ];
    testData.forEach(({ label, value }) => {
      fireEvent.change(screen.getByLabelText(label), { target: { value } });
      expect(screen.getByLabelText(label).value).toBe(value);
    });
  });

  // Test for email validation
  test('validates email format correctly', () => {
    render(<SignUpForm />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'invalid' } });
    expect(screen.queryByText(/please enter a valid email address/i)).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'user@example.com' } });
    expect(screen.queryByText(/please enter a valid email address/i)).toBeNull();
  });

  // Test for password validation
  test('validates password criteria correctly', () => {
    render(<SignUpForm />);
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'pass' } });
    expect(screen.queryByText(/minimum 8 characters/i)).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'Password123' } });
    expect(screen.queryByText(/minimum 8 characters/i)).toBeNull();
  });

  // Test for create account button being disabled with invalid form
  test('disables create account button with invalid form', () => {
    render(<SignUpForm />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'invalid' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'short' } });
    expect(screen.getByRole('button', { name: /create account/i })).toBeDisabled();
  });

  // Test for create account button being enabled with valid form
  test('enables create account button with valid form', () => {
    render(<SignUpForm />);
    fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'user@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'Password123' } });
    expect(screen.getByRole('button', { name: /create account/i })).not.toBeDisabled();
  });

  // Test for form submission with correct data
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
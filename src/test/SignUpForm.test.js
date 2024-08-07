import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SignUpForm from '../SignUpForm';

describe('SignUpForm', () => {
  test('renders the sign-up form with all fields', () => {
    const { getByLabelText, getByRole } = render(<SignUpForm />);
    expect(getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(getByLabelText(/Email/i)).toBeInTheDocument();
    expect(getByLabelText(/Password/i)).toBeInTheDocument();
    expect(getByRole('button', { name: /create account/i })).toBeInTheDocument();
  });

  test.each([
    { field: 'firstName', value: 'John' },
    { field: 'lastName', value: 'Doe' },
    { field: 'email', value: 'john.doe@example.com' },
    { field: 'password', value: 'Password123' }
  ])('allows entry of $field', ({ field, value }) => {
    const { getByLabelText } = render(<SignUpForm />);
    fireEvent.change(getByLabelText(new RegExp(field, 'i')), { target: { value } });
    expect(getByLabelText(new RegExp(field, 'i')).value).toBe(value);
  });

  test('validates email correctly', () => {
    const { getByLabelText, queryByText } = render(<SignUpForm />);
    fireEvent.change(getByLabelText(/Email/i), { target: { value: 'invalid' } });
    expect(queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    fireEvent.change(getByLabelText(/Email/i), { target: { value: 'john.doe@example.com' } });
    expect(queryByText(/Please enter a valid email address/i)).toBeNull();
  });

  test.each([
    { password: 'Short1', valid: false },
    { password: 'LongEnoughPassword', valid: false },
    { password: 'lowercaseand123', valid: false },
    { password: 'UPPERCASEAND123', valid: false },
    { password: 'ValidPassword1', valid: true }
  ])('validates password "$password" as $valid', ({ password, valid }) => {
    const { getByLabelText, queryByText } = render(<SignUpForm />);
    fireEvent.change(getByLabelText(/Password/i), { target: { value: password } });
    if (valid) {
      expect(queryByText(/Minimum 8 characters/i)).not.toHaveClass('red');
    } else {
      expect(queryByText(/Minimum 8 characters/i)).toHaveClass('red');
    }
  });

  test('disables create account button with invalid form', () => {
    const { getByLabelText, getByRole } = render(<SignUpForm />);
    fireEvent.change(getByLabelText(/Email/i), { target: { value: 'invalid' } });
    fireEvent.change(getByLabelText(/Password/i), { target: { value: 'short' } });
    expect(getByRole('button', { name: /create account/i })).toBeDisabled();
  });

  test('enables create account button with valid form', () => {
    const { getByLabelText, getByRole } = render(<SignUpForm />);
    fireEvent.change(getByLabelText(/First Name/i), { target: { value: 'John' } });
    fireEvent.change(getByLabelText(/Last Name/i), { target: { value: 'Doe' } });
    fireEvent.change(getByLabelText(/Email/i), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(getByLabelText(/Password/i), { target: { value: 'Password123' } });
    expect(getByRole('button', { name: /create account/i })).not.toBeDisabled();
  });

  test('calls console.log with correct data on valid form submission', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    const { getByLabelText, getByRole } = render(<SignUpForm />);

    fireEvent.change(getByLabelText(/First Name/i), { target: { value: 'John' } });
    fireEvent.change(getByLabelText(/Last Name/i), { target: { value: 'Doe' } });
    fireEvent.change(getByLabelText(/Email/i), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(getByLabelText(/Password/i), { target: { value: 'Password123' } });
    fireEvent.click(getByRole('button', { name: /create account/i }));

    expect(consoleSpy).toHaveBeenCalledWith('Form submitted:', {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'Password123',
    });

    consoleSpy.mockRestore();
  });
});
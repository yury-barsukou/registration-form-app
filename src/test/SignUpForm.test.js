import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SignUpForm from '../SignUpForm';

describe('SignUpForm', () => {
  test('it initializes with empty inputs and invalid form state', () => {
    render(<SignUpForm />);
    expect(screen.getByLabelText(/First Name/i)).toHaveValue('');
    expect(screen.getByLabelText(/Last Name/i)).toHaveValue('');
    expect(screen.getByLabelText(/Email/i)).toHaveValue('');
    expect(screen.getByLabelText(/Password/i)).toHaveValue('');
    expect(screen.getByRole('button', { name: /Create Account/i })).toBeDisabled();
  });

  test.each([
    { input: 'firstName', value: 'John', expected: 'John' },
    { input: 'lastName', value: 'Doe', expected: 'Doe' },
    { input: 'email', value: 'john.doe@example.com', expected: 'john.doe@example.com' },
    { input: 'password', value: 'Password123', expected: 'Password123' },
  ])('updates state on $input change', ({ input, value, expected }) => {
    render(<SignUpForm />);
    fireEvent.change(screen.getByLabelText(new RegExp(input, 'i')), { target: { value } });
    expect(screen.getByLabelText(new RegExp(input, 'i'))).toHaveValue(expected);
  });

  test.each([
    { email: 'user@example.com', isValid: true },
    { email: 'invalid-email', isValid: false },
    { email: 'user@.com', isValid: false },
    { email: 'user@domain', isValid: false },
  ])('validates email: $email as $isValid', ({ email, isValid }) => {
    render(<SignUpForm />);
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: email } });
    expect(screen.queryByText(/Please enter a valid email address/i)).toBe(isValid ? null : expect.anything());
  });

  test.each([
    { password: 'Short1', isValid: false },
    { password: 'longenoughwithoutnumber', isValid: false },
    { password: 'Password123', isValid: true },
    { password: '12345678', isValid: false },
    { password: 'Lowerand123', isValid: false },
  ])('validates password: $password as $isValid', ({ password, isValid }) => {
    render(<SignUpForm />);
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: password } });
    expect(screen.getByText(/Minimum 8 characters/i).className).toContain(isValid ? 'valid' : 'invalid');
  });

  test('allows form submission only when valid', () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(<SignUpForm />);
    fireEvent.click(screen.getByRole('button', { name: /Create Account/i }));
    expect(errorSpy).toHaveBeenCalledWith('Form is invalid');

    fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'Password123' } });

    fireEvent.click(screen.getByRole('button', { name: /Create Account/i }));
    expect(logSpy).toHaveBeenCalledWith('Form submitted:', {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'Password123',
    });

    logSpy.mockRestore();
    errorSpy.mockRestore();
  });
});
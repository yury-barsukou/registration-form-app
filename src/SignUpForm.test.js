import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SignUpForm from './SignUpForm';

describe('SignUpForm', () => {
  test('Input change updates state', () => {
    render(<SignUpForm />);
    const firstNameInput = screen.getByLabelText(/First Name/i);
    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    expect(firstNameInput.value).toBe('John');
  });

  describe('Password Validation', () => {
    const testCases = [
      { password: 'Password1', expected: true },
      { password: 'password', expected: false },
      { password: 'PASSWORD', expected: false },
      { password: '12345678', expected: false },
    ];

    testCases.forEach(({ password, expected }) => {
      test(`\"${password}\" validation result should be ${expected}`, () => {
        render(<SignUpForm />);
        const passwordInput = screen.getByLabelText(/Password/i);
        fireEvent.change(passwordInput, { target: { value: password } });
        const submitButton = screen.getByText(/Create Account/i);
        if (expected) {
          expect(submitButton).not.toHaveClass('btn-disabled');
        } else {
          expect(submitButton).toHaveClass('btn-disabled');
        }
      });
    });
  });

  describe('Email Validation', () => {
    const testCases = [
      { email: 'test@example.com', expected: true },
      { email: 'invalid-email', expected: false },
    ];

    testCases.forEach(({ email, expected }) => {
      test(`\"${email}\" validation result should be ${expected}`, () => {
        render(<SignUpForm />);
        const emailInput = screen.getByLabelText(/Email/i);
        fireEvent.change(emailInput, { target: { value: email } });
        const validationMessage = screen.queryByText(/Please enter a valid email address/i);
        if (expected) {
          expect(validationMessage).not.toBeInTheDocument();
        } else {
          expect(validationMessage).toBeInTheDocument();
        }
      });
    });
  });

  test('Form submission', () => {
    const { getByText } = render(<SignUpForm />);
    const submitButton = getByText(/Create Account/i);
    fireEvent.click(submitButton);
    // Assuming console.error is called on invalid form submission
    expect(console.error).toHaveBeenCalledWith('Form is invalid');
    // Further implementation would mock a submission handler and verify its invocation on valid submission
  });
});
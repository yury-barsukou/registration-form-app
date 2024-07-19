import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SignUpForm from './SignUpForm';

describe('SignUpForm', () => {
  test('initial state is set correctly', () => {
    const { getByLabelText } = render(<SignUpForm />);
    expect(getByLabelText(/First Name/i).value).toBe('');
    expect(getByLabelText(/Last Name/i).value).toBe('');
    expect(getByLabelText(/Email/i).value).toBe('');
    expect(getByLabelText(/Password/i).value).toBe('');
  });

  test('user input updates the state', () => {
    const { getByLabelText } = render(<SignUpForm />);
    const firstNameInput = getByLabelText(/First Name/i);
    const lastNameInput = getByLabelText(/Last Name/i);
    const emailInput = getByLabelText(/Email/i);
    const passwordInput = getByLabelText(/Password/i);

    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Password123' } });

    expect(firstNameInput.value).toBe('John');
    expect(lastNameInput.value).toBe('Doe');
    expect(emailInput.value).toBe('john.doe@example.com');
    expect(passwordInput.value).toBe('Password123');
  });

  // Additional test cases for email validation, password validation, and form submission will be added here
});
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SignUpForm from '../SignUpForm';

describe('SignUpForm', () => {
  test('input change handling', () => {
    const { getByLabelText } = render(<SignUpForm />);
    const firstNameInput = getByLabelText(/first name/i);
    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    expect(firstNameInput.value).toBe('John');

    const lastNameInput = getByLabelText(/last name/i);
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    expect(lastNameInput.value).toBe('Doe');

    const emailInput = getByLabelText(/email/i);
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
    expect(emailInput.value).toBe('john.doe@example.com');

    const passwordInput = getByLabelText(/password/i);
    fireEvent.change(passwordInput, { target: { value: 'Password123!' } });
    expect(passwordInput.value).toBe('Password123!');
  });

  test('email validation', () => {
    const { getByLabelText, queryByText } = render(<SignUpForm />);
    const emailInput = getByLabelText(/email/i);
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    expect(queryByText(/please enter a valid email address/i)).toBeInTheDocument();

    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
    expect(queryByText(/please enter a valid email address/i)).not.toBeInTheDocument();
  });

  test('password validation', () => {
    const { getByLabelText, queryByText } = render(<SignUpForm />);
    const passwordInput = getByLabelText(/password/i);
    fireEvent.change(passwordInput, { target: { value: 'short' } });
    expect(queryByText(/minimum 8 characters/i)).toBeInTheDocument();

    fireEvent.change(passwordInput, { target: { value: 'Password123!' } });
    expect(queryByText(/minimum 8 characters/i)).not.toBeInTheDocument();
  });

  test('form submission with valid data', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    const { getByText } = render(<SignUpForm />);
    fireEvent.click(getByText(/create account/i));
    expect(consoleSpy).toHaveBeenCalledWith('Form submitted:', expect.any(Object));
  });

  test('form submission with invalid data', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error');
    const { getByText } = render(<SignUpForm />);
    fireEvent.click(getByText(/create account/i));
    expect(consoleErrorSpy).toHaveBeenCalledWith('Form is invalid');
  });
});
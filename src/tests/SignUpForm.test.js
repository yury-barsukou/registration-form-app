import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SignUpForm from '../SignUpForm';

describe('SignUpForm Component Tests', () => {
  test('Input Changes Handling', () => {
    render(<SignUpForm />);
    const firstNameInput = screen.getByLabelText(/First Name/i);
    const lastNameInput = screen.getByLabelText(/Last Name/i);
    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);

    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Password123' } });

    expect(firstNameInput.value).toBe('John');
    expect(lastNameInput.value).toBe('Doe');
    expect(emailInput.value).toBe('john.doe@example.com');
    expect(passwordInput.value).toBe('Password123');
  });

  test('Email Validation - Valid and Invalid', () => {
    render(<SignUpForm />);
    const emailInput = screen.getByLabelText(/Email/i);
    fireEvent.change(emailInput, { target: { value: 'invalidemail' } });
    expect(screen.getByText(/Please enter a valid email address/i)).toBeInTheDocument();

    fireEvent.change(emailInput, { target: { value: 'valid.email@example.com' } });
    expect(screen.queryByText(/Please enter a valid email address/i)).not.toBeInTheDocument();
  });

  // Additional tests for password validation, form validation, and form submission to be implemented here
});
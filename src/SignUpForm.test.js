import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import SignUpForm from './SignUpForm';

describe('SignUpForm', () => {
  test('input changes update state', () => {
    render(<SignUpForm />);
    const firstNameInput = screen.getByLabelText(/First Name/i);
    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    expect(firstNameInput.value).toBe('John');
  });

  test('password validation logic', () => {
    render(<SignUpForm />);
    const passwordInput = screen.getByLabelText(/Password/i);
    fireEvent.change(passwordInput, { target: { value: 'Pass123' } });
    expect(screen.getByText(/Minimum 8 characters/i)).toHaveClass('invalid');
    fireEvent.change(passwordInput, { target: { value: 'Password1' } });
    expect(screen.getByText(/Minimum 8 characters/i)).toHaveClass('valid');
  });

  test('email validation logic', () => {
    render(<SignUpForm />);
    const emailInput = screen.getByLabelText(/Email/i);
    fireEvent.change(emailInput, { target: { value: 'invalidemail' } });
    expect(screen.getByText(/Please enter a valid email address/i)).toBeInTheDocument();
    fireEvent.change(emailInput, { target: { value: 'email@example.com' } });
    expect(screen.queryByText(/Please enter a valid email address/i)).toBeNull();
  });

  test('form validation logic enables submit button', () => {
    render(<SignUpForm />);
    const submitButton = screen.getByText(/Create Account/i);
    expect(submitButton).toHaveClass('btn-disabled');
    // Here you would simulate filling in all valid inputs
    // Check then if submit button is not disabled anymore
  });

  test('form submission', () => {
    render(<SignUpForm />);
    const form = screen.getByTestId('signup-form');
    // Simulate filling the form with valid data
    fireEvent.submit(form);
    // Expect some function to have been called, indicating form submission
  });
});
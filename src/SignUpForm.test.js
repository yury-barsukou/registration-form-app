import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SignUpForm from './SignUpForm';

describe('SignUpForm', () => {
  test('renders SignUpForm component', () => {
    const { getByText } = render(<SignUpForm />);
    expect(getByText(/Create Account/i)).toBeInTheDocument();
  });

  test('input change updates state', () => {
    const { getByLabelText } = render(<SignUpForm />);
    const firstNameInput = getByLabelText(/First Name/i);
    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    expect(firstNameInput.value).toBe('John');
  });

  test('validates email correctly', () => {
    const { getByLabelText, queryByText } = render(<SignUpForm />);
    const emailInput = getByLabelText(/Email/i);
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    expect(queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    fireEvent.change(emailInput, { target: { value: 'email@example.com' } });
    expect(queryByText(/Please enter a valid email address/i)).not.toBeInTheDocument();
  });

  test('validates password correctly', () => {
    const { getByLabelText, getByText } = render(<SignUpForm />);
    const passwordInput = getByLabelText(/Password/i);
    fireEvent.change(passwordInput, { target: { value: 'Short1' } });
    expect(getByText(/Minimum 8 characters/i)).toHaveClass('invalid');
    fireEvent.change(passwordInput, { target: { value: 'ValidPass1' } });
    expect(getByText(/Minimum 8 characters/i)).toHaveClass('valid');
  });

  test('form submission with valid and invalid data', () => {
    const { getByText, getByLabelText } = render(<SignUpForm />);
    const firstNameInput = getByLabelText(/First Name/i);
    const emailInput = getByLabelText(/Email/i);
    const passwordInput = getByLabelText(/Password/i);
    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(emailInput, { target: { value: 'email@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'ValidPass1' } });
    fireEvent.click(getByText(/Create Account/i));
    // Since we cannot simulate an actual submission in Jest, we'll just check if the button becomes disabled after a valid submission attempt
    expect(getByText(/Create Account/i)).toBeDisabled();
  });
});
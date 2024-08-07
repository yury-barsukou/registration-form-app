import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SignUpForm from './SignUpForm';

describe('SignUpForm Component', () => {
  test('updates formData state on input change', () => {
    const { getByLabelText } = render(<SignUpForm />);
    const firstNameInput = getByLabelText(/First Name/i);
    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    expect(firstNameInput.value).toBe('John');
  });

  test('validates password correctly', () => {
    const { getByLabelText, queryByText } = render(<SignUpForm />);
    const passwordInput = getByLabelText(/Password/i);
    fireEvent.change(passwordInput, { target: { value: 'Password1' } });
    expect(queryByText(/1 uppercase character/i)).toHaveClass('valid');
    expect(queryByText(/1 lowercase character/i)).toHaveClass('valid');
    expect(queryByText(/1 number/i)).toHaveClass('valid');
    expect(queryByText(/Minimum 8 characters/i)).toHaveClass('valid');
  });

  test('validates email correctly', () => {
    const { getByLabelText, queryByText } = render(<SignUpForm />);
    const emailInput = getByLabelText(/Email/i);
    fireEvent.change(emailInput, { target: { value: 'invalidemail' } });
    expect(queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    fireEvent.change(emailInput, { target: { value: 'email@example.com' } });
    expect(queryByText(/Please enter a valid email address/i)).not.toBeInTheDocument();
  });

  test('blocks form submission with invalid data', () => {
    const { getByText } = render(<SignUpForm />);
    const submitButton = getByText(/Create Account/i);
    expect(submitButton).toBeDisabled();
  });

  test('allows form submission with valid data', () => {
    console.log = jest.fn();
    const { getByLabelText, getByText } = render(<SignUpForm />);
    fireEvent.change(getByLabelText(/First Name/i), { target: { value: 'John' } });
    fireEvent.change(getByLabelText(/Last Name/i), { target: { value: 'Doe' } });
    fireEvent.change(getByLabelText(/Email/i), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(getByLabelText(/Password/i), { target: { value: 'Password1' } });
    fireEvent.click(getByText(/Create Account/i));
    expect(console.log).toHaveBeenCalledWith('Form submitted:', expect.any(Object));
  });

  // Additional tests for edge cases and error handling can be added here
});
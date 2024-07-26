import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SignUpForm from './SignUpForm';

describe('SignUpForm', () => {
  test('updates formData state on input change', () => {
    const { getByLabelText } = render(<SignUpForm />);
    const emailInput = getByLabelText(/email/i);
    fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
    expect(emailInput.value).toBe('user@example.com');

    const passwordInput = getByLabelText(/password/i);
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    expect(passwordInput.value).toBe('password123');
  });

  test('validates password correctly', () => {
    const { getByLabelText, getByText } = render(<SignUpForm />);
    const passwordInput = getByLabelText(/password/i);
    fireEvent.change(passwordInput, { target: { value: 'short' } });
    fireEvent.blur(passwordInput);
    expect(getByText(/password must be at least 6 characters/i)).toBeInTheDocument();
  });

  test('validates email correctly', () => {
    const { getByLabelText, queryByText } = render(<SignUpForm />);
    const emailInput = getByLabelText(/email/i);
    fireEvent.change(emailInput, { target: { value: 'invalidEmail' } });
    fireEvent.blur(emailInput);
    expect(queryByText(/invalid email address/i)).toBeInTheDocument();
  });

  test('identifies valid and invalid form correctly', () => {
    const { getByLabelText, getByText } = render(<SignUpForm />);
    const emailInput = getByLabelText(/email/i);
    const passwordInput = getByLabelText(/password/i);
    const submitButton = getByText(/submit/i);
    
    // Invalid case
    fireEvent.change(emailInput, { target: { value: 'invalidEmail' } });
    fireEvent.change(passwordInput, { target: { value: '12345' } });
    fireEvent.click(submitButton);
    expect(getByText(/invalid email address/i)).toBeInTheDocument();
    expect(getByText(/password must be at least 6 characters/i)).toBeInTheDocument();
    
    // Valid case
    fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);
    expect(queryByText(/invalid email address/i)).not.toBeInTheDocument();
    expect(queryByText(/password must be at least 6 characters/i)).not.toBeInTheDocument();
  });

  test('handles form submission correctly based on form validity', () => {
    const onSubmitMock = jest.fn();
    const { getByLabelText, getByText } = render(<SignUpForm onSubmit={onSubmitMock} />);
    const emailInput = getByLabelText(/email/i);
    const passwordInput = getByLabelText(/password/i);
    const submitButton = getByText(/submit/i);

    // Valid submission
    fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);
    expect(onSubmitMock).toHaveBeenCalled();

    // Resetting mock function for next scenario
    onSubmitMock.mockReset();

    // Invalid submission
    fireEvent.change(emailInput, { target: { value: 'invalidEmail' } });
    fireEvent.change(passwordInput, { target: { value: '12345' } });
    fireEvent.click(submitButton);
    expect(onSubmitMock).not.toHaveBeenCalled();
  });
});
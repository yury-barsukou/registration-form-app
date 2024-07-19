import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import SignUpForm from './SignUpForm';

describe('SignUpForm', () => {
  test('Component renders without crashing', () => {
    const { getByLabelText } = render(<SignUpForm />);
    expect(getByLabelText(/First Name/i)).toBeInTheDocument();
  });

  test('Email validation works correctly', async () => {
    const { getByLabelText, queryByText } = render(<SignUpForm />);
    const emailInput = getByLabelText(/Email/i);
    
    fireEvent.change(emailInput, { target: { value: 'invalidEmail' } });
    await waitFor(() => expect(queryByText(/Please enter a valid email address/i)).toBeInTheDocument());
    
    fireEvent.change(emailInput, { target: { value: 'valid@example.com' } });
    expect(queryByText(/Please enter a valid email address/i)).not.toBeInTheDocument();
  });

  test('Form submission is disabled with invalid data', () => {
    const { getByText, getByLabelText } = render(<SignUpForm />);
    fireEvent.click(getByText(/Create Account/i));
    expect(getByText(/Create Account/i)).toBeDisabled();
  });

  test('Form enables submission with valid data', () => {
    const { getByLabelText, getByText } = render(<SignUpForm />);
    
    fireEvent.change(getByLabelText(/First Name/i), { target: { value: 'John' } });
    fireEvent.change(getByLabelText(/Last Name/i), { target: { value: 'Doe' } });
    fireEvent.change(getByLabelText(/Email/i), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(getByLabelText(/Password/i), { target: { value: 'Password123' } });
    
    expect(getByText(/Create Account/i)).not.toBeDisabled();
  });
});
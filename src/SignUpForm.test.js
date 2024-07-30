import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SignUpForm from './SignUpForm';

describe('SignUpForm', () => {
  test('validates email correctly', () => {
    render(<SignUpForm />);
    const emailInput = screen.getByLabelText(/email/i);
    fireEvent.change(emailInput, { target: { value: 'invalidemail' } });
    expect(screen.getByText(/Please enter a valid email address/)).toBeInTheDocument();
    fireEvent.change(emailInput, { target: { value: 'valid@email.com' } });
    expect(screen.queryByText(/Please enter a valid email address/)).not.toBeInTheDocument();
  });

  test('password validation works for various criteria', () => {
    render(<SignUpForm />);
    const passwordInput = screen.getByLabelText(/password/i);
    fireEvent.change(passwordInput, { target: { value: 'Short1' } });
    expect(screen.getByText(/Minimum 8 characters/)).toHaveClass('invalid');
    fireEvent.change(passwordInput, { target: { value: 'Longpassword' } });
    expect(screen.getByText(/1 number/)).toHaveClass('invalid');
    fireEvent.change(passwordInput, { target: { value: 'Valid1Password' } });
    expect(screen.getByText(/Minimum 8 characters/)).toHaveClass('valid');
  });

  test('form submission button is enabled only when the form is valid', () => {
    render(<SignUpForm />);
    const submitButton = screen.getByRole('button', { name: /create account/i });
    expect(submitButton).toBeDisabled();
    fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'john.doe@email.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'Password1' } });
    expect(submitButton).not.toBeDisabled();
  });
});
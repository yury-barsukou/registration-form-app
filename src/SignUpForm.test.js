import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SignUpForm from './SignUpForm';

describe('SignUpForm Component Tests', () => {
  test('renders SignUpForm component and checks initial state', () => {
    render(<SignUpForm />);
    // Check initial state
    expect(screen.getByLabelText(/First Name/i)).toHaveValue('');
    expect(screen.getByLabelText(/Last Name/i)).toHaveValue('');
    expect(screen.getByLabelText(/Email/i)).toHaveValue('');
    expect(screen.getByLabelText(/Password/i)).toHaveValue('');
    expect(screen.getByRole('button', { name: /Create Account/i })).toBeDisabled();
  });

  test('input change updates state', () => {
    render(<SignUpForm />);
    fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'Password1' } });
    
    // Check state update
    expect(screen.getByLabelText(/First Name/i)).toHaveValue('John');
    expect(screen.getByLabelText(/Last Name/i)).toHaveValue('Doe');
    expect(screen.getByLabelText(/Email/i)).toHaveValue('john.doe@example.com');
    expect(screen.getByLabelText(/Password/i)).toHaveValue('Password1');
    expect(screen.getByRole('button', { name: /Create Account/i })).not.toBeDisabled();
  });

  test('email validation works correctly', () => {
    render(<SignUpForm />);
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'invalid-email' } });
    expect(screen.getByText(/Please enter a valid email address/i)).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'valid@example.com' } });
    expect(screen.queryByText(/Please enter a valid email address/i)).not.toBeInTheDocument();
  });

  test('password validation works correctly', () => {
    render(<SignUpForm />);
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'short' } });
    expect(screen.getByText(/Minimum 8 characters/i).className).toContain('invalid');
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'LongEnough1' } });
    expect(screen.getByText(/Minimum 8 characters/i).className).toContain('valid');
    expect(screen.getByText(/1 number/i).className).toContain('valid');
  });

  test('form submission is prevented when invalid', () => {
    render(<SignUpForm />);
    fireEvent.click(screen.getByRole('button', { name: /Create Account/i }));
    // Since the form is invalid, we expect no console log for form submission
    expect(console.log).not.toHaveBeenCalled();
  });

  test('form submission is allowed when valid', () => {
    render(<SignUpForm />);
    // Fill in valid data
    fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'Jane' } });
    fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'jane.doe@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'Password123' } });
    fireEvent.click(screen.getByRole('button', { name: /Create Account/i }));
    // We expect some form submission logic, which might be console.log or other function call
    expect(console.log).toHaveBeenCalledWith(expect.anything());
  });
});
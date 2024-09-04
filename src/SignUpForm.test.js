import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SignUpForm from './SignUpForm';

describe('SignUpForm', () => {
  test('renders SignUpForm component', () => {
    render(<SignUpForm />);
    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  });

  test('validates email correctly', () => {
    render(<SignUpForm />);
    const emailInput = screen.getByLabelText(/Email/i);
    fireEvent.change(emailInput, { target: { value: 'invalidemail' } });
    expect(screen.getByText(/Please enter a valid email address/i)).toBeInTheDocument();
    fireEvent.change(emailInput, { target: { value: 'validemail@example.com' } });
    expect(screen.queryByText(/Please enter a valid email address/i)).toBeNull();
  });

  test('validates password correctly', () => {
    render(<SignUpForm />);
    const passwordInput = screen.getByLabelText(/Password/i);
    fireEvent.change(passwordInput, { target: { value: 'Short1' } });
    expect(screen.getByText(/Minimum 8 characters/i)).toHaveClass('red');
    fireEvent.change(passwordInput, { target: { value: 'Longpassword' } });
    expect(screen.getByText(/1 number/i)).toHaveClass('red');
    fireEvent.change(passwordInput, { target: { value: 'Longpassword1' } });
    expect(screen.getByText(/1 number/i)).toHaveClass('green');
  });

  test('enables submit button only when form is valid', () => {
    render(<SignUpForm />);
    const submitButton = screen.getByRole('button', { name: /Create Account/i });
    expect(submitButton).toHaveClass('btn-disabled');
    fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'Password1' } });
    expect(submitButton).not.toHaveClass('btn-disabled');
  });

  test('form submission with valid data', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    render(<SignUpForm />);
    fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'Password1' } });
    fireEvent.click(screen.getByRole('button', { name: /Create Account/i }));
    expect(consoleSpy).toHaveBeenCalledWith('Form submitted:', {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'Password1',
    });
    consoleSpy.mockRestore();
  });

  test('form submission with invalid data', () => {
    const consoleSpy = jest.spyOn(console, 'error');
    render(<SignUpForm />);
    fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: '' } });
    fireEvent.click(screen.getByRole('button', { name: /Create Account/i }));
    expect(consoleSpy).toHaveBeenCalledWith('Form is invalid');
    consoleSpy.mockRestore();
  });
});
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
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
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    expect(screen.getByText(/Please enter a valid email address/i)).toBeInTheDocument();
    fireEvent.change(emailInput, { target: { value: 'valid@example.com' } });
    expect(screen.queryByText(/Please enter a valid email address/i)).not.toBeInTheDocument();
  });

  test('validates password correctly', () => {
    render(<SignUpForm />);
    const passwordInput = screen.getByLabelText(/Password/i);
    fireEvent.change(passwordInput, { target: { value: 'Short1!' } });
    expect(screen.getByText(/1 uppercase character/i)).toHaveClass('green');
    expect(screen.getByText(/1 lowercase character/i)).toHaveClass('green');
    expect(screen.getByText(/1 number/i)).toHaveClass('green');
    expect(screen.getByText(/1 special symbol/i)).toHaveClass('green');
    expect(screen.getByText(/Minimum 10 characters/i)).toHaveClass('red');
    fireEvent.change(passwordInput, { target: { value: 'ValidPassword1!' } });
    expect(screen.getByText(/Minimum 10 characters/i)).toHaveClass('green');
  });

  test('enables submit button when form is valid', () => {
    render(<SignUpForm />);
    const firstNameInput = screen.getByLabelText(/First Name/i);
    const lastNameInput = screen.getByLabelText(/Last Name/i);
    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const submitButton = screen.getByText(/Create Account/i);

    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'ValidPassword1!' } });

    expect(submitButton).not.toHaveClass('btn-disabled');
    expect(submitButton).not.toBeDisabled();
  });

  test('disables submit button when form is invalid', () => {
    render(<SignUpForm />);
    const firstNameInput = screen.getByLabelText(/First Name/i);
    const lastNameInput = screen.getByLabelText(/Last Name/i);
    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const submitButton = screen.getByText(/Create Account/i);

    fireEvent.change(firstNameInput, { target: { value: '' } });
    fireEvent.change(lastNameInput, { target: { value: '' } });
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.change(passwordInput, { target: { value: 'short' } });

    expect(submitButton).toHaveClass('btn-disabled');
    expect(submitButton).toBeDisabled();
  });

  test('handles form submission correctly', () => {
    console.log = jest.fn();
    render(<SignUpForm />);
    const firstNameInput = screen.getByLabelText(/First Name/i);
    const lastNameInput = screen.getByLabelText(/Last Name/i);
    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const submitButton = screen.getByText(/Create Account/i);

    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'ValidPassword1!' } });

    fireEvent.click(submitButton);

    expect(console.log).toHaveBeenCalledWith('Form submitted:', {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'ValidPassword1!',
    });
  });

  test('displays error message when form is invalid on submit', () => {
    console.error = jest.fn();
    render(<SignUpForm />);
    const submitButton = screen.getByText(/Create Account/i);

    fireEvent.click(submitButton);

    expect(console.error).toHaveBeenCalledWith('Form is invalid');
  });
});
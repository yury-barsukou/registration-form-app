import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SignUpForm from './SignUpForm';

describe('SignUpForm', () => {
  test('renders SignUpForm component', () => {
    render(<SignUpForm />);
    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('email validation works correctly', () => {
    render(<SignUpForm />);
    const emailInput = screen.getByLabelText(/Email/i);
    fireEvent.change(emailInput, { target: { value: 'invalidemail' } });
    expect(screen.getByText(/Please enter a valid email address/i)).toBeInTheDocument();
    fireEvent.change(emailInput, { target: { value: 'validemail@example.com' } });
    expect(screen.queryByText(/Please enter a valid email address/i)).not.toBeInTheDocument();
  });

  test('password validation feedback', () => {
    render(<SignUpForm />);
    const passwordInput = screen.getByLabelText(/Password/i);
    fireEvent.change(passwordInput, { target: { value: 'Short1' } });
    expect(screen.getByText(/Minimum 8 characters/i)).toHaveClass('red');
    fireEvent.change(passwordInput, { target: { value: 'LongEnoughButNoNumbers' } });
    expect(screen.getByText(/1 number/i)).toHaveClass('red');
    fireEvent.change(passwordInput, { target: { value: 'ValidPassword1' } });
    expect(screen.getByText(/Minimum 8 characters/i)).toHaveClass('green');
  });

  test('submit button enabled only when form is valid', () => {
    render(<SignUpForm />);
    const submitButton = screen.getByRole('button');
    expect(submitButton).toHaveClass('btn-disabled');
    fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'ValidPass1' } });
    expect(submitButton).not.toHaveClass('btn-disabled');
  });

  test('form submission with valid data', () => {
    console.log = jest.fn();
    render(<SignUpForm />);
    fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'ValidPass1' } });
    fireEvent.click(screen.getByRole('button'));
    expect(console.log).toHaveBeenCalledWith('Form submitted:', {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'ValidPass1',
    });
  });

  test('form submission does not proceed with invalid data', () => {
    console.error = jest.fn();
    render(<SignUpForm />);
    fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'invalidemail' } });
    fireEvent.click(screen.getByRole('button'));
    expect(console.error).toHaveBeenCalledWith('Form is invalid');
  });
});
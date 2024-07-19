import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SignUpForm from './SignUpForm';

describe('SignUpForm', () => {
  test('updates input fields correctly', () => {
    render(<SignUpForm />);
    const firstNameInput = screen.getByLabelText(/First Name/i);
    const lastNameInput = screen.getByLabelText(/Last Name/i);
    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);

    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Password1' } });

    expect(firstNameInput.value).toBe('John');
    expect(lastNameInput.value).toBe('Doe');
    expect(emailInput.value).toBe('john.doe@example.com');
    expect(passwordInput.value).toBe('Password1');
  });

  test('validates email correctly', () => {
    render(<SignUpForm />);
    const emailInput = screen.getByLabelText(/Email/i);
    fireEvent.change(emailInput, { target: { value: 'invalid' } });
    const invalidFeedback = screen.queryByText(/Please enter a valid email address/i);
    expect(invalidFeedback).toBeInTheDocument();
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
    expect(invalidFeedback).not.toBeInTheDocument();
  });

  test('validates password correctly', () => {
    render(<SignUpForm />);
    const passwordInput = screen.getByLabelText(/Password/i);
    fireEvent.change(passwordInput, { target: { value: 'short' } });
    expect(screen.queryByText(/Minimum 8 characters/i)).toBeInTheDocument();
    fireEvent.change(passwordInput, { target: { value: 'NoNumbers' } });
    expect(screen.queryByText(/1 number/i)).toBeInTheDocument();
    fireEvent.change(passwordInput, { target: { value: 'ValidPassword1' } });
    expect(screen.queryByText(/1 uppercase character/i)).not.toBeInTheDocument();
  });

  test('enables submit button only when form is valid', () => {
    render(<SignUpForm />);
    const submitButton = screen.getByRole('button', { name: /Create Account/i });
    expect(submitButton).toBeDisabled();
    fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'ValidPassword1' } });
    expect(submitButton).not.toBeDisabled();
  });

  test('submits form correctly', async () => {
    const mockSubmit = jest.fn();
    render(<SignUpForm onSubmit={mockSubmit} />);
    const submitButton = screen.getByRole('button', { name: /Create Account/i });

    fireEvent.click(submitButton);
    await screen.findByText(/Form submitted/i);
    expect(mockSubmit).toHaveBeenCalled();
  });
});
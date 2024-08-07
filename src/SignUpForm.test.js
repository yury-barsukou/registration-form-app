import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SignUpForm from './SignUpForm';

describe('SignUpForm', () => {
  test('updates state on input change', () => {
    render(<SignUpForm />);
    const firstNameInput = screen.getByLabelText(/First Name/i);
    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    expect(firstNameInput.value).toBe('John');
  });

  test('validates email correctly', () => {
    render(<SignUpForm />);
    const emailInput = screen.getByLabelText(/Email/i);
    fireEvent.change(emailInput, { target: { value: 'invalidemail' } });
    expect(screen.getByText(/Please enter a valid email address/i)).toBeInTheDocument();
    fireEvent.change(emailInput, { target: { value: 'email@example.com' } });
    expect(screen.queryByText(/Please enter a valid email address/i)).not.toBeInTheDocument();
  });

  test('validates password correctly', () => {
    render(<SignUpForm />);
    const passwordInput = screen.getByLabelText(/Password/i);
    fireEvent.change(passwordInput, { target: { value: 'Abc123' } });
    expect(screen.getByText(/Minimum 8 characters/i)).toHaveClass('invalid');
    fireEvent.change(passwordInput, { target: { value: 'ValidPass1' } });
    expect(screen.getByText(/Minimum 8 characters/i)).toHaveClass('valid');
  });

  test('does not submit form if invalid', () => {
    const { container } = render(<SignUpForm />);
    const form = container.querySelector('form');
    const submitEventMock = jest.fn();
    form.onsubmit = submitEventMock;
    fireEvent.submit(form);
    expect(submitEventMock).not.toHaveBeenCalled();
  });

  // More tests covering other scenarios and edge cases should be added here.
});
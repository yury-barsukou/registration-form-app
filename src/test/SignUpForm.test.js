import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import SignUpForm from '../SignUpForm';

describe('SignUpForm', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  test('renders the sign-up form with all fields', () => {
    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Create Account/i })).toBeInTheDocument();
  });

  test('allows entry of all form fields', () => {
    fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'Password123' } });

    expect(screen.getByLabelText(/First Name/i).value).toBe('John');
    expect(screen.getByLabelText(/Last Name/i).value).toBe('Doe');
    expect(screen.getByLabelText(/Email/i).value).toBe('john.doe@example.com');
    expect(screen.getByLabelText(/Password/i).value).toBe('Password123');
  });

  test('validates email and password format correctly', () => {
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'invalid' } });
    expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john.doe@example.com' } });
    expect(screen.queryByText(/Please enter a valid email address/i)).toBeNull();

    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'short' } });
    expect(screen.queryByText(/Minimum 8 characters/i)).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'Password123' } });
    expect(screen.queryByText(/Minimum 8 characters/i)).toBeNull();
  });

  test('disables Create Account button with invalid form', () => {
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'invalid' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'short' } });
    expect(screen.getByRole('button', { name: /Create Account/i })).toBeDisabled();
  });

  test('enables Create Account button with valid form', () => {
    fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'Password123' } });
    expect(screen.getByRole('button', { name: /Create Account/i })).not.toBeDisabled();
  });

  test('calls console.log with correct data on valid form submission', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'Password123' } });
    fireEvent.click(screen.getByRole('button', { name: /Create Account/i }));

    expect(consoleSpy).toHaveBeenCalledWith('Form submitted:', {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'Password123',
    });

    consoleSpy.mockRestore();
  });
});
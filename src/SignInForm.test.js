import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SignInForm from './SignInForm';


describe('SignInForm', () => {
  test('renders the sign-in form with all fields', () => {
    render(<SignInForm />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  test('allows entry of email', () => {
    render(<SignInForm />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'user@example.com' } });
    expect(screen.getByLabelText(/email/i).value).toBe('user@example.com');
  });

  test('allows entry of password', () => {
    render(<SignInForm />);
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    expect(screen.getByLabelText(/password/i).value).toBe('password123');
  });

  test('validates email format correctly', () => {
    render(<SignInForm />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'invalid' } });
    expect(screen.queryByText(/please enter a valid email address/i)).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'user@example.com' } });
    expect(screen.queryByText(/please enter a valid email address/i)).toBeNull();
  });

  test('validates password length correctly', () => {
    render(<SignInForm />);
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'short' } });
    expect(screen.queryByText(/your password must have at least 8 characters/i)).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'longenough' } });
    expect(screen.queryByText(/your password must have at least 8 characters/i)).toBeNull();
  });

  test('disables sign-in button with invalid form', () => {
    render(<SignInForm />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'invalid' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'short' } });
    expect(screen.getByRole('button', { name: /sign in/i })).toBeDisabled();
  });

  test('enables sign-in button with valid form', () => {
    render(<SignInForm />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'user@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    expect(screen.getByRole('button', { name: /sign in/i })).not.toBeDisabled();
  });

  test('calls submit handler with correct data on valid form submission', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    render(<SignInForm />);

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'user@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    expect(consoleSpy).toHaveBeenLastCalledWith('Sign In submitted:', {
      email: 'user@example.com',
      password: 'password123',
    });

    consoleSpy.mockRestore();
  });
  describe('SignInForm - Empty Fields Submission', () => {
  test('should prevent submission and display error when fields are empty', () => {
    const { submitForm, getFieldError } = renderSignInForm();

    submitForm();

    expect(getFieldError('email')).toBe('Email is required');
    expect(getFieldError('password')).toBe('Password is required');
  });
});

describe('SignInForm - Server-side Failures', () => {
  test('should display an error message on server-side failure', async () => {
    mockSignInApiCall({ success: false, error: 'Invalid credentials' });

    const { submitForm, getFormError } = renderSignInForm({
      email: 'user@example.com',
      password: 'password123',
    });

    await submitForm();

    expect(getFormError()).toBe('Invalid credentials');
  });
});

describe('SignInForm - Successful Submission', () => {
  test('should submit form successfully', async () => {
    mockSignInApiCall({ success: true });

    const { submitForm, isSubmissionSuccessful } = renderSignInForm({
      email: 'user@example.com',
      password: 'correctPassword',
    });

    await submitForm();

    expect(isSubmissionSuccessful()).toBe(true);
  });
});

describe('SignInForm - Reset Functionality', () => {
  test('should reset the form fields and errors', () => {
    const { fillFormField, resetForm, getFormFieldValue, getFieldError } = renderSignInForm();

    fillFormField('email', 'user@example.com');
    fillFormField('password', '');
    submitForm();

    resetForm();

    expect(getFormFieldValue('email')).toBe('');
    expect(getFormFieldValue('password')).toBe('');
    expect(getFieldError('email')).toBeUndefined();
    expect(getFieldError('password')).toBeUndefined();
  });
});
});
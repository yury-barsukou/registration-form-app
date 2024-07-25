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

// Tests for edge cases in email and password validations
test('email validation handles edge cases', () => {
  render(<SignInForm />);
  const emailInput = screen.getByLabelText(/email/i);
  fireEvent.change(emailInput, { target: { value: 'email@domain.com.space' } });
  expect(screen.queryByText(/please enter a valid email address/i)).toBeInTheDocument();
  fireEvent.change(emailInput, { target: { value: 'email@-domain.com' } });
  expect(screen.queryByText(/please enter a valid email address/i)).toBeInTheDocument();
});

test('password validation handles edge cases', () => {
  render(<SignInForm />);
  const passwordInput = screen.getByLabelText(/password/i);
  fireEvent.change(passwordInput, { target: { value: 'abcdefgh' } });
  expect(screen.queryByText(/your password must have at least 8 characters/i)).toBeNull();
  fireEvent.change(passwordInput, { target: { value: '!@#$%^&*' } });
  expect(screen.queryByText(/your password must have at least 8 characters/i)).toBeNull();
});

test('does not call submit handler on invalid form submission', () => {
  const consoleSpy = jest.spyOn(console, 'log');
  render(<SignInForm />);

  // Intentionally setting invalid email and password
  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'invalid' } });
  fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'short' } });
  fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

  // Expecting no console log calls indicating submission did not proceed
  expect(consoleSpy).not.toHaveBeenCalled();

  consoleSpy.mockRestore();
});

  test('allows entry of email', () => {
    render(<SignInForm />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'user@example.com' } });

// Tests for edge cases in email and password validations
test('email validation handles edge cases', () => {
  render(<SignInForm />);
  const emailInput = screen.getByLabelText(/email/i);
  fireEvent.change(emailInput, { target: { value: 'email@domain.com.space' } });
  expect(screen.queryByText(/please enter a valid email address/i)).toBeInTheDocument();
  fireEvent.change(emailInput, { target: { value: 'email@-domain.com' } });
  expect(screen.queryByText(/please enter a valid email address/i)).toBeInTheDocument();
});

test('password validation handles edge cases', () => {
  render(<SignInForm />);
  const passwordInput = screen.getByLabelText(/password/i);
  fireEvent.change(passwordInput, { target: { value: 'abcdefgh' } });
  expect(screen.queryByText(/your password must have at least 8 characters/i)).toBeNull();
  fireEvent.change(passwordInput, { target: { value: '!@#$%^&*' } });
  expect(screen.queryByText(/your password must have at least 8 characters/i)).toBeNull();
});

test('does not call submit handler on invalid form submission', () => {
  const consoleSpy = jest.spyOn(console, 'log');
  render(<SignInForm />);

  // Intentionally setting invalid email and password
  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'invalid' } });
  fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'short' } });
  fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

  // Expecting no console log calls indicating submission did not proceed
  expect(consoleSpy).not.toHaveBeenCalled();

  consoleSpy.mockRestore();
});
    expect(screen.getByLabelText(/email/i).value).toBe('user@example.com');
  });

// Tests for edge cases in email and password validations
test('email validation handles edge cases', () => {
  render(<SignInForm />);
  const emailInput = screen.getByLabelText(/email/i);
  fireEvent.change(emailInput, { target: { value: 'email@domain.com.space' } });
  expect(screen.queryByText(/please enter a valid email address/i)).toBeInTheDocument();
  fireEvent.change(emailInput, { target: { value: 'email@-domain.com' } });
  expect(screen.queryByText(/please enter a valid email address/i)).toBeInTheDocument();
});

test('password validation handles edge cases', () => {
  render(<SignInForm />);
  const passwordInput = screen.getByLabelText(/password/i);
  fireEvent.change(passwordInput, { target: { value: 'abcdefgh' } });
  expect(screen.queryByText(/your password must have at least 8 characters/i)).toBeNull();
  fireEvent.change(passwordInput, { target: { value: '!@#$%^&*' } });
  expect(screen.queryByText(/your password must have at least 8 characters/i)).toBeNull();
});

test('does not call submit handler on invalid form submission', () => {
  const consoleSpy = jest.spyOn(console, 'log');
  render(<SignInForm />);

  // Intentionally setting invalid email and password
  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'invalid' } });
  fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'short' } });
  fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

  // Expecting no console log calls indicating submission did not proceed
  expect(consoleSpy).not.toHaveBeenCalled();

  consoleSpy.mockRestore();
});

  test('allows entry of password', () => {
    render(<SignInForm />);
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });

// Tests for edge cases in email and password validations
test('email validation handles edge cases', () => {
  render(<SignInForm />);
  const emailInput = screen.getByLabelText(/email/i);
  fireEvent.change(emailInput, { target: { value: 'email@domain.com.space' } });
  expect(screen.queryByText(/please enter a valid email address/i)).toBeInTheDocument();
  fireEvent.change(emailInput, { target: { value: 'email@-domain.com' } });
  expect(screen.queryByText(/please enter a valid email address/i)).toBeInTheDocument();
});

test('password validation handles edge cases', () => {
  render(<SignInForm />);
  const passwordInput = screen.getByLabelText(/password/i);
  fireEvent.change(passwordInput, { target: { value: 'abcdefgh' } });
  expect(screen.queryByText(/your password must have at least 8 characters/i)).toBeNull();
  fireEvent.change(passwordInput, { target: { value: '!@#$%^&*' } });
  expect(screen.queryByText(/your password must have at least 8 characters/i)).toBeNull();
});

test('does not call submit handler on invalid form submission', () => {
  const consoleSpy = jest.spyOn(console, 'log');
  render(<SignInForm />);

  // Intentionally setting invalid email and password
  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'invalid' } });
  fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'short' } });
  fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

  // Expecting no console log calls indicating submission did not proceed
  expect(consoleSpy).not.toHaveBeenCalled();

  consoleSpy.mockRestore();
});
    expect(screen.getByLabelText(/password/i).value).toBe('password123');
  });

// Tests for edge cases in email and password validations
test('email validation handles edge cases', () => {
  render(<SignInForm />);
  const emailInput = screen.getByLabelText(/email/i);
  fireEvent.change(emailInput, { target: { value: 'email@domain.com.space' } });
  expect(screen.queryByText(/please enter a valid email address/i)).toBeInTheDocument();
  fireEvent.change(emailInput, { target: { value: 'email@-domain.com' } });
  expect(screen.queryByText(/please enter a valid email address/i)).toBeInTheDocument();
});

test('password validation handles edge cases', () => {
  render(<SignInForm />);
  const passwordInput = screen.getByLabelText(/password/i);
  fireEvent.change(passwordInput, { target: { value: 'abcdefgh' } });
  expect(screen.queryByText(/your password must have at least 8 characters/i)).toBeNull();
  fireEvent.change(passwordInput, { target: { value: '!@#$%^&*' } });
  expect(screen.queryByText(/your password must have at least 8 characters/i)).toBeNull();
});

test('does not call submit handler on invalid form submission', () => {
  const consoleSpy = jest.spyOn(console, 'log');
  render(<SignInForm />);

  // Intentionally setting invalid email and password
  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'invalid' } });
  fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'short' } });
  fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

  // Expecting no console log calls indicating submission did not proceed
  expect(consoleSpy).not.toHaveBeenCalled();

  consoleSpy.mockRestore();
});

  test('validates email format correctly', () => {
    render(<SignInForm />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'invalid' } });

// Tests for edge cases in email and password validations
test('email validation handles edge cases', () => {
  render(<SignInForm />);
  const emailInput = screen.getByLabelText(/email/i);
  fireEvent.change(emailInput, { target: { value: 'email@domain.com.space' } });
  expect(screen.queryByText(/please enter a valid email address/i)).toBeInTheDocument();
  fireEvent.change(emailInput, { target: { value: 'email@-domain.com' } });
  expect(screen.queryByText(/please enter a valid email address/i)).toBeInTheDocument();
});

test('password validation handles edge cases', () => {
  render(<SignInForm />);
  const passwordInput = screen.getByLabelText(/password/i);
  fireEvent.change(passwordInput, { target: { value: 'abcdefgh' } });
  expect(screen.queryByText(/your password must have at least 8 characters/i)).toBeNull();
  fireEvent.change(passwordInput, { target: { value: '!@#$%^&*' } });
  expect(screen.queryByText(/your password must have at least 8 characters/i)).toBeNull();
});

test('does not call submit handler on invalid form submission', () => {
  const consoleSpy = jest.spyOn(console, 'log');
  render(<SignInForm />);

  // Intentionally setting invalid email and password
  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'invalid' } });
  fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'short' } });
  fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

  // Expecting no console log calls indicating submission did not proceed
  expect(consoleSpy).not.toHaveBeenCalled();

  consoleSpy.mockRestore();
});
    expect(screen.queryByText(/please enter a valid email address/i)).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'user@example.com' } });

// Tests for edge cases in email and password validations
test('email validation handles edge cases', () => {
  render(<SignInForm />);
  const emailInput = screen.getByLabelText(/email/i);
  fireEvent.change(emailInput, { target: { value: 'email@domain.com.space' } });
  expect(screen.queryByText(/please enter a valid email address/i)).toBeInTheDocument();
  fireEvent.change(emailInput, { target: { value: 'email@-domain.com' } });
  expect(screen.queryByText(/please enter a valid email address/i)).toBeInTheDocument();
});

test('password validation handles edge cases', () => {
  render(<SignInForm />);
  const passwordInput = screen.getByLabelText(/password/i);
  fireEvent.change(passwordInput, { target: { value: 'abcdefgh' } });
  expect(screen.queryByText(/your password must have at least 8 characters/i)).toBeNull();
  fireEvent.change(passwordInput, { target: { value: '!@#$%^&*' } });
  expect(screen.queryByText(/your password must have at least 8 characters/i)).toBeNull();
});

test('does not call submit handler on invalid form submission', () => {
  const consoleSpy = jest.spyOn(console, 'log');
  render(<SignInForm />);

  // Intentionally setting invalid email and password
  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'invalid' } });
  fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'short' } });
  fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

  // Expecting no console log calls indicating submission did not proceed
  expect(consoleSpy).not.toHaveBeenCalled();

  consoleSpy.mockRestore();
});
    expect(screen.queryByText(/please enter a valid email address/i)).toBeNull();
  });

// Tests for edge cases in email and password validations
test('email validation handles edge cases', () => {
  render(<SignInForm />);
  const emailInput = screen.getByLabelText(/email/i);
  fireEvent.change(emailInput, { target: { value: 'email@domain.com.space' } });
  expect(screen.queryByText(/please enter a valid email address/i)).toBeInTheDocument();
  fireEvent.change(emailInput, { target: { value: 'email@-domain.com' } });
  expect(screen.queryByText(/please enter a valid email address/i)).toBeInTheDocument();
});

test('password validation handles edge cases', () => {
  render(<SignInForm />);
  const passwordInput = screen.getByLabelText(/password/i);
  fireEvent.change(passwordInput, { target: { value: 'abcdefgh' } });
  expect(screen.queryByText(/your password must have at least 8 characters/i)).toBeNull();
  fireEvent.change(passwordInput, { target: { value: '!@#$%^&*' } });
  expect(screen.queryByText(/your password must have at least 8 characters/i)).toBeNull();
});

test('does not call submit handler on invalid form submission', () => {
  const consoleSpy = jest.spyOn(console, 'log');
  render(<SignInForm />);

  // Intentionally setting invalid email and password
  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'invalid' } });
  fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'short' } });
  fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

  // Expecting no console log calls indicating submission did not proceed
  expect(consoleSpy).not.toHaveBeenCalled();

  consoleSpy.mockRestore();
});

  test('validates password length correctly', () => {
    render(<SignInForm />);
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'short' } });

// Tests for edge cases in email and password validations
test('email validation handles edge cases', () => {
  render(<SignInForm />);
  const emailInput = screen.getByLabelText(/email/i);
  fireEvent.change(emailInput, { target: { value: 'email@domain.com.space' } });
  expect(screen.queryByText(/please enter a valid email address/i)).toBeInTheDocument();
  fireEvent.change(emailInput, { target: { value: 'email@-domain.com' } });
  expect(screen.queryByText(/please enter a valid email address/i)).toBeInTheDocument();
});

test('password validation handles edge cases', () => {
  render(<SignInForm />);
  const passwordInput = screen.getByLabelText(/password/i);
  fireEvent.change(passwordInput, { target: { value: 'abcdefgh' } });
  expect(screen.queryByText(/your password must have at least 8 characters/i)).toBeNull();
  fireEvent.change(passwordInput, { target: { value: '!@#$%^&*' } });
  expect(screen.queryByText(/your password must have at least 8 characters/i)).toBeNull();
});

test('does not call submit handler on invalid form submission', () => {
  const consoleSpy = jest.spyOn(console, 'log');
  render(<SignInForm />);

  // Intentionally setting invalid email and password
  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'invalid' } });
  fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'short' } });
  fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

  // Expecting no console log calls indicating submission did not proceed
  expect(consoleSpy).not.toHaveBeenCalled();

  consoleSpy.mockRestore();
});
    expect(screen.queryByText(/your password must have at least 8 characters/i)).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'longenough' } });

// Tests for edge cases in email and password validations
test('email validation handles edge cases', () => {
  render(<SignInForm />);
  const emailInput = screen.getByLabelText(/email/i);
  fireEvent.change(emailInput, { target: { value: 'email@domain.com.space' } });
  expect(screen.queryByText(/please enter a valid email address/i)).toBeInTheDocument();
  fireEvent.change(emailInput, { target: { value: 'email@-domain.com' } });
  expect(screen.queryByText(/please enter a valid email address/i)).toBeInTheDocument();
});

test('password validation handles edge cases', () => {
  render(<SignInForm />);
  const passwordInput = screen.getByLabelText(/password/i);
  fireEvent.change(passwordInput, { target: { value: 'abcdefgh' } });
  expect(screen.queryByText(/your password must have at least 8 characters/i)).toBeNull();
  fireEvent.change(passwordInput, { target: { value: '!@#$%^&*' } });
  expect(screen.queryByText(/your password must have at least 8 characters/i)).toBeNull();
});

test('does not call submit handler on invalid form submission', () => {
  const consoleSpy = jest.spyOn(console, 'log');
  render(<SignInForm />);

  // Intentionally setting invalid email and password
  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'invalid' } });
  fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'short' } });
  fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

  // Expecting no console log calls indicating submission did not proceed
  expect(consoleSpy).not.toHaveBeenCalled();

  consoleSpy.mockRestore();
});
    expect(screen.queryByText(/your password must have at least 8 characters/i)).toBeNull();
  });

// Tests for edge cases in email and password validations
test('email validation handles edge cases', () => {
  render(<SignInForm />);
  const emailInput = screen.getByLabelText(/email/i);
  fireEvent.change(emailInput, { target: { value: 'email@domain.com.space' } });
  expect(screen.queryByText(/please enter a valid email address/i)).toBeInTheDocument();
  fireEvent.change(emailInput, { target: { value: 'email@-domain.com' } });
  expect(screen.queryByText(/please enter a valid email address/i)).toBeInTheDocument();
});

test('password validation handles edge cases', () => {
  render(<SignInForm />);
  const passwordInput = screen.getByLabelText(/password/i);
  fireEvent.change(passwordInput, { target: { value: 'abcdefgh' } });
  expect(screen.queryByText(/your password must have at least 8 characters/i)).toBeNull();
  fireEvent.change(passwordInput, { target: { value: '!@#$%^&*' } });
  expect(screen.queryByText(/your password must have at least 8 characters/i)).toBeNull();
});

test('does not call submit handler on invalid form submission', () => {
  const consoleSpy = jest.spyOn(console, 'log');
  render(<SignInForm />);

  // Intentionally setting invalid email and password
  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'invalid' } });
  fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'short' } });
  fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

  // Expecting no console log calls indicating submission did not proceed
  expect(consoleSpy).not.toHaveBeenCalled();

  consoleSpy.mockRestore();
});

  test('disables sign-in button with invalid form', () => {
    render(<SignInForm />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'invalid' } });

// Tests for edge cases in email and password validations
test('email validation handles edge cases', () => {
  render(<SignInForm />);
  const emailInput = screen.getByLabelText(/email/i);
  fireEvent.change(emailInput, { target: { value: 'email@domain.com.space' } });
  expect(screen.queryByText(/please enter a valid email address/i)).toBeInTheDocument();
  fireEvent.change(emailInput, { target: { value: 'email@-domain.com' } });
  expect(screen.queryByText(/please enter a valid email address/i)).toBeInTheDocument();
});

test('password validation handles edge cases', () => {
  render(<SignInForm />);
  const passwordInput = screen.getByLabelText(/password/i);
  fireEvent.change(passwordInput, { target: { value: 'abcdefgh' } });
  expect(screen.queryByText(/your password must have at least 8 characters/i)).toBeNull();
  fireEvent.change(passwordInput, { target: { value: '!@#$%^&*' } });
  expect(screen.queryByText(/your password must have at least 8 characters/i)).toBeNull();
});

test('does not call submit handler on invalid form submission', () => {
  const consoleSpy = jest.spyOn(console, 'log');
  render(<SignInForm />);

  // Intentionally setting invalid email and password
  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'invalid' } });
  fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'short' } });
  fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

  // Expecting no console log calls indicating submission did not proceed
  expect(consoleSpy).not.toHaveBeenCalled();

  consoleSpy.mockRestore();
});
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'short' } });

// Tests for edge cases in email and password validations
test('email validation handles edge cases', () => {
  render(<SignInForm />);
  const emailInput = screen.getByLabelText(/email/i);
  fireEvent.change(emailInput, { target: { value: 'email@domain.com.space' } });
  expect(screen.queryByText(/please enter a valid email address/i)).toBeInTheDocument();
  fireEvent.change(emailInput, { target: { value: 'email@-domain.com' } });
  expect(screen.queryByText(/please enter a valid email address/i)).toBeInTheDocument();
});

test('password validation handles edge cases', () => {
  render(<SignInForm />);
  const passwordInput = screen.getByLabelText(/password/i);
  fireEvent.change(passwordInput, { target: { value: 'abcdefgh' } });
  expect(screen.queryByText(/your password must have at least 8 characters/i)).toBeNull();
  fireEvent.change(passwordInput, { target: { value: '!@#$%^&*' } });
  expect(screen.queryByText(/your password must have at least 8 characters/i)).toBeNull();
});

test('does not call submit handler on invalid form submission', () => {
  const consoleSpy = jest.spyOn(console, 'log');
  render(<SignInForm />);

  // Intentionally setting invalid email and password
  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'invalid' } });
  fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'short' } });
  fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

  // Expecting no console log calls indicating submission did not proceed
  expect(consoleSpy).not.toHaveBeenCalled();

  consoleSpy.mockRestore();
});
    expect(screen.getByRole('button', { name: /sign in/i })).toBeDisabled();
  });

// Tests for edge cases in email and password validations
test('email validation handles edge cases', () => {
  render(<SignInForm />);
  const emailInput = screen.getByLabelText(/email/i);
  fireEvent.change(emailInput, { target: { value: 'email@domain.com.space' } });
  expect(screen.queryByText(/please enter a valid email address/i)).toBeInTheDocument();
  fireEvent.change(emailInput, { target: { value: 'email@-domain.com' } });
  expect(screen.queryByText(/please enter a valid email address/i)).toBeInTheDocument();
});

test('password validation handles edge cases', () => {
  render(<SignInForm />);
  const passwordInput = screen.getByLabelText(/password/i);
  fireEvent.change(passwordInput, { target: { value: 'abcdefgh' } });
  expect(screen.queryByText(/your password must have at least 8 characters/i)).toBeNull();
  fireEvent.change(passwordInput, { target: { value: '!@#$%^&*' } });
  expect(screen.queryByText(/your password must have at least 8 characters/i)).toBeNull();
});

test('does not call submit handler on invalid form submission', () => {
  const consoleSpy = jest.spyOn(console, 'log');
  render(<SignInForm />);

  // Intentionally setting invalid email and password
  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'invalid' } });
  fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'short' } });
  fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

  // Expecting no console log calls indicating submission did not proceed
  expect(consoleSpy).not.toHaveBeenCalled();

  consoleSpy.mockRestore();
});

  test('enables sign-in button with valid form', () => {
    render(<SignInForm />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'user@example.com' } });

// Tests for edge cases in email and password validations
test('email validation handles edge cases', () => {
  render(<SignInForm />);
  const emailInput = screen.getByLabelText(/email/i);
  fireEvent.change(emailInput, { target: { value: 'email@domain.com.space' } });
  expect(screen.queryByText(/please enter a valid email address/i)).toBeInTheDocument();
  fireEvent.change(emailInput, { target: { value: 'email@-domain.com' } });
  expect(screen.queryByText(/please enter a valid email address/i)).toBeInTheDocument();
});

test('password validation handles edge cases', () => {
  render(<SignInForm />);
  const passwordInput = screen.getByLabelText(/password/i);
  fireEvent.change(passwordInput, { target: { value: 'abcdefgh' } });
  expect(screen.queryByText(/your password must have at least 8 characters/i)).toBeNull();
  fireEvent.change(passwordInput, { target: { value: '!@#$%^&*' } });
  expect(screen.queryByText(/your password must have at least 8 characters/i)).toBeNull();
});

test('does not call submit handler on invalid form submission', () => {
  const consoleSpy = jest.spyOn(console, 'log');
  render(<SignInForm />);

  // Intentionally setting invalid email and password
  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'invalid' } });
  fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'short' } });
  fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

  // Expecting no console log calls indicating submission did not proceed
  expect(consoleSpy).not.toHaveBeenCalled();

  consoleSpy.mockRestore();
});
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });

// Tests for edge cases in email and password validations
test('email validation handles edge cases', () => {
  render(<SignInForm />);
  const emailInput = screen.getByLabelText(/email/i);
  fireEvent.change(emailInput, { target: { value: 'email@domain.com.space' } });
  expect(screen.queryByText(/please enter a valid email address/i)).toBeInTheDocument();
  fireEvent.change(emailInput, { target: { value: 'email@-domain.com' } });
  expect(screen.queryByText(/please enter a valid email address/i)).toBeInTheDocument();
});

test('password validation handles edge cases', () => {
  render(<SignInForm />);
  const passwordInput = screen.getByLabelText(/password/i);
  fireEvent.change(passwordInput, { target: { value: 'abcdefgh' } });
  expect(screen.queryByText(/your password must have at least 8 characters/i)).toBeNull();
  fireEvent.change(passwordInput, { target: { value: '!@#$%^&*' } });
  expect(screen.queryByText(/your password must have at least 8 characters/i)).toBeNull();
});

test('does not call submit handler on invalid form submission', () => {
  const consoleSpy = jest.spyOn(console, 'log');
  render(<SignInForm />);

  // Intentionally setting invalid email and password
  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'invalid' } });
  fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'short' } });
  fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

  // Expecting no console log calls indicating submission did not proceed
  expect(consoleSpy).not.toHaveBeenCalled();

  consoleSpy.mockRestore();
});
    expect(screen.getByRole('button', { name: /sign in/i })).not.toBeDisabled();
  });

// Tests for edge cases in email and password validations
test('email validation handles edge cases', () => {
  render(<SignInForm />);
  const emailInput = screen.getByLabelText(/email/i);
  fireEvent.change(emailInput, { target: { value: 'email@domain.com.space' } });
  expect(screen.queryByText(/please enter a valid email address/i)).toBeInTheDocument();
  fireEvent.change(emailInput, { target: { value: 'email@-domain.com' } });
  expect(screen.queryByText(/please enter a valid email address/i)).toBeInTheDocument();
});

test('password validation handles edge cases', () => {
  render(<SignInForm />);
  const passwordInput = screen.getByLabelText(/password/i);
  fireEvent.change(passwordInput, { target: { value: 'abcdefgh' } });
  expect(screen.queryByText(/your password must have at least 8 characters/i)).toBeNull();
  fireEvent.change(passwordInput, { target: { value: '!@#$%^&*' } });
  expect(screen.queryByText(/your password must have at least 8 characters/i)).toBeNull();
});

test('does not call submit handler on invalid form submission', () => {
  const consoleSpy = jest.spyOn(console, 'log');
  render(<SignInForm />);

  // Intentionally setting invalid email and password
  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'invalid' } });
  fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'short' } });
  fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

  // Expecting no console log calls indicating submission did not proceed
  expect(consoleSpy).not.toHaveBeenCalled();

  consoleSpy.mockRestore();
});

  test('calls submit handler with correct data on valid form submission', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    render(<SignInForm />);

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'user@example.com' } });

// Tests for edge cases in email and password validations
test('email validation handles edge cases', () => {
  render(<SignInForm />);
  const emailInput = screen.getByLabelText(/email/i);
  fireEvent.change(emailInput, { target: { value: 'email@domain.com.space' } });
  expect(screen.queryByText(/please enter a valid email address/i)).toBeInTheDocument();
  fireEvent.change(emailInput, { target: { value: 'email@-domain.com' } });
  expect(screen.queryByText(/please enter a valid email address/i)).toBeInTheDocument();
});

test('password validation handles edge cases', () => {
  render(<SignInForm />);
  const passwordInput = screen.getByLabelText(/password/i);
  fireEvent.change(passwordInput, { target: { value: 'abcdefgh' } });
  expect(screen.queryByText(/your password must have at least 8 characters/i)).toBeNull();
  fireEvent.change(passwordInput, { target: { value: '!@#$%^&*' } });
  expect(screen.queryByText(/your password must have at least 8 characters/i)).toBeNull();
});

test('does not call submit handler on invalid form submission', () => {
  const consoleSpy = jest.spyOn(console, 'log');
  render(<SignInForm />);

  // Intentionally setting invalid email and password
  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'invalid' } });
  fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'short' } });
  fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

  // Expecting no console log calls indicating submission did not proceed
  expect(consoleSpy).not.toHaveBeenCalled();

  consoleSpy.mockRestore();
});
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });

// Tests for edge cases in email and password validations
test('email validation handles edge cases', () => {
  render(<SignInForm />);
  const emailInput = screen.getByLabelText(/email/i);
  fireEvent.change(emailInput, { target: { value: 'email@domain.com.space' } });
  expect(screen.queryByText(/please enter a valid email address/i)).toBeInTheDocument();
  fireEvent.change(emailInput, { target: { value: 'email@-domain.com' } });
  expect(screen.queryByText(/please enter a valid email address/i)).toBeInTheDocument();
});

test('password validation handles edge cases', () => {
  render(<SignInForm />);
  const passwordInput = screen.getByLabelText(/password/i);
  fireEvent.change(passwordInput, { target: { value: 'abcdefgh' } });
  expect(screen.queryByText(/your password must have at least 8 characters/i)).toBeNull();
  fireEvent.change(passwordInput, { target: { value: '!@#$%^&*' } });
  expect(screen.queryByText(/your password must have at least 8 characters/i)).toBeNull();
});

test('does not call submit handler on invalid form submission', () => {
  const consoleSpy = jest.spyOn(console, 'log');
  render(<SignInForm />);

  // Intentionally setting invalid email and password
  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'invalid' } });
  fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'short' } });
  fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

  // Expecting no console log calls indicating submission did not proceed
  expect(consoleSpy).not.toHaveBeenCalled();

  consoleSpy.mockRestore();
});
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    expect(consoleSpy).toHaveBeenLastCalledWith('Sign In submitted:', {
      email: 'user@example.com',
      password: 'password123',
    });

// Tests for edge cases in email and password validations
test('email validation handles edge cases', () => {
  render(<SignInForm />);
  const emailInput = screen.getByLabelText(/email/i);
  fireEvent.change(emailInput, { target: { value: 'email@domain.com.space' } });
  expect(screen.queryByText(/please enter a valid email address/i)).toBeInTheDocument();
  fireEvent.change(emailInput, { target: { value: 'email@-domain.com' } });
  expect(screen.queryByText(/please enter a valid email address/i)).toBeInTheDocument();
});

test('password validation handles edge cases', () => {
  render(<SignInForm />);
  const passwordInput = screen.getByLabelText(/password/i);
  fireEvent.change(passwordInput, { target: { value: 'abcdefgh' } });
  expect(screen.queryByText(/your password must have at least 8 characters/i)).toBeNull();
  fireEvent.change(passwordInput, { target: { value: '!@#$%^&*' } });
  expect(screen.queryByText(/your password must have at least 8 characters/i)).toBeNull();
});

test('does not call submit handler on invalid form submission', () => {
  const consoleSpy = jest.spyOn(console, 'log');
  render(<SignInForm />);

  // Intentionally setting invalid email and password
  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'invalid' } });
  fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'short' } });
  fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

  // Expecting no console log calls indicating submission did not proceed
  expect(consoleSpy).not.toHaveBeenCalled();

  consoleSpy.mockRestore();
});

    consoleSpy.mockRestore();
  });

// Tests for edge cases in email and password validations
test('email validation handles edge cases', () => {
  render(<SignInForm />);
  const emailInput = screen.getByLabelText(/email/i);
  fireEvent.change(emailInput, { target: { value: 'email@domain.com.space' } });
  expect(screen.queryByText(/please enter a valid email address/i)).toBeInTheDocument();
  fireEvent.change(emailInput, { target: { value: 'email@-domain.com' } });
  expect(screen.queryByText(/please enter a valid email address/i)).toBeInTheDocument();
});

test('password validation handles edge cases', () => {
  render(<SignInForm />);
  const passwordInput = screen.getByLabelText(/password/i);
  fireEvent.change(passwordInput, { target: { value: 'abcdefgh' } });
  expect(screen.queryByText(/your password must have at least 8 characters/i)).toBeNull();
  fireEvent.change(passwordInput, { target: { value: '!@#$%^&*' } });
  expect(screen.queryByText(/your password must have at least 8 characters/i)).toBeNull();
});

test('does not call submit handler on invalid form submission', () => {
  const consoleSpy = jest.spyOn(console, 'log');
  render(<SignInForm />);

  // Intentionally setting invalid email and password
  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'invalid' } });
  fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'short' } });
  fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

  // Expecting no console log calls indicating submission did not proceed
  expect(consoleSpy).not.toHaveBeenCalled();

  consoleSpy.mockRestore();
});
});

// Tests for edge cases in email and password validations
test('email validation handles edge cases', () => {
  render(<SignInForm />);
  const emailInput = screen.getByLabelText(/email/i);
  fireEvent.change(emailInput, { target: { value: 'email@domain.com.space' } });
  expect(screen.queryByText(/please enter a valid email address/i)).toBeInTheDocument();
  fireEvent.change(emailInput, { target: { value: 'email@-domain.com' } });
  expect(screen.queryByText(/please enter a valid email address/i)).toBeInTheDocument();
});

test('password validation handles edge cases', () => {
  render(<SignInForm />);
  const passwordInput = screen.getByLabelText(/password/i);
  fireEvent.change(passwordInput, { target: { value: 'abcdefgh' } });
  expect(screen.queryByText(/your password must have at least 8 characters/i)).toBeNull();
  fireEvent.change(passwordInput, { target: { value: '!@#$%^&*' } });
  expect(screen.queryByText(/your password must have at least 8 characters/i)).toBeNull();
});

test('does not call submit handler on invalid form submission', () => {
  const consoleSpy = jest.spyOn(console, 'log');
  render(<SignInForm />);

  // Intentionally setting invalid email and password
  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'invalid' } });
  fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'short' } });
  fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

  // Expecting no console log calls indicating submission did not proceed
  expect(consoleSpy).not.toHaveBeenCalled();

  consoleSpy.mockRestore();
});
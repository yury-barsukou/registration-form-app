import { render, fireEvent } from '@testing-library/react';
import SignInForm from '../SignInForm';

describe('SignInForm', () => {
  test('input changes update state', () => {
    const { getByLabelText } = render(<SignInForm />);
    const emailInput = getByLabelText(/email/i);
    const passwordInput = getByLabelText(/password/i);

    fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(emailInput.value).toBe('user@example.com');
    expect(passwordInput.value).toBe('password123');
  });

  test('valid email and password enables submit button', () => {
    const { getByLabelText, getByRole } = render(<SignInForm />);
    const emailInput = getByLabelText(/email/i);
    const passwordInput = getByLabelText(/password/i);

    fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(getByRole('button', { name: /sign in/i })).not.toBeDisabled();
  });

  test('invalid email disables submit button', () => {
    const { getByLabelText, getByRole } = render(<SignInForm />);
    const emailInput = getByLabelText(/email/i);

    fireEvent.change(emailInput, { target: { value: 'user' } });

    expect(getByRole('button', { name: /sign in/i })).toBeDisabled();
  });

  test('password less than 8 characters disables submit button', () => {
    const { getByLabelText, getByRole } = render(<SignInForm />);
    const emailInput = getByLabelText(/email/i);
    const passwordInput = getByLabelText(/password/i);

    fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'pass' } });

    expect(getByRole('button', { name: /sign in/i })).toBeDisabled();
  });

  test('shows error message for invalid email', () => {
    const { getByLabelText, getByText } = render(<SignInForm />);
    const emailInput = getByLabelText(/email/i);

    fireEvent.change(emailInput, { target: { value: 'user' } });

    expect(getByText(/please enter a valid email address/i)).toBeInTheDocument();
  });

  test('shows error message for short password', () => {
    const { getByLabelText, getByText } = render(<SignInForm />);
    const passwordInput = getByLabelText(/password/i);

    fireEvent.change(passwordInput, { target: { value: 'pass' } });

    expect(getByText(/your password must have at least 8 characters/i)).toBeInTheDocument();
  });

  test('submitting valid form logs correct data', () => {
    console.log = jest.fn();

    const { getByLabelText, getByRole } = render(<SignInForm />);
    const emailInput = getByLabelText(/email/i);
    const passwordInput = getByLabelText(/password/i);

    fireEvent.change(emailInput, { target: { value: 'valid@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'validpass' } });
    fireEvent.click(getByRole('button', { name: /sign in/i }));

    expect(console.log).toHaveBeenCalledWith('Sign In submitted:', { email: 'valid@example.com', password: 'validpass' });
  });
});
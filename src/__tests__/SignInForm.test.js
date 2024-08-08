import { fireEvent, render, screen } from '@testing-library/react';
import SignInForm from './SignInForm';

describe('SignInForm', () => {
  it('should render without crashing', () => {
    render(<SignInForm />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it('should update state on input change', () => {
    render(<SignInForm />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(emailInput.value).toBe('user@example.com');
    expect(passwordInput.value).toBe('password123');
  });

  it('should validate email correctly', () => {
    render(<SignInForm />);
    const emailInput = screen.getByLabelText(/email/i);

    fireEvent.change(emailInput, { target: { value: 'invalid' } });
    fireEvent.blur(emailInput);
    expect(screen.getByText(/Please enter a valid email address/i)).toBeInTheDocument();

    fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
    fireEvent.blur(emailInput);
    expect(screen.queryByText(/Please enter a valid email address/i)).toBeNull();
  });

  it('should enforce password length validation', () => {
    render(<SignInForm />);
    const passwordInput = screen.getByLabelText(/password/i);

    fireEvent.change(passwordInput, { target: { value: 'short' } });
    fireEvent.blur(passwordInput);
    expect(screen.getByText(/Your password must have at least 8 characters/i)).toBeInTheDocument();

    fireEvent.change(passwordInput, { target: { value: 'longenoughpassword' } });
    fireEvent.blur(passwordInput);
    expect(screen.queryByText(/Your password must have at least 8 characters/i)).toBeNull();
  });

  it('should disable submit button if form is invalid', () => {
    render(<SignInForm />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    fireEvent.change(emailInput, { target: { value: 'invalid' } });
    fireEvent.change(passwordInput, { target: { value: 'short' } });
    expect(submitButton).toBeDisabled();

    fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    expect(submitButton).not.toBeDisabled();
  });

  it('should log "Sign In submitted" if form is valid on submit', () => {
    console.log = jest.fn();
    render(<SignInForm />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const form = screen.getByRole('form');

    fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.submit(form);

    expect(console.log).toHaveBeenCalledWith('Sign In submitted:', { email: 'user@example.com', password: 'password123' });
  });

  it('should not submit form if it is invalid', () => {
    console.error = jest.fn();
    render(<SignInForm />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const form = screen.getByRole('form');

    fireEvent.change(emailInput, { target: { value: 'invalid' } });
    fireEvent.change(passwordInput, { target: { value: 'short' } });
    fireEvent.submit(form);

    expect(console.error).toHaveBeenCalledWith('Sign In form is invalid');
    expect(console.log).not.toHaveBeenCalledWith('Sign In submitted:');
  });
});
import { render, screen, fireEvent } from '@testing-library/react';
import UserAuthForms from './UserAuthForms';

describe('UserAuthForms', () => {
  test('renders UserAuthForms component', () => {
    render(<UserAuthForms />);
    expect(screen.getByRole('button', { name: /Sign Up/i })).toBeInTheDocument();
  });

  test('allows the user to enter their first name', () => {
    render(<UserAuthForms />);
    fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: 'John' } });
    expect(screen.getByLabelText(/first name/i).value).toBe('John');
  });

  test('validates email input when entering an invalid email', () => {
    render(<UserAuthForms />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'invalid-email' } });
    fireEvent.blur(screen.getByLabelText(/email/i)); // Simulate leaving the input field
    expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
  });

  test('validates password input for uppercase character', async () => {
    render(<SignUpForm />);
    const passwordInput = screen.getByLabelText(/password/i);
    fireEvent.change(passwordInput, { target: { value: 'password1' } });
    await waitFor(() => expect(screen.getByText(/1 uppercase character/i)).toHaveClass('invalid'));
    fireEvent.change(passwordInput, { target: { value: 'Password1' } });
    await waitFor(() => expect(screen.getByText(/1 uppercase character/i)).toHaveClass('valid'));
  });

  test('validates password input for lowercase character', async () => {
    render(<SignUpForm />);
    const passwordInput = screen.getByLabelText(/password/i);
    fireEvent.change(passwordInput, { target: { value: 'PASSWORD1' } });
    await waitFor(() => expect(screen.getByText(/1 lowercase character/i)).toHaveClass('invalid'));
    fireEvent.change(passwordInput, { target: { value: 'Password1' } });
    await waitFor(() => expect(screen.getByText(/1 lowercase character/i)).toHaveClass('valid'));
  });

  test('validates password input for a number', async () => {
    render(<SignUpForm />);
    const passwordInput = screen.getByLabelText(/password/i);
    fireEvent.change(passwordInput, { target: { value: 'Password' } });
    await waitFor(() => expect(screen.getByText(/1 number/i)).toHaveClass('invalid'));
    fireEvent.change(passwordInput, { target: { value: 'Password1' } });
    await waitFor(() => expect(screen.getByText(/1 number/i)).toHaveClass('valid'));
  });

  test('validates password input for minimum length', async () => {
    render(<SignUpForm />);
    const passwordInput = screen.getByLabelText(/password/i);
    fireEvent.change(passwordInput, { target: { value: 'Pass1' } });
    await waitFor(() => expect(screen.getByText(/minimum 8 characters/i)).toHaveClass('invalid'));
    fireEvent.change(passwordInput, { target: { value: 'Password1' } });
    await waitFor(() => expect(screen.getByText(/minimum 8 characters/i)).toHaveClass('valid'));
  });
});

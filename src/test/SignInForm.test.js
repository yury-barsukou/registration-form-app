import { render, screen, fireEvent } from '@testing-library/react';
import SignInForm from '../SignInForm';

const VALID_EMAIL = 'test@example.com';
const VALID_PASSWORD = 'Password123!';

describe('SignInForm', () => {
  beforeEach(() => {
    render(<SignInForm />);
  });

  test('renders the sign-in form with email and password fields and a submit button', () => {
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign In/i })).toBeInTheDocument();
  });

  test('validates email format correctly', () => {
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'invalid' } });
    expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: VALID_EMAIL } });
    expect(screen.queryByText(/Please enter a valid email address/i)).toBeNull();
  });

  test('validates password length correctly', () => {
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'short' } });
    expect(screen.queryByText(/Your password must have at least 8 characters/i)).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: VALID_PASSWORD } });
    expect(screen.queryByText(/Your password must have at least 8 characters/i)).toBeNull();
  });

  test('enables sign in button with valid form', () => {
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: VALID_EMAIL } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: VALID_PASSWORD } });
    expect(screen.getByRole('button', { name: /Sign In/i })).not.toBeDisabled();
  });

  test('disables sign in button with invalid form', () => {
    // Invalid email
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'invalid' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: VALID_PASSWORD } });
    expect(screen.getByRole('button', { name: /Sign In/i })).toBeDisabled();

    // Invalid password
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: VALID_EMAIL } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'short' } });
    expect(screen.getByRole('button', { name: /Sign In/i })).toBeDisabled();
  });

  test('form submission with valid data', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: VALID_EMAIL } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: VALID_PASSWORD } });
    fireEvent.click(screen.getByRole('button', { name: /Sign In/i }));
    expect(consoleSpy).toHaveBeenCalledWith('Sign In submitted:', { email: VALID_EMAIL, password: VALID_PASSWORD });
    consoleSpy.mockRestore();
  });

  test('form submission with invalid data shows error', () => {
    const consoleSpy = jest.spyOn(console, 'error');
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'invalid' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'short' } });
    fireEvent.click(screen.getByRole('button', { name: /Sign In/i }));
    expect(consoleSpy).toHaveBeenCalledWith('Sign In form is invalid');
    consoleSpy.mockRestore();
  });
});
import { render, screen, fireEvent } from '@testing-library/react';
import SignInForm from './SignInForm';

const VALID_EMAIL = 'test@example.com';
const INVALID_EMAIL = 'test@example';
const VALID_PASSWORD = 'password123';
const INVALID_PASSWORD = 'pass';

describe('SignInForm', () => {
  beforeEach(() => {
    render(<SignInForm />);
  });

  test('renders the sign-in form with email and password fields', () => {
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign In/i })).toBeInTheDocument();
  });

  test('email field accepts input', () => {
    const emailInput = screen.getByLabelText(/Email/i);
    fireEvent.change(emailInput, { target: { value: VALID_EMAIL } });
    expect(emailInput.value).toBe(VALID_EMAIL);
  });

  test('password field accepts input', () => {
    const passwordInput = screen.getByLabelText(/Password/i);
    fireEvent.change(passwordInput, { target: { value: VALID_PASSWORD } });
    expect(passwordInput.value).toBe(VALID_PASSWORD);
  });

  test('displays email validation message for invalid email', () => {
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: INVALID_EMAIL } });
    expect(screen.getByText(/Please enter a valid email address/i)).toBeInTheDocument();
  });

  test('does not display email validation message for valid email', () => {
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: VALID_EMAIL } });
    expect(screen.queryByText(/Please enter a valid email address/i)).toBeNull();
  });

  test('displays password validation message for password shorter than 8 characters', () => {
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: INVALID_PASSWORD } });
    expect(screen.getByText(/Your password must have at least 8 characters/i)).toBeInTheDocument();
  });

  test('does not display password validation message for valid password', () => {
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: VALID_PASSWORD } });
    expect(screen.queryByText(/Your password must have at least 8 characters/i)).toBeNull();
  });

  test('Sign In button is initially disabled', () => {
    expect(screen.getByRole('button', { name: /Sign In/i })).toBeDisabled();
  });

  test('Sign In button is enabled with valid email and password', () => {
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: VALID_EMAIL } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: VALID_PASSWORD } });
    expect(screen.getByRole('button', { name: /Sign In/i })).not.toBeDisabled();
  });

  describe('Form Submission', () => {
    let consoleSpy;

    beforeEach(() => {
      consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterEach(() => {
      consoleSpy.mockRestore();
    });

    test('calls console log with correct data on valid form submission', () => {
      fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: VALID_EMAIL } });
      fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: VALID_PASSWORD } });
      fireEvent.click(screen.getByRole('button', { name: /Sign In/i }));
      expect(consoleSpy).toHaveBeenCalledWith('Sign In submitted:', { email: VALID_EMAIL, password: VALID_PASSWORD });
    });

    test('does not submit form with invalid email', () => {
      fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: INVALID_EMAIL } });
      fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: VALID_PASSWORD } });
      fireEvent.click(screen.getByRole('button', { name: /Sign In/i }));
      expect(consoleSpy).not.toHaveBeenCalled();
    });

    test('does not submit form with invalid password', () => {
      fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: VALID_EMAIL } });
      fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: INVALID_PASSWORD } });
      fireEvent.click(screen.getByRole('button', { name: /Sign In/i }));
      expect(consoleSpy).not.toHaveBeenCalled();
    });
  });
});
import { render, screen, fireEvent } from '@testing-library/react';
import SignInForm from '../SignInForm';

const VALID_EMAIL = 'user@example.com';
const VALID_PASSWORD = 'Password123';

describe('SignInForm', () => {
  beforeEach(() => {
    render(<SignInForm />);
  });

  test('renders the sign-in form with email and password fields', () => {
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign In/i })).toBeInTheDocument();
  });

  describe('Field Entry', () => {
    test('allows entry of email', () => {
      const email = 'test@example.com';
      fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: email } });
      expect(screen.getByLabelText(/Email/i)).toHaveValue(email);
    });

    test('allows entry of password', () => {
      const password = 'TestPassword';
      fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: password } });
      expect(screen.getByLabelText(/Password/i)).toHaveValue(password);
    });
  });

  describe('Form Validation', () => {
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
  });

  describe('Form Submission', () => {
    let consoleSpy;

    beforeEach(() => {
      consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterEach(() => {
      consoleSpy.mockRestore();
    });

    test('enables Sign In button with valid form', () => {
      fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: VALID_EMAIL } });
      fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: VALID_PASSWORD } });
      expect(screen.getByRole('button', { name: /Sign In/i })).not.toBeDisabled();
    });

    test('calls console log with correct data on valid form submission', () => {
      fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: VALID_EMAIL } });
      fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: VALID_PASSWORD } });
      fireEvent.click(screen.getByRole('button', { name: /Sign In/i }));
      expect(consoleSpy).toHaveBeenCalledWith('Sign In submitted:', { email: VALID_EMAIL, password: VALID_PASSWORD });
    });

    test('does not submit form with invalid email', () => {
      fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'invalid' } });
      fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: VALID_PASSWORD } });
      fireEvent.click(screen.getByRole('button', { name: /Sign In/i }));
      expect(consoleSpy).not.toHaveBeenCalled();
    });

    test('does not submit form with invalid password', () => {
      fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: VALID_EMAIL } });
      fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'short' } });
      fireEvent.click(screen.getByRole('button', { name: /Sign In/i }));
      expect(consoleSpy).not.toHaveBeenCalled();
    });

    test('displays error message on invalid form submission with both fields invalid', () => {
      fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'invalid' } });
      fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'short' } });
      fireEvent.click(screen.getByRole('button', { name: /Sign In/i }));
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
      expect(screen.queryByText(/Your password must have at least 8 characters/i)).toBeInTheDocument();
    });
  });
});
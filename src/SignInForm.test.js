import { render, screen, fireEvent } from '@testing-library/react';
import SignInForm from './SignInForm';

const VALID_EMAIL = 'user@example.com';
const VALID_PASSWORD = 'Password1234';
const INVALID_EMAIL = 'invalid';
const SHORT_PASSWORD = 'short';

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
      fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: VALID_EMAIL } });
      expect(screen.getByLabelText(/Email/i)).toHaveValue(VALID_EMAIL);
    });

    test('allows entry of password', () => {
      fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: VALID_PASSWORD } });
      expect(screen.getByLabelText(/Password/i)).toHaveValue(VALID_PASSWORD);
    });
  });

  describe('Form Validation', () => {
    test('validates email format correctly', () => {
      fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: INVALID_EMAIL } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
      fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: VALID_EMAIL } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeNull();
    });

    test('validates password criteria correctly', () => {
      fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: SHORT_PASSWORD } });
      expect(screen.queryByText(/Your password must have at least 8 characters/i)).toBeInTheDocument();
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

    test('disables Sign In button with invalid form', () => {
      fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: INVALID_EMAIL } });
      expect(screen.getByRole('button', { name: /Sign In/i })).toBeDisabled();
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
      expect(consoleSpy).toHaveBeenLastCalledWith('Sign In submitted:', { email: VALID_EMAIL, password: VALID_PASSWORD });
    });
  });

  describe('Accessibility Checks', () => {
    test('ensure form fields have associated labels', () => {
      expect(screen.getByLabelText(/Email/i).tagName).toBe('INPUT');
      expect(screen.getByLabelText(/Password/i).tagName).toBe('INPUT');
    });
  });

  describe('Error Handling', () => {
    test('shows error message when form is submitted with empty fields', () => {
      fireEvent.click(screen.getByRole('button', { name: /Sign In/i }));
      expect(screen.queryByText(/Email is required/i)).toBeInTheDocument();
      expect(screen.queryByText(/Password is required/i)).toBeInTheDocument();
    });
  });
});
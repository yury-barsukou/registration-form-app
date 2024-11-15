import { render, screen, fireEvent } from '@testing-library/react';
import SignInForm from './SignInForm';

describe('SignInForm', () => {
  beforeEach(() => {
    render(<SignInForm />);
  });

  test('renders the sign-in form with all fields', () => {
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
      const password = 'Password123';
      fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: password } });
      expect(screen.getByLabelText(/Password/i)).toHaveValue(password);
    });
  });

  describe('Form Validation', () => {
    test('validates email format correctly', () => {
      fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'invalid' } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
      fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'valid@example.com' } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeNull();
    });

    test('validates password length correctly', () => {
      fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'short' } });
      expect(screen.queryByText(/Your password must have at least 8 characters/i)).toBeInTheDocument();
      fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'LongEnough1' } });
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
      fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'valid@example.com' } });
      fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'Password123' } });
      expect(screen.getByRole('button', { name: /Sign In/i })).not.toBeDisabled();
    });

    test('disables Sign In button with invalid form', () => {
      fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'invalid' } });
      fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'short' } });
      expect(screen.getByRole('button', { name: /Sign In/i })).toBeDisabled();
    });

    test('calls console log with correct data on valid form submission', () => {
      fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'valid@example.com' } });
      fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'Password123' } });
      fireEvent.click(screen.getByRole('button', { name: /Sign In/i }));
      expect(consoleSpy).toHaveBeenLastCalledWith('Sign In submitted:', { email: 'valid@example.com', password: 'Password123' });
    });
  });
});
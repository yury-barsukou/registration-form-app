import { render, screen, fireEvent } from '@testing-library/react';
import SignInForm from './SignInForm';

describe('SignInForm', () => {
  beforeEach(() => {
    render(<SignInForm />);
  });

  const VALID_EMAIL = 'user@example.com';
  const INVALID_EMAIL = 'userexample.com';
  const VALID_PASSWORD = 'password123';
  const SHORT_PASSWORD = 'pass';

  test('renders the sign-in form with all fields', () => {
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign In/i })).toBeInTheDocument();
  });

  test('allows entry of email and password', () => {
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: VALID_EMAIL } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: VALID_PASSWORD } });
    expect(screen.getByLabelText(/Email/i)).toHaveValue(VALID_EMAIL);
    expect(screen.getByLabelText(/Password/i)).toHaveValue(VALID_PASSWORD);
  });

  test('validates email format correctly', () => {
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: INVALID_EMAIL } });
    fireEvent.blur(screen.getByLabelText(/Email/i)); // Simulate leaving the field
    expect(screen.getByText(/Please enter a valid email address/i)).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: VALID_EMAIL } });
    expect(screen.queryByText(/Please enter a valid email address/i)).toBeNull();
  });

  test('validates password length correctly', () => {
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: SHORT_PASSWORD } });
    fireEvent.blur(screen.getByLabelText(/Password/i)); // Simulate leaving the field
    expect(screen.getByText(/Your password must have at least 8 characters/i)).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: VALID_PASSWORD } });
    expect(screen.queryByText(/Your password must have at least 8 characters/i)).toBeNull();
  });

  describe('Form Submission', () => {
    let consoleSpy;

    beforeEach(() => {
      consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterEach(() => {
      consoleSpy.mockRestore();
    });

    test('prevents form submission with invalid email', () => {
      fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: INVALID_EMAIL } });
      fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: VALID_PASSWORD } });
      fireEvent.click(screen.getByRole('button', { name: /Sign In/i }));
      expect(consoleSpy).not.toHaveBeenCalled();
    });

    test('prevents form submission with short password', () => {
      fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: VALID_EMAIL } });
      fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: SHORT_PASSWORD } });
      fireEvent.click(screen.getByRole('button', { name: /Sign In/i }));
      expect(consoleSpy).not.toHaveBeenCalled();
    });

    test('calls console log with correct data on valid form submission', () => {
      fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: VALID_EMAIL } });
      fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: VALID_PASSWORD } });
      fireEvent.click(screen.getByRole('button', { name: /Sign In/i }));
      expect(consoleSpy).toHaveBeenCalledWith('Sign In submitted:', { email: VALID_EMAIL, password: VALID_PASSWORD });
    });
  });
});
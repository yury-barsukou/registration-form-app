import { render, screen, fireEvent } from '@testing-library/react';
import SignInForm from './SignInForm';

const VALID_EMAIL = 'test@example.com';
const INVALID_EMAIL = 'test';
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

  test('validates email format correctly', () => {
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: INVALID_EMAIL } });
    expect(screen.getByText(/Please enter a valid email address/i)).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: VALID_EMAIL } });
    expect(screen.queryByText(/Please enter a valid email address/i)).toBeNull();
  });

  test('validates password length correctly', () => {
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: INVALID_PASSWORD } });
    expect(screen.getByText(/Your password must have at least 8 characters/i)).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: VALID_PASSWORD } });
    expect(screen.queryByText(/Your password must have at least 8 characters/i)).toBeNull();
  });

  test('enables Sign In button with valid form', () => {
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: VALID_EMAIL } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: VALID_PASSWORD } });
    expect(screen.getByRole('button', { name: /Sign In/i })).not.toBeDisabled();
  });

  test('disables Sign In button with invalid form', () => {
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: INVALID_EMAIL } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: INVALID_PASSWORD } });
    expect(screen.getByRole('button', { name: /Sign In/i })).toBeDisabled();
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
      expect(consoleSpy).toHaveBeenLastCalledWith('Sign In submitted:', { email: VALID_EMAIL, password: VALID_PASSWORD });
    });

    test('does not call console log on invalid form submission', () => {
      fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: INVALID_EMAIL } });
      fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: INVALID_PASSWORD } });
      fireEvent.click(screen.getByRole('button', { name: /Sign In/i }));
      expect(consoleSpy).not.toHaveBeenCalled();
    });
  });
});

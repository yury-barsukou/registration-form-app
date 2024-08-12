import { render, screen, fireEvent } from '@testing-library/react';
import SignInForm from './SignInForm';

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

  test('allows entry of email and password', () => {
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: VALID_EMAIL } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: VALID_PASSWORD } });
    expect(screen.getByLabelText(/Email/i)).toHaveValue(VALID_EMAIL);
    expect(screen.getByLabelText(/Password/i)).toHaveValue(VALID_PASSWORD);
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

  test('disables Sign In button with invalid form', () => {
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'invalid' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'short' } });
    expect(screen.getByRole('button', { name: /Sign In/i })).toBeDisabled();
  });

  test('enables Sign In button with valid form', () => {
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
      expect(consoleSpy).toHaveBeenLastCalledWith('Sign In submitted:', { email: VALID_EMAIL, password: VALID_PASSWORD });
    });

    test('does not call console log with invalid form submission', () => {
      fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'invalid' } });
      fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'short' } });
      fireEvent.click(screen.getByRole('button', { name: /Sign In/i }));
      expect(consoleSpy).not.toHaveBeenCalled();
    });
  });
});
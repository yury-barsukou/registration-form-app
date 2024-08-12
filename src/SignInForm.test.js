import { render, screen, fireEvent } from '@testing-library/react';
import SignInForm from './SignInForm';

const VALID_EMAIL = 'john@example.com';
const VALID_PASSWORD = 'Password123';

const fillOutForm = (overrides = {}) => {
  const formData = {
    email: VALID_EMAIL,
    password: VALID_PASSWORD,
    ...overrides,
  };

  fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: formData.email } });
  fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: formData.password } });

  return formData;
};

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
      const value = 'TestEmail@example.com';
      fireEvent.change(screen.getByLabelText(/Email/i), { target: { value } });
      expect(screen.getByLabelText(/Email/i)).toHaveValue(value);
    });

    test('allows entry of password', () => {
      const value = 'TestPassword';
      fireEvent.change(screen.getByLabelText(/Password/i), { target: { value } });
      expect(screen.getByLabelText(/Password/i)).toHaveValue(value);
    });
  });

  describe('Form Validation', () => {
    test('validates email format correctly', () => {
      fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'invalid' } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
      fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: VALID_EMAIL } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeNull();
    });

    test('validates password criteria correctly', () => {
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
      fillOutForm();
      expect(screen.getByRole('button', { name: /Sign In/i })).not.toBeDisabled();
    });

    test('disables Sign In button with invalid form', () => {
      fillOutForm({ email: '' }); // Explicitly set an invalid field
      expect(screen.getByRole('button', { name: /Sign In/i })).toBeDisabled();
    });

    test('calls console log with correct data on valid form submission', () => {
      const formData = fillOutForm();
      fireEvent.click(screen.getByRole('button', { name: /Sign In/i }));
      expect(consoleSpy).toHaveBeenLastCalledWith('Sign In submitted:', formData);
    });

    test('does not call console log on invalid form submission', () => {
      fillOutForm({ email: 'invalid' });
      fireEvent.click(screen.getByRole('button', { name: /Sign In/i }));
      expect(consoleSpy).not.toHaveBeenCalled();
    });
  });
});

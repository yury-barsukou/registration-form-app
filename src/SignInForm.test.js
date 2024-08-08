// Unit tests for SignInForm

import { render, screen, fireEvent } from '@testing-library/react';
import SignInForm from './SignInForm';

const LABELS = {
  email: /Email/i,
  password: /Password/i,
};

const BUTTON_TEXT = /Sign In/i;
const VALID_EMAIL = 'john.doe@example.com';
const VALID_PASSWORD = 'Password123';

const fillOutForm = (overrides = {}) => {
  const formData = {
    email: VALID_EMAIL,
    password: VALID_PASSWORD,
    ...overrides,
  };

  fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: formData.email } });
  fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: formData.password } });

  return formData;
};

describe('SignInForm', () => {
  beforeEach(() => {
    render(<SignInForm />);
  });

  test('renders the sign-in form with all fields', () => {
    expect(screen.getByLabelText(LABELS.email)).toBeInTheDocument();
    expect(screen.getByLabelText(LABELS.password)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeInTheDocument();
  });

  describe('Field Entry', () => {
    test.each(Object.entries(LABELS))('allows entry of %s', (fieldName, labelRegex) => {
      const value = 'TestValue';
      fireEvent.change(screen.getByLabelText(labelRegex), { target: { value } });
      expect(screen.getByLabelText(labelRegex)).toHaveValue(value);
    });
  });

  describe('Form Validation', () => {
    test('validates email format correctly', () => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'invalid' } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: VALID_EMAIL } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeNull();
    });

    test('validates password criteria correctly', () => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: 'short' } });
      expect(screen.queryByText(/Your password must have at least 8 characters/i)).toBeInTheDocument();
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: VALID_PASSWORD } });
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
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).not.toBeDisabled();
    });

    test('disables Sign In button with invalid form', () => {
      fillOutForm({ email: 'invalid' }); // Explicitly set an invalid email
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('calls console log with correct data on valid form submission', () => {
      const formData = fillOutForm();
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(consoleSpy).toHaveBeenLastCalledWith('Sign In submitted:', formData);
    });
  });
},

// Additional tests to cover edge cases and improve test coverage

describe('SignInForm - Edge Cases', () => {
  beforeEach(() => {
    render(<SignInForm />);
  });

  test('does not submit form with empty fields', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
    expect(consoleSpy).not.toHaveBeenCalled();
    consoleSpy.mockRestore();
  });

  test.each([
    { email: 'john.doe@example', password: VALID_PASSWORD, field: 'email', expectedError: /Please enter a valid email address/i },
    { email: VALID_EMAIL, password: '123', field: 'password', expectedError: /Your password must have at least 8 characters/i },
  ])('displays error message for invalid $field', ({ email, password, expectedError }) => {
    fillOutForm({ email, password });
    fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
    expect(screen.queryByText(expectedError)).toBeInTheDocument();
  });

  test('removes error message when user corrects validation error', () => {
    // Trigger validation error for email
    fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'invalid' } });
    expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();

    // Correct the email
    fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: VALID_EMAIL } });
    expect(screen.queryByText(/Please enter a valid email address/i)).toBeNull();
  });

  test('password field should be of type password', () => {
    const passwordInput = screen.getByLabelText(LABELS.password);
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  test('email field should accept only email input', () => {
    const emailField = screen.getByLabelText(LABELS.email);
    fireEvent.change(emailField, { target: { value: 'test@test.com' } });
    expect(emailField).toHaveValue('test@test.com');

    fireEvent.change(emailField, { target: { value: 'invalid-email' } });
    expect(emailField).toHaveValue('invalid-email'); // This is to ensure the field accepts the value, validation is separate
  });

  test('form does not submit with disabled Sign In button', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    fillOutForm({ email: 'invalid' }); // Explicitly set an invalid email
    fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
    expect(consoleSpy).not.toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});

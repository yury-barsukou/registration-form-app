import { render, screen, fireEvent } from '@testing-library/react';
import SignUpForm from '../SignUpForm';

const LABELS = {
  firstName: /First Name/i,
  lastName: /Last Name/i,
  email: /Email/i,
  password: /Password/i,
};

const BUTTON_TEXT = /Create Account/i;
const VALID_EMAIL = 'john.doe@example.com';
const VALID_PASSWORD = 'Password123';

const fillOutForm = (overrides = {}) => {
  const formData = {
    firstName: 'John',
    lastName: 'Doe',
    email: VALID_EMAIL,
    password: VALID_PASSWORD,
    ...overrides,
  };

  fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: formData.firstName } });
  fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: formData.lastName } });
  fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: formData.email } });
  fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: formData.password } });

  return formData;
};

describe('SignUpForm', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  test('renders the sign-up form with all fields', () => {
    expect(screen.getByLabelText(LABELS.firstName)).toBeInTheDocument();
    expect(screen.getByLabelText(LABELS.lastName)).toBeInTheDocument();
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
      const password = screen.getByLabelText(LABELS.password);
      fireEvent.change(password, { target: { value: 'short' } });
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
      fireEvent.change(password, { target: { value: 'LongEnough1' } });
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(/green/);
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
      expect(screen.getByText(/1 number/i).className).toMatch(/green/);
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
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

    test('enables Create Account button with valid form', () => {
      fillOutForm();
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).not.toBeDisabled();
    });

    test('disables Create Account button with invalid form', () => {
      fillOutForm({ firstName: '' }); // Explicitly set an invalid field
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('calls console log with correct data on valid form submission', () => {
      const formData = fillOutForm();
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(consoleSpy).toHaveBeenLastCalledWith('Form submitted:', formData);
    });
  });
});
// Additional tests to improve coverage and test edge cases for SignUpForm component.

describe('SignUpForm - Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Email Validation Edge Cases', () => {
    test('should show email validation error for email without domain', () => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'john.doe@' } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test('should not show email validation error for email with subdomain', () => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'john.doe@sub.example.com' } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeNull();
    });
  });

  describe('Password Validation Edge Cases', () => {
    test('should show validation error for password without uppercase letters', () => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: 'password1' } });
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(/red/);
    });

    test('should show validation error for password without lowercase letters', () => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: 'PASSWORD1' } });
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(/red/);
    });

    test('should show validation error for password without numbers', () => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: 'Password' } });
      expect(screen.getByText(/1 number/i).className).toMatch(/red/);
    });

    test('should show validation error for password with just enough characters', () => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: 'Passw1r' } });
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
    });
  });

  describe('Form Submission Edge Cases', () => {
    let consoleSpy;

    beforeEach(() => {
      consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterEach(() => {
      consoleSpy.mockRestore();
    });

    test('does not call console log with incomplete form data', () => {
      fillOutForm({ email: '' }); // Missing email
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(consoleSpy).not.toHaveBeenCalled();
    });

    test('shows error in console for invalid form submission attempt', () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      fillOutForm({ firstName: '' }); // Invalid form due to empty first name
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(consoleErrorSpy).toHaveBeenCalledWith('Form is invalid');
      consoleErrorSpy.mockRestore();
    });

    test('does not enable Create Account button with invalid email format', () => {
      fillOutForm({ email: 'invalidemail' });
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });
  });
});
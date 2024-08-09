import { render, screen, fireEvent } from '@testing-library/react';
import SignUpForm from './SignUpForm';

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

// Additional tests to improve coverage

describe('SignUpForm - Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Password Validations', () => {
    test.each([
      { password: 'abc', hasUppercase: false, hasLowercase: true, hasNumber: false, isLongEnough: false },
      { password: 'ABC', hasUppercase: true, hasLowercase: false, hasNumber: false, isLongEnough: false },
      { password: '123', hasUppercase: false, hasLowercase: false, hasNumber: true, isLongEnough: false },
      { password: 'Aa1', hasUppercase: true, hasLowercase: true, hasNumber: true, isLongEnough: false },
      { password: 'Aa123456', hasUppercase: true, hasLowercase: true, hasNumber: true, isLongEnough: true }
    ])('validates password "$password" correctly', ({ password, hasUppercase, hasLowercase, hasNumber, isLongEnough }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(hasUppercase ? /green/ : /red/);
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(hasLowercase ? /green/ : /red/);
      expect(screen.getByText(/1 number/i).className).toMatch(hasNumber ? /green/ : /red/);
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(isLongEnough ? /green/ : /red/);
    });
  });

  describe('Email Validations', () => {
    test.each([
      { email: 'invalid@', isValid: false },
      { email: 'valid@example.com', isValid: true },
      { email: 'noatsign.com', isValid: false },
      { email: 'correct@domain.com', isValid: true }
    ])('validates email "$email" correctly', ({ email, isValid }) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      const validationMessage = screen.queryByText(/Please enter a valid email address/i);
      if (isValid) {
        expect(validationMessage).toBeNull();
      } else {
        expect(validationMessage).toBeInTheDocument();
      }
    });
  });

  describe('Form Validation on Field Changes', () => {
    test.each([
      { field: 'firstName', value: '', isValid: false },
      { field: 'lastName', value: '', isValid: false },
      { field: 'email', value: 'invalid', isValid: false },
      { field: 'password', value: 'short', isValid: false }
    ])('modifies form validity when $field is "$value"', ({ field, value, isValid }) => {
      fillOutForm({ [field]: value });
      const createAccountButton = screen.getByRole('button', { name: BUTTON_TEXT });
      if (isValid) {
        expect(createAccountButton).not.toBeDisabled();
      } else {
        expect(createAccountButton).toBeDisabled();
      }
    });
  });
});
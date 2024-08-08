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
describe('SignUpForm - Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  // Testing password validation for various edge cases
  describe('Password Validation Edge Cases', () => {
    const testCases = [
      { password: 'alllowercase', expected: 'red' },
      { password: 'ALLUPPERCASE', expected: 'red' },
      { password: '12345678', expected: 'red' },
      { password: 'LowerAnd123', expected: 'red' },
      { password: 'UPPERand123', expected: 'red' },
      { password: 'LowerUPPER', expected: 'red' },
      { password: 'LowerUPPER123', expected: 'green' },
      { password: 'aB1', expected: 'red' }, // Not long enough
    ];

    testCases.forEach(({ password, expected }) => {
      test(`"${password}" validation classes`, () => {
        fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
        expect(screen.getByText(/1 uppercase character/i).className).toMatch(expected);
        expect(screen.getByText(/1 lowercase character/i).className).toMatch(expected);
        expect(screen.getByText(/1 number/i).className).toMatch(expected);
        expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(password.length >= 8 ? 'green' : 'red');
      });
    });
  });

  // Testing email validation for various edge cases
  describe('Email Validation Edge Cases', () => {
    const emailTestCases = [
      { email: 'simple@example.com', isValid: true },
      { email: 'very.common@example.com', isValid: true },
      { email: 'disposable.style.email.with+symbol@example.com', isValid: true },
      { email: 'other.email-with-hyphen@example.com', isValid: true },
      { email: 'fully-qualified-domain@example.com', isValid: true },
      { email: 'user.name+tag+sorting@example.com', isValid: true },
      { email: 'x@example.com', isValid: true },
      { email: 'example-indeed@strange-example.com', isValid: true },
      { email: 'test@test.com', isValid: true },
      { email: 'admin@mailserver1', isValid: false },
      { email: 'example@s.solutions', isValid: true },
      { email: 'john.doe@example..com', isValid: false },
      { email: 'abc', isValid: false },
      { email: '@example.com', isValid: false },
    ];

    emailTestCases.forEach(({ email, isValid }) => {
      test(`"${email}" - is valid: ${isValid}`, () => {
        fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
        if (isValid) {
          expect(screen.queryByText(/Please enter a valid email address/i)).toBeNull();
        } else {
          expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
        }
      });
    });
  });

  // Testing form validation with different combinations of valid/invalid inputs
  describe('Form Validation with Mixed Inputs', () => {
    const formTestCases = [
      { data: { firstName: 'John', lastName: 'Doe', email: 'invalid', password: VALID_PASSWORD }, isValid: false },
      { data: { firstName: '', lastName: 'Doe', email: VALID_EMAIL, password: VALID_PASSWORD }, isValid: false },
      { data: { firstName: 'John', lastName: '', email: VALID_EMAIL, password: VALID_PASSWORD }, isValid: false },
      { data: { firstName: 'John', lastName: 'Doe', email: VALID_EMAIL, password: 'short' }, isValid: false },
      { data: { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', password: 'Password123' }, isValid: true },
    ];

    formTestCases.forEach(({ data, isValid }, index) => {
      test(`Form validation with testCase #${index + 1} - Expected isValid: ${isValid}`, () => {
        fillOutForm(data);
        if (isValid) {
          expect(screen.getByRole('button', { name: BUTTON_TEXT })).not.toBeDisabled();
        } else {
          expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
        }
      });
    });
  });
});
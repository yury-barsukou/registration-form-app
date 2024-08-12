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

  describe('SignUpForm Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Password Validations', () => {
    test('password must contain at least one uppercase letter', () => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: 'password123' } });
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(/red/);
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: 'Password123' } });
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(/green/);
    });

    test('password must contain at least one lowercase letter', () => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: 'PASSWORD123' } });
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(/red/);
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: 'Password123' } });
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
    });

    test('password must contain at least one digit', () => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: 'Password' } });
      expect(screen.getByText(/1 number/i).className).toMatch(/red/);
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: 'Password1' } });
      expect(screen.getByText(/1 number/i).className).toMatch(/green/);
    });

    test('password must be at least 8 characters long', () => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: 'Pass1' } });
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: 'Password1' } });
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });
  });

  describe('Email Validations', () => {
    test.each([
      ['plainaddress', false],
      ['@missinglocalpart.com', false],
      ['missingdomain@', false],
      ['john.doe@com', false],
      ['john.doe@example.com', true],
      ['email@123.123.123.123', true],
      ['email@[123.123.123.123]', true],
      ['"email"@example.com', true],
    ])('validates the email: %s as %s', (email, isValid) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      if (isValid) {
        expect(screen.queryByText(/Please enter a valid email address/i)).toBeNull();
      } else {
        expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
      }
    });
  });

  describe('Form Fields Presence Validation', () => {
    test.each([
      ['firstName', 'John'],
      ['lastName', 'Doe'],
      ['email', VALID_EMAIL],
      ['password', VALID_PASSWORD],
    ])('ensures %s field is required for form submission', (fieldName, validValue) => {
      const formData = fillOutForm({ [fieldName]: '' });
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();

      fireEvent.change(screen.getByLabelText(LABELS[fieldName]), { target: { value: validValue } });
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).not.toBeDisabled();
    });
  });

  describe('Invalid Form Submission', () => {
    let consoleErrorSpy;

    beforeEach(() => {
      consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
      consoleErrorSpy.mockRestore();
    });

    test('does not call console log and shows error on invalid form submission', () => {
      fillOutForm({ email: 'invalid' }); // Explicitly set an invalid email
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(consoleErrorSpy).toHaveBeenCalledWith('Form is invalid');
    });
  });
});
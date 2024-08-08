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

describe('SignUpForm Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Edge Cases', () => {
    test('should display error for empty email input', () => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: '' } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test.each([
      { password: 'onlylowercase', expected: 'red' },
      { password: 'ONLYUPPERCASE', expected: 'red' },
      { password: '12345678', expected: 'red' },
      { password: 'LowerAnd123', expected: 'red' },
      { password: 'UPPERAND123', expected: 'red' },
      { password: 'lowerUPPER', expected: 'red' },
      { password: 'ValidPassword1', expected: 'green' },
    ])('validates complex password criteria ($password)', ({ password, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(expected);
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(expected);
      expect(screen.getByText(/1 number/i).className).toMatch(expected);
    });

    test('should display error for email without domain', () => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'user@' } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test('should display error for email without "@" symbol', () => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'user.example.com' } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test('should not log to console when form is invalid on submission', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      fillOutForm({ email: 'invalid' }); // Invalid email
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(consoleSpy).toHaveBeenLastCalledWith('Form is invalid');
      consoleSpy.mockRestore();
    });

    test('firstName and lastName fields should accept maximum of 50 characters', () => {
      const longString = 'a'.repeat(51);
      const validString = 'a'.repeat(50);

      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: longString } });
      expect(screen.getByLabelText(LABELS.firstName).value.length).toBe(50);

      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: longString } });
      expect(screen.getByLabelText(LABELS.lastName).value.length).toBe(50);

      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: validString } });
      expect(screen.getByLabelText(LABELS.firstName).value).toBe(validString);

      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: validString } });
      expect(screen.getByLabelText(LABELS.lastName).value).toBe(validString);
    });
  });
});
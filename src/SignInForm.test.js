import { render, screen, fireEvent } from '@testing-library/react';
import SignInForm from './SignInForm';

const LABELS = {
  email: /Email/i,
  password: /Password/i,
};

const BUTTON_TEXT = /Sign In/i;
const VALID_EMAIL = 'jane.doe@example.com';
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
      expect(screen.getByText(/Your password must have at least 8 characters/i)).toBeInTheDocument();
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

    test('displays error message with invalid form submission attempt', () => {
      fillOutForm({ email: 'invalid', password: '123' }); // Explicitly set invalid fields
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(consoleSpy).toHaveBeenLastCalledWith('Sign In form is invalid');
    });

    test('calls console log with correct data on valid form submission', () => {
      const formData = fillOutForm();
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(consoleSpy).toHaveBeenLastCalledWith('Sign In submitted:', formData);
    });
  });
};

// Additional unit tests to cover edge cases and improve test coverage

describe('SignInForm - Edge Cases', () => {
  beforeEach(() => {
    render(<SignInForm />);
  });

  test('disables sign in button when email is empty', () => {
    fillOutForm({ email: '' });
    expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
  });

  test('disables sign in button when password is empty', () => {
    fillOutForm({ password: '' });
    expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
  });

  test('displays error message when email is not provided', () => {
    fillOutForm({ email: '' });
    fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
    expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
  });

  test('displays error message when password is not provided', () => {
    fillOutForm({ password: '' });
    fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
    expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
  });

  test('validates email with edge case inputs', () => {
    const invalidEmails = ['test@test', 'test.com', '@test.com', 'test@.com'];
    const validEmails = ['test@test.com', 'test_123@test.co.uk', 'test+123@test.com'];

    invalidEmails.forEach(email => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      expect(screen.getByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    validEmails.forEach(email => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeNull();
    });
  });

  test('validates password with edge case inputs', () => {
    const invalidPasswords = ['1234567', 'abcdefgh', 'ABCDEFGH'];
    const validPasswords = ['12345678', 'Abcdefgh1'];

    invalidPasswords.forEach(password => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      expect(screen.getByText(/Your password must have at least 8 characters/i)).toBeInTheDocument();
    });

    validPasswords.forEach(password => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      expect(screen.queryByText(/Your password must have at least 8 characters/i)).toBeNull();
    });
  });

  test('validates mixed case password requirement', () => {
    fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: 'alllowercase' } });
    expect(screen.getByText(/Your password must contain both upper and lower case characters/i)).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: 'ALLUPPERCASE' } });
    expect(screen.getByText(/Your password must contain both upper and lower case characters/i)).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: 'ValidPass123' } });
    expect(screen.queryByText(/Your password must contain both upper and lower case characters/i)).toBeNull();
  });

  test('validates numeric character password requirement', () => {
    fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: 'NoNumbers' } });
    expect(screen.getByText(/Your password must contain at least one numeric character/i)).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: 'With1Number' } });
    expect(screen.queryByText(/Your password must contain at least one numeric character/i)).toBeNull();
  });
});
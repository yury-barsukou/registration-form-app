import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import SignInForm from './SignInForm';

const LABELS = {
  email: /Email/i,
  password: /Password/i,
};

const BUTTON_TEXT = /Sign In/i;
const VALID_EMAIL = 'jane.doe@example.com';
const VALID_PASSWORD = 'ValidPass1';

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

  afterEach(() => {
    cleanup();
  });

  test('renders the sign-in form with all fields', () => {
    expect(screen.getByLabelText(LABELS.email)).toBeInTheDocument();
    expect(screen.getByLabelText(LABELS.password)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Forgot Password\?/i })).toBeInTheDocument();
  });

  describe('Field Entry', () => {
    test.each(Object.entries(LABELS))('allows entry of %s', (_fieldName, labelRegex) => {
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

    test('shows password validation message when too short and hides when valid', () => {
      const passwordInput = screen.getByLabelText(LABELS.password);
      fireEvent.change(passwordInput, { target: { value: 'short' } });
      expect(screen.queryByText(/Your password must have at least 8 characters/i)).toBeInTheDocument();
      fireEvent.change(passwordInput, { target: { value: VALID_PASSWORD } });
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
      fillOutForm({ email: '' });
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('calls console log with correct data on valid form submission', () => {
      const formData = fillOutForm();
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(consoleSpy).toHaveBeenLastCalledWith('Sign In submitted:', formData);
    });
  });
});

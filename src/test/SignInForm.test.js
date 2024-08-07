import { render, screen, fireEvent } from '@testing-library/react';
import SignInForm from '../SignInForm';

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

    test('calls console log with correct data on valid form submission', () => {
      const formData = fillOutForm();
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(consoleSpy).toHaveBeenLastCalledWith('Sign In submitted:', formData);
    });
  });
});

// Additional test cases to enhance coverage
describe('SignInForm - Edge Cases and Negative Scenarios', () => {
  beforeEach(() => {
    render(<SignInForm />);
  });

  test('disables Sign In button with invalid email', () => {
    fillOutForm({ email: 'invalidEmail' });
    expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
  });

  test('disables Sign In button with too short password', () => {
    fillOutForm({ password: 'short' });
    expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
  });

  test('shows error message with empty email submission', () => {
    fillOutForm({ email: '' });
    fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
    expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
  });

  test('shows error message with empty password submission', () => {
    fillOutForm({ password: '' });
    fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
    expect(screen.queryByText(/Your password must have at least 8 characters/i)).toBeInTheDocument();
  });

  test('does not call console log with invalid form submission', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    fillOutForm({ email: 'invalid', password: 'short' });
    fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
    expect(consoleSpy).not.toHaveBeenCalled();
    consoleSpy.mockRestore();
  });

  test('password field should be of type password', () => {
    expect(screen.getByLabelText(LABELS.password)).toHaveAttribute('type', 'password');
  });

  test('email field should accept email input type', () => {
    expect(screen.getByLabelText(LABELS.email)).toHaveAttribute('type', 'email');
  });

  describe('Form Submission with Mock Function', () => {
    let mockSubmitFunction;

    beforeEach(() => {
      mockSubmitFunction = jest.fn();
      render(<SignInForm onSubmit={mockSubmitFunction} />);
    });

    test('calls onSubmit prop function with correct data on valid form submission', () => {
      const formData = fillOutForm();
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(mockSubmitFunction).toHaveBeenCalledWith(formData);
    });
  });
});
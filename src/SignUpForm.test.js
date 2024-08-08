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
describe('SignUpForm - Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Email and Password Validations on Change', () => {
    test('shows email validation error with incomplete email', () => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'john.doe' } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test('removes email validation error with valid email', () => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'john.doe' } });
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: VALID_EMAIL } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeNull();
    });

    test.each([
      { password: 'abc', expected: /Minimum 8 characters/i },
      { password: 'abcdefgh', expected: /1 uppercase character/i },
      { password: 'ABCDEFGH', expected: /1 lowercase character/i },
      { password: 'Abcdefgh', expected: /1 number/i },
    ])('validates password "$password" and shows correct error', ({ password, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      expect(screen.getByText(expected).className).toMatch(/red/);
    });
  });

  describe('Form Reset and Re-validation', () => {
    test('resets and re-validates form correctly after initial valid submission', () => {
      fillOutForm();
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      // Simulate form reset
      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: '' } });

      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: 'Jane' } });
      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: 'Doe' } });
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'invalid' } });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: 'short' } });

      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });
  });

  describe('Edge Case Handling', () => {
    test('handles edge case with extremely long inputs', () => {
      const longString = 'a'.repeat(1001);
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: longString } });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: longString } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('handles edge case with special characters in password', () => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: 'Abcdefgh1!' } });
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(/green/);
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
      expect(screen.getByText(/1 number/i).className).toMatch(/green/);
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('handles empty form fields correctly', () => {
      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: '' } });
      
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });
  });
});
  fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: formData.lastName } });
describe('SignUpForm - Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Email and Password Validations on Change', () => {
    test('shows email validation error with incomplete email', () => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'john.doe' } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test('removes email validation error with valid email', () => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'john.doe' } });
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: VALID_EMAIL } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeNull();
    });

    test.each([
      { password: 'abc', expected: /Minimum 8 characters/i },
      { password: 'abcdefgh', expected: /1 uppercase character/i },
      { password: 'ABCDEFGH', expected: /1 lowercase character/i },
      { password: 'Abcdefgh', expected: /1 number/i },
    ])('validates password "$password" and shows correct error', ({ password, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      expect(screen.getByText(expected).className).toMatch(/red/);
    });
  });

  describe('Form Reset and Re-validation', () => {
    test('resets and re-validates form correctly after initial valid submission', () => {
      fillOutForm();
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      // Simulate form reset
      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: '' } });

      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: 'Jane' } });
      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: 'Doe' } });
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'invalid' } });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: 'short' } });

      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });
  });

  describe('Edge Case Handling', () => {
    test('handles edge case with extremely long inputs', () => {
      const longString = 'a'.repeat(1001);
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: longString } });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: longString } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('handles edge case with special characters in password', () => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: 'Abcdefgh1!' } });
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(/green/);
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
      expect(screen.getByText(/1 number/i).className).toMatch(/green/);
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('handles empty form fields correctly', () => {
      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: '' } });
      
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });
  });
});
  fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: formData.email } });
describe('SignUpForm - Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Email and Password Validations on Change', () => {
    test('shows email validation error with incomplete email', () => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'john.doe' } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test('removes email validation error with valid email', () => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'john.doe' } });
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: VALID_EMAIL } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeNull();
    });

    test.each([
      { password: 'abc', expected: /Minimum 8 characters/i },
      { password: 'abcdefgh', expected: /1 uppercase character/i },
      { password: 'ABCDEFGH', expected: /1 lowercase character/i },
      { password: 'Abcdefgh', expected: /1 number/i },
    ])('validates password "$password" and shows correct error', ({ password, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      expect(screen.getByText(expected).className).toMatch(/red/);
    });
  });

  describe('Form Reset and Re-validation', () => {
    test('resets and re-validates form correctly after initial valid submission', () => {
      fillOutForm();
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      // Simulate form reset
      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: '' } });

      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: 'Jane' } });
      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: 'Doe' } });
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'invalid' } });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: 'short' } });

      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });
  });

  describe('Edge Case Handling', () => {
    test('handles edge case with extremely long inputs', () => {
      const longString = 'a'.repeat(1001);
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: longString } });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: longString } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('handles edge case with special characters in password', () => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: 'Abcdefgh1!' } });
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(/green/);
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
      expect(screen.getByText(/1 number/i).className).toMatch(/green/);
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('handles empty form fields correctly', () => {
      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: '' } });
      
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });
  });
});
  fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: formData.password } });
describe('SignUpForm - Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Email and Password Validations on Change', () => {
    test('shows email validation error with incomplete email', () => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'john.doe' } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test('removes email validation error with valid email', () => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'john.doe' } });
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: VALID_EMAIL } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeNull();
    });

    test.each([
      { password: 'abc', expected: /Minimum 8 characters/i },
      { password: 'abcdefgh', expected: /1 uppercase character/i },
      { password: 'ABCDEFGH', expected: /1 lowercase character/i },
      { password: 'Abcdefgh', expected: /1 number/i },
    ])('validates password "$password" and shows correct error', ({ password, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      expect(screen.getByText(expected).className).toMatch(/red/);
    });
  });

  describe('Form Reset and Re-validation', () => {
    test('resets and re-validates form correctly after initial valid submission', () => {
      fillOutForm();
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      // Simulate form reset
      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: '' } });

      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: 'Jane' } });
      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: 'Doe' } });
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'invalid' } });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: 'short' } });

      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });
  });

  describe('Edge Case Handling', () => {
    test('handles edge case with extremely long inputs', () => {
      const longString = 'a'.repeat(1001);
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: longString } });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: longString } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('handles edge case with special characters in password', () => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: 'Abcdefgh1!' } });
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(/green/);
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
      expect(screen.getByText(/1 number/i).className).toMatch(/green/);
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('handles empty form fields correctly', () => {
      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: '' } });
      
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });
  });
});

  return formData;
};

describe('SignUpForm', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });
describe('SignUpForm - Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Email and Password Validations on Change', () => {
    test('shows email validation error with incomplete email', () => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'john.doe' } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test('removes email validation error with valid email', () => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'john.doe' } });
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: VALID_EMAIL } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeNull();
    });

    test.each([
      { password: 'abc', expected: /Minimum 8 characters/i },
      { password: 'abcdefgh', expected: /1 uppercase character/i },
      { password: 'ABCDEFGH', expected: /1 lowercase character/i },
      { password: 'Abcdefgh', expected: /1 number/i },
    ])('validates password "$password" and shows correct error', ({ password, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      expect(screen.getByText(expected).className).toMatch(/red/);
    });
  });

  describe('Form Reset and Re-validation', () => {
    test('resets and re-validates form correctly after initial valid submission', () => {
      fillOutForm();
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      // Simulate form reset
      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: '' } });

      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: 'Jane' } });
      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: 'Doe' } });
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'invalid' } });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: 'short' } });

      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });
  });

  describe('Edge Case Handling', () => {
    test('handles edge case with extremely long inputs', () => {
      const longString = 'a'.repeat(1001);
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: longString } });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: longString } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('handles edge case with special characters in password', () => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: 'Abcdefgh1!' } });
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(/green/);
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
      expect(screen.getByText(/1 number/i).className).toMatch(/green/);
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('handles empty form fields correctly', () => {
      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: '' } });
      
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });
  });
});

  test('renders the sign-up form with all fields', () => {
    expect(screen.getByLabelText(LABELS.firstName)).toBeInTheDocument();
    expect(screen.getByLabelText(LABELS.lastName)).toBeInTheDocument();
    expect(screen.getByLabelText(LABELS.email)).toBeInTheDocument();
    expect(screen.getByLabelText(LABELS.password)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeInTheDocument();
  });
describe('SignUpForm - Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Email and Password Validations on Change', () => {
    test('shows email validation error with incomplete email', () => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'john.doe' } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test('removes email validation error with valid email', () => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'john.doe' } });
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: VALID_EMAIL } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeNull();
    });

    test.each([
      { password: 'abc', expected: /Minimum 8 characters/i },
      { password: 'abcdefgh', expected: /1 uppercase character/i },
      { password: 'ABCDEFGH', expected: /1 lowercase character/i },
      { password: 'Abcdefgh', expected: /1 number/i },
    ])('validates password "$password" and shows correct error', ({ password, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      expect(screen.getByText(expected).className).toMatch(/red/);
    });
  });

  describe('Form Reset and Re-validation', () => {
    test('resets and re-validates form correctly after initial valid submission', () => {
      fillOutForm();
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      // Simulate form reset
      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: '' } });

      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: 'Jane' } });
      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: 'Doe' } });
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'invalid' } });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: 'short' } });

      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });
  });

  describe('Edge Case Handling', () => {
    test('handles edge case with extremely long inputs', () => {
      const longString = 'a'.repeat(1001);
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: longString } });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: longString } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('handles edge case with special characters in password', () => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: 'Abcdefgh1!' } });
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(/green/);
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
      expect(screen.getByText(/1 number/i).className).toMatch(/green/);
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('handles empty form fields correctly', () => {
      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: '' } });
      
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });
  });
});

  describe('Field Entry', () => {
    test.each(Object.entries(LABELS))('allows entry of %s', (fieldName, labelRegex) => {
      const value = 'TestValue';
      fireEvent.change(screen.getByLabelText(labelRegex), { target: { value } });
describe('SignUpForm - Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Email and Password Validations on Change', () => {
    test('shows email validation error with incomplete email', () => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'john.doe' } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test('removes email validation error with valid email', () => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'john.doe' } });
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: VALID_EMAIL } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeNull();
    });

    test.each([
      { password: 'abc', expected: /Minimum 8 characters/i },
      { password: 'abcdefgh', expected: /1 uppercase character/i },
      { password: 'ABCDEFGH', expected: /1 lowercase character/i },
      { password: 'Abcdefgh', expected: /1 number/i },
    ])('validates password "$password" and shows correct error', ({ password, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      expect(screen.getByText(expected).className).toMatch(/red/);
    });
  });

  describe('Form Reset and Re-validation', () => {
    test('resets and re-validates form correctly after initial valid submission', () => {
      fillOutForm();
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      // Simulate form reset
      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: '' } });

      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: 'Jane' } });
      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: 'Doe' } });
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'invalid' } });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: 'short' } });

      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });
  });

  describe('Edge Case Handling', () => {
    test('handles edge case with extremely long inputs', () => {
      const longString = 'a'.repeat(1001);
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: longString } });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: longString } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('handles edge case with special characters in password', () => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: 'Abcdefgh1!' } });
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(/green/);
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
      expect(screen.getByText(/1 number/i).className).toMatch(/green/);
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('handles empty form fields correctly', () => {
      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: '' } });
      
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });
  });
});
      expect(screen.getByLabelText(labelRegex)).toHaveValue(value);
    });
describe('SignUpForm - Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Email and Password Validations on Change', () => {
    test('shows email validation error with incomplete email', () => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'john.doe' } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test('removes email validation error with valid email', () => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'john.doe' } });
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: VALID_EMAIL } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeNull();
    });

    test.each([
      { password: 'abc', expected: /Minimum 8 characters/i },
      { password: 'abcdefgh', expected: /1 uppercase character/i },
      { password: 'ABCDEFGH', expected: /1 lowercase character/i },
      { password: 'Abcdefgh', expected: /1 number/i },
    ])('validates password "$password" and shows correct error', ({ password, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      expect(screen.getByText(expected).className).toMatch(/red/);
    });
  });

  describe('Form Reset and Re-validation', () => {
    test('resets and re-validates form correctly after initial valid submission', () => {
      fillOutForm();
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      // Simulate form reset
      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: '' } });

      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: 'Jane' } });
      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: 'Doe' } });
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'invalid' } });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: 'short' } });

      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });
  });

  describe('Edge Case Handling', () => {
    test('handles edge case with extremely long inputs', () => {
      const longString = 'a'.repeat(1001);
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: longString } });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: longString } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('handles edge case with special characters in password', () => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: 'Abcdefgh1!' } });
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(/green/);
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
      expect(screen.getByText(/1 number/i).className).toMatch(/green/);
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('handles empty form fields correctly', () => {
      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: '' } });
      
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });
  });
});
  });
describe('SignUpForm - Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Email and Password Validations on Change', () => {
    test('shows email validation error with incomplete email', () => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'john.doe' } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test('removes email validation error with valid email', () => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'john.doe' } });
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: VALID_EMAIL } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeNull();
    });

    test.each([
      { password: 'abc', expected: /Minimum 8 characters/i },
      { password: 'abcdefgh', expected: /1 uppercase character/i },
      { password: 'ABCDEFGH', expected: /1 lowercase character/i },
      { password: 'Abcdefgh', expected: /1 number/i },
    ])('validates password "$password" and shows correct error', ({ password, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      expect(screen.getByText(expected).className).toMatch(/red/);
    });
  });

  describe('Form Reset and Re-validation', () => {
    test('resets and re-validates form correctly after initial valid submission', () => {
      fillOutForm();
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      // Simulate form reset
      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: '' } });

      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: 'Jane' } });
      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: 'Doe' } });
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'invalid' } });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: 'short' } });

      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });
  });

  describe('Edge Case Handling', () => {
    test('handles edge case with extremely long inputs', () => {
      const longString = 'a'.repeat(1001);
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: longString } });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: longString } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('handles edge case with special characters in password', () => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: 'Abcdefgh1!' } });
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(/green/);
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
      expect(screen.getByText(/1 number/i).className).toMatch(/green/);
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('handles empty form fields correctly', () => {
      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: '' } });
      
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });
  });
});

  describe('Form Validation', () => {
    test('validates email format correctly', () => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'invalid' } });
describe('SignUpForm - Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Email and Password Validations on Change', () => {
    test('shows email validation error with incomplete email', () => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'john.doe' } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test('removes email validation error with valid email', () => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'john.doe' } });
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: VALID_EMAIL } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeNull();
    });

    test.each([
      { password: 'abc', expected: /Minimum 8 characters/i },
      { password: 'abcdefgh', expected: /1 uppercase character/i },
      { password: 'ABCDEFGH', expected: /1 lowercase character/i },
      { password: 'Abcdefgh', expected: /1 number/i },
    ])('validates password "$password" and shows correct error', ({ password, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      expect(screen.getByText(expected).className).toMatch(/red/);
    });
  });

  describe('Form Reset and Re-validation', () => {
    test('resets and re-validates form correctly after initial valid submission', () => {
      fillOutForm();
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      // Simulate form reset
      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: '' } });

      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: 'Jane' } });
      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: 'Doe' } });
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'invalid' } });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: 'short' } });

      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });
  });

  describe('Edge Case Handling', () => {
    test('handles edge case with extremely long inputs', () => {
      const longString = 'a'.repeat(1001);
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: longString } });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: longString } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('handles edge case with special characters in password', () => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: 'Abcdefgh1!' } });
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(/green/);
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
      expect(screen.getByText(/1 number/i).className).toMatch(/green/);
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('handles empty form fields correctly', () => {
      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: '' } });
      
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });
  });
});
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: VALID_EMAIL } });
describe('SignUpForm - Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Email and Password Validations on Change', () => {
    test('shows email validation error with incomplete email', () => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'john.doe' } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test('removes email validation error with valid email', () => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'john.doe' } });
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: VALID_EMAIL } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeNull();
    });

    test.each([
      { password: 'abc', expected: /Minimum 8 characters/i },
      { password: 'abcdefgh', expected: /1 uppercase character/i },
      { password: 'ABCDEFGH', expected: /1 lowercase character/i },
      { password: 'Abcdefgh', expected: /1 number/i },
    ])('validates password "$password" and shows correct error', ({ password, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      expect(screen.getByText(expected).className).toMatch(/red/);
    });
  });

  describe('Form Reset and Re-validation', () => {
    test('resets and re-validates form correctly after initial valid submission', () => {
      fillOutForm();
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      // Simulate form reset
      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: '' } });

      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: 'Jane' } });
      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: 'Doe' } });
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'invalid' } });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: 'short' } });

      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });
  });

  describe('Edge Case Handling', () => {
    test('handles edge case with extremely long inputs', () => {
      const longString = 'a'.repeat(1001);
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: longString } });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: longString } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('handles edge case with special characters in password', () => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: 'Abcdefgh1!' } });
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(/green/);
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
      expect(screen.getByText(/1 number/i).className).toMatch(/green/);
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('handles empty form fields correctly', () => {
      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: '' } });
      
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });
  });
});
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeNull();
    });
describe('SignUpForm - Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Email and Password Validations on Change', () => {
    test('shows email validation error with incomplete email', () => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'john.doe' } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test('removes email validation error with valid email', () => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'john.doe' } });
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: VALID_EMAIL } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeNull();
    });

    test.each([
      { password: 'abc', expected: /Minimum 8 characters/i },
      { password: 'abcdefgh', expected: /1 uppercase character/i },
      { password: 'ABCDEFGH', expected: /1 lowercase character/i },
      { password: 'Abcdefgh', expected: /1 number/i },
    ])('validates password "$password" and shows correct error', ({ password, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      expect(screen.getByText(expected).className).toMatch(/red/);
    });
  });

  describe('Form Reset and Re-validation', () => {
    test('resets and re-validates form correctly after initial valid submission', () => {
      fillOutForm();
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      // Simulate form reset
      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: '' } });

      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: 'Jane' } });
      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: 'Doe' } });
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'invalid' } });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: 'short' } });

      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });
  });

  describe('Edge Case Handling', () => {
    test('handles edge case with extremely long inputs', () => {
      const longString = 'a'.repeat(1001);
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: longString } });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: longString } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('handles edge case with special characters in password', () => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: 'Abcdefgh1!' } });
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(/green/);
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
      expect(screen.getByText(/1 number/i).className).toMatch(/green/);
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('handles empty form fields correctly', () => {
      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: '' } });
      
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });
  });
});

    test('validates password criteria correctly', () => {
      const password = screen.getByLabelText(LABELS.password);
      fireEvent.change(password, { target: { value: 'short' } });
describe('SignUpForm - Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Email and Password Validations on Change', () => {
    test('shows email validation error with incomplete email', () => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'john.doe' } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test('removes email validation error with valid email', () => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'john.doe' } });
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: VALID_EMAIL } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeNull();
    });

    test.each([
      { password: 'abc', expected: /Minimum 8 characters/i },
      { password: 'abcdefgh', expected: /1 uppercase character/i },
      { password: 'ABCDEFGH', expected: /1 lowercase character/i },
      { password: 'Abcdefgh', expected: /1 number/i },
    ])('validates password "$password" and shows correct error', ({ password, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      expect(screen.getByText(expected).className).toMatch(/red/);
    });
  });

  describe('Form Reset and Re-validation', () => {
    test('resets and re-validates form correctly after initial valid submission', () => {
      fillOutForm();
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      // Simulate form reset
      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: '' } });

      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: 'Jane' } });
      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: 'Doe' } });
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'invalid' } });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: 'short' } });

      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });
  });

  describe('Edge Case Handling', () => {
    test('handles edge case with extremely long inputs', () => {
      const longString = 'a'.repeat(1001);
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: longString } });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: longString } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('handles edge case with special characters in password', () => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: 'Abcdefgh1!' } });
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(/green/);
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
      expect(screen.getByText(/1 number/i).className).toMatch(/green/);
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('handles empty form fields correctly', () => {
      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: '' } });
      
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });
  });
});
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
      fireEvent.change(password, { target: { value: 'LongEnough1' } });
describe('SignUpForm - Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Email and Password Validations on Change', () => {
    test('shows email validation error with incomplete email', () => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'john.doe' } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test('removes email validation error with valid email', () => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'john.doe' } });
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: VALID_EMAIL } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeNull();
    });

    test.each([
      { password: 'abc', expected: /Minimum 8 characters/i },
      { password: 'abcdefgh', expected: /1 uppercase character/i },
      { password: 'ABCDEFGH', expected: /1 lowercase character/i },
      { password: 'Abcdefgh', expected: /1 number/i },
    ])('validates password "$password" and shows correct error', ({ password, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      expect(screen.getByText(expected).className).toMatch(/red/);
    });
  });

  describe('Form Reset and Re-validation', () => {
    test('resets and re-validates form correctly after initial valid submission', () => {
      fillOutForm();
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      // Simulate form reset
      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: '' } });

      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: 'Jane' } });
      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: 'Doe' } });
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'invalid' } });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: 'short' } });

      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });
  });

  describe('Edge Case Handling', () => {
    test('handles edge case with extremely long inputs', () => {
      const longString = 'a'.repeat(1001);
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: longString } });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: longString } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('handles edge case with special characters in password', () => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: 'Abcdefgh1!' } });
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(/green/);
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
      expect(screen.getByText(/1 number/i).className).toMatch(/green/);
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('handles empty form fields correctly', () => {
      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: '' } });
      
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });
  });
});
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(/green/);
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
      expect(screen.getByText(/1 number/i).className).toMatch(/green/);
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });
describe('SignUpForm - Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Email and Password Validations on Change', () => {
    test('shows email validation error with incomplete email', () => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'john.doe' } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test('removes email validation error with valid email', () => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'john.doe' } });
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: VALID_EMAIL } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeNull();
    });

    test.each([
      { password: 'abc', expected: /Minimum 8 characters/i },
      { password: 'abcdefgh', expected: /1 uppercase character/i },
      { password: 'ABCDEFGH', expected: /1 lowercase character/i },
      { password: 'Abcdefgh', expected: /1 number/i },
    ])('validates password "$password" and shows correct error', ({ password, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      expect(screen.getByText(expected).className).toMatch(/red/);
    });
  });

  describe('Form Reset and Re-validation', () => {
    test('resets and re-validates form correctly after initial valid submission', () => {
      fillOutForm();
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      // Simulate form reset
      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: '' } });

      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: 'Jane' } });
      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: 'Doe' } });
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'invalid' } });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: 'short' } });

      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });
  });

  describe('Edge Case Handling', () => {
    test('handles edge case with extremely long inputs', () => {
      const longString = 'a'.repeat(1001);
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: longString } });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: longString } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('handles edge case with special characters in password', () => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: 'Abcdefgh1!' } });
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(/green/);
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
      expect(screen.getByText(/1 number/i).className).toMatch(/green/);
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('handles empty form fields correctly', () => {
      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: '' } });
      
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });
  });
});
  });
describe('SignUpForm - Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Email and Password Validations on Change', () => {
    test('shows email validation error with incomplete email', () => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'john.doe' } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test('removes email validation error with valid email', () => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'john.doe' } });
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: VALID_EMAIL } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeNull();
    });

    test.each([
      { password: 'abc', expected: /Minimum 8 characters/i },
      { password: 'abcdefgh', expected: /1 uppercase character/i },
      { password: 'ABCDEFGH', expected: /1 lowercase character/i },
      { password: 'Abcdefgh', expected: /1 number/i },
    ])('validates password "$password" and shows correct error', ({ password, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      expect(screen.getByText(expected).className).toMatch(/red/);
    });
  });

  describe('Form Reset and Re-validation', () => {
    test('resets and re-validates form correctly after initial valid submission', () => {
      fillOutForm();
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      // Simulate form reset
      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: '' } });

      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: 'Jane' } });
      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: 'Doe' } });
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'invalid' } });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: 'short' } });

      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });
  });

  describe('Edge Case Handling', () => {
    test('handles edge case with extremely long inputs', () => {
      const longString = 'a'.repeat(1001);
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: longString } });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: longString } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('handles edge case with special characters in password', () => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: 'Abcdefgh1!' } });
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(/green/);
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
      expect(screen.getByText(/1 number/i).className).toMatch(/green/);
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('handles empty form fields correctly', () => {
      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: '' } });
      
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });
  });
});

  describe('Form Submission', () => {
    let consoleSpy;

    beforeEach(() => {
      consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
describe('SignUpForm - Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Email and Password Validations on Change', () => {
    test('shows email validation error with incomplete email', () => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'john.doe' } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test('removes email validation error with valid email', () => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'john.doe' } });
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: VALID_EMAIL } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeNull();
    });

    test.each([
      { password: 'abc', expected: /Minimum 8 characters/i },
      { password: 'abcdefgh', expected: /1 uppercase character/i },
      { password: 'ABCDEFGH', expected: /1 lowercase character/i },
      { password: 'Abcdefgh', expected: /1 number/i },
    ])('validates password "$password" and shows correct error', ({ password, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      expect(screen.getByText(expected).className).toMatch(/red/);
    });
  });

  describe('Form Reset and Re-validation', () => {
    test('resets and re-validates form correctly after initial valid submission', () => {
      fillOutForm();
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      // Simulate form reset
      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: '' } });

      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: 'Jane' } });
      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: 'Doe' } });
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'invalid' } });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: 'short' } });

      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });
  });

  describe('Edge Case Handling', () => {
    test('handles edge case with extremely long inputs', () => {
      const longString = 'a'.repeat(1001);
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: longString } });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: longString } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('handles edge case with special characters in password', () => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: 'Abcdefgh1!' } });
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(/green/);
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
      expect(screen.getByText(/1 number/i).className).toMatch(/green/);
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('handles empty form fields correctly', () => {
      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: '' } });
      
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });
  });
});
    });
describe('SignUpForm - Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Email and Password Validations on Change', () => {
    test('shows email validation error with incomplete email', () => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'john.doe' } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test('removes email validation error with valid email', () => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'john.doe' } });
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: VALID_EMAIL } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeNull();
    });

    test.each([
      { password: 'abc', expected: /Minimum 8 characters/i },
      { password: 'abcdefgh', expected: /1 uppercase character/i },
      { password: 'ABCDEFGH', expected: /1 lowercase character/i },
      { password: 'Abcdefgh', expected: /1 number/i },
    ])('validates password "$password" and shows correct error', ({ password, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      expect(screen.getByText(expected).className).toMatch(/red/);
    });
  });

  describe('Form Reset and Re-validation', () => {
    test('resets and re-validates form correctly after initial valid submission', () => {
      fillOutForm();
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      // Simulate form reset
      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: '' } });

      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: 'Jane' } });
      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: 'Doe' } });
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'invalid' } });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: 'short' } });

      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });
  });

  describe('Edge Case Handling', () => {
    test('handles edge case with extremely long inputs', () => {
      const longString = 'a'.repeat(1001);
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: longString } });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: longString } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('handles edge case with special characters in password', () => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: 'Abcdefgh1!' } });
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(/green/);
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
      expect(screen.getByText(/1 number/i).className).toMatch(/green/);
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('handles empty form fields correctly', () => {
      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: '' } });
      
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });
  });
});

    afterEach(() => {
      consoleSpy.mockRestore();
    });
describe('SignUpForm - Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Email and Password Validations on Change', () => {
    test('shows email validation error with incomplete email', () => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'john.doe' } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test('removes email validation error with valid email', () => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'john.doe' } });
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: VALID_EMAIL } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeNull();
    });

    test.each([
      { password: 'abc', expected: /Minimum 8 characters/i },
      { password: 'abcdefgh', expected: /1 uppercase character/i },
      { password: 'ABCDEFGH', expected: /1 lowercase character/i },
      { password: 'Abcdefgh', expected: /1 number/i },
    ])('validates password "$password" and shows correct error', ({ password, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      expect(screen.getByText(expected).className).toMatch(/red/);
    });
  });

  describe('Form Reset and Re-validation', () => {
    test('resets and re-validates form correctly after initial valid submission', () => {
      fillOutForm();
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      // Simulate form reset
      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: '' } });

      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: 'Jane' } });
      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: 'Doe' } });
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'invalid' } });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: 'short' } });

      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });
  });

  describe('Edge Case Handling', () => {
    test('handles edge case with extremely long inputs', () => {
      const longString = 'a'.repeat(1001);
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: longString } });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: longString } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('handles edge case with special characters in password', () => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: 'Abcdefgh1!' } });
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(/green/);
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
      expect(screen.getByText(/1 number/i).className).toMatch(/green/);
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('handles empty form fields correctly', () => {
      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: '' } });
      
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });
  });
});

    test('enables Create Account button with valid form', () => {
      fillOutForm();
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).not.toBeDisabled();
    });
describe('SignUpForm - Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Email and Password Validations on Change', () => {
    test('shows email validation error with incomplete email', () => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'john.doe' } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test('removes email validation error with valid email', () => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'john.doe' } });
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: VALID_EMAIL } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeNull();
    });

    test.each([
      { password: 'abc', expected: /Minimum 8 characters/i },
      { password: 'abcdefgh', expected: /1 uppercase character/i },
      { password: 'ABCDEFGH', expected: /1 lowercase character/i },
      { password: 'Abcdefgh', expected: /1 number/i },
    ])('validates password "$password" and shows correct error', ({ password, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      expect(screen.getByText(expected).className).toMatch(/red/);
    });
  });

  describe('Form Reset and Re-validation', () => {
    test('resets and re-validates form correctly after initial valid submission', () => {
      fillOutForm();
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      // Simulate form reset
      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: '' } });

      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: 'Jane' } });
      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: 'Doe' } });
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'invalid' } });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: 'short' } });

      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });
  });

  describe('Edge Case Handling', () => {
    test('handles edge case with extremely long inputs', () => {
      const longString = 'a'.repeat(1001);
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: longString } });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: longString } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('handles edge case with special characters in password', () => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: 'Abcdefgh1!' } });
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(/green/);
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
      expect(screen.getByText(/1 number/i).className).toMatch(/green/);
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('handles empty form fields correctly', () => {
      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: '' } });
      
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });
  });
});

    test('disables Create Account button with invalid form', () => {
      fillOutForm({ firstName: '' });
describe('SignUpForm - Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Email and Password Validations on Change', () => {
    test('shows email validation error with incomplete email', () => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'john.doe' } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test('removes email validation error with valid email', () => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'john.doe' } });
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: VALID_EMAIL } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeNull();
    });

    test.each([
      { password: 'abc', expected: /Minimum 8 characters/i },
      { password: 'abcdefgh', expected: /1 uppercase character/i },
      { password: 'ABCDEFGH', expected: /1 lowercase character/i },
      { password: 'Abcdefgh', expected: /1 number/i },
    ])('validates password "$password" and shows correct error', ({ password, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      expect(screen.getByText(expected).className).toMatch(/red/);
    });
  });

  describe('Form Reset and Re-validation', () => {
    test('resets and re-validates form correctly after initial valid submission', () => {
      fillOutForm();
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      // Simulate form reset
      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: '' } });

      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: 'Jane' } });
      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: 'Doe' } });
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'invalid' } });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: 'short' } });

      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });
  });

  describe('Edge Case Handling', () => {
    test('handles edge case with extremely long inputs', () => {
      const longString = 'a'.repeat(1001);
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: longString } });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: longString } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('handles edge case with special characters in password', () => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: 'Abcdefgh1!' } });
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(/green/);
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
      expect(screen.getByText(/1 number/i).className).toMatch(/green/);
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('handles empty form fields correctly', () => {
      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: '' } });
      
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });
  });
}); // Explicitly set an invalid field
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });
describe('SignUpForm - Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Email and Password Validations on Change', () => {
    test('shows email validation error with incomplete email', () => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'john.doe' } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test('removes email validation error with valid email', () => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'john.doe' } });
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: VALID_EMAIL } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeNull();
    });

    test.each([
      { password: 'abc', expected: /Minimum 8 characters/i },
      { password: 'abcdefgh', expected: /1 uppercase character/i },
      { password: 'ABCDEFGH', expected: /1 lowercase character/i },
      { password: 'Abcdefgh', expected: /1 number/i },
    ])('validates password "$password" and shows correct error', ({ password, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      expect(screen.getByText(expected).className).toMatch(/red/);
    });
  });

  describe('Form Reset and Re-validation', () => {
    test('resets and re-validates form correctly after initial valid submission', () => {
      fillOutForm();
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      // Simulate form reset
      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: '' } });

      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: 'Jane' } });
      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: 'Doe' } });
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'invalid' } });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: 'short' } });

      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });
  });

  describe('Edge Case Handling', () => {
    test('handles edge case with extremely long inputs', () => {
      const longString = 'a'.repeat(1001);
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: longString } });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: longString } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('handles edge case with special characters in password', () => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: 'Abcdefgh1!' } });
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(/green/);
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
      expect(screen.getByText(/1 number/i).className).toMatch(/green/);
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('handles empty form fields correctly', () => {
      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: '' } });
      
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });
  });
});

    test('calls console log with correct data on valid form submission', () => {
      const formData = fillOutForm();
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(consoleSpy).toHaveBeenLastCalledWith('Form submitted:', formData);
    });
describe('SignUpForm - Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Email and Password Validations on Change', () => {
    test('shows email validation error with incomplete email', () => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'john.doe' } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test('removes email validation error with valid email', () => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'john.doe' } });
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: VALID_EMAIL } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeNull();
    });

    test.each([
      { password: 'abc', expected: /Minimum 8 characters/i },
      { password: 'abcdefgh', expected: /1 uppercase character/i },
      { password: 'ABCDEFGH', expected: /1 lowercase character/i },
      { password: 'Abcdefgh', expected: /1 number/i },
    ])('validates password "$password" and shows correct error', ({ password, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      expect(screen.getByText(expected).className).toMatch(/red/);
    });
  });

  describe('Form Reset and Re-validation', () => {
    test('resets and re-validates form correctly after initial valid submission', () => {
      fillOutForm();
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      // Simulate form reset
      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: '' } });

      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: 'Jane' } });
      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: 'Doe' } });
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'invalid' } });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: 'short' } });

      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });
  });

  describe('Edge Case Handling', () => {
    test('handles edge case with extremely long inputs', () => {
      const longString = 'a'.repeat(1001);
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: longString } });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: longString } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('handles edge case with special characters in password', () => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: 'Abcdefgh1!' } });
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(/green/);
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
      expect(screen.getByText(/1 number/i).className).toMatch(/green/);
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('handles empty form fields correctly', () => {
      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: '' } });
      
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });
  });
});
  });
describe('SignUpForm - Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Email and Password Validations on Change', () => {
    test('shows email validation error with incomplete email', () => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'john.doe' } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test('removes email validation error with valid email', () => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'john.doe' } });
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: VALID_EMAIL } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeNull();
    });

    test.each([
      { password: 'abc', expected: /Minimum 8 characters/i },
      { password: 'abcdefgh', expected: /1 uppercase character/i },
      { password: 'ABCDEFGH', expected: /1 lowercase character/i },
      { password: 'Abcdefgh', expected: /1 number/i },
    ])('validates password "$password" and shows correct error', ({ password, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      expect(screen.getByText(expected).className).toMatch(/red/);
    });
  });

  describe('Form Reset and Re-validation', () => {
    test('resets and re-validates form correctly after initial valid submission', () => {
      fillOutForm();
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      // Simulate form reset
      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: '' } });

      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: 'Jane' } });
      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: 'Doe' } });
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'invalid' } });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: 'short' } });

      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });
  });

  describe('Edge Case Handling', () => {
    test('handles edge case with extremely long inputs', () => {
      const longString = 'a'.repeat(1001);
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: longString } });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: longString } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('handles edge case with special characters in password', () => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: 'Abcdefgh1!' } });
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(/green/);
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
      expect(screen.getByText(/1 number/i).className).toMatch(/green/);
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('handles empty form fields correctly', () => {
      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: '' } });
      
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });
  });
});
});
describe('SignUpForm - Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Email and Password Validations on Change', () => {
    test('shows email validation error with incomplete email', () => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'john.doe' } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test('removes email validation error with valid email', () => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'john.doe' } });
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: VALID_EMAIL } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeNull();
    });

    test.each([
      { password: 'abc', expected: /Minimum 8 characters/i },
      { password: 'abcdefgh', expected: /1 uppercase character/i },
      { password: 'ABCDEFGH', expected: /1 lowercase character/i },
      { password: 'Abcdefgh', expected: /1 number/i },
    ])('validates password "$password" and shows correct error', ({ password, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      expect(screen.getByText(expected).className).toMatch(/red/);
    });
  });

  describe('Form Reset and Re-validation', () => {
    test('resets and re-validates form correctly after initial valid submission', () => {
      fillOutForm();
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      // Simulate form reset
      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: '' } });

      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: 'Jane' } });
      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: 'Doe' } });
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'invalid' } });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: 'short' } });

      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });
  });

  describe('Edge Case Handling', () => {
    test('handles edge case with extremely long inputs', () => {
      const longString = 'a'.repeat(1001);
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: longString } });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: longString } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('handles edge case with special characters in password', () => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: 'Abcdefgh1!' } });
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(/green/);
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
      expect(screen.getByText(/1 number/i).className).toMatch(/green/);
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('handles empty form fields correctly', () => {
      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: '' } });
      
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });
  });
});
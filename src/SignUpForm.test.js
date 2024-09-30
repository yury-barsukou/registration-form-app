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

describe('SignUpForm Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Password Validation Edge Cases', () => {
    test.each([
      { description: 'all lowercase', password: 'password', expected: 'red' },
      { description: 'all uppercase', password: 'PASSWORD', expected: 'red' },
      { description: 'numbers only', password: '12345678', expected: 'red' },
      { description: 'mixed without number', password: 'Password', expected: 'red' },
      { description: 'mixed without uppercase', password: 'password1', expected: 'red' },
      { description: 'mixed without lowercase', password: 'PASSWORD1', expected: 'red' },
      { description: 'valid mix', password: 'Passw0rd', expected: 'green'},
    ])('marks password as $expected for $description', ({ password, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(expected);
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(expected);
      expect(screen.getByText(/1 number/i).className).toMatch(expected);
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(expected);
    });
  });

  describe('Email Validation Edge Cases', () => {
    test.each([
      { description: 'missing @ symbol', email: 'userdomain.com', valid: false },
      { description: 'missing domain', email: 'user@', valid: false },
      { description: 'missing local part', email: '@domain.com', valid: false },
      { description: 'valid email', email: 'user@domain.com', valid: true },
    ])('validates $description email as $valid', ({ email, valid }) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      const validationMessage = screen.queryByText(/Please enter a valid email address/i);
      if (valid) {
        expect(validationMessage).toBeNull();
      } else {
        expect(validationMessage).toBeInTheDocument();
      }
    });
  });

  describe('Submit Button State', () => {
    test.each([
      { description: 'with empty email', data: { email: '' }, enabled: false },
      { description: 'with invalid email', data: { email: 'invalidemail' }, enabled: false },
      { description: 'with short password', data: { password: 'short' }, enabled: false },
      { description: 'with valid inputs', data: { firstName: 'John', lastName: 'Doe', email: VALID_EMAIL, password: VALID_PASSWORD }, enabled: true },
    ])('is $enabled when form is $description', ({ data, enabled }) => {
      fillOutForm(data);
      const button = screen.getByRole('button', { name: BUTTON_TEXT });
      if (enabled) {
        expect(button).not.toBeDisabled();
      } else {
        expect(button).toBeDisabled();
      }
    });
  });

  describe('Form Reset After Submission', () => {
    test('resets form fields after successful submission', () => {
      const formData = fillOutForm();
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      // Assuming form reset logic is implemented, these fields should be empty or reset to default state
      expect(screen.getByLabelText(LABELS.firstName)).toHaveValue('');
      expect(screen.getByLabelText(LABELS.lastName)).toHaveValue('');
      expect(screen.getByLabelText(LABELS.email)).toHaveValue('');
      expect(screen.getByLabelText(LABELS.password)).toHaveValue('');
    });
  });
});
  fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: formData.lastName } });

describe('SignUpForm Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Password Validation Edge Cases', () => {
    test.each([
      { description: 'all lowercase', password: 'password', expected: 'red' },
      { description: 'all uppercase', password: 'PASSWORD', expected: 'red' },
      { description: 'numbers only', password: '12345678', expected: 'red' },
      { description: 'mixed without number', password: 'Password', expected: 'red' },
      { description: 'mixed without uppercase', password: 'password1', expected: 'red' },
      { description: 'mixed without lowercase', password: 'PASSWORD1', expected: 'red' },
      { description: 'valid mix', password: 'Passw0rd', expected: 'green'},
    ])('marks password as $expected for $description', ({ password, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(expected);
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(expected);
      expect(screen.getByText(/1 number/i).className).toMatch(expected);
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(expected);
    });
  });

  describe('Email Validation Edge Cases', () => {
    test.each([
      { description: 'missing @ symbol', email: 'userdomain.com', valid: false },
      { description: 'missing domain', email: 'user@', valid: false },
      { description: 'missing local part', email: '@domain.com', valid: false },
      { description: 'valid email', email: 'user@domain.com', valid: true },
    ])('validates $description email as $valid', ({ email, valid }) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      const validationMessage = screen.queryByText(/Please enter a valid email address/i);
      if (valid) {
        expect(validationMessage).toBeNull();
      } else {
        expect(validationMessage).toBeInTheDocument();
      }
    });
  });

  describe('Submit Button State', () => {
    test.each([
      { description: 'with empty email', data: { email: '' }, enabled: false },
      { description: 'with invalid email', data: { email: 'invalidemail' }, enabled: false },
      { description: 'with short password', data: { password: 'short' }, enabled: false },
      { description: 'with valid inputs', data: { firstName: 'John', lastName: 'Doe', email: VALID_EMAIL, password: VALID_PASSWORD }, enabled: true },
    ])('is $enabled when form is $description', ({ data, enabled }) => {
      fillOutForm(data);
      const button = screen.getByRole('button', { name: BUTTON_TEXT });
      if (enabled) {
        expect(button).not.toBeDisabled();
      } else {
        expect(button).toBeDisabled();
      }
    });
  });

  describe('Form Reset After Submission', () => {
    test('resets form fields after successful submission', () => {
      const formData = fillOutForm();
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      // Assuming form reset logic is implemented, these fields should be empty or reset to default state
      expect(screen.getByLabelText(LABELS.firstName)).toHaveValue('');
      expect(screen.getByLabelText(LABELS.lastName)).toHaveValue('');
      expect(screen.getByLabelText(LABELS.email)).toHaveValue('');
      expect(screen.getByLabelText(LABELS.password)).toHaveValue('');
    });
  });
});
  fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: formData.email } });

describe('SignUpForm Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Password Validation Edge Cases', () => {
    test.each([
      { description: 'all lowercase', password: 'password', expected: 'red' },
      { description: 'all uppercase', password: 'PASSWORD', expected: 'red' },
      { description: 'numbers only', password: '12345678', expected: 'red' },
      { description: 'mixed without number', password: 'Password', expected: 'red' },
      { description: 'mixed without uppercase', password: 'password1', expected: 'red' },
      { description: 'mixed without lowercase', password: 'PASSWORD1', expected: 'red' },
      { description: 'valid mix', password: 'Passw0rd', expected: 'green'},
    ])('marks password as $expected for $description', ({ password, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(expected);
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(expected);
      expect(screen.getByText(/1 number/i).className).toMatch(expected);
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(expected);
    });
  });

  describe('Email Validation Edge Cases', () => {
    test.each([
      { description: 'missing @ symbol', email: 'userdomain.com', valid: false },
      { description: 'missing domain', email: 'user@', valid: false },
      { description: 'missing local part', email: '@domain.com', valid: false },
      { description: 'valid email', email: 'user@domain.com', valid: true },
    ])('validates $description email as $valid', ({ email, valid }) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      const validationMessage = screen.queryByText(/Please enter a valid email address/i);
      if (valid) {
        expect(validationMessage).toBeNull();
      } else {
        expect(validationMessage).toBeInTheDocument();
      }
    });
  });

  describe('Submit Button State', () => {
    test.each([
      { description: 'with empty email', data: { email: '' }, enabled: false },
      { description: 'with invalid email', data: { email: 'invalidemail' }, enabled: false },
      { description: 'with short password', data: { password: 'short' }, enabled: false },
      { description: 'with valid inputs', data: { firstName: 'John', lastName: 'Doe', email: VALID_EMAIL, password: VALID_PASSWORD }, enabled: true },
    ])('is $enabled when form is $description', ({ data, enabled }) => {
      fillOutForm(data);
      const button = screen.getByRole('button', { name: BUTTON_TEXT });
      if (enabled) {
        expect(button).not.toBeDisabled();
      } else {
        expect(button).toBeDisabled();
      }
    });
  });

  describe('Form Reset After Submission', () => {
    test('resets form fields after successful submission', () => {
      const formData = fillOutForm();
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      // Assuming form reset logic is implemented, these fields should be empty or reset to default state
      expect(screen.getByLabelText(LABELS.firstName)).toHaveValue('');
      expect(screen.getByLabelText(LABELS.lastName)).toHaveValue('');
      expect(screen.getByLabelText(LABELS.email)).toHaveValue('');
      expect(screen.getByLabelText(LABELS.password)).toHaveValue('');
    });
  });
});
  fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: formData.password } });

describe('SignUpForm Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Password Validation Edge Cases', () => {
    test.each([
      { description: 'all lowercase', password: 'password', expected: 'red' },
      { description: 'all uppercase', password: 'PASSWORD', expected: 'red' },
      { description: 'numbers only', password: '12345678', expected: 'red' },
      { description: 'mixed without number', password: 'Password', expected: 'red' },
      { description: 'mixed without uppercase', password: 'password1', expected: 'red' },
      { description: 'mixed without lowercase', password: 'PASSWORD1', expected: 'red' },
      { description: 'valid mix', password: 'Passw0rd', expected: 'green'},
    ])('marks password as $expected for $description', ({ password, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(expected);
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(expected);
      expect(screen.getByText(/1 number/i).className).toMatch(expected);
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(expected);
    });
  });

  describe('Email Validation Edge Cases', () => {
    test.each([
      { description: 'missing @ symbol', email: 'userdomain.com', valid: false },
      { description: 'missing domain', email: 'user@', valid: false },
      { description: 'missing local part', email: '@domain.com', valid: false },
      { description: 'valid email', email: 'user@domain.com', valid: true },
    ])('validates $description email as $valid', ({ email, valid }) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      const validationMessage = screen.queryByText(/Please enter a valid email address/i);
      if (valid) {
        expect(validationMessage).toBeNull();
      } else {
        expect(validationMessage).toBeInTheDocument();
      }
    });
  });

  describe('Submit Button State', () => {
    test.each([
      { description: 'with empty email', data: { email: '' }, enabled: false },
      { description: 'with invalid email', data: { email: 'invalidemail' }, enabled: false },
      { description: 'with short password', data: { password: 'short' }, enabled: false },
      { description: 'with valid inputs', data: { firstName: 'John', lastName: 'Doe', email: VALID_EMAIL, password: VALID_PASSWORD }, enabled: true },
    ])('is $enabled when form is $description', ({ data, enabled }) => {
      fillOutForm(data);
      const button = screen.getByRole('button', { name: BUTTON_TEXT });
      if (enabled) {
        expect(button).not.toBeDisabled();
      } else {
        expect(button).toBeDisabled();
      }
    });
  });

  describe('Form Reset After Submission', () => {
    test('resets form fields after successful submission', () => {
      const formData = fillOutForm();
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      // Assuming form reset logic is implemented, these fields should be empty or reset to default state
      expect(screen.getByLabelText(LABELS.firstName)).toHaveValue('');
      expect(screen.getByLabelText(LABELS.lastName)).toHaveValue('');
      expect(screen.getByLabelText(LABELS.email)).toHaveValue('');
      expect(screen.getByLabelText(LABELS.password)).toHaveValue('');
    });
  });
});

  return formData;
};

describe('SignUpForm', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

describe('SignUpForm Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Password Validation Edge Cases', () => {
    test.each([
      { description: 'all lowercase', password: 'password', expected: 'red' },
      { description: 'all uppercase', password: 'PASSWORD', expected: 'red' },
      { description: 'numbers only', password: '12345678', expected: 'red' },
      { description: 'mixed without number', password: 'Password', expected: 'red' },
      { description: 'mixed without uppercase', password: 'password1', expected: 'red' },
      { description: 'mixed without lowercase', password: 'PASSWORD1', expected: 'red' },
      { description: 'valid mix', password: 'Passw0rd', expected: 'green'},
    ])('marks password as $expected for $description', ({ password, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(expected);
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(expected);
      expect(screen.getByText(/1 number/i).className).toMatch(expected);
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(expected);
    });
  });

  describe('Email Validation Edge Cases', () => {
    test.each([
      { description: 'missing @ symbol', email: 'userdomain.com', valid: false },
      { description: 'missing domain', email: 'user@', valid: false },
      { description: 'missing local part', email: '@domain.com', valid: false },
      { description: 'valid email', email: 'user@domain.com', valid: true },
    ])('validates $description email as $valid', ({ email, valid }) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      const validationMessage = screen.queryByText(/Please enter a valid email address/i);
      if (valid) {
        expect(validationMessage).toBeNull();
      } else {
        expect(validationMessage).toBeInTheDocument();
      }
    });
  });

  describe('Submit Button State', () => {
    test.each([
      { description: 'with empty email', data: { email: '' }, enabled: false },
      { description: 'with invalid email', data: { email: 'invalidemail' }, enabled: false },
      { description: 'with short password', data: { password: 'short' }, enabled: false },
      { description: 'with valid inputs', data: { firstName: 'John', lastName: 'Doe', email: VALID_EMAIL, password: VALID_PASSWORD }, enabled: true },
    ])('is $enabled when form is $description', ({ data, enabled }) => {
      fillOutForm(data);
      const button = screen.getByRole('button', { name: BUTTON_TEXT });
      if (enabled) {
        expect(button).not.toBeDisabled();
      } else {
        expect(button).toBeDisabled();
      }
    });
  });

  describe('Form Reset After Submission', () => {
    test('resets form fields after successful submission', () => {
      const formData = fillOutForm();
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      // Assuming form reset logic is implemented, these fields should be empty or reset to default state
      expect(screen.getByLabelText(LABELS.firstName)).toHaveValue('');
      expect(screen.getByLabelText(LABELS.lastName)).toHaveValue('');
      expect(screen.getByLabelText(LABELS.email)).toHaveValue('');
      expect(screen.getByLabelText(LABELS.password)).toHaveValue('');
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

describe('SignUpForm Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Password Validation Edge Cases', () => {
    test.each([
      { description: 'all lowercase', password: 'password', expected: 'red' },
      { description: 'all uppercase', password: 'PASSWORD', expected: 'red' },
      { description: 'numbers only', password: '12345678', expected: 'red' },
      { description: 'mixed without number', password: 'Password', expected: 'red' },
      { description: 'mixed without uppercase', password: 'password1', expected: 'red' },
      { description: 'mixed without lowercase', password: 'PASSWORD1', expected: 'red' },
      { description: 'valid mix', password: 'Passw0rd', expected: 'green'},
    ])('marks password as $expected for $description', ({ password, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(expected);
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(expected);
      expect(screen.getByText(/1 number/i).className).toMatch(expected);
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(expected);
    });
  });

  describe('Email Validation Edge Cases', () => {
    test.each([
      { description: 'missing @ symbol', email: 'userdomain.com', valid: false },
      { description: 'missing domain', email: 'user@', valid: false },
      { description: 'missing local part', email: '@domain.com', valid: false },
      { description: 'valid email', email: 'user@domain.com', valid: true },
    ])('validates $description email as $valid', ({ email, valid }) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      const validationMessage = screen.queryByText(/Please enter a valid email address/i);
      if (valid) {
        expect(validationMessage).toBeNull();
      } else {
        expect(validationMessage).toBeInTheDocument();
      }
    });
  });

  describe('Submit Button State', () => {
    test.each([
      { description: 'with empty email', data: { email: '' }, enabled: false },
      { description: 'with invalid email', data: { email: 'invalidemail' }, enabled: false },
      { description: 'with short password', data: { password: 'short' }, enabled: false },
      { description: 'with valid inputs', data: { firstName: 'John', lastName: 'Doe', email: VALID_EMAIL, password: VALID_PASSWORD }, enabled: true },
    ])('is $enabled when form is $description', ({ data, enabled }) => {
      fillOutForm(data);
      const button = screen.getByRole('button', { name: BUTTON_TEXT });
      if (enabled) {
        expect(button).not.toBeDisabled();
      } else {
        expect(button).toBeDisabled();
      }
    });
  });

  describe('Form Reset After Submission', () => {
    test('resets form fields after successful submission', () => {
      const formData = fillOutForm();
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      // Assuming form reset logic is implemented, these fields should be empty or reset to default state
      expect(screen.getByLabelText(LABELS.firstName)).toHaveValue('');
      expect(screen.getByLabelText(LABELS.lastName)).toHaveValue('');
      expect(screen.getByLabelText(LABELS.email)).toHaveValue('');
      expect(screen.getByLabelText(LABELS.password)).toHaveValue('');
    });
  });
});

  describe('Field Entry', () => {
    test.each(Object.entries(LABELS))('allows entry of %s', (fieldName, labelRegex) => {
      const value = 'TestValue';
      fireEvent.change(screen.getByLabelText(labelRegex), { target: { value } });

describe('SignUpForm Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Password Validation Edge Cases', () => {
    test.each([
      { description: 'all lowercase', password: 'password', expected: 'red' },
      { description: 'all uppercase', password: 'PASSWORD', expected: 'red' },
      { description: 'numbers only', password: '12345678', expected: 'red' },
      { description: 'mixed without number', password: 'Password', expected: 'red' },
      { description: 'mixed without uppercase', password: 'password1', expected: 'red' },
      { description: 'mixed without lowercase', password: 'PASSWORD1', expected: 'red' },
      { description: 'valid mix', password: 'Passw0rd', expected: 'green'},
    ])('marks password as $expected for $description', ({ password, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(expected);
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(expected);
      expect(screen.getByText(/1 number/i).className).toMatch(expected);
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(expected);
    });
  });

  describe('Email Validation Edge Cases', () => {
    test.each([
      { description: 'missing @ symbol', email: 'userdomain.com', valid: false },
      { description: 'missing domain', email: 'user@', valid: false },
      { description: 'missing local part', email: '@domain.com', valid: false },
      { description: 'valid email', email: 'user@domain.com', valid: true },
    ])('validates $description email as $valid', ({ email, valid }) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      const validationMessage = screen.queryByText(/Please enter a valid email address/i);
      if (valid) {
        expect(validationMessage).toBeNull();
      } else {
        expect(validationMessage).toBeInTheDocument();
      }
    });
  });

  describe('Submit Button State', () => {
    test.each([
      { description: 'with empty email', data: { email: '' }, enabled: false },
      { description: 'with invalid email', data: { email: 'invalidemail' }, enabled: false },
      { description: 'with short password', data: { password: 'short' }, enabled: false },
      { description: 'with valid inputs', data: { firstName: 'John', lastName: 'Doe', email: VALID_EMAIL, password: VALID_PASSWORD }, enabled: true },
    ])('is $enabled when form is $description', ({ data, enabled }) => {
      fillOutForm(data);
      const button = screen.getByRole('button', { name: BUTTON_TEXT });
      if (enabled) {
        expect(button).not.toBeDisabled();
      } else {
        expect(button).toBeDisabled();
      }
    });
  });

  describe('Form Reset After Submission', () => {
    test('resets form fields after successful submission', () => {
      const formData = fillOutForm();
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      // Assuming form reset logic is implemented, these fields should be empty or reset to default state
      expect(screen.getByLabelText(LABELS.firstName)).toHaveValue('');
      expect(screen.getByLabelText(LABELS.lastName)).toHaveValue('');
      expect(screen.getByLabelText(LABELS.email)).toHaveValue('');
      expect(screen.getByLabelText(LABELS.password)).toHaveValue('');
    });
  });
});
      expect(screen.getByLabelText(labelRegex)).toHaveValue(value);
    });

describe('SignUpForm Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Password Validation Edge Cases', () => {
    test.each([
      { description: 'all lowercase', password: 'password', expected: 'red' },
      { description: 'all uppercase', password: 'PASSWORD', expected: 'red' },
      { description: 'numbers only', password: '12345678', expected: 'red' },
      { description: 'mixed without number', password: 'Password', expected: 'red' },
      { description: 'mixed without uppercase', password: 'password1', expected: 'red' },
      { description: 'mixed without lowercase', password: 'PASSWORD1', expected: 'red' },
      { description: 'valid mix', password: 'Passw0rd', expected: 'green'},
    ])('marks password as $expected for $description', ({ password, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(expected);
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(expected);
      expect(screen.getByText(/1 number/i).className).toMatch(expected);
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(expected);
    });
  });

  describe('Email Validation Edge Cases', () => {
    test.each([
      { description: 'missing @ symbol', email: 'userdomain.com', valid: false },
      { description: 'missing domain', email: 'user@', valid: false },
      { description: 'missing local part', email: '@domain.com', valid: false },
      { description: 'valid email', email: 'user@domain.com', valid: true },
    ])('validates $description email as $valid', ({ email, valid }) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      const validationMessage = screen.queryByText(/Please enter a valid email address/i);
      if (valid) {
        expect(validationMessage).toBeNull();
      } else {
        expect(validationMessage).toBeInTheDocument();
      }
    });
  });

  describe('Submit Button State', () => {
    test.each([
      { description: 'with empty email', data: { email: '' }, enabled: false },
      { description: 'with invalid email', data: { email: 'invalidemail' }, enabled: false },
      { description: 'with short password', data: { password: 'short' }, enabled: false },
      { description: 'with valid inputs', data: { firstName: 'John', lastName: 'Doe', email: VALID_EMAIL, password: VALID_PASSWORD }, enabled: true },
    ])('is $enabled when form is $description', ({ data, enabled }) => {
      fillOutForm(data);
      const button = screen.getByRole('button', { name: BUTTON_TEXT });
      if (enabled) {
        expect(button).not.toBeDisabled();
      } else {
        expect(button).toBeDisabled();
      }
    });
  });

  describe('Form Reset After Submission', () => {
    test('resets form fields after successful submission', () => {
      const formData = fillOutForm();
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      // Assuming form reset logic is implemented, these fields should be empty or reset to default state
      expect(screen.getByLabelText(LABELS.firstName)).toHaveValue('');
      expect(screen.getByLabelText(LABELS.lastName)).toHaveValue('');
      expect(screen.getByLabelText(LABELS.email)).toHaveValue('');
      expect(screen.getByLabelText(LABELS.password)).toHaveValue('');
    });
  });
});
  });

describe('SignUpForm Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Password Validation Edge Cases', () => {
    test.each([
      { description: 'all lowercase', password: 'password', expected: 'red' },
      { description: 'all uppercase', password: 'PASSWORD', expected: 'red' },
      { description: 'numbers only', password: '12345678', expected: 'red' },
      { description: 'mixed without number', password: 'Password', expected: 'red' },
      { description: 'mixed without uppercase', password: 'password1', expected: 'red' },
      { description: 'mixed without lowercase', password: 'PASSWORD1', expected: 'red' },
      { description: 'valid mix', password: 'Passw0rd', expected: 'green'},
    ])('marks password as $expected for $description', ({ password, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(expected);
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(expected);
      expect(screen.getByText(/1 number/i).className).toMatch(expected);
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(expected);
    });
  });

  describe('Email Validation Edge Cases', () => {
    test.each([
      { description: 'missing @ symbol', email: 'userdomain.com', valid: false },
      { description: 'missing domain', email: 'user@', valid: false },
      { description: 'missing local part', email: '@domain.com', valid: false },
      { description: 'valid email', email: 'user@domain.com', valid: true },
    ])('validates $description email as $valid', ({ email, valid }) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      const validationMessage = screen.queryByText(/Please enter a valid email address/i);
      if (valid) {
        expect(validationMessage).toBeNull();
      } else {
        expect(validationMessage).toBeInTheDocument();
      }
    });
  });

  describe('Submit Button State', () => {
    test.each([
      { description: 'with empty email', data: { email: '' }, enabled: false },
      { description: 'with invalid email', data: { email: 'invalidemail' }, enabled: false },
      { description: 'with short password', data: { password: 'short' }, enabled: false },
      { description: 'with valid inputs', data: { firstName: 'John', lastName: 'Doe', email: VALID_EMAIL, password: VALID_PASSWORD }, enabled: true },
    ])('is $enabled when form is $description', ({ data, enabled }) => {
      fillOutForm(data);
      const button = screen.getByRole('button', { name: BUTTON_TEXT });
      if (enabled) {
        expect(button).not.toBeDisabled();
      } else {
        expect(button).toBeDisabled();
      }
    });
  });

  describe('Form Reset After Submission', () => {
    test('resets form fields after successful submission', () => {
      const formData = fillOutForm();
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      // Assuming form reset logic is implemented, these fields should be empty or reset to default state
      expect(screen.getByLabelText(LABELS.firstName)).toHaveValue('');
      expect(screen.getByLabelText(LABELS.lastName)).toHaveValue('');
      expect(screen.getByLabelText(LABELS.email)).toHaveValue('');
      expect(screen.getByLabelText(LABELS.password)).toHaveValue('');
    });
  });
});

  describe('Form Validation', () => {
    test('validates email format correctly', () => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'invalid' } });

describe('SignUpForm Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Password Validation Edge Cases', () => {
    test.each([
      { description: 'all lowercase', password: 'password', expected: 'red' },
      { description: 'all uppercase', password: 'PASSWORD', expected: 'red' },
      { description: 'numbers only', password: '12345678', expected: 'red' },
      { description: 'mixed without number', password: 'Password', expected: 'red' },
      { description: 'mixed without uppercase', password: 'password1', expected: 'red' },
      { description: 'mixed without lowercase', password: 'PASSWORD1', expected: 'red' },
      { description: 'valid mix', password: 'Passw0rd', expected: 'green'},
    ])('marks password as $expected for $description', ({ password, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(expected);
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(expected);
      expect(screen.getByText(/1 number/i).className).toMatch(expected);
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(expected);
    });
  });

  describe('Email Validation Edge Cases', () => {
    test.each([
      { description: 'missing @ symbol', email: 'userdomain.com', valid: false },
      { description: 'missing domain', email: 'user@', valid: false },
      { description: 'missing local part', email: '@domain.com', valid: false },
      { description: 'valid email', email: 'user@domain.com', valid: true },
    ])('validates $description email as $valid', ({ email, valid }) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      const validationMessage = screen.queryByText(/Please enter a valid email address/i);
      if (valid) {
        expect(validationMessage).toBeNull();
      } else {
        expect(validationMessage).toBeInTheDocument();
      }
    });
  });

  describe('Submit Button State', () => {
    test.each([
      { description: 'with empty email', data: { email: '' }, enabled: false },
      { description: 'with invalid email', data: { email: 'invalidemail' }, enabled: false },
      { description: 'with short password', data: { password: 'short' }, enabled: false },
      { description: 'with valid inputs', data: { firstName: 'John', lastName: 'Doe', email: VALID_EMAIL, password: VALID_PASSWORD }, enabled: true },
    ])('is $enabled when form is $description', ({ data, enabled }) => {
      fillOutForm(data);
      const button = screen.getByRole('button', { name: BUTTON_TEXT });
      if (enabled) {
        expect(button).not.toBeDisabled();
      } else {
        expect(button).toBeDisabled();
      }
    });
  });

  describe('Form Reset After Submission', () => {
    test('resets form fields after successful submission', () => {
      const formData = fillOutForm();
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      // Assuming form reset logic is implemented, these fields should be empty or reset to default state
      expect(screen.getByLabelText(LABELS.firstName)).toHaveValue('');
      expect(screen.getByLabelText(LABELS.lastName)).toHaveValue('');
      expect(screen.getByLabelText(LABELS.email)).toHaveValue('');
      expect(screen.getByLabelText(LABELS.password)).toHaveValue('');
    });
  });
});
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: VALID_EMAIL } });

describe('SignUpForm Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Password Validation Edge Cases', () => {
    test.each([
      { description: 'all lowercase', password: 'password', expected: 'red' },
      { description: 'all uppercase', password: 'PASSWORD', expected: 'red' },
      { description: 'numbers only', password: '12345678', expected: 'red' },
      { description: 'mixed without number', password: 'Password', expected: 'red' },
      { description: 'mixed without uppercase', password: 'password1', expected: 'red' },
      { description: 'mixed without lowercase', password: 'PASSWORD1', expected: 'red' },
      { description: 'valid mix', password: 'Passw0rd', expected: 'green'},
    ])('marks password as $expected for $description', ({ password, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(expected);
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(expected);
      expect(screen.getByText(/1 number/i).className).toMatch(expected);
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(expected);
    });
  });

  describe('Email Validation Edge Cases', () => {
    test.each([
      { description: 'missing @ symbol', email: 'userdomain.com', valid: false },
      { description: 'missing domain', email: 'user@', valid: false },
      { description: 'missing local part', email: '@domain.com', valid: false },
      { description: 'valid email', email: 'user@domain.com', valid: true },
    ])('validates $description email as $valid', ({ email, valid }) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      const validationMessage = screen.queryByText(/Please enter a valid email address/i);
      if (valid) {
        expect(validationMessage).toBeNull();
      } else {
        expect(validationMessage).toBeInTheDocument();
      }
    });
  });

  describe('Submit Button State', () => {
    test.each([
      { description: 'with empty email', data: { email: '' }, enabled: false },
      { description: 'with invalid email', data: { email: 'invalidemail' }, enabled: false },
      { description: 'with short password', data: { password: 'short' }, enabled: false },
      { description: 'with valid inputs', data: { firstName: 'John', lastName: 'Doe', email: VALID_EMAIL, password: VALID_PASSWORD }, enabled: true },
    ])('is $enabled when form is $description', ({ data, enabled }) => {
      fillOutForm(data);
      const button = screen.getByRole('button', { name: BUTTON_TEXT });
      if (enabled) {
        expect(button).not.toBeDisabled();
      } else {
        expect(button).toBeDisabled();
      }
    });
  });

  describe('Form Reset After Submission', () => {
    test('resets form fields after successful submission', () => {
      const formData = fillOutForm();
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      // Assuming form reset logic is implemented, these fields should be empty or reset to default state
      expect(screen.getByLabelText(LABELS.firstName)).toHaveValue('');
      expect(screen.getByLabelText(LABELS.lastName)).toHaveValue('');
      expect(screen.getByLabelText(LABELS.email)).toHaveValue('');
      expect(screen.getByLabelText(LABELS.password)).toHaveValue('');
    });
  });
});
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeNull();
    });

describe('SignUpForm Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Password Validation Edge Cases', () => {
    test.each([
      { description: 'all lowercase', password: 'password', expected: 'red' },
      { description: 'all uppercase', password: 'PASSWORD', expected: 'red' },
      { description: 'numbers only', password: '12345678', expected: 'red' },
      { description: 'mixed without number', password: 'Password', expected: 'red' },
      { description: 'mixed without uppercase', password: 'password1', expected: 'red' },
      { description: 'mixed without lowercase', password: 'PASSWORD1', expected: 'red' },
      { description: 'valid mix', password: 'Passw0rd', expected: 'green'},
    ])('marks password as $expected for $description', ({ password, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(expected);
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(expected);
      expect(screen.getByText(/1 number/i).className).toMatch(expected);
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(expected);
    });
  });

  describe('Email Validation Edge Cases', () => {
    test.each([
      { description: 'missing @ symbol', email: 'userdomain.com', valid: false },
      { description: 'missing domain', email: 'user@', valid: false },
      { description: 'missing local part', email: '@domain.com', valid: false },
      { description: 'valid email', email: 'user@domain.com', valid: true },
    ])('validates $description email as $valid', ({ email, valid }) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      const validationMessage = screen.queryByText(/Please enter a valid email address/i);
      if (valid) {
        expect(validationMessage).toBeNull();
      } else {
        expect(validationMessage).toBeInTheDocument();
      }
    });
  });

  describe('Submit Button State', () => {
    test.each([
      { description: 'with empty email', data: { email: '' }, enabled: false },
      { description: 'with invalid email', data: { email: 'invalidemail' }, enabled: false },
      { description: 'with short password', data: { password: 'short' }, enabled: false },
      { description: 'with valid inputs', data: { firstName: 'John', lastName: 'Doe', email: VALID_EMAIL, password: VALID_PASSWORD }, enabled: true },
    ])('is $enabled when form is $description', ({ data, enabled }) => {
      fillOutForm(data);
      const button = screen.getByRole('button', { name: BUTTON_TEXT });
      if (enabled) {
        expect(button).not.toBeDisabled();
      } else {
        expect(button).toBeDisabled();
      }
    });
  });

  describe('Form Reset After Submission', () => {
    test('resets form fields after successful submission', () => {
      const formData = fillOutForm();
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      // Assuming form reset logic is implemented, these fields should be empty or reset to default state
      expect(screen.getByLabelText(LABELS.firstName)).toHaveValue('');
      expect(screen.getByLabelText(LABELS.lastName)).toHaveValue('');
      expect(screen.getByLabelText(LABELS.email)).toHaveValue('');
      expect(screen.getByLabelText(LABELS.password)).toHaveValue('');
    });
  });
});

    test('validates password criteria correctly', () => {
      const password = screen.getByLabelText(LABELS.password);
      fireEvent.change(password, { target: { value: 'short' } });

describe('SignUpForm Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Password Validation Edge Cases', () => {
    test.each([
      { description: 'all lowercase', password: 'password', expected: 'red' },
      { description: 'all uppercase', password: 'PASSWORD', expected: 'red' },
      { description: 'numbers only', password: '12345678', expected: 'red' },
      { description: 'mixed without number', password: 'Password', expected: 'red' },
      { description: 'mixed without uppercase', password: 'password1', expected: 'red' },
      { description: 'mixed without lowercase', password: 'PASSWORD1', expected: 'red' },
      { description: 'valid mix', password: 'Passw0rd', expected: 'green'},
    ])('marks password as $expected for $description', ({ password, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(expected);
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(expected);
      expect(screen.getByText(/1 number/i).className).toMatch(expected);
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(expected);
    });
  });

  describe('Email Validation Edge Cases', () => {
    test.each([
      { description: 'missing @ symbol', email: 'userdomain.com', valid: false },
      { description: 'missing domain', email: 'user@', valid: false },
      { description: 'missing local part', email: '@domain.com', valid: false },
      { description: 'valid email', email: 'user@domain.com', valid: true },
    ])('validates $description email as $valid', ({ email, valid }) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      const validationMessage = screen.queryByText(/Please enter a valid email address/i);
      if (valid) {
        expect(validationMessage).toBeNull();
      } else {
        expect(validationMessage).toBeInTheDocument();
      }
    });
  });

  describe('Submit Button State', () => {
    test.each([
      { description: 'with empty email', data: { email: '' }, enabled: false },
      { description: 'with invalid email', data: { email: 'invalidemail' }, enabled: false },
      { description: 'with short password', data: { password: 'short' }, enabled: false },
      { description: 'with valid inputs', data: { firstName: 'John', lastName: 'Doe', email: VALID_EMAIL, password: VALID_PASSWORD }, enabled: true },
    ])('is $enabled when form is $description', ({ data, enabled }) => {
      fillOutForm(data);
      const button = screen.getByRole('button', { name: BUTTON_TEXT });
      if (enabled) {
        expect(button).not.toBeDisabled();
      } else {
        expect(button).toBeDisabled();
      }
    });
  });

  describe('Form Reset After Submission', () => {
    test('resets form fields after successful submission', () => {
      const formData = fillOutForm();
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      // Assuming form reset logic is implemented, these fields should be empty or reset to default state
      expect(screen.getByLabelText(LABELS.firstName)).toHaveValue('');
      expect(screen.getByLabelText(LABELS.lastName)).toHaveValue('');
      expect(screen.getByLabelText(LABELS.email)).toHaveValue('');
      expect(screen.getByLabelText(LABELS.password)).toHaveValue('');
    });
  });
});
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
      fireEvent.change(password, { target: { value: 'LongEnough1' } });

describe('SignUpForm Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Password Validation Edge Cases', () => {
    test.each([
      { description: 'all lowercase', password: 'password', expected: 'red' },
      { description: 'all uppercase', password: 'PASSWORD', expected: 'red' },
      { description: 'numbers only', password: '12345678', expected: 'red' },
      { description: 'mixed without number', password: 'Password', expected: 'red' },
      { description: 'mixed without uppercase', password: 'password1', expected: 'red' },
      { description: 'mixed without lowercase', password: 'PASSWORD1', expected: 'red' },
      { description: 'valid mix', password: 'Passw0rd', expected: 'green'},
    ])('marks password as $expected for $description', ({ password, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(expected);
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(expected);
      expect(screen.getByText(/1 number/i).className).toMatch(expected);
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(expected);
    });
  });

  describe('Email Validation Edge Cases', () => {
    test.each([
      { description: 'missing @ symbol', email: 'userdomain.com', valid: false },
      { description: 'missing domain', email: 'user@', valid: false },
      { description: 'missing local part', email: '@domain.com', valid: false },
      { description: 'valid email', email: 'user@domain.com', valid: true },
    ])('validates $description email as $valid', ({ email, valid }) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      const validationMessage = screen.queryByText(/Please enter a valid email address/i);
      if (valid) {
        expect(validationMessage).toBeNull();
      } else {
        expect(validationMessage).toBeInTheDocument();
      }
    });
  });

  describe('Submit Button State', () => {
    test.each([
      { description: 'with empty email', data: { email: '' }, enabled: false },
      { description: 'with invalid email', data: { email: 'invalidemail' }, enabled: false },
      { description: 'with short password', data: { password: 'short' }, enabled: false },
      { description: 'with valid inputs', data: { firstName: 'John', lastName: 'Doe', email: VALID_EMAIL, password: VALID_PASSWORD }, enabled: true },
    ])('is $enabled when form is $description', ({ data, enabled }) => {
      fillOutForm(data);
      const button = screen.getByRole('button', { name: BUTTON_TEXT });
      if (enabled) {
        expect(button).not.toBeDisabled();
      } else {
        expect(button).toBeDisabled();
      }
    });
  });

  describe('Form Reset After Submission', () => {
    test('resets form fields after successful submission', () => {
      const formData = fillOutForm();
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      // Assuming form reset logic is implemented, these fields should be empty or reset to default state
      expect(screen.getByLabelText(LABELS.firstName)).toHaveValue('');
      expect(screen.getByLabelText(LABELS.lastName)).toHaveValue('');
      expect(screen.getByLabelText(LABELS.email)).toHaveValue('');
      expect(screen.getByLabelText(LABELS.password)).toHaveValue('');
    });
  });
});
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(/green/);
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
      expect(screen.getByText(/1 number/i).className).toMatch(/green/);
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

describe('SignUpForm Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Password Validation Edge Cases', () => {
    test.each([
      { description: 'all lowercase', password: 'password', expected: 'red' },
      { description: 'all uppercase', password: 'PASSWORD', expected: 'red' },
      { description: 'numbers only', password: '12345678', expected: 'red' },
      { description: 'mixed without number', password: 'Password', expected: 'red' },
      { description: 'mixed without uppercase', password: 'password1', expected: 'red' },
      { description: 'mixed without lowercase', password: 'PASSWORD1', expected: 'red' },
      { description: 'valid mix', password: 'Passw0rd', expected: 'green'},
    ])('marks password as $expected for $description', ({ password, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(expected);
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(expected);
      expect(screen.getByText(/1 number/i).className).toMatch(expected);
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(expected);
    });
  });

  describe('Email Validation Edge Cases', () => {
    test.each([
      { description: 'missing @ symbol', email: 'userdomain.com', valid: false },
      { description: 'missing domain', email: 'user@', valid: false },
      { description: 'missing local part', email: '@domain.com', valid: false },
      { description: 'valid email', email: 'user@domain.com', valid: true },
    ])('validates $description email as $valid', ({ email, valid }) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      const validationMessage = screen.queryByText(/Please enter a valid email address/i);
      if (valid) {
        expect(validationMessage).toBeNull();
      } else {
        expect(validationMessage).toBeInTheDocument();
      }
    });
  });

  describe('Submit Button State', () => {
    test.each([
      { description: 'with empty email', data: { email: '' }, enabled: false },
      { description: 'with invalid email', data: { email: 'invalidemail' }, enabled: false },
      { description: 'with short password', data: { password: 'short' }, enabled: false },
      { description: 'with valid inputs', data: { firstName: 'John', lastName: 'Doe', email: VALID_EMAIL, password: VALID_PASSWORD }, enabled: true },
    ])('is $enabled when form is $description', ({ data, enabled }) => {
      fillOutForm(data);
      const button = screen.getByRole('button', { name: BUTTON_TEXT });
      if (enabled) {
        expect(button).not.toBeDisabled();
      } else {
        expect(button).toBeDisabled();
      }
    });
  });

  describe('Form Reset After Submission', () => {
    test('resets form fields after successful submission', () => {
      const formData = fillOutForm();
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      // Assuming form reset logic is implemented, these fields should be empty or reset to default state
      expect(screen.getByLabelText(LABELS.firstName)).toHaveValue('');
      expect(screen.getByLabelText(LABELS.lastName)).toHaveValue('');
      expect(screen.getByLabelText(LABELS.email)).toHaveValue('');
      expect(screen.getByLabelText(LABELS.password)).toHaveValue('');
    });
  });
});
  });

describe('SignUpForm Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Password Validation Edge Cases', () => {
    test.each([
      { description: 'all lowercase', password: 'password', expected: 'red' },
      { description: 'all uppercase', password: 'PASSWORD', expected: 'red' },
      { description: 'numbers only', password: '12345678', expected: 'red' },
      { description: 'mixed without number', password: 'Password', expected: 'red' },
      { description: 'mixed without uppercase', password: 'password1', expected: 'red' },
      { description: 'mixed without lowercase', password: 'PASSWORD1', expected: 'red' },
      { description: 'valid mix', password: 'Passw0rd', expected: 'green'},
    ])('marks password as $expected for $description', ({ password, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(expected);
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(expected);
      expect(screen.getByText(/1 number/i).className).toMatch(expected);
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(expected);
    });
  });

  describe('Email Validation Edge Cases', () => {
    test.each([
      { description: 'missing @ symbol', email: 'userdomain.com', valid: false },
      { description: 'missing domain', email: 'user@', valid: false },
      { description: 'missing local part', email: '@domain.com', valid: false },
      { description: 'valid email', email: 'user@domain.com', valid: true },
    ])('validates $description email as $valid', ({ email, valid }) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      const validationMessage = screen.queryByText(/Please enter a valid email address/i);
      if (valid) {
        expect(validationMessage).toBeNull();
      } else {
        expect(validationMessage).toBeInTheDocument();
      }
    });
  });

  describe('Submit Button State', () => {
    test.each([
      { description: 'with empty email', data: { email: '' }, enabled: false },
      { description: 'with invalid email', data: { email: 'invalidemail' }, enabled: false },
      { description: 'with short password', data: { password: 'short' }, enabled: false },
      { description: 'with valid inputs', data: { firstName: 'John', lastName: 'Doe', email: VALID_EMAIL, password: VALID_PASSWORD }, enabled: true },
    ])('is $enabled when form is $description', ({ data, enabled }) => {
      fillOutForm(data);
      const button = screen.getByRole('button', { name: BUTTON_TEXT });
      if (enabled) {
        expect(button).not.toBeDisabled();
      } else {
        expect(button).toBeDisabled();
      }
    });
  });

  describe('Form Reset After Submission', () => {
    test('resets form fields after successful submission', () => {
      const formData = fillOutForm();
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      // Assuming form reset logic is implemented, these fields should be empty or reset to default state
      expect(screen.getByLabelText(LABELS.firstName)).toHaveValue('');
      expect(screen.getByLabelText(LABELS.lastName)).toHaveValue('');
      expect(screen.getByLabelText(LABELS.email)).toHaveValue('');
      expect(screen.getByLabelText(LABELS.password)).toHaveValue('');
    });
  });
});

  describe('Form Submission', () => {
    let consoleSpy;

    beforeEach(() => {
      consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

describe('SignUpForm Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Password Validation Edge Cases', () => {
    test.each([
      { description: 'all lowercase', password: 'password', expected: 'red' },
      { description: 'all uppercase', password: 'PASSWORD', expected: 'red' },
      { description: 'numbers only', password: '12345678', expected: 'red' },
      { description: 'mixed without number', password: 'Password', expected: 'red' },
      { description: 'mixed without uppercase', password: 'password1', expected: 'red' },
      { description: 'mixed without lowercase', password: 'PASSWORD1', expected: 'red' },
      { description: 'valid mix', password: 'Passw0rd', expected: 'green'},
    ])('marks password as $expected for $description', ({ password, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(expected);
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(expected);
      expect(screen.getByText(/1 number/i).className).toMatch(expected);
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(expected);
    });
  });

  describe('Email Validation Edge Cases', () => {
    test.each([
      { description: 'missing @ symbol', email: 'userdomain.com', valid: false },
      { description: 'missing domain', email: 'user@', valid: false },
      { description: 'missing local part', email: '@domain.com', valid: false },
      { description: 'valid email', email: 'user@domain.com', valid: true },
    ])('validates $description email as $valid', ({ email, valid }) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      const validationMessage = screen.queryByText(/Please enter a valid email address/i);
      if (valid) {
        expect(validationMessage).toBeNull();
      } else {
        expect(validationMessage).toBeInTheDocument();
      }
    });
  });

  describe('Submit Button State', () => {
    test.each([
      { description: 'with empty email', data: { email: '' }, enabled: false },
      { description: 'with invalid email', data: { email: 'invalidemail' }, enabled: false },
      { description: 'with short password', data: { password: 'short' }, enabled: false },
      { description: 'with valid inputs', data: { firstName: 'John', lastName: 'Doe', email: VALID_EMAIL, password: VALID_PASSWORD }, enabled: true },
    ])('is $enabled when form is $description', ({ data, enabled }) => {
      fillOutForm(data);
      const button = screen.getByRole('button', { name: BUTTON_TEXT });
      if (enabled) {
        expect(button).not.toBeDisabled();
      } else {
        expect(button).toBeDisabled();
      }
    });
  });

  describe('Form Reset After Submission', () => {
    test('resets form fields after successful submission', () => {
      const formData = fillOutForm();
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      // Assuming form reset logic is implemented, these fields should be empty or reset to default state
      expect(screen.getByLabelText(LABELS.firstName)).toHaveValue('');
      expect(screen.getByLabelText(LABELS.lastName)).toHaveValue('');
      expect(screen.getByLabelText(LABELS.email)).toHaveValue('');
      expect(screen.getByLabelText(LABELS.password)).toHaveValue('');
    });
  });
});
    });

describe('SignUpForm Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Password Validation Edge Cases', () => {
    test.each([
      { description: 'all lowercase', password: 'password', expected: 'red' },
      { description: 'all uppercase', password: 'PASSWORD', expected: 'red' },
      { description: 'numbers only', password: '12345678', expected: 'red' },
      { description: 'mixed without number', password: 'Password', expected: 'red' },
      { description: 'mixed without uppercase', password: 'password1', expected: 'red' },
      { description: 'mixed without lowercase', password: 'PASSWORD1', expected: 'red' },
      { description: 'valid mix', password: 'Passw0rd', expected: 'green'},
    ])('marks password as $expected for $description', ({ password, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(expected);
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(expected);
      expect(screen.getByText(/1 number/i).className).toMatch(expected);
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(expected);
    });
  });

  describe('Email Validation Edge Cases', () => {
    test.each([
      { description: 'missing @ symbol', email: 'userdomain.com', valid: false },
      { description: 'missing domain', email: 'user@', valid: false },
      { description: 'missing local part', email: '@domain.com', valid: false },
      { description: 'valid email', email: 'user@domain.com', valid: true },
    ])('validates $description email as $valid', ({ email, valid }) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      const validationMessage = screen.queryByText(/Please enter a valid email address/i);
      if (valid) {
        expect(validationMessage).toBeNull();
      } else {
        expect(validationMessage).toBeInTheDocument();
      }
    });
  });

  describe('Submit Button State', () => {
    test.each([
      { description: 'with empty email', data: { email: '' }, enabled: false },
      { description: 'with invalid email', data: { email: 'invalidemail' }, enabled: false },
      { description: 'with short password', data: { password: 'short' }, enabled: false },
      { description: 'with valid inputs', data: { firstName: 'John', lastName: 'Doe', email: VALID_EMAIL, password: VALID_PASSWORD }, enabled: true },
    ])('is $enabled when form is $description', ({ data, enabled }) => {
      fillOutForm(data);
      const button = screen.getByRole('button', { name: BUTTON_TEXT });
      if (enabled) {
        expect(button).not.toBeDisabled();
      } else {
        expect(button).toBeDisabled();
      }
    });
  });

  describe('Form Reset After Submission', () => {
    test('resets form fields after successful submission', () => {
      const formData = fillOutForm();
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      // Assuming form reset logic is implemented, these fields should be empty or reset to default state
      expect(screen.getByLabelText(LABELS.firstName)).toHaveValue('');
      expect(screen.getByLabelText(LABELS.lastName)).toHaveValue('');
      expect(screen.getByLabelText(LABELS.email)).toHaveValue('');
      expect(screen.getByLabelText(LABELS.password)).toHaveValue('');
    });
  });
});

    afterEach(() => {
      consoleSpy.mockRestore();
    });

describe('SignUpForm Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Password Validation Edge Cases', () => {
    test.each([
      { description: 'all lowercase', password: 'password', expected: 'red' },
      { description: 'all uppercase', password: 'PASSWORD', expected: 'red' },
      { description: 'numbers only', password: '12345678', expected: 'red' },
      { description: 'mixed without number', password: 'Password', expected: 'red' },
      { description: 'mixed without uppercase', password: 'password1', expected: 'red' },
      { description: 'mixed without lowercase', password: 'PASSWORD1', expected: 'red' },
      { description: 'valid mix', password: 'Passw0rd', expected: 'green'},
    ])('marks password as $expected for $description', ({ password, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(expected);
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(expected);
      expect(screen.getByText(/1 number/i).className).toMatch(expected);
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(expected);
    });
  });

  describe('Email Validation Edge Cases', () => {
    test.each([
      { description: 'missing @ symbol', email: 'userdomain.com', valid: false },
      { description: 'missing domain', email: 'user@', valid: false },
      { description: 'missing local part', email: '@domain.com', valid: false },
      { description: 'valid email', email: 'user@domain.com', valid: true },
    ])('validates $description email as $valid', ({ email, valid }) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      const validationMessage = screen.queryByText(/Please enter a valid email address/i);
      if (valid) {
        expect(validationMessage).toBeNull();
      } else {
        expect(validationMessage).toBeInTheDocument();
      }
    });
  });

  describe('Submit Button State', () => {
    test.each([
      { description: 'with empty email', data: { email: '' }, enabled: false },
      { description: 'with invalid email', data: { email: 'invalidemail' }, enabled: false },
      { description: 'with short password', data: { password: 'short' }, enabled: false },
      { description: 'with valid inputs', data: { firstName: 'John', lastName: 'Doe', email: VALID_EMAIL, password: VALID_PASSWORD }, enabled: true },
    ])('is $enabled when form is $description', ({ data, enabled }) => {
      fillOutForm(data);
      const button = screen.getByRole('button', { name: BUTTON_TEXT });
      if (enabled) {
        expect(button).not.toBeDisabled();
      } else {
        expect(button).toBeDisabled();
      }
    });
  });

  describe('Form Reset After Submission', () => {
    test('resets form fields after successful submission', () => {
      const formData = fillOutForm();
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      // Assuming form reset logic is implemented, these fields should be empty or reset to default state
      expect(screen.getByLabelText(LABELS.firstName)).toHaveValue('');
      expect(screen.getByLabelText(LABELS.lastName)).toHaveValue('');
      expect(screen.getByLabelText(LABELS.email)).toHaveValue('');
      expect(screen.getByLabelText(LABELS.password)).toHaveValue('');
    });
  });
});

    test('enables Create Account button with valid form', () => {
      fillOutForm();
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).not.toBeDisabled();
    });

describe('SignUpForm Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Password Validation Edge Cases', () => {
    test.each([
      { description: 'all lowercase', password: 'password', expected: 'red' },
      { description: 'all uppercase', password: 'PASSWORD', expected: 'red' },
      { description: 'numbers only', password: '12345678', expected: 'red' },
      { description: 'mixed without number', password: 'Password', expected: 'red' },
      { description: 'mixed without uppercase', password: 'password1', expected: 'red' },
      { description: 'mixed without lowercase', password: 'PASSWORD1', expected: 'red' },
      { description: 'valid mix', password: 'Passw0rd', expected: 'green'},
    ])('marks password as $expected for $description', ({ password, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(expected);
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(expected);
      expect(screen.getByText(/1 number/i).className).toMatch(expected);
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(expected);
    });
  });

  describe('Email Validation Edge Cases', () => {
    test.each([
      { description: 'missing @ symbol', email: 'userdomain.com', valid: false },
      { description: 'missing domain', email: 'user@', valid: false },
      { description: 'missing local part', email: '@domain.com', valid: false },
      { description: 'valid email', email: 'user@domain.com', valid: true },
    ])('validates $description email as $valid', ({ email, valid }) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      const validationMessage = screen.queryByText(/Please enter a valid email address/i);
      if (valid) {
        expect(validationMessage).toBeNull();
      } else {
        expect(validationMessage).toBeInTheDocument();
      }
    });
  });

  describe('Submit Button State', () => {
    test.each([
      { description: 'with empty email', data: { email: '' }, enabled: false },
      { description: 'with invalid email', data: { email: 'invalidemail' }, enabled: false },
      { description: 'with short password', data: { password: 'short' }, enabled: false },
      { description: 'with valid inputs', data: { firstName: 'John', lastName: 'Doe', email: VALID_EMAIL, password: VALID_PASSWORD }, enabled: true },
    ])('is $enabled when form is $description', ({ data, enabled }) => {
      fillOutForm(data);
      const button = screen.getByRole('button', { name: BUTTON_TEXT });
      if (enabled) {
        expect(button).not.toBeDisabled();
      } else {
        expect(button).toBeDisabled();
      }
    });
  });

  describe('Form Reset After Submission', () => {
    test('resets form fields after successful submission', () => {
      const formData = fillOutForm();
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      // Assuming form reset logic is implemented, these fields should be empty or reset to default state
      expect(screen.getByLabelText(LABELS.firstName)).toHaveValue('');
      expect(screen.getByLabelText(LABELS.lastName)).toHaveValue('');
      expect(screen.getByLabelText(LABELS.email)).toHaveValue('');
      expect(screen.getByLabelText(LABELS.password)).toHaveValue('');
    });
  });
});

    test('disables Create Account button with invalid form', () => {
      fillOutForm({ firstName: '' });

describe('SignUpForm Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Password Validation Edge Cases', () => {
    test.each([
      { description: 'all lowercase', password: 'password', expected: 'red' },
      { description: 'all uppercase', password: 'PASSWORD', expected: 'red' },
      { description: 'numbers only', password: '12345678', expected: 'red' },
      { description: 'mixed without number', password: 'Password', expected: 'red' },
      { description: 'mixed without uppercase', password: 'password1', expected: 'red' },
      { description: 'mixed without lowercase', password: 'PASSWORD1', expected: 'red' },
      { description: 'valid mix', password: 'Passw0rd', expected: 'green'},
    ])('marks password as $expected for $description', ({ password, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(expected);
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(expected);
      expect(screen.getByText(/1 number/i).className).toMatch(expected);
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(expected);
    });
  });

  describe('Email Validation Edge Cases', () => {
    test.each([
      { description: 'missing @ symbol', email: 'userdomain.com', valid: false },
      { description: 'missing domain', email: 'user@', valid: false },
      { description: 'missing local part', email: '@domain.com', valid: false },
      { description: 'valid email', email: 'user@domain.com', valid: true },
    ])('validates $description email as $valid', ({ email, valid }) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      const validationMessage = screen.queryByText(/Please enter a valid email address/i);
      if (valid) {
        expect(validationMessage).toBeNull();
      } else {
        expect(validationMessage).toBeInTheDocument();
      }
    });
  });

  describe('Submit Button State', () => {
    test.each([
      { description: 'with empty email', data: { email: '' }, enabled: false },
      { description: 'with invalid email', data: { email: 'invalidemail' }, enabled: false },
      { description: 'with short password', data: { password: 'short' }, enabled: false },
      { description: 'with valid inputs', data: { firstName: 'John', lastName: 'Doe', email: VALID_EMAIL, password: VALID_PASSWORD }, enabled: true },
    ])('is $enabled when form is $description', ({ data, enabled }) => {
      fillOutForm(data);
      const button = screen.getByRole('button', { name: BUTTON_TEXT });
      if (enabled) {
        expect(button).not.toBeDisabled();
      } else {
        expect(button).toBeDisabled();
      }
    });
  });

  describe('Form Reset After Submission', () => {
    test('resets form fields after successful submission', () => {
      const formData = fillOutForm();
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      // Assuming form reset logic is implemented, these fields should be empty or reset to default state
      expect(screen.getByLabelText(LABELS.firstName)).toHaveValue('');
      expect(screen.getByLabelText(LABELS.lastName)).toHaveValue('');
      expect(screen.getByLabelText(LABELS.email)).toHaveValue('');
      expect(screen.getByLabelText(LABELS.password)).toHaveValue('');
    });
  });
}); // Explicitly set an invalid field
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

describe('SignUpForm Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Password Validation Edge Cases', () => {
    test.each([
      { description: 'all lowercase', password: 'password', expected: 'red' },
      { description: 'all uppercase', password: 'PASSWORD', expected: 'red' },
      { description: 'numbers only', password: '12345678', expected: 'red' },
      { description: 'mixed without number', password: 'Password', expected: 'red' },
      { description: 'mixed without uppercase', password: 'password1', expected: 'red' },
      { description: 'mixed without lowercase', password: 'PASSWORD1', expected: 'red' },
      { description: 'valid mix', password: 'Passw0rd', expected: 'green'},
    ])('marks password as $expected for $description', ({ password, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(expected);
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(expected);
      expect(screen.getByText(/1 number/i).className).toMatch(expected);
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(expected);
    });
  });

  describe('Email Validation Edge Cases', () => {
    test.each([
      { description: 'missing @ symbol', email: 'userdomain.com', valid: false },
      { description: 'missing domain', email: 'user@', valid: false },
      { description: 'missing local part', email: '@domain.com', valid: false },
      { description: 'valid email', email: 'user@domain.com', valid: true },
    ])('validates $description email as $valid', ({ email, valid }) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      const validationMessage = screen.queryByText(/Please enter a valid email address/i);
      if (valid) {
        expect(validationMessage).toBeNull();
      } else {
        expect(validationMessage).toBeInTheDocument();
      }
    });
  });

  describe('Submit Button State', () => {
    test.each([
      { description: 'with empty email', data: { email: '' }, enabled: false },
      { description: 'with invalid email', data: { email: 'invalidemail' }, enabled: false },
      { description: 'with short password', data: { password: 'short' }, enabled: false },
      { description: 'with valid inputs', data: { firstName: 'John', lastName: 'Doe', email: VALID_EMAIL, password: VALID_PASSWORD }, enabled: true },
    ])('is $enabled when form is $description', ({ data, enabled }) => {
      fillOutForm(data);
      const button = screen.getByRole('button', { name: BUTTON_TEXT });
      if (enabled) {
        expect(button).not.toBeDisabled();
      } else {
        expect(button).toBeDisabled();
      }
    });
  });

  describe('Form Reset After Submission', () => {
    test('resets form fields after successful submission', () => {
      const formData = fillOutForm();
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      // Assuming form reset logic is implemented, these fields should be empty or reset to default state
      expect(screen.getByLabelText(LABELS.firstName)).toHaveValue('');
      expect(screen.getByLabelText(LABELS.lastName)).toHaveValue('');
      expect(screen.getByLabelText(LABELS.email)).toHaveValue('');
      expect(screen.getByLabelText(LABELS.password)).toHaveValue('');
    });
  });
});

    test('calls console log with correct data on valid form submission', () => {
      const formData = fillOutForm();
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(consoleSpy).toHaveBeenLastCalledWith('Form submitted:', formData);
    });

describe('SignUpForm Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Password Validation Edge Cases', () => {
    test.each([
      { description: 'all lowercase', password: 'password', expected: 'red' },
      { description: 'all uppercase', password: 'PASSWORD', expected: 'red' },
      { description: 'numbers only', password: '12345678', expected: 'red' },
      { description: 'mixed without number', password: 'Password', expected: 'red' },
      { description: 'mixed without uppercase', password: 'password1', expected: 'red' },
      { description: 'mixed without lowercase', password: 'PASSWORD1', expected: 'red' },
      { description: 'valid mix', password: 'Passw0rd', expected: 'green'},
    ])('marks password as $expected for $description', ({ password, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(expected);
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(expected);
      expect(screen.getByText(/1 number/i).className).toMatch(expected);
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(expected);
    });
  });

  describe('Email Validation Edge Cases', () => {
    test.each([
      { description: 'missing @ symbol', email: 'userdomain.com', valid: false },
      { description: 'missing domain', email: 'user@', valid: false },
      { description: 'missing local part', email: '@domain.com', valid: false },
      { description: 'valid email', email: 'user@domain.com', valid: true },
    ])('validates $description email as $valid', ({ email, valid }) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      const validationMessage = screen.queryByText(/Please enter a valid email address/i);
      if (valid) {
        expect(validationMessage).toBeNull();
      } else {
        expect(validationMessage).toBeInTheDocument();
      }
    });
  });

  describe('Submit Button State', () => {
    test.each([
      { description: 'with empty email', data: { email: '' }, enabled: false },
      { description: 'with invalid email', data: { email: 'invalidemail' }, enabled: false },
      { description: 'with short password', data: { password: 'short' }, enabled: false },
      { description: 'with valid inputs', data: { firstName: 'John', lastName: 'Doe', email: VALID_EMAIL, password: VALID_PASSWORD }, enabled: true },
    ])('is $enabled when form is $description', ({ data, enabled }) => {
      fillOutForm(data);
      const button = screen.getByRole('button', { name: BUTTON_TEXT });
      if (enabled) {
        expect(button).not.toBeDisabled();
      } else {
        expect(button).toBeDisabled();
      }
    });
  });

  describe('Form Reset After Submission', () => {
    test('resets form fields after successful submission', () => {
      const formData = fillOutForm();
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      // Assuming form reset logic is implemented, these fields should be empty or reset to default state
      expect(screen.getByLabelText(LABELS.firstName)).toHaveValue('');
      expect(screen.getByLabelText(LABELS.lastName)).toHaveValue('');
      expect(screen.getByLabelText(LABELS.email)).toHaveValue('');
      expect(screen.getByLabelText(LABELS.password)).toHaveValue('');
    });
  });
});
  });

describe('SignUpForm Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Password Validation Edge Cases', () => {
    test.each([
      { description: 'all lowercase', password: 'password', expected: 'red' },
      { description: 'all uppercase', password: 'PASSWORD', expected: 'red' },
      { description: 'numbers only', password: '12345678', expected: 'red' },
      { description: 'mixed without number', password: 'Password', expected: 'red' },
      { description: 'mixed without uppercase', password: 'password1', expected: 'red' },
      { description: 'mixed without lowercase', password: 'PASSWORD1', expected: 'red' },
      { description: 'valid mix', password: 'Passw0rd', expected: 'green'},
    ])('marks password as $expected for $description', ({ password, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(expected);
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(expected);
      expect(screen.getByText(/1 number/i).className).toMatch(expected);
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(expected);
    });
  });

  describe('Email Validation Edge Cases', () => {
    test.each([
      { description: 'missing @ symbol', email: 'userdomain.com', valid: false },
      { description: 'missing domain', email: 'user@', valid: false },
      { description: 'missing local part', email: '@domain.com', valid: false },
      { description: 'valid email', email: 'user@domain.com', valid: true },
    ])('validates $description email as $valid', ({ email, valid }) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      const validationMessage = screen.queryByText(/Please enter a valid email address/i);
      if (valid) {
        expect(validationMessage).toBeNull();
      } else {
        expect(validationMessage).toBeInTheDocument();
      }
    });
  });

  describe('Submit Button State', () => {
    test.each([
      { description: 'with empty email', data: { email: '' }, enabled: false },
      { description: 'with invalid email', data: { email: 'invalidemail' }, enabled: false },
      { description: 'with short password', data: { password: 'short' }, enabled: false },
      { description: 'with valid inputs', data: { firstName: 'John', lastName: 'Doe', email: VALID_EMAIL, password: VALID_PASSWORD }, enabled: true },
    ])('is $enabled when form is $description', ({ data, enabled }) => {
      fillOutForm(data);
      const button = screen.getByRole('button', { name: BUTTON_TEXT });
      if (enabled) {
        expect(button).not.toBeDisabled();
      } else {
        expect(button).toBeDisabled();
      }
    });
  });

  describe('Form Reset After Submission', () => {
    test('resets form fields after successful submission', () => {
      const formData = fillOutForm();
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      // Assuming form reset logic is implemented, these fields should be empty or reset to default state
      expect(screen.getByLabelText(LABELS.firstName)).toHaveValue('');
      expect(screen.getByLabelText(LABELS.lastName)).toHaveValue('');
      expect(screen.getByLabelText(LABELS.email)).toHaveValue('');
      expect(screen.getByLabelText(LABELS.password)).toHaveValue('');
    });
  });
});
});

describe('SignUpForm Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Password Validation Edge Cases', () => {
    test.each([
      { description: 'all lowercase', password: 'password', expected: 'red' },
      { description: 'all uppercase', password: 'PASSWORD', expected: 'red' },
      { description: 'numbers only', password: '12345678', expected: 'red' },
      { description: 'mixed without number', password: 'Password', expected: 'red' },
      { description: 'mixed without uppercase', password: 'password1', expected: 'red' },
      { description: 'mixed without lowercase', password: 'PASSWORD1', expected: 'red' },
      { description: 'valid mix', password: 'Passw0rd', expected: 'green'},
    ])('marks password as $expected for $description', ({ password, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(expected);
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(expected);
      expect(screen.getByText(/1 number/i).className).toMatch(expected);
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(expected);
    });
  });

  describe('Email Validation Edge Cases', () => {
    test.each([
      { description: 'missing @ symbol', email: 'userdomain.com', valid: false },
      { description: 'missing domain', email: 'user@', valid: false },
      { description: 'missing local part', email: '@domain.com', valid: false },
      { description: 'valid email', email: 'user@domain.com', valid: true },
    ])('validates $description email as $valid', ({ email, valid }) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      const validationMessage = screen.queryByText(/Please enter a valid email address/i);
      if (valid) {
        expect(validationMessage).toBeNull();
      } else {
        expect(validationMessage).toBeInTheDocument();
      }
    });
  });

  describe('Submit Button State', () => {
    test.each([
      { description: 'with empty email', data: { email: '' }, enabled: false },
      { description: 'with invalid email', data: { email: 'invalidemail' }, enabled: false },
      { description: 'with short password', data: { password: 'short' }, enabled: false },
      { description: 'with valid inputs', data: { firstName: 'John', lastName: 'Doe', email: VALID_EMAIL, password: VALID_PASSWORD }, enabled: true },
    ])('is $enabled when form is $description', ({ data, enabled }) => {
      fillOutForm(data);
      const button = screen.getByRole('button', { name: BUTTON_TEXT });
      if (enabled) {
        expect(button).not.toBeDisabled();
      } else {
        expect(button).toBeDisabled();
      }
    });
  });

  describe('Form Reset After Submission', () => {
    test('resets form fields after successful submission', () => {
      const formData = fillOutForm();
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      // Assuming form reset logic is implemented, these fields should be empty or reset to default state
      expect(screen.getByLabelText(LABELS.firstName)).toHaveValue('');
      expect(screen.getByLabelText(LABELS.lastName)).toHaveValue('');
      expect(screen.getByLabelText(LABELS.email)).toHaveValue('');
      expect(screen.getByLabelText(LABELS.password)).toHaveValue('');
    });
  });
});
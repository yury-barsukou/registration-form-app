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
      { password: 'nopassword', expected: false },
      { password: 'LOWERCASE123', expected: false },
      { password: 'uppercase123', expected: false },
      { password: 'NoNumber', expected: false },
      { password: 'Short1', expected: false },
      { password: 'ValidPassword1', expected: true },
    ])('validates password "$password" correctly', ({ password, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      const hasGreen = screen.getByText(/Minimum 8 characters/i).className.includes('green');
      expect(hasGreen).toBe(expected);
    });
  });

  describe('Email Validation Edge Cases', () => {
    test.each([
      { email: 'simple@example.com', expected: true },
      { email: 'very.common@example.com', expected: true },
      { email: 'disposable.style.email.with+symbol@example.com', expected: true },
      { email: 'other.email-with-dash@example.com', expected: true },
      { email: 'fully-qualified-domain@example.com', expected: true },
      { email: 'user.name+tag+sorting@example.com', expected: true },
      { email: 'x@example.com', expected: true }, // One-letter local-part
      { email: 'example-indeed@strange-example.com', expected: true },
      { email: 'admin@mailserver1', expected: false }, // local domain name with no TLD
      { email: 'example@s.solutions', expected: true }, // local domain name with TLD
      { email: 'john..doe@example.com', expected: false }, // double dot before @
      { email: 'john.doe@example..com', expected: false }, // double dot after @
      { email: 'a"b(c)d,e:f;g<h>i[j\k]l@example.com', expected: false }, // special characters in the local-part
      { email: 'just"not"right@example.com', expected: false }, // quoted strings must be dot separated or the only element making up the local-part
      { email: 'this is"not\allowed@example.com', expected: false }, // spaces, quotes, and backslashes may only exist when within quoted strings and preceded by a backslash
      { email: 'this\ still\"not\\allowed@example.com', expected: false }, // even if escaped (preceded by a backslash), spaces, quotes, and backslashes must still be contained by quotes
    ])('validates email "$email" correctly', ({ email, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      const isInvalidMessagePresent = screen.queryByText(/Please enter a valid email address/i) !== null;
      expect(isInvalidMessagePresent).toBe(!expected);
    });
  });

  describe('Form Validity with Various Inputs', () => {
    test.each([
      { inputs: { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', password: 'Password1' }, expected: true },
      { inputs: { firstName: '', lastName: 'Doe', email: 'john.doe@example.com', password: 'Password1' }, expected: false },
      { inputs: { firstName: 'John', lastName: '', email: 'john.doe@example.com', password: 'Password1' }, expected: false },
      { inputs: { firstName: 'John', lastName: 'Doe', email: '', password: 'Password1' }, expected: false },
      { inputs: { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', password: '' }, expected: false },
      { inputs: { firstName: 'John', lastName: 'Doe', email: 'invalid', password: 'Password1' }, expected: false },
      { inputs: { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', password: 'short' }, expected: false },
    ])('validates form with inputs $inputs correctly', ({ inputs, expected }) => {
      fillOutForm(inputs);
      const isButtonDisabled = screen.getByRole('button', { name: BUTTON_TEXT }).hasAttribute('disabled');
      expect(isButtonDisabled).toBe(!expected);
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
      { password: 'nopassword', expected: false },
      { password: 'LOWERCASE123', expected: false },
      { password: 'uppercase123', expected: false },
      { password: 'NoNumber', expected: false },
      { password: 'Short1', expected: false },
      { password: 'ValidPassword1', expected: true },
    ])('validates password "$password" correctly', ({ password, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      const hasGreen = screen.getByText(/Minimum 8 characters/i).className.includes('green');
      expect(hasGreen).toBe(expected);
    });
  });

  describe('Email Validation Edge Cases', () => {
    test.each([
      { email: 'simple@example.com', expected: true },
      { email: 'very.common@example.com', expected: true },
      { email: 'disposable.style.email.with+symbol@example.com', expected: true },
      { email: 'other.email-with-dash@example.com', expected: true },
      { email: 'fully-qualified-domain@example.com', expected: true },
      { email: 'user.name+tag+sorting@example.com', expected: true },
      { email: 'x@example.com', expected: true }, // One-letter local-part
      { email: 'example-indeed@strange-example.com', expected: true },
      { email: 'admin@mailserver1', expected: false }, // local domain name with no TLD
      { email: 'example@s.solutions', expected: true }, // local domain name with TLD
      { email: 'john..doe@example.com', expected: false }, // double dot before @
      { email: 'john.doe@example..com', expected: false }, // double dot after @
      { email: 'a"b(c)d,e:f;g<h>i[j\k]l@example.com', expected: false }, // special characters in the local-part
      { email: 'just"not"right@example.com', expected: false }, // quoted strings must be dot separated or the only element making up the local-part
      { email: 'this is"not\allowed@example.com', expected: false }, // spaces, quotes, and backslashes may only exist when within quoted strings and preceded by a backslash
      { email: 'this\ still\"not\\allowed@example.com', expected: false }, // even if escaped (preceded by a backslash), spaces, quotes, and backslashes must still be contained by quotes
    ])('validates email "$email" correctly', ({ email, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      const isInvalidMessagePresent = screen.queryByText(/Please enter a valid email address/i) !== null;
      expect(isInvalidMessagePresent).toBe(!expected);
    });
  });

  describe('Form Validity with Various Inputs', () => {
    test.each([
      { inputs: { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', password: 'Password1' }, expected: true },
      { inputs: { firstName: '', lastName: 'Doe', email: 'john.doe@example.com', password: 'Password1' }, expected: false },
      { inputs: { firstName: 'John', lastName: '', email: 'john.doe@example.com', password: 'Password1' }, expected: false },
      { inputs: { firstName: 'John', lastName: 'Doe', email: '', password: 'Password1' }, expected: false },
      { inputs: { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', password: '' }, expected: false },
      { inputs: { firstName: 'John', lastName: 'Doe', email: 'invalid', password: 'Password1' }, expected: false },
      { inputs: { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', password: 'short' }, expected: false },
    ])('validates form with inputs $inputs correctly', ({ inputs, expected }) => {
      fillOutForm(inputs);
      const isButtonDisabled = screen.getByRole('button', { name: BUTTON_TEXT }).hasAttribute('disabled');
      expect(isButtonDisabled).toBe(!expected);
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
      { password: 'nopassword', expected: false },
      { password: 'LOWERCASE123', expected: false },
      { password: 'uppercase123', expected: false },
      { password: 'NoNumber', expected: false },
      { password: 'Short1', expected: false },
      { password: 'ValidPassword1', expected: true },
    ])('validates password "$password" correctly', ({ password, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      const hasGreen = screen.getByText(/Minimum 8 characters/i).className.includes('green');
      expect(hasGreen).toBe(expected);
    });
  });

  describe('Email Validation Edge Cases', () => {
    test.each([
      { email: 'simple@example.com', expected: true },
      { email: 'very.common@example.com', expected: true },
      { email: 'disposable.style.email.with+symbol@example.com', expected: true },
      { email: 'other.email-with-dash@example.com', expected: true },
      { email: 'fully-qualified-domain@example.com', expected: true },
      { email: 'user.name+tag+sorting@example.com', expected: true },
      { email: 'x@example.com', expected: true }, // One-letter local-part
      { email: 'example-indeed@strange-example.com', expected: true },
      { email: 'admin@mailserver1', expected: false }, // local domain name with no TLD
      { email: 'example@s.solutions', expected: true }, // local domain name with TLD
      { email: 'john..doe@example.com', expected: false }, // double dot before @
      { email: 'john.doe@example..com', expected: false }, // double dot after @
      { email: 'a"b(c)d,e:f;g<h>i[j\k]l@example.com', expected: false }, // special characters in the local-part
      { email: 'just"not"right@example.com', expected: false }, // quoted strings must be dot separated or the only element making up the local-part
      { email: 'this is"not\allowed@example.com', expected: false }, // spaces, quotes, and backslashes may only exist when within quoted strings and preceded by a backslash
      { email: 'this\ still\"not\\allowed@example.com', expected: false }, // even if escaped (preceded by a backslash), spaces, quotes, and backslashes must still be contained by quotes
    ])('validates email "$email" correctly', ({ email, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      const isInvalidMessagePresent = screen.queryByText(/Please enter a valid email address/i) !== null;
      expect(isInvalidMessagePresent).toBe(!expected);
    });
  });

  describe('Form Validity with Various Inputs', () => {
    test.each([
      { inputs: { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', password: 'Password1' }, expected: true },
      { inputs: { firstName: '', lastName: 'Doe', email: 'john.doe@example.com', password: 'Password1' }, expected: false },
      { inputs: { firstName: 'John', lastName: '', email: 'john.doe@example.com', password: 'Password1' }, expected: false },
      { inputs: { firstName: 'John', lastName: 'Doe', email: '', password: 'Password1' }, expected: false },
      { inputs: { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', password: '' }, expected: false },
      { inputs: { firstName: 'John', lastName: 'Doe', email: 'invalid', password: 'Password1' }, expected: false },
      { inputs: { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', password: 'short' }, expected: false },
    ])('validates form with inputs $inputs correctly', ({ inputs, expected }) => {
      fillOutForm(inputs);
      const isButtonDisabled = screen.getByRole('button', { name: BUTTON_TEXT }).hasAttribute('disabled');
      expect(isButtonDisabled).toBe(!expected);
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
      { password: 'nopassword', expected: false },
      { password: 'LOWERCASE123', expected: false },
      { password: 'uppercase123', expected: false },
      { password: 'NoNumber', expected: false },
      { password: 'Short1', expected: false },
      { password: 'ValidPassword1', expected: true },
    ])('validates password "$password" correctly', ({ password, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      const hasGreen = screen.getByText(/Minimum 8 characters/i).className.includes('green');
      expect(hasGreen).toBe(expected);
    });
  });

  describe('Email Validation Edge Cases', () => {
    test.each([
      { email: 'simple@example.com', expected: true },
      { email: 'very.common@example.com', expected: true },
      { email: 'disposable.style.email.with+symbol@example.com', expected: true },
      { email: 'other.email-with-dash@example.com', expected: true },
      { email: 'fully-qualified-domain@example.com', expected: true },
      { email: 'user.name+tag+sorting@example.com', expected: true },
      { email: 'x@example.com', expected: true }, // One-letter local-part
      { email: 'example-indeed@strange-example.com', expected: true },
      { email: 'admin@mailserver1', expected: false }, // local domain name with no TLD
      { email: 'example@s.solutions', expected: true }, // local domain name with TLD
      { email: 'john..doe@example.com', expected: false }, // double dot before @
      { email: 'john.doe@example..com', expected: false }, // double dot after @
      { email: 'a"b(c)d,e:f;g<h>i[j\k]l@example.com', expected: false }, // special characters in the local-part
      { email: 'just"not"right@example.com', expected: false }, // quoted strings must be dot separated or the only element making up the local-part
      { email: 'this is"not\allowed@example.com', expected: false }, // spaces, quotes, and backslashes may only exist when within quoted strings and preceded by a backslash
      { email: 'this\ still\"not\\allowed@example.com', expected: false }, // even if escaped (preceded by a backslash), spaces, quotes, and backslashes must still be contained by quotes
    ])('validates email "$email" correctly', ({ email, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      const isInvalidMessagePresent = screen.queryByText(/Please enter a valid email address/i) !== null;
      expect(isInvalidMessagePresent).toBe(!expected);
    });
  });

  describe('Form Validity with Various Inputs', () => {
    test.each([
      { inputs: { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', password: 'Password1' }, expected: true },
      { inputs: { firstName: '', lastName: 'Doe', email: 'john.doe@example.com', password: 'Password1' }, expected: false },
      { inputs: { firstName: 'John', lastName: '', email: 'john.doe@example.com', password: 'Password1' }, expected: false },
      { inputs: { firstName: 'John', lastName: 'Doe', email: '', password: 'Password1' }, expected: false },
      { inputs: { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', password: '' }, expected: false },
      { inputs: { firstName: 'John', lastName: 'Doe', email: 'invalid', password: 'Password1' }, expected: false },
      { inputs: { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', password: 'short' }, expected: false },
    ])('validates form with inputs $inputs correctly', ({ inputs, expected }) => {
      fillOutForm(inputs);
      const isButtonDisabled = screen.getByRole('button', { name: BUTTON_TEXT }).hasAttribute('disabled');
      expect(isButtonDisabled).toBe(!expected);
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
      { password: 'nopassword', expected: false },
      { password: 'LOWERCASE123', expected: false },
      { password: 'uppercase123', expected: false },
      { password: 'NoNumber', expected: false },
      { password: 'Short1', expected: false },
      { password: 'ValidPassword1', expected: true },
    ])('validates password "$password" correctly', ({ password, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      const hasGreen = screen.getByText(/Minimum 8 characters/i).className.includes('green');
      expect(hasGreen).toBe(expected);
    });
  });

  describe('Email Validation Edge Cases', () => {
    test.each([
      { email: 'simple@example.com', expected: true },
      { email: 'very.common@example.com', expected: true },
      { email: 'disposable.style.email.with+symbol@example.com', expected: true },
      { email: 'other.email-with-dash@example.com', expected: true },
      { email: 'fully-qualified-domain@example.com', expected: true },
      { email: 'user.name+tag+sorting@example.com', expected: true },
      { email: 'x@example.com', expected: true }, // One-letter local-part
      { email: 'example-indeed@strange-example.com', expected: true },
      { email: 'admin@mailserver1', expected: false }, // local domain name with no TLD
      { email: 'example@s.solutions', expected: true }, // local domain name with TLD
      { email: 'john..doe@example.com', expected: false }, // double dot before @
      { email: 'john.doe@example..com', expected: false }, // double dot after @
      { email: 'a"b(c)d,e:f;g<h>i[j\k]l@example.com', expected: false }, // special characters in the local-part
      { email: 'just"not"right@example.com', expected: false }, // quoted strings must be dot separated or the only element making up the local-part
      { email: 'this is"not\allowed@example.com', expected: false }, // spaces, quotes, and backslashes may only exist when within quoted strings and preceded by a backslash
      { email: 'this\ still\"not\\allowed@example.com', expected: false }, // even if escaped (preceded by a backslash), spaces, quotes, and backslashes must still be contained by quotes
    ])('validates email "$email" correctly', ({ email, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      const isInvalidMessagePresent = screen.queryByText(/Please enter a valid email address/i) !== null;
      expect(isInvalidMessagePresent).toBe(!expected);
    });
  });

  describe('Form Validity with Various Inputs', () => {
    test.each([
      { inputs: { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', password: 'Password1' }, expected: true },
      { inputs: { firstName: '', lastName: 'Doe', email: 'john.doe@example.com', password: 'Password1' }, expected: false },
      { inputs: { firstName: 'John', lastName: '', email: 'john.doe@example.com', password: 'Password1' }, expected: false },
      { inputs: { firstName: 'John', lastName: 'Doe', email: '', password: 'Password1' }, expected: false },
      { inputs: { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', password: '' }, expected: false },
      { inputs: { firstName: 'John', lastName: 'Doe', email: 'invalid', password: 'Password1' }, expected: false },
      { inputs: { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', password: 'short' }, expected: false },
    ])('validates form with inputs $inputs correctly', ({ inputs, expected }) => {
      fillOutForm(inputs);
      const isButtonDisabled = screen.getByRole('button', { name: BUTTON_TEXT }).hasAttribute('disabled');
      expect(isButtonDisabled).toBe(!expected);
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
      { password: 'nopassword', expected: false },
      { password: 'LOWERCASE123', expected: false },
      { password: 'uppercase123', expected: false },
      { password: 'NoNumber', expected: false },
      { password: 'Short1', expected: false },
      { password: 'ValidPassword1', expected: true },
    ])('validates password "$password" correctly', ({ password, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      const hasGreen = screen.getByText(/Minimum 8 characters/i).className.includes('green');
      expect(hasGreen).toBe(expected);
    });
  });

  describe('Email Validation Edge Cases', () => {
    test.each([
      { email: 'simple@example.com', expected: true },
      { email: 'very.common@example.com', expected: true },
      { email: 'disposable.style.email.with+symbol@example.com', expected: true },
      { email: 'other.email-with-dash@example.com', expected: true },
      { email: 'fully-qualified-domain@example.com', expected: true },
      { email: 'user.name+tag+sorting@example.com', expected: true },
      { email: 'x@example.com', expected: true }, // One-letter local-part
      { email: 'example-indeed@strange-example.com', expected: true },
      { email: 'admin@mailserver1', expected: false }, // local domain name with no TLD
      { email: 'example@s.solutions', expected: true }, // local domain name with TLD
      { email: 'john..doe@example.com', expected: false }, // double dot before @
      { email: 'john.doe@example..com', expected: false }, // double dot after @
      { email: 'a"b(c)d,e:f;g<h>i[j\k]l@example.com', expected: false }, // special characters in the local-part
      { email: 'just"not"right@example.com', expected: false }, // quoted strings must be dot separated or the only element making up the local-part
      { email: 'this is"not\allowed@example.com', expected: false }, // spaces, quotes, and backslashes may only exist when within quoted strings and preceded by a backslash
      { email: 'this\ still\"not\\allowed@example.com', expected: false }, // even if escaped (preceded by a backslash), spaces, quotes, and backslashes must still be contained by quotes
    ])('validates email "$email" correctly', ({ email, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      const isInvalidMessagePresent = screen.queryByText(/Please enter a valid email address/i) !== null;
      expect(isInvalidMessagePresent).toBe(!expected);
    });
  });

  describe('Form Validity with Various Inputs', () => {
    test.each([
      { inputs: { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', password: 'Password1' }, expected: true },
      { inputs: { firstName: '', lastName: 'Doe', email: 'john.doe@example.com', password: 'Password1' }, expected: false },
      { inputs: { firstName: 'John', lastName: '', email: 'john.doe@example.com', password: 'Password1' }, expected: false },
      { inputs: { firstName: 'John', lastName: 'Doe', email: '', password: 'Password1' }, expected: false },
      { inputs: { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', password: '' }, expected: false },
      { inputs: { firstName: 'John', lastName: 'Doe', email: 'invalid', password: 'Password1' }, expected: false },
      { inputs: { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', password: 'short' }, expected: false },
    ])('validates form with inputs $inputs correctly', ({ inputs, expected }) => {
      fillOutForm(inputs);
      const isButtonDisabled = screen.getByRole('button', { name: BUTTON_TEXT }).hasAttribute('disabled');
      expect(isButtonDisabled).toBe(!expected);
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
      { password: 'nopassword', expected: false },
      { password: 'LOWERCASE123', expected: false },
      { password: 'uppercase123', expected: false },
      { password: 'NoNumber', expected: false },
      { password: 'Short1', expected: false },
      { password: 'ValidPassword1', expected: true },
    ])('validates password "$password" correctly', ({ password, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      const hasGreen = screen.getByText(/Minimum 8 characters/i).className.includes('green');
      expect(hasGreen).toBe(expected);
    });
  });

  describe('Email Validation Edge Cases', () => {
    test.each([
      { email: 'simple@example.com', expected: true },
      { email: 'very.common@example.com', expected: true },
      { email: 'disposable.style.email.with+symbol@example.com', expected: true },
      { email: 'other.email-with-dash@example.com', expected: true },
      { email: 'fully-qualified-domain@example.com', expected: true },
      { email: 'user.name+tag+sorting@example.com', expected: true },
      { email: 'x@example.com', expected: true }, // One-letter local-part
      { email: 'example-indeed@strange-example.com', expected: true },
      { email: 'admin@mailserver1', expected: false }, // local domain name with no TLD
      { email: 'example@s.solutions', expected: true }, // local domain name with TLD
      { email: 'john..doe@example.com', expected: false }, // double dot before @
      { email: 'john.doe@example..com', expected: false }, // double dot after @
      { email: 'a"b(c)d,e:f;g<h>i[j\k]l@example.com', expected: false }, // special characters in the local-part
      { email: 'just"not"right@example.com', expected: false }, // quoted strings must be dot separated or the only element making up the local-part
      { email: 'this is"not\allowed@example.com', expected: false }, // spaces, quotes, and backslashes may only exist when within quoted strings and preceded by a backslash
      { email: 'this\ still\"not\\allowed@example.com', expected: false }, // even if escaped (preceded by a backslash), spaces, quotes, and backslashes must still be contained by quotes
    ])('validates email "$email" correctly', ({ email, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      const isInvalidMessagePresent = screen.queryByText(/Please enter a valid email address/i) !== null;
      expect(isInvalidMessagePresent).toBe(!expected);
    });
  });

  describe('Form Validity with Various Inputs', () => {
    test.each([
      { inputs: { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', password: 'Password1' }, expected: true },
      { inputs: { firstName: '', lastName: 'Doe', email: 'john.doe@example.com', password: 'Password1' }, expected: false },
      { inputs: { firstName: 'John', lastName: '', email: 'john.doe@example.com', password: 'Password1' }, expected: false },
      { inputs: { firstName: 'John', lastName: 'Doe', email: '', password: 'Password1' }, expected: false },
      { inputs: { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', password: '' }, expected: false },
      { inputs: { firstName: 'John', lastName: 'Doe', email: 'invalid', password: 'Password1' }, expected: false },
      { inputs: { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', password: 'short' }, expected: false },
    ])('validates form with inputs $inputs correctly', ({ inputs, expected }) => {
      fillOutForm(inputs);
      const isButtonDisabled = screen.getByRole('button', { name: BUTTON_TEXT }).hasAttribute('disabled');
      expect(isButtonDisabled).toBe(!expected);
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
      { password: 'nopassword', expected: false },
      { password: 'LOWERCASE123', expected: false },
      { password: 'uppercase123', expected: false },
      { password: 'NoNumber', expected: false },
      { password: 'Short1', expected: false },
      { password: 'ValidPassword1', expected: true },
    ])('validates password "$password" correctly', ({ password, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      const hasGreen = screen.getByText(/Minimum 8 characters/i).className.includes('green');
      expect(hasGreen).toBe(expected);
    });
  });

  describe('Email Validation Edge Cases', () => {
    test.each([
      { email: 'simple@example.com', expected: true },
      { email: 'very.common@example.com', expected: true },
      { email: 'disposable.style.email.with+symbol@example.com', expected: true },
      { email: 'other.email-with-dash@example.com', expected: true },
      { email: 'fully-qualified-domain@example.com', expected: true },
      { email: 'user.name+tag+sorting@example.com', expected: true },
      { email: 'x@example.com', expected: true }, // One-letter local-part
      { email: 'example-indeed@strange-example.com', expected: true },
      { email: 'admin@mailserver1', expected: false }, // local domain name with no TLD
      { email: 'example@s.solutions', expected: true }, // local domain name with TLD
      { email: 'john..doe@example.com', expected: false }, // double dot before @
      { email: 'john.doe@example..com', expected: false }, // double dot after @
      { email: 'a"b(c)d,e:f;g<h>i[j\k]l@example.com', expected: false }, // special characters in the local-part
      { email: 'just"not"right@example.com', expected: false }, // quoted strings must be dot separated or the only element making up the local-part
      { email: 'this is"not\allowed@example.com', expected: false }, // spaces, quotes, and backslashes may only exist when within quoted strings and preceded by a backslash
      { email: 'this\ still\"not\\allowed@example.com', expected: false }, // even if escaped (preceded by a backslash), spaces, quotes, and backslashes must still be contained by quotes
    ])('validates email "$email" correctly', ({ email, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      const isInvalidMessagePresent = screen.queryByText(/Please enter a valid email address/i) !== null;
      expect(isInvalidMessagePresent).toBe(!expected);
    });
  });

  describe('Form Validity with Various Inputs', () => {
    test.each([
      { inputs: { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', password: 'Password1' }, expected: true },
      { inputs: { firstName: '', lastName: 'Doe', email: 'john.doe@example.com', password: 'Password1' }, expected: false },
      { inputs: { firstName: 'John', lastName: '', email: 'john.doe@example.com', password: 'Password1' }, expected: false },
      { inputs: { firstName: 'John', lastName: 'Doe', email: '', password: 'Password1' }, expected: false },
      { inputs: { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', password: '' }, expected: false },
      { inputs: { firstName: 'John', lastName: 'Doe', email: 'invalid', password: 'Password1' }, expected: false },
      { inputs: { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', password: 'short' }, expected: false },
    ])('validates form with inputs $inputs correctly', ({ inputs, expected }) => {
      fillOutForm(inputs);
      const isButtonDisabled = screen.getByRole('button', { name: BUTTON_TEXT }).hasAttribute('disabled');
      expect(isButtonDisabled).toBe(!expected);
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
      { password: 'nopassword', expected: false },
      { password: 'LOWERCASE123', expected: false },
      { password: 'uppercase123', expected: false },
      { password: 'NoNumber', expected: false },
      { password: 'Short1', expected: false },
      { password: 'ValidPassword1', expected: true },
    ])('validates password "$password" correctly', ({ password, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      const hasGreen = screen.getByText(/Minimum 8 characters/i).className.includes('green');
      expect(hasGreen).toBe(expected);
    });
  });

  describe('Email Validation Edge Cases', () => {
    test.each([
      { email: 'simple@example.com', expected: true },
      { email: 'very.common@example.com', expected: true },
      { email: 'disposable.style.email.with+symbol@example.com', expected: true },
      { email: 'other.email-with-dash@example.com', expected: true },
      { email: 'fully-qualified-domain@example.com', expected: true },
      { email: 'user.name+tag+sorting@example.com', expected: true },
      { email: 'x@example.com', expected: true }, // One-letter local-part
      { email: 'example-indeed@strange-example.com', expected: true },
      { email: 'admin@mailserver1', expected: false }, // local domain name with no TLD
      { email: 'example@s.solutions', expected: true }, // local domain name with TLD
      { email: 'john..doe@example.com', expected: false }, // double dot before @
      { email: 'john.doe@example..com', expected: false }, // double dot after @
      { email: 'a"b(c)d,e:f;g<h>i[j\k]l@example.com', expected: false }, // special characters in the local-part
      { email: 'just"not"right@example.com', expected: false }, // quoted strings must be dot separated or the only element making up the local-part
      { email: 'this is"not\allowed@example.com', expected: false }, // spaces, quotes, and backslashes may only exist when within quoted strings and preceded by a backslash
      { email: 'this\ still\"not\\allowed@example.com', expected: false }, // even if escaped (preceded by a backslash), spaces, quotes, and backslashes must still be contained by quotes
    ])('validates email "$email" correctly', ({ email, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      const isInvalidMessagePresent = screen.queryByText(/Please enter a valid email address/i) !== null;
      expect(isInvalidMessagePresent).toBe(!expected);
    });
  });

  describe('Form Validity with Various Inputs', () => {
    test.each([
      { inputs: { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', password: 'Password1' }, expected: true },
      { inputs: { firstName: '', lastName: 'Doe', email: 'john.doe@example.com', password: 'Password1' }, expected: false },
      { inputs: { firstName: 'John', lastName: '', email: 'john.doe@example.com', password: 'Password1' }, expected: false },
      { inputs: { firstName: 'John', lastName: 'Doe', email: '', password: 'Password1' }, expected: false },
      { inputs: { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', password: '' }, expected: false },
      { inputs: { firstName: 'John', lastName: 'Doe', email: 'invalid', password: 'Password1' }, expected: false },
      { inputs: { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', password: 'short' }, expected: false },
    ])('validates form with inputs $inputs correctly', ({ inputs, expected }) => {
      fillOutForm(inputs);
      const isButtonDisabled = screen.getByRole('button', { name: BUTTON_TEXT }).hasAttribute('disabled');
      expect(isButtonDisabled).toBe(!expected);
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
      { password: 'nopassword', expected: false },
      { password: 'LOWERCASE123', expected: false },
      { password: 'uppercase123', expected: false },
      { password: 'NoNumber', expected: false },
      { password: 'Short1', expected: false },
      { password: 'ValidPassword1', expected: true },
    ])('validates password "$password" correctly', ({ password, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      const hasGreen = screen.getByText(/Minimum 8 characters/i).className.includes('green');
      expect(hasGreen).toBe(expected);
    });
  });

  describe('Email Validation Edge Cases', () => {
    test.each([
      { email: 'simple@example.com', expected: true },
      { email: 'very.common@example.com', expected: true },
      { email: 'disposable.style.email.with+symbol@example.com', expected: true },
      { email: 'other.email-with-dash@example.com', expected: true },
      { email: 'fully-qualified-domain@example.com', expected: true },
      { email: 'user.name+tag+sorting@example.com', expected: true },
      { email: 'x@example.com', expected: true }, // One-letter local-part
      { email: 'example-indeed@strange-example.com', expected: true },
      { email: 'admin@mailserver1', expected: false }, // local domain name with no TLD
      { email: 'example@s.solutions', expected: true }, // local domain name with TLD
      { email: 'john..doe@example.com', expected: false }, // double dot before @
      { email: 'john.doe@example..com', expected: false }, // double dot after @
      { email: 'a"b(c)d,e:f;g<h>i[j\k]l@example.com', expected: false }, // special characters in the local-part
      { email: 'just"not"right@example.com', expected: false }, // quoted strings must be dot separated or the only element making up the local-part
      { email: 'this is"not\allowed@example.com', expected: false }, // spaces, quotes, and backslashes may only exist when within quoted strings and preceded by a backslash
      { email: 'this\ still\"not\\allowed@example.com', expected: false }, // even if escaped (preceded by a backslash), spaces, quotes, and backslashes must still be contained by quotes
    ])('validates email "$email" correctly', ({ email, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      const isInvalidMessagePresent = screen.queryByText(/Please enter a valid email address/i) !== null;
      expect(isInvalidMessagePresent).toBe(!expected);
    });
  });

  describe('Form Validity with Various Inputs', () => {
    test.each([
      { inputs: { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', password: 'Password1' }, expected: true },
      { inputs: { firstName: '', lastName: 'Doe', email: 'john.doe@example.com', password: 'Password1' }, expected: false },
      { inputs: { firstName: 'John', lastName: '', email: 'john.doe@example.com', password: 'Password1' }, expected: false },
      { inputs: { firstName: 'John', lastName: 'Doe', email: '', password: 'Password1' }, expected: false },
      { inputs: { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', password: '' }, expected: false },
      { inputs: { firstName: 'John', lastName: 'Doe', email: 'invalid', password: 'Password1' }, expected: false },
      { inputs: { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', password: 'short' }, expected: false },
    ])('validates form with inputs $inputs correctly', ({ inputs, expected }) => {
      fillOutForm(inputs);
      const isButtonDisabled = screen.getByRole('button', { name: BUTTON_TEXT }).hasAttribute('disabled');
      expect(isButtonDisabled).toBe(!expected);
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
      { password: 'nopassword', expected: false },
      { password: 'LOWERCASE123', expected: false },
      { password: 'uppercase123', expected: false },
      { password: 'NoNumber', expected: false },
      { password: 'Short1', expected: false },
      { password: 'ValidPassword1', expected: true },
    ])('validates password "$password" correctly', ({ password, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      const hasGreen = screen.getByText(/Minimum 8 characters/i).className.includes('green');
      expect(hasGreen).toBe(expected);
    });
  });

  describe('Email Validation Edge Cases', () => {
    test.each([
      { email: 'simple@example.com', expected: true },
      { email: 'very.common@example.com', expected: true },
      { email: 'disposable.style.email.with+symbol@example.com', expected: true },
      { email: 'other.email-with-dash@example.com', expected: true },
      { email: 'fully-qualified-domain@example.com', expected: true },
      { email: 'user.name+tag+sorting@example.com', expected: true },
      { email: 'x@example.com', expected: true }, // One-letter local-part
      { email: 'example-indeed@strange-example.com', expected: true },
      { email: 'admin@mailserver1', expected: false }, // local domain name with no TLD
      { email: 'example@s.solutions', expected: true }, // local domain name with TLD
      { email: 'john..doe@example.com', expected: false }, // double dot before @
      { email: 'john.doe@example..com', expected: false }, // double dot after @
      { email: 'a"b(c)d,e:f;g<h>i[j\k]l@example.com', expected: false }, // special characters in the local-part
      { email: 'just"not"right@example.com', expected: false }, // quoted strings must be dot separated or the only element making up the local-part
      { email: 'this is"not\allowed@example.com', expected: false }, // spaces, quotes, and backslashes may only exist when within quoted strings and preceded by a backslash
      { email: 'this\ still\"not\\allowed@example.com', expected: false }, // even if escaped (preceded by a backslash), spaces, quotes, and backslashes must still be contained by quotes
    ])('validates email "$email" correctly', ({ email, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      const isInvalidMessagePresent = screen.queryByText(/Please enter a valid email address/i) !== null;
      expect(isInvalidMessagePresent).toBe(!expected);
    });
  });

  describe('Form Validity with Various Inputs', () => {
    test.each([
      { inputs: { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', password: 'Password1' }, expected: true },
      { inputs: { firstName: '', lastName: 'Doe', email: 'john.doe@example.com', password: 'Password1' }, expected: false },
      { inputs: { firstName: 'John', lastName: '', email: 'john.doe@example.com', password: 'Password1' }, expected: false },
      { inputs: { firstName: 'John', lastName: 'Doe', email: '', password: 'Password1' }, expected: false },
      { inputs: { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', password: '' }, expected: false },
      { inputs: { firstName: 'John', lastName: 'Doe', email: 'invalid', password: 'Password1' }, expected: false },
      { inputs: { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', password: 'short' }, expected: false },
    ])('validates form with inputs $inputs correctly', ({ inputs, expected }) => {
      fillOutForm(inputs);
      const isButtonDisabled = screen.getByRole('button', { name: BUTTON_TEXT }).hasAttribute('disabled');
      expect(isButtonDisabled).toBe(!expected);
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
      { password: 'nopassword', expected: false },
      { password: 'LOWERCASE123', expected: false },
      { password: 'uppercase123', expected: false },
      { password: 'NoNumber', expected: false },
      { password: 'Short1', expected: false },
      { password: 'ValidPassword1', expected: true },
    ])('validates password "$password" correctly', ({ password, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      const hasGreen = screen.getByText(/Minimum 8 characters/i).className.includes('green');
      expect(hasGreen).toBe(expected);
    });
  });

  describe('Email Validation Edge Cases', () => {
    test.each([
      { email: 'simple@example.com', expected: true },
      { email: 'very.common@example.com', expected: true },
      { email: 'disposable.style.email.with+symbol@example.com', expected: true },
      { email: 'other.email-with-dash@example.com', expected: true },
      { email: 'fully-qualified-domain@example.com', expected: true },
      { email: 'user.name+tag+sorting@example.com', expected: true },
      { email: 'x@example.com', expected: true }, // One-letter local-part
      { email: 'example-indeed@strange-example.com', expected: true },
      { email: 'admin@mailserver1', expected: false }, // local domain name with no TLD
      { email: 'example@s.solutions', expected: true }, // local domain name with TLD
      { email: 'john..doe@example.com', expected: false }, // double dot before @
      { email: 'john.doe@example..com', expected: false }, // double dot after @
      { email: 'a"b(c)d,e:f;g<h>i[j\k]l@example.com', expected: false }, // special characters in the local-part
      { email: 'just"not"right@example.com', expected: false }, // quoted strings must be dot separated or the only element making up the local-part
      { email: 'this is"not\allowed@example.com', expected: false }, // spaces, quotes, and backslashes may only exist when within quoted strings and preceded by a backslash
      { email: 'this\ still\"not\\allowed@example.com', expected: false }, // even if escaped (preceded by a backslash), spaces, quotes, and backslashes must still be contained by quotes
    ])('validates email "$email" correctly', ({ email, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      const isInvalidMessagePresent = screen.queryByText(/Please enter a valid email address/i) !== null;
      expect(isInvalidMessagePresent).toBe(!expected);
    });
  });

  describe('Form Validity with Various Inputs', () => {
    test.each([
      { inputs: { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', password: 'Password1' }, expected: true },
      { inputs: { firstName: '', lastName: 'Doe', email: 'john.doe@example.com', password: 'Password1' }, expected: false },
      { inputs: { firstName: 'John', lastName: '', email: 'john.doe@example.com', password: 'Password1' }, expected: false },
      { inputs: { firstName: 'John', lastName: 'Doe', email: '', password: 'Password1' }, expected: false },
      { inputs: { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', password: '' }, expected: false },
      { inputs: { firstName: 'John', lastName: 'Doe', email: 'invalid', password: 'Password1' }, expected: false },
      { inputs: { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', password: 'short' }, expected: false },
    ])('validates form with inputs $inputs correctly', ({ inputs, expected }) => {
      fillOutForm(inputs);
      const isButtonDisabled = screen.getByRole('button', { name: BUTTON_TEXT }).hasAttribute('disabled');
      expect(isButtonDisabled).toBe(!expected);
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
      { password: 'nopassword', expected: false },
      { password: 'LOWERCASE123', expected: false },
      { password: 'uppercase123', expected: false },
      { password: 'NoNumber', expected: false },
      { password: 'Short1', expected: false },
      { password: 'ValidPassword1', expected: true },
    ])('validates password "$password" correctly', ({ password, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      const hasGreen = screen.getByText(/Minimum 8 characters/i).className.includes('green');
      expect(hasGreen).toBe(expected);
    });
  });

  describe('Email Validation Edge Cases', () => {
    test.each([
      { email: 'simple@example.com', expected: true },
      { email: 'very.common@example.com', expected: true },
      { email: 'disposable.style.email.with+symbol@example.com', expected: true },
      { email: 'other.email-with-dash@example.com', expected: true },
      { email: 'fully-qualified-domain@example.com', expected: true },
      { email: 'user.name+tag+sorting@example.com', expected: true },
      { email: 'x@example.com', expected: true }, // One-letter local-part
      { email: 'example-indeed@strange-example.com', expected: true },
      { email: 'admin@mailserver1', expected: false }, // local domain name with no TLD
      { email: 'example@s.solutions', expected: true }, // local domain name with TLD
      { email: 'john..doe@example.com', expected: false }, // double dot before @
      { email: 'john.doe@example..com', expected: false }, // double dot after @
      { email: 'a"b(c)d,e:f;g<h>i[j\k]l@example.com', expected: false }, // special characters in the local-part
      { email: 'just"not"right@example.com', expected: false }, // quoted strings must be dot separated or the only element making up the local-part
      { email: 'this is"not\allowed@example.com', expected: false }, // spaces, quotes, and backslashes may only exist when within quoted strings and preceded by a backslash
      { email: 'this\ still\"not\\allowed@example.com', expected: false }, // even if escaped (preceded by a backslash), spaces, quotes, and backslashes must still be contained by quotes
    ])('validates email "$email" correctly', ({ email, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      const isInvalidMessagePresent = screen.queryByText(/Please enter a valid email address/i) !== null;
      expect(isInvalidMessagePresent).toBe(!expected);
    });
  });

  describe('Form Validity with Various Inputs', () => {
    test.each([
      { inputs: { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', password: 'Password1' }, expected: true },
      { inputs: { firstName: '', lastName: 'Doe', email: 'john.doe@example.com', password: 'Password1' }, expected: false },
      { inputs: { firstName: 'John', lastName: '', email: 'john.doe@example.com', password: 'Password1' }, expected: false },
      { inputs: { firstName: 'John', lastName: 'Doe', email: '', password: 'Password1' }, expected: false },
      { inputs: { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', password: '' }, expected: false },
      { inputs: { firstName: 'John', lastName: 'Doe', email: 'invalid', password: 'Password1' }, expected: false },
      { inputs: { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', password: 'short' }, expected: false },
    ])('validates form with inputs $inputs correctly', ({ inputs, expected }) => {
      fillOutForm(inputs);
      const isButtonDisabled = screen.getByRole('button', { name: BUTTON_TEXT }).hasAttribute('disabled');
      expect(isButtonDisabled).toBe(!expected);
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
      { password: 'nopassword', expected: false },
      { password: 'LOWERCASE123', expected: false },
      { password: 'uppercase123', expected: false },
      { password: 'NoNumber', expected: false },
      { password: 'Short1', expected: false },
      { password: 'ValidPassword1', expected: true },
    ])('validates password "$password" correctly', ({ password, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      const hasGreen = screen.getByText(/Minimum 8 characters/i).className.includes('green');
      expect(hasGreen).toBe(expected);
    });
  });

  describe('Email Validation Edge Cases', () => {
    test.each([
      { email: 'simple@example.com', expected: true },
      { email: 'very.common@example.com', expected: true },
      { email: 'disposable.style.email.with+symbol@example.com', expected: true },
      { email: 'other.email-with-dash@example.com', expected: true },
      { email: 'fully-qualified-domain@example.com', expected: true },
      { email: 'user.name+tag+sorting@example.com', expected: true },
      { email: 'x@example.com', expected: true }, // One-letter local-part
      { email: 'example-indeed@strange-example.com', expected: true },
      { email: 'admin@mailserver1', expected: false }, // local domain name with no TLD
      { email: 'example@s.solutions', expected: true }, // local domain name with TLD
      { email: 'john..doe@example.com', expected: false }, // double dot before @
      { email: 'john.doe@example..com', expected: false }, // double dot after @
      { email: 'a"b(c)d,e:f;g<h>i[j\k]l@example.com', expected: false }, // special characters in the local-part
      { email: 'just"not"right@example.com', expected: false }, // quoted strings must be dot separated or the only element making up the local-part
      { email: 'this is"not\allowed@example.com', expected: false }, // spaces, quotes, and backslashes may only exist when within quoted strings and preceded by a backslash
      { email: 'this\ still\"not\\allowed@example.com', expected: false }, // even if escaped (preceded by a backslash), spaces, quotes, and backslashes must still be contained by quotes
    ])('validates email "$email" correctly', ({ email, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      const isInvalidMessagePresent = screen.queryByText(/Please enter a valid email address/i) !== null;
      expect(isInvalidMessagePresent).toBe(!expected);
    });
  });

  describe('Form Validity with Various Inputs', () => {
    test.each([
      { inputs: { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', password: 'Password1' }, expected: true },
      { inputs: { firstName: '', lastName: 'Doe', email: 'john.doe@example.com', password: 'Password1' }, expected: false },
      { inputs: { firstName: 'John', lastName: '', email: 'john.doe@example.com', password: 'Password1' }, expected: false },
      { inputs: { firstName: 'John', lastName: 'Doe', email: '', password: 'Password1' }, expected: false },
      { inputs: { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', password: '' }, expected: false },
      { inputs: { firstName: 'John', lastName: 'Doe', email: 'invalid', password: 'Password1' }, expected: false },
      { inputs: { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', password: 'short' }, expected: false },
    ])('validates form with inputs $inputs correctly', ({ inputs, expected }) => {
      fillOutForm(inputs);
      const isButtonDisabled = screen.getByRole('button', { name: BUTTON_TEXT }).hasAttribute('disabled');
      expect(isButtonDisabled).toBe(!expected);
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
      { password: 'nopassword', expected: false },
      { password: 'LOWERCASE123', expected: false },
      { password: 'uppercase123', expected: false },
      { password: 'NoNumber', expected: false },
      { password: 'Short1', expected: false },
      { password: 'ValidPassword1', expected: true },
    ])('validates password "$password" correctly', ({ password, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      const hasGreen = screen.getByText(/Minimum 8 characters/i).className.includes('green');
      expect(hasGreen).toBe(expected);
    });
  });

  describe('Email Validation Edge Cases', () => {
    test.each([
      { email: 'simple@example.com', expected: true },
      { email: 'very.common@example.com', expected: true },
      { email: 'disposable.style.email.with+symbol@example.com', expected: true },
      { email: 'other.email-with-dash@example.com', expected: true },
      { email: 'fully-qualified-domain@example.com', expected: true },
      { email: 'user.name+tag+sorting@example.com', expected: true },
      { email: 'x@example.com', expected: true }, // One-letter local-part
      { email: 'example-indeed@strange-example.com', expected: true },
      { email: 'admin@mailserver1', expected: false }, // local domain name with no TLD
      { email: 'example@s.solutions', expected: true }, // local domain name with TLD
      { email: 'john..doe@example.com', expected: false }, // double dot before @
      { email: 'john.doe@example..com', expected: false }, // double dot after @
      { email: 'a"b(c)d,e:f;g<h>i[j\k]l@example.com', expected: false }, // special characters in the local-part
      { email: 'just"not"right@example.com', expected: false }, // quoted strings must be dot separated or the only element making up the local-part
      { email: 'this is"not\allowed@example.com', expected: false }, // spaces, quotes, and backslashes may only exist when within quoted strings and preceded by a backslash
      { email: 'this\ still\"not\\allowed@example.com', expected: false }, // even if escaped (preceded by a backslash), spaces, quotes, and backslashes must still be contained by quotes
    ])('validates email "$email" correctly', ({ email, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      const isInvalidMessagePresent = screen.queryByText(/Please enter a valid email address/i) !== null;
      expect(isInvalidMessagePresent).toBe(!expected);
    });
  });

  describe('Form Validity with Various Inputs', () => {
    test.each([
      { inputs: { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', password: 'Password1' }, expected: true },
      { inputs: { firstName: '', lastName: 'Doe', email: 'john.doe@example.com', password: 'Password1' }, expected: false },
      { inputs: { firstName: 'John', lastName: '', email: 'john.doe@example.com', password: 'Password1' }, expected: false },
      { inputs: { firstName: 'John', lastName: 'Doe', email: '', password: 'Password1' }, expected: false },
      { inputs: { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', password: '' }, expected: false },
      { inputs: { firstName: 'John', lastName: 'Doe', email: 'invalid', password: 'Password1' }, expected: false },
      { inputs: { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', password: 'short' }, expected: false },
    ])('validates form with inputs $inputs correctly', ({ inputs, expected }) => {
      fillOutForm(inputs);
      const isButtonDisabled = screen.getByRole('button', { name: BUTTON_TEXT }).hasAttribute('disabled');
      expect(isButtonDisabled).toBe(!expected);
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
      { password: 'nopassword', expected: false },
      { password: 'LOWERCASE123', expected: false },
      { password: 'uppercase123', expected: false },
      { password: 'NoNumber', expected: false },
      { password: 'Short1', expected: false },
      { password: 'ValidPassword1', expected: true },
    ])('validates password "$password" correctly', ({ password, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      const hasGreen = screen.getByText(/Minimum 8 characters/i).className.includes('green');
      expect(hasGreen).toBe(expected);
    });
  });

  describe('Email Validation Edge Cases', () => {
    test.each([
      { email: 'simple@example.com', expected: true },
      { email: 'very.common@example.com', expected: true },
      { email: 'disposable.style.email.with+symbol@example.com', expected: true },
      { email: 'other.email-with-dash@example.com', expected: true },
      { email: 'fully-qualified-domain@example.com', expected: true },
      { email: 'user.name+tag+sorting@example.com', expected: true },
      { email: 'x@example.com', expected: true }, // One-letter local-part
      { email: 'example-indeed@strange-example.com', expected: true },
      { email: 'admin@mailserver1', expected: false }, // local domain name with no TLD
      { email: 'example@s.solutions', expected: true }, // local domain name with TLD
      { email: 'john..doe@example.com', expected: false }, // double dot before @
      { email: 'john.doe@example..com', expected: false }, // double dot after @
      { email: 'a"b(c)d,e:f;g<h>i[j\k]l@example.com', expected: false }, // special characters in the local-part
      { email: 'just"not"right@example.com', expected: false }, // quoted strings must be dot separated or the only element making up the local-part
      { email: 'this is"not\allowed@example.com', expected: false }, // spaces, quotes, and backslashes may only exist when within quoted strings and preceded by a backslash
      { email: 'this\ still\"not\\allowed@example.com', expected: false }, // even if escaped (preceded by a backslash), spaces, quotes, and backslashes must still be contained by quotes
    ])('validates email "$email" correctly', ({ email, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      const isInvalidMessagePresent = screen.queryByText(/Please enter a valid email address/i) !== null;
      expect(isInvalidMessagePresent).toBe(!expected);
    });
  });

  describe('Form Validity with Various Inputs', () => {
    test.each([
      { inputs: { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', password: 'Password1' }, expected: true },
      { inputs: { firstName: '', lastName: 'Doe', email: 'john.doe@example.com', password: 'Password1' }, expected: false },
      { inputs: { firstName: 'John', lastName: '', email: 'john.doe@example.com', password: 'Password1' }, expected: false },
      { inputs: { firstName: 'John', lastName: 'Doe', email: '', password: 'Password1' }, expected: false },
      { inputs: { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', password: '' }, expected: false },
      { inputs: { firstName: 'John', lastName: 'Doe', email: 'invalid', password: 'Password1' }, expected: false },
      { inputs: { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', password: 'short' }, expected: false },
    ])('validates form with inputs $inputs correctly', ({ inputs, expected }) => {
      fillOutForm(inputs);
      const isButtonDisabled = screen.getByRole('button', { name: BUTTON_TEXT }).hasAttribute('disabled');
      expect(isButtonDisabled).toBe(!expected);
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
      { password: 'nopassword', expected: false },
      { password: 'LOWERCASE123', expected: false },
      { password: 'uppercase123', expected: false },
      { password: 'NoNumber', expected: false },
      { password: 'Short1', expected: false },
      { password: 'ValidPassword1', expected: true },
    ])('validates password "$password" correctly', ({ password, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      const hasGreen = screen.getByText(/Minimum 8 characters/i).className.includes('green');
      expect(hasGreen).toBe(expected);
    });
  });

  describe('Email Validation Edge Cases', () => {
    test.each([
      { email: 'simple@example.com', expected: true },
      { email: 'very.common@example.com', expected: true },
      { email: 'disposable.style.email.with+symbol@example.com', expected: true },
      { email: 'other.email-with-dash@example.com', expected: true },
      { email: 'fully-qualified-domain@example.com', expected: true },
      { email: 'user.name+tag+sorting@example.com', expected: true },
      { email: 'x@example.com', expected: true }, // One-letter local-part
      { email: 'example-indeed@strange-example.com', expected: true },
      { email: 'admin@mailserver1', expected: false }, // local domain name with no TLD
      { email: 'example@s.solutions', expected: true }, // local domain name with TLD
      { email: 'john..doe@example.com', expected: false }, // double dot before @
      { email: 'john.doe@example..com', expected: false }, // double dot after @
      { email: 'a"b(c)d,e:f;g<h>i[j\k]l@example.com', expected: false }, // special characters in the local-part
      { email: 'just"not"right@example.com', expected: false }, // quoted strings must be dot separated or the only element making up the local-part
      { email: 'this is"not\allowed@example.com', expected: false }, // spaces, quotes, and backslashes may only exist when within quoted strings and preceded by a backslash
      { email: 'this\ still\"not\\allowed@example.com', expected: false }, // even if escaped (preceded by a backslash), spaces, quotes, and backslashes must still be contained by quotes
    ])('validates email "$email" correctly', ({ email, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      const isInvalidMessagePresent = screen.queryByText(/Please enter a valid email address/i) !== null;
      expect(isInvalidMessagePresent).toBe(!expected);
    });
  });

  describe('Form Validity with Various Inputs', () => {
    test.each([
      { inputs: { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', password: 'Password1' }, expected: true },
      { inputs: { firstName: '', lastName: 'Doe', email: 'john.doe@example.com', password: 'Password1' }, expected: false },
      { inputs: { firstName: 'John', lastName: '', email: 'john.doe@example.com', password: 'Password1' }, expected: false },
      { inputs: { firstName: 'John', lastName: 'Doe', email: '', password: 'Password1' }, expected: false },
      { inputs: { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', password: '' }, expected: false },
      { inputs: { firstName: 'John', lastName: 'Doe', email: 'invalid', password: 'Password1' }, expected: false },
      { inputs: { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', password: 'short' }, expected: false },
    ])('validates form with inputs $inputs correctly', ({ inputs, expected }) => {
      fillOutForm(inputs);
      const isButtonDisabled = screen.getByRole('button', { name: BUTTON_TEXT }).hasAttribute('disabled');
      expect(isButtonDisabled).toBe(!expected);
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
      { password: 'nopassword', expected: false },
      { password: 'LOWERCASE123', expected: false },
      { password: 'uppercase123', expected: false },
      { password: 'NoNumber', expected: false },
      { password: 'Short1', expected: false },
      { password: 'ValidPassword1', expected: true },
    ])('validates password "$password" correctly', ({ password, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      const hasGreen = screen.getByText(/Minimum 8 characters/i).className.includes('green');
      expect(hasGreen).toBe(expected);
    });
  });

  describe('Email Validation Edge Cases', () => {
    test.each([
      { email: 'simple@example.com', expected: true },
      { email: 'very.common@example.com', expected: true },
      { email: 'disposable.style.email.with+symbol@example.com', expected: true },
      { email: 'other.email-with-dash@example.com', expected: true },
      { email: 'fully-qualified-domain@example.com', expected: true },
      { email: 'user.name+tag+sorting@example.com', expected: true },
      { email: 'x@example.com', expected: true }, // One-letter local-part
      { email: 'example-indeed@strange-example.com', expected: true },
      { email: 'admin@mailserver1', expected: false }, // local domain name with no TLD
      { email: 'example@s.solutions', expected: true }, // local domain name with TLD
      { email: 'john..doe@example.com', expected: false }, // double dot before @
      { email: 'john.doe@example..com', expected: false }, // double dot after @
      { email: 'a"b(c)d,e:f;g<h>i[j\k]l@example.com', expected: false }, // special characters in the local-part
      { email: 'just"not"right@example.com', expected: false }, // quoted strings must be dot separated or the only element making up the local-part
      { email: 'this is"not\allowed@example.com', expected: false }, // spaces, quotes, and backslashes may only exist when within quoted strings and preceded by a backslash
      { email: 'this\ still\"not\\allowed@example.com', expected: false }, // even if escaped (preceded by a backslash), spaces, quotes, and backslashes must still be contained by quotes
    ])('validates email "$email" correctly', ({ email, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      const isInvalidMessagePresent = screen.queryByText(/Please enter a valid email address/i) !== null;
      expect(isInvalidMessagePresent).toBe(!expected);
    });
  });

  describe('Form Validity with Various Inputs', () => {
    test.each([
      { inputs: { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', password: 'Password1' }, expected: true },
      { inputs: { firstName: '', lastName: 'Doe', email: 'john.doe@example.com', password: 'Password1' }, expected: false },
      { inputs: { firstName: 'John', lastName: '', email: 'john.doe@example.com', password: 'Password1' }, expected: false },
      { inputs: { firstName: 'John', lastName: 'Doe', email: '', password: 'Password1' }, expected: false },
      { inputs: { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', password: '' }, expected: false },
      { inputs: { firstName: 'John', lastName: 'Doe', email: 'invalid', password: 'Password1' }, expected: false },
      { inputs: { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', password: 'short' }, expected: false },
    ])('validates form with inputs $inputs correctly', ({ inputs, expected }) => {
      fillOutForm(inputs);
      const isButtonDisabled = screen.getByRole('button', { name: BUTTON_TEXT }).hasAttribute('disabled');
      expect(isButtonDisabled).toBe(!expected);
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
      { password: 'nopassword', expected: false },
      { password: 'LOWERCASE123', expected: false },
      { password: 'uppercase123', expected: false },
      { password: 'NoNumber', expected: false },
      { password: 'Short1', expected: false },
      { password: 'ValidPassword1', expected: true },
    ])('validates password "$password" correctly', ({ password, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      const hasGreen = screen.getByText(/Minimum 8 characters/i).className.includes('green');
      expect(hasGreen).toBe(expected);
    });
  });

  describe('Email Validation Edge Cases', () => {
    test.each([
      { email: 'simple@example.com', expected: true },
      { email: 'very.common@example.com', expected: true },
      { email: 'disposable.style.email.with+symbol@example.com', expected: true },
      { email: 'other.email-with-dash@example.com', expected: true },
      { email: 'fully-qualified-domain@example.com', expected: true },
      { email: 'user.name+tag+sorting@example.com', expected: true },
      { email: 'x@example.com', expected: true }, // One-letter local-part
      { email: 'example-indeed@strange-example.com', expected: true },
      { email: 'admin@mailserver1', expected: false }, // local domain name with no TLD
      { email: 'example@s.solutions', expected: true }, // local domain name with TLD
      { email: 'john..doe@example.com', expected: false }, // double dot before @
      { email: 'john.doe@example..com', expected: false }, // double dot after @
      { email: 'a"b(c)d,e:f;g<h>i[j\k]l@example.com', expected: false }, // special characters in the local-part
      { email: 'just"not"right@example.com', expected: false }, // quoted strings must be dot separated or the only element making up the local-part
      { email: 'this is"not\allowed@example.com', expected: false }, // spaces, quotes, and backslashes may only exist when within quoted strings and preceded by a backslash
      { email: 'this\ still\"not\\allowed@example.com', expected: false }, // even if escaped (preceded by a backslash), spaces, quotes, and backslashes must still be contained by quotes
    ])('validates email "$email" correctly', ({ email, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      const isInvalidMessagePresent = screen.queryByText(/Please enter a valid email address/i) !== null;
      expect(isInvalidMessagePresent).toBe(!expected);
    });
  });

  describe('Form Validity with Various Inputs', () => {
    test.each([
      { inputs: { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', password: 'Password1' }, expected: true },
      { inputs: { firstName: '', lastName: 'Doe', email: 'john.doe@example.com', password: 'Password1' }, expected: false },
      { inputs: { firstName: 'John', lastName: '', email: 'john.doe@example.com', password: 'Password1' }, expected: false },
      { inputs: { firstName: 'John', lastName: 'Doe', email: '', password: 'Password1' }, expected: false },
      { inputs: { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', password: '' }, expected: false },
      { inputs: { firstName: 'John', lastName: 'Doe', email: 'invalid', password: 'Password1' }, expected: false },
      { inputs: { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', password: 'short' }, expected: false },
    ])('validates form with inputs $inputs correctly', ({ inputs, expected }) => {
      fillOutForm(inputs);
      const isButtonDisabled = screen.getByRole('button', { name: BUTTON_TEXT }).hasAttribute('disabled');
      expect(isButtonDisabled).toBe(!expected);
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
      { password: 'nopassword', expected: false },
      { password: 'LOWERCASE123', expected: false },
      { password: 'uppercase123', expected: false },
      { password: 'NoNumber', expected: false },
      { password: 'Short1', expected: false },
      { password: 'ValidPassword1', expected: true },
    ])('validates password "$password" correctly', ({ password, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      const hasGreen = screen.getByText(/Minimum 8 characters/i).className.includes('green');
      expect(hasGreen).toBe(expected);
    });
  });

  describe('Email Validation Edge Cases', () => {
    test.each([
      { email: 'simple@example.com', expected: true },
      { email: 'very.common@example.com', expected: true },
      { email: 'disposable.style.email.with+symbol@example.com', expected: true },
      { email: 'other.email-with-dash@example.com', expected: true },
      { email: 'fully-qualified-domain@example.com', expected: true },
      { email: 'user.name+tag+sorting@example.com', expected: true },
      { email: 'x@example.com', expected: true }, // One-letter local-part
      { email: 'example-indeed@strange-example.com', expected: true },
      { email: 'admin@mailserver1', expected: false }, // local domain name with no TLD
      { email: 'example@s.solutions', expected: true }, // local domain name with TLD
      { email: 'john..doe@example.com', expected: false }, // double dot before @
      { email: 'john.doe@example..com', expected: false }, // double dot after @
      { email: 'a"b(c)d,e:f;g<h>i[j\k]l@example.com', expected: false }, // special characters in the local-part
      { email: 'just"not"right@example.com', expected: false }, // quoted strings must be dot separated or the only element making up the local-part
      { email: 'this is"not\allowed@example.com', expected: false }, // spaces, quotes, and backslashes may only exist when within quoted strings and preceded by a backslash
      { email: 'this\ still\"not\\allowed@example.com', expected: false }, // even if escaped (preceded by a backslash), spaces, quotes, and backslashes must still be contained by quotes
    ])('validates email "$email" correctly', ({ email, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      const isInvalidMessagePresent = screen.queryByText(/Please enter a valid email address/i) !== null;
      expect(isInvalidMessagePresent).toBe(!expected);
    });
  });

  describe('Form Validity with Various Inputs', () => {
    test.each([
      { inputs: { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', password: 'Password1' }, expected: true },
      { inputs: { firstName: '', lastName: 'Doe', email: 'john.doe@example.com', password: 'Password1' }, expected: false },
      { inputs: { firstName: 'John', lastName: '', email: 'john.doe@example.com', password: 'Password1' }, expected: false },
      { inputs: { firstName: 'John', lastName: 'Doe', email: '', password: 'Password1' }, expected: false },
      { inputs: { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', password: '' }, expected: false },
      { inputs: { firstName: 'John', lastName: 'Doe', email: 'invalid', password: 'Password1' }, expected: false },
      { inputs: { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', password: 'short' }, expected: false },
    ])('validates form with inputs $inputs correctly', ({ inputs, expected }) => {
      fillOutForm(inputs);
      const isButtonDisabled = screen.getByRole('button', { name: BUTTON_TEXT }).hasAttribute('disabled');
      expect(isButtonDisabled).toBe(!expected);
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
      { password: 'nopassword', expected: false },
      { password: 'LOWERCASE123', expected: false },
      { password: 'uppercase123', expected: false },
      { password: 'NoNumber', expected: false },
      { password: 'Short1', expected: false },
      { password: 'ValidPassword1', expected: true },
    ])('validates password "$password" correctly', ({ password, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      const hasGreen = screen.getByText(/Minimum 8 characters/i).className.includes('green');
      expect(hasGreen).toBe(expected);
    });
  });

  describe('Email Validation Edge Cases', () => {
    test.each([
      { email: 'simple@example.com', expected: true },
      { email: 'very.common@example.com', expected: true },
      { email: 'disposable.style.email.with+symbol@example.com', expected: true },
      { email: 'other.email-with-dash@example.com', expected: true },
      { email: 'fully-qualified-domain@example.com', expected: true },
      { email: 'user.name+tag+sorting@example.com', expected: true },
      { email: 'x@example.com', expected: true }, // One-letter local-part
      { email: 'example-indeed@strange-example.com', expected: true },
      { email: 'admin@mailserver1', expected: false }, // local domain name with no TLD
      { email: 'example@s.solutions', expected: true }, // local domain name with TLD
      { email: 'john..doe@example.com', expected: false }, // double dot before @
      { email: 'john.doe@example..com', expected: false }, // double dot after @
      { email: 'a"b(c)d,e:f;g<h>i[j\k]l@example.com', expected: false }, // special characters in the local-part
      { email: 'just"not"right@example.com', expected: false }, // quoted strings must be dot separated or the only element making up the local-part
      { email: 'this is"not\allowed@example.com', expected: false }, // spaces, quotes, and backslashes may only exist when within quoted strings and preceded by a backslash
      { email: 'this\ still\"not\\allowed@example.com', expected: false }, // even if escaped (preceded by a backslash), spaces, quotes, and backslashes must still be contained by quotes
    ])('validates email "$email" correctly', ({ email, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      const isInvalidMessagePresent = screen.queryByText(/Please enter a valid email address/i) !== null;
      expect(isInvalidMessagePresent).toBe(!expected);
    });
  });

  describe('Form Validity with Various Inputs', () => {
    test.each([
      { inputs: { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', password: 'Password1' }, expected: true },
      { inputs: { firstName: '', lastName: 'Doe', email: 'john.doe@example.com', password: 'Password1' }, expected: false },
      { inputs: { firstName: 'John', lastName: '', email: 'john.doe@example.com', password: 'Password1' }, expected: false },
      { inputs: { firstName: 'John', lastName: 'Doe', email: '', password: 'Password1' }, expected: false },
      { inputs: { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', password: '' }, expected: false },
      { inputs: { firstName: 'John', lastName: 'Doe', email: 'invalid', password: 'Password1' }, expected: false },
      { inputs: { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', password: 'short' }, expected: false },
    ])('validates form with inputs $inputs correctly', ({ inputs, expected }) => {
      fillOutForm(inputs);
      const isButtonDisabled = screen.getByRole('button', { name: BUTTON_TEXT }).hasAttribute('disabled');
      expect(isButtonDisabled).toBe(!expected);
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
      { password: 'nopassword', expected: false },
      { password: 'LOWERCASE123', expected: false },
      { password: 'uppercase123', expected: false },
      { password: 'NoNumber', expected: false },
      { password: 'Short1', expected: false },
      { password: 'ValidPassword1', expected: true },
    ])('validates password "$password" correctly', ({ password, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      const hasGreen = screen.getByText(/Minimum 8 characters/i).className.includes('green');
      expect(hasGreen).toBe(expected);
    });
  });

  describe('Email Validation Edge Cases', () => {
    test.each([
      { email: 'simple@example.com', expected: true },
      { email: 'very.common@example.com', expected: true },
      { email: 'disposable.style.email.with+symbol@example.com', expected: true },
      { email: 'other.email-with-dash@example.com', expected: true },
      { email: 'fully-qualified-domain@example.com', expected: true },
      { email: 'user.name+tag+sorting@example.com', expected: true },
      { email: 'x@example.com', expected: true }, // One-letter local-part
      { email: 'example-indeed@strange-example.com', expected: true },
      { email: 'admin@mailserver1', expected: false }, // local domain name with no TLD
      { email: 'example@s.solutions', expected: true }, // local domain name with TLD
      { email: 'john..doe@example.com', expected: false }, // double dot before @
      { email: 'john.doe@example..com', expected: false }, // double dot after @
      { email: 'a"b(c)d,e:f;g<h>i[j\k]l@example.com', expected: false }, // special characters in the local-part
      { email: 'just"not"right@example.com', expected: false }, // quoted strings must be dot separated or the only element making up the local-part
      { email: 'this is"not\allowed@example.com', expected: false }, // spaces, quotes, and backslashes may only exist when within quoted strings and preceded by a backslash
      { email: 'this\ still\"not\\allowed@example.com', expected: false }, // even if escaped (preceded by a backslash), spaces, quotes, and backslashes must still be contained by quotes
    ])('validates email "$email" correctly', ({ email, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      const isInvalidMessagePresent = screen.queryByText(/Please enter a valid email address/i) !== null;
      expect(isInvalidMessagePresent).toBe(!expected);
    });
  });

  describe('Form Validity with Various Inputs', () => {
    test.each([
      { inputs: { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', password: 'Password1' }, expected: true },
      { inputs: { firstName: '', lastName: 'Doe', email: 'john.doe@example.com', password: 'Password1' }, expected: false },
      { inputs: { firstName: 'John', lastName: '', email: 'john.doe@example.com', password: 'Password1' }, expected: false },
      { inputs: { firstName: 'John', lastName: 'Doe', email: '', password: 'Password1' }, expected: false },
      { inputs: { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', password: '' }, expected: false },
      { inputs: { firstName: 'John', lastName: 'Doe', email: 'invalid', password: 'Password1' }, expected: false },
      { inputs: { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', password: 'short' }, expected: false },
    ])('validates form with inputs $inputs correctly', ({ inputs, expected }) => {
      fillOutForm(inputs);
      const isButtonDisabled = screen.getByRole('button', { name: BUTTON_TEXT }).hasAttribute('disabled');
      expect(isButtonDisabled).toBe(!expected);
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
      { password: 'nopassword', expected: false },
      { password: 'LOWERCASE123', expected: false },
      { password: 'uppercase123', expected: false },
      { password: 'NoNumber', expected: false },
      { password: 'Short1', expected: false },
      { password: 'ValidPassword1', expected: true },
    ])('validates password "$password" correctly', ({ password, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      const hasGreen = screen.getByText(/Minimum 8 characters/i).className.includes('green');
      expect(hasGreen).toBe(expected);
    });
  });

  describe('Email Validation Edge Cases', () => {
    test.each([
      { email: 'simple@example.com', expected: true },
      { email: 'very.common@example.com', expected: true },
      { email: 'disposable.style.email.with+symbol@example.com', expected: true },
      { email: 'other.email-with-dash@example.com', expected: true },
      { email: 'fully-qualified-domain@example.com', expected: true },
      { email: 'user.name+tag+sorting@example.com', expected: true },
      { email: 'x@example.com', expected: true }, // One-letter local-part
      { email: 'example-indeed@strange-example.com', expected: true },
      { email: 'admin@mailserver1', expected: false }, // local domain name with no TLD
      { email: 'example@s.solutions', expected: true }, // local domain name with TLD
      { email: 'john..doe@example.com', expected: false }, // double dot before @
      { email: 'john.doe@example..com', expected: false }, // double dot after @
      { email: 'a"b(c)d,e:f;g<h>i[j\k]l@example.com', expected: false }, // special characters in the local-part
      { email: 'just"not"right@example.com', expected: false }, // quoted strings must be dot separated or the only element making up the local-part
      { email: 'this is"not\allowed@example.com', expected: false }, // spaces, quotes, and backslashes may only exist when within quoted strings and preceded by a backslash
      { email: 'this\ still\"not\\allowed@example.com', expected: false }, // even if escaped (preceded by a backslash), spaces, quotes, and backslashes must still be contained by quotes
    ])('validates email "$email" correctly', ({ email, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      const isInvalidMessagePresent = screen.queryByText(/Please enter a valid email address/i) !== null;
      expect(isInvalidMessagePresent).toBe(!expected);
    });
  });

  describe('Form Validity with Various Inputs', () => {
    test.each([
      { inputs: { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', password: 'Password1' }, expected: true },
      { inputs: { firstName: '', lastName: 'Doe', email: 'john.doe@example.com', password: 'Password1' }, expected: false },
      { inputs: { firstName: 'John', lastName: '', email: 'john.doe@example.com', password: 'Password1' }, expected: false },
      { inputs: { firstName: 'John', lastName: 'Doe', email: '', password: 'Password1' }, expected: false },
      { inputs: { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', password: '' }, expected: false },
      { inputs: { firstName: 'John', lastName: 'Doe', email: 'invalid', password: 'Password1' }, expected: false },
      { inputs: { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', password: 'short' }, expected: false },
    ])('validates form with inputs $inputs correctly', ({ inputs, expected }) => {
      fillOutForm(inputs);
      const isButtonDisabled = screen.getByRole('button', { name: BUTTON_TEXT }).hasAttribute('disabled');
      expect(isButtonDisabled).toBe(!expected);
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
      { password: 'nopassword', expected: false },
      { password: 'LOWERCASE123', expected: false },
      { password: 'uppercase123', expected: false },
      { password: 'NoNumber', expected: false },
      { password: 'Short1', expected: false },
      { password: 'ValidPassword1', expected: true },
    ])('validates password "$password" correctly', ({ password, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      const hasGreen = screen.getByText(/Minimum 8 characters/i).className.includes('green');
      expect(hasGreen).toBe(expected);
    });
  });

  describe('Email Validation Edge Cases', () => {
    test.each([
      { email: 'simple@example.com', expected: true },
      { email: 'very.common@example.com', expected: true },
      { email: 'disposable.style.email.with+symbol@example.com', expected: true },
      { email: 'other.email-with-dash@example.com', expected: true },
      { email: 'fully-qualified-domain@example.com', expected: true },
      { email: 'user.name+tag+sorting@example.com', expected: true },
      { email: 'x@example.com', expected: true }, // One-letter local-part
      { email: 'example-indeed@strange-example.com', expected: true },
      { email: 'admin@mailserver1', expected: false }, // local domain name with no TLD
      { email: 'example@s.solutions', expected: true }, // local domain name with TLD
      { email: 'john..doe@example.com', expected: false }, // double dot before @
      { email: 'john.doe@example..com', expected: false }, // double dot after @
      { email: 'a"b(c)d,e:f;g<h>i[j\k]l@example.com', expected: false }, // special characters in the local-part
      { email: 'just"not"right@example.com', expected: false }, // quoted strings must be dot separated or the only element making up the local-part
      { email: 'this is"not\allowed@example.com', expected: false }, // spaces, quotes, and backslashes may only exist when within quoted strings and preceded by a backslash
      { email: 'this\ still\"not\\allowed@example.com', expected: false }, // even if escaped (preceded by a backslash), spaces, quotes, and backslashes must still be contained by quotes
    ])('validates email "$email" correctly', ({ email, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      const isInvalidMessagePresent = screen.queryByText(/Please enter a valid email address/i) !== null;
      expect(isInvalidMessagePresent).toBe(!expected);
    });
  });

  describe('Form Validity with Various Inputs', () => {
    test.each([
      { inputs: { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', password: 'Password1' }, expected: true },
      { inputs: { firstName: '', lastName: 'Doe', email: 'john.doe@example.com', password: 'Password1' }, expected: false },
      { inputs: { firstName: 'John', lastName: '', email: 'john.doe@example.com', password: 'Password1' }, expected: false },
      { inputs: { firstName: 'John', lastName: 'Doe', email: '', password: 'Password1' }, expected: false },
      { inputs: { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', password: '' }, expected: false },
      { inputs: { firstName: 'John', lastName: 'Doe', email: 'invalid', password: 'Password1' }, expected: false },
      { inputs: { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', password: 'short' }, expected: false },
    ])('validates form with inputs $inputs correctly', ({ inputs, expected }) => {
      fillOutForm(inputs);
      const isButtonDisabled = screen.getByRole('button', { name: BUTTON_TEXT }).hasAttribute('disabled');
      expect(isButtonDisabled).toBe(!expected);
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
      { password: 'nopassword', expected: false },
      { password: 'LOWERCASE123', expected: false },
      { password: 'uppercase123', expected: false },
      { password: 'NoNumber', expected: false },
      { password: 'Short1', expected: false },
      { password: 'ValidPassword1', expected: true },
    ])('validates password "$password" correctly', ({ password, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      const hasGreen = screen.getByText(/Minimum 8 characters/i).className.includes('green');
      expect(hasGreen).toBe(expected);
    });
  });

  describe('Email Validation Edge Cases', () => {
    test.each([
      { email: 'simple@example.com', expected: true },
      { email: 'very.common@example.com', expected: true },
      { email: 'disposable.style.email.with+symbol@example.com', expected: true },
      { email: 'other.email-with-dash@example.com', expected: true },
      { email: 'fully-qualified-domain@example.com', expected: true },
      { email: 'user.name+tag+sorting@example.com', expected: true },
      { email: 'x@example.com', expected: true }, // One-letter local-part
      { email: 'example-indeed@strange-example.com', expected: true },
      { email: 'admin@mailserver1', expected: false }, // local domain name with no TLD
      { email: 'example@s.solutions', expected: true }, // local domain name with TLD
      { email: 'john..doe@example.com', expected: false }, // double dot before @
      { email: 'john.doe@example..com', expected: false }, // double dot after @
      { email: 'a"b(c)d,e:f;g<h>i[j\k]l@example.com', expected: false }, // special characters in the local-part
      { email: 'just"not"right@example.com', expected: false }, // quoted strings must be dot separated or the only element making up the local-part
      { email: 'this is"not\allowed@example.com', expected: false }, // spaces, quotes, and backslashes may only exist when within quoted strings and preceded by a backslash
      { email: 'this\ still\"not\\allowed@example.com', expected: false }, // even if escaped (preceded by a backslash), spaces, quotes, and backslashes must still be contained by quotes
    ])('validates email "$email" correctly', ({ email, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      const isInvalidMessagePresent = screen.queryByText(/Please enter a valid email address/i) !== null;
      expect(isInvalidMessagePresent).toBe(!expected);
    });
  });

  describe('Form Validity with Various Inputs', () => {
    test.each([
      { inputs: { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', password: 'Password1' }, expected: true },
      { inputs: { firstName: '', lastName: 'Doe', email: 'john.doe@example.com', password: 'Password1' }, expected: false },
      { inputs: { firstName: 'John', lastName: '', email: 'john.doe@example.com', password: 'Password1' }, expected: false },
      { inputs: { firstName: 'John', lastName: 'Doe', email: '', password: 'Password1' }, expected: false },
      { inputs: { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', password: '' }, expected: false },
      { inputs: { firstName: 'John', lastName: 'Doe', email: 'invalid', password: 'Password1' }, expected: false },
      { inputs: { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', password: 'short' }, expected: false },
    ])('validates form with inputs $inputs correctly', ({ inputs, expected }) => {
      fillOutForm(inputs);
      const isButtonDisabled = screen.getByRole('button', { name: BUTTON_TEXT }).hasAttribute('disabled');
      expect(isButtonDisabled).toBe(!expected);
    });
  });
});
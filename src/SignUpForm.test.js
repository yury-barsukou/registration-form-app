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

  fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: formData.firstName } // Additional tests to cover missing scenarios

describe('SignUpForm - Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Password validation edge cases', () => {
    test.each([
      { password: 'alllowercase1', desc: 'all lowercase with number', uppercase: 'red', lowercase: 'green', number: 'green', length: 'green' },
      { password: 'ALLUPPERCASE1', desc: 'all uppercase with number', uppercase: 'green', lowercase: 'red', number: 'green', length: 'green' },
      { password: 'NoNumbers', desc: 'missing number', uppercase: 'green', lowercase: 'green', number: 'red', length: 'green' },
      { password: '12345678', desc: 'only numbers', uppercase: 'red', lowercase: 'red', number: 'green', length: 'green' },
      { password: 'Short1', desc: 'short password with number and uppercase', uppercase: 'green', lowercase: 'green', number: 'green', length: 'red' }
    ])('validates password for $desc', ({ password, uppercase, lowercase, number, length }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(uppercase);
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(lowercase);
      expect(screen.getByText(/1 number/i).className).toMatch(number);
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(length);
    });
  });

  describe('Email validation edge cases', () => {
    test.each([
      { email: 'plainaddress', valid: false },
      { email: '@missingusername.com', valid: false },
      { email: 'test@localhost', valid: false },
      { email: 'username@.com.my', valid: false },
      { email: 'username123@yahoo.com', valid: true },
      { email: 'username.name@domain.com', valid: true },
      { email: 'user.name+tag+sorting@example.com', valid: true }
    ])('validates email $email as $valid', ({ email, valid }) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      const validationMessage = screen.queryByText(/Please enter a valid email address/i);
      if (valid) {
        expect(validationMessage).toBeNull();
      } else {
        expect(validationMessage).toBeInTheDocument();
      }
    });
  });

  describe('Form field limits and constraints', () => {
    test.each([
      { field: 'firstName', maxLength: 50 },
      { field: 'lastName', maxLength: 50 }
    ])('validates $field length not exceeding maxLength', ({ field, maxLength }) => {
      const input = screen.getByLabelText(LABELS[field]);
      const longString = 'a'.repeat(maxLength + 1);
      fireEvent.change(input, { target: { value: longString } });
      expect(input.value.length).toBe(maxLength);
    });
  });
});

});
  fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: formData.lastName } // Additional tests to cover missing scenarios

describe('SignUpForm - Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Password validation edge cases', () => {
    test.each([
      { password: 'alllowercase1', desc: 'all lowercase with number', uppercase: 'red', lowercase: 'green', number: 'green', length: 'green' },
      { password: 'ALLUPPERCASE1', desc: 'all uppercase with number', uppercase: 'green', lowercase: 'red', number: 'green', length: 'green' },
      { password: 'NoNumbers', desc: 'missing number', uppercase: 'green', lowercase: 'green', number: 'red', length: 'green' },
      { password: '12345678', desc: 'only numbers', uppercase: 'red', lowercase: 'red', number: 'green', length: 'green' },
      { password: 'Short1', desc: 'short password with number and uppercase', uppercase: 'green', lowercase: 'green', number: 'green', length: 'red' }
    ])('validates password for $desc', ({ password, uppercase, lowercase, number, length }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(uppercase);
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(lowercase);
      expect(screen.getByText(/1 number/i).className).toMatch(number);
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(length);
    });
  });

  describe('Email validation edge cases', () => {
    test.each([
      { email: 'plainaddress', valid: false },
      { email: '@missingusername.com', valid: false },
      { email: 'test@localhost', valid: false },
      { email: 'username@.com.my', valid: false },
      { email: 'username123@yahoo.com', valid: true },
      { email: 'username.name@domain.com', valid: true },
      { email: 'user.name+tag+sorting@example.com', valid: true }
    ])('validates email $email as $valid', ({ email, valid }) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      const validationMessage = screen.queryByText(/Please enter a valid email address/i);
      if (valid) {
        expect(validationMessage).toBeNull();
      } else {
        expect(validationMessage).toBeInTheDocument();
      }
    });
  });

  describe('Form field limits and constraints', () => {
    test.each([
      { field: 'firstName', maxLength: 50 },
      { field: 'lastName', maxLength: 50 }
    ])('validates $field length not exceeding maxLength', ({ field, maxLength }) => {
      const input = screen.getByLabelText(LABELS[field]);
      const longString = 'a'.repeat(maxLength + 1);
      fireEvent.change(input, { target: { value: longString } });
      expect(input.value.length).toBe(maxLength);
    });
  });
});

});
  fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: formData.email } // Additional tests to cover missing scenarios

describe('SignUpForm - Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Password validation edge cases', () => {
    test.each([
      { password: 'alllowercase1', desc: 'all lowercase with number', uppercase: 'red', lowercase: 'green', number: 'green', length: 'green' },
      { password: 'ALLUPPERCASE1', desc: 'all uppercase with number', uppercase: 'green', lowercase: 'red', number: 'green', length: 'green' },
      { password: 'NoNumbers', desc: 'missing number', uppercase: 'green', lowercase: 'green', number: 'red', length: 'green' },
      { password: '12345678', desc: 'only numbers', uppercase: 'red', lowercase: 'red', number: 'green', length: 'green' },
      { password: 'Short1', desc: 'short password with number and uppercase', uppercase: 'green', lowercase: 'green', number: 'green', length: 'red' }
    ])('validates password for $desc', ({ password, uppercase, lowercase, number, length }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(uppercase);
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(lowercase);
      expect(screen.getByText(/1 number/i).className).toMatch(number);
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(length);
    });
  });

  describe('Email validation edge cases', () => {
    test.each([
      { email: 'plainaddress', valid: false },
      { email: '@missingusername.com', valid: false },
      { email: 'test@localhost', valid: false },
      { email: 'username@.com.my', valid: false },
      { email: 'username123@yahoo.com', valid: true },
      { email: 'username.name@domain.com', valid: true },
      { email: 'user.name+tag+sorting@example.com', valid: true }
    ])('validates email $email as $valid', ({ email, valid }) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      const validationMessage = screen.queryByText(/Please enter a valid email address/i);
      if (valid) {
        expect(validationMessage).toBeNull();
      } else {
        expect(validationMessage).toBeInTheDocument();
      }
    });
  });

  describe('Form field limits and constraints', () => {
    test.each([
      { field: 'firstName', maxLength: 50 },
      { field: 'lastName', maxLength: 50 }
    ])('validates $field length not exceeding maxLength', ({ field, maxLength }) => {
      const input = screen.getByLabelText(LABELS[field]);
      const longString = 'a'.repeat(maxLength + 1);
      fireEvent.change(input, { target: { value: longString } });
      expect(input.value.length).toBe(maxLength);
    });
  });
});

});
  fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: formData.password } // Additional tests to cover missing scenarios

describe('SignUpForm - Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Password validation edge cases', () => {
    test.each([
      { password: 'alllowercase1', desc: 'all lowercase with number', uppercase: 'red', lowercase: 'green', number: 'green', length: 'green' },
      { password: 'ALLUPPERCASE1', desc: 'all uppercase with number', uppercase: 'green', lowercase: 'red', number: 'green', length: 'green' },
      { password: 'NoNumbers', desc: 'missing number', uppercase: 'green', lowercase: 'green', number: 'red', length: 'green' },
      { password: '12345678', desc: 'only numbers', uppercase: 'red', lowercase: 'red', number: 'green', length: 'green' },
      { password: 'Short1', desc: 'short password with number and uppercase', uppercase: 'green', lowercase: 'green', number: 'green', length: 'red' }
    ])('validates password for $desc', ({ password, uppercase, lowercase, number, length }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(uppercase);
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(lowercase);
      expect(screen.getByText(/1 number/i).className).toMatch(number);
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(length);
    });
  });

  describe('Email validation edge cases', () => {
    test.each([
      { email: 'plainaddress', valid: false },
      { email: '@missingusername.com', valid: false },
      { email: 'test@localhost', valid: false },
      { email: 'username@.com.my', valid: false },
      { email: 'username123@yahoo.com', valid: true },
      { email: 'username.name@domain.com', valid: true },
      { email: 'user.name+tag+sorting@example.com', valid: true }
    ])('validates email $email as $valid', ({ email, valid }) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      const validationMessage = screen.queryByText(/Please enter a valid email address/i);
      if (valid) {
        expect(validationMessage).toBeNull();
      } else {
        expect(validationMessage).toBeInTheDocument();
      }
    });
  });

  describe('Form field limits and constraints', () => {
    test.each([
      { field: 'firstName', maxLength: 50 },
      { field: 'lastName', maxLength: 50 }
    ])('validates $field length not exceeding maxLength', ({ field, maxLength }) => {
      const input = screen.getByLabelText(LABELS[field]);
      const longString = 'a'.repeat(maxLength + 1);
      fireEvent.change(input, { target: { value: longString } });
      expect(input.value.length).toBe(maxLength);
    });
  });
});

});

  return formData;
};

describe('SignUpForm', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  // Additional tests to cover missing scenarios

describe('SignUpForm - Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Password validation edge cases', () => {
    test.each([
      { password: 'alllowercase1', desc: 'all lowercase with number', uppercase: 'red', lowercase: 'green', number: 'green', length: 'green' },
      { password: 'ALLUPPERCASE1', desc: 'all uppercase with number', uppercase: 'green', lowercase: 'red', number: 'green', length: 'green' },
      { password: 'NoNumbers', desc: 'missing number', uppercase: 'green', lowercase: 'green', number: 'red', length: 'green' },
      { password: '12345678', desc: 'only numbers', uppercase: 'red', lowercase: 'red', number: 'green', length: 'green' },
      { password: 'Short1', desc: 'short password with number and uppercase', uppercase: 'green', lowercase: 'green', number: 'green', length: 'red' }
    ])('validates password for $desc', ({ password, uppercase, lowercase, number, length }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(uppercase);
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(lowercase);
      expect(screen.getByText(/1 number/i).className).toMatch(number);
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(length);
    });
  });

  describe('Email validation edge cases', () => {
    test.each([
      { email: 'plainaddress', valid: false },
      { email: '@missingusername.com', valid: false },
      { email: 'test@localhost', valid: false },
      { email: 'username@.com.my', valid: false },
      { email: 'username123@yahoo.com', valid: true },
      { email: 'username.name@domain.com', valid: true },
      { email: 'user.name+tag+sorting@example.com', valid: true }
    ])('validates email $email as $valid', ({ email, valid }) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      const validationMessage = screen.queryByText(/Please enter a valid email address/i);
      if (valid) {
        expect(validationMessage).toBeNull();
      } else {
        expect(validationMessage).toBeInTheDocument();
      }
    });
  });

  describe('Form field limits and constraints', () => {
    test.each([
      { field: 'firstName', maxLength: 50 },
      { field: 'lastName', maxLength: 50 }
    ])('validates $field length not exceeding maxLength', ({ field, maxLength }) => {
      const input = screen.getByLabelText(LABELS[field]);
      const longString = 'a'.repeat(maxLength + 1);
      fireEvent.change(input, { target: { value: longString } });
      expect(input.value.length).toBe(maxLength);
    });
  });
});

});

  test('renders the sign-up form with all fields', () => {
    expect(screen.getByLabelText(LABELS.firstName)).toBeInTheDocument();
    expect(screen.getByLabelText(LABELS.lastName)).toBeInTheDocument();
    expect(screen.getByLabelText(LABELS.email)).toBeInTheDocument();
    expect(screen.getByLabelText(LABELS.password)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeInTheDocument();
  // Additional tests to cover missing scenarios

describe('SignUpForm - Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Password validation edge cases', () => {
    test.each([
      { password: 'alllowercase1', desc: 'all lowercase with number', uppercase: 'red', lowercase: 'green', number: 'green', length: 'green' },
      { password: 'ALLUPPERCASE1', desc: 'all uppercase with number', uppercase: 'green', lowercase: 'red', number: 'green', length: 'green' },
      { password: 'NoNumbers', desc: 'missing number', uppercase: 'green', lowercase: 'green', number: 'red', length: 'green' },
      { password: '12345678', desc: 'only numbers', uppercase: 'red', lowercase: 'red', number: 'green', length: 'green' },
      { password: 'Short1', desc: 'short password with number and uppercase', uppercase: 'green', lowercase: 'green', number: 'green', length: 'red' }
    ])('validates password for $desc', ({ password, uppercase, lowercase, number, length }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(uppercase);
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(lowercase);
      expect(screen.getByText(/1 number/i).className).toMatch(number);
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(length);
    });
  });

  describe('Email validation edge cases', () => {
    test.each([
      { email: 'plainaddress', valid: false },
      { email: '@missingusername.com', valid: false },
      { email: 'test@localhost', valid: false },
      { email: 'username@.com.my', valid: false },
      { email: 'username123@yahoo.com', valid: true },
      { email: 'username.name@domain.com', valid: true },
      { email: 'user.name+tag+sorting@example.com', valid: true }
    ])('validates email $email as $valid', ({ email, valid }) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      const validationMessage = screen.queryByText(/Please enter a valid email address/i);
      if (valid) {
        expect(validationMessage).toBeNull();
      } else {
        expect(validationMessage).toBeInTheDocument();
      }
    });
  });

  describe('Form field limits and constraints', () => {
    test.each([
      { field: 'firstName', maxLength: 50 },
      { field: 'lastName', maxLength: 50 }
    ])('validates $field length not exceeding maxLength', ({ field, maxLength }) => {
      const input = screen.getByLabelText(LABELS[field]);
      const longString = 'a'.repeat(maxLength + 1);
      fireEvent.change(input, { target: { value: longString } });
      expect(input.value.length).toBe(maxLength);
    });
  });
});

});

  describe('Field Entry', () => {
    test.each(Object.entries(LABELS))('allows entry of %s', (fieldName, labelRegex) => {
      const value = 'TestValue';
      fireEvent.change(screen.getByLabelText(labelRegex), { target: { value } // Additional tests to cover missing scenarios

describe('SignUpForm - Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Password validation edge cases', () => {
    test.each([
      { password: 'alllowercase1', desc: 'all lowercase with number', uppercase: 'red', lowercase: 'green', number: 'green', length: 'green' },
      { password: 'ALLUPPERCASE1', desc: 'all uppercase with number', uppercase: 'green', lowercase: 'red', number: 'green', length: 'green' },
      { password: 'NoNumbers', desc: 'missing number', uppercase: 'green', lowercase: 'green', number: 'red', length: 'green' },
      { password: '12345678', desc: 'only numbers', uppercase: 'red', lowercase: 'red', number: 'green', length: 'green' },
      { password: 'Short1', desc: 'short password with number and uppercase', uppercase: 'green', lowercase: 'green', number: 'green', length: 'red' }
    ])('validates password for $desc', ({ password, uppercase, lowercase, number, length }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(uppercase);
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(lowercase);
      expect(screen.getByText(/1 number/i).className).toMatch(number);
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(length);
    });
  });

  describe('Email validation edge cases', () => {
    test.each([
      { email: 'plainaddress', valid: false },
      { email: '@missingusername.com', valid: false },
      { email: 'test@localhost', valid: false },
      { email: 'username@.com.my', valid: false },
      { email: 'username123@yahoo.com', valid: true },
      { email: 'username.name@domain.com', valid: true },
      { email: 'user.name+tag+sorting@example.com', valid: true }
    ])('validates email $email as $valid', ({ email, valid }) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      const validationMessage = screen.queryByText(/Please enter a valid email address/i);
      if (valid) {
        expect(validationMessage).toBeNull();
      } else {
        expect(validationMessage).toBeInTheDocument();
      }
    });
  });

  describe('Form field limits and constraints', () => {
    test.each([
      { field: 'firstName', maxLength: 50 },
      { field: 'lastName', maxLength: 50 }
    ])('validates $field length not exceeding maxLength', ({ field, maxLength }) => {
      const input = screen.getByLabelText(LABELS[field]);
      const longString = 'a'.repeat(maxLength + 1);
      fireEvent.change(input, { target: { value: longString } });
      expect(input.value.length).toBe(maxLength);
    });
  });
});

});
      expect(screen.getByLabelText(labelRegex)).toHaveValue(value);
    // Additional tests to cover missing scenarios

describe('SignUpForm - Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Password validation edge cases', () => {
    test.each([
      { password: 'alllowercase1', desc: 'all lowercase with number', uppercase: 'red', lowercase: 'green', number: 'green', length: 'green' },
      { password: 'ALLUPPERCASE1', desc: 'all uppercase with number', uppercase: 'green', lowercase: 'red', number: 'green', length: 'green' },
      { password: 'NoNumbers', desc: 'missing number', uppercase: 'green', lowercase: 'green', number: 'red', length: 'green' },
      { password: '12345678', desc: 'only numbers', uppercase: 'red', lowercase: 'red', number: 'green', length: 'green' },
      { password: 'Short1', desc: 'short password with number and uppercase', uppercase: 'green', lowercase: 'green', number: 'green', length: 'red' }
    ])('validates password for $desc', ({ password, uppercase, lowercase, number, length }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(uppercase);
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(lowercase);
      expect(screen.getByText(/1 number/i).className).toMatch(number);
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(length);
    });
  });

  describe('Email validation edge cases', () => {
    test.each([
      { email: 'plainaddress', valid: false },
      { email: '@missingusername.com', valid: false },
      { email: 'test@localhost', valid: false },
      { email: 'username@.com.my', valid: false },
      { email: 'username123@yahoo.com', valid: true },
      { email: 'username.name@domain.com', valid: true },
      { email: 'user.name+tag+sorting@example.com', valid: true }
    ])('validates email $email as $valid', ({ email, valid }) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      const validationMessage = screen.queryByText(/Please enter a valid email address/i);
      if (valid) {
        expect(validationMessage).toBeNull();
      } else {
        expect(validationMessage).toBeInTheDocument();
      }
    });
  });

  describe('Form field limits and constraints', () => {
    test.each([
      { field: 'firstName', maxLength: 50 },
      { field: 'lastName', maxLength: 50 }
    ])('validates $field length not exceeding maxLength', ({ field, maxLength }) => {
      const input = screen.getByLabelText(LABELS[field]);
      const longString = 'a'.repeat(maxLength + 1);
      fireEvent.change(input, { target: { value: longString } });
      expect(input.value.length).toBe(maxLength);
    });
  });
});

});
  // Additional tests to cover missing scenarios

describe('SignUpForm - Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Password validation edge cases', () => {
    test.each([
      { password: 'alllowercase1', desc: 'all lowercase with number', uppercase: 'red', lowercase: 'green', number: 'green', length: 'green' },
      { password: 'ALLUPPERCASE1', desc: 'all uppercase with number', uppercase: 'green', lowercase: 'red', number: 'green', length: 'green' },
      { password: 'NoNumbers', desc: 'missing number', uppercase: 'green', lowercase: 'green', number: 'red', length: 'green' },
      { password: '12345678', desc: 'only numbers', uppercase: 'red', lowercase: 'red', number: 'green', length: 'green' },
      { password: 'Short1', desc: 'short password with number and uppercase', uppercase: 'green', lowercase: 'green', number: 'green', length: 'red' }
    ])('validates password for $desc', ({ password, uppercase, lowercase, number, length }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(uppercase);
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(lowercase);
      expect(screen.getByText(/1 number/i).className).toMatch(number);
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(length);
    });
  });

  describe('Email validation edge cases', () => {
    test.each([
      { email: 'plainaddress', valid: false },
      { email: '@missingusername.com', valid: false },
      { email: 'test@localhost', valid: false },
      { email: 'username@.com.my', valid: false },
      { email: 'username123@yahoo.com', valid: true },
      { email: 'username.name@domain.com', valid: true },
      { email: 'user.name+tag+sorting@example.com', valid: true }
    ])('validates email $email as $valid', ({ email, valid }) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      const validationMessage = screen.queryByText(/Please enter a valid email address/i);
      if (valid) {
        expect(validationMessage).toBeNull();
      } else {
        expect(validationMessage).toBeInTheDocument();
      }
    });
  });

  describe('Form field limits and constraints', () => {
    test.each([
      { field: 'firstName', maxLength: 50 },
      { field: 'lastName', maxLength: 50 }
    ])('validates $field length not exceeding maxLength', ({ field, maxLength }) => {
      const input = screen.getByLabelText(LABELS[field]);
      const longString = 'a'.repeat(maxLength + 1);
      fireEvent.change(input, { target: { value: longString } });
      expect(input.value.length).toBe(maxLength);
    });
  });
});

});

  describe('Form Validation', () => {
    test('validates email format correctly', () => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'invalid' } // Additional tests to cover missing scenarios

describe('SignUpForm - Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Password validation edge cases', () => {
    test.each([
      { password: 'alllowercase1', desc: 'all lowercase with number', uppercase: 'red', lowercase: 'green', number: 'green', length: 'green' },
      { password: 'ALLUPPERCASE1', desc: 'all uppercase with number', uppercase: 'green', lowercase: 'red', number: 'green', length: 'green' },
      { password: 'NoNumbers', desc: 'missing number', uppercase: 'green', lowercase: 'green', number: 'red', length: 'green' },
      { password: '12345678', desc: 'only numbers', uppercase: 'red', lowercase: 'red', number: 'green', length: 'green' },
      { password: 'Short1', desc: 'short password with number and uppercase', uppercase: 'green', lowercase: 'green', number: 'green', length: 'red' }
    ])('validates password for $desc', ({ password, uppercase, lowercase, number, length }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(uppercase);
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(lowercase);
      expect(screen.getByText(/1 number/i).className).toMatch(number);
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(length);
    });
  });

  describe('Email validation edge cases', () => {
    test.each([
      { email: 'plainaddress', valid: false },
      { email: '@missingusername.com', valid: false },
      { email: 'test@localhost', valid: false },
      { email: 'username@.com.my', valid: false },
      { email: 'username123@yahoo.com', valid: true },
      { email: 'username.name@domain.com', valid: true },
      { email: 'user.name+tag+sorting@example.com', valid: true }
    ])('validates email $email as $valid', ({ email, valid }) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      const validationMessage = screen.queryByText(/Please enter a valid email address/i);
      if (valid) {
        expect(validationMessage).toBeNull();
      } else {
        expect(validationMessage).toBeInTheDocument();
      }
    });
  });

  describe('Form field limits and constraints', () => {
    test.each([
      { field: 'firstName', maxLength: 50 },
      { field: 'lastName', maxLength: 50 }
    ])('validates $field length not exceeding maxLength', ({ field, maxLength }) => {
      const input = screen.getByLabelText(LABELS[field]);
      const longString = 'a'.repeat(maxLength + 1);
      fireEvent.change(input, { target: { value: longString } });
      expect(input.value.length).toBe(maxLength);
    });
  });
});

});
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: VALID_EMAIL } // Additional tests to cover missing scenarios

describe('SignUpForm - Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Password validation edge cases', () => {
    test.each([
      { password: 'alllowercase1', desc: 'all lowercase with number', uppercase: 'red', lowercase: 'green', number: 'green', length: 'green' },
      { password: 'ALLUPPERCASE1', desc: 'all uppercase with number', uppercase: 'green', lowercase: 'red', number: 'green', length: 'green' },
      { password: 'NoNumbers', desc: 'missing number', uppercase: 'green', lowercase: 'green', number: 'red', length: 'green' },
      { password: '12345678', desc: 'only numbers', uppercase: 'red', lowercase: 'red', number: 'green', length: 'green' },
      { password: 'Short1', desc: 'short password with number and uppercase', uppercase: 'green', lowercase: 'green', number: 'green', length: 'red' }
    ])('validates password for $desc', ({ password, uppercase, lowercase, number, length }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(uppercase);
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(lowercase);
      expect(screen.getByText(/1 number/i).className).toMatch(number);
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(length);
    });
  });

  describe('Email validation edge cases', () => {
    test.each([
      { email: 'plainaddress', valid: false },
      { email: '@missingusername.com', valid: false },
      { email: 'test@localhost', valid: false },
      { email: 'username@.com.my', valid: false },
      { email: 'username123@yahoo.com', valid: true },
      { email: 'username.name@domain.com', valid: true },
      { email: 'user.name+tag+sorting@example.com', valid: true }
    ])('validates email $email as $valid', ({ email, valid }) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      const validationMessage = screen.queryByText(/Please enter a valid email address/i);
      if (valid) {
        expect(validationMessage).toBeNull();
      } else {
        expect(validationMessage).toBeInTheDocument();
      }
    });
  });

  describe('Form field limits and constraints', () => {
    test.each([
      { field: 'firstName', maxLength: 50 },
      { field: 'lastName', maxLength: 50 }
    ])('validates $field length not exceeding maxLength', ({ field, maxLength }) => {
      const input = screen.getByLabelText(LABELS[field]);
      const longString = 'a'.repeat(maxLength + 1);
      fireEvent.change(input, { target: { value: longString } });
      expect(input.value.length).toBe(maxLength);
    });
  });
});

});
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeNull();
    // Additional tests to cover missing scenarios

describe('SignUpForm - Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Password validation edge cases', () => {
    test.each([
      { password: 'alllowercase1', desc: 'all lowercase with number', uppercase: 'red', lowercase: 'green', number: 'green', length: 'green' },
      { password: 'ALLUPPERCASE1', desc: 'all uppercase with number', uppercase: 'green', lowercase: 'red', number: 'green', length: 'green' },
      { password: 'NoNumbers', desc: 'missing number', uppercase: 'green', lowercase: 'green', number: 'red', length: 'green' },
      { password: '12345678', desc: 'only numbers', uppercase: 'red', lowercase: 'red', number: 'green', length: 'green' },
      { password: 'Short1', desc: 'short password with number and uppercase', uppercase: 'green', lowercase: 'green', number: 'green', length: 'red' }
    ])('validates password for $desc', ({ password, uppercase, lowercase, number, length }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(uppercase);
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(lowercase);
      expect(screen.getByText(/1 number/i).className).toMatch(number);
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(length);
    });
  });

  describe('Email validation edge cases', () => {
    test.each([
      { email: 'plainaddress', valid: false },
      { email: '@missingusername.com', valid: false },
      { email: 'test@localhost', valid: false },
      { email: 'username@.com.my', valid: false },
      { email: 'username123@yahoo.com', valid: true },
      { email: 'username.name@domain.com', valid: true },
      { email: 'user.name+tag+sorting@example.com', valid: true }
    ])('validates email $email as $valid', ({ email, valid }) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      const validationMessage = screen.queryByText(/Please enter a valid email address/i);
      if (valid) {
        expect(validationMessage).toBeNull();
      } else {
        expect(validationMessage).toBeInTheDocument();
      }
    });
  });

  describe('Form field limits and constraints', () => {
    test.each([
      { field: 'firstName', maxLength: 50 },
      { field: 'lastName', maxLength: 50 }
    ])('validates $field length not exceeding maxLength', ({ field, maxLength }) => {
      const input = screen.getByLabelText(LABELS[field]);
      const longString = 'a'.repeat(maxLength + 1);
      fireEvent.change(input, { target: { value: longString } });
      expect(input.value.length).toBe(maxLength);
    });
  });
});

});

    test('validates password criteria correctly', () => {
      const password = screen.getByLabelText(LABELS.password);
      fireEvent.change(password, { target: { value: 'short' } // Additional tests to cover missing scenarios

describe('SignUpForm - Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Password validation edge cases', () => {
    test.each([
      { password: 'alllowercase1', desc: 'all lowercase with number', uppercase: 'red', lowercase: 'green', number: 'green', length: 'green' },
      { password: 'ALLUPPERCASE1', desc: 'all uppercase with number', uppercase: 'green', lowercase: 'red', number: 'green', length: 'green' },
      { password: 'NoNumbers', desc: 'missing number', uppercase: 'green', lowercase: 'green', number: 'red', length: 'green' },
      { password: '12345678', desc: 'only numbers', uppercase: 'red', lowercase: 'red', number: 'green', length: 'green' },
      { password: 'Short1', desc: 'short password with number and uppercase', uppercase: 'green', lowercase: 'green', number: 'green', length: 'red' }
    ])('validates password for $desc', ({ password, uppercase, lowercase, number, length }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(uppercase);
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(lowercase);
      expect(screen.getByText(/1 number/i).className).toMatch(number);
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(length);
    });
  });

  describe('Email validation edge cases', () => {
    test.each([
      { email: 'plainaddress', valid: false },
      { email: '@missingusername.com', valid: false },
      { email: 'test@localhost', valid: false },
      { email: 'username@.com.my', valid: false },
      { email: 'username123@yahoo.com', valid: true },
      { email: 'username.name@domain.com', valid: true },
      { email: 'user.name+tag+sorting@example.com', valid: true }
    ])('validates email $email as $valid', ({ email, valid }) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      const validationMessage = screen.queryByText(/Please enter a valid email address/i);
      if (valid) {
        expect(validationMessage).toBeNull();
      } else {
        expect(validationMessage).toBeInTheDocument();
      }
    });
  });

  describe('Form field limits and constraints', () => {
    test.each([
      { field: 'firstName', maxLength: 50 },
      { field: 'lastName', maxLength: 50 }
    ])('validates $field length not exceeding maxLength', ({ field, maxLength }) => {
      const input = screen.getByLabelText(LABELS[field]);
      const longString = 'a'.repeat(maxLength + 1);
      fireEvent.change(input, { target: { value: longString } });
      expect(input.value.length).toBe(maxLength);
    });
  });
});

});
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
      fireEvent.change(password, { target: { value: 'LongEnough1' } // Additional tests to cover missing scenarios

describe('SignUpForm - Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Password validation edge cases', () => {
    test.each([
      { password: 'alllowercase1', desc: 'all lowercase with number', uppercase: 'red', lowercase: 'green', number: 'green', length: 'green' },
      { password: 'ALLUPPERCASE1', desc: 'all uppercase with number', uppercase: 'green', lowercase: 'red', number: 'green', length: 'green' },
      { password: 'NoNumbers', desc: 'missing number', uppercase: 'green', lowercase: 'green', number: 'red', length: 'green' },
      { password: '12345678', desc: 'only numbers', uppercase: 'red', lowercase: 'red', number: 'green', length: 'green' },
      { password: 'Short1', desc: 'short password with number and uppercase', uppercase: 'green', lowercase: 'green', number: 'green', length: 'red' }
    ])('validates password for $desc', ({ password, uppercase, lowercase, number, length }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(uppercase);
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(lowercase);
      expect(screen.getByText(/1 number/i).className).toMatch(number);
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(length);
    });
  });

  describe('Email validation edge cases', () => {
    test.each([
      { email: 'plainaddress', valid: false },
      { email: '@missingusername.com', valid: false },
      { email: 'test@localhost', valid: false },
      { email: 'username@.com.my', valid: false },
      { email: 'username123@yahoo.com', valid: true },
      { email: 'username.name@domain.com', valid: true },
      { email: 'user.name+tag+sorting@example.com', valid: true }
    ])('validates email $email as $valid', ({ email, valid }) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      const validationMessage = screen.queryByText(/Please enter a valid email address/i);
      if (valid) {
        expect(validationMessage).toBeNull();
      } else {
        expect(validationMessage).toBeInTheDocument();
      }
    });
  });

  describe('Form field limits and constraints', () => {
    test.each([
      { field: 'firstName', maxLength: 50 },
      { field: 'lastName', maxLength: 50 }
    ])('validates $field length not exceeding maxLength', ({ field, maxLength }) => {
      const input = screen.getByLabelText(LABELS[field]);
      const longString = 'a'.repeat(maxLength + 1);
      fireEvent.change(input, { target: { value: longString } });
      expect(input.value.length).toBe(maxLength);
    });
  });
});

});
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(/green/);
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
      expect(screen.getByText(/1 number/i).className).toMatch(/green/);
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    // Additional tests to cover missing scenarios

describe('SignUpForm - Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Password validation edge cases', () => {
    test.each([
      { password: 'alllowercase1', desc: 'all lowercase with number', uppercase: 'red', lowercase: 'green', number: 'green', length: 'green' },
      { password: 'ALLUPPERCASE1', desc: 'all uppercase with number', uppercase: 'green', lowercase: 'red', number: 'green', length: 'green' },
      { password: 'NoNumbers', desc: 'missing number', uppercase: 'green', lowercase: 'green', number: 'red', length: 'green' },
      { password: '12345678', desc: 'only numbers', uppercase: 'red', lowercase: 'red', number: 'green', length: 'green' },
      { password: 'Short1', desc: 'short password with number and uppercase', uppercase: 'green', lowercase: 'green', number: 'green', length: 'red' }
    ])('validates password for $desc', ({ password, uppercase, lowercase, number, length }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(uppercase);
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(lowercase);
      expect(screen.getByText(/1 number/i).className).toMatch(number);
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(length);
    });
  });

  describe('Email validation edge cases', () => {
    test.each([
      { email: 'plainaddress', valid: false },
      { email: '@missingusername.com', valid: false },
      { email: 'test@localhost', valid: false },
      { email: 'username@.com.my', valid: false },
      { email: 'username123@yahoo.com', valid: true },
      { email: 'username.name@domain.com', valid: true },
      { email: 'user.name+tag+sorting@example.com', valid: true }
    ])('validates email $email as $valid', ({ email, valid }) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      const validationMessage = screen.queryByText(/Please enter a valid email address/i);
      if (valid) {
        expect(validationMessage).toBeNull();
      } else {
        expect(validationMessage).toBeInTheDocument();
      }
    });
  });

  describe('Form field limits and constraints', () => {
    test.each([
      { field: 'firstName', maxLength: 50 },
      { field: 'lastName', maxLength: 50 }
    ])('validates $field length not exceeding maxLength', ({ field, maxLength }) => {
      const input = screen.getByLabelText(LABELS[field]);
      const longString = 'a'.repeat(maxLength + 1);
      fireEvent.change(input, { target: { value: longString } });
      expect(input.value.length).toBe(maxLength);
    });
  });
});

});
  // Additional tests to cover missing scenarios

describe('SignUpForm - Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Password validation edge cases', () => {
    test.each([
      { password: 'alllowercase1', desc: 'all lowercase with number', uppercase: 'red', lowercase: 'green', number: 'green', length: 'green' },
      { password: 'ALLUPPERCASE1', desc: 'all uppercase with number', uppercase: 'green', lowercase: 'red', number: 'green', length: 'green' },
      { password: 'NoNumbers', desc: 'missing number', uppercase: 'green', lowercase: 'green', number: 'red', length: 'green' },
      { password: '12345678', desc: 'only numbers', uppercase: 'red', lowercase: 'red', number: 'green', length: 'green' },
      { password: 'Short1', desc: 'short password with number and uppercase', uppercase: 'green', lowercase: 'green', number: 'green', length: 'red' }
    ])('validates password for $desc', ({ password, uppercase, lowercase, number, length }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(uppercase);
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(lowercase);
      expect(screen.getByText(/1 number/i).className).toMatch(number);
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(length);
    });
  });

  describe('Email validation edge cases', () => {
    test.each([
      { email: 'plainaddress', valid: false },
      { email: '@missingusername.com', valid: false },
      { email: 'test@localhost', valid: false },
      { email: 'username@.com.my', valid: false },
      { email: 'username123@yahoo.com', valid: true },
      { email: 'username.name@domain.com', valid: true },
      { email: 'user.name+tag+sorting@example.com', valid: true }
    ])('validates email $email as $valid', ({ email, valid }) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      const validationMessage = screen.queryByText(/Please enter a valid email address/i);
      if (valid) {
        expect(validationMessage).toBeNull();
      } else {
        expect(validationMessage).toBeInTheDocument();
      }
    });
  });

  describe('Form field limits and constraints', () => {
    test.each([
      { field: 'firstName', maxLength: 50 },
      { field: 'lastName', maxLength: 50 }
    ])('validates $field length not exceeding maxLength', ({ field, maxLength }) => {
      const input = screen.getByLabelText(LABELS[field]);
      const longString = 'a'.repeat(maxLength + 1);
      fireEvent.change(input, { target: { value: longString } });
      expect(input.value.length).toBe(maxLength);
    });
  });
});

});

  describe('Form Submission', () => {
    let consoleSpy;

    beforeEach(() => {
      consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {// Additional tests to cover missing scenarios

describe('SignUpForm - Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Password validation edge cases', () => {
    test.each([
      { password: 'alllowercase1', desc: 'all lowercase with number', uppercase: 'red', lowercase: 'green', number: 'green', length: 'green' },
      { password: 'ALLUPPERCASE1', desc: 'all uppercase with number', uppercase: 'green', lowercase: 'red', number: 'green', length: 'green' },
      { password: 'NoNumbers', desc: 'missing number', uppercase: 'green', lowercase: 'green', number: 'red', length: 'green' },
      { password: '12345678', desc: 'only numbers', uppercase: 'red', lowercase: 'red', number: 'green', length: 'green' },
      { password: 'Short1', desc: 'short password with number and uppercase', uppercase: 'green', lowercase: 'green', number: 'green', length: 'red' }
    ])('validates password for $desc', ({ password, uppercase, lowercase, number, length }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(uppercase);
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(lowercase);
      expect(screen.getByText(/1 number/i).className).toMatch(number);
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(length);
    });
  });

  describe('Email validation edge cases', () => {
    test.each([
      { email: 'plainaddress', valid: false },
      { email: '@missingusername.com', valid: false },
      { email: 'test@localhost', valid: false },
      { email: 'username@.com.my', valid: false },
      { email: 'username123@yahoo.com', valid: true },
      { email: 'username.name@domain.com', valid: true },
      { email: 'user.name+tag+sorting@example.com', valid: true }
    ])('validates email $email as $valid', ({ email, valid }) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      const validationMessage = screen.queryByText(/Please enter a valid email address/i);
      if (valid) {
        expect(validationMessage).toBeNull();
      } else {
        expect(validationMessage).toBeInTheDocument();
      }
    });
  });

  describe('Form field limits and constraints', () => {
    test.each([
      { field: 'firstName', maxLength: 50 },
      { field: 'lastName', maxLength: 50 }
    ])('validates $field length not exceeding maxLength', ({ field, maxLength }) => {
      const input = screen.getByLabelText(LABELS[field]);
      const longString = 'a'.repeat(maxLength + 1);
      fireEvent.change(input, { target: { value: longString } });
      expect(input.value.length).toBe(maxLength);
    });
  });
});

});
    // Additional tests to cover missing scenarios

describe('SignUpForm - Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Password validation edge cases', () => {
    test.each([
      { password: 'alllowercase1', desc: 'all lowercase with number', uppercase: 'red', lowercase: 'green', number: 'green', length: 'green' },
      { password: 'ALLUPPERCASE1', desc: 'all uppercase with number', uppercase: 'green', lowercase: 'red', number: 'green', length: 'green' },
      { password: 'NoNumbers', desc: 'missing number', uppercase: 'green', lowercase: 'green', number: 'red', length: 'green' },
      { password: '12345678', desc: 'only numbers', uppercase: 'red', lowercase: 'red', number: 'green', length: 'green' },
      { password: 'Short1', desc: 'short password with number and uppercase', uppercase: 'green', lowercase: 'green', number: 'green', length: 'red' }
    ])('validates password for $desc', ({ password, uppercase, lowercase, number, length }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(uppercase);
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(lowercase);
      expect(screen.getByText(/1 number/i).className).toMatch(number);
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(length);
    });
  });

  describe('Email validation edge cases', () => {
    test.each([
      { email: 'plainaddress', valid: false },
      { email: '@missingusername.com', valid: false },
      { email: 'test@localhost', valid: false },
      { email: 'username@.com.my', valid: false },
      { email: 'username123@yahoo.com', valid: true },
      { email: 'username.name@domain.com', valid: true },
      { email: 'user.name+tag+sorting@example.com', valid: true }
    ])('validates email $email as $valid', ({ email, valid }) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      const validationMessage = screen.queryByText(/Please enter a valid email address/i);
      if (valid) {
        expect(validationMessage).toBeNull();
      } else {
        expect(validationMessage).toBeInTheDocument();
      }
    });
  });

  describe('Form field limits and constraints', () => {
    test.each([
      { field: 'firstName', maxLength: 50 },
      { field: 'lastName', maxLength: 50 }
    ])('validates $field length not exceeding maxLength', ({ field, maxLength }) => {
      const input = screen.getByLabelText(LABELS[field]);
      const longString = 'a'.repeat(maxLength + 1);
      fireEvent.change(input, { target: { value: longString } });
      expect(input.value.length).toBe(maxLength);
    });
  });
});

});

    afterEach(() => {
      consoleSpy.mockRestore();
    // Additional tests to cover missing scenarios

describe('SignUpForm - Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Password validation edge cases', () => {
    test.each([
      { password: 'alllowercase1', desc: 'all lowercase with number', uppercase: 'red', lowercase: 'green', number: 'green', length: 'green' },
      { password: 'ALLUPPERCASE1', desc: 'all uppercase with number', uppercase: 'green', lowercase: 'red', number: 'green', length: 'green' },
      { password: 'NoNumbers', desc: 'missing number', uppercase: 'green', lowercase: 'green', number: 'red', length: 'green' },
      { password: '12345678', desc: 'only numbers', uppercase: 'red', lowercase: 'red', number: 'green', length: 'green' },
      { password: 'Short1', desc: 'short password with number and uppercase', uppercase: 'green', lowercase: 'green', number: 'green', length: 'red' }
    ])('validates password for $desc', ({ password, uppercase, lowercase, number, length }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(uppercase);
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(lowercase);
      expect(screen.getByText(/1 number/i).className).toMatch(number);
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(length);
    });
  });

  describe('Email validation edge cases', () => {
    test.each([
      { email: 'plainaddress', valid: false },
      { email: '@missingusername.com', valid: false },
      { email: 'test@localhost', valid: false },
      { email: 'username@.com.my', valid: false },
      { email: 'username123@yahoo.com', valid: true },
      { email: 'username.name@domain.com', valid: true },
      { email: 'user.name+tag+sorting@example.com', valid: true }
    ])('validates email $email as $valid', ({ email, valid }) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      const validationMessage = screen.queryByText(/Please enter a valid email address/i);
      if (valid) {
        expect(validationMessage).toBeNull();
      } else {
        expect(validationMessage).toBeInTheDocument();
      }
    });
  });

  describe('Form field limits and constraints', () => {
    test.each([
      { field: 'firstName', maxLength: 50 },
      { field: 'lastName', maxLength: 50 }
    ])('validates $field length not exceeding maxLength', ({ field, maxLength }) => {
      const input = screen.getByLabelText(LABELS[field]);
      const longString = 'a'.repeat(maxLength + 1);
      fireEvent.change(input, { target: { value: longString } });
      expect(input.value.length).toBe(maxLength);
    });
  });
});

});

    test('enables Create Account button with valid form', () => {
      fillOutForm();
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).not.toBeDisabled();
    // Additional tests to cover missing scenarios

describe('SignUpForm - Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Password validation edge cases', () => {
    test.each([
      { password: 'alllowercase1', desc: 'all lowercase with number', uppercase: 'red', lowercase: 'green', number: 'green', length: 'green' },
      { password: 'ALLUPPERCASE1', desc: 'all uppercase with number', uppercase: 'green', lowercase: 'red', number: 'green', length: 'green' },
      { password: 'NoNumbers', desc: 'missing number', uppercase: 'green', lowercase: 'green', number: 'red', length: 'green' },
      { password: '12345678', desc: 'only numbers', uppercase: 'red', lowercase: 'red', number: 'green', length: 'green' },
      { password: 'Short1', desc: 'short password with number and uppercase', uppercase: 'green', lowercase: 'green', number: 'green', length: 'red' }
    ])('validates password for $desc', ({ password, uppercase, lowercase, number, length }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(uppercase);
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(lowercase);
      expect(screen.getByText(/1 number/i).className).toMatch(number);
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(length);
    });
  });

  describe('Email validation edge cases', () => {
    test.each([
      { email: 'plainaddress', valid: false },
      { email: '@missingusername.com', valid: false },
      { email: 'test@localhost', valid: false },
      { email: 'username@.com.my', valid: false },
      { email: 'username123@yahoo.com', valid: true },
      { email: 'username.name@domain.com', valid: true },
      { email: 'user.name+tag+sorting@example.com', valid: true }
    ])('validates email $email as $valid', ({ email, valid }) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      const validationMessage = screen.queryByText(/Please enter a valid email address/i);
      if (valid) {
        expect(validationMessage).toBeNull();
      } else {
        expect(validationMessage).toBeInTheDocument();
      }
    });
  });

  describe('Form field limits and constraints', () => {
    test.each([
      { field: 'firstName', maxLength: 50 },
      { field: 'lastName', maxLength: 50 }
    ])('validates $field length not exceeding maxLength', ({ field, maxLength }) => {
      const input = screen.getByLabelText(LABELS[field]);
      const longString = 'a'.repeat(maxLength + 1);
      fireEvent.change(input, { target: { value: longString } });
      expect(input.value.length).toBe(maxLength);
    });
  });
});

});

    test('disables Create Account button with invalid form', () => {
      fillOutForm({ firstName: '' // Additional tests to cover missing scenarios

describe('SignUpForm - Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Password validation edge cases', () => {
    test.each([
      { password: 'alllowercase1', desc: 'all lowercase with number', uppercase: 'red', lowercase: 'green', number: 'green', length: 'green' },
      { password: 'ALLUPPERCASE1', desc: 'all uppercase with number', uppercase: 'green', lowercase: 'red', number: 'green', length: 'green' },
      { password: 'NoNumbers', desc: 'missing number', uppercase: 'green', lowercase: 'green', number: 'red', length: 'green' },
      { password: '12345678', desc: 'only numbers', uppercase: 'red', lowercase: 'red', number: 'green', length: 'green' },
      { password: 'Short1', desc: 'short password with number and uppercase', uppercase: 'green', lowercase: 'green', number: 'green', length: 'red' }
    ])('validates password for $desc', ({ password, uppercase, lowercase, number, length }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(uppercase);
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(lowercase);
      expect(screen.getByText(/1 number/i).className).toMatch(number);
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(length);
    });
  });

  describe('Email validation edge cases', () => {
    test.each([
      { email: 'plainaddress', valid: false },
      { email: '@missingusername.com', valid: false },
      { email: 'test@localhost', valid: false },
      { email: 'username@.com.my', valid: false },
      { email: 'username123@yahoo.com', valid: true },
      { email: 'username.name@domain.com', valid: true },
      { email: 'user.name+tag+sorting@example.com', valid: true }
    ])('validates email $email as $valid', ({ email, valid }) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      const validationMessage = screen.queryByText(/Please enter a valid email address/i);
      if (valid) {
        expect(validationMessage).toBeNull();
      } else {
        expect(validationMessage).toBeInTheDocument();
      }
    });
  });

  describe('Form field limits and constraints', () => {
    test.each([
      { field: 'firstName', maxLength: 50 },
      { field: 'lastName', maxLength: 50 }
    ])('validates $field length not exceeding maxLength', ({ field, maxLength }) => {
      const input = screen.getByLabelText(LABELS[field]);
      const longString = 'a'.repeat(maxLength + 1);
      fireEvent.change(input, { target: { value: longString } });
      expect(input.value.length).toBe(maxLength);
    });
  });
});

}); // Explicitly set an invalid field
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    // Additional tests to cover missing scenarios

describe('SignUpForm - Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Password validation edge cases', () => {
    test.each([
      { password: 'alllowercase1', desc: 'all lowercase with number', uppercase: 'red', lowercase: 'green', number: 'green', length: 'green' },
      { password: 'ALLUPPERCASE1', desc: 'all uppercase with number', uppercase: 'green', lowercase: 'red', number: 'green', length: 'green' },
      { password: 'NoNumbers', desc: 'missing number', uppercase: 'green', lowercase: 'green', number: 'red', length: 'green' },
      { password: '12345678', desc: 'only numbers', uppercase: 'red', lowercase: 'red', number: 'green', length: 'green' },
      { password: 'Short1', desc: 'short password with number and uppercase', uppercase: 'green', lowercase: 'green', number: 'green', length: 'red' }
    ])('validates password for $desc', ({ password, uppercase, lowercase, number, length }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(uppercase);
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(lowercase);
      expect(screen.getByText(/1 number/i).className).toMatch(number);
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(length);
    });
  });

  describe('Email validation edge cases', () => {
    test.each([
      { email: 'plainaddress', valid: false },
      { email: '@missingusername.com', valid: false },
      { email: 'test@localhost', valid: false },
      { email: 'username@.com.my', valid: false },
      { email: 'username123@yahoo.com', valid: true },
      { email: 'username.name@domain.com', valid: true },
      { email: 'user.name+tag+sorting@example.com', valid: true }
    ])('validates email $email as $valid', ({ email, valid }) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      const validationMessage = screen.queryByText(/Please enter a valid email address/i);
      if (valid) {
        expect(validationMessage).toBeNull();
      } else {
        expect(validationMessage).toBeInTheDocument();
      }
    });
  });

  describe('Form field limits and constraints', () => {
    test.each([
      { field: 'firstName', maxLength: 50 },
      { field: 'lastName', maxLength: 50 }
    ])('validates $field length not exceeding maxLength', ({ field, maxLength }) => {
      const input = screen.getByLabelText(LABELS[field]);
      const longString = 'a'.repeat(maxLength + 1);
      fireEvent.change(input, { target: { value: longString } });
      expect(input.value.length).toBe(maxLength);
    });
  });
});

});

    test('calls console log with correct data on valid form submission', () => {
      const formData = fillOutForm();
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(consoleSpy).toHaveBeenLastCalledWith('Form submitted:', formData);
    // Additional tests to cover missing scenarios

describe('SignUpForm - Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Password validation edge cases', () => {
    test.each([
      { password: 'alllowercase1', desc: 'all lowercase with number', uppercase: 'red', lowercase: 'green', number: 'green', length: 'green' },
      { password: 'ALLUPPERCASE1', desc: 'all uppercase with number', uppercase: 'green', lowercase: 'red', number: 'green', length: 'green' },
      { password: 'NoNumbers', desc: 'missing number', uppercase: 'green', lowercase: 'green', number: 'red', length: 'green' },
      { password: '12345678', desc: 'only numbers', uppercase: 'red', lowercase: 'red', number: 'green', length: 'green' },
      { password: 'Short1', desc: 'short password with number and uppercase', uppercase: 'green', lowercase: 'green', number: 'green', length: 'red' }
    ])('validates password for $desc', ({ password, uppercase, lowercase, number, length }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(uppercase);
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(lowercase);
      expect(screen.getByText(/1 number/i).className).toMatch(number);
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(length);
    });
  });

  describe('Email validation edge cases', () => {
    test.each([
      { email: 'plainaddress', valid: false },
      { email: '@missingusername.com', valid: false },
      { email: 'test@localhost', valid: false },
      { email: 'username@.com.my', valid: false },
      { email: 'username123@yahoo.com', valid: true },
      { email: 'username.name@domain.com', valid: true },
      { email: 'user.name+tag+sorting@example.com', valid: true }
    ])('validates email $email as $valid', ({ email, valid }) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      const validationMessage = screen.queryByText(/Please enter a valid email address/i);
      if (valid) {
        expect(validationMessage).toBeNull();
      } else {
        expect(validationMessage).toBeInTheDocument();
      }
    });
  });

  describe('Form field limits and constraints', () => {
    test.each([
      { field: 'firstName', maxLength: 50 },
      { field: 'lastName', maxLength: 50 }
    ])('validates $field length not exceeding maxLength', ({ field, maxLength }) => {
      const input = screen.getByLabelText(LABELS[field]);
      const longString = 'a'.repeat(maxLength + 1);
      fireEvent.change(input, { target: { value: longString } });
      expect(input.value.length).toBe(maxLength);
    });
  });
});

});
  // Additional tests to cover missing scenarios

describe('SignUpForm - Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Password validation edge cases', () => {
    test.each([
      { password: 'alllowercase1', desc: 'all lowercase with number', uppercase: 'red', lowercase: 'green', number: 'green', length: 'green' },
      { password: 'ALLUPPERCASE1', desc: 'all uppercase with number', uppercase: 'green', lowercase: 'red', number: 'green', length: 'green' },
      { password: 'NoNumbers', desc: 'missing number', uppercase: 'green', lowercase: 'green', number: 'red', length: 'green' },
      { password: '12345678', desc: 'only numbers', uppercase: 'red', lowercase: 'red', number: 'green', length: 'green' },
      { password: 'Short1', desc: 'short password with number and uppercase', uppercase: 'green', lowercase: 'green', number: 'green', length: 'red' }
    ])('validates password for $desc', ({ password, uppercase, lowercase, number, length }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(uppercase);
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(lowercase);
      expect(screen.getByText(/1 number/i).className).toMatch(number);
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(length);
    });
  });

  describe('Email validation edge cases', () => {
    test.each([
      { email: 'plainaddress', valid: false },
      { email: '@missingusername.com', valid: false },
      { email: 'test@localhost', valid: false },
      { email: 'username@.com.my', valid: false },
      { email: 'username123@yahoo.com', valid: true },
      { email: 'username.name@domain.com', valid: true },
      { email: 'user.name+tag+sorting@example.com', valid: true }
    ])('validates email $email as $valid', ({ email, valid }) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      const validationMessage = screen.queryByText(/Please enter a valid email address/i);
      if (valid) {
        expect(validationMessage).toBeNull();
      } else {
        expect(validationMessage).toBeInTheDocument();
      }
    });
  });

  describe('Form field limits and constraints', () => {
    test.each([
      { field: 'firstName', maxLength: 50 },
      { field: 'lastName', maxLength: 50 }
    ])('validates $field length not exceeding maxLength', ({ field, maxLength }) => {
      const input = screen.getByLabelText(LABELS[field]);
      const longString = 'a'.repeat(maxLength + 1);
      fireEvent.change(input, { target: { value: longString } });
      expect(input.value.length).toBe(maxLength);
    });
  });
});

});
// Additional tests to cover missing scenarios

describe('SignUpForm - Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Password validation edge cases', () => {
    test.each([
      { password: 'alllowercase1', desc: 'all lowercase with number', uppercase: 'red', lowercase: 'green', number: 'green', length: 'green' },
      { password: 'ALLUPPERCASE1', desc: 'all uppercase with number', uppercase: 'green', lowercase: 'red', number: 'green', length: 'green' },
      { password: 'NoNumbers', desc: 'missing number', uppercase: 'green', lowercase: 'green', number: 'red', length: 'green' },
      { password: '12345678', desc: 'only numbers', uppercase: 'red', lowercase: 'red', number: 'green', length: 'green' },
      { password: 'Short1', desc: 'short password with number and uppercase', uppercase: 'green', lowercase: 'green', number: 'green', length: 'red' }
    ])('validates password for $desc', ({ password, uppercase, lowercase, number, length }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(uppercase);
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(lowercase);
      expect(screen.getByText(/1 number/i).className).toMatch(number);
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(length);
    });
  });

  describe('Email validation edge cases', () => {
    test.each([
      { email: 'plainaddress', valid: false },
      { email: '@missingusername.com', valid: false },
      { email: 'test@localhost', valid: false },
      { email: 'username@.com.my', valid: false },
      { email: 'username123@yahoo.com', valid: true },
      { email: 'username.name@domain.com', valid: true },
      { email: 'user.name+tag+sorting@example.com', valid: true }
    ])('validates email $email as $valid', ({ email, valid }) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      const validationMessage = screen.queryByText(/Please enter a valid email address/i);
      if (valid) {
        expect(validationMessage).toBeNull();
      } else {
        expect(validationMessage).toBeInTheDocument();
      }
    });
  });

  describe('Form field limits and constraints', () => {
    test.each([
      { field: 'firstName', maxLength: 50 },
      { field: 'lastName', maxLength: 50 }
    ])('validates $field length not exceeding maxLength', ({ field, maxLength }) => {
      const input = screen.getByLabelText(LABELS[field]);
      const longString = 'a'.repeat(maxLength + 1);
      fireEvent.change(input, { target: { value: longString } });
      expect(input.value.length).toBe(maxLength);
    });
  });
});

});
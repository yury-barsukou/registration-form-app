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

// Additional tests to improve test coverage for SignUpForm

describe('SignUpForm Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Email Validation Edge Cases', () => {
    const invalidEmails = ['@example.com', 'jane.doe@', 'plainaddress', 'john.doe@example..com'];
    const validEmails = ['email@example.com', 'firstname.lastname@example.com', 'email@subdomain.example.com', 'firstname+lastname@example.com'];

    test.each(invalidEmails)('email "%s" should be invalid', (email) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test.each(validEmails)('email "%s" should be valid', (email) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeNull();
    });
  });

  describe('Password Validation Edge Cases', () => {
    const testCases = [
      { password: '12345678', expected: ['red', 'red', 'green', 'green'] }, // No letters
      { password: 'ABCDEFGH', expected: ['green', 'red', 'red', 'green'] }, // No lowercase, no numbers
      { password: 'abcdefgh', expected: ['red', 'green', 'red', 'green'] }, // No uppercase, no numbers
      { password: 'Ab1', expected: ['green', 'green', 'green', 'red'] }, // Not long enough
    ];

    test.each(testCases)('validates password "$password" criteria correctly', ({ password, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      const validationMessages = screen.getAllByRole('listitem');
      expected.forEach((color, index) => {
        expect(validationMessages[index].className).toMatch(new RegExp(color));
      });
    });
  });

  describe('Form Submission Edge Cases', () => {
    let consoleErrorSpy;

    beforeEach(() => {
      consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
      consoleErrorSpy.mockRestore();
    });

    test('does not submit form and logs error with invalid form', () => {
      fillOutForm({ email: 'invalid' }); // Explicitly set an invalid field
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(consoleErrorSpy).toHaveBeenCalledWith('Form is invalid');
    });
  });
});
  fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: formData.lastName } });

// Additional tests to improve test coverage for SignUpForm

describe('SignUpForm Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Email Validation Edge Cases', () => {
    const invalidEmails = ['@example.com', 'jane.doe@', 'plainaddress', 'john.doe@example..com'];
    const validEmails = ['email@example.com', 'firstname.lastname@example.com', 'email@subdomain.example.com', 'firstname+lastname@example.com'];

    test.each(invalidEmails)('email "%s" should be invalid', (email) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test.each(validEmails)('email "%s" should be valid', (email) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeNull();
    });
  });

  describe('Password Validation Edge Cases', () => {
    const testCases = [
      { password: '12345678', expected: ['red', 'red', 'green', 'green'] }, // No letters
      { password: 'ABCDEFGH', expected: ['green', 'red', 'red', 'green'] }, // No lowercase, no numbers
      { password: 'abcdefgh', expected: ['red', 'green', 'red', 'green'] }, // No uppercase, no numbers
      { password: 'Ab1', expected: ['green', 'green', 'green', 'red'] }, // Not long enough
    ];

    test.each(testCases)('validates password "$password" criteria correctly', ({ password, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      const validationMessages = screen.getAllByRole('listitem');
      expected.forEach((color, index) => {
        expect(validationMessages[index].className).toMatch(new RegExp(color));
      });
    });
  });

  describe('Form Submission Edge Cases', () => {
    let consoleErrorSpy;

    beforeEach(() => {
      consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
      consoleErrorSpy.mockRestore();
    });

    test('does not submit form and logs error with invalid form', () => {
      fillOutForm({ email: 'invalid' }); // Explicitly set an invalid field
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(consoleErrorSpy).toHaveBeenCalledWith('Form is invalid');
    });
  });
});
  fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: formData.email } });

// Additional tests to improve test coverage for SignUpForm

describe('SignUpForm Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Email Validation Edge Cases', () => {
    const invalidEmails = ['@example.com', 'jane.doe@', 'plainaddress', 'john.doe@example..com'];
    const validEmails = ['email@example.com', 'firstname.lastname@example.com', 'email@subdomain.example.com', 'firstname+lastname@example.com'];

    test.each(invalidEmails)('email "%s" should be invalid', (email) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test.each(validEmails)('email "%s" should be valid', (email) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeNull();
    });
  });

  describe('Password Validation Edge Cases', () => {
    const testCases = [
      { password: '12345678', expected: ['red', 'red', 'green', 'green'] }, // No letters
      { password: 'ABCDEFGH', expected: ['green', 'red', 'red', 'green'] }, // No lowercase, no numbers
      { password: 'abcdefgh', expected: ['red', 'green', 'red', 'green'] }, // No uppercase, no numbers
      { password: 'Ab1', expected: ['green', 'green', 'green', 'red'] }, // Not long enough
    ];

    test.each(testCases)('validates password "$password" criteria correctly', ({ password, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      const validationMessages = screen.getAllByRole('listitem');
      expected.forEach((color, index) => {
        expect(validationMessages[index].className).toMatch(new RegExp(color));
      });
    });
  });

  describe('Form Submission Edge Cases', () => {
    let consoleErrorSpy;

    beforeEach(() => {
      consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
      consoleErrorSpy.mockRestore();
    });

    test('does not submit form and logs error with invalid form', () => {
      fillOutForm({ email: 'invalid' }); // Explicitly set an invalid field
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(consoleErrorSpy).toHaveBeenCalledWith('Form is invalid');
    });
  });
});
  fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: formData.password } });

// Additional tests to improve test coverage for SignUpForm

describe('SignUpForm Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Email Validation Edge Cases', () => {
    const invalidEmails = ['@example.com', 'jane.doe@', 'plainaddress', 'john.doe@example..com'];
    const validEmails = ['email@example.com', 'firstname.lastname@example.com', 'email@subdomain.example.com', 'firstname+lastname@example.com'];

    test.each(invalidEmails)('email "%s" should be invalid', (email) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test.each(validEmails)('email "%s" should be valid', (email) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeNull();
    });
  });

  describe('Password Validation Edge Cases', () => {
    const testCases = [
      { password: '12345678', expected: ['red', 'red', 'green', 'green'] }, // No letters
      { password: 'ABCDEFGH', expected: ['green', 'red', 'red', 'green'] }, // No lowercase, no numbers
      { password: 'abcdefgh', expected: ['red', 'green', 'red', 'green'] }, // No uppercase, no numbers
      { password: 'Ab1', expected: ['green', 'green', 'green', 'red'] }, // Not long enough
    ];

    test.each(testCases)('validates password "$password" criteria correctly', ({ password, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      const validationMessages = screen.getAllByRole('listitem');
      expected.forEach((color, index) => {
        expect(validationMessages[index].className).toMatch(new RegExp(color));
      });
    });
  });

  describe('Form Submission Edge Cases', () => {
    let consoleErrorSpy;

    beforeEach(() => {
      consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
      consoleErrorSpy.mockRestore();
    });

    test('does not submit form and logs error with invalid form', () => {
      fillOutForm({ email: 'invalid' }); // Explicitly set an invalid field
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(consoleErrorSpy).toHaveBeenCalledWith('Form is invalid');
    });
  });
});

  return formData;
};

describe('SignUpForm', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

// Additional tests to improve test coverage for SignUpForm

describe('SignUpForm Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Email Validation Edge Cases', () => {
    const invalidEmails = ['@example.com', 'jane.doe@', 'plainaddress', 'john.doe@example..com'];
    const validEmails = ['email@example.com', 'firstname.lastname@example.com', 'email@subdomain.example.com', 'firstname+lastname@example.com'];

    test.each(invalidEmails)('email "%s" should be invalid', (email) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test.each(validEmails)('email "%s" should be valid', (email) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeNull();
    });
  });

  describe('Password Validation Edge Cases', () => {
    const testCases = [
      { password: '12345678', expected: ['red', 'red', 'green', 'green'] }, // No letters
      { password: 'ABCDEFGH', expected: ['green', 'red', 'red', 'green'] }, // No lowercase, no numbers
      { password: 'abcdefgh', expected: ['red', 'green', 'red', 'green'] }, // No uppercase, no numbers
      { password: 'Ab1', expected: ['green', 'green', 'green', 'red'] }, // Not long enough
    ];

    test.each(testCases)('validates password "$password" criteria correctly', ({ password, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      const validationMessages = screen.getAllByRole('listitem');
      expected.forEach((color, index) => {
        expect(validationMessages[index].className).toMatch(new RegExp(color));
      });
    });
  });

  describe('Form Submission Edge Cases', () => {
    let consoleErrorSpy;

    beforeEach(() => {
      consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
      consoleErrorSpy.mockRestore();
    });

    test('does not submit form and logs error with invalid form', () => {
      fillOutForm({ email: 'invalid' }); // Explicitly set an invalid field
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(consoleErrorSpy).toHaveBeenCalledWith('Form is invalid');
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

// Additional tests to improve test coverage for SignUpForm

describe('SignUpForm Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Email Validation Edge Cases', () => {
    const invalidEmails = ['@example.com', 'jane.doe@', 'plainaddress', 'john.doe@example..com'];
    const validEmails = ['email@example.com', 'firstname.lastname@example.com', 'email@subdomain.example.com', 'firstname+lastname@example.com'];

    test.each(invalidEmails)('email "%s" should be invalid', (email) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test.each(validEmails)('email "%s" should be valid', (email) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeNull();
    });
  });

  describe('Password Validation Edge Cases', () => {
    const testCases = [
      { password: '12345678', expected: ['red', 'red', 'green', 'green'] }, // No letters
      { password: 'ABCDEFGH', expected: ['green', 'red', 'red', 'green'] }, // No lowercase, no numbers
      { password: 'abcdefgh', expected: ['red', 'green', 'red', 'green'] }, // No uppercase, no numbers
      { password: 'Ab1', expected: ['green', 'green', 'green', 'red'] }, // Not long enough
    ];

    test.each(testCases)('validates password "$password" criteria correctly', ({ password, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      const validationMessages = screen.getAllByRole('listitem');
      expected.forEach((color, index) => {
        expect(validationMessages[index].className).toMatch(new RegExp(color));
      });
    });
  });

  describe('Form Submission Edge Cases', () => {
    let consoleErrorSpy;

    beforeEach(() => {
      consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
      consoleErrorSpy.mockRestore();
    });

    test('does not submit form and logs error with invalid form', () => {
      fillOutForm({ email: 'invalid' }); // Explicitly set an invalid field
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(consoleErrorSpy).toHaveBeenCalledWith('Form is invalid');
    });
  });
});

  describe('Field Entry', () => {
    test.each(Object.entries(LABELS))('allows entry of %s', (fieldName, labelRegex) => {
      const value = 'TestValue';
      fireEvent.change(screen.getByLabelText(labelRegex), { target: { value } });

// Additional tests to improve test coverage for SignUpForm

describe('SignUpForm Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Email Validation Edge Cases', () => {
    const invalidEmails = ['@example.com', 'jane.doe@', 'plainaddress', 'john.doe@example..com'];
    const validEmails = ['email@example.com', 'firstname.lastname@example.com', 'email@subdomain.example.com', 'firstname+lastname@example.com'];

    test.each(invalidEmails)('email "%s" should be invalid', (email) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test.each(validEmails)('email "%s" should be valid', (email) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeNull();
    });
  });

  describe('Password Validation Edge Cases', () => {
    const testCases = [
      { password: '12345678', expected: ['red', 'red', 'green', 'green'] }, // No letters
      { password: 'ABCDEFGH', expected: ['green', 'red', 'red', 'green'] }, // No lowercase, no numbers
      { password: 'abcdefgh', expected: ['red', 'green', 'red', 'green'] }, // No uppercase, no numbers
      { password: 'Ab1', expected: ['green', 'green', 'green', 'red'] }, // Not long enough
    ];

    test.each(testCases)('validates password "$password" criteria correctly', ({ password, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      const validationMessages = screen.getAllByRole('listitem');
      expected.forEach((color, index) => {
        expect(validationMessages[index].className).toMatch(new RegExp(color));
      });
    });
  });

  describe('Form Submission Edge Cases', () => {
    let consoleErrorSpy;

    beforeEach(() => {
      consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
      consoleErrorSpy.mockRestore();
    });

    test('does not submit form and logs error with invalid form', () => {
      fillOutForm({ email: 'invalid' }); // Explicitly set an invalid field
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(consoleErrorSpy).toHaveBeenCalledWith('Form is invalid');
    });
  });
});
      expect(screen.getByLabelText(labelRegex)).toHaveValue(value);
    });

// Additional tests to improve test coverage for SignUpForm

describe('SignUpForm Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Email Validation Edge Cases', () => {
    const invalidEmails = ['@example.com', 'jane.doe@', 'plainaddress', 'john.doe@example..com'];
    const validEmails = ['email@example.com', 'firstname.lastname@example.com', 'email@subdomain.example.com', 'firstname+lastname@example.com'];

    test.each(invalidEmails)('email "%s" should be invalid', (email) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test.each(validEmails)('email "%s" should be valid', (email) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeNull();
    });
  });

  describe('Password Validation Edge Cases', () => {
    const testCases = [
      { password: '12345678', expected: ['red', 'red', 'green', 'green'] }, // No letters
      { password: 'ABCDEFGH', expected: ['green', 'red', 'red', 'green'] }, // No lowercase, no numbers
      { password: 'abcdefgh', expected: ['red', 'green', 'red', 'green'] }, // No uppercase, no numbers
      { password: 'Ab1', expected: ['green', 'green', 'green', 'red'] }, // Not long enough
    ];

    test.each(testCases)('validates password "$password" criteria correctly', ({ password, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      const validationMessages = screen.getAllByRole('listitem');
      expected.forEach((color, index) => {
        expect(validationMessages[index].className).toMatch(new RegExp(color));
      });
    });
  });

  describe('Form Submission Edge Cases', () => {
    let consoleErrorSpy;

    beforeEach(() => {
      consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
      consoleErrorSpy.mockRestore();
    });

    test('does not submit form and logs error with invalid form', () => {
      fillOutForm({ email: 'invalid' }); // Explicitly set an invalid field
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(consoleErrorSpy).toHaveBeenCalledWith('Form is invalid');
    });
  });
});
  });

// Additional tests to improve test coverage for SignUpForm

describe('SignUpForm Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Email Validation Edge Cases', () => {
    const invalidEmails = ['@example.com', 'jane.doe@', 'plainaddress', 'john.doe@example..com'];
    const validEmails = ['email@example.com', 'firstname.lastname@example.com', 'email@subdomain.example.com', 'firstname+lastname@example.com'];

    test.each(invalidEmails)('email "%s" should be invalid', (email) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test.each(validEmails)('email "%s" should be valid', (email) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeNull();
    });
  });

  describe('Password Validation Edge Cases', () => {
    const testCases = [
      { password: '12345678', expected: ['red', 'red', 'green', 'green'] }, // No letters
      { password: 'ABCDEFGH', expected: ['green', 'red', 'red', 'green'] }, // No lowercase, no numbers
      { password: 'abcdefgh', expected: ['red', 'green', 'red', 'green'] }, // No uppercase, no numbers
      { password: 'Ab1', expected: ['green', 'green', 'green', 'red'] }, // Not long enough
    ];

    test.each(testCases)('validates password "$password" criteria correctly', ({ password, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      const validationMessages = screen.getAllByRole('listitem');
      expected.forEach((color, index) => {
        expect(validationMessages[index].className).toMatch(new RegExp(color));
      });
    });
  });

  describe('Form Submission Edge Cases', () => {
    let consoleErrorSpy;

    beforeEach(() => {
      consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
      consoleErrorSpy.mockRestore();
    });

    test('does not submit form and logs error with invalid form', () => {
      fillOutForm({ email: 'invalid' }); // Explicitly set an invalid field
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(consoleErrorSpy).toHaveBeenCalledWith('Form is invalid');
    });
  });
});

  describe('Form Validation', () => {
    test('validates email format correctly', () => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'invalid' } });

// Additional tests to improve test coverage for SignUpForm

describe('SignUpForm Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Email Validation Edge Cases', () => {
    const invalidEmails = ['@example.com', 'jane.doe@', 'plainaddress', 'john.doe@example..com'];
    const validEmails = ['email@example.com', 'firstname.lastname@example.com', 'email@subdomain.example.com', 'firstname+lastname@example.com'];

    test.each(invalidEmails)('email "%s" should be invalid', (email) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test.each(validEmails)('email "%s" should be valid', (email) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeNull();
    });
  });

  describe('Password Validation Edge Cases', () => {
    const testCases = [
      { password: '12345678', expected: ['red', 'red', 'green', 'green'] }, // No letters
      { password: 'ABCDEFGH', expected: ['green', 'red', 'red', 'green'] }, // No lowercase, no numbers
      { password: 'abcdefgh', expected: ['red', 'green', 'red', 'green'] }, // No uppercase, no numbers
      { password: 'Ab1', expected: ['green', 'green', 'green', 'red'] }, // Not long enough
    ];

    test.each(testCases)('validates password "$password" criteria correctly', ({ password, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      const validationMessages = screen.getAllByRole('listitem');
      expected.forEach((color, index) => {
        expect(validationMessages[index].className).toMatch(new RegExp(color));
      });
    });
  });

  describe('Form Submission Edge Cases', () => {
    let consoleErrorSpy;

    beforeEach(() => {
      consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
      consoleErrorSpy.mockRestore();
    });

    test('does not submit form and logs error with invalid form', () => {
      fillOutForm({ email: 'invalid' }); // Explicitly set an invalid field
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(consoleErrorSpy).toHaveBeenCalledWith('Form is invalid');
    });
  });
});
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: VALID_EMAIL } });

// Additional tests to improve test coverage for SignUpForm

describe('SignUpForm Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Email Validation Edge Cases', () => {
    const invalidEmails = ['@example.com', 'jane.doe@', 'plainaddress', 'john.doe@example..com'];
    const validEmails = ['email@example.com', 'firstname.lastname@example.com', 'email@subdomain.example.com', 'firstname+lastname@example.com'];

    test.each(invalidEmails)('email "%s" should be invalid', (email) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test.each(validEmails)('email "%s" should be valid', (email) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeNull();
    });
  });

  describe('Password Validation Edge Cases', () => {
    const testCases = [
      { password: '12345678', expected: ['red', 'red', 'green', 'green'] }, // No letters
      { password: 'ABCDEFGH', expected: ['green', 'red', 'red', 'green'] }, // No lowercase, no numbers
      { password: 'abcdefgh', expected: ['red', 'green', 'red', 'green'] }, // No uppercase, no numbers
      { password: 'Ab1', expected: ['green', 'green', 'green', 'red'] }, // Not long enough
    ];

    test.each(testCases)('validates password "$password" criteria correctly', ({ password, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      const validationMessages = screen.getAllByRole('listitem');
      expected.forEach((color, index) => {
        expect(validationMessages[index].className).toMatch(new RegExp(color));
      });
    });
  });

  describe('Form Submission Edge Cases', () => {
    let consoleErrorSpy;

    beforeEach(() => {
      consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
      consoleErrorSpy.mockRestore();
    });

    test('does not submit form and logs error with invalid form', () => {
      fillOutForm({ email: 'invalid' }); // Explicitly set an invalid field
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(consoleErrorSpy).toHaveBeenCalledWith('Form is invalid');
    });
  });
});
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeNull();
    });

// Additional tests to improve test coverage for SignUpForm

describe('SignUpForm Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Email Validation Edge Cases', () => {
    const invalidEmails = ['@example.com', 'jane.doe@', 'plainaddress', 'john.doe@example..com'];
    const validEmails = ['email@example.com', 'firstname.lastname@example.com', 'email@subdomain.example.com', 'firstname+lastname@example.com'];

    test.each(invalidEmails)('email "%s" should be invalid', (email) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test.each(validEmails)('email "%s" should be valid', (email) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeNull();
    });
  });

  describe('Password Validation Edge Cases', () => {
    const testCases = [
      { password: '12345678', expected: ['red', 'red', 'green', 'green'] }, // No letters
      { password: 'ABCDEFGH', expected: ['green', 'red', 'red', 'green'] }, // No lowercase, no numbers
      { password: 'abcdefgh', expected: ['red', 'green', 'red', 'green'] }, // No uppercase, no numbers
      { password: 'Ab1', expected: ['green', 'green', 'green', 'red'] }, // Not long enough
    ];

    test.each(testCases)('validates password "$password" criteria correctly', ({ password, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      const validationMessages = screen.getAllByRole('listitem');
      expected.forEach((color, index) => {
        expect(validationMessages[index].className).toMatch(new RegExp(color));
      });
    });
  });

  describe('Form Submission Edge Cases', () => {
    let consoleErrorSpy;

    beforeEach(() => {
      consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
      consoleErrorSpy.mockRestore();
    });

    test('does not submit form and logs error with invalid form', () => {
      fillOutForm({ email: 'invalid' }); // Explicitly set an invalid field
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(consoleErrorSpy).toHaveBeenCalledWith('Form is invalid');
    });
  });
});

    test('validates password criteria correctly', () => {
      const password = screen.getByLabelText(LABELS.password);
      fireEvent.change(password, { target: { value: 'short' } });

// Additional tests to improve test coverage for SignUpForm

describe('SignUpForm Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Email Validation Edge Cases', () => {
    const invalidEmails = ['@example.com', 'jane.doe@', 'plainaddress', 'john.doe@example..com'];
    const validEmails = ['email@example.com', 'firstname.lastname@example.com', 'email@subdomain.example.com', 'firstname+lastname@example.com'];

    test.each(invalidEmails)('email "%s" should be invalid', (email) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test.each(validEmails)('email "%s" should be valid', (email) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeNull();
    });
  });

  describe('Password Validation Edge Cases', () => {
    const testCases = [
      { password: '12345678', expected: ['red', 'red', 'green', 'green'] }, // No letters
      { password: 'ABCDEFGH', expected: ['green', 'red', 'red', 'green'] }, // No lowercase, no numbers
      { password: 'abcdefgh', expected: ['red', 'green', 'red', 'green'] }, // No uppercase, no numbers
      { password: 'Ab1', expected: ['green', 'green', 'green', 'red'] }, // Not long enough
    ];

    test.each(testCases)('validates password "$password" criteria correctly', ({ password, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      const validationMessages = screen.getAllByRole('listitem');
      expected.forEach((color, index) => {
        expect(validationMessages[index].className).toMatch(new RegExp(color));
      });
    });
  });

  describe('Form Submission Edge Cases', () => {
    let consoleErrorSpy;

    beforeEach(() => {
      consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
      consoleErrorSpy.mockRestore();
    });

    test('does not submit form and logs error with invalid form', () => {
      fillOutForm({ email: 'invalid' }); // Explicitly set an invalid field
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(consoleErrorSpy).toHaveBeenCalledWith('Form is invalid');
    });
  });
});
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
      fireEvent.change(password, { target: { value: 'LongEnough1' } });

// Additional tests to improve test coverage for SignUpForm

describe('SignUpForm Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Email Validation Edge Cases', () => {
    const invalidEmails = ['@example.com', 'jane.doe@', 'plainaddress', 'john.doe@example..com'];
    const validEmails = ['email@example.com', 'firstname.lastname@example.com', 'email@subdomain.example.com', 'firstname+lastname@example.com'];

    test.each(invalidEmails)('email "%s" should be invalid', (email) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test.each(validEmails)('email "%s" should be valid', (email) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeNull();
    });
  });

  describe('Password Validation Edge Cases', () => {
    const testCases = [
      { password: '12345678', expected: ['red', 'red', 'green', 'green'] }, // No letters
      { password: 'ABCDEFGH', expected: ['green', 'red', 'red', 'green'] }, // No lowercase, no numbers
      { password: 'abcdefgh', expected: ['red', 'green', 'red', 'green'] }, // No uppercase, no numbers
      { password: 'Ab1', expected: ['green', 'green', 'green', 'red'] }, // Not long enough
    ];

    test.each(testCases)('validates password "$password" criteria correctly', ({ password, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      const validationMessages = screen.getAllByRole('listitem');
      expected.forEach((color, index) => {
        expect(validationMessages[index].className).toMatch(new RegExp(color));
      });
    });
  });

  describe('Form Submission Edge Cases', () => {
    let consoleErrorSpy;

    beforeEach(() => {
      consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
      consoleErrorSpy.mockRestore();
    });

    test('does not submit form and logs error with invalid form', () => {
      fillOutForm({ email: 'invalid' }); // Explicitly set an invalid field
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(consoleErrorSpy).toHaveBeenCalledWith('Form is invalid');
    });
  });
});
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(/green/);
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
      expect(screen.getByText(/1 number/i).className).toMatch(/green/);
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

// Additional tests to improve test coverage for SignUpForm

describe('SignUpForm Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Email Validation Edge Cases', () => {
    const invalidEmails = ['@example.com', 'jane.doe@', 'plainaddress', 'john.doe@example..com'];
    const validEmails = ['email@example.com', 'firstname.lastname@example.com', 'email@subdomain.example.com', 'firstname+lastname@example.com'];

    test.each(invalidEmails)('email "%s" should be invalid', (email) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test.each(validEmails)('email "%s" should be valid', (email) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeNull();
    });
  });

  describe('Password Validation Edge Cases', () => {
    const testCases = [
      { password: '12345678', expected: ['red', 'red', 'green', 'green'] }, // No letters
      { password: 'ABCDEFGH', expected: ['green', 'red', 'red', 'green'] }, // No lowercase, no numbers
      { password: 'abcdefgh', expected: ['red', 'green', 'red', 'green'] }, // No uppercase, no numbers
      { password: 'Ab1', expected: ['green', 'green', 'green', 'red'] }, // Not long enough
    ];

    test.each(testCases)('validates password "$password" criteria correctly', ({ password, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      const validationMessages = screen.getAllByRole('listitem');
      expected.forEach((color, index) => {
        expect(validationMessages[index].className).toMatch(new RegExp(color));
      });
    });
  });

  describe('Form Submission Edge Cases', () => {
    let consoleErrorSpy;

    beforeEach(() => {
      consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
      consoleErrorSpy.mockRestore();
    });

    test('does not submit form and logs error with invalid form', () => {
      fillOutForm({ email: 'invalid' }); // Explicitly set an invalid field
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(consoleErrorSpy).toHaveBeenCalledWith('Form is invalid');
    });
  });
});
  });

// Additional tests to improve test coverage for SignUpForm

describe('SignUpForm Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Email Validation Edge Cases', () => {
    const invalidEmails = ['@example.com', 'jane.doe@', 'plainaddress', 'john.doe@example..com'];
    const validEmails = ['email@example.com', 'firstname.lastname@example.com', 'email@subdomain.example.com', 'firstname+lastname@example.com'];

    test.each(invalidEmails)('email "%s" should be invalid', (email) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test.each(validEmails)('email "%s" should be valid', (email) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeNull();
    });
  });

  describe('Password Validation Edge Cases', () => {
    const testCases = [
      { password: '12345678', expected: ['red', 'red', 'green', 'green'] }, // No letters
      { password: 'ABCDEFGH', expected: ['green', 'red', 'red', 'green'] }, // No lowercase, no numbers
      { password: 'abcdefgh', expected: ['red', 'green', 'red', 'green'] }, // No uppercase, no numbers
      { password: 'Ab1', expected: ['green', 'green', 'green', 'red'] }, // Not long enough
    ];

    test.each(testCases)('validates password "$password" criteria correctly', ({ password, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      const validationMessages = screen.getAllByRole('listitem');
      expected.forEach((color, index) => {
        expect(validationMessages[index].className).toMatch(new RegExp(color));
      });
    });
  });

  describe('Form Submission Edge Cases', () => {
    let consoleErrorSpy;

    beforeEach(() => {
      consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
      consoleErrorSpy.mockRestore();
    });

    test('does not submit form and logs error with invalid form', () => {
      fillOutForm({ email: 'invalid' }); // Explicitly set an invalid field
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(consoleErrorSpy).toHaveBeenCalledWith('Form is invalid');
    });
  });
});

  describe('Form Submission', () => {
    let consoleSpy;

    beforeEach(() => {
      consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

// Additional tests to improve test coverage for SignUpForm

describe('SignUpForm Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Email Validation Edge Cases', () => {
    const invalidEmails = ['@example.com', 'jane.doe@', 'plainaddress', 'john.doe@example..com'];
    const validEmails = ['email@example.com', 'firstname.lastname@example.com', 'email@subdomain.example.com', 'firstname+lastname@example.com'];

    test.each(invalidEmails)('email "%s" should be invalid', (email) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test.each(validEmails)('email "%s" should be valid', (email) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeNull();
    });
  });

  describe('Password Validation Edge Cases', () => {
    const testCases = [
      { password: '12345678', expected: ['red', 'red', 'green', 'green'] }, // No letters
      { password: 'ABCDEFGH', expected: ['green', 'red', 'red', 'green'] }, // No lowercase, no numbers
      { password: 'abcdefgh', expected: ['red', 'green', 'red', 'green'] }, // No uppercase, no numbers
      { password: 'Ab1', expected: ['green', 'green', 'green', 'red'] }, // Not long enough
    ];

    test.each(testCases)('validates password "$password" criteria correctly', ({ password, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      const validationMessages = screen.getAllByRole('listitem');
      expected.forEach((color, index) => {
        expect(validationMessages[index].className).toMatch(new RegExp(color));
      });
    });
  });

  describe('Form Submission Edge Cases', () => {
    let consoleErrorSpy;

    beforeEach(() => {
      consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
      consoleErrorSpy.mockRestore();
    });

    test('does not submit form and logs error with invalid form', () => {
      fillOutForm({ email: 'invalid' }); // Explicitly set an invalid field
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(consoleErrorSpy).toHaveBeenCalledWith('Form is invalid');
    });
  });
});
    });

// Additional tests to improve test coverage for SignUpForm

describe('SignUpForm Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Email Validation Edge Cases', () => {
    const invalidEmails = ['@example.com', 'jane.doe@', 'plainaddress', 'john.doe@example..com'];
    const validEmails = ['email@example.com', 'firstname.lastname@example.com', 'email@subdomain.example.com', 'firstname+lastname@example.com'];

    test.each(invalidEmails)('email "%s" should be invalid', (email) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test.each(validEmails)('email "%s" should be valid', (email) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeNull();
    });
  });

  describe('Password Validation Edge Cases', () => {
    const testCases = [
      { password: '12345678', expected: ['red', 'red', 'green', 'green'] }, // No letters
      { password: 'ABCDEFGH', expected: ['green', 'red', 'red', 'green'] }, // No lowercase, no numbers
      { password: 'abcdefgh', expected: ['red', 'green', 'red', 'green'] }, // No uppercase, no numbers
      { password: 'Ab1', expected: ['green', 'green', 'green', 'red'] }, // Not long enough
    ];

    test.each(testCases)('validates password "$password" criteria correctly', ({ password, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      const validationMessages = screen.getAllByRole('listitem');
      expected.forEach((color, index) => {
        expect(validationMessages[index].className).toMatch(new RegExp(color));
      });
    });
  });

  describe('Form Submission Edge Cases', () => {
    let consoleErrorSpy;

    beforeEach(() => {
      consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
      consoleErrorSpy.mockRestore();
    });

    test('does not submit form and logs error with invalid form', () => {
      fillOutForm({ email: 'invalid' }); // Explicitly set an invalid field
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(consoleErrorSpy).toHaveBeenCalledWith('Form is invalid');
    });
  });
});

    afterEach(() => {
      consoleSpy.mockRestore();
    });

// Additional tests to improve test coverage for SignUpForm

describe('SignUpForm Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Email Validation Edge Cases', () => {
    const invalidEmails = ['@example.com', 'jane.doe@', 'plainaddress', 'john.doe@example..com'];
    const validEmails = ['email@example.com', 'firstname.lastname@example.com', 'email@subdomain.example.com', 'firstname+lastname@example.com'];

    test.each(invalidEmails)('email "%s" should be invalid', (email) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test.each(validEmails)('email "%s" should be valid', (email) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeNull();
    });
  });

  describe('Password Validation Edge Cases', () => {
    const testCases = [
      { password: '12345678', expected: ['red', 'red', 'green', 'green'] }, // No letters
      { password: 'ABCDEFGH', expected: ['green', 'red', 'red', 'green'] }, // No lowercase, no numbers
      { password: 'abcdefgh', expected: ['red', 'green', 'red', 'green'] }, // No uppercase, no numbers
      { password: 'Ab1', expected: ['green', 'green', 'green', 'red'] }, // Not long enough
    ];

    test.each(testCases)('validates password "$password" criteria correctly', ({ password, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      const validationMessages = screen.getAllByRole('listitem');
      expected.forEach((color, index) => {
        expect(validationMessages[index].className).toMatch(new RegExp(color));
      });
    });
  });

  describe('Form Submission Edge Cases', () => {
    let consoleErrorSpy;

    beforeEach(() => {
      consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
      consoleErrorSpy.mockRestore();
    });

    test('does not submit form and logs error with invalid form', () => {
      fillOutForm({ email: 'invalid' }); // Explicitly set an invalid field
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(consoleErrorSpy).toHaveBeenCalledWith('Form is invalid');
    });
  });
});

    test('enables Create Account button with valid form', () => {
      fillOutForm();
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).not.toBeDisabled();
    });

// Additional tests to improve test coverage for SignUpForm

describe('SignUpForm Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Email Validation Edge Cases', () => {
    const invalidEmails = ['@example.com', 'jane.doe@', 'plainaddress', 'john.doe@example..com'];
    const validEmails = ['email@example.com', 'firstname.lastname@example.com', 'email@subdomain.example.com', 'firstname+lastname@example.com'];

    test.each(invalidEmails)('email "%s" should be invalid', (email) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test.each(validEmails)('email "%s" should be valid', (email) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeNull();
    });
  });

  describe('Password Validation Edge Cases', () => {
    const testCases = [
      { password: '12345678', expected: ['red', 'red', 'green', 'green'] }, // No letters
      { password: 'ABCDEFGH', expected: ['green', 'red', 'red', 'green'] }, // No lowercase, no numbers
      { password: 'abcdefgh', expected: ['red', 'green', 'red', 'green'] }, // No uppercase, no numbers
      { password: 'Ab1', expected: ['green', 'green', 'green', 'red'] }, // Not long enough
    ];

    test.each(testCases)('validates password "$password" criteria correctly', ({ password, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      const validationMessages = screen.getAllByRole('listitem');
      expected.forEach((color, index) => {
        expect(validationMessages[index].className).toMatch(new RegExp(color));
      });
    });
  });

  describe('Form Submission Edge Cases', () => {
    let consoleErrorSpy;

    beforeEach(() => {
      consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
      consoleErrorSpy.mockRestore();
    });

    test('does not submit form and logs error with invalid form', () => {
      fillOutForm({ email: 'invalid' }); // Explicitly set an invalid field
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(consoleErrorSpy).toHaveBeenCalledWith('Form is invalid');
    });
  });
});

    test('disables Create Account button with invalid form', () => {
      fillOutForm({ firstName: '' });

// Additional tests to improve test coverage for SignUpForm

describe('SignUpForm Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Email Validation Edge Cases', () => {
    const invalidEmails = ['@example.com', 'jane.doe@', 'plainaddress', 'john.doe@example..com'];
    const validEmails = ['email@example.com', 'firstname.lastname@example.com', 'email@subdomain.example.com', 'firstname+lastname@example.com'];

    test.each(invalidEmails)('email "%s" should be invalid', (email) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test.each(validEmails)('email "%s" should be valid', (email) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeNull();
    });
  });

  describe('Password Validation Edge Cases', () => {
    const testCases = [
      { password: '12345678', expected: ['red', 'red', 'green', 'green'] }, // No letters
      { password: 'ABCDEFGH', expected: ['green', 'red', 'red', 'green'] }, // No lowercase, no numbers
      { password: 'abcdefgh', expected: ['red', 'green', 'red', 'green'] }, // No uppercase, no numbers
      { password: 'Ab1', expected: ['green', 'green', 'green', 'red'] }, // Not long enough
    ];

    test.each(testCases)('validates password "$password" criteria correctly', ({ password, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      const validationMessages = screen.getAllByRole('listitem');
      expected.forEach((color, index) => {
        expect(validationMessages[index].className).toMatch(new RegExp(color));
      });
    });
  });

  describe('Form Submission Edge Cases', () => {
    let consoleErrorSpy;

    beforeEach(() => {
      consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
      consoleErrorSpy.mockRestore();
    });

    test('does not submit form and logs error with invalid form', () => {
      fillOutForm({ email: 'invalid' }); // Explicitly set an invalid field
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(consoleErrorSpy).toHaveBeenCalledWith('Form is invalid');
    });
  });
}); // Explicitly set an invalid field
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

// Additional tests to improve test coverage for SignUpForm

describe('SignUpForm Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Email Validation Edge Cases', () => {
    const invalidEmails = ['@example.com', 'jane.doe@', 'plainaddress', 'john.doe@example..com'];
    const validEmails = ['email@example.com', 'firstname.lastname@example.com', 'email@subdomain.example.com', 'firstname+lastname@example.com'];

    test.each(invalidEmails)('email "%s" should be invalid', (email) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test.each(validEmails)('email "%s" should be valid', (email) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeNull();
    });
  });

  describe('Password Validation Edge Cases', () => {
    const testCases = [
      { password: '12345678', expected: ['red', 'red', 'green', 'green'] }, // No letters
      { password: 'ABCDEFGH', expected: ['green', 'red', 'red', 'green'] }, // No lowercase, no numbers
      { password: 'abcdefgh', expected: ['red', 'green', 'red', 'green'] }, // No uppercase, no numbers
      { password: 'Ab1', expected: ['green', 'green', 'green', 'red'] }, // Not long enough
    ];

    test.each(testCases)('validates password "$password" criteria correctly', ({ password, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      const validationMessages = screen.getAllByRole('listitem');
      expected.forEach((color, index) => {
        expect(validationMessages[index].className).toMatch(new RegExp(color));
      });
    });
  });

  describe('Form Submission Edge Cases', () => {
    let consoleErrorSpy;

    beforeEach(() => {
      consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
      consoleErrorSpy.mockRestore();
    });

    test('does not submit form and logs error with invalid form', () => {
      fillOutForm({ email: 'invalid' }); // Explicitly set an invalid field
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(consoleErrorSpy).toHaveBeenCalledWith('Form is invalid');
    });
  });
});

    test('calls console log with correct data on valid form submission', () => {
      const formData = fillOutForm();
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(consoleSpy).toHaveBeenLastCalledWith('Form submitted:', formData);
    });

// Additional tests to improve test coverage for SignUpForm

describe('SignUpForm Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Email Validation Edge Cases', () => {
    const invalidEmails = ['@example.com', 'jane.doe@', 'plainaddress', 'john.doe@example..com'];
    const validEmails = ['email@example.com', 'firstname.lastname@example.com', 'email@subdomain.example.com', 'firstname+lastname@example.com'];

    test.each(invalidEmails)('email "%s" should be invalid', (email) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test.each(validEmails)('email "%s" should be valid', (email) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeNull();
    });
  });

  describe('Password Validation Edge Cases', () => {
    const testCases = [
      { password: '12345678', expected: ['red', 'red', 'green', 'green'] }, // No letters
      { password: 'ABCDEFGH', expected: ['green', 'red', 'red', 'green'] }, // No lowercase, no numbers
      { password: 'abcdefgh', expected: ['red', 'green', 'red', 'green'] }, // No uppercase, no numbers
      { password: 'Ab1', expected: ['green', 'green', 'green', 'red'] }, // Not long enough
    ];

    test.each(testCases)('validates password "$password" criteria correctly', ({ password, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      const validationMessages = screen.getAllByRole('listitem');
      expected.forEach((color, index) => {
        expect(validationMessages[index].className).toMatch(new RegExp(color));
      });
    });
  });

  describe('Form Submission Edge Cases', () => {
    let consoleErrorSpy;

    beforeEach(() => {
      consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
      consoleErrorSpy.mockRestore();
    });

    test('does not submit form and logs error with invalid form', () => {
      fillOutForm({ email: 'invalid' }); // Explicitly set an invalid field
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(consoleErrorSpy).toHaveBeenCalledWith('Form is invalid');
    });
  });
});
  });

// Additional tests to improve test coverage for SignUpForm

describe('SignUpForm Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Email Validation Edge Cases', () => {
    const invalidEmails = ['@example.com', 'jane.doe@', 'plainaddress', 'john.doe@example..com'];
    const validEmails = ['email@example.com', 'firstname.lastname@example.com', 'email@subdomain.example.com', 'firstname+lastname@example.com'];

    test.each(invalidEmails)('email "%s" should be invalid', (email) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test.each(validEmails)('email "%s" should be valid', (email) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeNull();
    });
  });

  describe('Password Validation Edge Cases', () => {
    const testCases = [
      { password: '12345678', expected: ['red', 'red', 'green', 'green'] }, // No letters
      { password: 'ABCDEFGH', expected: ['green', 'red', 'red', 'green'] }, // No lowercase, no numbers
      { password: 'abcdefgh', expected: ['red', 'green', 'red', 'green'] }, // No uppercase, no numbers
      { password: 'Ab1', expected: ['green', 'green', 'green', 'red'] }, // Not long enough
    ];

    test.each(testCases)('validates password "$password" criteria correctly', ({ password, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      const validationMessages = screen.getAllByRole('listitem');
      expected.forEach((color, index) => {
        expect(validationMessages[index].className).toMatch(new RegExp(color));
      });
    });
  });

  describe('Form Submission Edge Cases', () => {
    let consoleErrorSpy;

    beforeEach(() => {
      consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
      consoleErrorSpy.mockRestore();
    });

    test('does not submit form and logs error with invalid form', () => {
      fillOutForm({ email: 'invalid' }); // Explicitly set an invalid field
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(consoleErrorSpy).toHaveBeenCalledWith('Form is invalid');
    });
  });
});
});

// Additional tests to improve test coverage for SignUpForm

describe('SignUpForm Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Email Validation Edge Cases', () => {
    const invalidEmails = ['@example.com', 'jane.doe@', 'plainaddress', 'john.doe@example..com'];
    const validEmails = ['email@example.com', 'firstname.lastname@example.com', 'email@subdomain.example.com', 'firstname+lastname@example.com'];

    test.each(invalidEmails)('email "%s" should be invalid', (email) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test.each(validEmails)('email "%s" should be valid', (email) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeNull();
    });
  });

  describe('Password Validation Edge Cases', () => {
    const testCases = [
      { password: '12345678', expected: ['red', 'red', 'green', 'green'] }, // No letters
      { password: 'ABCDEFGH', expected: ['green', 'red', 'red', 'green'] }, // No lowercase, no numbers
      { password: 'abcdefgh', expected: ['red', 'green', 'red', 'green'] }, // No uppercase, no numbers
      { password: 'Ab1', expected: ['green', 'green', 'green', 'red'] }, // Not long enough
    ];

    test.each(testCases)('validates password "$password" criteria correctly', ({ password, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      const validationMessages = screen.getAllByRole('listitem');
      expected.forEach((color, index) => {
        expect(validationMessages[index].className).toMatch(new RegExp(color));
      });
    });
  });

  describe('Form Submission Edge Cases', () => {
    let consoleErrorSpy;

    beforeEach(() => {
      consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
      consoleErrorSpy.mockRestore();
    });

    test('does not submit form and logs error with invalid form', () => {
      fillOutForm({ email: 'invalid' }); // Explicitly set an invalid field
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(consoleErrorSpy).toHaveBeenCalledWith('Form is invalid');
    });
  });
});
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

describe('SignUpForm additional tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Negative Form Validation', () => {
    test('invalidates form when password lacks uppercase characters', () => {
      const formData = fillOutForm({ password: 'password123' });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: formData.password } });
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when password lacks lowercase characters', () => {
      const formData = fillOutForm({ password: 'PASSWORD123' });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: formData.password } });
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when password lacks numbers', () => {
      const formData = fillOutForm({ password: 'Password' });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: formData.password } });
      expect(screen.getByText(/1 number/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when password is not long enough', () => {
      const formData = fillOutForm({ password: 'Pass1' });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: formData.password } });
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when email is empty', () => {
      fillOutForm({ email: '' });
      fireEvent.blur(screen.getByLabelText(LABELS.email));
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when first name is empty', () => {
      fillOutForm({ firstName: '' });
      fireEvent.blur(screen.getByLabelText(LABELS.firstName));
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when last name is empty', () => {
      fillOutForm({ lastName: '' });
      fireEvent.blur(screen.getByLabelText(LABELS.lastName));
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });
  });

  describe('Form Submission', () => {
    let consoleErrorSpy;

    beforeEach(() => {
      consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
      consoleErrorSpy.mockRestore();
    });

    test('logs an error to the console with invalid form submission', () => {
      fillOutForm({ email: 'invalid' }); // Explicitly set an invalid email
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(consoleErrorSpy).toHaveBeenCalledWith('Form is invalid');
    });
  });
});
  fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: formData.lastName } });

describe('SignUpForm additional tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Negative Form Validation', () => {
    test('invalidates form when password lacks uppercase characters', () => {
      const formData = fillOutForm({ password: 'password123' });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: formData.password } });
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when password lacks lowercase characters', () => {
      const formData = fillOutForm({ password: 'PASSWORD123' });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: formData.password } });
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when password lacks numbers', () => {
      const formData = fillOutForm({ password: 'Password' });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: formData.password } });
      expect(screen.getByText(/1 number/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when password is not long enough', () => {
      const formData = fillOutForm({ password: 'Pass1' });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: formData.password } });
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when email is empty', () => {
      fillOutForm({ email: '' });
      fireEvent.blur(screen.getByLabelText(LABELS.email));
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when first name is empty', () => {
      fillOutForm({ firstName: '' });
      fireEvent.blur(screen.getByLabelText(LABELS.firstName));
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when last name is empty', () => {
      fillOutForm({ lastName: '' });
      fireEvent.blur(screen.getByLabelText(LABELS.lastName));
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });
  });

  describe('Form Submission', () => {
    let consoleErrorSpy;

    beforeEach(() => {
      consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
      consoleErrorSpy.mockRestore();
    });

    test('logs an error to the console with invalid form submission', () => {
      fillOutForm({ email: 'invalid' }); // Explicitly set an invalid email
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(consoleErrorSpy).toHaveBeenCalledWith('Form is invalid');
    });
  });
});
  fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: formData.email } });

describe('SignUpForm additional tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Negative Form Validation', () => {
    test('invalidates form when password lacks uppercase characters', () => {
      const formData = fillOutForm({ password: 'password123' });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: formData.password } });
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when password lacks lowercase characters', () => {
      const formData = fillOutForm({ password: 'PASSWORD123' });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: formData.password } });
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when password lacks numbers', () => {
      const formData = fillOutForm({ password: 'Password' });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: formData.password } });
      expect(screen.getByText(/1 number/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when password is not long enough', () => {
      const formData = fillOutForm({ password: 'Pass1' });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: formData.password } });
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when email is empty', () => {
      fillOutForm({ email: '' });
      fireEvent.blur(screen.getByLabelText(LABELS.email));
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when first name is empty', () => {
      fillOutForm({ firstName: '' });
      fireEvent.blur(screen.getByLabelText(LABELS.firstName));
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when last name is empty', () => {
      fillOutForm({ lastName: '' });
      fireEvent.blur(screen.getByLabelText(LABELS.lastName));
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });
  });

  describe('Form Submission', () => {
    let consoleErrorSpy;

    beforeEach(() => {
      consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
      consoleErrorSpy.mockRestore();
    });

    test('logs an error to the console with invalid form submission', () => {
      fillOutForm({ email: 'invalid' }); // Explicitly set an invalid email
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(consoleErrorSpy).toHaveBeenCalledWith('Form is invalid');
    });
  });
});
  fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: formData.password } });

describe('SignUpForm additional tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Negative Form Validation', () => {
    test('invalidates form when password lacks uppercase characters', () => {
      const formData = fillOutForm({ password: 'password123' });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: formData.password } });
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when password lacks lowercase characters', () => {
      const formData = fillOutForm({ password: 'PASSWORD123' });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: formData.password } });
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when password lacks numbers', () => {
      const formData = fillOutForm({ password: 'Password' });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: formData.password } });
      expect(screen.getByText(/1 number/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when password is not long enough', () => {
      const formData = fillOutForm({ password: 'Pass1' });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: formData.password } });
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when email is empty', () => {
      fillOutForm({ email: '' });
      fireEvent.blur(screen.getByLabelText(LABELS.email));
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when first name is empty', () => {
      fillOutForm({ firstName: '' });
      fireEvent.blur(screen.getByLabelText(LABELS.firstName));
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when last name is empty', () => {
      fillOutForm({ lastName: '' });
      fireEvent.blur(screen.getByLabelText(LABELS.lastName));
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });
  });

  describe('Form Submission', () => {
    let consoleErrorSpy;

    beforeEach(() => {
      consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
      consoleErrorSpy.mockRestore();
    });

    test('logs an error to the console with invalid form submission', () => {
      fillOutForm({ email: 'invalid' }); // Explicitly set an invalid email
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

describe('SignUpForm additional tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Negative Form Validation', () => {
    test('invalidates form when password lacks uppercase characters', () => {
      const formData = fillOutForm({ password: 'password123' });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: formData.password } });
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when password lacks lowercase characters', () => {
      const formData = fillOutForm({ password: 'PASSWORD123' });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: formData.password } });
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when password lacks numbers', () => {
      const formData = fillOutForm({ password: 'Password' });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: formData.password } });
      expect(screen.getByText(/1 number/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when password is not long enough', () => {
      const formData = fillOutForm({ password: 'Pass1' });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: formData.password } });
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when email is empty', () => {
      fillOutForm({ email: '' });
      fireEvent.blur(screen.getByLabelText(LABELS.email));
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when first name is empty', () => {
      fillOutForm({ firstName: '' });
      fireEvent.blur(screen.getByLabelText(LABELS.firstName));
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when last name is empty', () => {
      fillOutForm({ lastName: '' });
      fireEvent.blur(screen.getByLabelText(LABELS.lastName));
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });
  });

  describe('Form Submission', () => {
    let consoleErrorSpy;

    beforeEach(() => {
      consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
      consoleErrorSpy.mockRestore();
    });

    test('logs an error to the console with invalid form submission', () => {
      fillOutForm({ email: 'invalid' }); // Explicitly set an invalid email
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

describe('SignUpForm additional tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Negative Form Validation', () => {
    test('invalidates form when password lacks uppercase characters', () => {
      const formData = fillOutForm({ password: 'password123' });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: formData.password } });
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when password lacks lowercase characters', () => {
      const formData = fillOutForm({ password: 'PASSWORD123' });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: formData.password } });
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when password lacks numbers', () => {
      const formData = fillOutForm({ password: 'Password' });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: formData.password } });
      expect(screen.getByText(/1 number/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when password is not long enough', () => {
      const formData = fillOutForm({ password: 'Pass1' });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: formData.password } });
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when email is empty', () => {
      fillOutForm({ email: '' });
      fireEvent.blur(screen.getByLabelText(LABELS.email));
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when first name is empty', () => {
      fillOutForm({ firstName: '' });
      fireEvent.blur(screen.getByLabelText(LABELS.firstName));
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when last name is empty', () => {
      fillOutForm({ lastName: '' });
      fireEvent.blur(screen.getByLabelText(LABELS.lastName));
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });
  });

  describe('Form Submission', () => {
    let consoleErrorSpy;

    beforeEach(() => {
      consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
      consoleErrorSpy.mockRestore();
    });

    test('logs an error to the console with invalid form submission', () => {
      fillOutForm({ email: 'invalid' }); // Explicitly set an invalid email
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(consoleErrorSpy).toHaveBeenCalledWith('Form is invalid');
    });
  });
});

  describe('Field Entry', () => {
    test.each(Object.entries(LABELS))('allows entry of %s', (fieldName, labelRegex) => {
      const value = 'TestValue';
      fireEvent.change(screen.getByLabelText(labelRegex), { target: { value } });

describe('SignUpForm additional tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Negative Form Validation', () => {
    test('invalidates form when password lacks uppercase characters', () => {
      const formData = fillOutForm({ password: 'password123' });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: formData.password } });
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when password lacks lowercase characters', () => {
      const formData = fillOutForm({ password: 'PASSWORD123' });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: formData.password } });
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when password lacks numbers', () => {
      const formData = fillOutForm({ password: 'Password' });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: formData.password } });
      expect(screen.getByText(/1 number/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when password is not long enough', () => {
      const formData = fillOutForm({ password: 'Pass1' });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: formData.password } });
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when email is empty', () => {
      fillOutForm({ email: '' });
      fireEvent.blur(screen.getByLabelText(LABELS.email));
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when first name is empty', () => {
      fillOutForm({ firstName: '' });
      fireEvent.blur(screen.getByLabelText(LABELS.firstName));
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when last name is empty', () => {
      fillOutForm({ lastName: '' });
      fireEvent.blur(screen.getByLabelText(LABELS.lastName));
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });
  });

  describe('Form Submission', () => {
    let consoleErrorSpy;

    beforeEach(() => {
      consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
      consoleErrorSpy.mockRestore();
    });

    test('logs an error to the console with invalid form submission', () => {
      fillOutForm({ email: 'invalid' }); // Explicitly set an invalid email
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(consoleErrorSpy).toHaveBeenCalledWith('Form is invalid');
    });
  });
});
      expect(screen.getByLabelText(labelRegex)).toHaveValue(value);
    });

describe('SignUpForm additional tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Negative Form Validation', () => {
    test('invalidates form when password lacks uppercase characters', () => {
      const formData = fillOutForm({ password: 'password123' });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: formData.password } });
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when password lacks lowercase characters', () => {
      const formData = fillOutForm({ password: 'PASSWORD123' });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: formData.password } });
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when password lacks numbers', () => {
      const formData = fillOutForm({ password: 'Password' });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: formData.password } });
      expect(screen.getByText(/1 number/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when password is not long enough', () => {
      const formData = fillOutForm({ password: 'Pass1' });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: formData.password } });
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when email is empty', () => {
      fillOutForm({ email: '' });
      fireEvent.blur(screen.getByLabelText(LABELS.email));
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when first name is empty', () => {
      fillOutForm({ firstName: '' });
      fireEvent.blur(screen.getByLabelText(LABELS.firstName));
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when last name is empty', () => {
      fillOutForm({ lastName: '' });
      fireEvent.blur(screen.getByLabelText(LABELS.lastName));
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });
  });

  describe('Form Submission', () => {
    let consoleErrorSpy;

    beforeEach(() => {
      consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
      consoleErrorSpy.mockRestore();
    });

    test('logs an error to the console with invalid form submission', () => {
      fillOutForm({ email: 'invalid' }); // Explicitly set an invalid email
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(consoleErrorSpy).toHaveBeenCalledWith('Form is invalid');
    });
  });
});
  });

describe('SignUpForm additional tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Negative Form Validation', () => {
    test('invalidates form when password lacks uppercase characters', () => {
      const formData = fillOutForm({ password: 'password123' });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: formData.password } });
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when password lacks lowercase characters', () => {
      const formData = fillOutForm({ password: 'PASSWORD123' });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: formData.password } });
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when password lacks numbers', () => {
      const formData = fillOutForm({ password: 'Password' });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: formData.password } });
      expect(screen.getByText(/1 number/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when password is not long enough', () => {
      const formData = fillOutForm({ password: 'Pass1' });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: formData.password } });
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when email is empty', () => {
      fillOutForm({ email: '' });
      fireEvent.blur(screen.getByLabelText(LABELS.email));
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when first name is empty', () => {
      fillOutForm({ firstName: '' });
      fireEvent.blur(screen.getByLabelText(LABELS.firstName));
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when last name is empty', () => {
      fillOutForm({ lastName: '' });
      fireEvent.blur(screen.getByLabelText(LABELS.lastName));
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });
  });

  describe('Form Submission', () => {
    let consoleErrorSpy;

    beforeEach(() => {
      consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
      consoleErrorSpy.mockRestore();
    });

    test('logs an error to the console with invalid form submission', () => {
      fillOutForm({ email: 'invalid' }); // Explicitly set an invalid email
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(consoleErrorSpy).toHaveBeenCalledWith('Form is invalid');
    });
  });
});

  describe('Form Validation', () => {
    test('validates email format correctly', () => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'invalid' } });

describe('SignUpForm additional tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Negative Form Validation', () => {
    test('invalidates form when password lacks uppercase characters', () => {
      const formData = fillOutForm({ password: 'password123' });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: formData.password } });
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when password lacks lowercase characters', () => {
      const formData = fillOutForm({ password: 'PASSWORD123' });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: formData.password } });
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when password lacks numbers', () => {
      const formData = fillOutForm({ password: 'Password' });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: formData.password } });
      expect(screen.getByText(/1 number/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when password is not long enough', () => {
      const formData = fillOutForm({ password: 'Pass1' });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: formData.password } });
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when email is empty', () => {
      fillOutForm({ email: '' });
      fireEvent.blur(screen.getByLabelText(LABELS.email));
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when first name is empty', () => {
      fillOutForm({ firstName: '' });
      fireEvent.blur(screen.getByLabelText(LABELS.firstName));
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when last name is empty', () => {
      fillOutForm({ lastName: '' });
      fireEvent.blur(screen.getByLabelText(LABELS.lastName));
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });
  });

  describe('Form Submission', () => {
    let consoleErrorSpy;

    beforeEach(() => {
      consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
      consoleErrorSpy.mockRestore();
    });

    test('logs an error to the console with invalid form submission', () => {
      fillOutForm({ email: 'invalid' }); // Explicitly set an invalid email
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(consoleErrorSpy).toHaveBeenCalledWith('Form is invalid');
    });
  });
});
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: VALID_EMAIL } });

describe('SignUpForm additional tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Negative Form Validation', () => {
    test('invalidates form when password lacks uppercase characters', () => {
      const formData = fillOutForm({ password: 'password123' });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: formData.password } });
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when password lacks lowercase characters', () => {
      const formData = fillOutForm({ password: 'PASSWORD123' });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: formData.password } });
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when password lacks numbers', () => {
      const formData = fillOutForm({ password: 'Password' });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: formData.password } });
      expect(screen.getByText(/1 number/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when password is not long enough', () => {
      const formData = fillOutForm({ password: 'Pass1' });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: formData.password } });
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when email is empty', () => {
      fillOutForm({ email: '' });
      fireEvent.blur(screen.getByLabelText(LABELS.email));
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when first name is empty', () => {
      fillOutForm({ firstName: '' });
      fireEvent.blur(screen.getByLabelText(LABELS.firstName));
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when last name is empty', () => {
      fillOutForm({ lastName: '' });
      fireEvent.blur(screen.getByLabelText(LABELS.lastName));
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });
  });

  describe('Form Submission', () => {
    let consoleErrorSpy;

    beforeEach(() => {
      consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
      consoleErrorSpy.mockRestore();
    });

    test('logs an error to the console with invalid form submission', () => {
      fillOutForm({ email: 'invalid' }); // Explicitly set an invalid email
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(consoleErrorSpy).toHaveBeenCalledWith('Form is invalid');
    });
  });
});
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeNull();
    });

describe('SignUpForm additional tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Negative Form Validation', () => {
    test('invalidates form when password lacks uppercase characters', () => {
      const formData = fillOutForm({ password: 'password123' });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: formData.password } });
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when password lacks lowercase characters', () => {
      const formData = fillOutForm({ password: 'PASSWORD123' });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: formData.password } });
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when password lacks numbers', () => {
      const formData = fillOutForm({ password: 'Password' });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: formData.password } });
      expect(screen.getByText(/1 number/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when password is not long enough', () => {
      const formData = fillOutForm({ password: 'Pass1' });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: formData.password } });
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when email is empty', () => {
      fillOutForm({ email: '' });
      fireEvent.blur(screen.getByLabelText(LABELS.email));
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when first name is empty', () => {
      fillOutForm({ firstName: '' });
      fireEvent.blur(screen.getByLabelText(LABELS.firstName));
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when last name is empty', () => {
      fillOutForm({ lastName: '' });
      fireEvent.blur(screen.getByLabelText(LABELS.lastName));
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });
  });

  describe('Form Submission', () => {
    let consoleErrorSpy;

    beforeEach(() => {
      consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
      consoleErrorSpy.mockRestore();
    });

    test('logs an error to the console with invalid form submission', () => {
      fillOutForm({ email: 'invalid' }); // Explicitly set an invalid email
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(consoleErrorSpy).toHaveBeenCalledWith('Form is invalid');
    });
  });
});

    test('validates password criteria correctly', () => {
      const password = screen.getByLabelText(LABELS.password);
      fireEvent.change(password, { target: { value: 'short' } });

describe('SignUpForm additional tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Negative Form Validation', () => {
    test('invalidates form when password lacks uppercase characters', () => {
      const formData = fillOutForm({ password: 'password123' });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: formData.password } });
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when password lacks lowercase characters', () => {
      const formData = fillOutForm({ password: 'PASSWORD123' });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: formData.password } });
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when password lacks numbers', () => {
      const formData = fillOutForm({ password: 'Password' });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: formData.password } });
      expect(screen.getByText(/1 number/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when password is not long enough', () => {
      const formData = fillOutForm({ password: 'Pass1' });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: formData.password } });
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when email is empty', () => {
      fillOutForm({ email: '' });
      fireEvent.blur(screen.getByLabelText(LABELS.email));
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when first name is empty', () => {
      fillOutForm({ firstName: '' });
      fireEvent.blur(screen.getByLabelText(LABELS.firstName));
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when last name is empty', () => {
      fillOutForm({ lastName: '' });
      fireEvent.blur(screen.getByLabelText(LABELS.lastName));
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });
  });

  describe('Form Submission', () => {
    let consoleErrorSpy;

    beforeEach(() => {
      consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
      consoleErrorSpy.mockRestore();
    });

    test('logs an error to the console with invalid form submission', () => {
      fillOutForm({ email: 'invalid' }); // Explicitly set an invalid email
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(consoleErrorSpy).toHaveBeenCalledWith('Form is invalid');
    });
  });
});
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
      fireEvent.change(password, { target: { value: 'LongEnough1' } });

describe('SignUpForm additional tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Negative Form Validation', () => {
    test('invalidates form when password lacks uppercase characters', () => {
      const formData = fillOutForm({ password: 'password123' });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: formData.password } });
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when password lacks lowercase characters', () => {
      const formData = fillOutForm({ password: 'PASSWORD123' });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: formData.password } });
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when password lacks numbers', () => {
      const formData = fillOutForm({ password: 'Password' });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: formData.password } });
      expect(screen.getByText(/1 number/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when password is not long enough', () => {
      const formData = fillOutForm({ password: 'Pass1' });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: formData.password } });
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when email is empty', () => {
      fillOutForm({ email: '' });
      fireEvent.blur(screen.getByLabelText(LABELS.email));
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when first name is empty', () => {
      fillOutForm({ firstName: '' });
      fireEvent.blur(screen.getByLabelText(LABELS.firstName));
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when last name is empty', () => {
      fillOutForm({ lastName: '' });
      fireEvent.blur(screen.getByLabelText(LABELS.lastName));
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });
  });

  describe('Form Submission', () => {
    let consoleErrorSpy;

    beforeEach(() => {
      consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
      consoleErrorSpy.mockRestore();
    });

    test('logs an error to the console with invalid form submission', () => {
      fillOutForm({ email: 'invalid' }); // Explicitly set an invalid email
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

describe('SignUpForm additional tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Negative Form Validation', () => {
    test('invalidates form when password lacks uppercase characters', () => {
      const formData = fillOutForm({ password: 'password123' });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: formData.password } });
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when password lacks lowercase characters', () => {
      const formData = fillOutForm({ password: 'PASSWORD123' });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: formData.password } });
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when password lacks numbers', () => {
      const formData = fillOutForm({ password: 'Password' });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: formData.password } });
      expect(screen.getByText(/1 number/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when password is not long enough', () => {
      const formData = fillOutForm({ password: 'Pass1' });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: formData.password } });
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when email is empty', () => {
      fillOutForm({ email: '' });
      fireEvent.blur(screen.getByLabelText(LABELS.email));
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when first name is empty', () => {
      fillOutForm({ firstName: '' });
      fireEvent.blur(screen.getByLabelText(LABELS.firstName));
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when last name is empty', () => {
      fillOutForm({ lastName: '' });
      fireEvent.blur(screen.getByLabelText(LABELS.lastName));
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });
  });

  describe('Form Submission', () => {
    let consoleErrorSpy;

    beforeEach(() => {
      consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
      consoleErrorSpy.mockRestore();
    });

    test('logs an error to the console with invalid form submission', () => {
      fillOutForm({ email: 'invalid' }); // Explicitly set an invalid email
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(consoleErrorSpy).toHaveBeenCalledWith('Form is invalid');
    });
  });
});
  });

describe('SignUpForm additional tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Negative Form Validation', () => {
    test('invalidates form when password lacks uppercase characters', () => {
      const formData = fillOutForm({ password: 'password123' });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: formData.password } });
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when password lacks lowercase characters', () => {
      const formData = fillOutForm({ password: 'PASSWORD123' });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: formData.password } });
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when password lacks numbers', () => {
      const formData = fillOutForm({ password: 'Password' });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: formData.password } });
      expect(screen.getByText(/1 number/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when password is not long enough', () => {
      const formData = fillOutForm({ password: 'Pass1' });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: formData.password } });
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when email is empty', () => {
      fillOutForm({ email: '' });
      fireEvent.blur(screen.getByLabelText(LABELS.email));
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when first name is empty', () => {
      fillOutForm({ firstName: '' });
      fireEvent.blur(screen.getByLabelText(LABELS.firstName));
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when last name is empty', () => {
      fillOutForm({ lastName: '' });
      fireEvent.blur(screen.getByLabelText(LABELS.lastName));
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });
  });

  describe('Form Submission', () => {
    let consoleErrorSpy;

    beforeEach(() => {
      consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
      consoleErrorSpy.mockRestore();
    });

    test('logs an error to the console with invalid form submission', () => {
      fillOutForm({ email: 'invalid' }); // Explicitly set an invalid email
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(consoleErrorSpy).toHaveBeenCalledWith('Form is invalid');
    });
  });
});

  describe('Form Submission', () => {
    let consoleSpy;

    beforeEach(() => {
      consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

describe('SignUpForm additional tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Negative Form Validation', () => {
    test('invalidates form when password lacks uppercase characters', () => {
      const formData = fillOutForm({ password: 'password123' });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: formData.password } });
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when password lacks lowercase characters', () => {
      const formData = fillOutForm({ password: 'PASSWORD123' });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: formData.password } });
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when password lacks numbers', () => {
      const formData = fillOutForm({ password: 'Password' });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: formData.password } });
      expect(screen.getByText(/1 number/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when password is not long enough', () => {
      const formData = fillOutForm({ password: 'Pass1' });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: formData.password } });
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when email is empty', () => {
      fillOutForm({ email: '' });
      fireEvent.blur(screen.getByLabelText(LABELS.email));
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when first name is empty', () => {
      fillOutForm({ firstName: '' });
      fireEvent.blur(screen.getByLabelText(LABELS.firstName));
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when last name is empty', () => {
      fillOutForm({ lastName: '' });
      fireEvent.blur(screen.getByLabelText(LABELS.lastName));
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });
  });

  describe('Form Submission', () => {
    let consoleErrorSpy;

    beforeEach(() => {
      consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
      consoleErrorSpy.mockRestore();
    });

    test('logs an error to the console with invalid form submission', () => {
      fillOutForm({ email: 'invalid' }); // Explicitly set an invalid email
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(consoleErrorSpy).toHaveBeenCalledWith('Form is invalid');
    });
  });
});
    });

describe('SignUpForm additional tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Negative Form Validation', () => {
    test('invalidates form when password lacks uppercase characters', () => {
      const formData = fillOutForm({ password: 'password123' });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: formData.password } });
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when password lacks lowercase characters', () => {
      const formData = fillOutForm({ password: 'PASSWORD123' });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: formData.password } });
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when password lacks numbers', () => {
      const formData = fillOutForm({ password: 'Password' });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: formData.password } });
      expect(screen.getByText(/1 number/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when password is not long enough', () => {
      const formData = fillOutForm({ password: 'Pass1' });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: formData.password } });
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when email is empty', () => {
      fillOutForm({ email: '' });
      fireEvent.blur(screen.getByLabelText(LABELS.email));
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when first name is empty', () => {
      fillOutForm({ firstName: '' });
      fireEvent.blur(screen.getByLabelText(LABELS.firstName));
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when last name is empty', () => {
      fillOutForm({ lastName: '' });
      fireEvent.blur(screen.getByLabelText(LABELS.lastName));
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });
  });

  describe('Form Submission', () => {
    let consoleErrorSpy;

    beforeEach(() => {
      consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
      consoleErrorSpy.mockRestore();
    });

    test('logs an error to the console with invalid form submission', () => {
      fillOutForm({ email: 'invalid' }); // Explicitly set an invalid email
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(consoleErrorSpy).toHaveBeenCalledWith('Form is invalid');
    });
  });
});

    afterEach(() => {
      consoleSpy.mockRestore();
    });

describe('SignUpForm additional tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Negative Form Validation', () => {
    test('invalidates form when password lacks uppercase characters', () => {
      const formData = fillOutForm({ password: 'password123' });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: formData.password } });
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when password lacks lowercase characters', () => {
      const formData = fillOutForm({ password: 'PASSWORD123' });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: formData.password } });
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when password lacks numbers', () => {
      const formData = fillOutForm({ password: 'Password' });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: formData.password } });
      expect(screen.getByText(/1 number/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when password is not long enough', () => {
      const formData = fillOutForm({ password: 'Pass1' });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: formData.password } });
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when email is empty', () => {
      fillOutForm({ email: '' });
      fireEvent.blur(screen.getByLabelText(LABELS.email));
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when first name is empty', () => {
      fillOutForm({ firstName: '' });
      fireEvent.blur(screen.getByLabelText(LABELS.firstName));
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when last name is empty', () => {
      fillOutForm({ lastName: '' });
      fireEvent.blur(screen.getByLabelText(LABELS.lastName));
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });
  });

  describe('Form Submission', () => {
    let consoleErrorSpy;

    beforeEach(() => {
      consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
      consoleErrorSpy.mockRestore();
    });

    test('logs an error to the console with invalid form submission', () => {
      fillOutForm({ email: 'invalid' }); // Explicitly set an invalid email
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(consoleErrorSpy).toHaveBeenCalledWith('Form is invalid');
    });
  });
});

    test('enables Create Account button with valid form', () => {
      fillOutForm();
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).not.toBeDisabled();
    });

describe('SignUpForm additional tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Negative Form Validation', () => {
    test('invalidates form when password lacks uppercase characters', () => {
      const formData = fillOutForm({ password: 'password123' });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: formData.password } });
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when password lacks lowercase characters', () => {
      const formData = fillOutForm({ password: 'PASSWORD123' });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: formData.password } });
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when password lacks numbers', () => {
      const formData = fillOutForm({ password: 'Password' });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: formData.password } });
      expect(screen.getByText(/1 number/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when password is not long enough', () => {
      const formData = fillOutForm({ password: 'Pass1' });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: formData.password } });
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when email is empty', () => {
      fillOutForm({ email: '' });
      fireEvent.blur(screen.getByLabelText(LABELS.email));
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when first name is empty', () => {
      fillOutForm({ firstName: '' });
      fireEvent.blur(screen.getByLabelText(LABELS.firstName));
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when last name is empty', () => {
      fillOutForm({ lastName: '' });
      fireEvent.blur(screen.getByLabelText(LABELS.lastName));
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });
  });

  describe('Form Submission', () => {
    let consoleErrorSpy;

    beforeEach(() => {
      consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
      consoleErrorSpy.mockRestore();
    });

    test('logs an error to the console with invalid form submission', () => {
      fillOutForm({ email: 'invalid' }); // Explicitly set an invalid email
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(consoleErrorSpy).toHaveBeenCalledWith('Form is invalid');
    });
  });
});

    test('disables Create Account button with invalid form', () => {
      fillOutForm({ firstName: '' });

describe('SignUpForm additional tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Negative Form Validation', () => {
    test('invalidates form when password lacks uppercase characters', () => {
      const formData = fillOutForm({ password: 'password123' });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: formData.password } });
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when password lacks lowercase characters', () => {
      const formData = fillOutForm({ password: 'PASSWORD123' });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: formData.password } });
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when password lacks numbers', () => {
      const formData = fillOutForm({ password: 'Password' });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: formData.password } });
      expect(screen.getByText(/1 number/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when password is not long enough', () => {
      const formData = fillOutForm({ password: 'Pass1' });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: formData.password } });
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when email is empty', () => {
      fillOutForm({ email: '' });
      fireEvent.blur(screen.getByLabelText(LABELS.email));
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when first name is empty', () => {
      fillOutForm({ firstName: '' });
      fireEvent.blur(screen.getByLabelText(LABELS.firstName));
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when last name is empty', () => {
      fillOutForm({ lastName: '' });
      fireEvent.blur(screen.getByLabelText(LABELS.lastName));
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });
  });

  describe('Form Submission', () => {
    let consoleErrorSpy;

    beforeEach(() => {
      consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
      consoleErrorSpy.mockRestore();
    });

    test('logs an error to the console with invalid form submission', () => {
      fillOutForm({ email: 'invalid' }); // Explicitly set an invalid email
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(consoleErrorSpy).toHaveBeenCalledWith('Form is invalid');
    });
  });
}); // Explicitly set an invalid field
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

describe('SignUpForm additional tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Negative Form Validation', () => {
    test('invalidates form when password lacks uppercase characters', () => {
      const formData = fillOutForm({ password: 'password123' });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: formData.password } });
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when password lacks lowercase characters', () => {
      const formData = fillOutForm({ password: 'PASSWORD123' });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: formData.password } });
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when password lacks numbers', () => {
      const formData = fillOutForm({ password: 'Password' });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: formData.password } });
      expect(screen.getByText(/1 number/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when password is not long enough', () => {
      const formData = fillOutForm({ password: 'Pass1' });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: formData.password } });
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when email is empty', () => {
      fillOutForm({ email: '' });
      fireEvent.blur(screen.getByLabelText(LABELS.email));
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when first name is empty', () => {
      fillOutForm({ firstName: '' });
      fireEvent.blur(screen.getByLabelText(LABELS.firstName));
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when last name is empty', () => {
      fillOutForm({ lastName: '' });
      fireEvent.blur(screen.getByLabelText(LABELS.lastName));
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });
  });

  describe('Form Submission', () => {
    let consoleErrorSpy;

    beforeEach(() => {
      consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
      consoleErrorSpy.mockRestore();
    });

    test('logs an error to the console with invalid form submission', () => {
      fillOutForm({ email: 'invalid' }); // Explicitly set an invalid email
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

describe('SignUpForm additional tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Negative Form Validation', () => {
    test('invalidates form when password lacks uppercase characters', () => {
      const formData = fillOutForm({ password: 'password123' });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: formData.password } });
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when password lacks lowercase characters', () => {
      const formData = fillOutForm({ password: 'PASSWORD123' });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: formData.password } });
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when password lacks numbers', () => {
      const formData = fillOutForm({ password: 'Password' });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: formData.password } });
      expect(screen.getByText(/1 number/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when password is not long enough', () => {
      const formData = fillOutForm({ password: 'Pass1' });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: formData.password } });
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when email is empty', () => {
      fillOutForm({ email: '' });
      fireEvent.blur(screen.getByLabelText(LABELS.email));
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when first name is empty', () => {
      fillOutForm({ firstName: '' });
      fireEvent.blur(screen.getByLabelText(LABELS.firstName));
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when last name is empty', () => {
      fillOutForm({ lastName: '' });
      fireEvent.blur(screen.getByLabelText(LABELS.lastName));
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });
  });

  describe('Form Submission', () => {
    let consoleErrorSpy;

    beforeEach(() => {
      consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
      consoleErrorSpy.mockRestore();
    });

    test('logs an error to the console with invalid form submission', () => {
      fillOutForm({ email: 'invalid' }); // Explicitly set an invalid email
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(consoleErrorSpy).toHaveBeenCalledWith('Form is invalid');
    });
  });
});
  });

describe('SignUpForm additional tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Negative Form Validation', () => {
    test('invalidates form when password lacks uppercase characters', () => {
      const formData = fillOutForm({ password: 'password123' });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: formData.password } });
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when password lacks lowercase characters', () => {
      const formData = fillOutForm({ password: 'PASSWORD123' });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: formData.password } });
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when password lacks numbers', () => {
      const formData = fillOutForm({ password: 'Password' });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: formData.password } });
      expect(screen.getByText(/1 number/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when password is not long enough', () => {
      const formData = fillOutForm({ password: 'Pass1' });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: formData.password } });
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when email is empty', () => {
      fillOutForm({ email: '' });
      fireEvent.blur(screen.getByLabelText(LABELS.email));
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when first name is empty', () => {
      fillOutForm({ firstName: '' });
      fireEvent.blur(screen.getByLabelText(LABELS.firstName));
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when last name is empty', () => {
      fillOutForm({ lastName: '' });
      fireEvent.blur(screen.getByLabelText(LABELS.lastName));
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });
  });

  describe('Form Submission', () => {
    let consoleErrorSpy;

    beforeEach(() => {
      consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
      consoleErrorSpy.mockRestore();
    });

    test('logs an error to the console with invalid form submission', () => {
      fillOutForm({ email: 'invalid' }); // Explicitly set an invalid email
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(consoleErrorSpy).toHaveBeenCalledWith('Form is invalid');
    });
  });
});
});

describe('SignUpForm additional tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Negative Form Validation', () => {
    test('invalidates form when password lacks uppercase characters', () => {
      const formData = fillOutForm({ password: 'password123' });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: formData.password } });
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when password lacks lowercase characters', () => {
      const formData = fillOutForm({ password: 'PASSWORD123' });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: formData.password } });
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when password lacks numbers', () => {
      const formData = fillOutForm({ password: 'Password' });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: formData.password } });
      expect(screen.getByText(/1 number/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when password is not long enough', () => {
      const formData = fillOutForm({ password: 'Pass1' });
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: formData.password } });
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when email is empty', () => {
      fillOutForm({ email: '' });
      fireEvent.blur(screen.getByLabelText(LABELS.email));
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when first name is empty', () => {
      fillOutForm({ firstName: '' });
      fireEvent.blur(screen.getByLabelText(LABELS.firstName));
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('invalidates form when last name is empty', () => {
      fillOutForm({ lastName: '' });
      fireEvent.blur(screen.getByLabelText(LABELS.lastName));
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });
  });

  describe('Form Submission', () => {
    let consoleErrorSpy;

    beforeEach(() => {
      consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
      consoleErrorSpy.mockRestore();
    });

    test('logs an error to the console with invalid form submission', () => {
      fillOutForm({ email: 'invalid' }); // Explicitly set an invalid email
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(consoleErrorSpy).toHaveBeenCalledWith('Form is invalid');
    });
  });
});
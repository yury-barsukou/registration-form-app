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

describe('SignUpForm Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Password Validation Edge Cases', () => {
    test('password with only lowercase letters does not meet criteria', () => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: 'password' } });
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(/red/);
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
      expect(screen.getByText(/1 number/i).className).toMatch(/red/);
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('password with only uppercase letters does not meet criteria', () => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: 'PASSWORD' } });
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(/green/);
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(/red/);
      expect(screen.getByText(/1 number/i).className).toMatch(/red/);
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('password with less than 8 characters does not meet criteria', () => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: 'Pass1' } });
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(/green/);
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
      expect(screen.getByText(/1 number/i).className).toMatch(/green/);
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
    });

    test('password with no numbers does not meet criteria', () => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: 'Password' } });
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(/green/);
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
      expect(screen.getByText(/1 number/i).className).toMatch(/red/);
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });
  });

  describe('Email Validation Edge Cases', () => {
    test('email without @ symbol is invalid', () => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'johndoe.example.com' } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test('email without domain is invalid', () => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'john.doe@' } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test('email with invalid characters is invalid', () => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'john.doe@example,com' } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
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

    test('logs error to console with invalid form submission', () => {
      fillOutForm({ email: 'invalid' }); // Explicitly set an invalid email
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(consoleErrorSpy).toHaveBeenCalledWith('Form is invalid');
    });
  });
});
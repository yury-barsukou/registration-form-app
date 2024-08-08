import { render, screen, fireEvent } from '@testing-library/react';
import SignUpForm from './SignUpForm';

const LABELS = {
  firstName: /First Name/i,
  lastName: /Last Name/i,
  email: /Email/i,
  password: /Password/i,
};

const BUTTON_TEXT = /Create Account/i;

describe('SignUpForm - Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Password Validation - Edge Cases', () => {
    test('password with only lowercase characters shows correct validation message', () => {
      const password = 'password';
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(/red/);
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
      expect(screen.getByText(/1 number/i).className).toMatch(/red/);
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('password with only uppercase characters shows correct validation message', () => {
      const password = 'PASSWORD';
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(/green/);
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(/red/);
      expect(screen.getByText(/1 number/i).className).toMatch(/red/);
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('password with less than 8 characters shows correct validation message', () => {
      const password = 'Pass1';
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(/green/);
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
      expect(screen.getByText(/1 number/i).className).toMatch(/green/);
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
    });
  });

  describe('Email Validation - Edge Cases', () => {
    test.each([
      ['email without @ symbol', 'johndoe.example.com'],
      ['email without domain', 'john.doe@'],
      ['email with invalid characters', 'john.doe@exa&mple.com'],
    ])('validates %s correctly', (_, email) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });
  });

  describe('Form Validation - Negative Cases', () => {
    test('form is invalid with empty last name', () => {
      fillOutForm({ lastName: '' });
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('form is invalid with empty email', () => {
      fillOutForm({ email: '' });
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('form is invalid with invalid email', () => {
      fillOutForm({ email: 'invalidemail' });
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('form is invalid with password not meeting criteria', () => {
      fillOutForm({ password: 'short' });
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });
  });

  describe('Form Submission - Negative Cases', () => {
    let consoleErrorSpy;

    beforeEach(() => {
      consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
      consoleErrorSpy.mockRestore();
    });

    test('logs error to console with invalid form submission', () => {
      fillOutForm({ firstName: '' }); // Explicitly set an invalid field
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(consoleErrorSpy).toHaveBeenCalledWith('Form is invalid');
    });
  });
});
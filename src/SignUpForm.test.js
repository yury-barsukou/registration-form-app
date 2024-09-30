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
    test.each([
      { password: '1234567aA', valid: true },
      { password: '1234567A', valid: false },
      { password: '1234567a', valid: false },
      { password: 'abcdefgH', valid: false },
      { password: 'ABCDEFGh', valid: false },
      { password: 'ABCDEFG1', valid: false },
      { password: 'abcdEF12', valid: true },
      { password: 'ABc123456789', valid: true },
    ])('validates password "$password" correctly', ({ password, valid }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      const criteria = [
        /1 uppercase character/i,
        /1 lowercase character/i,
        /1 number/i,
        /Minimum 8 characters/i,
      ];
      criteria.forEach((criteriaRegex) => {
        const criteriaElement = screen.getByText(criteriaRegex);
        if (valid) {
          expect(criteriaElement.className).toMatch(/green/);
        } else {
          expect(criteriaElement.className).toMatch(/red/);
        }
      });
    });
  });

  describe('Email Validation Edge Cases', () => {
    test.each([
      { email: 'email@example.com', valid: true },
      { email: 'firstname.lastname@example.com', valid: true },
      { email: 'email@subdomain.example.com', valid: true },
      { email: 'firstname+lastname@example.com', valid: true },
      { email: 'email@123.123.123.123', valid: true },
      { email: 'email@[123.123.123.123]', valid: true },
      { email: '"email"@example.com', valid: true },
      { email: '1234567890@example.com', valid: true },
      { email: 'email@example-one.com', valid: true },
      { email: '_______@example.com', valid: true },
      { email: 'email@example.name', valid: true },
      { email: 'email@example.museum', valid: true },
      { email: 'email@example.co.jp', valid: true },
      { email: 'firstname-lastname@example.com', valid: true },
      { email: 'plainaddress', valid: false },
      { email: '@missingusername.example.com', valid: false },
      { email: 'Joe Smith <email@example.com>', valid: false },
      { email: 'email.example.com', valid: false },
      { email: 'email@example@example.com', valid: false },
      { email: '.email@example.com', valid: false },
      { email: 'email.@example.com', valid: false },
      { email: 'email..email@example.com', valid: false },
      { email: 'あいうえお@example.com', valid: false },
      { email: 'email@example.com (Joe Smith)', valid: false },
      { email: 'email@example', valid: false },
      { email: 'email@-example.com', valid: false },
      { email: 'email@111.222.333.44444', valid: false },
      { email: 'email@example..com', valid: false },
      { email: 'Abc..123@example.com', valid: false },
    ])('validates email "$email" correctly', ({ email, valid }) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      if (valid) {
        expect(screen.queryByText(/Please enter a valid email address/i)).toBeNull();
      } else {
        expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
      }
    });
  });

  test('does not submit the form with invalid email', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    fillOutForm({ email: 'invalid' });
    fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
    expect(consoleSpy).toHaveBeenLastCalledWith('Form is invalid');
    consoleSpy.mockRestore();
  });

  test('does not submit the form with invalid password', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    fillOutForm({ password: 'short' });
    fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
    expect(consoleSpy).toHaveBeenLastCalledWith('Form is invalid');
    consoleSpy.mockRestore();
  });

  test('does not submit the form with empty first name', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    fillOutForm({ firstName: '' });
    fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
    expect(consoleSpy).toHaveBeenLastCalledWith('Form is invalid');
    consoleSpy.mockRestore();
  });

  test('does not submit the form with empty last name', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    fillOutForm({ lastName: '' });
    fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
    expect(consoleSpy).toHaveBeenLastCalledWith('Form is invalid');
    consoleSpy.mockRestore();
  });
});
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

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SignUpForm from './SignUpForm';

describe('SignUpForm', () => {
    beforeEach(() => {
        render(<SignUpForm />);
    });

    const typeIntoForm = ({ email, firstName, lastName, password }) => {
        const emailInputElement = screen.getByLabelText(/email/i);
        const firstNameInputElement = screen.getByLabelText(/first name/i);
        const lastNameInputElement = screen.getByLabelText(/last name/i);
        const passwordInputElement = screen.getByLabelText(/password/i);

        if (email) fireEvent.change(emailInputElement, { target: { value: email } });
        if (firstName) fireEvent.change(firstNameInputElement, { target: { value: firstName } });
        if (lastName) fireEvent.change(lastNameInputElement, { target: { value: lastName } });
        if (password) fireEvent.change(passwordInputElement, { target: { value: password } });
    };

    it('renders correctly', () => {
        expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument();
    });

    it('validates email correctly', () => {
        typeIntoForm({ email: 'invalidemail' });
        expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
        typeIntoForm({ email: 'validemail@example.com' });
        expect(screen.queryByText(/please enter a valid email address/i)).not.toBeInTheDocument();
    });

    describe('validates password correctly', () => {
        it.each([
            ['password', false],
            ['Password', false],
            ['password1', false],
            ['Password1', true],
        ])('for "%s" as password, the validation result should be %s', (password, isValid) => {
            typeIntoForm({ password });
            const submitButton = screen.getByRole('button', { name: /create account/i });
            if (isValid) {
                expect(submitButton).not.toHaveClass('btn-disabled');
            } else {
                expect(submitButton).toHaveClass('btn-disabled');
            }
        });
    });

    it('enables submit button when the form is valid', () => {
        typeIntoForm({
            email: 'test@example.com',
            firstName: 'John',
            lastName: 'Doe',
            password: 'Password1',
        });
        expect(screen.getByRole('button', { name: /create account/i })).not.toHaveClass('btn-disabled');
    });

    it('keeps submit button disabled when the form is invalid', () => {
        typeIntoForm({
            email: 'test@example.com',
            firstName: 'John',
            lastName: 'Doe',
            password: 'pass',
        });
        expect(screen.getByRole('button', { name: /create account/i })).toHaveClass('btn-disabled');
    });

    it('submits the form with valid data', () => {
        const consoleSpy = jest.spyOn(console, 'log');
        typeIntoForm({
            email: 'test@example.com',
            firstName: 'John',
            lastName: 'Doe',
            password: 'Password1',
        });
        fireEvent.click(screen.getByRole('button', { name: /create account/i }));
        expect(consoleSpy).toHaveBeenCalledWith('Form submitted:', expect.any(Object));
        consoleSpy.mockRestore();
    });

    it('does not submit the form with invalid data', () => {
        const consoleErrorSpy = jest.spyOn(console, 'error');
        typeIntoForm({
            email: 'test@example.com',
            firstName: 'John',
            lastName: 'Doe',
            password: 'pass',
        });
        fireEvent.click(screen.getByRole('button', { name: /create account/i }));
        expect(consoleErrorSpy).toHaveBeenCalledWith('Form is invalid');
        consoleErrorSpy.mockRestore();
    });
});

describe('SignUpForm', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  test('renders the sign-up form with all fields', () => {
    expect(screen.getByLabelText(LABELS.firstName)).toBeInTheDocument();
    expect(screen.getByLabelText(LABELS.lastName)).toBeInTheDocument();
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
      const password = screen.getByLabelText(LABELS.password);
      fireEvent.change(password, { target: { value: 'short' } });
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
      fireEvent.change(password, { target: { value: 'LongEnough1' } });
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(/green/);
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
      expect(screen.getByText(/1 number/i).className).toMatch(/green/);
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
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

    test('enables Create Account button with valid form', () => {
      fillOutForm();
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).not.toBeDisabled();
    });

    test('disables Create Account button with invalid form', () => {
      fillOutForm({ firstName: '' }); // Explicitly set an invalid field
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('calls console log with correct data on valid form submission', () => {
      const formData = fillOutForm();
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(consoleSpy).toHaveBeenLastCalledWith('Form submitted:', formData);
    });
  });
});
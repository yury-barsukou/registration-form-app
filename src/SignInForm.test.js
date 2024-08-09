import { render, screen, fireEvent } from '@testing-library/react';
import SignInForm from './SignInForm';

const VALID_EMAIL = 'test@example.com';
const INVALID_EMAIL = 'test';
const VALID_PASSWORD = '12345678';
const INVALID_PASSWORD = '123';

describe('SignInForm', () => {
  const setupSignInForm = () => {
    render(<SignInForm />);
    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const signInButton = screen.getByRole('button', { name: /Sign In/i });

    return {
      emailInput,
      passwordInput,
      signInButton,
    };
  };

  test('initial form state', () => {
    const { emailInput, passwordInput, signInButton } = setupSignInForm();
    expect(emailInput.value).toBe('');
    expect(passwordInput.value).toBe('');
    expect(signInButton).toBeDisabled();
  });

  test.each([
    { email: VALID_EMAIL, password: VALID_PASSWORD, isValid: true },
    { email: VALID_EMAIL, password: INVALID_PASSWORD, isValid: false },
    { email: INVALID_EMAIL, password: VALID_PASSWORD, isValid: false },
    { email: INVALID_EMAIL, password: INVALID_PASSWORD, isValid: false },
  ])('form validation ($isValid)', ({ email, password, isValid }) => {
    const { emailInput, passwordInput, signInButton } = setupSignInForm();

    fireEvent.change(emailInput, { target: { value: email } });
    fireEvent.change(passwordInput, { target: { value: password } });

    if (isValid) {
      expect(signInButton).not.toBeDisabled();
    } else {
      expect(signInButton).toBeDisabled();
    }
  });

  test('display validation message for invalid email', () => {
    const { emailInput } = setupSignInForm();

    fireEvent.change(emailInput, { target: { value: INVALID_EMAIL } });
    const validationMessage = screen.getByText(/Please enter a valid email address/i);

    expect(validationMessage).toBeInTheDocument();
  });

  test('display validation message for invalid password', () => {
    const { passwordInput } = setupSignInForm();

    fireEvent.change(passwordInput, { target: { value: INVALID_PASSWORD } });
    const validationMessage = screen.getByText(/Your password must have at least 8 characters/i);

    expect(validationMessage).toBeInTheDocument();
  });

  test('form submission with valid data', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    const { emailInput, passwordInput, signInButton } = setupSignInForm();

    fireEvent.change(emailInput, { target: { value: VALID_EMAIL } });
    fireEvent.change(passwordInput, { target: { value: VALID_PASSWORD } });
    fireEvent.click(signInButton);

    expect(consoleSpy).toHaveBeenCalledWith('Sign In submitted:', { email: VALID_EMAIL, password: VALID_PASSWORD });
    consoleSpy.mockRestore();
  });

  test('form submission prevented with invalid data', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error');
    const { emailInput, passwordInput, signInButton } = setupSignInForm();

    fireEvent.change(emailInput, { target: { value: INVALID_EMAIL } });
    fireEvent.change(passwordInput, { target: { value: INVALID_PASSWORD } });
    fireEvent.click(signInButton);

    expect(consoleErrorSpy).toHaveBeenCalledWith('Sign In form is invalid');
    consoleErrorSpy.mockRestore();
  });
});
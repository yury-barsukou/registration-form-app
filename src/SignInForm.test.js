import { render, fireEvent } from '@testing-library/react';
import SignInForm from './SignInForm';

describe('SignInForm', () => {
  test('initial state is correct', () => {
    const { getByPlaceholderText } = render(<SignInForm />);
    expect(getByPlaceholderText('Email')).toHaveValue('');
    expect(getByPlaceholderText('Password')).toHaveValue('');
  });

  test('email input changes value', () => {
    const { getByPlaceholderText } = render(<SignInForm />);
    const emailInput = getByPlaceholderText('Email');
    fireEvent.change(emailInput, { target: { value: 'user@example.com', name: 'email' } });
    expect(emailInput.value).toBe('user@example.com');
  });

  test('password input changes value', () => {
    const { getByPlaceholderText } = render(<SignInForm />);
    const passwordInput = getByPlaceholderText('Password');
    fireEvent.change(passwordInput, { target: { value: 'password123', name: 'password' } });
    expect(passwordInput.value).toBe('password123');
  });

  test('email validation - invalid email', () => {
    const { getByPlaceholderText, getByText } = render(<SignInForm />);
    fireEvent.change(getByPlaceholderText('Email'), { target: { value: 'invalidemail', name: 'email' } });
    const validationError = getByText('Please enter a valid email address.');
    expect(validationError).toBeInTheDocument();
  });

  test('email validation - valid email', () => {
    const { getByPlaceholderText, queryByText } = render(<SignInForm />);
    fireEvent.change(getByPlaceholderText('Email'), { target: { value: 'user@example.com', name: 'email' } });
    const validationError = queryByText('Please enter a valid email address.');
    expect(validationError).not.toBeInTheDocument();
  });

  test('password validation - password too short', () => {
    const { getByPlaceholderText, getByText } = render(<SignInForm />);
    fireEvent.change(getByPlaceholderText('Password'), { target: { value: 'short', name: 'password' } });
    const validationError = getByText('Password must be at least 8 characters long.');
    expect(validationError).toBeInTheDocument();
  });

  test('password validation - password long enough', () => {
    const { getByPlaceholderText, queryByText } = render(<SignInForm />);
    fireEvent.change(getByPlaceholderText('Password'), { target: { value: 'longenoughpassword', name: 'password' } });
    const validationError = queryByText('Password must be at least 8 characters long.');
    expect(validationError).not.toBeInTheDocument();
  });
});
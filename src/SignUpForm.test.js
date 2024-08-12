import { render, screen, fireEvent } from '@testing-library/react';
import SignUpForm from './SignUpForm';

describe('SignUpForm', () => {
  test('renders SignUpForm and validates initial state', () => {
    render(<SignUpForm />);
    expect(screen.getByLabelText(/First Name/i)).toHaveValue('');
    expect(screen.getByLabelText(/Last Name/i)).toHaveValue('');
    expect(screen.getByLabelText(/Email/i)).toHaveValue('');
    expect(screen.getByLabelText(/Password/i)).toHaveValue('');
    expect(screen.getByRole('button', { name: /Create Account/i })).toBeDisabled();
  });

  test.each([
    { name: 'firstName', value: 'John', expected: true },
    { name: 'lastName', value: 'Doe', expected: true },
    { name: 'email', value: 'test@example.com', expected: true },
    { name: 'password', value: 'Aa123456', expected: true },
  ])('input field $name updates on change', ({ name, value, expected }) => {
    render(<SignUpForm />);
    const input = screen.getByLabelText(new RegExp(name, 'i'));
    fireEvent.change(input, { target: { value } });
    expect(input.value === value).toBe(expected);
  });

  test('email validation works correctly', () => {
    render(<SignUpForm />);
    const emailInput = screen.getByLabelText(/Email/i);
    fireEvent.change(emailInput, { target: { value: 'invalidemail' } });
    expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    expect(screen.queryByText(/Please enter a valid email address/i)).not.toBeInTheDocument();
  });

  test('password validation displays correct messages', () => {
    render(<SignUpForm />);
    const passwordInput = screen.getByLabelText(/Password/i);
    fireEvent.change(passwordInput, { target: { value: '123' } });
    expect(screen.getByText(/Minimum 8 characters/i)).toHaveClass('red');
    fireEvent.change(passwordInput, { target: { value: 'Aa123456' } });
    expect(screen.getByText(/Minimum 8 characters/i)).toHaveClass('green');
  });

  test('form becomes submittable only when all validations pass', () => {
    render(<SignUpForm />);
    const firstNameInput = screen.getByLabelText(/First Name/i);
    const lastNameInput = screen.getByLabelText(/Last Name/i);
    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const submitButton = screen.getByRole('button', { name: /Create Account/i });

    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Aa123456' } });

    expect(submitButton).not.toBeDisabled();
  });

  test('submitting form with all fields valid logs correct message', () => {
    console.log = jest.fn();

    render(<SignUpForm />);
    const firstNameInput = screen.getByLabelText(/First Name/i);
    const lastNameInput = screen.getByLabelText(/Last Name/i);
    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const form = screen.getByRole('form');

    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Aa123456' } });
    fireEvent.submit(form);

    expect(console.log).toHaveBeenCalledWith('Form submitted:', {
      firstName: 'John',
      lastName: 'Doe',
      email: 'test@example.com',
      password: 'Aa123456',
    });
  });

  test('submitting form with invalid fields logs error message', () => {
    console.error = jest.fn();

    render(<SignUpForm />);
    const form = screen.getByRole('form');
    fireEvent.submit(form);

    expect(console.error).toHaveBeenCalledWith('Form is invalid');
  });
});
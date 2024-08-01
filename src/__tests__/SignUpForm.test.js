import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SignUpForm from '../SignUpForm';

describe('SignUpForm', () => {
  test('initial state', () => {
    const { getByLabelText, getByText } = render(<SignUpForm />);
    expect(getByLabelText('First Name')).toHaveValue('');
    expect(getByLabelText('Last Name')).toHaveValue('');
    expect(getByLabelText('Email')).toHaveValue('');
    expect(getByLabelText('Password')).toHaveValue('');
    expect(getByText('Create Account').closest('button')).toBeDisabled();
  });

  describe('input handling', () => {
    const inputCases = [
      { label: 'First Name', value: 'John' },
      { label: 'Last Name', value: 'Doe' },
      { label: 'Email', value: 'john.doe@example.com' },
      { label: 'Password', value: 'Password123!' }
    ];

    inputCases.forEach(({ label, value }) => {
      test(`handles ${label} input correctly`, () => {
        const { getByLabelText } = render(<SignUpForm />);
        fireEvent.change(getByLabelText(label), { target: { value } });
        expect(getByLabelText(label)).toHaveValue(value);
      });
    });
  });

  describe('password validation', () => {
    const passwordCases = [
      { password: 'short', isValid: false },
      { password: 'longenoughpassword', isValid: true },
      { password: '12345678', isValid: false },
      { password: 'Password123', isValid: true }
    ];

    passwordCases.forEach(({ password, isValid }) => {
      test(`validates that password '${password}' is ${isValid ? 'valid' : 'invalid'}`, () => {
        const { getByLabelText, queryByText } = render(<SignUpForm />);
        fireEvent.change(getByLabelText('Password'), { target: { value: password } });
        const validationMessage = queryByText('Password must contain the following:');
        if (isValid) {
          expect(validationMessage).not.toHaveClass('invalid');
        } else {
          expect(validationMessage).toHaveClass('invalid');
        }
      });
    });
  });

  describe('email validation', () => {
    const emailCases = [
      { email: 'invalidemail', isValid: false },
      { email: 'validemail@example.com', isValid: true }
    ];

    emailCases.forEach(({ email, isValid }) => {
      test(`validates that email '${email}' is ${isValid ? 'valid' : 'invalid'}`, () => {
        const { getByLabelText, queryByText } = render(<SignUpForm />);
        fireEvent.change(getByLabelText('Email'), { target: { value: email } });
        const errorMessage = queryByText('Please enter a valid email address');
        if (isValid) {
          expect(errorMessage).not.toBeInTheDocument();
        } else {
          expect(errorMessage).toBeInTheDocument();
        }
      });
    });
  });

  test('form validation enables submit button when all fields are valid', () => {
    const { getByLabelText, getByText } = render(<SignUpForm />);
    fireEvent.change(getByLabelText('First Name'), { target: { value: 'John' } });
    fireEvent.change(getByLabelText('Last Name'), { target: { value: 'Doe' } });
    fireEvent.change(getByLabelText('Email'), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(getByLabelText('Password'), { target: { value: 'Password123!' } });
    expect(getByText('Create Account').closest('button')).not.toBeDisabled();
  });

  test('form submission', () => {
    const mockSubmit = jest.fn();
    const { getByLabelText, getByText } = render(<SignUpForm onSubmit={mockSubmit} />);
    fireEvent.change(getByLabelText('First Name'), { target: { value: 'John' } });
    fireEvent.change(getByLabelText('Last Name'), { target: { value: 'Doe' } });
    fireEvent.change(getByLabelText('Email'), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(getByLabelText('Password'), { target: { value: 'Password123!' } });
    fireEvent.click(getByText('Create Account'));
    expect(mockSubmit).toHaveBeenCalled();
  });
});
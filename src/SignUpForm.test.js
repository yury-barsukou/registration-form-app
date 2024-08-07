import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SignUpForm from './SignUpForm';

describe('SignUpForm', () => {
  test('input fields are updated correctly', () => {
    const { getByLabelText } = render(<SignUpForm />);
    const firstNameInput = getByLabelText('First Name');
    const lastNameInput = getByLabelText('Last Name');
    const emailInput = getByLabelText('Email');
    const passwordInput = getByLabelText('Password');

    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Password123' } });

    expect(firstNameInput.value).toBe('John');
    expect(lastNameInput.value).toBe('Doe');
    expect(emailInput.value).toBe('john.doe@example.com');
    expect(passwordInput.value).toBe('Password123');
  });

  test('valid and invalid emails are identified correctly', () => {
    const { getByLabelText, queryByText } = render(<SignUpForm />);
    const emailInput = getByLabelText('Email');

    fireEvent.change(emailInput, { target: { value: 'invalid' } });
    expect(queryByText('Please enter a valid email address')).toBeInTheDocument();

    fireEvent.change(emailInput, { target: { value: 'valid@example.com' } });
    expect(queryByText('Please enter a valid email address')).not.toBeInTheDocument();
  });

  test('password validations work as expected', () => {
    const { getByLabelText, getByText } = render(<SignUpForm />);
    const passwordInput = getByLabelText('Password');

    fireEvent.change(passwordInput, { target: { value: 'short' } });
    expect(getByText('Minimum 8 characters')).toHaveClass('invalid');

    fireEvent.change(passwordInput, { target: { value: 'longenoughButNoNumbers' } });
    expect(getByText('1 number')).toHaveClass('invalid');

    fireEvent.change(passwordInput, { target: { value: 'Valid123' } });
    expect(getByText('1 uppercase character')).toHaveClass('valid');
    expect(getByText('1 lowercase character')).toHaveClass('valid');
    expect(getByText('1 number')).toHaveClass('valid');
    expect(getByText('Minimum 8 characters')).toHaveClass('valid');
  });

  test('form submission is disabled when form is invalid', () => {
    const { getByLabelText, getByText } = render(<SignUpForm />);
    const submitButton = getByText('Create Account');

    fireEvent.change(getByLabelText('Email'), { target: { value: 'invalid' } });
    expect(submitButton).toHaveClass('btn-disabled');
    expect(submitButton).toBeDisabled();
  });

  test('form submission is enabled when form is valid', () => {
    const { getByLabelText, getByText } = render(<SignUpForm />);
    const submitButton = getByText('Create Account');

    fireEvent.change(getByLabelText('First Name'), { target: { value: 'John' } });
    fireEvent.change(getByLabelText('Last Name'), { target: { value: 'Doe' } });
    fireEvent.change(getByLabelText('Email'), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(getByLabelText('Password'), { target: { value: 'Password123' } });
    
    expect(submitButton).not.toHaveClass('btn-disabled');
    expect(submitButton).not.toBeDisabled();
  });
});
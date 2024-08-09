import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SignInForm from './SignInForm';

describe('SignInForm component tests', () => {
  
  test('initial form state', () => {
    const { getByPlaceholderText } = render(<SignInForm />);
    expect(getByPlaceholderText('Email')).toHaveValue('');
    expect(getByPlaceholderText('Password')).toHaveValue('');
    expect(getByPlaceholderText('Email')).toBeValid();
    expect(getByPlaceholderText('Password')).toBeValid();
  });

  test('email validation - valid email', () => {
    const { getByPlaceholderText, getByText } = render(<SignInForm />);
    const emailInput = getByPlaceholderText('Email');
    fireEvent.change(emailInput, { target: { value: 'test@example.com', name: 'email' } });
    expect(emailInput).toBeValid();
    expect(getByText('Email is valid')).toBeInTheDocument();
  });

  test('email validation - invalid email', () => {
    const { getByPlaceholderText, queryByText } = render(<SignInForm />);
    const emailInput = getByPlaceholderText('Email');
    fireEvent.change(emailInput, { target: { value: 'test', name: 'email' } });
    expect(emailInput).not.toBeValid();
    expect(queryByText('Email is invalid')).toBeInTheDocument();
  });

  test('password validation - valid password', () => {
    const { getByPlaceholderText, getByText } = render(<SignInForm />);
    const passwordInput = getByPlaceholderText('Password');
    fireEvent.change(passwordInput, { target: { value: '12345678', name: 'password' } });
    expect(passwordInput).toBeValid();
    expect(getByText('Password is valid')).toBeInTheDocument();
  });

  test('password validation - invalid password', () => {
    const { getByPlaceholderText, queryByText } = render(<SignInForm />);
    const passwordInput = getByPlaceholderText('Password');
    fireEvent.change(passwordInput, { target: { value: '123', name: 'password' } });
    expect(passwordInput).not.toBeValid();
    expect(queryByText('Password is invalid')).toBeInTheDocument();
  });

  test('submit form with valid data', () => {
    const { getByPlaceholderText, getByText } = render(<SignInForm />);
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const submitButton = getByText('Sign In');

    fireEvent.change(emailInput, { target: { value: 'test@example.com', name: 'email' } });
    fireEvent.change(passwordInput, { target: { value: '12345678', name: 'password' } });
    fireEvent.click(submitButton);

    expect(getByText('Form submitted successfully')).toBeInTheDocument();
  });

  test('submit form with invalid data', () => {
    const { getByPlaceholderText, getByText } = render(<SignInForm />);
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const submitButton = getByText('Sign In');

    fireEvent.change(emailInput, { target: { value: 'test', name: 'email' } });
    fireEvent.change(passwordInput, { target: { value: '123', name: 'password' } });
    fireEvent.click(submitButton);

    expect(queryByText('Form submission failed')).toBeInTheDocument();
  });
});
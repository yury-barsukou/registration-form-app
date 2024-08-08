import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SignInForm from './SignInForm';

describe('SignInForm', () => {
  test('renders correctly', () => {
    const { getByLabelText, getByText } = render(<SignInForm />);
    expect(getByLabelText(/Email/i)).toBeInTheDocument();
    expect(getByLabelText(/Password/i)).toBeInTheDocument();
    expect(getByText(/Forgot Password?/i)).toBeInTheDocument();
    expect(getByText(/Sign In/i)).toBeInTheDocument();
  });

  test('email validation - valid email', () => {
    const { getByLabelText, queryByText } = render(<SignInForm />);
    fireEvent.change(getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
    expect(queryByText(/Please enter a valid email address/i)).not.toBeInTheDocument();
  });

  test('email validation - invalid email', () => {
    const { getByLabelText, getByText } = render(<SignInForm />);
    fireEvent.change(getByLabelText(/Email/i), { target: { value: 'test' } });
    expect(getByText(/Please enter a valid email address/i)).toBeInTheDocument();
  });

  test('password validation - valid password', () => {
    const { getByLabelText, queryByText } = render(<SignInForm />);
    fireEvent.change(getByLabelText(/Password/i), { target: { value: '12345678' } });
    expect(queryByText(/Your password must have at least 8 characters/i)).not.toBeInTheDocument();
  });

  test('password validation - invalid password', () => {
    const { getByLabelText, getByText } = render(<SignInForm />);
    fireEvent.change(getByLabelText(/Password/i), { target: { value: '123' } });
    expect(getByText(/Your password must have at least 8 characters/i)).toBeInTheDocument();
  });

  test('submit button enabled when form is valid', () => {
    const { getByLabelText, getByText } = render(<SignInForm />);
    fireEvent.change(getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(getByLabelText(/Password/i), { target: { value: '12345678' } });
    expect(getByText(/Sign In/i)).not.toBeDisabled();
  });

  test('submit button disabled when form is invalid', () => {
    const { getByLabelText, getByText } = render(<SignInForm />);
    fireEvent.change(getByLabelText(/Email/i), { target: { value: 'test' } });
    fireEvent.change(getByLabelText(/Password/i), { target: { value: '123' } });
    expect(getByText(/Sign In/i)).toBeDisabled();
  });

  test('form submission with valid data', () => {
    console.log = jest.fn();
    const { getByLabelText, getByText } = render(<SignInForm />);
    fireEvent.change(getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(getByLabelText(/Password/i), { target: { value: '12345678' } });
    fireEvent.click(getByText(/Sign In/i));
    expect(console.log).toHaveBeenCalledWith('Sign In submitted:', { email: 'test@example.com', password: '12345678' });
  });

  test('form submission prevented when form is invalid', () => {
    console.error = jest.fn();
    const { getByLabelText, getByText } = render(<SignInForm />);
    fireEvent.change(getByLabelText(/Email/i), { target: { value: 'test' } });
    fireEvent.change(getByLabelText(/Password/i), { target: { value: '123' } });
    fireEvent.click(getByText(/Sign In/i));
    expect(console.error).toHaveBeenCalledWith('Sign In form is invalid');
  });
});
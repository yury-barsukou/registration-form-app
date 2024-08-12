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
import '@testing-library/jest-dom';
import SignUpForm from './SignUpForm';

describe('SignUpForm', () => {
  test('renders SignUpForm component', () => {
    render(<SignUpForm />);
    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  });

  test('validates password correctly', () => {
    render(<SignUpForm />);
    const passwordInput = screen.getByLabelText(/Password/i);
    fireEvent.change(passwordInput, { target: { value: 'Pass1234' } });
    expect(screen.getByText('1 uppercase character')).toHaveClass('green');
    expect(screen.getByText('1 lowercase character')).toHaveClass('green');
    expect(screen.getByText('1 number')).toHaveClass('green');
    expect(screen.getByText('Minimum 8 characters')).toHaveClass('green');
  });

  test('validates email correctly - invalid case', () => {
    render(<SignUpForm />);
    const emailInput = screen.getByLabelText(/Email/i);
    fireEvent.change(emailInput, { target: { value: 'invalidemail' } });
    expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
  });

  test('validates email correctly - valid case', () => {
    render(<SignUpForm />);
    const emailInput = screen.getByLabelText(/Email/i);
    fireEvent.change(emailInput, { target: { value: 'valid@example.com' } });
    expect(screen.queryByText('Please enter a valid email address')).not.toBeInTheDocument();
  });

  test('enables submit button only when form is valid', () => {
    render(<SignUpForm />);
    const firstNameInput = screen.getByLabelText(/First Name/i);
    const lastNameInput = screen.getByLabelText(/Last Name/i);
    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(emailInput, { target: { value: 'valid@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Pass1234' } });
    const submitButton = screen.getByRole('button', { name: /Create Account/i });
    expect(submitButton).not.toBeDisabled();
  });

  test('disables submit button when form is invalid', () => {
    render(<SignUpForm />);
    const submitButton = screen.getByRole('button', { name: /Create Account/i });
    expect(submitButton).toBeDisabled();
  });

  test('form submission with valid data logs to console', () => {
    render(<SignUpForm />);
    console.log = jest.fn();
    const firstNameInput = screen.getByLabelText(/First Name/i);
    const lastNameInput = screen.getByLabelText(/Last Name/i);
    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(emailInput, { target: { value: 'valid@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Pass1234' } });
    const form = screen.getByRole('form', { name: /mycompany-create-form/i });
    fireEvent.submit(form);
    expect(console.log).toHaveBeenCalledWith('Form submitted:', {
      firstName: 'John',
      lastName: 'Doe',
      email: 'valid@example.com',
      password: 'Pass1234',
    });
  });

  test('form submission with invalid data logs error to console', () => {
    render(<SignUpForm />);
    console.error = jest.fn();
    const form = screen.getByRole('form', { name: /mycompany-create-form/i });
    fireEvent.submit(form);
    expect(console.error).toHaveBeenCalledWith('Form is invalid');
  });
});
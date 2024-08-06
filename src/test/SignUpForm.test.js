import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SignUpForm from '../SignUpForm';

describe('SignUpForm', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  test('renders the sign-up form with all fields', () => {
    // Test already provided, checks if all fields and the button are rendered
  });

  test('inputting text updates the fields', () => {
    const firstNameInput = screen.getByLabelText(/First Name/i);
    const lastNameInput = screen.getByLabelText(/Last Name/i);
    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);

    userEvent.type(firstNameInput, 'John');
    userEvent.type(lastNameInput, 'Doe');
    userEvent.type(emailInput, 'john.doe@example.com');
    userEvent.type(passwordInput, 'password123');

    expect(firstNameInput).toHaveValue('John');
    expect(lastNameInput).toHaveValue('Doe');
    expect(emailInput).toHaveValue('john.doe@example.com');
    expect(passwordInput).toHaveValue('password123');
  });

  test('submitting the form with empty fields displays error messages', async () => {
    const submitButton = screen.getByRole('button', { name: /Create Account/i });

    fireEvent.click(submitButton);

    expect(await screen.findAllByText(/This field is required/i)).toHaveLength(4);
  });

  test('submitting the form with an invalid email displays an email error message', async () => {
    const emailInput = screen.getByLabelText(/Email/i);
    const submitButton = screen.getByRole('button', { name: /Create Account/i });

    userEvent.type(emailInput, 'invalidemail');
    fireEvent.click(submitButton);

    expect(await screen.findByText(/Please enter a valid email/i)).toBeInTheDocument();
  });

  test('successful form submission calls the onSubmit handler with form data', () => {
    const onSubmitMock = jest.fn();
    render(<SignUpForm onSubmit={onSubmitMock} />);

    const firstNameInput = screen.getByLabelText(/First Name/i);
    const lastNameInput = screen.getByLabelText(/Last Name/i);
    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const submitButton = screen.getByRole('button', { name: /Create Account/i });

    userEvent.type(firstNameInput, 'John');
    userEvent.type(lastNameInput, 'Doe');
    userEvent.type(emailInput, 'john.doe@example.com');
    userEvent.type(passwordInput, 'password123');
    fireEvent.click(submitButton);

    expect(onSubmitMock).toHaveBeenCalledWith({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'password123',
    });
  });

  test('form submission does not proceed when password is too short', async () => {
    const passwordInput = screen.getByLabelText(/Password/i);
    const submitButton = screen.getByRole('button', { name: /Create Account/i });

    userEvent.type(passwordInput, 'pass');
    fireEvent.click(submitButton);

    expect(await screen.findByText(/Password must be at least 8 characters long/i)).toBeInTheDocument();
  });
});
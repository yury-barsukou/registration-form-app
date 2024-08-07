import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SignUpForm from '../SignUpForm';

describe('SignUpForm', () => {
  test('inputs should update the form state', () => {
    const { getByLabelText } = render(<SignUpForm />);
    const firstNameInput = getByLabelText(/First Name/i);
    const lastNameInput = getByLabelText(/Last Name/i);
    const emailInput = getByLabelText(/Email/i);
    const passwordInput = getByLabelText(/Password/i);

    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Password123' } });

    expect(firstNameInput.value).toBe('John');
    expect(lastNameInput.value).toBe('Doe');
    expect(emailInput.value).toBe('john.doe@example.com');
    expect(passwordInput.value).toBe('Password123');
  });

  test('validates email correctly', () => {
    const { getByLabelText, queryByText } = render(<SignUpForm />);
    const emailInput = getByLabelText(/Email/i);

    fireEvent.change(emailInput, { target: { value: 'invalidemail' } });
    let invalidEmailMessage = queryByText(/Please enter a valid email address/i);
    expect(invalidEmailMessage).toBeInTheDocument();

    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
    invalidEmailMessage = queryByText(/Please enter a valid email address/i);
    expect(invalidEmailMessage).toBeNull();
  });

  test('validates password correctly', () => {
    const { getByLabelText, getByText } = render(<SignUpForm />);
    const passwordInput = getByLabelText(/Password/i);

    fireEvent.change(passwordInput, { target: { value: 'short' } });
    expect(getByText(/Password must contain the following:/i)).toBeInTheDocument();
    
    fireEvent.change(passwordInput, { target: { value: 'LongEnoughButNoNumbers' } });
    expect(getByText(/Password must contain the following:/i)).toBeInTheDocument();

    fireEvent.change(passwordInput, { target: { value: 'LongEnough1' } });
    expect(getByText(/Password must contain the following:/i)).toBeInTheDocument();

    fireEvent.change(passwordInput, { target: { value: 'ValidPassword1' } });
    expect(getByText(/Password must contain the following:/i)).toBeInTheDocument();
  });

  test('form submission with invalid data', () => {
    const { getByText, getByLabelText } = render(<SignUpForm />);
    const submitButton = getByText(/submit/i);
    const firstNameInput = getByLabelText(/First Name/i);
    const lastNameInput = getByLabelText(/Last Name/i);
    const emailInput = getByLabelText(/Email/i);
    const passwordInput = getByLabelText(/Password/i);

    fireEvent.change(firstNameInput, { target: { value: '' } }); // Empty first name
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(emailInput, { target: { value: 'invalidemail' } }); // Invalid email
    fireEvent.change(passwordInput, { target: { value: 'short' } }); // Invalid password

    fireEvent.click(submitButton);

    expect(console.error).toHaveBeenCalledWith('Form is invalid');
  });

  test('form submission with valid data', () => {
    global.console.log = jest.fn();

    const { getByText, getByLabelText } = render(<SignUpForm />);
    const submitButton = getByText(/submit/i);
    const firstNameInput = getByLabelText(/First Name/i);
    const lastNameInput = getByLabelText(/Last Name/i);
    const emailInput = getByLabelText(/Email/i);
    const passwordInput = getByLabelText(/Password/i);

    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Password123' } });

    fireEvent.click(submitButton);

    expect(global.console.log).toHaveBeenCalledWith('Form submitted:', {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'Password123',
    });
  });
});

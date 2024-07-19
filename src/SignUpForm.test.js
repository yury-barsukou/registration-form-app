import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import SignUpForm from './SignUpForm';

describe('SignUpForm Component', () => {
  test('renders SignUpForm component', () => {
    render(<SignUpForm />);
    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  test('updates input field values', () => {
    render(<SignUpForm />);
    const firstNameInput = screen.getByLabelText(/first name/i);
    userEvent.type(firstNameInput, 'John');
    expect(firstNameInput.value).toBe('John');
  });

  test('validates email correctly', async () => {
    render(<SignUpForm />);
    // Invalid email case
    const emailInput = screen.getByLabelText(/email/i);
    userEvent.type(emailInput, 'invalidemail');
    fireEvent.blur(emailInput); // Simulate moving away from the input
    expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();

    // Clear and type a valid email
    fireEvent.change(emailInput, { target: { value: '' } });
    userEvent.type(emailInput, 'validemail@example.com');
    fireEvent.blur(emailInput);
    expect(screen.queryByText(/please enter a valid email address/i)).not.toBeInTheDocument();
  });

  // Add more tests for password validation and form submission as outlined above

});
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SignUpForm from '../SignUpForm';

describe('SignUpForm', () => {
  test('renders SignUpForm component', () => {
    const { getByLabelText } = render(<SignUpForm />);
    expect(getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(getByLabelText(/Email/i)).toBeInTheDocument();
    expect(getByLabelText(/Password/i)).toBeInTheDocument();
  });

  test('allows user to enter first name, last name, email, and password', () => {
    const { getByLabelText } = render(<SignUpForm />);
    fireEvent.change(getByLabelText(/First Name/i), { target: { value: 'John' } });
    fireEvent.change(getByLabelText(/Last Name/i), { target: { value: 'Doe' } });
    fireEvent.change(getByLabelText(/Email/i), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(getByLabelText(/Password/i), { target: { value: 'password123' } });

    expect(getByLabelText(/First Name/i).value).toBe('John');
    expect(getByLabelText(/Last Name/i).value).toBe('Doe');
    expect(getByLabelText(/Email/i).value).toBe('john.doe@example.com');
    expect(getByLabelText(/Password/i).value).toBe('password123');
  });

  test('validates email format', () => {
    const { getByLabelText, queryByText } = render(<SignUpForm />);
    fireEvent.change(getByLabelText(/Email/i), { target: { value: 'invalid-email' } });
    fireEvent.blur(getByLabelText(/Email/i)); // Assuming blur triggers validation

    expect(queryByText(/Invalid email address/i)).toBeInTheDocument();
  });

  test('displays error for empty required fields on submit attempt', () => {
    const { getByText } = render(<SignUpForm />);
    fireEvent.click(getByText(/Submit/i));

    expect(getByText(/First name is required/i)).toBeInTheDocument();
    expect(getByText(/Last name is required/i)).toBeInTheDocument();
    expect(getByText(/Email is required/i)).toBeInTheDocument();
    expect(getByText(/Password is required/i)).toBeInTheDocument();
  });

  test('calls onSubmit with first name, last name, email, and password when a valid form is submitted', () => {
    const mockOnSubmit = jest.fn();
    const { getByLabelText, getByText } = render(<SignUpForm onSubmit={mockOnSubmit} />);
    fireEvent.change(getByLabelText(/First Name/i), { target: { value: 'John' } });
    fireEvent.change(getByLabelText(/Last Name/i), { target: { value: 'Doe' } });
    fireEvent.change(getByLabelText(/Email/i), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(getByLabelText(/Password/i), { target: { value: 'password123' } });
    fireEvent.click(getByText(/Submit/i));

    expect(mockOnSubmit).toHaveBeenCalledWith({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'password123',
    });
  });
});
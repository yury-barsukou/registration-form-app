import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SignUpForm from '../SignUpForm';

describe('SignUpForm', () => {
  test('renders the sign-up form with all fields and button', () => {
    render(<SignUpForm />);
    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Create Account/i })).toBeInTheDocument();
  });

  test('validates email format correctly', () => {
    render(<SignUpForm />);
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'invalidemail' } });
    expect(screen.getByText(/Please enter a valid email address/i)).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'valid@example.com' } });
    expect(screen.queryByText(/Please enter a valid email address/i)).toBeNull();
  });

  test('validates password requirements correctly', () => {
    render(<SignUpForm />);
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'Short1' } });
    expect(screen.getByText(/Minimum 8 characters/i)).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'LongWithoutNumber' } });
    expect(screen.getByText(/1 number/i)).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'Correct1' } });
    expect(screen.queryByText(/1 uppercase character/i)).toBeNull();
    expect(screen.queryByText(/1 lowercase character/i)).toBeNull();
    expect(screen.queryByText(/1 number/i)).toBeNull();
    expect(screen.queryByText(/Minimum 8 characters/i)).toBeNull();
  });

  test('enables submit button with valid form', () => {
    render(<SignUpForm />);
    fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'Password1' } });
    expect(screen.getByRole('button', { name: /Create Account/i })).not.toBeDisabled();
  });

  test('disables submit button with invalid form', () => {
    render(<SignUpForm />);
    fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: '' } }); // leaving first name empty
    fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'Password1' } });
    expect(screen.getByRole('button', { name: /Create Account/i })).toBeDisabled();
  });

  test('calls console.log with correct data on valid form submission', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    render(<SignUpForm />);

    fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'Password1' } });
    fireEvent.click(screen.getByRole('button', { name: /Create Account/i }));

    expect(consoleSpy).toHaveBeenCalledWith('Form submitted:', {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'Password1',
    });

    consoleSpy.mockRestore();
  });
});
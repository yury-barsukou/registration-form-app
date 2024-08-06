import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SignUpForm from '../SignUpForm';

describe('SignUpForm', () => {
  // Existing tests omitted for brevity

  test('shows required field errors when fields are left empty and create account button is clicked', () => {
    render(<SignUpForm />);

    fireEvent.click(screen.getByRole('button', { name: /create account/i }));

    expect(screen.queryByText(/first name is required/i)).toBeInTheDocument();
    expect(screen.queryByText(/last name is required/i)).toBeInTheDocument();
    expect(screen.queryByText(/email is required/i)).toBeInTheDocument();
    expect(screen.queryByText(/password is required/i)).toBeInTheDocument();
  });

  test('does not submit form with missing first name', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    render(<SignUpForm />);

    fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'user@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'Password123' } });
    fireEvent.click(screen.getByRole('button', { name: /create account/i }));

    expect(consoleSpy).not.toHaveBeenCalled();

    consoleSpy.mockRestore();
  });

  test('does not submit form with missing last name', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    render(<SignUpForm />);

    fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'user@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'Password123' } });
    fireEvent.click(screen.getByRole('button', { name: /create account/i }));

    expect(consoleSpy).not.toHaveBeenCalled();

    consoleSpy.mockRestore();
  });

  test('does not submit form with missing email', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    render(<SignUpForm />);

    fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'Password123' } });
    fireEvent.click(screen.getByRole('button', { name: /create account/i }));

    expect(consoleSpy).not.toHaveBeenCalled();

    consoleSpy.mockRestore();
  });

  test('does not submit form with missing password', () => {
    const consoleSpy is a jest.spyOn(console, 'log');
    render(<SignUpForm />);

    fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'user@example.com' } });
    fireEvent.click(screen.getByRole('button', { name: /create account/i }));

    expect(consoleSpy).not.toHaveBeenCalled();

    consoleSpy.mockRestore();
  });

  test('checks for correct error messages with invalid email and password', () => {
    render(<SignUpForm />);

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'user' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'pass' } });

    fireEvent.click(screen.getByRole('button', { name: /create account/i }));

    expect(screen.queryByText(/please enter a valid email address/i)).toBeInTheDocument();
    expect(screen.queryByText(/1 uppercase character/i)).toBeInTheDocument();
    expect(screen.queryByText(/1 lowercase character/i)).toBeInTheDocument();
    expect(screen.queryByText(/1 number/i)).toBeInTheDocument();
    expect(screen.queryByText(/minimum 8 characters/i)).toBeInTheDocument();
  });
});
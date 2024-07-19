import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SignUpForm from './SignUpForm';

describe('SignUpForm', () => {
  test('initial state is set correctly', () => {
    render(<SignUpForm />);
    expect(screen.getByLabelText(/First Name/i).value).toBe('');
    expect(screen.getByLabelText(/Last Name/i).value).toBe('');
    expect(screen.getByLabelText(/Email/i).value).toBe('');
    expect(screen.getByLabelText(/Password/i).value).toBe('');
    expect(screen.getByText(/Create Account/i).disabled).toBeTruthy();
  });

  test.each([
    ['firstName', 'John'],
    ['lastName', 'Doe'],
    ['email', 'john.doe@example.com'],
    ['password', 'Password1'],
  ])('handle input change for %s', (name, value) => {
    render(<SignUpForm />);
    fireEvent.change(screen.getByLabelText(new RegExp(name, 'i')), {
      target: { name, value },
    });
    expect(screen.getByLabelText(new RegExp(name, 'i')).value).toBe(value);
  });

  test('validate email - valid and invalid cases', () => {
    render(<SignUpForm />);
    // Valid email
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { name: 'email', value: 'valid.email@example.com' },
    });
    expect(screen.queryByText(/Please enter a valid email address/i)).toBeNull();
    // Invalid email
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { name: 'email', value: 'invalid.email' },
    });
    expect(screen.getByText(/Please enter a valid email address/i)).toBeInTheDocument();
  });

  test('password validations - checks all rules', () => {
    render(<SignUpForm />);
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { name: 'password', value: 'Pass1' },
    });
    expect(screen.getByText(/Minimum 8 characters/i).className).toContain('invalid');
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { name: 'password', value: 'Password1' },
    });
    expect(screen.getByText(/Minimum 8 characters/i).className).toContain('valid');
  });

  test('form validity - valid and invalid cases', () => {
    render(<SignUpForm />);
    // Invalid case - incomplete form
    fireEvent.change(screen.getByLabelText(/First Name/i), {
      target: { name: 'firstName', value: 'John' },
    });
    expect(screen.getByText(/Create Account/i).disabled).toBeTruthy();
    // Valid case - complete form
    fireEvent.change(screen.getByLabelText(/First Name/i), {
      target: { name: 'firstName', value: 'John' },
    });
    fireEvent.change(screen.getByLabelText(/Last Name/i), {
      target: { name: 'lastName', value: 'Doe' },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { name: 'email', value: 'john.doe@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { name: 'password', value: 'Password1' },
    });
    expect(screen.getByText(/Create Account/i).disabled).toBeFalsy();
  });

  test('handleSubmit - check form submission behavior', () => {
    render(<SignUpForm />);
    const consoleSpy = jest.spyOn(console, 'log');
    fireEvent.change(screen.getByLabelText(/First Name/i), {
      target: { name: 'firstName', value: 'John' },
    });
    fireEvent.change(screen.getByLabelText(/Last Name/i), {
      target: { name: 'lastName', value: 'Doe' },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { name: 'email', value: 'john.doe@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { name: 'password', value: 'Password1' },
    });
    fireEvent.click(screen.getByText(/Create Account/i));
    expect(consoleSpy).toHaveBeenCalledWith('Form submitted:', {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'Password1',
    });
    consoleSpy.mockRestore();
  });
});
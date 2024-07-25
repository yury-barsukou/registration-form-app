import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SignUpForm from './SignUpForm';

describe('SignUpForm Component', () => {
  test('renders SignUpForm and checks initial state', () => {
    render(<SignUpForm />);
    expect(screen.getByLabelText(/first name/i)).toHaveValue('');
    expect(screen.getByLabelText(/last name/i)).toHaveValue('');
    expect(screen.getByLabelText(/email/i)).toHaveValue('');
    expect(screen.getByLabelText(/password/i)).toHaveValue('');
    expect(screen.getByRole('button', { name: /create account/i })).toBeDisabled();
  });

  test('updates form fields and checks validation messages', () => {
    render(<SignUpForm />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'invalidemail' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'Pass' } });
    fireEvent.blur(screen.getByLabelText(/email/i));
    fireEvent.blur(screen.getByLabelText(/password/i));
    
    expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
    expect(screen.getByText(/minimum 8 characters/i)).toHaveClass('invalid');
  });

  test('enables submit button when form is valid', () => {
    render(<SignUpForm />);
    fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'ValidPass123' } });
    
    expect(screen.getByRole('button', { name: /create account/i })).not.toBeDisabled();
  });

  test('prevents form submission when form is invalid', () => {
    render(<SignUpForm />);
    fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'short' } });
    fireEvent.submit(screen.getByRole('button', { name: /create account/i }));

    expect(screen.getByText(/form is invalid/i)).toBeInTheDocument();
  });
});
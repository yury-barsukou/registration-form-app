import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SignUpForm from './SignUpForm';

describe('SignUpForm', () => {
  test('renders SignUpForm with initial empty state', () => {
    render(<SignUpForm />);
    expect(screen.getByLabelText(/First Name/i).value).toBe('');
    expect(screen.getByLabelText(/Last Name/i).value).toBe('');
    expect(screen.getByLabelText(/Email/i).value).toBe('');
    expect(screen.getByLabelText(/Password/i).value).toBe('');
  });

  test('updates input fields on user input', () => {
    render(<SignUpForm />);
    fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'Password1' } });

    expect(screen.getByLabelText(/First Name/i).value).toBe('John');
    expect(screen.getByLabelText(/Last Name/i).value).toBe('Doe');
    expect(screen.getByLabelText(/Email/i).value).toBe('john.doe@example.com');
    expect(screen.getByLabelText(/Password/i).value).toBe('Password1');
  });

  describe('validates password correctly', () => {
    test.each([
      ['Password1', true, true, true, true],
      ['password', false, true, false, false],
      ['PASSWORD', true, false, false, false],
      ['12345678', false, false, true, true],
      ['Pass1', true, true, true, false],
      ['', false, false, false, false],
    ])('"%s" validation results', (password, hasUppercase, hasLowercase, hasNumber, isLongEnough) => {
      render(<SignUpForm />);
      fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: password } });

      expect(screen.queryByText(/1 uppercase character/i).className.includes('valid')).toBe(hasUppercase);
      expect(screen.queryByText(/1 lowercase character/i).className.includes('valid')).toBe(hasLowercase);
      expect(screen.queryByText(/1 number/i).className.includes('valid')).toBe(hasNumber);
      expect(screen.queryByText(/Minimum 8 characters/i).className.includes('valid')).toBe(isLongEnough);
    });
  });

  describe('validates email correctly', () => {
    test.each([
      ['john.doe@example.com', true],
      ['invalidemail', false],
      ['@example.com', false],
      ['', false],
    ])('"%s" validation results', (email, isValid) => {
      render(<SignUpForm />);
      fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: email } });

      const validationMessage = screen.queryByText(/Please enter a valid email address/i);
      if (isValid) {
        expect(validationMessage).not.toBeInTheDocument();
      } else {
        expect(validationMessage).toBeInTheDocument();
      }
    });
  });

  test('disables submit button when the form is invalid', () => {
    render(<SignUpForm />);
    expect(screen.getByRole('button', { name: /Create Account/i })).toBeDisabled();
  });

  test('enables submit button when the form is valid', () => {
    render(<SignUpForm />);
    fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'Password1' } });

    expect(screen.getByRole('button', { name: /Create Account/i })).not.toBeDisabled();
  });

  test('console logs form submission with valid data', () => {
    console.log = jest.fn();
    render(<SignUpForm />);
    fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'Password1' } });

    fireEvent.click(screen.getByRole('button', { name: /Create Account/i }));
    expect(console.log).toHaveBeenCalledWith('Form submitted:', expect.any(Object));
  });
});
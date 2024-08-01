import { render, screen, fireEvent } from '@testing-library/react';
import SignUpForm from './SignUpForm';

test('initial state has empty inputs and disabled submit button', () => {
  render(<SignUpForm />);
  expect(screen.getByLabelText(/First Name/i)).toHaveValue('');
  expect(screen.getByLabelText(/Last Name/i)).toHaveValue('');
  expect(screen.getByLabelText(/Email/i)).toHaveValue('');
  expect(screen.getByLabelText(/Password/i)).toHaveValue('');
  expect(screen.getByRole('button', { name: /Create Account/i })).toBeDisabled();
});

test('typing in the input fields updates the state', () => {
  render(<SignUpForm />);
  fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'Jane' } });
  fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Doe' } });
  fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'jane.doe@example.com' } });
  fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'Password1' } });

  expect(screen.getByLabelText(/First Name/i)).toHaveValue('Jane');
  expect(screen.getByLabelText(/Last Name/i)).toHaveValue('Doe');
  expect(screen.getByLabelText(/Email/i)).toHaveValue('jane.doe@example.com');
  expect(screen.getByLabelText(/Password/i)).toHaveValue('Password1');
});

describe('password validation', () => {
  const passwordCases = [
    { password: 'Short1', valid: false },
    { password: 'longpasswordwithoutnumber', valid: false },
    { password: 'LongPasswordWithoutNumber', valid: false },
    { password: 'ValidPassword1', valid: true },
  ];

  test.each(passwordCases)('validates password: $password as $valid', ({ password, valid }) => {
    render(<SignUpForm />);
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: password } });
    if (valid) {
      expect(screen.queryByText(/Minimum 8 characters/i)).toHaveClass('valid');
      expect(screen.queryByText(/1 number/i)).toHaveClass('valid');
      expect(screen.queryByText(/1 uppercase character/i)).toHaveClass('valid');
      expect(screen.queryByText(/1 lowercase character/i)).toHaveClass('valid');
    } else {
      expect(screen.getByRole('button', { name: /Create Account/i })).toBeDisabled();
    }
  });
});

describe('email validation', () => {
  const emailCases = [
    { email: 'invalid', valid: false },
    { email: 'valid@example.com', valid: true },
    { email: 'noatsign.com', valid: false },
    { email: 'test@domain', valid: false },
  ];

  test.each(emailCases)('validates email: $email as $valid', ({ email, valid }) => {
    render(<SignUpForm />);
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: email } });
    if (valid) {
      expect(screen.queryByText(/Please enter a valid email address/i)).not.toBeInTheDocument();
    } else {
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    }
  });
});

test('form submission with valid data calls preventDefault', () => {
  const mockPreventDefault = jest.fn();
  render(<SignUpForm />);
  fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'Jane' } });
  fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Doe' } });
  fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'jane.doe@example.com' } });
  fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'Password1' } });

  fireEvent.submit(screen.getByRole('button', { name: /Create Account/i }), { preventDefault: mockPreventDefault });

  expect(mockPreventDefault).toHaveBeenCalled();
});
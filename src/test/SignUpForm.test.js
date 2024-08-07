import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SignUpForm from './SignUpForm';

test('renders the sign-up form with all fields', () => {
  render(<SignUpForm />);
  expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Create Account/i })).toBeInTheDocument();
});

test('updates state on input change', () => {
  render(<SignUpForm />);
  fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'John' } });
  fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Doe' } });
  fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john.doe@example.com' } });
  fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'Password1' } });
  
  expect(screen.getByLabelText(/First Name/i)).toHaveValue('John');
  expect(screen.getByLabelText(/Last Name/i)).toHaveValue('Doe');
  expect(screen.getByLabelText(/Email/i)).toHaveValue('john.doe@example.com');
  expect(screen.getByLabelText(/Password/i)).toHaveValue('Password1');
});

describe('email validation', () => {
  test('validates email correctly - valid email', () => {
    render(<SignUpForm />);
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'valid@example.com' } });
    expect(screen.queryByText(/Please enter a valid email address/i)).not.toBeInTheDocument();
  });

  test('validates email correctly - invalid email', () => {
    render(<SignUpForm />);
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'invalid' } });
    expect(screen.getByText(/Please enter a valid email address/i)).toBeInTheDocument();
  });
});

test('form submits with valid data', () => {
  render(<SignUpForm />);
  fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'John' } });
  fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Doe' } });
  fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john.doe@example.com' } });
  fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'Password1' } });

  expect(screen.getByRole('button', { name: /Create Account/i })).not.toBeDisabled();
});
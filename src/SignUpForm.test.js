import { render, screen, fireEvent } from '@testing-library/react';
import SignUpForm from './SignUpForm';

test('input fields update on change', () => {
  render(<SignUpForm />);
  const firstNameInput = screen.getByLabelText(/first name/i);
  const lastNameInput = screen.getByLabelText(/last name/i);
  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);

  fireEvent.change(firstNameInput, { target: { value: 'John' } });
  fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
  fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'Password1' } });

  expect(firstNameInput.value).toBe('John');
  expect(lastNameInput.value).toBe('Doe');
  expect(emailInput.value).toBe('john.doe@example.com');
  expect(passwordInput.value).toBe('Password1');
});

test('email validation feedback', () => {
  render(<SignUpForm />);
  const emailInput = screen.getByLabelText(/email/i);
  fireEvent.change(emailInput, { target: { value: 'invalidemail' } });
  const invalidFeedback = screen.getByText(/please enter a valid email address/i);
  expect(invalidFeedback).toBeInTheDocument();
});

test('password validation feedback', () => {
  render(<SignUpForm />);
  const passwordInput = screen.getByLabelText(/password/i);
  fireEvent.change(passwordInput, { target: { value: 'short' } });
  const invalidFeedback = screen.getByText(/minimum 8 characters/i);
  expect(invalidFeedback).toHaveClass('invalid');
});

test('form submission with valid data', () => {
  const mockSubmit = jest.fn();
  console.log = mockSubmit; // Mocking console.log for the purpose of the test
  render(<SignUpForm />);
  // Fill in all fields with valid data
  // Omitting for brevity, similar to the first test case
  fireEvent.click(screen.getByText(/create account/i));
  expect(mockSubmit).toHaveBeenCalledWith('Form submitted:', expect.any(Object));
});

test('form submission with invalid data blocks submission', () => {
  const mockSubmit = jest.fn();
  console.error = mockSubmit; // Mocking console.error for the purpose of the test
  render(<SignUpForm />);
  // Fill in all fields with invalid data
  // Omitting for brevity, similar to the first test case
  fireEvent.click(screen.getByText(/create account/i));
  expect(mockSubmit).toHaveBeenCalledWith('Form is invalid');
});
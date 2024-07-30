import { render, fireEvent } from '@testing-library/react';
import SignInForm from './SignInForm';

describe('SignInForm Component', () => {
  test('updates email in state on email input change', () => {
    const { getByLabelText } = render(<SignInForm />);
    fireEvent.change(getByLabelText(/Email/i), { target: { value: 'user@example.com' } });
    expect(getByLabelText(/Email/i).value).toBe('user@example.com');
  });

  test('updates password in state on password input change', () => {
    const { getByLabelText } = render(<SignInForm />);
    fireEvent.change(getByLabelText(/Password/i), { target: { value: 'password123' } });
    expect(getByLabelText(/Password/i).value).toBe('password123');
  });

  test('validates email format correctly', () => {
    const { getByLabelText, queryByText } = render(<SignInForm />);
    fireEvent.change(getByLabelText(/Email/i), { target: { value: 'invalid' } });
    expect(queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    fireEvent.change(getByLabelText(/Email/i), { target: { value: 'valid@example.com' } });
    expect(queryByText(/Please enter a valid email address/i)).toBeNull();
  });

  test('ensures password length is at least 8 characters', () => {
    const { getByLabelText, queryByText } = render(<SignInForm />);
    fireEvent.change(getByLabelText(/Password/i), { target: { value: 'short' } });
    expect(queryByText(/Your password must have at least 8 characters/i)).toBeInTheDocument();
    fireEvent.change(getByLabelText(/Password/i), { target: { value: 'longenoughpassword' } });
    expect(queryByText(/Your password must have at least 8 characters/i)).toBeNull();
  });

  test('prevents form submission when form is invalid', () => {
    const { getByText, getByLabelText } = render(<SignInForm />);
    fireEvent.change(getByLabelText(/Email/i), { target: { value: 'invalid' } });
    fireEvent.change(getByLabelText(/Password/i), { target: { value: 'short' } });
    fireEvent.click(getByText(/Sign In/i));
    expect(console.error).toHaveBeenCalledWith('Sign In form is invalid');
  });

  test('allows form submission when form is valid', () => {
    console.log = jest.fn(); // Mocking console.log for this test
    const { getByText, getByLabelText } = render(<SignInForm />);
    fireEvent.change(getByLabelText(/Email/i), { target: { value: 'user@example.com' } });
    fireEvent.change(getByLabelText(/Password/i), { target: { value: 'password123' } });
    fireEvent.click(getByText(/Sign In/i));
    expect(console.log).toHaveBeenCalledWith('Sign In submitted:', { email: 'user@example.com', password: 'password123' });
  });
});
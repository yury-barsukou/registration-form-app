import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SignInForm from './SignInForm';

describe('SignInForm Component', () => {
  test('renders without crashing', () => {
    const { getByLabelText } = render(<SignInForm />);
    expect(getByLabelText(/Email/i)).toBeInTheDocument();
    expect(getByLabelText(/Password/i)).toBeInTheDocument();
  });

  test('validates email correctly', () => {
    const { getByLabelText, getByText, queryByText } = render(<SignInForm />);
    const emailInput = getByLabelText(/Email/i);

    fireEvent.change(emailInput, { target: { value: 'invalid' } });
    expect(getByText(/Please enter a valid email address/i)).toBeInTheDocument();

    fireEvent.change(emailInput, { target: { value: 'valid@example.com' } });
    expect(queryByText(/Please enter a valid email address/i)).not.toBeInTheDocument();
  });

  test('validates password correctly', () => {
    const { getByLabelText, getByText, queryByText } = render(<SignInForm />);
    const passwordInput = getByLabelText(/Password/i);

    fireEvent.change(passwordInput, { target: { value: 'short' } });
    expect(getByText(/Your password must have at least 8 characters/i)).toBeInTheDocument();

    fireEvent.change(passwordInput, { target: { value: 'longenoughpassword' } });
    expect(queryByText(/Your password must have at least 8 characters/i)).not.toBeInTheDocument();
  });

  test('enables submit button only when form is valid', () => {
    const { getByLabelText, getByText } = render(<SignInForm />);
    const emailInput = getByLabelText(/Email/i);
    const passwordInput = getByLabelText(/Password/i);
    const submitButton = getByText(/Sign In/i);

    fireEvent.change(emailInput, { target: { value: 'valid@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'short' } });
    expect(submitButton).toBeDisabled();

    fireEvent.change(passwordInput, { target: { value: 'longenoughpassword' } });
    expect(submitButton).not.toBeDisabled();
  });

  test('submits form successfully when data is valid', () => {
    console.log = jest.fn(); // Mocking console.log for testing form submission
    const { getByLabelText, getByText } = render(<SignInForm />);
    const emailInput = getByLabelText(/Email/i);
    const passwordInput = getByLabelText(/Password/i);
    const submitButton = getByText(/Sign In/i);

    fireEvent.change(emailInput, { target: { value: 'valid@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'longenoughpassword' } });
    fireEvent.click(submitButton);

    expect(console.log).toHaveBeenCalledWith('Sign In submitted:', { email: 'valid@example.com', password: 'longenoughpassword' });
  });
});
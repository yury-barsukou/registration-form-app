import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import SignUpForm from './SignUpForm';

describe('SignUpForm', () => {
  const validEmail = 'test@example.com';
  const invalidEmail = 'test@example';
  const validPassword = 'password123';
  const shortPassword = 'pass';

  test('updates form data and validates on input change', async () => {
    const { getByLabelText } = render(<SignUpForm />);
    const emailInput = getByLabelText(/email/i);
    const passwordInput = getByLabelText(/password/i);

    fireEvent.change(emailInput, { target: { value: validEmail } });
    fireEvent.change(passwordInput, { target: { value: validPassword } });

    await waitFor(() => {
      expect(emailInput.value).toBe(validEmail);
      expect(passwordInput.value).toBe(validPassword);
    });
  });

  test('validates password correctly', async () => {
    const { getByLabelText, queryByText } = render(<SignUpForm />);
    const passwordInput = getByLabelText(/password/i);

    fireEvent.change(passwordInput, { target: { value: shortPassword } });

    await waitFor(() => {
      expect(queryByText(/password must be at least 8 characters/i)).toBeInTheDocument();
    });

    fireEvent.change(passwordInput, { target: { value: validPassword } });

    await waitFor(() => {
      expect(queryByText(/password must be at least 8 characters/i)).not.toBeInTheDocument();
    });
  });

  test('validates email correctly', async () => {
    const { getByLabelText, queryByText } = render(<SignUpForm />);
    const emailInput = getByLabelText(/email/i);

    fireEvent.change(emailInput, { target: { value: invalidEmail } });

    await waitFor(() => {
      expect(queryByText(/invalid email format/i)).toBeInTheDocument();
    });

    fireEvent.change(emailInput, { target: { value: validEmail } });

    await waitFor(() => {
      expect(queryByText(/invalid email format/i)).not.toBeInTheDocument();
    });
  });

  test('determines form validity correctly', async () => {
    const { getByLabelText, getByText } = render(<SignUpForm />);
    const emailInput = getByLabelText(/email/i);
    const passwordInput = getByLabelText(/password/i);
    const submitButton = getByText(/submit/i);

    fireEvent.change(emailInput, { target: { value: invalidEmail } });
    fireEvent.change(passwordInput, { target: { value: validPassword } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(getByText(/invalid form/i)).toBeInTheDocument();
    });

    fireEvent.change(emailInput, { target: { value: validEmail } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(getByText(/invalid form/i)).not.toBeInTheDocument();
    });
  });

  test('handles form submission correctly when form is valid', async () => {
    const handleSubmit = jest.fn();
    const { getByLabelText, getByText } = render(<SignUpForm onSubmit={handleSubmit} />);
    const emailInput = getByLabelText(/email/i);
    const passwordInput = getByLabelText(/password/i);
    const submitButton = getByText(/submit/i);

    fireEvent.change(emailInput, { target: { value: validEmail } });
    fireEvent.change(passwordInput, { target: { value: validPassword } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledWith({ email: validEmail, password: validPassword });
    });
  });

  test('prevents form submission and shows error when form is invalid', async () => {
    const handleSubmit = jest.fn();
    const { getByLabelText, getByText, queryByText } = render(<SignUpForm onSubmit={handleSubmit} />);
    const emailInput = getByLabelText(/email/i);
    const passwordInput = getByLabelText(/password/i);
    const submitButton = getByText(/submit/i);

    fireEvent.change(emailInput, { target: { value: invalidEmail } });
    fireEvent.change(passwordInput, { target: { value: shortPassword } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(handleSubmit).not.toHaveBeenCalled();
      expect(queryByText(/invalid form/i)).toBeInTheDocument();
    });
  });
});
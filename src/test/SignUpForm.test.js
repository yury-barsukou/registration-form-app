import { render, fireEvent } from '@testing-library/react';
import SignUpForm from '../SignUpForm';

describe('SignUpForm', () => {
  test('input changes update state', () => {
    const { getByLabelText } = render(<SignUpForm />);
    const emailInput = getByLabelText(/email/i);
    const passwordInput = getByLabelText(/password/i);

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Password123!' } });

    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('Password123!');
  });

  test('valid email format', () => {
    const { getByLabelText, queryByText } = render(<SignUpForm />);
    fireEvent.change(getByLabelText(/email/i), { target: { value: 'valid@example.com' } });

    const error = queryByText(/invalid email/i);
    expect(error).not.toBeInTheDocument();
  });

  test('invalid email format', () => {
    const { getByLabelText, getByText } = render(<SignUpForm />);
    fireEvent.change(getByLabelText(/email/i), { target: { value: 'invalid-email' } });

    const error = getByText(/invalid email/i);
    expect(error).toBeInTheDocument();
  });

  test('password validation', () => {
    const { getByLabelText, getByText } = render(<SignUpForm />);
    fireEvent.change(getByLabelText(/password/i), { target: { value: 'short' } });

    const error = getByText(/password is too short/i);
    expect(error).toBeInTheDocument();
  });

  test('form validation and submit button enabled/disabled', () => {
    const { getByLabelText, getByText } = render(<SignUpForm />);
    const submitButton = getByText(/submit/i);

    // Initially disabled
    expect(submitButton).toBeDisabled();

    // Valid input enables button
    fireEvent.change(getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(getByLabelText(/password/i), { target: { value: 'Password123!' } });
    expect(submitButton).not.toBeDisabled();
  });

  test('form submission with valid data', async () => {
    const mockSubmit = jest.fn();
    SignUpForm.prototype.submitForm = mockSubmit; // Assuming SignUpForm has a method named submitForm

    const { getByLabelText, getByText } = render(<SignUpForm />);
    fireEvent.change(getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(getByLabelText(/password/i), { target: { value: 'Password123!' } });
    fireEvent.click(getByText(/submit/i));

    expect(mockSubmit).toHaveBeenCalled();
  });

  test('form submission with invalid data', async () => {
    const mockSubmit = jest.fn();
    SignUpForm.prototype.submitForm = mockSubmit; // Assuming SignUpForm has a method named submitForm

    const { getByLabelText, getByText } = render(<SignUpForm />);
    fireEvent.change(getByLabelText(/email/i), { target: { value: 'invalid-email' } });
    fireEvent.click(getByText(/submit/i));

    expect(mockSubmit).not.toHaveBeenCalled();
  });
});
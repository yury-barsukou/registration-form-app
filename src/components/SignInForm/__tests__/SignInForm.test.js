import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SignInForm from '../../../SignInForm';

describe('SignInForm', () => {
  test('renders email and password inputs and submit button', () => {
    render(<SignInForm />);

    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign In/i })).toBeInTheDocument();
  });

  test('shows validation errors when submitting empty fields', async () => {
    const user = userEvent.setup();
    render(<SignInForm />);

    const submit = screen.getByRole('button', { name: /Sign In/i });
    // submit the form
    await user.click(submit);

    expect(await screen.findByText(/Please enter a valid email address/i)).toBeInTheDocument();
    expect(await screen.findByText(/Your password must have at least 8 characters/i)).toBeInTheDocument();
  });

  test('calls onSubmit prop with form data when valid', async () => {
    const user = userEvent.setup();
    const handleSubmit = jest.fn();
    render(<SignInForm onSubmit={handleSubmit} />);

    const email = screen.getByLabelText(/Email/i);
    const password = screen.getByLabelText(/Password/i);
    const submit = screen.getByRole('button', { name: /Sign In/i });

    await user.type(email, 'test@example.com');
    await user.type(password, 'longenough');
    await user.click(submit);

    expect(handleSubmit).toHaveBeenCalledTimes(1);
    expect(handleSubmit).toHaveBeenCalledWith({ email: 'test@example.com', password: 'longenough' });
  });

  test('toggles password visibility when clicking show/hide control', async () => {
    const user = userEvent.setup();
    render(<SignInForm />);

    const password = screen.getByLabelText(/Password/i);
    const toggle = screen.getByRole('button', { name: /Show password/i });

    // initially password input should have type password
    expect(password).toHaveAttribute('type', 'password');
    await user.click(toggle);
    // after toggle it should be text
    expect(password).toHaveAttribute('type', 'text');
    // button label changes to hide
    expect(screen.getByRole('button', { name: /Hide password/i })).toBeInTheDocument();
  });

  test('properly handles disabled state when submitting', async () => {
    const user = userEvent.setup();
    const handleSubmit = jest.fn(() => new Promise((r) => setTimeout(r, 50)));
    render(<SignInForm onSubmit={handleSubmit} isSubmitting={true} />);

    const submit = screen.getByRole('button', { name: /Signing in.../i });
    expect(submit).toBeDisabled();
  });
});

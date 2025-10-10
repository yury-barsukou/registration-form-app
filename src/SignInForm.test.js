import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SignInForm from './SignInForm';

describe('SignInForm', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  test('renders form inputs and submit button (snapshot)', () => {
    const { container } = render(<SignInForm />);
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign In/i })).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  test('shows validation messages for invalid email and short password', async () => {
    render(<SignInForm />);
    const user = userEvent.setup();

    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);

    await user.type(emailInput, 'invalid-email');
    expect(await screen.findByText(/Please enter a valid email address/i)).toBeInTheDocument();

    await user.type(passwordInput, 'short');
    expect(await screen.findByText(/Your password must have at least 8 characters/i)).toBeInTheDocument();

    // Button should remain disabled
    const submit = screen.getByRole('button', { name: /Sign In/i });
    expect(submit).toBeDisabled();
  });

  test('enables submit and calls console.log on valid submission', async () => {
    render(<SignInForm />);
    const user = userEvent.setup();

    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const submit = screen.getByRole('button', { name: /Sign In/i });

    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'longenoughpassword');

    expect(submit).toBeEnabled();

    await user.click(submit);

    expect(consoleSpy).toHaveBeenCalledWith('Sign In submitted:', {
      email: 'test@example.com',
      password: 'longenoughpassword',
    });
  });
});

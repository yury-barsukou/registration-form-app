import { render, screen, fireEvent } from '@testing-library/react';
import SignUpForm from '../SignUpForm';

describe('SignUpForm', () => {
  it('renders correctly with initial state', () => {
    render(<SignUpForm />);
    expect(screen.getByLabelText(/First Name/)).toHaveValue('');
    expect(screen.getByLabelText(/Last Name/)).toHaveValue('');
    expect(screen.getByLabelText(/Email/)).toHaveValue('');
    expect(screen.getByLabelText(/Password/)).toHaveValue('');
    expect(screen.getByRole('button', { name: /Create Account/ })).toBeDisabled();
  });

  it('handles user inputs correctly', () => {
    render(<SignUpForm />);

    fireEvent.change(screen.getByLabelText(/First Name/), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/Last Name/), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/Email/), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password/), { target: { value: 'Password1' } });

    expect(screen.getByLabelText(/First Name/)).toHaveValue('John');
    expect(screen.getByLabelText(/Last Name/)).toHaveValue('Doe');
    expect(screen.getByLabelText(/Email/)).toHaveValue('john.doe@example.com');
    expect(screen.getByLabelText(/Password/)).toHaveValue('Password1');
  });

  it('validates email correctly', () => {
    render(<SignUpForm />);

    fireEvent.change(screen.getByLabelText(/Email/), { target: { value: 'invalidemail' } });
    expect(screen.getByText(/Please enter a valid email address/)).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/Email/), { target: { value: 'valid.email@example.com' } });
    expect(screen.queryByText(/Please enter a valid email address/)).toBeNull();
  });

  it('validates password correctly', () => {
    render(<SignUpForm />);
    const passwordInput = screen.getByLabelText(/Password/);

    // Test for each validation rule
    fireEvent.change(passwordInput, { target: { value: 'abcdefg' } });
    expect(screen.getByText(/Minimum 8 characters/)).toHaveClass('invalid');

    fireEvent.change(passwordInput, { target: { value: 'Abcdefg1' } });
    expect(screen.getByText(/Minimum 8 characters/)).toHaveClass('valid');
    expect(screen.getByText(/1 uppercase character/)).toHaveClass('valid');
    expect(screen.getByText(/1 lowercase character/)).toHaveClass('valid');
    expect(screen.getByText(/1 number/)).toHaveClass('valid');
  });

  it('allows form submission only when form is valid', () => {
    render(<SignUpForm />);
    const submitButton = screen.getByRole('button', { name: /Create Account/ });

    // Initially disabled
    expect(submitButton).toBeDisabled();

    // Fill in the form with valid data
    fireEvent.change(screen.getByLabelText(/First Name/), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/Last Name/), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/Email/), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password/), { target: { value: 'Password1' } });

    // Button should now be enabled
    expect(submitButton).not.toBeDisabled();

    // Mocking and asserting form submission would typically involve more setup
  });
});
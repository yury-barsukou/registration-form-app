import { render, screen, fireEvent } from '@testing-library/react';
import SignUpForm from './SignUpForm';

describe('SignUpForm', () => {
  test('renders SignUpForm component', () => {
    render(<SignUpForm />);
    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  });

  test('validates email correctly', () => {
    render(<SignUpForm />);
    const emailInput = screen.getByLabelText(/Email/i);

    // Test invalid email
    fireEvent.change(emailInput, { target: { value: 'invalidemail' } });
    expect(screen.getByText(/Please enter a valid email address/i)).toBeInTheDocument();

    // Test valid email
    fireEvent.change(emailInput, { target: { value: 'email@example.com' } });
    expect(screen.queryByText(/Please enter a valid email address/i)).toBeNull();
  });

  // Additional tests for password validation, form submission, etc., would follow a similar pattern.
});
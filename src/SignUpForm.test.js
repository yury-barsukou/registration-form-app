import { render, screen, fireEvent } from '@testing-library/react';
import SignUpForm from './SignUpForm';

describe('SignUpForm', () => {
  test('renders the sign-up form with all inputs and the submit button', () => {
    render(<SignUpForm />);
    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument();
  });

  test('validates password correctly', () => {
    render(<SignUpForm />);
    const passwordInput = screen.getByLabelText(/password/i);
    fireEvent.change(passwordInput, { target: { value: 'Password1' } });
    expect(passwordInput.value).toBe('Password1');
    expect(screen.getByText(/1 uppercase character/i)).toHaveClass('valid');
    expect(screen.getByText(/1 lowercase character/i)).toHaveClass('valid');
    expect(screen.getByText(/1 number/i)).toHaveClass('valid');
    expect(screen.getByText(/Minimum 8 characters/i)).toHaveClass('valid');
  });

  test('validates email correctly', () => {
    render(<SignUpForm />);
    const emailInput = screen.getByLabelText(/email/i);
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    expect(emailInput.value).toBe('test@example.com');
    expect(screen.queryByText(/Please enter a valid email address/i)).toBeNull();
  });

  test('handles input change correctly', () => {
    render(<SignUpForm />);
    const firstNameInput = screen.getByLabelText(/first name/i);
    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    expect(firstNameInput.value).toBe('John');
    const lastNameInput = screen.getByLabelText(/last name/i);
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    expect(lastNameInput.value).toBe('Doe');
  });

  test('validates form correctly', () => {
    render(<SignUpForm />);
    const submitButton = screen.getByRole('button', { name: /create account/i });
    fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'Password1' } });
    expect(submitButton).not.toHaveClass('btn-disabled');
  });

  test('handles form submission correctly', () => {
    const { getByText } = render(<SignUpForm />);
    // Assuming a mock function to simulate form submission
    const mockSubmit = jest.fn();
    const submitButton = getByText(/create account/i);
    fireEvent.click(submitButton);
    expect(mockSubmit).toHaveBeenCalled();
  });
});
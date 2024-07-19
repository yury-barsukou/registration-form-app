import { render, fireEvent, screen } from '@testing-library/react';
import SignUpForm from './SignUpForm';

describe('SignUpForm', () => {
  test('renders correctly', () => {
    render(<SignUpForm />);
    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create account/i })).toBeDisabled();
  });

  test('enables submit button when form is valid', () => {
    render(<SignUpForm />);
    fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'Password1' } });

    expect(screen.getByRole('button', { name: /create account/i })).toBeEnabled();
  });

  test('displays validation messages for invalid email and password', () => {
    render(<SignUpForm />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'invalid' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'short' } });

    expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
    expect(screen.getByText(/minimum 8 characters/i)).toHaveClass('invalid');
  });

  test('form submission with valid data', () => {
    console.log = jest.fn();

    render(<SignUpForm />);
    fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'Password1' } });
    fireEvent.click(screen.getByRole('button', { name: /create account/i }));

    expect(console.log).toHaveBeenCalledWith('Form submitted:', expect.anything());
  });
  
  test('form submission with invalid data logs error', () => {
    console.error = jest.fn();

    render(<SignUpForm />);
    fireEvent.click(screen.getByRole('button', { name: /create account/i }));

    expect(console.error).toHaveBeenCalledWith('Form is invalid');
  });
});
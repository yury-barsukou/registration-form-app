import { render, screen, fireEvent } from '@testing-library/react';
import SignUpForm from '../SignUpForm';

describe('SignUpForm', () => {
  test('renders the sign-up form with all fields', () => {
    render(<SignUpForm />);
    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Create Account/i })).toBeInTheDocument();
  });

  test.each([
    { label: 'First Name', value: 'John' },
    { label: 'Last Name', value: 'Doe' },
    { label: 'Email', value: 'john.doe@example.com' },
    { label: 'Password', value: 'Password123' },
  ])('allows entry of $label', ({ label, value }) => {
    render(<SignUpForm />);
    fireEvent.change(screen.getByLabelText(new RegExp(label, 'i')), { target: { value } });
    expect(screen.getByLabelText(new RegExp(label, 'i')).value).toBe(value);
  });

  test('validates email format correctly', () => {
    render(<SignUpForm />);
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'invalid' } });
    expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john.doe@example.com' } });
    expect(screen.queryByText(/Please enter a valid email address/i)).toBeNull();
  });

  test('validates password criteria correctly', () => {
    render(<SignUpForm />);
    const password = screen.getByLabelText(/Password/i);
    fireEvent.change(password, { target: { value: 'short' } });
    expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
    fireEvent.change(password, { target: { value: 'LongEnough1' } });
    expect(screen.getByText(/1 uppercase character/i).className).toMatch(/green/);
    expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
    expect(screen.getByText(/1 number/i).className).toMatch(/green/);
    expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
  });

  test('enables Create Account button with valid form', () => {
    render(<SignUpForm />);
    fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'Password123' } });
    expect(screen.getByRole('button', { name: /Create Account/i })).not.toBeDisabled();
  });

  test('disables Create Account button with invalid form', () => {
    render(<SignUpForm />);
    fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: '' } }); // Leaving first name empty
    fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'Password123' } });
    expect(screen.getByRole('button', { name: /Create Account/i })).toBeDisabled();
  });

  test('calls console log with correct data on valid form submission', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    render(<SignUpForm />);

    fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'Password123' } });
    fireEvent.click(screen.getByRole('button', { name: /Create Account/i }));

    expect(consoleSpy).toHaveBeenLastCalledWith('Form submitted:', {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'Password123',
    });

    consoleSpy.mockRestore();
  });
});
import { render, fireEvent } from '@testing-library/react';
import SignUpForm from './SignUpForm';

describe('SignUpForm', () => {
  it('updates form data state on input change', () => {
    const { getByLabelText } = render(<SignUpForm />);
    const firstNameInput = getByLabelText(/First Name/i);
    const lastNameInput = getByLabelText(/Last Name/i);
    const emailInput = getByLabelText(/Email/i);
    const passwordInput = getByLabelText(/Password/i);

    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Password123!' } });

    expect(firstNameInput.value).toBe('John');
    expect(lastNameInput.value).toBe('Doe');
    expect(emailInput.value).toBe('john.doe@example.com');
    expect(passwordInput.value).toBe('Password123!');
  });

  it('validates email correctly', () => {
    const { getByLabelText, queryByText } = render(<SignUpForm />);
    const emailInput = getByLabelText(/Email/i);

    fireEvent.change(emailInput, { target: { value: 'incorrectemail' } });
    expect(queryByText(/Please enter a valid email address/i)).toBeInTheDocument();

    fireEvent.change(emailInput, { target: { value: 'correct@email.com' } });
    expect(queryByText(/Please enter a valid email address/i)).not.toBeInTheDocument();
  });

  it('validates password criteria correctly', () => {
    const { getByLabelText, getByText } = render(<SignUpForm />);
    const passwordInput = getByLabelText(/Password/i);

    fireEvent.change(passwordInput, { target: { value: 'short' } });
    expect(getByText(/Minimum 8 characters/i)).toHaveClass('invalid');

    fireEvent.change(passwordInput, { target: { value: 'NoNumbersOrUppercase' } });
    expect(getByText(/1 number/i)).toHaveClass('invalid');
    expect(getByText(/1 uppercase character/i)).toHaveClass('invalid');

    fireEvent.change(passwordInput, { target: { value: 'ValidPassword1' } });
    expect(getByText(/1 uppercase character/i)).toHaveClass('valid');
    expect(getByText(/1 lowercase character/i)).toHaveClass('valid');
    expect(getByText(/1 number/i)).toHaveClass('valid');
    expect(getByText(/Minimum 8 characters/i)).toHaveClass('valid');
  });

  it('enables submit button only when the form is valid', () => {
    const { getByLabelText, getByText } = render(<SignUpForm />);
    const submitButton = getByText(/Create Account/i);

    expect(submitButton).toHaveClass('btn-disabled');

    fireEvent.change(getByLabelText(/First Name/i), { target: { value: 'John' } });
    fireEvent.change(getByLabelText(/Last Name/i), { target: { value: 'Doe' } });
    fireEvent.change(getByLabelText(/Email/i), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(getByLabelText(/Password/i), { target: { value: 'Password1' } });

    expect(submitButton).not.toHaveClass('btn-disabled');
  });

  it('submits the form with valid data', () => {
    console.log = jest.fn();
    console.error = jest.fn();
    
    const { getByLabelText, getByText } = render(<SignUpForm />);
    const submitButton = getByText(/Create Account/i);

    // Fill the form with valid data
    fireEvent.change(getByLabelText(/First Name/i), { target: { value: 'John' } });
    fireEvent.change(getByLabelText(/Last Name/i), { target: { value: 'Doe' } });
    fireEvent.change(getByLabelText(/Email/i), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(getByLabelText(/Password/i), { target: { value: 'Password1' } });

    fireEvent.click(submitButton);

    expect(console.log).toHaveBeenCalledWith('Form submitted:', expect.any(Object));
    expect(console.error).not.toHaveBeenCalled();
  });
});
import { render, fireEvent, screen } from '@testing-library/react';
import SignUpForm from './SignUpForm';

describe('SignUpForm', () => {
  it('renders correctly', () => {
    render(<SignUpForm />);
    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it('updates state on input change', () => {
    render(<SignUpForm />);
    const firstNameInput = screen.getByLabelText(/first name/i);
    fireEvent.change(firstNameInput, { target: { value: 'John', name: 'firstName' } });
    expect(firstNameInput.value).toBe('John');
  });

  describe('validatePassword', () => {
    it.each([
      ['Password1', true, true, true, true],
      ['password1', false, true, true, true],
      ['PASSWORD1', true, false, true, true],
      ['Password', true, true, false, false],
      ['pass', false, true, false, false],
      ['12345678', false, false, true, true],
    ])('validates password "%s" correctly', (password, hasUppercase, hasLowercase, hasNumber, isLongEnough) => {
      render(<SignUpForm />);
      fireEvent.change(screen.getByLabelText(/password/i), { target: { value: password, name: 'password' } });
      expect(screen.getByTestId('hasUppercase').textContent).toBe(hasUppercase ? 'true' : 'false');
      expect(screen.getByTestId('hasLowercase').textContent).toBe(hasLowercase ? 'true' : 'false');
      expect(screen.getByTestId('hasNumber').textContent).toBe(hasNumber ? 'true' : 'false');
      expect(screen.getByTestId('isLongEnough').textContent).toBe(isLongEnough ? 'true' : 'false');
    });
  });

  describe('validateEmail', () => {
    it.each([
      ['email@example.com', true],
      ['email@example', false],
      ['@example.com', false],
      ['email@.com', false],
      ['email@example.com (Joe Smith)', false],
      ['email@example@example.com', false],
      ['email@example.com.', false],
      ['', false],
    ])('validates email "%s" correctly', (email, isValid) => {
      render(<SignUpForm />);
      fireEvent.change(screen.getByLabelText(/email/i), { target: { value: email, name: 'email' } });
      expect(screen.getByTestId('isEmailValid').textContent).toBe(isValid ? 'true' : 'false');
    });
  });

  // Note: The actual component would need modifications to include `data-testid` attributes for this code to work.
  // This implies adding data-testid="hasUppercase", data-testid="hasLowercase", etc. to the respective elements in the component.
});
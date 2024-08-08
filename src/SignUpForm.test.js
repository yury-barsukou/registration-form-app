import { render, screen, fireEvent } from '@testing-library/react';
import SignUpForm from './SignUpForm';

const LABELS = {
  firstName: /First Name/i,
  lastName: /Last Name/i,
  email: /Email/i,
  password: /Password/i,
};

const BUTTON_TEXT = /Create Account/i;
const VALID_EMAIL = 'john.doe@example.com';
const VALID_PASSWORD = 'Password123';

const fillOutForm = (overrides = {}) => {
  const formData = {
    firstName: 'John',
    lastName: 'Doe',
    email: VALID_EMAIL,
    password: VALID_PASSWORD,
    ...overrides,
  };

  fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: formData.firstName } });
  fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: formData.lastName } });
  fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: formData.email } });
  fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: formData.password } });

  return formData;
};

describe('SignUpForm - Additional Tests', () => {
  test('renders validation messages when email is invalid and password does not meet criteria', () => {
    fillOutForm({ email: 'invalidemail', password: 'short' });
    fireEvent.blur(screen.getByLabelText(LABELS.email));
    fireEvent.blur(screen.getByLabelText(LABELS.password));
    expect(screen.getByText(/Please enter a valid email address/i)).toBeInTheDocument();
    expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
  });

  test('does not log console error with valid form on submission', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const formData = fillOutForm();
    fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
    expect(consoleErrorSpy).not.toHaveBeenCalled();
    consoleErrorSpy.mockRestore();
  });

  test('logs console error with invalid form on submission', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    fillOutForm({ firstName: '' }); // Invalid form data
    fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
    expect(consoleErrorSpy).toHaveBeenCalledWith('Form is invalid');
    consoleErrorSpy.mockRestore();
  });

  test('renders error style for email input when it is invalid', () => {
    fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'invalidemail' } });
    fireEvent.blur(screen.getByLabelText(LABELS.email));
    expect(screen.getByLabelText(LABELS.email)).toHaveClass('form-control invalid');
  });

  test('renders normal style for email input when it is valid', () => {
    fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: VALID_EMAIL } });
    fireEvent.blur(screen.getByLabelText(LABELS.email));
    expect(screen.getByLabelText(LABELS.email)).toHaveClass('form-control');
    expect(screen.getByLabelText(LABELS.email)).not.toHaveClass('invalid');
  });

  test.each([
    { name: 'firstName', value: 'Jane' },
    { name: 'lastName', value: 'Doe' },
    { name: 'email', value: VALID_EMAIL },
    { name: 'password', value: VALID_PASSWORD },
  ])('updates state correctly when %s field is changed', ({ name, value }) => {
    fireEvent.change(screen.getByLabelText(LABELS[name]), { target: { value } });
    expect(screen.getByLabelText(LABELS[name])).toHaveValue(value);
  });

  test('prevents form submission when form is invalid', () => {
    const formData = fillOutForm({ email: 'invalid' }); // Invalid email
    fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
    expect(screen.queryByText('Form submitted:', formData)).toBeNull();
  });
});
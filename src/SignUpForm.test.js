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
describe('Password and Email Validation Edge Cases', () => {
    test('validates password without uppercase correctly', () => {
        const password = screen.getByLabelText(LABELS.password);
        fireEvent.change(password, { target: { value: 'longenough1' } });
        expect(screen.getByText(/1 uppercase character/i).className).toMatch(/red/);
        expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 number/i).className).toMatch(/green/);
        expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('validates password without lowercase correctly', () => {
        const password = screen.getByLabelText(LABELS.password);
        fireEvent.change(password, { target: { value: 'LONGENOUGH1' } });
        expect(screen.getByText(/1 uppercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 lowercase character/i).className).toMatch(/red/);
        expect(screen.getByText(/1 number/i).className).toMatch(/green/);
        expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('validates password without number correctly', () => {
        const password = screen.getByLabelText(LABELS.password);
        fireEvent.change(password, { target: { value: 'LongEnough' } });
        expect(screen.getByText(/1 uppercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 number/i).className).toMatch(/red/);
        expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('validates password that is not long enough correctly', () => {
        const password = screen.getByLabelText(LABELS.password);
        fireEvent.change(password, { target: { value: 'L1a' } });
        expect(screen.getByText(/1 uppercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 number/i).className).toMatch(/green/);
        expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
    });

    test('validates incorrect email format without @ symbol', () => {
        fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'invalidemail.com' } });
        expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test('validates incorrect email format without domain', () => {
        fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'invalidemail@' } });
        expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test('validates incorrect email format with multiple @ symbols', () => {
        fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'invalid@@email.com' } });
        expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test('validates correct email format with subdomain', () => {
        fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'john.doe@sub.example.com' } });
        expect(screen.queryByText(/Please enter a valid email address/i)).toBeNull();
    });
});

describe('Form Submission with Edge Cases', () => {
    let consoleErrorSpy;
    beforeEach(() => {
        consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        consoleErrorSpy.mockRestore();
    });

    test('calls console error with invalid form due to invalid email', () => {
        fillOutForm({ email: 'invalidemail' });
        fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
        expect(consoleErrorSpy).toHaveBeenLastCalledWith('Form is invalid');
    });

    test('calls console error with invalid form due to password missing criteria', () => {
        fillOutForm({ password: 'short' });
        fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
        expect(consoleErrorSpy).toHaveBeenLastCalledWith('Form is invalid');
    });
});
  fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: formData.lastName } });
describe('Password and Email Validation Edge Cases', () => {
    test('validates password without uppercase correctly', () => {
        const password = screen.getByLabelText(LABELS.password);
        fireEvent.change(password, { target: { value: 'longenough1' } });
        expect(screen.getByText(/1 uppercase character/i).className).toMatch(/red/);
        expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 number/i).className).toMatch(/green/);
        expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('validates password without lowercase correctly', () => {
        const password = screen.getByLabelText(LABELS.password);
        fireEvent.change(password, { target: { value: 'LONGENOUGH1' } });
        expect(screen.getByText(/1 uppercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 lowercase character/i).className).toMatch(/red/);
        expect(screen.getByText(/1 number/i).className).toMatch(/green/);
        expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('validates password without number correctly', () => {
        const password = screen.getByLabelText(LABELS.password);
        fireEvent.change(password, { target: { value: 'LongEnough' } });
        expect(screen.getByText(/1 uppercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 number/i).className).toMatch(/red/);
        expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('validates password that is not long enough correctly', () => {
        const password = screen.getByLabelText(LABELS.password);
        fireEvent.change(password, { target: { value: 'L1a' } });
        expect(screen.getByText(/1 uppercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 number/i).className).toMatch(/green/);
        expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
    });

    test('validates incorrect email format without @ symbol', () => {
        fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'invalidemail.com' } });
        expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test('validates incorrect email format without domain', () => {
        fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'invalidemail@' } });
        expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test('validates incorrect email format with multiple @ symbols', () => {
        fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'invalid@@email.com' } });
        expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test('validates correct email format with subdomain', () => {
        fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'john.doe@sub.example.com' } });
        expect(screen.queryByText(/Please enter a valid email address/i)).toBeNull();
    });
});

describe('Form Submission with Edge Cases', () => {
    let consoleErrorSpy;
    beforeEach(() => {
        consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        consoleErrorSpy.mockRestore();
    });

    test('calls console error with invalid form due to invalid email', () => {
        fillOutForm({ email: 'invalidemail' });
        fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
        expect(consoleErrorSpy).toHaveBeenLastCalledWith('Form is invalid');
    });

    test('calls console error with invalid form due to password missing criteria', () => {
        fillOutForm({ password: 'short' });
        fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
        expect(consoleErrorSpy).toHaveBeenLastCalledWith('Form is invalid');
    });
});
  fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: formData.email } });
describe('Password and Email Validation Edge Cases', () => {
    test('validates password without uppercase correctly', () => {
        const password = screen.getByLabelText(LABELS.password);
        fireEvent.change(password, { target: { value: 'longenough1' } });
        expect(screen.getByText(/1 uppercase character/i).className).toMatch(/red/);
        expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 number/i).className).toMatch(/green/);
        expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('validates password without lowercase correctly', () => {
        const password = screen.getByLabelText(LABELS.password);
        fireEvent.change(password, { target: { value: 'LONGENOUGH1' } });
        expect(screen.getByText(/1 uppercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 lowercase character/i).className).toMatch(/red/);
        expect(screen.getByText(/1 number/i).className).toMatch(/green/);
        expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('validates password without number correctly', () => {
        const password = screen.getByLabelText(LABELS.password);
        fireEvent.change(password, { target: { value: 'LongEnough' } });
        expect(screen.getByText(/1 uppercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 number/i).className).toMatch(/red/);
        expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('validates password that is not long enough correctly', () => {
        const password = screen.getByLabelText(LABELS.password);
        fireEvent.change(password, { target: { value: 'L1a' } });
        expect(screen.getByText(/1 uppercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 number/i).className).toMatch(/green/);
        expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
    });

    test('validates incorrect email format without @ symbol', () => {
        fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'invalidemail.com' } });
        expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test('validates incorrect email format without domain', () => {
        fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'invalidemail@' } });
        expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test('validates incorrect email format with multiple @ symbols', () => {
        fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'invalid@@email.com' } });
        expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test('validates correct email format with subdomain', () => {
        fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'john.doe@sub.example.com' } });
        expect(screen.queryByText(/Please enter a valid email address/i)).toBeNull();
    });
});

describe('Form Submission with Edge Cases', () => {
    let consoleErrorSpy;
    beforeEach(() => {
        consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        consoleErrorSpy.mockRestore();
    });

    test('calls console error with invalid form due to invalid email', () => {
        fillOutForm({ email: 'invalidemail' });
        fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
        expect(consoleErrorSpy).toHaveBeenLastCalledWith('Form is invalid');
    });

    test('calls console error with invalid form due to password missing criteria', () => {
        fillOutForm({ password: 'short' });
        fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
        expect(consoleErrorSpy).toHaveBeenLastCalledWith('Form is invalid');
    });
});
  fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: formData.password } });
describe('Password and Email Validation Edge Cases', () => {
    test('validates password without uppercase correctly', () => {
        const password = screen.getByLabelText(LABELS.password);
        fireEvent.change(password, { target: { value: 'longenough1' } });
        expect(screen.getByText(/1 uppercase character/i).className).toMatch(/red/);
        expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 number/i).className).toMatch(/green/);
        expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('validates password without lowercase correctly', () => {
        const password = screen.getByLabelText(LABELS.password);
        fireEvent.change(password, { target: { value: 'LONGENOUGH1' } });
        expect(screen.getByText(/1 uppercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 lowercase character/i).className).toMatch(/red/);
        expect(screen.getByText(/1 number/i).className).toMatch(/green/);
        expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('validates password without number correctly', () => {
        const password = screen.getByLabelText(LABELS.password);
        fireEvent.change(password, { target: { value: 'LongEnough' } });
        expect(screen.getByText(/1 uppercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 number/i).className).toMatch(/red/);
        expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('validates password that is not long enough correctly', () => {
        const password = screen.getByLabelText(LABELS.password);
        fireEvent.change(password, { target: { value: 'L1a' } });
        expect(screen.getByText(/1 uppercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 number/i).className).toMatch(/green/);
        expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
    });

    test('validates incorrect email format without @ symbol', () => {
        fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'invalidemail.com' } });
        expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test('validates incorrect email format without domain', () => {
        fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'invalidemail@' } });
        expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test('validates incorrect email format with multiple @ symbols', () => {
        fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'invalid@@email.com' } });
        expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test('validates correct email format with subdomain', () => {
        fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'john.doe@sub.example.com' } });
        expect(screen.queryByText(/Please enter a valid email address/i)).toBeNull();
    });
});

describe('Form Submission with Edge Cases', () => {
    let consoleErrorSpy;
    beforeEach(() => {
        consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        consoleErrorSpy.mockRestore();
    });

    test('calls console error with invalid form due to invalid email', () => {
        fillOutForm({ email: 'invalidemail' });
        fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
        expect(consoleErrorSpy).toHaveBeenLastCalledWith('Form is invalid');
    });

    test('calls console error with invalid form due to password missing criteria', () => {
        fillOutForm({ password: 'short' });
        fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
        expect(consoleErrorSpy).toHaveBeenLastCalledWith('Form is invalid');
    });
});

  return formData;
};

describe('SignUpForm', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });
describe('Password and Email Validation Edge Cases', () => {
    test('validates password without uppercase correctly', () => {
        const password = screen.getByLabelText(LABELS.password);
        fireEvent.change(password, { target: { value: 'longenough1' } });
        expect(screen.getByText(/1 uppercase character/i).className).toMatch(/red/);
        expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 number/i).className).toMatch(/green/);
        expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('validates password without lowercase correctly', () => {
        const password = screen.getByLabelText(LABELS.password);
        fireEvent.change(password, { target: { value: 'LONGENOUGH1' } });
        expect(screen.getByText(/1 uppercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 lowercase character/i).className).toMatch(/red/);
        expect(screen.getByText(/1 number/i).className).toMatch(/green/);
        expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('validates password without number correctly', () => {
        const password = screen.getByLabelText(LABELS.password);
        fireEvent.change(password, { target: { value: 'LongEnough' } });
        expect(screen.getByText(/1 uppercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 number/i).className).toMatch(/red/);
        expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('validates password that is not long enough correctly', () => {
        const password = screen.getByLabelText(LABELS.password);
        fireEvent.change(password, { target: { value: 'L1a' } });
        expect(screen.getByText(/1 uppercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 number/i).className).toMatch(/green/);
        expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
    });

    test('validates incorrect email format without @ symbol', () => {
        fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'invalidemail.com' } });
        expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test('validates incorrect email format without domain', () => {
        fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'invalidemail@' } });
        expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test('validates incorrect email format with multiple @ symbols', () => {
        fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'invalid@@email.com' } });
        expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test('validates correct email format with subdomain', () => {
        fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'john.doe@sub.example.com' } });
        expect(screen.queryByText(/Please enter a valid email address/i)).toBeNull();
    });
});

describe('Form Submission with Edge Cases', () => {
    let consoleErrorSpy;
    beforeEach(() => {
        consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        consoleErrorSpy.mockRestore();
    });

    test('calls console error with invalid form due to invalid email', () => {
        fillOutForm({ email: 'invalidemail' });
        fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
        expect(consoleErrorSpy).toHaveBeenLastCalledWith('Form is invalid');
    });

    test('calls console error with invalid form due to password missing criteria', () => {
        fillOutForm({ password: 'short' });
        fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
        expect(consoleErrorSpy).toHaveBeenLastCalledWith('Form is invalid');
    });
});

  test('renders the sign-up form with all fields', () => {
    expect(screen.getByLabelText(LABELS.firstName)).toBeInTheDocument();
    expect(screen.getByLabelText(LABELS.lastName)).toBeInTheDocument();
    expect(screen.getByLabelText(LABELS.email)).toBeInTheDocument();
    expect(screen.getByLabelText(LABELS.password)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeInTheDocument();
  });
describe('Password and Email Validation Edge Cases', () => {
    test('validates password without uppercase correctly', () => {
        const password = screen.getByLabelText(LABELS.password);
        fireEvent.change(password, { target: { value: 'longenough1' } });
        expect(screen.getByText(/1 uppercase character/i).className).toMatch(/red/);
        expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 number/i).className).toMatch(/green/);
        expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('validates password without lowercase correctly', () => {
        const password = screen.getByLabelText(LABELS.password);
        fireEvent.change(password, { target: { value: 'LONGENOUGH1' } });
        expect(screen.getByText(/1 uppercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 lowercase character/i).className).toMatch(/red/);
        expect(screen.getByText(/1 number/i).className).toMatch(/green/);
        expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('validates password without number correctly', () => {
        const password = screen.getByLabelText(LABELS.password);
        fireEvent.change(password, { target: { value: 'LongEnough' } });
        expect(screen.getByText(/1 uppercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 number/i).className).toMatch(/red/);
        expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('validates password that is not long enough correctly', () => {
        const password = screen.getByLabelText(LABELS.password);
        fireEvent.change(password, { target: { value: 'L1a' } });
        expect(screen.getByText(/1 uppercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 number/i).className).toMatch(/green/);
        expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
    });

    test('validates incorrect email format without @ symbol', () => {
        fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'invalidemail.com' } });
        expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test('validates incorrect email format without domain', () => {
        fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'invalidemail@' } });
        expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test('validates incorrect email format with multiple @ symbols', () => {
        fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'invalid@@email.com' } });
        expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test('validates correct email format with subdomain', () => {
        fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'john.doe@sub.example.com' } });
        expect(screen.queryByText(/Please enter a valid email address/i)).toBeNull();
    });
});

describe('Form Submission with Edge Cases', () => {
    let consoleErrorSpy;
    beforeEach(() => {
        consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        consoleErrorSpy.mockRestore();
    });

    test('calls console error with invalid form due to invalid email', () => {
        fillOutForm({ email: 'invalidemail' });
        fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
        expect(consoleErrorSpy).toHaveBeenLastCalledWith('Form is invalid');
    });

    test('calls console error with invalid form due to password missing criteria', () => {
        fillOutForm({ password: 'short' });
        fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
        expect(consoleErrorSpy).toHaveBeenLastCalledWith('Form is invalid');
    });
});

  describe('Field Entry', () => {
    test.each(Object.entries(LABELS))('allows entry of %s', (fieldName, labelRegex) => {
      const value = 'TestValue';
      fireEvent.change(screen.getByLabelText(labelRegex), { target: { value } });
describe('Password and Email Validation Edge Cases', () => {
    test('validates password without uppercase correctly', () => {
        const password = screen.getByLabelText(LABELS.password);
        fireEvent.change(password, { target: { value: 'longenough1' } });
        expect(screen.getByText(/1 uppercase character/i).className).toMatch(/red/);
        expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 number/i).className).toMatch(/green/);
        expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('validates password without lowercase correctly', () => {
        const password = screen.getByLabelText(LABELS.password);
        fireEvent.change(password, { target: { value: 'LONGENOUGH1' } });
        expect(screen.getByText(/1 uppercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 lowercase character/i).className).toMatch(/red/);
        expect(screen.getByText(/1 number/i).className).toMatch(/green/);
        expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('validates password without number correctly', () => {
        const password = screen.getByLabelText(LABELS.password);
        fireEvent.change(password, { target: { value: 'LongEnough' } });
        expect(screen.getByText(/1 uppercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 number/i).className).toMatch(/red/);
        expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('validates password that is not long enough correctly', () => {
        const password = screen.getByLabelText(LABELS.password);
        fireEvent.change(password, { target: { value: 'L1a' } });
        expect(screen.getByText(/1 uppercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 number/i).className).toMatch(/green/);
        expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
    });

    test('validates incorrect email format without @ symbol', () => {
        fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'invalidemail.com' } });
        expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test('validates incorrect email format without domain', () => {
        fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'invalidemail@' } });
        expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test('validates incorrect email format with multiple @ symbols', () => {
        fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'invalid@@email.com' } });
        expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test('validates correct email format with subdomain', () => {
        fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'john.doe@sub.example.com' } });
        expect(screen.queryByText(/Please enter a valid email address/i)).toBeNull();
    });
});

describe('Form Submission with Edge Cases', () => {
    let consoleErrorSpy;
    beforeEach(() => {
        consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        consoleErrorSpy.mockRestore();
    });

    test('calls console error with invalid form due to invalid email', () => {
        fillOutForm({ email: 'invalidemail' });
        fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
        expect(consoleErrorSpy).toHaveBeenLastCalledWith('Form is invalid');
    });

    test('calls console error with invalid form due to password missing criteria', () => {
        fillOutForm({ password: 'short' });
        fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
        expect(consoleErrorSpy).toHaveBeenLastCalledWith('Form is invalid');
    });
});
      expect(screen.getByLabelText(labelRegex)).toHaveValue(value);
    });
describe('Password and Email Validation Edge Cases', () => {
    test('validates password without uppercase correctly', () => {
        const password = screen.getByLabelText(LABELS.password);
        fireEvent.change(password, { target: { value: 'longenough1' } });
        expect(screen.getByText(/1 uppercase character/i).className).toMatch(/red/);
        expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 number/i).className).toMatch(/green/);
        expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('validates password without lowercase correctly', () => {
        const password = screen.getByLabelText(LABELS.password);
        fireEvent.change(password, { target: { value: 'LONGENOUGH1' } });
        expect(screen.getByText(/1 uppercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 lowercase character/i).className).toMatch(/red/);
        expect(screen.getByText(/1 number/i).className).toMatch(/green/);
        expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('validates password without number correctly', () => {
        const password = screen.getByLabelText(LABELS.password);
        fireEvent.change(password, { target: { value: 'LongEnough' } });
        expect(screen.getByText(/1 uppercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 number/i).className).toMatch(/red/);
        expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('validates password that is not long enough correctly', () => {
        const password = screen.getByLabelText(LABELS.password);
        fireEvent.change(password, { target: { value: 'L1a' } });
        expect(screen.getByText(/1 uppercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 number/i).className).toMatch(/green/);
        expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
    });

    test('validates incorrect email format without @ symbol', () => {
        fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'invalidemail.com' } });
        expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test('validates incorrect email format without domain', () => {
        fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'invalidemail@' } });
        expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test('validates incorrect email format with multiple @ symbols', () => {
        fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'invalid@@email.com' } });
        expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test('validates correct email format with subdomain', () => {
        fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'john.doe@sub.example.com' } });
        expect(screen.queryByText(/Please enter a valid email address/i)).toBeNull();
    });
});

describe('Form Submission with Edge Cases', () => {
    let consoleErrorSpy;
    beforeEach(() => {
        consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        consoleErrorSpy.mockRestore();
    });

    test('calls console error with invalid form due to invalid email', () => {
        fillOutForm({ email: 'invalidemail' });
        fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
        expect(consoleErrorSpy).toHaveBeenLastCalledWith('Form is invalid');
    });

    test('calls console error with invalid form due to password missing criteria', () => {
        fillOutForm({ password: 'short' });
        fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
        expect(consoleErrorSpy).toHaveBeenLastCalledWith('Form is invalid');
    });
});
  });
describe('Password and Email Validation Edge Cases', () => {
    test('validates password without uppercase correctly', () => {
        const password = screen.getByLabelText(LABELS.password);
        fireEvent.change(password, { target: { value: 'longenough1' } });
        expect(screen.getByText(/1 uppercase character/i).className).toMatch(/red/);
        expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 number/i).className).toMatch(/green/);
        expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('validates password without lowercase correctly', () => {
        const password = screen.getByLabelText(LABELS.password);
        fireEvent.change(password, { target: { value: 'LONGENOUGH1' } });
        expect(screen.getByText(/1 uppercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 lowercase character/i).className).toMatch(/red/);
        expect(screen.getByText(/1 number/i).className).toMatch(/green/);
        expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('validates password without number correctly', () => {
        const password = screen.getByLabelText(LABELS.password);
        fireEvent.change(password, { target: { value: 'LongEnough' } });
        expect(screen.getByText(/1 uppercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 number/i).className).toMatch(/red/);
        expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('validates password that is not long enough correctly', () => {
        const password = screen.getByLabelText(LABELS.password);
        fireEvent.change(password, { target: { value: 'L1a' } });
        expect(screen.getByText(/1 uppercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 number/i).className).toMatch(/green/);
        expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
    });

    test('validates incorrect email format without @ symbol', () => {
        fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'invalidemail.com' } });
        expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test('validates incorrect email format without domain', () => {
        fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'invalidemail@' } });
        expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test('validates incorrect email format with multiple @ symbols', () => {
        fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'invalid@@email.com' } });
        expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test('validates correct email format with subdomain', () => {
        fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'john.doe@sub.example.com' } });
        expect(screen.queryByText(/Please enter a valid email address/i)).toBeNull();
    });
});

describe('Form Submission with Edge Cases', () => {
    let consoleErrorSpy;
    beforeEach(() => {
        consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        consoleErrorSpy.mockRestore();
    });

    test('calls console error with invalid form due to invalid email', () => {
        fillOutForm({ email: 'invalidemail' });
        fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
        expect(consoleErrorSpy).toHaveBeenLastCalledWith('Form is invalid');
    });

    test('calls console error with invalid form due to password missing criteria', () => {
        fillOutForm({ password: 'short' });
        fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
        expect(consoleErrorSpy).toHaveBeenLastCalledWith('Form is invalid');
    });
});

  describe('Form Validation', () => {
    test('validates email format correctly', () => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'invalid' } });
describe('Password and Email Validation Edge Cases', () => {
    test('validates password without uppercase correctly', () => {
        const password = screen.getByLabelText(LABELS.password);
        fireEvent.change(password, { target: { value: 'longenough1' } });
        expect(screen.getByText(/1 uppercase character/i).className).toMatch(/red/);
        expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 number/i).className).toMatch(/green/);
        expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('validates password without lowercase correctly', () => {
        const password = screen.getByLabelText(LABELS.password);
        fireEvent.change(password, { target: { value: 'LONGENOUGH1' } });
        expect(screen.getByText(/1 uppercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 lowercase character/i).className).toMatch(/red/);
        expect(screen.getByText(/1 number/i).className).toMatch(/green/);
        expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('validates password without number correctly', () => {
        const password = screen.getByLabelText(LABELS.password);
        fireEvent.change(password, { target: { value: 'LongEnough' } });
        expect(screen.getByText(/1 uppercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 number/i).className).toMatch(/red/);
        expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('validates password that is not long enough correctly', () => {
        const password = screen.getByLabelText(LABELS.password);
        fireEvent.change(password, { target: { value: 'L1a' } });
        expect(screen.getByText(/1 uppercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 number/i).className).toMatch(/green/);
        expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
    });

    test('validates incorrect email format without @ symbol', () => {
        fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'invalidemail.com' } });
        expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test('validates incorrect email format without domain', () => {
        fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'invalidemail@' } });
        expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test('validates incorrect email format with multiple @ symbols', () => {
        fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'invalid@@email.com' } });
        expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test('validates correct email format with subdomain', () => {
        fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'john.doe@sub.example.com' } });
        expect(screen.queryByText(/Please enter a valid email address/i)).toBeNull();
    });
});

describe('Form Submission with Edge Cases', () => {
    let consoleErrorSpy;
    beforeEach(() => {
        consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        consoleErrorSpy.mockRestore();
    });

    test('calls console error with invalid form due to invalid email', () => {
        fillOutForm({ email: 'invalidemail' });
        fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
        expect(consoleErrorSpy).toHaveBeenLastCalledWith('Form is invalid');
    });

    test('calls console error with invalid form due to password missing criteria', () => {
        fillOutForm({ password: 'short' });
        fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
        expect(consoleErrorSpy).toHaveBeenLastCalledWith('Form is invalid');
    });
});
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: VALID_EMAIL } });
describe('Password and Email Validation Edge Cases', () => {
    test('validates password without uppercase correctly', () => {
        const password = screen.getByLabelText(LABELS.password);
        fireEvent.change(password, { target: { value: 'longenough1' } });
        expect(screen.getByText(/1 uppercase character/i).className).toMatch(/red/);
        expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 number/i).className).toMatch(/green/);
        expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('validates password without lowercase correctly', () => {
        const password = screen.getByLabelText(LABELS.password);
        fireEvent.change(password, { target: { value: 'LONGENOUGH1' } });
        expect(screen.getByText(/1 uppercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 lowercase character/i).className).toMatch(/red/);
        expect(screen.getByText(/1 number/i).className).toMatch(/green/);
        expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('validates password without number correctly', () => {
        const password = screen.getByLabelText(LABELS.password);
        fireEvent.change(password, { target: { value: 'LongEnough' } });
        expect(screen.getByText(/1 uppercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 number/i).className).toMatch(/red/);
        expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('validates password that is not long enough correctly', () => {
        const password = screen.getByLabelText(LABELS.password);
        fireEvent.change(password, { target: { value: 'L1a' } });
        expect(screen.getByText(/1 uppercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 number/i).className).toMatch(/green/);
        expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
    });

    test('validates incorrect email format without @ symbol', () => {
        fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'invalidemail.com' } });
        expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test('validates incorrect email format without domain', () => {
        fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'invalidemail@' } });
        expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test('validates incorrect email format with multiple @ symbols', () => {
        fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'invalid@@email.com' } });
        expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test('validates correct email format with subdomain', () => {
        fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'john.doe@sub.example.com' } });
        expect(screen.queryByText(/Please enter a valid email address/i)).toBeNull();
    });
});

describe('Form Submission with Edge Cases', () => {
    let consoleErrorSpy;
    beforeEach(() => {
        consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        consoleErrorSpy.mockRestore();
    });

    test('calls console error with invalid form due to invalid email', () => {
        fillOutForm({ email: 'invalidemail' });
        fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
        expect(consoleErrorSpy).toHaveBeenLastCalledWith('Form is invalid');
    });

    test('calls console error with invalid form due to password missing criteria', () => {
        fillOutForm({ password: 'short' });
        fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
        expect(consoleErrorSpy).toHaveBeenLastCalledWith('Form is invalid');
    });
});
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeNull();
    });
describe('Password and Email Validation Edge Cases', () => {
    test('validates password without uppercase correctly', () => {
        const password = screen.getByLabelText(LABELS.password);
        fireEvent.change(password, { target: { value: 'longenough1' } });
        expect(screen.getByText(/1 uppercase character/i).className).toMatch(/red/);
        expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 number/i).className).toMatch(/green/);
        expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('validates password without lowercase correctly', () => {
        const password = screen.getByLabelText(LABELS.password);
        fireEvent.change(password, { target: { value: 'LONGENOUGH1' } });
        expect(screen.getByText(/1 uppercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 lowercase character/i).className).toMatch(/red/);
        expect(screen.getByText(/1 number/i).className).toMatch(/green/);
        expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('validates password without number correctly', () => {
        const password = screen.getByLabelText(LABELS.password);
        fireEvent.change(password, { target: { value: 'LongEnough' } });
        expect(screen.getByText(/1 uppercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 number/i).className).toMatch(/red/);
        expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('validates password that is not long enough correctly', () => {
        const password = screen.getByLabelText(LABELS.password);
        fireEvent.change(password, { target: { value: 'L1a' } });
        expect(screen.getByText(/1 uppercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 number/i).className).toMatch(/green/);
        expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
    });

    test('validates incorrect email format without @ symbol', () => {
        fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'invalidemail.com' } });
        expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test('validates incorrect email format without domain', () => {
        fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'invalidemail@' } });
        expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test('validates incorrect email format with multiple @ symbols', () => {
        fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'invalid@@email.com' } });
        expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test('validates correct email format with subdomain', () => {
        fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'john.doe@sub.example.com' } });
        expect(screen.queryByText(/Please enter a valid email address/i)).toBeNull();
    });
});

describe('Form Submission with Edge Cases', () => {
    let consoleErrorSpy;
    beforeEach(() => {
        consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        consoleErrorSpy.mockRestore();
    });

    test('calls console error with invalid form due to invalid email', () => {
        fillOutForm({ email: 'invalidemail' });
        fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
        expect(consoleErrorSpy).toHaveBeenLastCalledWith('Form is invalid');
    });

    test('calls console error with invalid form due to password missing criteria', () => {
        fillOutForm({ password: 'short' });
        fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
        expect(consoleErrorSpy).toHaveBeenLastCalledWith('Form is invalid');
    });
});

    test('validates password criteria correctly', () => {
      const password = screen.getByLabelText(LABELS.password);
      fireEvent.change(password, { target: { value: 'short' } });
describe('Password and Email Validation Edge Cases', () => {
    test('validates password without uppercase correctly', () => {
        const password = screen.getByLabelText(LABELS.password);
        fireEvent.change(password, { target: { value: 'longenough1' } });
        expect(screen.getByText(/1 uppercase character/i).className).toMatch(/red/);
        expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 number/i).className).toMatch(/green/);
        expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('validates password without lowercase correctly', () => {
        const password = screen.getByLabelText(LABELS.password);
        fireEvent.change(password, { target: { value: 'LONGENOUGH1' } });
        expect(screen.getByText(/1 uppercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 lowercase character/i).className).toMatch(/red/);
        expect(screen.getByText(/1 number/i).className).toMatch(/green/);
        expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('validates password without number correctly', () => {
        const password = screen.getByLabelText(LABELS.password);
        fireEvent.change(password, { target: { value: 'LongEnough' } });
        expect(screen.getByText(/1 uppercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 number/i).className).toMatch(/red/);
        expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('validates password that is not long enough correctly', () => {
        const password = screen.getByLabelText(LABELS.password);
        fireEvent.change(password, { target: { value: 'L1a' } });
        expect(screen.getByText(/1 uppercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 number/i).className).toMatch(/green/);
        expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
    });

    test('validates incorrect email format without @ symbol', () => {
        fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'invalidemail.com' } });
        expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test('validates incorrect email format without domain', () => {
        fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'invalidemail@' } });
        expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test('validates incorrect email format with multiple @ symbols', () => {
        fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'invalid@@email.com' } });
        expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test('validates correct email format with subdomain', () => {
        fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'john.doe@sub.example.com' } });
        expect(screen.queryByText(/Please enter a valid email address/i)).toBeNull();
    });
});

describe('Form Submission with Edge Cases', () => {
    let consoleErrorSpy;
    beforeEach(() => {
        consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        consoleErrorSpy.mockRestore();
    });

    test('calls console error with invalid form due to invalid email', () => {
        fillOutForm({ email: 'invalidemail' });
        fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
        expect(consoleErrorSpy).toHaveBeenLastCalledWith('Form is invalid');
    });

    test('calls console error with invalid form due to password missing criteria', () => {
        fillOutForm({ password: 'short' });
        fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
        expect(consoleErrorSpy).toHaveBeenLastCalledWith('Form is invalid');
    });
});
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
      fireEvent.change(password, { target: { value: 'LongEnough1' } });
describe('Password and Email Validation Edge Cases', () => {
    test('validates password without uppercase correctly', () => {
        const password = screen.getByLabelText(LABELS.password);
        fireEvent.change(password, { target: { value: 'longenough1' } });
        expect(screen.getByText(/1 uppercase character/i).className).toMatch(/red/);
        expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 number/i).className).toMatch(/green/);
        expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('validates password without lowercase correctly', () => {
        const password = screen.getByLabelText(LABELS.password);
        fireEvent.change(password, { target: { value: 'LONGENOUGH1' } });
        expect(screen.getByText(/1 uppercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 lowercase character/i).className).toMatch(/red/);
        expect(screen.getByText(/1 number/i).className).toMatch(/green/);
        expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('validates password without number correctly', () => {
        const password = screen.getByLabelText(LABELS.password);
        fireEvent.change(password, { target: { value: 'LongEnough' } });
        expect(screen.getByText(/1 uppercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 number/i).className).toMatch(/red/);
        expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('validates password that is not long enough correctly', () => {
        const password = screen.getByLabelText(LABELS.password);
        fireEvent.change(password, { target: { value: 'L1a' } });
        expect(screen.getByText(/1 uppercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 number/i).className).toMatch(/green/);
        expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
    });

    test('validates incorrect email format without @ symbol', () => {
        fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'invalidemail.com' } });
        expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test('validates incorrect email format without domain', () => {
        fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'invalidemail@' } });
        expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test('validates incorrect email format with multiple @ symbols', () => {
        fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'invalid@@email.com' } });
        expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test('validates correct email format with subdomain', () => {
        fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'john.doe@sub.example.com' } });
        expect(screen.queryByText(/Please enter a valid email address/i)).toBeNull();
    });
});

describe('Form Submission with Edge Cases', () => {
    let consoleErrorSpy;
    beforeEach(() => {
        consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        consoleErrorSpy.mockRestore();
    });

    test('calls console error with invalid form due to invalid email', () => {
        fillOutForm({ email: 'invalidemail' });
        fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
        expect(consoleErrorSpy).toHaveBeenLastCalledWith('Form is invalid');
    });

    test('calls console error with invalid form due to password missing criteria', () => {
        fillOutForm({ password: 'short' });
        fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
        expect(consoleErrorSpy).toHaveBeenLastCalledWith('Form is invalid');
    });
});
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(/green/);
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
      expect(screen.getByText(/1 number/i).className).toMatch(/green/);
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });
describe('Password and Email Validation Edge Cases', () => {
    test('validates password without uppercase correctly', () => {
        const password = screen.getByLabelText(LABELS.password);
        fireEvent.change(password, { target: { value: 'longenough1' } });
        expect(screen.getByText(/1 uppercase character/i).className).toMatch(/red/);
        expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 number/i).className).toMatch(/green/);
        expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('validates password without lowercase correctly', () => {
        const password = screen.getByLabelText(LABELS.password);
        fireEvent.change(password, { target: { value: 'LONGENOUGH1' } });
        expect(screen.getByText(/1 uppercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 lowercase character/i).className).toMatch(/red/);
        expect(screen.getByText(/1 number/i).className).toMatch(/green/);
        expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('validates password without number correctly', () => {
        const password = screen.getByLabelText(LABELS.password);
        fireEvent.change(password, { target: { value: 'LongEnough' } });
        expect(screen.getByText(/1 uppercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 number/i).className).toMatch(/red/);
        expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('validates password that is not long enough correctly', () => {
        const password = screen.getByLabelText(LABELS.password);
        fireEvent.change(password, { target: { value: 'L1a' } });
        expect(screen.getByText(/1 uppercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 number/i).className).toMatch(/green/);
        expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
    });

    test('validates incorrect email format without @ symbol', () => {
        fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'invalidemail.com' } });
        expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test('validates incorrect email format without domain', () => {
        fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'invalidemail@' } });
        expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test('validates incorrect email format with multiple @ symbols', () => {
        fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'invalid@@email.com' } });
        expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test('validates correct email format with subdomain', () => {
        fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'john.doe@sub.example.com' } });
        expect(screen.queryByText(/Please enter a valid email address/i)).toBeNull();
    });
});

describe('Form Submission with Edge Cases', () => {
    let consoleErrorSpy;
    beforeEach(() => {
        consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        consoleErrorSpy.mockRestore();
    });

    test('calls console error with invalid form due to invalid email', () => {
        fillOutForm({ email: 'invalidemail' });
        fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
        expect(consoleErrorSpy).toHaveBeenLastCalledWith('Form is invalid');
    });

    test('calls console error with invalid form due to password missing criteria', () => {
        fillOutForm({ password: 'short' });
        fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
        expect(consoleErrorSpy).toHaveBeenLastCalledWith('Form is invalid');
    });
});
  });
describe('Password and Email Validation Edge Cases', () => {
    test('validates password without uppercase correctly', () => {
        const password = screen.getByLabelText(LABELS.password);
        fireEvent.change(password, { target: { value: 'longenough1' } });
        expect(screen.getByText(/1 uppercase character/i).className).toMatch(/red/);
        expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 number/i).className).toMatch(/green/);
        expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('validates password without lowercase correctly', () => {
        const password = screen.getByLabelText(LABELS.password);
        fireEvent.change(password, { target: { value: 'LONGENOUGH1' } });
        expect(screen.getByText(/1 uppercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 lowercase character/i).className).toMatch(/red/);
        expect(screen.getByText(/1 number/i).className).toMatch(/green/);
        expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('validates password without number correctly', () => {
        const password = screen.getByLabelText(LABELS.password);
        fireEvent.change(password, { target: { value: 'LongEnough' } });
        expect(screen.getByText(/1 uppercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 number/i).className).toMatch(/red/);
        expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('validates password that is not long enough correctly', () => {
        const password = screen.getByLabelText(LABELS.password);
        fireEvent.change(password, { target: { value: 'L1a' } });
        expect(screen.getByText(/1 uppercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 number/i).className).toMatch(/green/);
        expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
    });

    test('validates incorrect email format without @ symbol', () => {
        fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'invalidemail.com' } });
        expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test('validates incorrect email format without domain', () => {
        fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'invalidemail@' } });
        expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test('validates incorrect email format with multiple @ symbols', () => {
        fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'invalid@@email.com' } });
        expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test('validates correct email format with subdomain', () => {
        fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'john.doe@sub.example.com' } });
        expect(screen.queryByText(/Please enter a valid email address/i)).toBeNull();
    });
});

describe('Form Submission with Edge Cases', () => {
    let consoleErrorSpy;
    beforeEach(() => {
        consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        consoleErrorSpy.mockRestore();
    });

    test('calls console error with invalid form due to invalid email', () => {
        fillOutForm({ email: 'invalidemail' });
        fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
        expect(consoleErrorSpy).toHaveBeenLastCalledWith('Form is invalid');
    });

    test('calls console error with invalid form due to password missing criteria', () => {
        fillOutForm({ password: 'short' });
        fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
        expect(consoleErrorSpy).toHaveBeenLastCalledWith('Form is invalid');
    });
});

  describe('Form Submission', () => {
    let consoleSpy;

    beforeEach(() => {
      consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
describe('Password and Email Validation Edge Cases', () => {
    test('validates password without uppercase correctly', () => {
        const password = screen.getByLabelText(LABELS.password);
        fireEvent.change(password, { target: { value: 'longenough1' } });
        expect(screen.getByText(/1 uppercase character/i).className).toMatch(/red/);
        expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 number/i).className).toMatch(/green/);
        expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('validates password without lowercase correctly', () => {
        const password = screen.getByLabelText(LABELS.password);
        fireEvent.change(password, { target: { value: 'LONGENOUGH1' } });
        expect(screen.getByText(/1 uppercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 lowercase character/i).className).toMatch(/red/);
        expect(screen.getByText(/1 number/i).className).toMatch(/green/);
        expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('validates password without number correctly', () => {
        const password = screen.getByLabelText(LABELS.password);
        fireEvent.change(password, { target: { value: 'LongEnough' } });
        expect(screen.getByText(/1 uppercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 number/i).className).toMatch(/red/);
        expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('validates password that is not long enough correctly', () => {
        const password = screen.getByLabelText(LABELS.password);
        fireEvent.change(password, { target: { value: 'L1a' } });
        expect(screen.getByText(/1 uppercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 number/i).className).toMatch(/green/);
        expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
    });

    test('validates incorrect email format without @ symbol', () => {
        fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'invalidemail.com' } });
        expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test('validates incorrect email format without domain', () => {
        fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'invalidemail@' } });
        expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test('validates incorrect email format with multiple @ symbols', () => {
        fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'invalid@@email.com' } });
        expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test('validates correct email format with subdomain', () => {
        fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'john.doe@sub.example.com' } });
        expect(screen.queryByText(/Please enter a valid email address/i)).toBeNull();
    });
});

describe('Form Submission with Edge Cases', () => {
    let consoleErrorSpy;
    beforeEach(() => {
        consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        consoleErrorSpy.mockRestore();
    });

    test('calls console error with invalid form due to invalid email', () => {
        fillOutForm({ email: 'invalidemail' });
        fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
        expect(consoleErrorSpy).toHaveBeenLastCalledWith('Form is invalid');
    });

    test('calls console error with invalid form due to password missing criteria', () => {
        fillOutForm({ password: 'short' });
        fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
        expect(consoleErrorSpy).toHaveBeenLastCalledWith('Form is invalid');
    });
});
    });
describe('Password and Email Validation Edge Cases', () => {
    test('validates password without uppercase correctly', () => {
        const password = screen.getByLabelText(LABELS.password);
        fireEvent.change(password, { target: { value: 'longenough1' } });
        expect(screen.getByText(/1 uppercase character/i).className).toMatch(/red/);
        expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 number/i).className).toMatch(/green/);
        expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('validates password without lowercase correctly', () => {
        const password = screen.getByLabelText(LABELS.password);
        fireEvent.change(password, { target: { value: 'LONGENOUGH1' } });
        expect(screen.getByText(/1 uppercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 lowercase character/i).className).toMatch(/red/);
        expect(screen.getByText(/1 number/i).className).toMatch(/green/);
        expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('validates password without number correctly', () => {
        const password = screen.getByLabelText(LABELS.password);
        fireEvent.change(password, { target: { value: 'LongEnough' } });
        expect(screen.getByText(/1 uppercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 number/i).className).toMatch(/red/);
        expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('validates password that is not long enough correctly', () => {
        const password = screen.getByLabelText(LABELS.password);
        fireEvent.change(password, { target: { value: 'L1a' } });
        expect(screen.getByText(/1 uppercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 number/i).className).toMatch(/green/);
        expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
    });

    test('validates incorrect email format without @ symbol', () => {
        fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'invalidemail.com' } });
        expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test('validates incorrect email format without domain', () => {
        fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'invalidemail@' } });
        expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test('validates incorrect email format with multiple @ symbols', () => {
        fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'invalid@@email.com' } });
        expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test('validates correct email format with subdomain', () => {
        fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'john.doe@sub.example.com' } });
        expect(screen.queryByText(/Please enter a valid email address/i)).toBeNull();
    });
});

describe('Form Submission with Edge Cases', () => {
    let consoleErrorSpy;
    beforeEach(() => {
        consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        consoleErrorSpy.mockRestore();
    });

    test('calls console error with invalid form due to invalid email', () => {
        fillOutForm({ email: 'invalidemail' });
        fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
        expect(consoleErrorSpy).toHaveBeenLastCalledWith('Form is invalid');
    });

    test('calls console error with invalid form due to password missing criteria', () => {
        fillOutForm({ password: 'short' });
        fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
        expect(consoleErrorSpy).toHaveBeenLastCalledWith('Form is invalid');
    });
});

    afterEach(() => {
      consoleSpy.mockRestore();
    });
describe('Password and Email Validation Edge Cases', () => {
    test('validates password without uppercase correctly', () => {
        const password = screen.getByLabelText(LABELS.password);
        fireEvent.change(password, { target: { value: 'longenough1' } });
        expect(screen.getByText(/1 uppercase character/i).className).toMatch(/red/);
        expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 number/i).className).toMatch(/green/);
        expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('validates password without lowercase correctly', () => {
        const password = screen.getByLabelText(LABELS.password);
        fireEvent.change(password, { target: { value: 'LONGENOUGH1' } });
        expect(screen.getByText(/1 uppercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 lowercase character/i).className).toMatch(/red/);
        expect(screen.getByText(/1 number/i).className).toMatch(/green/);
        expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('validates password without number correctly', () => {
        const password = screen.getByLabelText(LABELS.password);
        fireEvent.change(password, { target: { value: 'LongEnough' } });
        expect(screen.getByText(/1 uppercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 number/i).className).toMatch(/red/);
        expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('validates password that is not long enough correctly', () => {
        const password = screen.getByLabelText(LABELS.password);
        fireEvent.change(password, { target: { value: 'L1a' } });
        expect(screen.getByText(/1 uppercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 number/i).className).toMatch(/green/);
        expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
    });

    test('validates incorrect email format without @ symbol', () => {
        fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'invalidemail.com' } });
        expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test('validates incorrect email format without domain', () => {
        fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'invalidemail@' } });
        expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test('validates incorrect email format with multiple @ symbols', () => {
        fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'invalid@@email.com' } });
        expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test('validates correct email format with subdomain', () => {
        fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'john.doe@sub.example.com' } });
        expect(screen.queryByText(/Please enter a valid email address/i)).toBeNull();
    });
});

describe('Form Submission with Edge Cases', () => {
    let consoleErrorSpy;
    beforeEach(() => {
        consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        consoleErrorSpy.mockRestore();
    });

    test('calls console error with invalid form due to invalid email', () => {
        fillOutForm({ email: 'invalidemail' });
        fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
        expect(consoleErrorSpy).toHaveBeenLastCalledWith('Form is invalid');
    });

    test('calls console error with invalid form due to password missing criteria', () => {
        fillOutForm({ password: 'short' });
        fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
        expect(consoleErrorSpy).toHaveBeenLastCalledWith('Form is invalid');
    });
});

    test('enables Create Account button with valid form', () => {
      fillOutForm();
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).not.toBeDisabled();
    });
describe('Password and Email Validation Edge Cases', () => {
    test('validates password without uppercase correctly', () => {
        const password = screen.getByLabelText(LABELS.password);
        fireEvent.change(password, { target: { value: 'longenough1' } });
        expect(screen.getByText(/1 uppercase character/i).className).toMatch(/red/);
        expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 number/i).className).toMatch(/green/);
        expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('validates password without lowercase correctly', () => {
        const password = screen.getByLabelText(LABELS.password);
        fireEvent.change(password, { target: { value: 'LONGENOUGH1' } });
        expect(screen.getByText(/1 uppercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 lowercase character/i).className).toMatch(/red/);
        expect(screen.getByText(/1 number/i).className).toMatch(/green/);
        expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('validates password without number correctly', () => {
        const password = screen.getByLabelText(LABELS.password);
        fireEvent.change(password, { target: { value: 'LongEnough' } });
        expect(screen.getByText(/1 uppercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 number/i).className).toMatch(/red/);
        expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('validates password that is not long enough correctly', () => {
        const password = screen.getByLabelText(LABELS.password);
        fireEvent.change(password, { target: { value: 'L1a' } });
        expect(screen.getByText(/1 uppercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 number/i).className).toMatch(/green/);
        expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
    });

    test('validates incorrect email format without @ symbol', () => {
        fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'invalidemail.com' } });
        expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test('validates incorrect email format without domain', () => {
        fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'invalidemail@' } });
        expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test('validates incorrect email format with multiple @ symbols', () => {
        fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'invalid@@email.com' } });
        expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test('validates correct email format with subdomain', () => {
        fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'john.doe@sub.example.com' } });
        expect(screen.queryByText(/Please enter a valid email address/i)).toBeNull();
    });
});

describe('Form Submission with Edge Cases', () => {
    let consoleErrorSpy;
    beforeEach(() => {
        consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        consoleErrorSpy.mockRestore();
    });

    test('calls console error with invalid form due to invalid email', () => {
        fillOutForm({ email: 'invalidemail' });
        fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
        expect(consoleErrorSpy).toHaveBeenLastCalledWith('Form is invalid');
    });

    test('calls console error with invalid form due to password missing criteria', () => {
        fillOutForm({ password: 'short' });
        fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
        expect(consoleErrorSpy).toHaveBeenLastCalledWith('Form is invalid');
    });
});

    test('disables Create Account button with invalid form', () => {
      fillOutForm({ firstName: '' });
describe('Password and Email Validation Edge Cases', () => {
    test('validates password without uppercase correctly', () => {
        const password = screen.getByLabelText(LABELS.password);
        fireEvent.change(password, { target: { value: 'longenough1' } });
        expect(screen.getByText(/1 uppercase character/i).className).toMatch(/red/);
        expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 number/i).className).toMatch(/green/);
        expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('validates password without lowercase correctly', () => {
        const password = screen.getByLabelText(LABELS.password);
        fireEvent.change(password, { target: { value: 'LONGENOUGH1' } });
        expect(screen.getByText(/1 uppercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 lowercase character/i).className).toMatch(/red/);
        expect(screen.getByText(/1 number/i).className).toMatch(/green/);
        expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('validates password without number correctly', () => {
        const password = screen.getByLabelText(LABELS.password);
        fireEvent.change(password, { target: { value: 'LongEnough' } });
        expect(screen.getByText(/1 uppercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 number/i).className).toMatch(/red/);
        expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('validates password that is not long enough correctly', () => {
        const password = screen.getByLabelText(LABELS.password);
        fireEvent.change(password, { target: { value: 'L1a' } });
        expect(screen.getByText(/1 uppercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 number/i).className).toMatch(/green/);
        expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
    });

    test('validates incorrect email format without @ symbol', () => {
        fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'invalidemail.com' } });
        expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test('validates incorrect email format without domain', () => {
        fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'invalidemail@' } });
        expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test('validates incorrect email format with multiple @ symbols', () => {
        fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'invalid@@email.com' } });
        expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test('validates correct email format with subdomain', () => {
        fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'john.doe@sub.example.com' } });
        expect(screen.queryByText(/Please enter a valid email address/i)).toBeNull();
    });
});

describe('Form Submission with Edge Cases', () => {
    let consoleErrorSpy;
    beforeEach(() => {
        consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        consoleErrorSpy.mockRestore();
    });

    test('calls console error with invalid form due to invalid email', () => {
        fillOutForm({ email: 'invalidemail' });
        fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
        expect(consoleErrorSpy).toHaveBeenLastCalledWith('Form is invalid');
    });

    test('calls console error with invalid form due to password missing criteria', () => {
        fillOutForm({ password: 'short' });
        fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
        expect(consoleErrorSpy).toHaveBeenLastCalledWith('Form is invalid');
    });
}); // Explicitly set an invalid field
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });
describe('Password and Email Validation Edge Cases', () => {
    test('validates password without uppercase correctly', () => {
        const password = screen.getByLabelText(LABELS.password);
        fireEvent.change(password, { target: { value: 'longenough1' } });
        expect(screen.getByText(/1 uppercase character/i).className).toMatch(/red/);
        expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 number/i).className).toMatch(/green/);
        expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('validates password without lowercase correctly', () => {
        const password = screen.getByLabelText(LABELS.password);
        fireEvent.change(password, { target: { value: 'LONGENOUGH1' } });
        expect(screen.getByText(/1 uppercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 lowercase character/i).className).toMatch(/red/);
        expect(screen.getByText(/1 number/i).className).toMatch(/green/);
        expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('validates password without number correctly', () => {
        const password = screen.getByLabelText(LABELS.password);
        fireEvent.change(password, { target: { value: 'LongEnough' } });
        expect(screen.getByText(/1 uppercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 number/i).className).toMatch(/red/);
        expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('validates password that is not long enough correctly', () => {
        const password = screen.getByLabelText(LABELS.password);
        fireEvent.change(password, { target: { value: 'L1a' } });
        expect(screen.getByText(/1 uppercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 number/i).className).toMatch(/green/);
        expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
    });

    test('validates incorrect email format without @ symbol', () => {
        fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'invalidemail.com' } });
        expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test('validates incorrect email format without domain', () => {
        fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'invalidemail@' } });
        expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test('validates incorrect email format with multiple @ symbols', () => {
        fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'invalid@@email.com' } });
        expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test('validates correct email format with subdomain', () => {
        fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'john.doe@sub.example.com' } });
        expect(screen.queryByText(/Please enter a valid email address/i)).toBeNull();
    });
});

describe('Form Submission with Edge Cases', () => {
    let consoleErrorSpy;
    beforeEach(() => {
        consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        consoleErrorSpy.mockRestore();
    });

    test('calls console error with invalid form due to invalid email', () => {
        fillOutForm({ email: 'invalidemail' });
        fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
        expect(consoleErrorSpy).toHaveBeenLastCalledWith('Form is invalid');
    });

    test('calls console error with invalid form due to password missing criteria', () => {
        fillOutForm({ password: 'short' });
        fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
        expect(consoleErrorSpy).toHaveBeenLastCalledWith('Form is invalid');
    });
});

    test('calls console log with correct data on valid form submission', () => {
      const formData = fillOutForm();
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(consoleSpy).toHaveBeenLastCalledWith('Form submitted:', formData);
    });
describe('Password and Email Validation Edge Cases', () => {
    test('validates password without uppercase correctly', () => {
        const password = screen.getByLabelText(LABELS.password);
        fireEvent.change(password, { target: { value: 'longenough1' } });
        expect(screen.getByText(/1 uppercase character/i).className).toMatch(/red/);
        expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 number/i).className).toMatch(/green/);
        expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('validates password without lowercase correctly', () => {
        const password = screen.getByLabelText(LABELS.password);
        fireEvent.change(password, { target: { value: 'LONGENOUGH1' } });
        expect(screen.getByText(/1 uppercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 lowercase character/i).className).toMatch(/red/);
        expect(screen.getByText(/1 number/i).className).toMatch(/green/);
        expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('validates password without number correctly', () => {
        const password = screen.getByLabelText(LABELS.password);
        fireEvent.change(password, { target: { value: 'LongEnough' } });
        expect(screen.getByText(/1 uppercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 number/i).className).toMatch(/red/);
        expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('validates password that is not long enough correctly', () => {
        const password = screen.getByLabelText(LABELS.password);
        fireEvent.change(password, { target: { value: 'L1a' } });
        expect(screen.getByText(/1 uppercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 number/i).className).toMatch(/green/);
        expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
    });

    test('validates incorrect email format without @ symbol', () => {
        fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'invalidemail.com' } });
        expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test('validates incorrect email format without domain', () => {
        fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'invalidemail@' } });
        expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test('validates incorrect email format with multiple @ symbols', () => {
        fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'invalid@@email.com' } });
        expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test('validates correct email format with subdomain', () => {
        fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'john.doe@sub.example.com' } });
        expect(screen.queryByText(/Please enter a valid email address/i)).toBeNull();
    });
});

describe('Form Submission with Edge Cases', () => {
    let consoleErrorSpy;
    beforeEach(() => {
        consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        consoleErrorSpy.mockRestore();
    });

    test('calls console error with invalid form due to invalid email', () => {
        fillOutForm({ email: 'invalidemail' });
        fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
        expect(consoleErrorSpy).toHaveBeenLastCalledWith('Form is invalid');
    });

    test('calls console error with invalid form due to password missing criteria', () => {
        fillOutForm({ password: 'short' });
        fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
        expect(consoleErrorSpy).toHaveBeenLastCalledWith('Form is invalid');
    });
});
  });
describe('Password and Email Validation Edge Cases', () => {
    test('validates password without uppercase correctly', () => {
        const password = screen.getByLabelText(LABELS.password);
        fireEvent.change(password, { target: { value: 'longenough1' } });
        expect(screen.getByText(/1 uppercase character/i).className).toMatch(/red/);
        expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 number/i).className).toMatch(/green/);
        expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('validates password without lowercase correctly', () => {
        const password = screen.getByLabelText(LABELS.password);
        fireEvent.change(password, { target: { value: 'LONGENOUGH1' } });
        expect(screen.getByText(/1 uppercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 lowercase character/i).className).toMatch(/red/);
        expect(screen.getByText(/1 number/i).className).toMatch(/green/);
        expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('validates password without number correctly', () => {
        const password = screen.getByLabelText(LABELS.password);
        fireEvent.change(password, { target: { value: 'LongEnough' } });
        expect(screen.getByText(/1 uppercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 number/i).className).toMatch(/red/);
        expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('validates password that is not long enough correctly', () => {
        const password = screen.getByLabelText(LABELS.password);
        fireEvent.change(password, { target: { value: 'L1a' } });
        expect(screen.getByText(/1 uppercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 number/i).className).toMatch(/green/);
        expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
    });

    test('validates incorrect email format without @ symbol', () => {
        fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'invalidemail.com' } });
        expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test('validates incorrect email format without domain', () => {
        fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'invalidemail@' } });
        expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test('validates incorrect email format with multiple @ symbols', () => {
        fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'invalid@@email.com' } });
        expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test('validates correct email format with subdomain', () => {
        fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'john.doe@sub.example.com' } });
        expect(screen.queryByText(/Please enter a valid email address/i)).toBeNull();
    });
});

describe('Form Submission with Edge Cases', () => {
    let consoleErrorSpy;
    beforeEach(() => {
        consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        consoleErrorSpy.mockRestore();
    });

    test('calls console error with invalid form due to invalid email', () => {
        fillOutForm({ email: 'invalidemail' });
        fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
        expect(consoleErrorSpy).toHaveBeenLastCalledWith('Form is invalid');
    });

    test('calls console error with invalid form due to password missing criteria', () => {
        fillOutForm({ password: 'short' });
        fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
        expect(consoleErrorSpy).toHaveBeenLastCalledWith('Form is invalid');
    });
});
});
describe('Password and Email Validation Edge Cases', () => {
    test('validates password without uppercase correctly', () => {
        const password = screen.getByLabelText(LABELS.password);
        fireEvent.change(password, { target: { value: 'longenough1' } });
        expect(screen.getByText(/1 uppercase character/i).className).toMatch(/red/);
        expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 number/i).className).toMatch(/green/);
        expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('validates password without lowercase correctly', () => {
        const password = screen.getByLabelText(LABELS.password);
        fireEvent.change(password, { target: { value: 'LONGENOUGH1' } });
        expect(screen.getByText(/1 uppercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 lowercase character/i).className).toMatch(/red/);
        expect(screen.getByText(/1 number/i).className).toMatch(/green/);
        expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('validates password without number correctly', () => {
        const password = screen.getByLabelText(LABELS.password);
        fireEvent.change(password, { target: { value: 'LongEnough' } });
        expect(screen.getByText(/1 uppercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 number/i).className).toMatch(/red/);
        expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

    test('validates password that is not long enough correctly', () => {
        const password = screen.getByLabelText(LABELS.password);
        fireEvent.change(password, { target: { value: 'L1a' } });
        expect(screen.getByText(/1 uppercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
        expect(screen.getByText(/1 number/i).className).toMatch(/green/);
        expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
    });

    test('validates incorrect email format without @ symbol', () => {
        fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'invalidemail.com' } });
        expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test('validates incorrect email format without domain', () => {
        fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'invalidemail@' } });
        expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test('validates incorrect email format with multiple @ symbols', () => {
        fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'invalid@@email.com' } });
        expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test('validates correct email format with subdomain', () => {
        fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'john.doe@sub.example.com' } });
        expect(screen.queryByText(/Please enter a valid email address/i)).toBeNull();
    });
});

describe('Form Submission with Edge Cases', () => {
    let consoleErrorSpy;
    beforeEach(() => {
        consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        consoleErrorSpy.mockRestore();
    });

    test('calls console error with invalid form due to invalid email', () => {
        fillOutForm({ email: 'invalidemail' });
        fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
        expect(consoleErrorSpy).toHaveBeenLastCalledWith('Form is invalid');
    });

    test('calls console error with invalid form due to password missing criteria', () => {
        fillOutForm({ password: 'short' });
        fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
        expect(consoleErrorSpy).toHaveBeenLastCalledWith('Form is invalid');
    });
});
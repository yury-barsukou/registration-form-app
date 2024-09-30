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

// Additional tests to improve the coverage
describe('Form Validation - Negative Cases', () => {
  test('does not enable Create Account button when email is invalid', () => {
    fillOutForm({ email: 'invalidemail' });
    expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
  });

  test.each([
    { password: 'lowercaseonly', message: '1 uppercase character' },
    { password: 'UPPERCASEONLY', message: '1 lowercase character' },
    { password: 'NoDigitsHere', message: '1 number' },
    { password: 'Shrt1', message: 'Minimum 8 characters' },
  ])('disables Create Account button with invalid password: %s', ({ password, message }) => {
    fillOutForm({ password });
    expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    expect(screen.getByText(new RegExp(message, 'i')).className).toMatch(/red/);
  });

  test('displays all password criteria in red with an empty password', () => {
    fillOutForm({ password: '' });
    const criteria = ['1 uppercase character', '1 lowercase character', '1 number', 'Minimum 8 characters'];
    criteria.forEach(criterion => {
      expect(screen.getByText(new RegExp(criterion, 'i')).className).toMatch(/red/);
    });
  });

  test('displays error when trying to submit an invalid form', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    fillOutForm({ email: 'invalid', password: '123' });
    fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
    expect(console.error).toHaveBeenCalledWith('Form is invalid');
    console.error.mockRestore();
  });
});

describe('Integration with complex components - Mocking', () => {
  // Assuming there could be complex components or external services integrated in the future
  test('handles form submission with mocked API call', async () => {
    // Mocking an API call for form submission
    const mockApiCall = jest.fn().mockResolvedValue({ success: true });
    jest.mock('../api/user', () => ({
      createUser: mockApiCall,
    }));

    fillOutForm();
    fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
    await waitFor(() => {
      expect(mockApiCall).toHaveBeenCalledWith({
        firstName: 'John',
        lastName: 'Doe',
        email: VALID_EMAIL,
        password: VALID_PASSWORD,
      });
    });
  });
});

describe('Accessibility Checks', () => {
  test('ensures form elements have proper accessible names', () => {
    expect(screen.getByLabelText(LABELS.firstName)).toHaveAccessibleName('First Name');
    expect(screen.getByLabelText(LABELS.lastName)).toHaveAccessibleName('Last Name');
    expect(screen.getByLabelText(LABELS.email)).toHaveAccessibleName('Email');
    expect(screen.getByLabelText(LABELS.password)).toHaveAccessibleName('Password');
    expect(screen.getByRole('button', { name: BUTTON_TEXT })).toHaveAccessibleName('Create Account');
  });
});
  fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: formData.lastName } });

// Additional tests to improve the coverage
describe('Form Validation - Negative Cases', () => {
  test('does not enable Create Account button when email is invalid', () => {
    fillOutForm({ email: 'invalidemail' });
    expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
  });

  test.each([
    { password: 'lowercaseonly', message: '1 uppercase character' },
    { password: 'UPPERCASEONLY', message: '1 lowercase character' },
    { password: 'NoDigitsHere', message: '1 number' },
    { password: 'Shrt1', message: 'Minimum 8 characters' },
  ])('disables Create Account button with invalid password: %s', ({ password, message }) => {
    fillOutForm({ password });
    expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    expect(screen.getByText(new RegExp(message, 'i')).className).toMatch(/red/);
  });

  test('displays all password criteria in red with an empty password', () => {
    fillOutForm({ password: '' });
    const criteria = ['1 uppercase character', '1 lowercase character', '1 number', 'Minimum 8 characters'];
    criteria.forEach(criterion => {
      expect(screen.getByText(new RegExp(criterion, 'i')).className).toMatch(/red/);
    });
  });

  test('displays error when trying to submit an invalid form', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    fillOutForm({ email: 'invalid', password: '123' });
    fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
    expect(console.error).toHaveBeenCalledWith('Form is invalid');
    console.error.mockRestore();
  });
});

describe('Integration with complex components - Mocking', () => {
  // Assuming there could be complex components or external services integrated in the future
  test('handles form submission with mocked API call', async () => {
    // Mocking an API call for form submission
    const mockApiCall = jest.fn().mockResolvedValue({ success: true });
    jest.mock('../api/user', () => ({
      createUser: mockApiCall,
    }));

    fillOutForm();
    fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
    await waitFor(() => {
      expect(mockApiCall).toHaveBeenCalledWith({
        firstName: 'John',
        lastName: 'Doe',
        email: VALID_EMAIL,
        password: VALID_PASSWORD,
      });
    });
  });
});

describe('Accessibility Checks', () => {
  test('ensures form elements have proper accessible names', () => {
    expect(screen.getByLabelText(LABELS.firstName)).toHaveAccessibleName('First Name');
    expect(screen.getByLabelText(LABELS.lastName)).toHaveAccessibleName('Last Name');
    expect(screen.getByLabelText(LABELS.email)).toHaveAccessibleName('Email');
    expect(screen.getByLabelText(LABELS.password)).toHaveAccessibleName('Password');
    expect(screen.getByRole('button', { name: BUTTON_TEXT })).toHaveAccessibleName('Create Account');
  });
});
  fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: formData.email } });

// Additional tests to improve the coverage
describe('Form Validation - Negative Cases', () => {
  test('does not enable Create Account button when email is invalid', () => {
    fillOutForm({ email: 'invalidemail' });
    expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
  });

  test.each([
    { password: 'lowercaseonly', message: '1 uppercase character' },
    { password: 'UPPERCASEONLY', message: '1 lowercase character' },
    { password: 'NoDigitsHere', message: '1 number' },
    { password: 'Shrt1', message: 'Minimum 8 characters' },
  ])('disables Create Account button with invalid password: %s', ({ password, message }) => {
    fillOutForm({ password });
    expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    expect(screen.getByText(new RegExp(message, 'i')).className).toMatch(/red/);
  });

  test('displays all password criteria in red with an empty password', () => {
    fillOutForm({ password: '' });
    const criteria = ['1 uppercase character', '1 lowercase character', '1 number', 'Minimum 8 characters'];
    criteria.forEach(criterion => {
      expect(screen.getByText(new RegExp(criterion, 'i')).className).toMatch(/red/);
    });
  });

  test('displays error when trying to submit an invalid form', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    fillOutForm({ email: 'invalid', password: '123' });
    fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
    expect(console.error).toHaveBeenCalledWith('Form is invalid');
    console.error.mockRestore();
  });
});

describe('Integration with complex components - Mocking', () => {
  // Assuming there could be complex components or external services integrated in the future
  test('handles form submission with mocked API call', async () => {
    // Mocking an API call for form submission
    const mockApiCall = jest.fn().mockResolvedValue({ success: true });
    jest.mock('../api/user', () => ({
      createUser: mockApiCall,
    }));

    fillOutForm();
    fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
    await waitFor(() => {
      expect(mockApiCall).toHaveBeenCalledWith({
        firstName: 'John',
        lastName: 'Doe',
        email: VALID_EMAIL,
        password: VALID_PASSWORD,
      });
    });
  });
});

describe('Accessibility Checks', () => {
  test('ensures form elements have proper accessible names', () => {
    expect(screen.getByLabelText(LABELS.firstName)).toHaveAccessibleName('First Name');
    expect(screen.getByLabelText(LABELS.lastName)).toHaveAccessibleName('Last Name');
    expect(screen.getByLabelText(LABELS.email)).toHaveAccessibleName('Email');
    expect(screen.getByLabelText(LABELS.password)).toHaveAccessibleName('Password');
    expect(screen.getByRole('button', { name: BUTTON_TEXT })).toHaveAccessibleName('Create Account');
  });
});
  fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: formData.password } });

// Additional tests to improve the coverage
describe('Form Validation - Negative Cases', () => {
  test('does not enable Create Account button when email is invalid', () => {
    fillOutForm({ email: 'invalidemail' });
    expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
  });

  test.each([
    { password: 'lowercaseonly', message: '1 uppercase character' },
    { password: 'UPPERCASEONLY', message: '1 lowercase character' },
    { password: 'NoDigitsHere', message: '1 number' },
    { password: 'Shrt1', message: 'Minimum 8 characters' },
  ])('disables Create Account button with invalid password: %s', ({ password, message }) => {
    fillOutForm({ password });
    expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    expect(screen.getByText(new RegExp(message, 'i')).className).toMatch(/red/);
  });

  test('displays all password criteria in red with an empty password', () => {
    fillOutForm({ password: '' });
    const criteria = ['1 uppercase character', '1 lowercase character', '1 number', 'Minimum 8 characters'];
    criteria.forEach(criterion => {
      expect(screen.getByText(new RegExp(criterion, 'i')).className).toMatch(/red/);
    });
  });

  test('displays error when trying to submit an invalid form', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    fillOutForm({ email: 'invalid', password: '123' });
    fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
    expect(console.error).toHaveBeenCalledWith('Form is invalid');
    console.error.mockRestore();
  });
});

describe('Integration with complex components - Mocking', () => {
  // Assuming there could be complex components or external services integrated in the future
  test('handles form submission with mocked API call', async () => {
    // Mocking an API call for form submission
    const mockApiCall = jest.fn().mockResolvedValue({ success: true });
    jest.mock('../api/user', () => ({
      createUser: mockApiCall,
    }));

    fillOutForm();
    fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
    await waitFor(() => {
      expect(mockApiCall).toHaveBeenCalledWith({
        firstName: 'John',
        lastName: 'Doe',
        email: VALID_EMAIL,
        password: VALID_PASSWORD,
      });
    });
  });
});

describe('Accessibility Checks', () => {
  test('ensures form elements have proper accessible names', () => {
    expect(screen.getByLabelText(LABELS.firstName)).toHaveAccessibleName('First Name');
    expect(screen.getByLabelText(LABELS.lastName)).toHaveAccessibleName('Last Name');
    expect(screen.getByLabelText(LABELS.email)).toHaveAccessibleName('Email');
    expect(screen.getByLabelText(LABELS.password)).toHaveAccessibleName('Password');
    expect(screen.getByRole('button', { name: BUTTON_TEXT })).toHaveAccessibleName('Create Account');
  });
});

  return formData;
};

describe('SignUpForm', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

// Additional tests to improve the coverage
describe('Form Validation - Negative Cases', () => {
  test('does not enable Create Account button when email is invalid', () => {
    fillOutForm({ email: 'invalidemail' });
    expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
  });

  test.each([
    { password: 'lowercaseonly', message: '1 uppercase character' },
    { password: 'UPPERCASEONLY', message: '1 lowercase character' },
    { password: 'NoDigitsHere', message: '1 number' },
    { password: 'Shrt1', message: 'Minimum 8 characters' },
  ])('disables Create Account button with invalid password: %s', ({ password, message }) => {
    fillOutForm({ password });
    expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    expect(screen.getByText(new RegExp(message, 'i')).className).toMatch(/red/);
  });

  test('displays all password criteria in red with an empty password', () => {
    fillOutForm({ password: '' });
    const criteria = ['1 uppercase character', '1 lowercase character', '1 number', 'Minimum 8 characters'];
    criteria.forEach(criterion => {
      expect(screen.getByText(new RegExp(criterion, 'i')).className).toMatch(/red/);
    });
  });

  test('displays error when trying to submit an invalid form', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    fillOutForm({ email: 'invalid', password: '123' });
    fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
    expect(console.error).toHaveBeenCalledWith('Form is invalid');
    console.error.mockRestore();
  });
});

describe('Integration with complex components - Mocking', () => {
  // Assuming there could be complex components or external services integrated in the future
  test('handles form submission with mocked API call', async () => {
    // Mocking an API call for form submission
    const mockApiCall = jest.fn().mockResolvedValue({ success: true });
    jest.mock('../api/user', () => ({
      createUser: mockApiCall,
    }));

    fillOutForm();
    fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
    await waitFor(() => {
      expect(mockApiCall).toHaveBeenCalledWith({
        firstName: 'John',
        lastName: 'Doe',
        email: VALID_EMAIL,
        password: VALID_PASSWORD,
      });
    });
  });
});

describe('Accessibility Checks', () => {
  test('ensures form elements have proper accessible names', () => {
    expect(screen.getByLabelText(LABELS.firstName)).toHaveAccessibleName('First Name');
    expect(screen.getByLabelText(LABELS.lastName)).toHaveAccessibleName('Last Name');
    expect(screen.getByLabelText(LABELS.email)).toHaveAccessibleName('Email');
    expect(screen.getByLabelText(LABELS.password)).toHaveAccessibleName('Password');
    expect(screen.getByRole('button', { name: BUTTON_TEXT })).toHaveAccessibleName('Create Account');
  });
});

  test('renders the sign-up form with all fields', () => {
    expect(screen.getByLabelText(LABELS.firstName)).toBeInTheDocument();
    expect(screen.getByLabelText(LABELS.lastName)).toBeInTheDocument();
    expect(screen.getByLabelText(LABELS.email)).toBeInTheDocument();
    expect(screen.getByLabelText(LABELS.password)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeInTheDocument();
  });

// Additional tests to improve the coverage
describe('Form Validation - Negative Cases', () => {
  test('does not enable Create Account button when email is invalid', () => {
    fillOutForm({ email: 'invalidemail' });
    expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
  });

  test.each([
    { password: 'lowercaseonly', message: '1 uppercase character' },
    { password: 'UPPERCASEONLY', message: '1 lowercase character' },
    { password: 'NoDigitsHere', message: '1 number' },
    { password: 'Shrt1', message: 'Minimum 8 characters' },
  ])('disables Create Account button with invalid password: %s', ({ password, message }) => {
    fillOutForm({ password });
    expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    expect(screen.getByText(new RegExp(message, 'i')).className).toMatch(/red/);
  });

  test('displays all password criteria in red with an empty password', () => {
    fillOutForm({ password: '' });
    const criteria = ['1 uppercase character', '1 lowercase character', '1 number', 'Minimum 8 characters'];
    criteria.forEach(criterion => {
      expect(screen.getByText(new RegExp(criterion, 'i')).className).toMatch(/red/);
    });
  });

  test('displays error when trying to submit an invalid form', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    fillOutForm({ email: 'invalid', password: '123' });
    fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
    expect(console.error).toHaveBeenCalledWith('Form is invalid');
    console.error.mockRestore();
  });
});

describe('Integration with complex components - Mocking', () => {
  // Assuming there could be complex components or external services integrated in the future
  test('handles form submission with mocked API call', async () => {
    // Mocking an API call for form submission
    const mockApiCall = jest.fn().mockResolvedValue({ success: true });
    jest.mock('../api/user', () => ({
      createUser: mockApiCall,
    }));

    fillOutForm();
    fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
    await waitFor(() => {
      expect(mockApiCall).toHaveBeenCalledWith({
        firstName: 'John',
        lastName: 'Doe',
        email: VALID_EMAIL,
        password: VALID_PASSWORD,
      });
    });
  });
});

describe('Accessibility Checks', () => {
  test('ensures form elements have proper accessible names', () => {
    expect(screen.getByLabelText(LABELS.firstName)).toHaveAccessibleName('First Name');
    expect(screen.getByLabelText(LABELS.lastName)).toHaveAccessibleName('Last Name');
    expect(screen.getByLabelText(LABELS.email)).toHaveAccessibleName('Email');
    expect(screen.getByLabelText(LABELS.password)).toHaveAccessibleName('Password');
    expect(screen.getByRole('button', { name: BUTTON_TEXT })).toHaveAccessibleName('Create Account');
  });
});

  describe('Field Entry', () => {
    test.each(Object.entries(LABELS))('allows entry of %s', (fieldName, labelRegex) => {
      const value = 'TestValue';
      fireEvent.change(screen.getByLabelText(labelRegex), { target: { value } });

// Additional tests to improve the coverage
describe('Form Validation - Negative Cases', () => {
  test('does not enable Create Account button when email is invalid', () => {
    fillOutForm({ email: 'invalidemail' });
    expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
  });

  test.each([
    { password: 'lowercaseonly', message: '1 uppercase character' },
    { password: 'UPPERCASEONLY', message: '1 lowercase character' },
    { password: 'NoDigitsHere', message: '1 number' },
    { password: 'Shrt1', message: 'Minimum 8 characters' },
  ])('disables Create Account button with invalid password: %s', ({ password, message }) => {
    fillOutForm({ password });
    expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    expect(screen.getByText(new RegExp(message, 'i')).className).toMatch(/red/);
  });

  test('displays all password criteria in red with an empty password', () => {
    fillOutForm({ password: '' });
    const criteria = ['1 uppercase character', '1 lowercase character', '1 number', 'Minimum 8 characters'];
    criteria.forEach(criterion => {
      expect(screen.getByText(new RegExp(criterion, 'i')).className).toMatch(/red/);
    });
  });

  test('displays error when trying to submit an invalid form', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    fillOutForm({ email: 'invalid', password: '123' });
    fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
    expect(console.error).toHaveBeenCalledWith('Form is invalid');
    console.error.mockRestore();
  });
});

describe('Integration with complex components - Mocking', () => {
  // Assuming there could be complex components or external services integrated in the future
  test('handles form submission with mocked API call', async () => {
    // Mocking an API call for form submission
    const mockApiCall = jest.fn().mockResolvedValue({ success: true });
    jest.mock('../api/user', () => ({
      createUser: mockApiCall,
    }));

    fillOutForm();
    fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
    await waitFor(() => {
      expect(mockApiCall).toHaveBeenCalledWith({
        firstName: 'John',
        lastName: 'Doe',
        email: VALID_EMAIL,
        password: VALID_PASSWORD,
      });
    });
  });
});

describe('Accessibility Checks', () => {
  test('ensures form elements have proper accessible names', () => {
    expect(screen.getByLabelText(LABELS.firstName)).toHaveAccessibleName('First Name');
    expect(screen.getByLabelText(LABELS.lastName)).toHaveAccessibleName('Last Name');
    expect(screen.getByLabelText(LABELS.email)).toHaveAccessibleName('Email');
    expect(screen.getByLabelText(LABELS.password)).toHaveAccessibleName('Password');
    expect(screen.getByRole('button', { name: BUTTON_TEXT })).toHaveAccessibleName('Create Account');
  });
});
      expect(screen.getByLabelText(labelRegex)).toHaveValue(value);
    });

// Additional tests to improve the coverage
describe('Form Validation - Negative Cases', () => {
  test('does not enable Create Account button when email is invalid', () => {
    fillOutForm({ email: 'invalidemail' });
    expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
  });

  test.each([
    { password: 'lowercaseonly', message: '1 uppercase character' },
    { password: 'UPPERCASEONLY', message: '1 lowercase character' },
    { password: 'NoDigitsHere', message: '1 number' },
    { password: 'Shrt1', message: 'Minimum 8 characters' },
  ])('disables Create Account button with invalid password: %s', ({ password, message }) => {
    fillOutForm({ password });
    expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    expect(screen.getByText(new RegExp(message, 'i')).className).toMatch(/red/);
  });

  test('displays all password criteria in red with an empty password', () => {
    fillOutForm({ password: '' });
    const criteria = ['1 uppercase character', '1 lowercase character', '1 number', 'Minimum 8 characters'];
    criteria.forEach(criterion => {
      expect(screen.getByText(new RegExp(criterion, 'i')).className).toMatch(/red/);
    });
  });

  test('displays error when trying to submit an invalid form', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    fillOutForm({ email: 'invalid', password: '123' });
    fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
    expect(console.error).toHaveBeenCalledWith('Form is invalid');
    console.error.mockRestore();
  });
});

describe('Integration with complex components - Mocking', () => {
  // Assuming there could be complex components or external services integrated in the future
  test('handles form submission with mocked API call', async () => {
    // Mocking an API call for form submission
    const mockApiCall = jest.fn().mockResolvedValue({ success: true });
    jest.mock('../api/user', () => ({
      createUser: mockApiCall,
    }));

    fillOutForm();
    fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
    await waitFor(() => {
      expect(mockApiCall).toHaveBeenCalledWith({
        firstName: 'John',
        lastName: 'Doe',
        email: VALID_EMAIL,
        password: VALID_PASSWORD,
      });
    });
  });
});

describe('Accessibility Checks', () => {
  test('ensures form elements have proper accessible names', () => {
    expect(screen.getByLabelText(LABELS.firstName)).toHaveAccessibleName('First Name');
    expect(screen.getByLabelText(LABELS.lastName)).toHaveAccessibleName('Last Name');
    expect(screen.getByLabelText(LABELS.email)).toHaveAccessibleName('Email');
    expect(screen.getByLabelText(LABELS.password)).toHaveAccessibleName('Password');
    expect(screen.getByRole('button', { name: BUTTON_TEXT })).toHaveAccessibleName('Create Account');
  });
});
  });

// Additional tests to improve the coverage
describe('Form Validation - Negative Cases', () => {
  test('does not enable Create Account button when email is invalid', () => {
    fillOutForm({ email: 'invalidemail' });
    expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
  });

  test.each([
    { password: 'lowercaseonly', message: '1 uppercase character' },
    { password: 'UPPERCASEONLY', message: '1 lowercase character' },
    { password: 'NoDigitsHere', message: '1 number' },
    { password: 'Shrt1', message: 'Minimum 8 characters' },
  ])('disables Create Account button with invalid password: %s', ({ password, message }) => {
    fillOutForm({ password });
    expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    expect(screen.getByText(new RegExp(message, 'i')).className).toMatch(/red/);
  });

  test('displays all password criteria in red with an empty password', () => {
    fillOutForm({ password: '' });
    const criteria = ['1 uppercase character', '1 lowercase character', '1 number', 'Minimum 8 characters'];
    criteria.forEach(criterion => {
      expect(screen.getByText(new RegExp(criterion, 'i')).className).toMatch(/red/);
    });
  });

  test('displays error when trying to submit an invalid form', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    fillOutForm({ email: 'invalid', password: '123' });
    fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
    expect(console.error).toHaveBeenCalledWith('Form is invalid');
    console.error.mockRestore();
  });
});

describe('Integration with complex components - Mocking', () => {
  // Assuming there could be complex components or external services integrated in the future
  test('handles form submission with mocked API call', async () => {
    // Mocking an API call for form submission
    const mockApiCall = jest.fn().mockResolvedValue({ success: true });
    jest.mock('../api/user', () => ({
      createUser: mockApiCall,
    }));

    fillOutForm();
    fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
    await waitFor(() => {
      expect(mockApiCall).toHaveBeenCalledWith({
        firstName: 'John',
        lastName: 'Doe',
        email: VALID_EMAIL,
        password: VALID_PASSWORD,
      });
    });
  });
});

describe('Accessibility Checks', () => {
  test('ensures form elements have proper accessible names', () => {
    expect(screen.getByLabelText(LABELS.firstName)).toHaveAccessibleName('First Name');
    expect(screen.getByLabelText(LABELS.lastName)).toHaveAccessibleName('Last Name');
    expect(screen.getByLabelText(LABELS.email)).toHaveAccessibleName('Email');
    expect(screen.getByLabelText(LABELS.password)).toHaveAccessibleName('Password');
    expect(screen.getByRole('button', { name: BUTTON_TEXT })).toHaveAccessibleName('Create Account');
  });
});

  describe('Form Validation', () => {
    test('validates email format correctly', () => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'invalid' } });

// Additional tests to improve the coverage
describe('Form Validation - Negative Cases', () => {
  test('does not enable Create Account button when email is invalid', () => {
    fillOutForm({ email: 'invalidemail' });
    expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
  });

  test.each([
    { password: 'lowercaseonly', message: '1 uppercase character' },
    { password: 'UPPERCASEONLY', message: '1 lowercase character' },
    { password: 'NoDigitsHere', message: '1 number' },
    { password: 'Shrt1', message: 'Minimum 8 characters' },
  ])('disables Create Account button with invalid password: %s', ({ password, message }) => {
    fillOutForm({ password });
    expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    expect(screen.getByText(new RegExp(message, 'i')).className).toMatch(/red/);
  });

  test('displays all password criteria in red with an empty password', () => {
    fillOutForm({ password: '' });
    const criteria = ['1 uppercase character', '1 lowercase character', '1 number', 'Minimum 8 characters'];
    criteria.forEach(criterion => {
      expect(screen.getByText(new RegExp(criterion, 'i')).className).toMatch(/red/);
    });
  });

  test('displays error when trying to submit an invalid form', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    fillOutForm({ email: 'invalid', password: '123' });
    fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
    expect(console.error).toHaveBeenCalledWith('Form is invalid');
    console.error.mockRestore();
  });
});

describe('Integration with complex components - Mocking', () => {
  // Assuming there could be complex components or external services integrated in the future
  test('handles form submission with mocked API call', async () => {
    // Mocking an API call for form submission
    const mockApiCall = jest.fn().mockResolvedValue({ success: true });
    jest.mock('../api/user', () => ({
      createUser: mockApiCall,
    }));

    fillOutForm();
    fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
    await waitFor(() => {
      expect(mockApiCall).toHaveBeenCalledWith({
        firstName: 'John',
        lastName: 'Doe',
        email: VALID_EMAIL,
        password: VALID_PASSWORD,
      });
    });
  });
});

describe('Accessibility Checks', () => {
  test('ensures form elements have proper accessible names', () => {
    expect(screen.getByLabelText(LABELS.firstName)).toHaveAccessibleName('First Name');
    expect(screen.getByLabelText(LABELS.lastName)).toHaveAccessibleName('Last Name');
    expect(screen.getByLabelText(LABELS.email)).toHaveAccessibleName('Email');
    expect(screen.getByLabelText(LABELS.password)).toHaveAccessibleName('Password');
    expect(screen.getByRole('button', { name: BUTTON_TEXT })).toHaveAccessibleName('Create Account');
  });
});
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: VALID_EMAIL } });

// Additional tests to improve the coverage
describe('Form Validation - Negative Cases', () => {
  test('does not enable Create Account button when email is invalid', () => {
    fillOutForm({ email: 'invalidemail' });
    expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
  });

  test.each([
    { password: 'lowercaseonly', message: '1 uppercase character' },
    { password: 'UPPERCASEONLY', message: '1 lowercase character' },
    { password: 'NoDigitsHere', message: '1 number' },
    { password: 'Shrt1', message: 'Minimum 8 characters' },
  ])('disables Create Account button with invalid password: %s', ({ password, message }) => {
    fillOutForm({ password });
    expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    expect(screen.getByText(new RegExp(message, 'i')).className).toMatch(/red/);
  });

  test('displays all password criteria in red with an empty password', () => {
    fillOutForm({ password: '' });
    const criteria = ['1 uppercase character', '1 lowercase character', '1 number', 'Minimum 8 characters'];
    criteria.forEach(criterion => {
      expect(screen.getByText(new RegExp(criterion, 'i')).className).toMatch(/red/);
    });
  });

  test('displays error when trying to submit an invalid form', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    fillOutForm({ email: 'invalid', password: '123' });
    fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
    expect(console.error).toHaveBeenCalledWith('Form is invalid');
    console.error.mockRestore();
  });
});

describe('Integration with complex components - Mocking', () => {
  // Assuming there could be complex components or external services integrated in the future
  test('handles form submission with mocked API call', async () => {
    // Mocking an API call for form submission
    const mockApiCall = jest.fn().mockResolvedValue({ success: true });
    jest.mock('../api/user', () => ({
      createUser: mockApiCall,
    }));

    fillOutForm();
    fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
    await waitFor(() => {
      expect(mockApiCall).toHaveBeenCalledWith({
        firstName: 'John',
        lastName: 'Doe',
        email: VALID_EMAIL,
        password: VALID_PASSWORD,
      });
    });
  });
});

describe('Accessibility Checks', () => {
  test('ensures form elements have proper accessible names', () => {
    expect(screen.getByLabelText(LABELS.firstName)).toHaveAccessibleName('First Name');
    expect(screen.getByLabelText(LABELS.lastName)).toHaveAccessibleName('Last Name');
    expect(screen.getByLabelText(LABELS.email)).toHaveAccessibleName('Email');
    expect(screen.getByLabelText(LABELS.password)).toHaveAccessibleName('Password');
    expect(screen.getByRole('button', { name: BUTTON_TEXT })).toHaveAccessibleName('Create Account');
  });
});
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeNull();
    });

// Additional tests to improve the coverage
describe('Form Validation - Negative Cases', () => {
  test('does not enable Create Account button when email is invalid', () => {
    fillOutForm({ email: 'invalidemail' });
    expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
  });

  test.each([
    { password: 'lowercaseonly', message: '1 uppercase character' },
    { password: 'UPPERCASEONLY', message: '1 lowercase character' },
    { password: 'NoDigitsHere', message: '1 number' },
    { password: 'Shrt1', message: 'Minimum 8 characters' },
  ])('disables Create Account button with invalid password: %s', ({ password, message }) => {
    fillOutForm({ password });
    expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    expect(screen.getByText(new RegExp(message, 'i')).className).toMatch(/red/);
  });

  test('displays all password criteria in red with an empty password', () => {
    fillOutForm({ password: '' });
    const criteria = ['1 uppercase character', '1 lowercase character', '1 number', 'Minimum 8 characters'];
    criteria.forEach(criterion => {
      expect(screen.getByText(new RegExp(criterion, 'i')).className).toMatch(/red/);
    });
  });

  test('displays error when trying to submit an invalid form', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    fillOutForm({ email: 'invalid', password: '123' });
    fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
    expect(console.error).toHaveBeenCalledWith('Form is invalid');
    console.error.mockRestore();
  });
});

describe('Integration with complex components - Mocking', () => {
  // Assuming there could be complex components or external services integrated in the future
  test('handles form submission with mocked API call', async () => {
    // Mocking an API call for form submission
    const mockApiCall = jest.fn().mockResolvedValue({ success: true });
    jest.mock('../api/user', () => ({
      createUser: mockApiCall,
    }));

    fillOutForm();
    fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
    await waitFor(() => {
      expect(mockApiCall).toHaveBeenCalledWith({
        firstName: 'John',
        lastName: 'Doe',
        email: VALID_EMAIL,
        password: VALID_PASSWORD,
      });
    });
  });
});

describe('Accessibility Checks', () => {
  test('ensures form elements have proper accessible names', () => {
    expect(screen.getByLabelText(LABELS.firstName)).toHaveAccessibleName('First Name');
    expect(screen.getByLabelText(LABELS.lastName)).toHaveAccessibleName('Last Name');
    expect(screen.getByLabelText(LABELS.email)).toHaveAccessibleName('Email');
    expect(screen.getByLabelText(LABELS.password)).toHaveAccessibleName('Password');
    expect(screen.getByRole('button', { name: BUTTON_TEXT })).toHaveAccessibleName('Create Account');
  });
});

    test('validates password criteria correctly', () => {
      const password = screen.getByLabelText(LABELS.password);
      fireEvent.change(password, { target: { value: 'short' } });

// Additional tests to improve the coverage
describe('Form Validation - Negative Cases', () => {
  test('does not enable Create Account button when email is invalid', () => {
    fillOutForm({ email: 'invalidemail' });
    expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
  });

  test.each([
    { password: 'lowercaseonly', message: '1 uppercase character' },
    { password: 'UPPERCASEONLY', message: '1 lowercase character' },
    { password: 'NoDigitsHere', message: '1 number' },
    { password: 'Shrt1', message: 'Minimum 8 characters' },
  ])('disables Create Account button with invalid password: %s', ({ password, message }) => {
    fillOutForm({ password });
    expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    expect(screen.getByText(new RegExp(message, 'i')).className).toMatch(/red/);
  });

  test('displays all password criteria in red with an empty password', () => {
    fillOutForm({ password: '' });
    const criteria = ['1 uppercase character', '1 lowercase character', '1 number', 'Minimum 8 characters'];
    criteria.forEach(criterion => {
      expect(screen.getByText(new RegExp(criterion, 'i')).className).toMatch(/red/);
    });
  });

  test('displays error when trying to submit an invalid form', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    fillOutForm({ email: 'invalid', password: '123' });
    fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
    expect(console.error).toHaveBeenCalledWith('Form is invalid');
    console.error.mockRestore();
  });
});

describe('Integration with complex components - Mocking', () => {
  // Assuming there could be complex components or external services integrated in the future
  test('handles form submission with mocked API call', async () => {
    // Mocking an API call for form submission
    const mockApiCall = jest.fn().mockResolvedValue({ success: true });
    jest.mock('../api/user', () => ({
      createUser: mockApiCall,
    }));

    fillOutForm();
    fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
    await waitFor(() => {
      expect(mockApiCall).toHaveBeenCalledWith({
        firstName: 'John',
        lastName: 'Doe',
        email: VALID_EMAIL,
        password: VALID_PASSWORD,
      });
    });
  });
});

describe('Accessibility Checks', () => {
  test('ensures form elements have proper accessible names', () => {
    expect(screen.getByLabelText(LABELS.firstName)).toHaveAccessibleName('First Name');
    expect(screen.getByLabelText(LABELS.lastName)).toHaveAccessibleName('Last Name');
    expect(screen.getByLabelText(LABELS.email)).toHaveAccessibleName('Email');
    expect(screen.getByLabelText(LABELS.password)).toHaveAccessibleName('Password');
    expect(screen.getByRole('button', { name: BUTTON_TEXT })).toHaveAccessibleName('Create Account');
  });
});
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
      fireEvent.change(password, { target: { value: 'LongEnough1' } });

// Additional tests to improve the coverage
describe('Form Validation - Negative Cases', () => {
  test('does not enable Create Account button when email is invalid', () => {
    fillOutForm({ email: 'invalidemail' });
    expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
  });

  test.each([
    { password: 'lowercaseonly', message: '1 uppercase character' },
    { password: 'UPPERCASEONLY', message: '1 lowercase character' },
    { password: 'NoDigitsHere', message: '1 number' },
    { password: 'Shrt1', message: 'Minimum 8 characters' },
  ])('disables Create Account button with invalid password: %s', ({ password, message }) => {
    fillOutForm({ password });
    expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    expect(screen.getByText(new RegExp(message, 'i')).className).toMatch(/red/);
  });

  test('displays all password criteria in red with an empty password', () => {
    fillOutForm({ password: '' });
    const criteria = ['1 uppercase character', '1 lowercase character', '1 number', 'Minimum 8 characters'];
    criteria.forEach(criterion => {
      expect(screen.getByText(new RegExp(criterion, 'i')).className).toMatch(/red/);
    });
  });

  test('displays error when trying to submit an invalid form', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    fillOutForm({ email: 'invalid', password: '123' });
    fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
    expect(console.error).toHaveBeenCalledWith('Form is invalid');
    console.error.mockRestore();
  });
});

describe('Integration with complex components - Mocking', () => {
  // Assuming there could be complex components or external services integrated in the future
  test('handles form submission with mocked API call', async () => {
    // Mocking an API call for form submission
    const mockApiCall = jest.fn().mockResolvedValue({ success: true });
    jest.mock('../api/user', () => ({
      createUser: mockApiCall,
    }));

    fillOutForm();
    fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
    await waitFor(() => {
      expect(mockApiCall).toHaveBeenCalledWith({
        firstName: 'John',
        lastName: 'Doe',
        email: VALID_EMAIL,
        password: VALID_PASSWORD,
      });
    });
  });
});

describe('Accessibility Checks', () => {
  test('ensures form elements have proper accessible names', () => {
    expect(screen.getByLabelText(LABELS.firstName)).toHaveAccessibleName('First Name');
    expect(screen.getByLabelText(LABELS.lastName)).toHaveAccessibleName('Last Name');
    expect(screen.getByLabelText(LABELS.email)).toHaveAccessibleName('Email');
    expect(screen.getByLabelText(LABELS.password)).toHaveAccessibleName('Password');
    expect(screen.getByRole('button', { name: BUTTON_TEXT })).toHaveAccessibleName('Create Account');
  });
});
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(/green/);
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
      expect(screen.getByText(/1 number/i).className).toMatch(/green/);
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

// Additional tests to improve the coverage
describe('Form Validation - Negative Cases', () => {
  test('does not enable Create Account button when email is invalid', () => {
    fillOutForm({ email: 'invalidemail' });
    expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
  });

  test.each([
    { password: 'lowercaseonly', message: '1 uppercase character' },
    { password: 'UPPERCASEONLY', message: '1 lowercase character' },
    { password: 'NoDigitsHere', message: '1 number' },
    { password: 'Shrt1', message: 'Minimum 8 characters' },
  ])('disables Create Account button with invalid password: %s', ({ password, message }) => {
    fillOutForm({ password });
    expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    expect(screen.getByText(new RegExp(message, 'i')).className).toMatch(/red/);
  });

  test('displays all password criteria in red with an empty password', () => {
    fillOutForm({ password: '' });
    const criteria = ['1 uppercase character', '1 lowercase character', '1 number', 'Minimum 8 characters'];
    criteria.forEach(criterion => {
      expect(screen.getByText(new RegExp(criterion, 'i')).className).toMatch(/red/);
    });
  });

  test('displays error when trying to submit an invalid form', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    fillOutForm({ email: 'invalid', password: '123' });
    fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
    expect(console.error).toHaveBeenCalledWith('Form is invalid');
    console.error.mockRestore();
  });
});

describe('Integration with complex components - Mocking', () => {
  // Assuming there could be complex components or external services integrated in the future
  test('handles form submission with mocked API call', async () => {
    // Mocking an API call for form submission
    const mockApiCall = jest.fn().mockResolvedValue({ success: true });
    jest.mock('../api/user', () => ({
      createUser: mockApiCall,
    }));

    fillOutForm();
    fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
    await waitFor(() => {
      expect(mockApiCall).toHaveBeenCalledWith({
        firstName: 'John',
        lastName: 'Doe',
        email: VALID_EMAIL,
        password: VALID_PASSWORD,
      });
    });
  });
});

describe('Accessibility Checks', () => {
  test('ensures form elements have proper accessible names', () => {
    expect(screen.getByLabelText(LABELS.firstName)).toHaveAccessibleName('First Name');
    expect(screen.getByLabelText(LABELS.lastName)).toHaveAccessibleName('Last Name');
    expect(screen.getByLabelText(LABELS.email)).toHaveAccessibleName('Email');
    expect(screen.getByLabelText(LABELS.password)).toHaveAccessibleName('Password');
    expect(screen.getByRole('button', { name: BUTTON_TEXT })).toHaveAccessibleName('Create Account');
  });
});
  });

// Additional tests to improve the coverage
describe('Form Validation - Negative Cases', () => {
  test('does not enable Create Account button when email is invalid', () => {
    fillOutForm({ email: 'invalidemail' });
    expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
  });

  test.each([
    { password: 'lowercaseonly', message: '1 uppercase character' },
    { password: 'UPPERCASEONLY', message: '1 lowercase character' },
    { password: 'NoDigitsHere', message: '1 number' },
    { password: 'Shrt1', message: 'Minimum 8 characters' },
  ])('disables Create Account button with invalid password: %s', ({ password, message }) => {
    fillOutForm({ password });
    expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    expect(screen.getByText(new RegExp(message, 'i')).className).toMatch(/red/);
  });

  test('displays all password criteria in red with an empty password', () => {
    fillOutForm({ password: '' });
    const criteria = ['1 uppercase character', '1 lowercase character', '1 number', 'Minimum 8 characters'];
    criteria.forEach(criterion => {
      expect(screen.getByText(new RegExp(criterion, 'i')).className).toMatch(/red/);
    });
  });

  test('displays error when trying to submit an invalid form', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    fillOutForm({ email: 'invalid', password: '123' });
    fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
    expect(console.error).toHaveBeenCalledWith('Form is invalid');
    console.error.mockRestore();
  });
});

describe('Integration with complex components - Mocking', () => {
  // Assuming there could be complex components or external services integrated in the future
  test('handles form submission with mocked API call', async () => {
    // Mocking an API call for form submission
    const mockApiCall = jest.fn().mockResolvedValue({ success: true });
    jest.mock('../api/user', () => ({
      createUser: mockApiCall,
    }));

    fillOutForm();
    fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
    await waitFor(() => {
      expect(mockApiCall).toHaveBeenCalledWith({
        firstName: 'John',
        lastName: 'Doe',
        email: VALID_EMAIL,
        password: VALID_PASSWORD,
      });
    });
  });
});

describe('Accessibility Checks', () => {
  test('ensures form elements have proper accessible names', () => {
    expect(screen.getByLabelText(LABELS.firstName)).toHaveAccessibleName('First Name');
    expect(screen.getByLabelText(LABELS.lastName)).toHaveAccessibleName('Last Name');
    expect(screen.getByLabelText(LABELS.email)).toHaveAccessibleName('Email');
    expect(screen.getByLabelText(LABELS.password)).toHaveAccessibleName('Password');
    expect(screen.getByRole('button', { name: BUTTON_TEXT })).toHaveAccessibleName('Create Account');
  });
});

  describe('Form Submission', () => {
    let consoleSpy;

    beforeEach(() => {
      consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

// Additional tests to improve the coverage
describe('Form Validation - Negative Cases', () => {
  test('does not enable Create Account button when email is invalid', () => {
    fillOutForm({ email: 'invalidemail' });
    expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
  });

  test.each([
    { password: 'lowercaseonly', message: '1 uppercase character' },
    { password: 'UPPERCASEONLY', message: '1 lowercase character' },
    { password: 'NoDigitsHere', message: '1 number' },
    { password: 'Shrt1', message: 'Minimum 8 characters' },
  ])('disables Create Account button with invalid password: %s', ({ password, message }) => {
    fillOutForm({ password });
    expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    expect(screen.getByText(new RegExp(message, 'i')).className).toMatch(/red/);
  });

  test('displays all password criteria in red with an empty password', () => {
    fillOutForm({ password: '' });
    const criteria = ['1 uppercase character', '1 lowercase character', '1 number', 'Minimum 8 characters'];
    criteria.forEach(criterion => {
      expect(screen.getByText(new RegExp(criterion, 'i')).className).toMatch(/red/);
    });
  });

  test('displays error when trying to submit an invalid form', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    fillOutForm({ email: 'invalid', password: '123' });
    fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
    expect(console.error).toHaveBeenCalledWith('Form is invalid');
    console.error.mockRestore();
  });
});

describe('Integration with complex components - Mocking', () => {
  // Assuming there could be complex components or external services integrated in the future
  test('handles form submission with mocked API call', async () => {
    // Mocking an API call for form submission
    const mockApiCall = jest.fn().mockResolvedValue({ success: true });
    jest.mock('../api/user', () => ({
      createUser: mockApiCall,
    }));

    fillOutForm();
    fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
    await waitFor(() => {
      expect(mockApiCall).toHaveBeenCalledWith({
        firstName: 'John',
        lastName: 'Doe',
        email: VALID_EMAIL,
        password: VALID_PASSWORD,
      });
    });
  });
});

describe('Accessibility Checks', () => {
  test('ensures form elements have proper accessible names', () => {
    expect(screen.getByLabelText(LABELS.firstName)).toHaveAccessibleName('First Name');
    expect(screen.getByLabelText(LABELS.lastName)).toHaveAccessibleName('Last Name');
    expect(screen.getByLabelText(LABELS.email)).toHaveAccessibleName('Email');
    expect(screen.getByLabelText(LABELS.password)).toHaveAccessibleName('Password');
    expect(screen.getByRole('button', { name: BUTTON_TEXT })).toHaveAccessibleName('Create Account');
  });
});
    });

// Additional tests to improve the coverage
describe('Form Validation - Negative Cases', () => {
  test('does not enable Create Account button when email is invalid', () => {
    fillOutForm({ email: 'invalidemail' });
    expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
  });

  test.each([
    { password: 'lowercaseonly', message: '1 uppercase character' },
    { password: 'UPPERCASEONLY', message: '1 lowercase character' },
    { password: 'NoDigitsHere', message: '1 number' },
    { password: 'Shrt1', message: 'Minimum 8 characters' },
  ])('disables Create Account button with invalid password: %s', ({ password, message }) => {
    fillOutForm({ password });
    expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    expect(screen.getByText(new RegExp(message, 'i')).className).toMatch(/red/);
  });

  test('displays all password criteria in red with an empty password', () => {
    fillOutForm({ password: '' });
    const criteria = ['1 uppercase character', '1 lowercase character', '1 number', 'Minimum 8 characters'];
    criteria.forEach(criterion => {
      expect(screen.getByText(new RegExp(criterion, 'i')).className).toMatch(/red/);
    });
  });

  test('displays error when trying to submit an invalid form', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    fillOutForm({ email: 'invalid', password: '123' });
    fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
    expect(console.error).toHaveBeenCalledWith('Form is invalid');
    console.error.mockRestore();
  });
});

describe('Integration with complex components - Mocking', () => {
  // Assuming there could be complex components or external services integrated in the future
  test('handles form submission with mocked API call', async () => {
    // Mocking an API call for form submission
    const mockApiCall = jest.fn().mockResolvedValue({ success: true });
    jest.mock('../api/user', () => ({
      createUser: mockApiCall,
    }));

    fillOutForm();
    fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
    await waitFor(() => {
      expect(mockApiCall).toHaveBeenCalledWith({
        firstName: 'John',
        lastName: 'Doe',
        email: VALID_EMAIL,
        password: VALID_PASSWORD,
      });
    });
  });
});

describe('Accessibility Checks', () => {
  test('ensures form elements have proper accessible names', () => {
    expect(screen.getByLabelText(LABELS.firstName)).toHaveAccessibleName('First Name');
    expect(screen.getByLabelText(LABELS.lastName)).toHaveAccessibleName('Last Name');
    expect(screen.getByLabelText(LABELS.email)).toHaveAccessibleName('Email');
    expect(screen.getByLabelText(LABELS.password)).toHaveAccessibleName('Password');
    expect(screen.getByRole('button', { name: BUTTON_TEXT })).toHaveAccessibleName('Create Account');
  });
});

    afterEach(() => {
      consoleSpy.mockRestore();
    });

// Additional tests to improve the coverage
describe('Form Validation - Negative Cases', () => {
  test('does not enable Create Account button when email is invalid', () => {
    fillOutForm({ email: 'invalidemail' });
    expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
  });

  test.each([
    { password: 'lowercaseonly', message: '1 uppercase character' },
    { password: 'UPPERCASEONLY', message: '1 lowercase character' },
    { password: 'NoDigitsHere', message: '1 number' },
    { password: 'Shrt1', message: 'Minimum 8 characters' },
  ])('disables Create Account button with invalid password: %s', ({ password, message }) => {
    fillOutForm({ password });
    expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    expect(screen.getByText(new RegExp(message, 'i')).className).toMatch(/red/);
  });

  test('displays all password criteria in red with an empty password', () => {
    fillOutForm({ password: '' });
    const criteria = ['1 uppercase character', '1 lowercase character', '1 number', 'Minimum 8 characters'];
    criteria.forEach(criterion => {
      expect(screen.getByText(new RegExp(criterion, 'i')).className).toMatch(/red/);
    });
  });

  test('displays error when trying to submit an invalid form', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    fillOutForm({ email: 'invalid', password: '123' });
    fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
    expect(console.error).toHaveBeenCalledWith('Form is invalid');
    console.error.mockRestore();
  });
});

describe('Integration with complex components - Mocking', () => {
  // Assuming there could be complex components or external services integrated in the future
  test('handles form submission with mocked API call', async () => {
    // Mocking an API call for form submission
    const mockApiCall = jest.fn().mockResolvedValue({ success: true });
    jest.mock('../api/user', () => ({
      createUser: mockApiCall,
    }));

    fillOutForm();
    fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
    await waitFor(() => {
      expect(mockApiCall).toHaveBeenCalledWith({
        firstName: 'John',
        lastName: 'Doe',
        email: VALID_EMAIL,
        password: VALID_PASSWORD,
      });
    });
  });
});

describe('Accessibility Checks', () => {
  test('ensures form elements have proper accessible names', () => {
    expect(screen.getByLabelText(LABELS.firstName)).toHaveAccessibleName('First Name');
    expect(screen.getByLabelText(LABELS.lastName)).toHaveAccessibleName('Last Name');
    expect(screen.getByLabelText(LABELS.email)).toHaveAccessibleName('Email');
    expect(screen.getByLabelText(LABELS.password)).toHaveAccessibleName('Password');
    expect(screen.getByRole('button', { name: BUTTON_TEXT })).toHaveAccessibleName('Create Account');
  });
});

    test('enables Create Account button with valid form', () => {
      fillOutForm();
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).not.toBeDisabled();
    });

// Additional tests to improve the coverage
describe('Form Validation - Negative Cases', () => {
  test('does not enable Create Account button when email is invalid', () => {
    fillOutForm({ email: 'invalidemail' });
    expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
  });

  test.each([
    { password: 'lowercaseonly', message: '1 uppercase character' },
    { password: 'UPPERCASEONLY', message: '1 lowercase character' },
    { password: 'NoDigitsHere', message: '1 number' },
    { password: 'Shrt1', message: 'Minimum 8 characters' },
  ])('disables Create Account button with invalid password: %s', ({ password, message }) => {
    fillOutForm({ password });
    expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    expect(screen.getByText(new RegExp(message, 'i')).className).toMatch(/red/);
  });

  test('displays all password criteria in red with an empty password', () => {
    fillOutForm({ password: '' });
    const criteria = ['1 uppercase character', '1 lowercase character', '1 number', 'Minimum 8 characters'];
    criteria.forEach(criterion => {
      expect(screen.getByText(new RegExp(criterion, 'i')).className).toMatch(/red/);
    });
  });

  test('displays error when trying to submit an invalid form', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    fillOutForm({ email: 'invalid', password: '123' });
    fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
    expect(console.error).toHaveBeenCalledWith('Form is invalid');
    console.error.mockRestore();
  });
});

describe('Integration with complex components - Mocking', () => {
  // Assuming there could be complex components or external services integrated in the future
  test('handles form submission with mocked API call', async () => {
    // Mocking an API call for form submission
    const mockApiCall = jest.fn().mockResolvedValue({ success: true });
    jest.mock('../api/user', () => ({
      createUser: mockApiCall,
    }));

    fillOutForm();
    fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
    await waitFor(() => {
      expect(mockApiCall).toHaveBeenCalledWith({
        firstName: 'John',
        lastName: 'Doe',
        email: VALID_EMAIL,
        password: VALID_PASSWORD,
      });
    });
  });
});

describe('Accessibility Checks', () => {
  test('ensures form elements have proper accessible names', () => {
    expect(screen.getByLabelText(LABELS.firstName)).toHaveAccessibleName('First Name');
    expect(screen.getByLabelText(LABELS.lastName)).toHaveAccessibleName('Last Name');
    expect(screen.getByLabelText(LABELS.email)).toHaveAccessibleName('Email');
    expect(screen.getByLabelText(LABELS.password)).toHaveAccessibleName('Password');
    expect(screen.getByRole('button', { name: BUTTON_TEXT })).toHaveAccessibleName('Create Account');
  });
});

    test('disables Create Account button with invalid form', () => {
      fillOutForm({ firstName: '' });

// Additional tests to improve the coverage
describe('Form Validation - Negative Cases', () => {
  test('does not enable Create Account button when email is invalid', () => {
    fillOutForm({ email: 'invalidemail' });
    expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
  });

  test.each([
    { password: 'lowercaseonly', message: '1 uppercase character' },
    { password: 'UPPERCASEONLY', message: '1 lowercase character' },
    { password: 'NoDigitsHere', message: '1 number' },
    { password: 'Shrt1', message: 'Minimum 8 characters' },
  ])('disables Create Account button with invalid password: %s', ({ password, message }) => {
    fillOutForm({ password });
    expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    expect(screen.getByText(new RegExp(message, 'i')).className).toMatch(/red/);
  });

  test('displays all password criteria in red with an empty password', () => {
    fillOutForm({ password: '' });
    const criteria = ['1 uppercase character', '1 lowercase character', '1 number', 'Minimum 8 characters'];
    criteria.forEach(criterion => {
      expect(screen.getByText(new RegExp(criterion, 'i')).className).toMatch(/red/);
    });
  });

  test('displays error when trying to submit an invalid form', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    fillOutForm({ email: 'invalid', password: '123' });
    fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
    expect(console.error).toHaveBeenCalledWith('Form is invalid');
    console.error.mockRestore();
  });
});

describe('Integration with complex components - Mocking', () => {
  // Assuming there could be complex components or external services integrated in the future
  test('handles form submission with mocked API call', async () => {
    // Mocking an API call for form submission
    const mockApiCall = jest.fn().mockResolvedValue({ success: true });
    jest.mock('../api/user', () => ({
      createUser: mockApiCall,
    }));

    fillOutForm();
    fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
    await waitFor(() => {
      expect(mockApiCall).toHaveBeenCalledWith({
        firstName: 'John',
        lastName: 'Doe',
        email: VALID_EMAIL,
        password: VALID_PASSWORD,
      });
    });
  });
});

describe('Accessibility Checks', () => {
  test('ensures form elements have proper accessible names', () => {
    expect(screen.getByLabelText(LABELS.firstName)).toHaveAccessibleName('First Name');
    expect(screen.getByLabelText(LABELS.lastName)).toHaveAccessibleName('Last Name');
    expect(screen.getByLabelText(LABELS.email)).toHaveAccessibleName('Email');
    expect(screen.getByLabelText(LABELS.password)).toHaveAccessibleName('Password');
    expect(screen.getByRole('button', { name: BUTTON_TEXT })).toHaveAccessibleName('Create Account');
  });
}); // Explicitly set an invalid field
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

// Additional tests to improve the coverage
describe('Form Validation - Negative Cases', () => {
  test('does not enable Create Account button when email is invalid', () => {
    fillOutForm({ email: 'invalidemail' });
    expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
  });

  test.each([
    { password: 'lowercaseonly', message: '1 uppercase character' },
    { password: 'UPPERCASEONLY', message: '1 lowercase character' },
    { password: 'NoDigitsHere', message: '1 number' },
    { password: 'Shrt1', message: 'Minimum 8 characters' },
  ])('disables Create Account button with invalid password: %s', ({ password, message }) => {
    fillOutForm({ password });
    expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    expect(screen.getByText(new RegExp(message, 'i')).className).toMatch(/red/);
  });

  test('displays all password criteria in red with an empty password', () => {
    fillOutForm({ password: '' });
    const criteria = ['1 uppercase character', '1 lowercase character', '1 number', 'Minimum 8 characters'];
    criteria.forEach(criterion => {
      expect(screen.getByText(new RegExp(criterion, 'i')).className).toMatch(/red/);
    });
  });

  test('displays error when trying to submit an invalid form', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    fillOutForm({ email: 'invalid', password: '123' });
    fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
    expect(console.error).toHaveBeenCalledWith('Form is invalid');
    console.error.mockRestore();
  });
});

describe('Integration with complex components - Mocking', () => {
  // Assuming there could be complex components or external services integrated in the future
  test('handles form submission with mocked API call', async () => {
    // Mocking an API call for form submission
    const mockApiCall = jest.fn().mockResolvedValue({ success: true });
    jest.mock('../api/user', () => ({
      createUser: mockApiCall,
    }));

    fillOutForm();
    fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
    await waitFor(() => {
      expect(mockApiCall).toHaveBeenCalledWith({
        firstName: 'John',
        lastName: 'Doe',
        email: VALID_EMAIL,
        password: VALID_PASSWORD,
      });
    });
  });
});

describe('Accessibility Checks', () => {
  test('ensures form elements have proper accessible names', () => {
    expect(screen.getByLabelText(LABELS.firstName)).toHaveAccessibleName('First Name');
    expect(screen.getByLabelText(LABELS.lastName)).toHaveAccessibleName('Last Name');
    expect(screen.getByLabelText(LABELS.email)).toHaveAccessibleName('Email');
    expect(screen.getByLabelText(LABELS.password)).toHaveAccessibleName('Password');
    expect(screen.getByRole('button', { name: BUTTON_TEXT })).toHaveAccessibleName('Create Account');
  });
});

    test('calls console log with correct data on valid form submission', () => {
      const formData = fillOutForm();
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(consoleSpy).toHaveBeenLastCalledWith('Form submitted:', formData);
    });

// Additional tests to improve the coverage
describe('Form Validation - Negative Cases', () => {
  test('does not enable Create Account button when email is invalid', () => {
    fillOutForm({ email: 'invalidemail' });
    expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
  });

  test.each([
    { password: 'lowercaseonly', message: '1 uppercase character' },
    { password: 'UPPERCASEONLY', message: '1 lowercase character' },
    { password: 'NoDigitsHere', message: '1 number' },
    { password: 'Shrt1', message: 'Minimum 8 characters' },
  ])('disables Create Account button with invalid password: %s', ({ password, message }) => {
    fillOutForm({ password });
    expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    expect(screen.getByText(new RegExp(message, 'i')).className).toMatch(/red/);
  });

  test('displays all password criteria in red with an empty password', () => {
    fillOutForm({ password: '' });
    const criteria = ['1 uppercase character', '1 lowercase character', '1 number', 'Minimum 8 characters'];
    criteria.forEach(criterion => {
      expect(screen.getByText(new RegExp(criterion, 'i')).className).toMatch(/red/);
    });
  });

  test('displays error when trying to submit an invalid form', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    fillOutForm({ email: 'invalid', password: '123' });
    fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
    expect(console.error).toHaveBeenCalledWith('Form is invalid');
    console.error.mockRestore();
  });
});

describe('Integration with complex components - Mocking', () => {
  // Assuming there could be complex components or external services integrated in the future
  test('handles form submission with mocked API call', async () => {
    // Mocking an API call for form submission
    const mockApiCall = jest.fn().mockResolvedValue({ success: true });
    jest.mock('../api/user', () => ({
      createUser: mockApiCall,
    }));

    fillOutForm();
    fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
    await waitFor(() => {
      expect(mockApiCall).toHaveBeenCalledWith({
        firstName: 'John',
        lastName: 'Doe',
        email: VALID_EMAIL,
        password: VALID_PASSWORD,
      });
    });
  });
});

describe('Accessibility Checks', () => {
  test('ensures form elements have proper accessible names', () => {
    expect(screen.getByLabelText(LABELS.firstName)).toHaveAccessibleName('First Name');
    expect(screen.getByLabelText(LABELS.lastName)).toHaveAccessibleName('Last Name');
    expect(screen.getByLabelText(LABELS.email)).toHaveAccessibleName('Email');
    expect(screen.getByLabelText(LABELS.password)).toHaveAccessibleName('Password');
    expect(screen.getByRole('button', { name: BUTTON_TEXT })).toHaveAccessibleName('Create Account');
  });
});
  });

// Additional tests to improve the coverage
describe('Form Validation - Negative Cases', () => {
  test('does not enable Create Account button when email is invalid', () => {
    fillOutForm({ email: 'invalidemail' });
    expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
  });

  test.each([
    { password: 'lowercaseonly', message: '1 uppercase character' },
    { password: 'UPPERCASEONLY', message: '1 lowercase character' },
    { password: 'NoDigitsHere', message: '1 number' },
    { password: 'Shrt1', message: 'Minimum 8 characters' },
  ])('disables Create Account button with invalid password: %s', ({ password, message }) => {
    fillOutForm({ password });
    expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    expect(screen.getByText(new RegExp(message, 'i')).className).toMatch(/red/);
  });

  test('displays all password criteria in red with an empty password', () => {
    fillOutForm({ password: '' });
    const criteria = ['1 uppercase character', '1 lowercase character', '1 number', 'Minimum 8 characters'];
    criteria.forEach(criterion => {
      expect(screen.getByText(new RegExp(criterion, 'i')).className).toMatch(/red/);
    });
  });

  test('displays error when trying to submit an invalid form', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    fillOutForm({ email: 'invalid', password: '123' });
    fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
    expect(console.error).toHaveBeenCalledWith('Form is invalid');
    console.error.mockRestore();
  });
});

describe('Integration with complex components - Mocking', () => {
  // Assuming there could be complex components or external services integrated in the future
  test('handles form submission with mocked API call', async () => {
    // Mocking an API call for form submission
    const mockApiCall = jest.fn().mockResolvedValue({ success: true });
    jest.mock('../api/user', () => ({
      createUser: mockApiCall,
    }));

    fillOutForm();
    fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
    await waitFor(() => {
      expect(mockApiCall).toHaveBeenCalledWith({
        firstName: 'John',
        lastName: 'Doe',
        email: VALID_EMAIL,
        password: VALID_PASSWORD,
      });
    });
  });
});

describe('Accessibility Checks', () => {
  test('ensures form elements have proper accessible names', () => {
    expect(screen.getByLabelText(LABELS.firstName)).toHaveAccessibleName('First Name');
    expect(screen.getByLabelText(LABELS.lastName)).toHaveAccessibleName('Last Name');
    expect(screen.getByLabelText(LABELS.email)).toHaveAccessibleName('Email');
    expect(screen.getByLabelText(LABELS.password)).toHaveAccessibleName('Password');
    expect(screen.getByRole('button', { name: BUTTON_TEXT })).toHaveAccessibleName('Create Account');
  });
});
});

// Additional tests to improve the coverage
describe('Form Validation - Negative Cases', () => {
  test('does not enable Create Account button when email is invalid', () => {
    fillOutForm({ email: 'invalidemail' });
    expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
  });

  test.each([
    { password: 'lowercaseonly', message: '1 uppercase character' },
    { password: 'UPPERCASEONLY', message: '1 lowercase character' },
    { password: 'NoDigitsHere', message: '1 number' },
    { password: 'Shrt1', message: 'Minimum 8 characters' },
  ])('disables Create Account button with invalid password: %s', ({ password, message }) => {
    fillOutForm({ password });
    expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    expect(screen.getByText(new RegExp(message, 'i')).className).toMatch(/red/);
  });

  test('displays all password criteria in red with an empty password', () => {
    fillOutForm({ password: '' });
    const criteria = ['1 uppercase character', '1 lowercase character', '1 number', 'Minimum 8 characters'];
    criteria.forEach(criterion => {
      expect(screen.getByText(new RegExp(criterion, 'i')).className).toMatch(/red/);
    });
  });

  test('displays error when trying to submit an invalid form', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    fillOutForm({ email: 'invalid', password: '123' });
    fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
    expect(console.error).toHaveBeenCalledWith('Form is invalid');
    console.error.mockRestore();
  });
});

describe('Integration with complex components - Mocking', () => {
  // Assuming there could be complex components or external services integrated in the future
  test('handles form submission with mocked API call', async () => {
    // Mocking an API call for form submission
    const mockApiCall = jest.fn().mockResolvedValue({ success: true });
    jest.mock('../api/user', () => ({
      createUser: mockApiCall,
    }));

    fillOutForm();
    fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
    await waitFor(() => {
      expect(mockApiCall).toHaveBeenCalledWith({
        firstName: 'John',
        lastName: 'Doe',
        email: VALID_EMAIL,
        password: VALID_PASSWORD,
      });
    });
  });
});

describe('Accessibility Checks', () => {
  test('ensures form elements have proper accessible names', () => {
    expect(screen.getByLabelText(LABELS.firstName)).toHaveAccessibleName('First Name');
    expect(screen.getByLabelText(LABELS.lastName)).toHaveAccessibleName('Last Name');
    expect(screen.getByLabelText(LABELS.email)).toHaveAccessibleName('Email');
    expect(screen.getByLabelText(LABELS.password)).toHaveAccessibleName('Password');
    expect(screen.getByRole('button', { name: BUTTON_TEXT })).toHaveAccessibleName('Create Account');
  });
});
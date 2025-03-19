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

  describe('Edge Cases', () => {
    test('enforces maximum length on firstName and lastName', () => {
      const longName = 'a'.repeat(51);
      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: longName } });
      expect(screen.getByLabelText(LABELS.firstName)).toHaveValue(longName.slice(0, 50));

      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: longName } });
      expect(screen.getByLabelText(LABELS.lastName)).toHaveValue(longName.slice(0, 50));
    });

    test('handles special characters in firstName and lastName', () => {
      const specialChars = '!@#$%^&*()_+{}|:"<>?';
      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: specialChars } });
      expect(screen.getByLabelText(LABELS.firstName)).toHaveValue(specialChars);

      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: specialChars } });
      expect(screen.getByLabelText(LABELS.lastName)).toHaveValue(specialChars);
    });

    test('displays validation messages for empty submissions', () => {
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(screen.getByText(/Please enter a valid email address/i)).toBeInTheDocument();
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
    });
  });

  describe('Accessibility', () => {
    test('ensures all fields have proper ARIA labels', () => {
      Object.values(LABELS).forEach((labelRegex) => {
        expect(screen.getByLabelText(labelRegex)).toBeInTheDocument();
      });
    });
  });

  describe('CSS Class Changes', () => {
    test('validates CSS class changes for password criteria', () => {
      const password = screen.getByLabelText(LABELS.password);
      fireEvent.change(password, { target: { value: 'short' } });
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
      fireEvent.change(password, { target: { value: 'LongEnough1' } });
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });
  });
  fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: formData.lastName } });

  describe('Edge Cases', () => {
    test('enforces maximum length on firstName and lastName', () => {
      const longName = 'a'.repeat(51);
      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: longName } });
      expect(screen.getByLabelText(LABELS.firstName)).toHaveValue(longName.slice(0, 50));

      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: longName } });
      expect(screen.getByLabelText(LABELS.lastName)).toHaveValue(longName.slice(0, 50));
    });

    test('handles special characters in firstName and lastName', () => {
      const specialChars = '!@#$%^&*()_+{}|:"<>?';
      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: specialChars } });
      expect(screen.getByLabelText(LABELS.firstName)).toHaveValue(specialChars);

      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: specialChars } });
      expect(screen.getByLabelText(LABELS.lastName)).toHaveValue(specialChars);
    });

    test('displays validation messages for empty submissions', () => {
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(screen.getByText(/Please enter a valid email address/i)).toBeInTheDocument();
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
    });
  });

  describe('Accessibility', () => {
    test('ensures all fields have proper ARIA labels', () => {
      Object.values(LABELS).forEach((labelRegex) => {
        expect(screen.getByLabelText(labelRegex)).toBeInTheDocument();
      });
    });
  });

  describe('CSS Class Changes', () => {
    test('validates CSS class changes for password criteria', () => {
      const password = screen.getByLabelText(LABELS.password);
      fireEvent.change(password, { target: { value: 'short' } });
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
      fireEvent.change(password, { target: { value: 'LongEnough1' } });
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });
  });
  fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: formData.email } });

  describe('Edge Cases', () => {
    test('enforces maximum length on firstName and lastName', () => {
      const longName = 'a'.repeat(51);
      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: longName } });
      expect(screen.getByLabelText(LABELS.firstName)).toHaveValue(longName.slice(0, 50));

      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: longName } });
      expect(screen.getByLabelText(LABELS.lastName)).toHaveValue(longName.slice(0, 50));
    });

    test('handles special characters in firstName and lastName', () => {
      const specialChars = '!@#$%^&*()_+{}|:"<>?';
      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: specialChars } });
      expect(screen.getByLabelText(LABELS.firstName)).toHaveValue(specialChars);

      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: specialChars } });
      expect(screen.getByLabelText(LABELS.lastName)).toHaveValue(specialChars);
    });

    test('displays validation messages for empty submissions', () => {
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(screen.getByText(/Please enter a valid email address/i)).toBeInTheDocument();
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
    });
  });

  describe('Accessibility', () => {
    test('ensures all fields have proper ARIA labels', () => {
      Object.values(LABELS).forEach((labelRegex) => {
        expect(screen.getByLabelText(labelRegex)).toBeInTheDocument();
      });
    });
  });

  describe('CSS Class Changes', () => {
    test('validates CSS class changes for password criteria', () => {
      const password = screen.getByLabelText(LABELS.password);
      fireEvent.change(password, { target: { value: 'short' } });
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
      fireEvent.change(password, { target: { value: 'LongEnough1' } });
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });
  });
  fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: formData.password } });

  describe('Edge Cases', () => {
    test('enforces maximum length on firstName and lastName', () => {
      const longName = 'a'.repeat(51);
      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: longName } });
      expect(screen.getByLabelText(LABELS.firstName)).toHaveValue(longName.slice(0, 50));

      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: longName } });
      expect(screen.getByLabelText(LABELS.lastName)).toHaveValue(longName.slice(0, 50));
    });

    test('handles special characters in firstName and lastName', () => {
      const specialChars = '!@#$%^&*()_+{}|:"<>?';
      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: specialChars } });
      expect(screen.getByLabelText(LABELS.firstName)).toHaveValue(specialChars);

      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: specialChars } });
      expect(screen.getByLabelText(LABELS.lastName)).toHaveValue(specialChars);
    });

    test('displays validation messages for empty submissions', () => {
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(screen.getByText(/Please enter a valid email address/i)).toBeInTheDocument();
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
    });
  });

  describe('Accessibility', () => {
    test('ensures all fields have proper ARIA labels', () => {
      Object.values(LABELS).forEach((labelRegex) => {
        expect(screen.getByLabelText(labelRegex)).toBeInTheDocument();
      });
    });
  });

  describe('CSS Class Changes', () => {
    test('validates CSS class changes for password criteria', () => {
      const password = screen.getByLabelText(LABELS.password);
      fireEvent.change(password, { target: { value: 'short' } });
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
      fireEvent.change(password, { target: { value: 'LongEnough1' } });
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });
  });

  return formData;
};

describe('SignUpForm', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Edge Cases', () => {
    test('enforces maximum length on firstName and lastName', () => {
      const longName = 'a'.repeat(51);
      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: longName } });
      expect(screen.getByLabelText(LABELS.firstName)).toHaveValue(longName.slice(0, 50));

      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: longName } });
      expect(screen.getByLabelText(LABELS.lastName)).toHaveValue(longName.slice(0, 50));
    });

    test('handles special characters in firstName and lastName', () => {
      const specialChars = '!@#$%^&*()_+{}|:"<>?';
      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: specialChars } });
      expect(screen.getByLabelText(LABELS.firstName)).toHaveValue(specialChars);

      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: specialChars } });
      expect(screen.getByLabelText(LABELS.lastName)).toHaveValue(specialChars);
    });

    test('displays validation messages for empty submissions', () => {
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(screen.getByText(/Please enter a valid email address/i)).toBeInTheDocument();
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
    });
  });

  describe('Accessibility', () => {
    test('ensures all fields have proper ARIA labels', () => {
      Object.values(LABELS).forEach((labelRegex) => {
        expect(screen.getByLabelText(labelRegex)).toBeInTheDocument();
      });
    });
  });

  describe('CSS Class Changes', () => {
    test('validates CSS class changes for password criteria', () => {
      const password = screen.getByLabelText(LABELS.password);
      fireEvent.change(password, { target: { value: 'short' } });
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
      fireEvent.change(password, { target: { value: 'LongEnough1' } });
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });
  });

  test('renders the sign-up form with all fields', () => {
    expect(screen.getByLabelText(LABELS.firstName)).toBeInTheDocument();
    expect(screen.getByLabelText(LABELS.lastName)).toBeInTheDocument();
    expect(screen.getByLabelText(LABELS.email)).toBeInTheDocument();
    expect(screen.getByLabelText(LABELS.password)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeInTheDocument();
  });

  describe('Edge Cases', () => {
    test('enforces maximum length on firstName and lastName', () => {
      const longName = 'a'.repeat(51);
      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: longName } });
      expect(screen.getByLabelText(LABELS.firstName)).toHaveValue(longName.slice(0, 50));

      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: longName } });
      expect(screen.getByLabelText(LABELS.lastName)).toHaveValue(longName.slice(0, 50));
    });

    test('handles special characters in firstName and lastName', () => {
      const specialChars = '!@#$%^&*()_+{}|:"<>?';
      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: specialChars } });
      expect(screen.getByLabelText(LABELS.firstName)).toHaveValue(specialChars);

      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: specialChars } });
      expect(screen.getByLabelText(LABELS.lastName)).toHaveValue(specialChars);
    });

    test('displays validation messages for empty submissions', () => {
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(screen.getByText(/Please enter a valid email address/i)).toBeInTheDocument();
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
    });
  });

  describe('Accessibility', () => {
    test('ensures all fields have proper ARIA labels', () => {
      Object.values(LABELS).forEach((labelRegex) => {
        expect(screen.getByLabelText(labelRegex)).toBeInTheDocument();
      });
    });
  });

  describe('CSS Class Changes', () => {
    test('validates CSS class changes for password criteria', () => {
      const password = screen.getByLabelText(LABELS.password);
      fireEvent.change(password, { target: { value: 'short' } });
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
      fireEvent.change(password, { target: { value: 'LongEnough1' } });
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });
  });

  describe('Field Entry', () => {
    test.each(Object.entries(LABELS))('allows entry of %s', (fieldName, labelRegex) => {
      const value = 'TestValue';
      fireEvent.change(screen.getByLabelText(labelRegex), { target: { value } });

  describe('Edge Cases', () => {
    test('enforces maximum length on firstName and lastName', () => {
      const longName = 'a'.repeat(51);
      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: longName } });
      expect(screen.getByLabelText(LABELS.firstName)).toHaveValue(longName.slice(0, 50));

      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: longName } });
      expect(screen.getByLabelText(LABELS.lastName)).toHaveValue(longName.slice(0, 50));
    });

    test('handles special characters in firstName and lastName', () => {
      const specialChars = '!@#$%^&*()_+{}|:"<>?';
      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: specialChars } });
      expect(screen.getByLabelText(LABELS.firstName)).toHaveValue(specialChars);

      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: specialChars } });
      expect(screen.getByLabelText(LABELS.lastName)).toHaveValue(specialChars);
    });

    test('displays validation messages for empty submissions', () => {
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(screen.getByText(/Please enter a valid email address/i)).toBeInTheDocument();
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
    });
  });

  describe('Accessibility', () => {
    test('ensures all fields have proper ARIA labels', () => {
      Object.values(LABELS).forEach((labelRegex) => {
        expect(screen.getByLabelText(labelRegex)).toBeInTheDocument();
      });
    });
  });

  describe('CSS Class Changes', () => {
    test('validates CSS class changes for password criteria', () => {
      const password = screen.getByLabelText(LABELS.password);
      fireEvent.change(password, { target: { value: 'short' } });
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
      fireEvent.change(password, { target: { value: 'LongEnough1' } });
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });
  });
      expect(screen.getByLabelText(labelRegex)).toHaveValue(value);
    });

  describe('Edge Cases', () => {
    test('enforces maximum length on firstName and lastName', () => {
      const longName = 'a'.repeat(51);
      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: longName } });
      expect(screen.getByLabelText(LABELS.firstName)).toHaveValue(longName.slice(0, 50));

      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: longName } });
      expect(screen.getByLabelText(LABELS.lastName)).toHaveValue(longName.slice(0, 50));
    });

    test('handles special characters in firstName and lastName', () => {
      const specialChars = '!@#$%^&*()_+{}|:"<>?';
      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: specialChars } });
      expect(screen.getByLabelText(LABELS.firstName)).toHaveValue(specialChars);

      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: specialChars } });
      expect(screen.getByLabelText(LABELS.lastName)).toHaveValue(specialChars);
    });

    test('displays validation messages for empty submissions', () => {
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(screen.getByText(/Please enter a valid email address/i)).toBeInTheDocument();
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
    });
  });

  describe('Accessibility', () => {
    test('ensures all fields have proper ARIA labels', () => {
      Object.values(LABELS).forEach((labelRegex) => {
        expect(screen.getByLabelText(labelRegex)).toBeInTheDocument();
      });
    });
  });

  describe('CSS Class Changes', () => {
    test('validates CSS class changes for password criteria', () => {
      const password = screen.getByLabelText(LABELS.password);
      fireEvent.change(password, { target: { value: 'short' } });
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
      fireEvent.change(password, { target: { value: 'LongEnough1' } });
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });
  });
  });

  describe('Edge Cases', () => {
    test('enforces maximum length on firstName and lastName', () => {
      const longName = 'a'.repeat(51);
      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: longName } });
      expect(screen.getByLabelText(LABELS.firstName)).toHaveValue(longName.slice(0, 50));

      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: longName } });
      expect(screen.getByLabelText(LABELS.lastName)).toHaveValue(longName.slice(0, 50));
    });

    test('handles special characters in firstName and lastName', () => {
      const specialChars = '!@#$%^&*()_+{}|:"<>?';
      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: specialChars } });
      expect(screen.getByLabelText(LABELS.firstName)).toHaveValue(specialChars);

      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: specialChars } });
      expect(screen.getByLabelText(LABELS.lastName)).toHaveValue(specialChars);
    });

    test('displays validation messages for empty submissions', () => {
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(screen.getByText(/Please enter a valid email address/i)).toBeInTheDocument();
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
    });
  });

  describe('Accessibility', () => {
    test('ensures all fields have proper ARIA labels', () => {
      Object.values(LABELS).forEach((labelRegex) => {
        expect(screen.getByLabelText(labelRegex)).toBeInTheDocument();
      });
    });
  });

  describe('CSS Class Changes', () => {
    test('validates CSS class changes for password criteria', () => {
      const password = screen.getByLabelText(LABELS.password);
      fireEvent.change(password, { target: { value: 'short' } });
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
      fireEvent.change(password, { target: { value: 'LongEnough1' } });
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });
  });

  describe('Form Validation', () => {
    test('validates email format correctly', () => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'invalid' } });

  describe('Edge Cases', () => {
    test('enforces maximum length on firstName and lastName', () => {
      const longName = 'a'.repeat(51);
      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: longName } });
      expect(screen.getByLabelText(LABELS.firstName)).toHaveValue(longName.slice(0, 50));

      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: longName } });
      expect(screen.getByLabelText(LABELS.lastName)).toHaveValue(longName.slice(0, 50));
    });

    test('handles special characters in firstName and lastName', () => {
      const specialChars = '!@#$%^&*()_+{}|:"<>?';
      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: specialChars } });
      expect(screen.getByLabelText(LABELS.firstName)).toHaveValue(specialChars);

      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: specialChars } });
      expect(screen.getByLabelText(LABELS.lastName)).toHaveValue(specialChars);
    });

    test('displays validation messages for empty submissions', () => {
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(screen.getByText(/Please enter a valid email address/i)).toBeInTheDocument();
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
    });
  });

  describe('Accessibility', () => {
    test('ensures all fields have proper ARIA labels', () => {
      Object.values(LABELS).forEach((labelRegex) => {
        expect(screen.getByLabelText(labelRegex)).toBeInTheDocument();
      });
    });
  });

  describe('CSS Class Changes', () => {
    test('validates CSS class changes for password criteria', () => {
      const password = screen.getByLabelText(LABELS.password);
      fireEvent.change(password, { target: { value: 'short' } });
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
      fireEvent.change(password, { target: { value: 'LongEnough1' } });
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });
  });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: VALID_EMAIL } });

  describe('Edge Cases', () => {
    test('enforces maximum length on firstName and lastName', () => {
      const longName = 'a'.repeat(51);
      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: longName } });
      expect(screen.getByLabelText(LABELS.firstName)).toHaveValue(longName.slice(0, 50));

      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: longName } });
      expect(screen.getByLabelText(LABELS.lastName)).toHaveValue(longName.slice(0, 50));
    });

    test('handles special characters in firstName and lastName', () => {
      const specialChars = '!@#$%^&*()_+{}|:"<>?';
      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: specialChars } });
      expect(screen.getByLabelText(LABELS.firstName)).toHaveValue(specialChars);

      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: specialChars } });
      expect(screen.getByLabelText(LABELS.lastName)).toHaveValue(specialChars);
    });

    test('displays validation messages for empty submissions', () => {
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(screen.getByText(/Please enter a valid email address/i)).toBeInTheDocument();
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
    });
  });

  describe('Accessibility', () => {
    test('ensures all fields have proper ARIA labels', () => {
      Object.values(LABELS).forEach((labelRegex) => {
        expect(screen.getByLabelText(labelRegex)).toBeInTheDocument();
      });
    });
  });

  describe('CSS Class Changes', () => {
    test('validates CSS class changes for password criteria', () => {
      const password = screen.getByLabelText(LABELS.password);
      fireEvent.change(password, { target: { value: 'short' } });
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
      fireEvent.change(password, { target: { value: 'LongEnough1' } });
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });
  });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeNull();
    });

  describe('Edge Cases', () => {
    test('enforces maximum length on firstName and lastName', () => {
      const longName = 'a'.repeat(51);
      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: longName } });
      expect(screen.getByLabelText(LABELS.firstName)).toHaveValue(longName.slice(0, 50));

      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: longName } });
      expect(screen.getByLabelText(LABELS.lastName)).toHaveValue(longName.slice(0, 50));
    });

    test('handles special characters in firstName and lastName', () => {
      const specialChars = '!@#$%^&*()_+{}|:"<>?';
      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: specialChars } });
      expect(screen.getByLabelText(LABELS.firstName)).toHaveValue(specialChars);

      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: specialChars } });
      expect(screen.getByLabelText(LABELS.lastName)).toHaveValue(specialChars);
    });

    test('displays validation messages for empty submissions', () => {
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(screen.getByText(/Please enter a valid email address/i)).toBeInTheDocument();
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
    });
  });

  describe('Accessibility', () => {
    test('ensures all fields have proper ARIA labels', () => {
      Object.values(LABELS).forEach((labelRegex) => {
        expect(screen.getByLabelText(labelRegex)).toBeInTheDocument();
      });
    });
  });

  describe('CSS Class Changes', () => {
    test('validates CSS class changes for password criteria', () => {
      const password = screen.getByLabelText(LABELS.password);
      fireEvent.change(password, { target: { value: 'short' } });
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
      fireEvent.change(password, { target: { value: 'LongEnough1' } });
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });
  });

    test('validates password criteria correctly', () => {
      const password = screen.getByLabelText(LABELS.password);
      fireEvent.change(password, { target: { value: 'short' } });

  describe('Edge Cases', () => {
    test('enforces maximum length on firstName and lastName', () => {
      const longName = 'a'.repeat(51);
      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: longName } });
      expect(screen.getByLabelText(LABELS.firstName)).toHaveValue(longName.slice(0, 50));

      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: longName } });
      expect(screen.getByLabelText(LABELS.lastName)).toHaveValue(longName.slice(0, 50));
    });

    test('handles special characters in firstName and lastName', () => {
      const specialChars = '!@#$%^&*()_+{}|:"<>?';
      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: specialChars } });
      expect(screen.getByLabelText(LABELS.firstName)).toHaveValue(specialChars);

      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: specialChars } });
      expect(screen.getByLabelText(LABELS.lastName)).toHaveValue(specialChars);
    });

    test('displays validation messages for empty submissions', () => {
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(screen.getByText(/Please enter a valid email address/i)).toBeInTheDocument();
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
    });
  });

  describe('Accessibility', () => {
    test('ensures all fields have proper ARIA labels', () => {
      Object.values(LABELS).forEach((labelRegex) => {
        expect(screen.getByLabelText(labelRegex)).toBeInTheDocument();
      });
    });
  });

  describe('CSS Class Changes', () => {
    test('validates CSS class changes for password criteria', () => {
      const password = screen.getByLabelText(LABELS.password);
      fireEvent.change(password, { target: { value: 'short' } });
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
      fireEvent.change(password, { target: { value: 'LongEnough1' } });
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });
  });
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
      fireEvent.change(password, { target: { value: 'LongEnough1' } });

  describe('Edge Cases', () => {
    test('enforces maximum length on firstName and lastName', () => {
      const longName = 'a'.repeat(51);
      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: longName } });
      expect(screen.getByLabelText(LABELS.firstName)).toHaveValue(longName.slice(0, 50));

      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: longName } });
      expect(screen.getByLabelText(LABELS.lastName)).toHaveValue(longName.slice(0, 50));
    });

    test('handles special characters in firstName and lastName', () => {
      const specialChars = '!@#$%^&*()_+{}|:"<>?';
      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: specialChars } });
      expect(screen.getByLabelText(LABELS.firstName)).toHaveValue(specialChars);

      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: specialChars } });
      expect(screen.getByLabelText(LABELS.lastName)).toHaveValue(specialChars);
    });

    test('displays validation messages for empty submissions', () => {
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(screen.getByText(/Please enter a valid email address/i)).toBeInTheDocument();
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
    });
  });

  describe('Accessibility', () => {
    test('ensures all fields have proper ARIA labels', () => {
      Object.values(LABELS).forEach((labelRegex) => {
        expect(screen.getByLabelText(labelRegex)).toBeInTheDocument();
      });
    });
  });

  describe('CSS Class Changes', () => {
    test('validates CSS class changes for password criteria', () => {
      const password = screen.getByLabelText(LABELS.password);
      fireEvent.change(password, { target: { value: 'short' } });
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
      fireEvent.change(password, { target: { value: 'LongEnough1' } });
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });
  });
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(/green/);
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
      expect(screen.getByText(/1 number/i).className).toMatch(/green/);
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

  describe('Edge Cases', () => {
    test('enforces maximum length on firstName and lastName', () => {
      const longName = 'a'.repeat(51);
      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: longName } });
      expect(screen.getByLabelText(LABELS.firstName)).toHaveValue(longName.slice(0, 50));

      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: longName } });
      expect(screen.getByLabelText(LABELS.lastName)).toHaveValue(longName.slice(0, 50));
    });

    test('handles special characters in firstName and lastName', () => {
      const specialChars = '!@#$%^&*()_+{}|:"<>?';
      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: specialChars } });
      expect(screen.getByLabelText(LABELS.firstName)).toHaveValue(specialChars);

      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: specialChars } });
      expect(screen.getByLabelText(LABELS.lastName)).toHaveValue(specialChars);
    });

    test('displays validation messages for empty submissions', () => {
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(screen.getByText(/Please enter a valid email address/i)).toBeInTheDocument();
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
    });
  });

  describe('Accessibility', () => {
    test('ensures all fields have proper ARIA labels', () => {
      Object.values(LABELS).forEach((labelRegex) => {
        expect(screen.getByLabelText(labelRegex)).toBeInTheDocument();
      });
    });
  });

  describe('CSS Class Changes', () => {
    test('validates CSS class changes for password criteria', () => {
      const password = screen.getByLabelText(LABELS.password);
      fireEvent.change(password, { target: { value: 'short' } });
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
      fireEvent.change(password, { target: { value: 'LongEnough1' } });
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });
  });
  });

  describe('Edge Cases', () => {
    test('enforces maximum length on firstName and lastName', () => {
      const longName = 'a'.repeat(51);
      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: longName } });
      expect(screen.getByLabelText(LABELS.firstName)).toHaveValue(longName.slice(0, 50));

      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: longName } });
      expect(screen.getByLabelText(LABELS.lastName)).toHaveValue(longName.slice(0, 50));
    });

    test('handles special characters in firstName and lastName', () => {
      const specialChars = '!@#$%^&*()_+{}|:"<>?';
      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: specialChars } });
      expect(screen.getByLabelText(LABELS.firstName)).toHaveValue(specialChars);

      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: specialChars } });
      expect(screen.getByLabelText(LABELS.lastName)).toHaveValue(specialChars);
    });

    test('displays validation messages for empty submissions', () => {
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(screen.getByText(/Please enter a valid email address/i)).toBeInTheDocument();
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
    });
  });

  describe('Accessibility', () => {
    test('ensures all fields have proper ARIA labels', () => {
      Object.values(LABELS).forEach((labelRegex) => {
        expect(screen.getByLabelText(labelRegex)).toBeInTheDocument();
      });
    });
  });

  describe('CSS Class Changes', () => {
    test('validates CSS class changes for password criteria', () => {
      const password = screen.getByLabelText(LABELS.password);
      fireEvent.change(password, { target: { value: 'short' } });
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
      fireEvent.change(password, { target: { value: 'LongEnough1' } });
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });
  });

  describe('Form Submission', () => {
    let consoleSpy;

    beforeEach(() => {
      consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

  describe('Edge Cases', () => {
    test('enforces maximum length on firstName and lastName', () => {
      const longName = 'a'.repeat(51);
      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: longName } });
      expect(screen.getByLabelText(LABELS.firstName)).toHaveValue(longName.slice(0, 50));

      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: longName } });
      expect(screen.getByLabelText(LABELS.lastName)).toHaveValue(longName.slice(0, 50));
    });

    test('handles special characters in firstName and lastName', () => {
      const specialChars = '!@#$%^&*()_+{}|:"<>?';
      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: specialChars } });
      expect(screen.getByLabelText(LABELS.firstName)).toHaveValue(specialChars);

      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: specialChars } });
      expect(screen.getByLabelText(LABELS.lastName)).toHaveValue(specialChars);
    });

    test('displays validation messages for empty submissions', () => {
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(screen.getByText(/Please enter a valid email address/i)).toBeInTheDocument();
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
    });
  });

  describe('Accessibility', () => {
    test('ensures all fields have proper ARIA labels', () => {
      Object.values(LABELS).forEach((labelRegex) => {
        expect(screen.getByLabelText(labelRegex)).toBeInTheDocument();
      });
    });
  });

  describe('CSS Class Changes', () => {
    test('validates CSS class changes for password criteria', () => {
      const password = screen.getByLabelText(LABELS.password);
      fireEvent.change(password, { target: { value: 'short' } });
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
      fireEvent.change(password, { target: { value: 'LongEnough1' } });
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });
  });
    });

  describe('Edge Cases', () => {
    test('enforces maximum length on firstName and lastName', () => {
      const longName = 'a'.repeat(51);
      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: longName } });
      expect(screen.getByLabelText(LABELS.firstName)).toHaveValue(longName.slice(0, 50));

      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: longName } });
      expect(screen.getByLabelText(LABELS.lastName)).toHaveValue(longName.slice(0, 50));
    });

    test('handles special characters in firstName and lastName', () => {
      const specialChars = '!@#$%^&*()_+{}|:"<>?';
      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: specialChars } });
      expect(screen.getByLabelText(LABELS.firstName)).toHaveValue(specialChars);

      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: specialChars } });
      expect(screen.getByLabelText(LABELS.lastName)).toHaveValue(specialChars);
    });

    test('displays validation messages for empty submissions', () => {
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(screen.getByText(/Please enter a valid email address/i)).toBeInTheDocument();
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
    });
  });

  describe('Accessibility', () => {
    test('ensures all fields have proper ARIA labels', () => {
      Object.values(LABELS).forEach((labelRegex) => {
        expect(screen.getByLabelText(labelRegex)).toBeInTheDocument();
      });
    });
  });

  describe('CSS Class Changes', () => {
    test('validates CSS class changes for password criteria', () => {
      const password = screen.getByLabelText(LABELS.password);
      fireEvent.change(password, { target: { value: 'short' } });
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
      fireEvent.change(password, { target: { value: 'LongEnough1' } });
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });
  });

    afterEach(() => {
      consoleSpy.mockRestore();
    });

  describe('Edge Cases', () => {
    test('enforces maximum length on firstName and lastName', () => {
      const longName = 'a'.repeat(51);
      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: longName } });
      expect(screen.getByLabelText(LABELS.firstName)).toHaveValue(longName.slice(0, 50));

      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: longName } });
      expect(screen.getByLabelText(LABELS.lastName)).toHaveValue(longName.slice(0, 50));
    });

    test('handles special characters in firstName and lastName', () => {
      const specialChars = '!@#$%^&*()_+{}|:"<>?';
      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: specialChars } });
      expect(screen.getByLabelText(LABELS.firstName)).toHaveValue(specialChars);

      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: specialChars } });
      expect(screen.getByLabelText(LABELS.lastName)).toHaveValue(specialChars);
    });

    test('displays validation messages for empty submissions', () => {
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(screen.getByText(/Please enter a valid email address/i)).toBeInTheDocument();
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
    });
  });

  describe('Accessibility', () => {
    test('ensures all fields have proper ARIA labels', () => {
      Object.values(LABELS).forEach((labelRegex) => {
        expect(screen.getByLabelText(labelRegex)).toBeInTheDocument();
      });
    });
  });

  describe('CSS Class Changes', () => {
    test('validates CSS class changes for password criteria', () => {
      const password = screen.getByLabelText(LABELS.password);
      fireEvent.change(password, { target: { value: 'short' } });
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
      fireEvent.change(password, { target: { value: 'LongEnough1' } });
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });
  });

    test('enables Create Account button with valid form', () => {
      fillOutForm();
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).not.toBeDisabled();
    });

  describe('Edge Cases', () => {
    test('enforces maximum length on firstName and lastName', () => {
      const longName = 'a'.repeat(51);
      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: longName } });
      expect(screen.getByLabelText(LABELS.firstName)).toHaveValue(longName.slice(0, 50));

      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: longName } });
      expect(screen.getByLabelText(LABELS.lastName)).toHaveValue(longName.slice(0, 50));
    });

    test('handles special characters in firstName and lastName', () => {
      const specialChars = '!@#$%^&*()_+{}|:"<>?';
      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: specialChars } });
      expect(screen.getByLabelText(LABELS.firstName)).toHaveValue(specialChars);

      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: specialChars } });
      expect(screen.getByLabelText(LABELS.lastName)).toHaveValue(specialChars);
    });

    test('displays validation messages for empty submissions', () => {
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(screen.getByText(/Please enter a valid email address/i)).toBeInTheDocument();
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
    });
  });

  describe('Accessibility', () => {
    test('ensures all fields have proper ARIA labels', () => {
      Object.values(LABELS).forEach((labelRegex) => {
        expect(screen.getByLabelText(labelRegex)).toBeInTheDocument();
      });
    });
  });

  describe('CSS Class Changes', () => {
    test('validates CSS class changes for password criteria', () => {
      const password = screen.getByLabelText(LABELS.password);
      fireEvent.change(password, { target: { value: 'short' } });
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
      fireEvent.change(password, { target: { value: 'LongEnough1' } });
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });
  });

    test('disables Create Account button with invalid form', () => {
      fillOutForm({ firstName: '' });

  describe('Edge Cases', () => {
    test('enforces maximum length on firstName and lastName', () => {
      const longName = 'a'.repeat(51);
      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: longName } });
      expect(screen.getByLabelText(LABELS.firstName)).toHaveValue(longName.slice(0, 50));

      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: longName } });
      expect(screen.getByLabelText(LABELS.lastName)).toHaveValue(longName.slice(0, 50));
    });

    test('handles special characters in firstName and lastName', () => {
      const specialChars = '!@#$%^&*()_+{}|:"<>?';
      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: specialChars } });
      expect(screen.getByLabelText(LABELS.firstName)).toHaveValue(specialChars);

      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: specialChars } });
      expect(screen.getByLabelText(LABELS.lastName)).toHaveValue(specialChars);
    });

    test('displays validation messages for empty submissions', () => {
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(screen.getByText(/Please enter a valid email address/i)).toBeInTheDocument();
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
    });
  });

  describe('Accessibility', () => {
    test('ensures all fields have proper ARIA labels', () => {
      Object.values(LABELS).forEach((labelRegex) => {
        expect(screen.getByLabelText(labelRegex)).toBeInTheDocument();
      });
    });
  });

  describe('CSS Class Changes', () => {
    test('validates CSS class changes for password criteria', () => {
      const password = screen.getByLabelText(LABELS.password);
      fireEvent.change(password, { target: { value: 'short' } });
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
      fireEvent.change(password, { target: { value: 'LongEnough1' } });
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });
  }); // Explicitly set an invalid field
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

  describe('Edge Cases', () => {
    test('enforces maximum length on firstName and lastName', () => {
      const longName = 'a'.repeat(51);
      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: longName } });
      expect(screen.getByLabelText(LABELS.firstName)).toHaveValue(longName.slice(0, 50));

      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: longName } });
      expect(screen.getByLabelText(LABELS.lastName)).toHaveValue(longName.slice(0, 50));
    });

    test('handles special characters in firstName and lastName', () => {
      const specialChars = '!@#$%^&*()_+{}|:"<>?';
      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: specialChars } });
      expect(screen.getByLabelText(LABELS.firstName)).toHaveValue(specialChars);

      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: specialChars } });
      expect(screen.getByLabelText(LABELS.lastName)).toHaveValue(specialChars);
    });

    test('displays validation messages for empty submissions', () => {
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(screen.getByText(/Please enter a valid email address/i)).toBeInTheDocument();
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
    });
  });

  describe('Accessibility', () => {
    test('ensures all fields have proper ARIA labels', () => {
      Object.values(LABELS).forEach((labelRegex) => {
        expect(screen.getByLabelText(labelRegex)).toBeInTheDocument();
      });
    });
  });

  describe('CSS Class Changes', () => {
    test('validates CSS class changes for password criteria', () => {
      const password = screen.getByLabelText(LABELS.password);
      fireEvent.change(password, { target: { value: 'short' } });
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
      fireEvent.change(password, { target: { value: 'LongEnough1' } });
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });
  });

    test('calls console log with correct data on valid form submission', () => {
      const formData = fillOutForm();
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(consoleSpy).toHaveBeenLastCalledWith('Form submitted:', formData);
    });

  describe('Edge Cases', () => {
    test('enforces maximum length on firstName and lastName', () => {
      const longName = 'a'.repeat(51);
      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: longName } });
      expect(screen.getByLabelText(LABELS.firstName)).toHaveValue(longName.slice(0, 50));

      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: longName } });
      expect(screen.getByLabelText(LABELS.lastName)).toHaveValue(longName.slice(0, 50));
    });

    test('handles special characters in firstName and lastName', () => {
      const specialChars = '!@#$%^&*()_+{}|:"<>?';
      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: specialChars } });
      expect(screen.getByLabelText(LABELS.firstName)).toHaveValue(specialChars);

      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: specialChars } });
      expect(screen.getByLabelText(LABELS.lastName)).toHaveValue(specialChars);
    });

    test('displays validation messages for empty submissions', () => {
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(screen.getByText(/Please enter a valid email address/i)).toBeInTheDocument();
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
    });
  });

  describe('Accessibility', () => {
    test('ensures all fields have proper ARIA labels', () => {
      Object.values(LABELS).forEach((labelRegex) => {
        expect(screen.getByLabelText(labelRegex)).toBeInTheDocument();
      });
    });
  });

  describe('CSS Class Changes', () => {
    test('validates CSS class changes for password criteria', () => {
      const password = screen.getByLabelText(LABELS.password);
      fireEvent.change(password, { target: { value: 'short' } });
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
      fireEvent.change(password, { target: { value: 'LongEnough1' } });
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });
  });
  });

  describe('Edge Cases', () => {
    test('enforces maximum length on firstName and lastName', () => {
      const longName = 'a'.repeat(51);
      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: longName } });
      expect(screen.getByLabelText(LABELS.firstName)).toHaveValue(longName.slice(0, 50));

      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: longName } });
      expect(screen.getByLabelText(LABELS.lastName)).toHaveValue(longName.slice(0, 50));
    });

    test('handles special characters in firstName and lastName', () => {
      const specialChars = '!@#$%^&*()_+{}|:"<>?';
      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: specialChars } });
      expect(screen.getByLabelText(LABELS.firstName)).toHaveValue(specialChars);

      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: specialChars } });
      expect(screen.getByLabelText(LABELS.lastName)).toHaveValue(specialChars);
    });

    test('displays validation messages for empty submissions', () => {
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(screen.getByText(/Please enter a valid email address/i)).toBeInTheDocument();
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
    });
  });

  describe('Accessibility', () => {
    test('ensures all fields have proper ARIA labels', () => {
      Object.values(LABELS).forEach((labelRegex) => {
        expect(screen.getByLabelText(labelRegex)).toBeInTheDocument();
      });
    });
  });

  describe('CSS Class Changes', () => {
    test('validates CSS class changes for password criteria', () => {
      const password = screen.getByLabelText(LABELS.password);
      fireEvent.change(password, { target: { value: 'short' } });
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
      fireEvent.change(password, { target: { value: 'LongEnough1' } });
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });
  });
});

  describe('Edge Cases', () => {
    test('enforces maximum length on firstName and lastName', () => {
      const longName = 'a'.repeat(51);
      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: longName } });
      expect(screen.getByLabelText(LABELS.firstName)).toHaveValue(longName.slice(0, 50));

      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: longName } });
      expect(screen.getByLabelText(LABELS.lastName)).toHaveValue(longName.slice(0, 50));
    });

    test('handles special characters in firstName and lastName', () => {
      const specialChars = '!@#$%^&*()_+{}|:"<>?';
      fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: specialChars } });
      expect(screen.getByLabelText(LABELS.firstName)).toHaveValue(specialChars);

      fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: specialChars } });
      expect(screen.getByLabelText(LABELS.lastName)).toHaveValue(specialChars);
    });

    test('displays validation messages for empty submissions', () => {
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(screen.getByText(/Please enter a valid email address/i)).toBeInTheDocument();
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
    });
  });

  describe('Accessibility', () => {
    test('ensures all fields have proper ARIA labels', () => {
      Object.values(LABELS).forEach((labelRegex) => {
        expect(screen.getByLabelText(labelRegex)).toBeInTheDocument();
      });
    });
  });

  describe('CSS Class Changes', () => {
    test('validates CSS class changes for password criteria', () => {
      const password = screen.getByLabelText(LABELS.password);
      fireEvent.change(password, { target: { value: 'short' } });
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
      fireEvent.change(password, { target: { value: 'LongEnough1' } });
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });
  });
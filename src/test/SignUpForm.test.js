import { render, screen, fireEvent } from '@testing-library/react';
import SignUpForm from '../SignUpForm';

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

// Additional test cases to improve coverage
describe('SignUpForm - Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Field Validation Messages', () => {
    test('displays required field message for empty firstName', () => {
      fireEvent.blur(screen.getByLabelText(LABELS.firstName));
      expect(screen.getByText(/First Name is required/i)).toBeInTheDocument();
    });

    test('displays required field message for empty lastName', () => {
      fireEvent.blur(screen.getByLabelText(LABELS.lastName));
      expect(screen.getByText(/Last Name is required/i)).toBeInTheDocument();
    });

    test('displays required field message for empty email', () => {
      fireEvent.blur(screen.getByLabelText(LABELS.email));
      expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
    });

    test('displays required field message for empty password', () => {
      fireEvent.blur(screen.getByLabelText(LABELS.password));
      expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
    });
  });

  describe('Invalid Form Submission', () => {
    let consoleSpy;

    beforeEach(() => {
      consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterEach(() => {
      consoleSpy.mockRestore();
    });

    test('does not call console log on invalid form submission', () => {
      fillOutForm({ email: 'invalidemail' }); // Explicitly set an invalid email
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(consoleSpy).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    test('form elements are associated with labels', () => {
      expect(screen.getByLabelText(LABELS.firstName)).toBeVisible();
      expect(screen.getByLabelText(LABELS.lastName)).toBeVisible();
      expect(screen.getByLabelText(LABELS.email)).toBeVisible();
      expect(screen.getByLabelText(LABELS.password)).toBeVisible();
    });
  });
});
  fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: formData.lastName } });

// Additional test cases to improve coverage
describe('SignUpForm - Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Field Validation Messages', () => {
    test('displays required field message for empty firstName', () => {
      fireEvent.blur(screen.getByLabelText(LABELS.firstName));
      expect(screen.getByText(/First Name is required/i)).toBeInTheDocument();
    });

    test('displays required field message for empty lastName', () => {
      fireEvent.blur(screen.getByLabelText(LABELS.lastName));
      expect(screen.getByText(/Last Name is required/i)).toBeInTheDocument();
    });

    test('displays required field message for empty email', () => {
      fireEvent.blur(screen.getByLabelText(LABELS.email));
      expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
    });

    test('displays required field message for empty password', () => {
      fireEvent.blur(screen.getByLabelText(LABELS.password));
      expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
    });
  });

  describe('Invalid Form Submission', () => {
    let consoleSpy;

    beforeEach(() => {
      consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterEach(() => {
      consoleSpy.mockRestore();
    });

    test('does not call console log on invalid form submission', () => {
      fillOutForm({ email: 'invalidemail' }); // Explicitly set an invalid email
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(consoleSpy).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    test('form elements are associated with labels', () => {
      expect(screen.getByLabelText(LABELS.firstName)).toBeVisible();
      expect(screen.getByLabelText(LABELS.lastName)).toBeVisible();
      expect(screen.getByLabelText(LABELS.email)).toBeVisible();
      expect(screen.getByLabelText(LABELS.password)).toBeVisible();
    });
  });
});
  fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: formData.email } });

// Additional test cases to improve coverage
describe('SignUpForm - Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Field Validation Messages', () => {
    test('displays required field message for empty firstName', () => {
      fireEvent.blur(screen.getByLabelText(LABELS.firstName));
      expect(screen.getByText(/First Name is required/i)).toBeInTheDocument();
    });

    test('displays required field message for empty lastName', () => {
      fireEvent.blur(screen.getByLabelText(LABELS.lastName));
      expect(screen.getByText(/Last Name is required/i)).toBeInTheDocument();
    });

    test('displays required field message for empty email', () => {
      fireEvent.blur(screen.getByLabelText(LABELS.email));
      expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
    });

    test('displays required field message for empty password', () => {
      fireEvent.blur(screen.getByLabelText(LABELS.password));
      expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
    });
  });

  describe('Invalid Form Submission', () => {
    let consoleSpy;

    beforeEach(() => {
      consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterEach(() => {
      consoleSpy.mockRestore();
    });

    test('does not call console log on invalid form submission', () => {
      fillOutForm({ email: 'invalidemail' }); // Explicitly set an invalid email
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(consoleSpy).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    test('form elements are associated with labels', () => {
      expect(screen.getByLabelText(LABELS.firstName)).toBeVisible();
      expect(screen.getByLabelText(LABELS.lastName)).toBeVisible();
      expect(screen.getByLabelText(LABELS.email)).toBeVisible();
      expect(screen.getByLabelText(LABELS.password)).toBeVisible();
    });
  });
});
  fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: formData.password } });

// Additional test cases to improve coverage
describe('SignUpForm - Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Field Validation Messages', () => {
    test('displays required field message for empty firstName', () => {
      fireEvent.blur(screen.getByLabelText(LABELS.firstName));
      expect(screen.getByText(/First Name is required/i)).toBeInTheDocument();
    });

    test('displays required field message for empty lastName', () => {
      fireEvent.blur(screen.getByLabelText(LABELS.lastName));
      expect(screen.getByText(/Last Name is required/i)).toBeInTheDocument();
    });

    test('displays required field message for empty email', () => {
      fireEvent.blur(screen.getByLabelText(LABELS.email));
      expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
    });

    test('displays required field message for empty password', () => {
      fireEvent.blur(screen.getByLabelText(LABELS.password));
      expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
    });
  });

  describe('Invalid Form Submission', () => {
    let consoleSpy;

    beforeEach(() => {
      consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterEach(() => {
      consoleSpy.mockRestore();
    });

    test('does not call console log on invalid form submission', () => {
      fillOutForm({ email: 'invalidemail' }); // Explicitly set an invalid email
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(consoleSpy).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    test('form elements are associated with labels', () => {
      expect(screen.getByLabelText(LABELS.firstName)).toBeVisible();
      expect(screen.getByLabelText(LABELS.lastName)).toBeVisible();
      expect(screen.getByLabelText(LABELS.email)).toBeVisible();
      expect(screen.getByLabelText(LABELS.password)).toBeVisible();
    });
  });
});

  return formData;
};

describe('SignUpForm', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

// Additional test cases to improve coverage
describe('SignUpForm - Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Field Validation Messages', () => {
    test('displays required field message for empty firstName', () => {
      fireEvent.blur(screen.getByLabelText(LABELS.firstName));
      expect(screen.getByText(/First Name is required/i)).toBeInTheDocument();
    });

    test('displays required field message for empty lastName', () => {
      fireEvent.blur(screen.getByLabelText(LABELS.lastName));
      expect(screen.getByText(/Last Name is required/i)).toBeInTheDocument();
    });

    test('displays required field message for empty email', () => {
      fireEvent.blur(screen.getByLabelText(LABELS.email));
      expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
    });

    test('displays required field message for empty password', () => {
      fireEvent.blur(screen.getByLabelText(LABELS.password));
      expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
    });
  });

  describe('Invalid Form Submission', () => {
    let consoleSpy;

    beforeEach(() => {
      consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterEach(() => {
      consoleSpy.mockRestore();
    });

    test('does not call console log on invalid form submission', () => {
      fillOutForm({ email: 'invalidemail' }); // Explicitly set an invalid email
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(consoleSpy).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    test('form elements are associated with labels', () => {
      expect(screen.getByLabelText(LABELS.firstName)).toBeVisible();
      expect(screen.getByLabelText(LABELS.lastName)).toBeVisible();
      expect(screen.getByLabelText(LABELS.email)).toBeVisible();
      expect(screen.getByLabelText(LABELS.password)).toBeVisible();
    });
  });
});

  test('renders the sign-up form with all fields', () => {
    expect(screen.getByLabelText(LABELS.firstName)).toBeInTheDocument();
    expect(screen.getByLabelText(LABELS.lastName)).toBeInTheDocument();
    expect(screen.getByLabelText(LABELS.email)).toBeInTheDocument();
    expect(screen.getByLabelText(LABELS.password)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeInTheDocument();
  });

// Additional test cases to improve coverage
describe('SignUpForm - Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Field Validation Messages', () => {
    test('displays required field message for empty firstName', () => {
      fireEvent.blur(screen.getByLabelText(LABELS.firstName));
      expect(screen.getByText(/First Name is required/i)).toBeInTheDocument();
    });

    test('displays required field message for empty lastName', () => {
      fireEvent.blur(screen.getByLabelText(LABELS.lastName));
      expect(screen.getByText(/Last Name is required/i)).toBeInTheDocument();
    });

    test('displays required field message for empty email', () => {
      fireEvent.blur(screen.getByLabelText(LABELS.email));
      expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
    });

    test('displays required field message for empty password', () => {
      fireEvent.blur(screen.getByLabelText(LABELS.password));
      expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
    });
  });

  describe('Invalid Form Submission', () => {
    let consoleSpy;

    beforeEach(() => {
      consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterEach(() => {
      consoleSpy.mockRestore();
    });

    test('does not call console log on invalid form submission', () => {
      fillOutForm({ email: 'invalidemail' }); // Explicitly set an invalid email
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(consoleSpy).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    test('form elements are associated with labels', () => {
      expect(screen.getByLabelText(LABELS.firstName)).toBeVisible();
      expect(screen.getByLabelText(LABELS.lastName)).toBeVisible();
      expect(screen.getByLabelText(LABELS.email)).toBeVisible();
      expect(screen.getByLabelText(LABELS.password)).toBeVisible();
    });
  });
});

  describe('Field Entry', () => {
    test.each(Object.entries(LABELS))('allows entry of %s', (fieldName, labelRegex) => {
      const value = 'TestValue';
      fireEvent.change(screen.getByLabelText(labelRegex), { target: { value } });

// Additional test cases to improve coverage
describe('SignUpForm - Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Field Validation Messages', () => {
    test('displays required field message for empty firstName', () => {
      fireEvent.blur(screen.getByLabelText(LABELS.firstName));
      expect(screen.getByText(/First Name is required/i)).toBeInTheDocument();
    });

    test('displays required field message for empty lastName', () => {
      fireEvent.blur(screen.getByLabelText(LABELS.lastName));
      expect(screen.getByText(/Last Name is required/i)).toBeInTheDocument();
    });

    test('displays required field message for empty email', () => {
      fireEvent.blur(screen.getByLabelText(LABELS.email));
      expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
    });

    test('displays required field message for empty password', () => {
      fireEvent.blur(screen.getByLabelText(LABELS.password));
      expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
    });
  });

  describe('Invalid Form Submission', () => {
    let consoleSpy;

    beforeEach(() => {
      consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterEach(() => {
      consoleSpy.mockRestore();
    });

    test('does not call console log on invalid form submission', () => {
      fillOutForm({ email: 'invalidemail' }); // Explicitly set an invalid email
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(consoleSpy).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    test('form elements are associated with labels', () => {
      expect(screen.getByLabelText(LABELS.firstName)).toBeVisible();
      expect(screen.getByLabelText(LABELS.lastName)).toBeVisible();
      expect(screen.getByLabelText(LABELS.email)).toBeVisible();
      expect(screen.getByLabelText(LABELS.password)).toBeVisible();
    });
  });
});
      expect(screen.getByLabelText(labelRegex)).toHaveValue(value);
    });

// Additional test cases to improve coverage
describe('SignUpForm - Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Field Validation Messages', () => {
    test('displays required field message for empty firstName', () => {
      fireEvent.blur(screen.getByLabelText(LABELS.firstName));
      expect(screen.getByText(/First Name is required/i)).toBeInTheDocument();
    });

    test('displays required field message for empty lastName', () => {
      fireEvent.blur(screen.getByLabelText(LABELS.lastName));
      expect(screen.getByText(/Last Name is required/i)).toBeInTheDocument();
    });

    test('displays required field message for empty email', () => {
      fireEvent.blur(screen.getByLabelText(LABELS.email));
      expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
    });

    test('displays required field message for empty password', () => {
      fireEvent.blur(screen.getByLabelText(LABELS.password));
      expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
    });
  });

  describe('Invalid Form Submission', () => {
    let consoleSpy;

    beforeEach(() => {
      consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterEach(() => {
      consoleSpy.mockRestore();
    });

    test('does not call console log on invalid form submission', () => {
      fillOutForm({ email: 'invalidemail' }); // Explicitly set an invalid email
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(consoleSpy).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    test('form elements are associated with labels', () => {
      expect(screen.getByLabelText(LABELS.firstName)).toBeVisible();
      expect(screen.getByLabelText(LABELS.lastName)).toBeVisible();
      expect(screen.getByLabelText(LABELS.email)).toBeVisible();
      expect(screen.getByLabelText(LABELS.password)).toBeVisible();
    });
  });
});
  });

// Additional test cases to improve coverage
describe('SignUpForm - Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Field Validation Messages', () => {
    test('displays required field message for empty firstName', () => {
      fireEvent.blur(screen.getByLabelText(LABELS.firstName));
      expect(screen.getByText(/First Name is required/i)).toBeInTheDocument();
    });

    test('displays required field message for empty lastName', () => {
      fireEvent.blur(screen.getByLabelText(LABELS.lastName));
      expect(screen.getByText(/Last Name is required/i)).toBeInTheDocument();
    });

    test('displays required field message for empty email', () => {
      fireEvent.blur(screen.getByLabelText(LABELS.email));
      expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
    });

    test('displays required field message for empty password', () => {
      fireEvent.blur(screen.getByLabelText(LABELS.password));
      expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
    });
  });

  describe('Invalid Form Submission', () => {
    let consoleSpy;

    beforeEach(() => {
      consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterEach(() => {
      consoleSpy.mockRestore();
    });

    test('does not call console log on invalid form submission', () => {
      fillOutForm({ email: 'invalidemail' }); // Explicitly set an invalid email
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(consoleSpy).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    test('form elements are associated with labels', () => {
      expect(screen.getByLabelText(LABELS.firstName)).toBeVisible();
      expect(screen.getByLabelText(LABELS.lastName)).toBeVisible();
      expect(screen.getByLabelText(LABELS.email)).toBeVisible();
      expect(screen.getByLabelText(LABELS.password)).toBeVisible();
    });
  });
});

  describe('Form Validation', () => {
    test('validates email format correctly', () => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'invalid' } });

// Additional test cases to improve coverage
describe('SignUpForm - Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Field Validation Messages', () => {
    test('displays required field message for empty firstName', () => {
      fireEvent.blur(screen.getByLabelText(LABELS.firstName));
      expect(screen.getByText(/First Name is required/i)).toBeInTheDocument();
    });

    test('displays required field message for empty lastName', () => {
      fireEvent.blur(screen.getByLabelText(LABELS.lastName));
      expect(screen.getByText(/Last Name is required/i)).toBeInTheDocument();
    });

    test('displays required field message for empty email', () => {
      fireEvent.blur(screen.getByLabelText(LABELS.email));
      expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
    });

    test('displays required field message for empty password', () => {
      fireEvent.blur(screen.getByLabelText(LABELS.password));
      expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
    });
  });

  describe('Invalid Form Submission', () => {
    let consoleSpy;

    beforeEach(() => {
      consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterEach(() => {
      consoleSpy.mockRestore();
    });

    test('does not call console log on invalid form submission', () => {
      fillOutForm({ email: 'invalidemail' }); // Explicitly set an invalid email
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(consoleSpy).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    test('form elements are associated with labels', () => {
      expect(screen.getByLabelText(LABELS.firstName)).toBeVisible();
      expect(screen.getByLabelText(LABELS.lastName)).toBeVisible();
      expect(screen.getByLabelText(LABELS.email)).toBeVisible();
      expect(screen.getByLabelText(LABELS.password)).toBeVisible();
    });
  });
});
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: VALID_EMAIL } });

// Additional test cases to improve coverage
describe('SignUpForm - Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Field Validation Messages', () => {
    test('displays required field message for empty firstName', () => {
      fireEvent.blur(screen.getByLabelText(LABELS.firstName));
      expect(screen.getByText(/First Name is required/i)).toBeInTheDocument();
    });

    test('displays required field message for empty lastName', () => {
      fireEvent.blur(screen.getByLabelText(LABELS.lastName));
      expect(screen.getByText(/Last Name is required/i)).toBeInTheDocument();
    });

    test('displays required field message for empty email', () => {
      fireEvent.blur(screen.getByLabelText(LABELS.email));
      expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
    });

    test('displays required field message for empty password', () => {
      fireEvent.blur(screen.getByLabelText(LABELS.password));
      expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
    });
  });

  describe('Invalid Form Submission', () => {
    let consoleSpy;

    beforeEach(() => {
      consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterEach(() => {
      consoleSpy.mockRestore();
    });

    test('does not call console log on invalid form submission', () => {
      fillOutForm({ email: 'invalidemail' }); // Explicitly set an invalid email
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(consoleSpy).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    test('form elements are associated with labels', () => {
      expect(screen.getByLabelText(LABELS.firstName)).toBeVisible();
      expect(screen.getByLabelText(LABELS.lastName)).toBeVisible();
      expect(screen.getByLabelText(LABELS.email)).toBeVisible();
      expect(screen.getByLabelText(LABELS.password)).toBeVisible();
    });
  });
});
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeNull();
    });

// Additional test cases to improve coverage
describe('SignUpForm - Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Field Validation Messages', () => {
    test('displays required field message for empty firstName', () => {
      fireEvent.blur(screen.getByLabelText(LABELS.firstName));
      expect(screen.getByText(/First Name is required/i)).toBeInTheDocument();
    });

    test('displays required field message for empty lastName', () => {
      fireEvent.blur(screen.getByLabelText(LABELS.lastName));
      expect(screen.getByText(/Last Name is required/i)).toBeInTheDocument();
    });

    test('displays required field message for empty email', () => {
      fireEvent.blur(screen.getByLabelText(LABELS.email));
      expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
    });

    test('displays required field message for empty password', () => {
      fireEvent.blur(screen.getByLabelText(LABELS.password));
      expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
    });
  });

  describe('Invalid Form Submission', () => {
    let consoleSpy;

    beforeEach(() => {
      consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterEach(() => {
      consoleSpy.mockRestore();
    });

    test('does not call console log on invalid form submission', () => {
      fillOutForm({ email: 'invalidemail' }); // Explicitly set an invalid email
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(consoleSpy).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    test('form elements are associated with labels', () => {
      expect(screen.getByLabelText(LABELS.firstName)).toBeVisible();
      expect(screen.getByLabelText(LABELS.lastName)).toBeVisible();
      expect(screen.getByLabelText(LABELS.email)).toBeVisible();
      expect(screen.getByLabelText(LABELS.password)).toBeVisible();
    });
  });
});

    test('validates password criteria correctly', () => {
      const password = screen.getByLabelText(LABELS.password);
      fireEvent.change(password, { target: { value: 'short' } });

// Additional test cases to improve coverage
describe('SignUpForm - Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Field Validation Messages', () => {
    test('displays required field message for empty firstName', () => {
      fireEvent.blur(screen.getByLabelText(LABELS.firstName));
      expect(screen.getByText(/First Name is required/i)).toBeInTheDocument();
    });

    test('displays required field message for empty lastName', () => {
      fireEvent.blur(screen.getByLabelText(LABELS.lastName));
      expect(screen.getByText(/Last Name is required/i)).toBeInTheDocument();
    });

    test('displays required field message for empty email', () => {
      fireEvent.blur(screen.getByLabelText(LABELS.email));
      expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
    });

    test('displays required field message for empty password', () => {
      fireEvent.blur(screen.getByLabelText(LABELS.password));
      expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
    });
  });

  describe('Invalid Form Submission', () => {
    let consoleSpy;

    beforeEach(() => {
      consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterEach(() => {
      consoleSpy.mockRestore();
    });

    test('does not call console log on invalid form submission', () => {
      fillOutForm({ email: 'invalidemail' }); // Explicitly set an invalid email
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(consoleSpy).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    test('form elements are associated with labels', () => {
      expect(screen.getByLabelText(LABELS.firstName)).toBeVisible();
      expect(screen.getByLabelText(LABELS.lastName)).toBeVisible();
      expect(screen.getByLabelText(LABELS.email)).toBeVisible();
      expect(screen.getByLabelText(LABELS.password)).toBeVisible();
    });
  });
});
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
      fireEvent.change(password, { target: { value: 'LongEnough1' } });

// Additional test cases to improve coverage
describe('SignUpForm - Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Field Validation Messages', () => {
    test('displays required field message for empty firstName', () => {
      fireEvent.blur(screen.getByLabelText(LABELS.firstName));
      expect(screen.getByText(/First Name is required/i)).toBeInTheDocument();
    });

    test('displays required field message for empty lastName', () => {
      fireEvent.blur(screen.getByLabelText(LABELS.lastName));
      expect(screen.getByText(/Last Name is required/i)).toBeInTheDocument();
    });

    test('displays required field message for empty email', () => {
      fireEvent.blur(screen.getByLabelText(LABELS.email));
      expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
    });

    test('displays required field message for empty password', () => {
      fireEvent.blur(screen.getByLabelText(LABELS.password));
      expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
    });
  });

  describe('Invalid Form Submission', () => {
    let consoleSpy;

    beforeEach(() => {
      consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterEach(() => {
      consoleSpy.mockRestore();
    });

    test('does not call console log on invalid form submission', () => {
      fillOutForm({ email: 'invalidemail' }); // Explicitly set an invalid email
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(consoleSpy).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    test('form elements are associated with labels', () => {
      expect(screen.getByLabelText(LABELS.firstName)).toBeVisible();
      expect(screen.getByLabelText(LABELS.lastName)).toBeVisible();
      expect(screen.getByLabelText(LABELS.email)).toBeVisible();
      expect(screen.getByLabelText(LABELS.password)).toBeVisible();
    });
  });
});
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(/green/);
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
      expect(screen.getByText(/1 number/i).className).toMatch(/green/);
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });

// Additional test cases to improve coverage
describe('SignUpForm - Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Field Validation Messages', () => {
    test('displays required field message for empty firstName', () => {
      fireEvent.blur(screen.getByLabelText(LABELS.firstName));
      expect(screen.getByText(/First Name is required/i)).toBeInTheDocument();
    });

    test('displays required field message for empty lastName', () => {
      fireEvent.blur(screen.getByLabelText(LABELS.lastName));
      expect(screen.getByText(/Last Name is required/i)).toBeInTheDocument();
    });

    test('displays required field message for empty email', () => {
      fireEvent.blur(screen.getByLabelText(LABELS.email));
      expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
    });

    test('displays required field message for empty password', () => {
      fireEvent.blur(screen.getByLabelText(LABELS.password));
      expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
    });
  });

  describe('Invalid Form Submission', () => {
    let consoleSpy;

    beforeEach(() => {
      consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterEach(() => {
      consoleSpy.mockRestore();
    });

    test('does not call console log on invalid form submission', () => {
      fillOutForm({ email: 'invalidemail' }); // Explicitly set an invalid email
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(consoleSpy).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    test('form elements are associated with labels', () => {
      expect(screen.getByLabelText(LABELS.firstName)).toBeVisible();
      expect(screen.getByLabelText(LABELS.lastName)).toBeVisible();
      expect(screen.getByLabelText(LABELS.email)).toBeVisible();
      expect(screen.getByLabelText(LABELS.password)).toBeVisible();
    });
  });
});
  });

// Additional test cases to improve coverage
describe('SignUpForm - Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Field Validation Messages', () => {
    test('displays required field message for empty firstName', () => {
      fireEvent.blur(screen.getByLabelText(LABELS.firstName));
      expect(screen.getByText(/First Name is required/i)).toBeInTheDocument();
    });

    test('displays required field message for empty lastName', () => {
      fireEvent.blur(screen.getByLabelText(LABELS.lastName));
      expect(screen.getByText(/Last Name is required/i)).toBeInTheDocument();
    });

    test('displays required field message for empty email', () => {
      fireEvent.blur(screen.getByLabelText(LABELS.email));
      expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
    });

    test('displays required field message for empty password', () => {
      fireEvent.blur(screen.getByLabelText(LABELS.password));
      expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
    });
  });

  describe('Invalid Form Submission', () => {
    let consoleSpy;

    beforeEach(() => {
      consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterEach(() => {
      consoleSpy.mockRestore();
    });

    test('does not call console log on invalid form submission', () => {
      fillOutForm({ email: 'invalidemail' }); // Explicitly set an invalid email
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(consoleSpy).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    test('form elements are associated with labels', () => {
      expect(screen.getByLabelText(LABELS.firstName)).toBeVisible();
      expect(screen.getByLabelText(LABELS.lastName)).toBeVisible();
      expect(screen.getByLabelText(LABELS.email)).toBeVisible();
      expect(screen.getByLabelText(LABELS.password)).toBeVisible();
    });
  });
});

  describe('Form Submission', () => {
    let consoleSpy;

    beforeEach(() => {
      consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

// Additional test cases to improve coverage
describe('SignUpForm - Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Field Validation Messages', () => {
    test('displays required field message for empty firstName', () => {
      fireEvent.blur(screen.getByLabelText(LABELS.firstName));
      expect(screen.getByText(/First Name is required/i)).toBeInTheDocument();
    });

    test('displays required field message for empty lastName', () => {
      fireEvent.blur(screen.getByLabelText(LABELS.lastName));
      expect(screen.getByText(/Last Name is required/i)).toBeInTheDocument();
    });

    test('displays required field message for empty email', () => {
      fireEvent.blur(screen.getByLabelText(LABELS.email));
      expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
    });

    test('displays required field message for empty password', () => {
      fireEvent.blur(screen.getByLabelText(LABELS.password));
      expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
    });
  });

  describe('Invalid Form Submission', () => {
    let consoleSpy;

    beforeEach(() => {
      consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterEach(() => {
      consoleSpy.mockRestore();
    });

    test('does not call console log on invalid form submission', () => {
      fillOutForm({ email: 'invalidemail' }); // Explicitly set an invalid email
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(consoleSpy).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    test('form elements are associated with labels', () => {
      expect(screen.getByLabelText(LABELS.firstName)).toBeVisible();
      expect(screen.getByLabelText(LABELS.lastName)).toBeVisible();
      expect(screen.getByLabelText(LABELS.email)).toBeVisible();
      expect(screen.getByLabelText(LABELS.password)).toBeVisible();
    });
  });
});
    });

// Additional test cases to improve coverage
describe('SignUpForm - Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Field Validation Messages', () => {
    test('displays required field message for empty firstName', () => {
      fireEvent.blur(screen.getByLabelText(LABELS.firstName));
      expect(screen.getByText(/First Name is required/i)).toBeInTheDocument();
    });

    test('displays required field message for empty lastName', () => {
      fireEvent.blur(screen.getByLabelText(LABELS.lastName));
      expect(screen.getByText(/Last Name is required/i)).toBeInTheDocument();
    });

    test('displays required field message for empty email', () => {
      fireEvent.blur(screen.getByLabelText(LABELS.email));
      expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
    });

    test('displays required field message for empty password', () => {
      fireEvent.blur(screen.getByLabelText(LABELS.password));
      expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
    });
  });

  describe('Invalid Form Submission', () => {
    let consoleSpy;

    beforeEach(() => {
      consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterEach(() => {
      consoleSpy.mockRestore();
    });

    test('does not call console log on invalid form submission', () => {
      fillOutForm({ email: 'invalidemail' }); // Explicitly set an invalid email
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(consoleSpy).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    test('form elements are associated with labels', () => {
      expect(screen.getByLabelText(LABELS.firstName)).toBeVisible();
      expect(screen.getByLabelText(LABELS.lastName)).toBeVisible();
      expect(screen.getByLabelText(LABELS.email)).toBeVisible();
      expect(screen.getByLabelText(LABELS.password)).toBeVisible();
    });
  });
});

    afterEach(() => {
      consoleSpy.mockRestore();
    });

// Additional test cases to improve coverage
describe('SignUpForm - Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Field Validation Messages', () => {
    test('displays required field message for empty firstName', () => {
      fireEvent.blur(screen.getByLabelText(LABELS.firstName));
      expect(screen.getByText(/First Name is required/i)).toBeInTheDocument();
    });

    test('displays required field message for empty lastName', () => {
      fireEvent.blur(screen.getByLabelText(LABELS.lastName));
      expect(screen.getByText(/Last Name is required/i)).toBeInTheDocument();
    });

    test('displays required field message for empty email', () => {
      fireEvent.blur(screen.getByLabelText(LABELS.email));
      expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
    });

    test('displays required field message for empty password', () => {
      fireEvent.blur(screen.getByLabelText(LABELS.password));
      expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
    });
  });

  describe('Invalid Form Submission', () => {
    let consoleSpy;

    beforeEach(() => {
      consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterEach(() => {
      consoleSpy.mockRestore();
    });

    test('does not call console log on invalid form submission', () => {
      fillOutForm({ email: 'invalidemail' }); // Explicitly set an invalid email
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(consoleSpy).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    test('form elements are associated with labels', () => {
      expect(screen.getByLabelText(LABELS.firstName)).toBeVisible();
      expect(screen.getByLabelText(LABELS.lastName)).toBeVisible();
      expect(screen.getByLabelText(LABELS.email)).toBeVisible();
      expect(screen.getByLabelText(LABELS.password)).toBeVisible();
    });
  });
});

    test('enables Create Account button with valid form', () => {
      fillOutForm();
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).not.toBeDisabled();
    });

// Additional test cases to improve coverage
describe('SignUpForm - Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Field Validation Messages', () => {
    test('displays required field message for empty firstName', () => {
      fireEvent.blur(screen.getByLabelText(LABELS.firstName));
      expect(screen.getByText(/First Name is required/i)).toBeInTheDocument();
    });

    test('displays required field message for empty lastName', () => {
      fireEvent.blur(screen.getByLabelText(LABELS.lastName));
      expect(screen.getByText(/Last Name is required/i)).toBeInTheDocument();
    });

    test('displays required field message for empty email', () => {
      fireEvent.blur(screen.getByLabelText(LABELS.email));
      expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
    });

    test('displays required field message for empty password', () => {
      fireEvent.blur(screen.getByLabelText(LABELS.password));
      expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
    });
  });

  describe('Invalid Form Submission', () => {
    let consoleSpy;

    beforeEach(() => {
      consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterEach(() => {
      consoleSpy.mockRestore();
    });

    test('does not call console log on invalid form submission', () => {
      fillOutForm({ email: 'invalidemail' }); // Explicitly set an invalid email
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(consoleSpy).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    test('form elements are associated with labels', () => {
      expect(screen.getByLabelText(LABELS.firstName)).toBeVisible();
      expect(screen.getByLabelText(LABELS.lastName)).toBeVisible();
      expect(screen.getByLabelText(LABELS.email)).toBeVisible();
      expect(screen.getByLabelText(LABELS.password)).toBeVisible();
    });
  });
});

    test('disables Create Account button with invalid form', () => {
      fillOutForm({ firstName: '' });

// Additional test cases to improve coverage
describe('SignUpForm - Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Field Validation Messages', () => {
    test('displays required field message for empty firstName', () => {
      fireEvent.blur(screen.getByLabelText(LABELS.firstName));
      expect(screen.getByText(/First Name is required/i)).toBeInTheDocument();
    });

    test('displays required field message for empty lastName', () => {
      fireEvent.blur(screen.getByLabelText(LABELS.lastName));
      expect(screen.getByText(/Last Name is required/i)).toBeInTheDocument();
    });

    test('displays required field message for empty email', () => {
      fireEvent.blur(screen.getByLabelText(LABELS.email));
      expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
    });

    test('displays required field message for empty password', () => {
      fireEvent.blur(screen.getByLabelText(LABELS.password));
      expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
    });
  });

  describe('Invalid Form Submission', () => {
    let consoleSpy;

    beforeEach(() => {
      consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterEach(() => {
      consoleSpy.mockRestore();
    });

    test('does not call console log on invalid form submission', () => {
      fillOutForm({ email: 'invalidemail' }); // Explicitly set an invalid email
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(consoleSpy).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    test('form elements are associated with labels', () => {
      expect(screen.getByLabelText(LABELS.firstName)).toBeVisible();
      expect(screen.getByLabelText(LABELS.lastName)).toBeVisible();
      expect(screen.getByLabelText(LABELS.email)).toBeVisible();
      expect(screen.getByLabelText(LABELS.password)).toBeVisible();
    });
  });
}); // Explicitly set an invalid field
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

// Additional test cases to improve coverage
describe('SignUpForm - Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Field Validation Messages', () => {
    test('displays required field message for empty firstName', () => {
      fireEvent.blur(screen.getByLabelText(LABELS.firstName));
      expect(screen.getByText(/First Name is required/i)).toBeInTheDocument();
    });

    test('displays required field message for empty lastName', () => {
      fireEvent.blur(screen.getByLabelText(LABELS.lastName));
      expect(screen.getByText(/Last Name is required/i)).toBeInTheDocument();
    });

    test('displays required field message for empty email', () => {
      fireEvent.blur(screen.getByLabelText(LABELS.email));
      expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
    });

    test('displays required field message for empty password', () => {
      fireEvent.blur(screen.getByLabelText(LABELS.password));
      expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
    });
  });

  describe('Invalid Form Submission', () => {
    let consoleSpy;

    beforeEach(() => {
      consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterEach(() => {
      consoleSpy.mockRestore();
    });

    test('does not call console log on invalid form submission', () => {
      fillOutForm({ email: 'invalidemail' }); // Explicitly set an invalid email
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(consoleSpy).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    test('form elements are associated with labels', () => {
      expect(screen.getByLabelText(LABELS.firstName)).toBeVisible();
      expect(screen.getByLabelText(LABELS.lastName)).toBeVisible();
      expect(screen.getByLabelText(LABELS.email)).toBeVisible();
      expect(screen.getByLabelText(LABELS.password)).toBeVisible();
    });
  });
});

    test('calls console log with correct data on valid form submission', () => {
      const formData = fillOutForm();
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(consoleSpy).toHaveBeenLastCalledWith('Form submitted:', formData);
    });

// Additional test cases to improve coverage
describe('SignUpForm - Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Field Validation Messages', () => {
    test('displays required field message for empty firstName', () => {
      fireEvent.blur(screen.getByLabelText(LABELS.firstName));
      expect(screen.getByText(/First Name is required/i)).toBeInTheDocument();
    });

    test('displays required field message for empty lastName', () => {
      fireEvent.blur(screen.getByLabelText(LABELS.lastName));
      expect(screen.getByText(/Last Name is required/i)).toBeInTheDocument();
    });

    test('displays required field message for empty email', () => {
      fireEvent.blur(screen.getByLabelText(LABELS.email));
      expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
    });

    test('displays required field message for empty password', () => {
      fireEvent.blur(screen.getByLabelText(LABELS.password));
      expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
    });
  });

  describe('Invalid Form Submission', () => {
    let consoleSpy;

    beforeEach(() => {
      consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterEach(() => {
      consoleSpy.mockRestore();
    });

    test('does not call console log on invalid form submission', () => {
      fillOutForm({ email: 'invalidemail' }); // Explicitly set an invalid email
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(consoleSpy).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    test('form elements are associated with labels', () => {
      expect(screen.getByLabelText(LABELS.firstName)).toBeVisible();
      expect(screen.getByLabelText(LABELS.lastName)).toBeVisible();
      expect(screen.getByLabelText(LABELS.email)).toBeVisible();
      expect(screen.getByLabelText(LABELS.password)).toBeVisible();
    });
  });
});
  });

// Additional test cases to improve coverage
describe('SignUpForm - Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Field Validation Messages', () => {
    test('displays required field message for empty firstName', () => {
      fireEvent.blur(screen.getByLabelText(LABELS.firstName));
      expect(screen.getByText(/First Name is required/i)).toBeInTheDocument();
    });

    test('displays required field message for empty lastName', () => {
      fireEvent.blur(screen.getByLabelText(LABELS.lastName));
      expect(screen.getByText(/Last Name is required/i)).toBeInTheDocument();
    });

    test('displays required field message for empty email', () => {
      fireEvent.blur(screen.getByLabelText(LABELS.email));
      expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
    });

    test('displays required field message for empty password', () => {
      fireEvent.blur(screen.getByLabelText(LABELS.password));
      expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
    });
  });

  describe('Invalid Form Submission', () => {
    let consoleSpy;

    beforeEach(() => {
      consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterEach(() => {
      consoleSpy.mockRestore();
    });

    test('does not call console log on invalid form submission', () => {
      fillOutForm({ email: 'invalidemail' }); // Explicitly set an invalid email
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(consoleSpy).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    test('form elements are associated with labels', () => {
      expect(screen.getByLabelText(LABELS.firstName)).toBeVisible();
      expect(screen.getByLabelText(LABELS.lastName)).toBeVisible();
      expect(screen.getByLabelText(LABELS.email)).toBeVisible();
      expect(screen.getByLabelText(LABELS.password)).toBeVisible();
    });
  });
});
});

// Additional test cases to improve coverage
describe('SignUpForm - Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Field Validation Messages', () => {
    test('displays required field message for empty firstName', () => {
      fireEvent.blur(screen.getByLabelText(LABELS.firstName));
      expect(screen.getByText(/First Name is required/i)).toBeInTheDocument();
    });

    test('displays required field message for empty lastName', () => {
      fireEvent.blur(screen.getByLabelText(LABELS.lastName));
      expect(screen.getByText(/Last Name is required/i)).toBeInTheDocument();
    });

    test('displays required field message for empty email', () => {
      fireEvent.blur(screen.getByLabelText(LABELS.email));
      expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
    });

    test('displays required field message for empty password', () => {
      fireEvent.blur(screen.getByLabelText(LABELS.password));
      expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
    });
  });

  describe('Invalid Form Submission', () => {
    let consoleSpy;

    beforeEach(() => {
      consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterEach(() => {
      consoleSpy.mockRestore();
    });

    test('does not call console log on invalid form submission', () => {
      fillOutForm({ email: 'invalidemail' }); // Explicitly set an invalid email
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(consoleSpy).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    test('form elements are associated with labels', () => {
      expect(screen.getByLabelText(LABELS.firstName)).toBeVisible();
      expect(screen.getByLabelText(LABELS.lastName)).toBeVisible();
      expect(screen.getByLabelText(LABELS.email)).toBeVisible();
      expect(screen.getByLabelText(LABELS.password)).toBeVisible();
    });
  });
});
// Additional unit tests for SignUpForm to improve coverage

describe('SignUpForm - Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Field Validations', () => {
    test('shows error message for empty required fields on submit attempt', () => {
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(screen.getAllByText(/This field is required/i)).toHaveLength(4); // Assuming all fields are required
    });

    test('does not allow blank spaces as valid input for required fields', () => {
      fillOutForm({ firstName: '   ', lastName: '   ', email: '   ', password: '   ' });
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(screen.getAllByText(/This field is required/i)).toHaveLength(4);
    });

    test('validates minimum password length on blur', () => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: 'short' } });
      fireEvent.blur(screen.getByLabelText(LABELS.password));
      expect(screen.getByText(/Minimum 8 characters/i)).toBeInTheDocument();
    });

    test('validates password contains at least one digit on blur', () => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: 'Password' } });
      fireEvent.blur(screen.getByLabelText(LABELS.password));
      expect(screen.getByText(/1 number/i)).toBeInTheDocument();
    });

    test('validates password contains at least one uppercase letter on blur', () => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: 'password1' } });
      fireEvent.blur(screen.getByLabelText(LABELS.password));
      expect(screen.getByText(/1 uppercase character/i)).toBeInTheDocument();
    });

    test('validates password contains at least one lowercase letter on blur', () => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: 'PASSWORD1' } });
      fireEvent.blur(screen.getByLabelText(LABELS.password));
      expect(screen.getByText(/1 lowercase character/i)).toBeInTheDocument();
    });
  });

  describe('Form Submission - Negative Cases', () => {
    test('prevents form submission when Create Account button is disabled', () => {
      fillOutForm({ email: 'invalid' }); // Set an invalid email to disable button
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(consoleSpy).not.toHaveBeenCalled();
    });

    test('shows specific error message for invalid email on blur', () => {
      const emailInput = screen.getByLabelText(LABELS.email);
      fireEvent.change(emailInput, { target: { value: 'invalidEmail' } });
      fireEvent.blur(emailInput);
      expect(screen.getByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });
  });

  describe('Accessibility Checks', () => {
    test('all input fields have associated labels', () => {
      const inputElements = screen.getAllByRole('textbox');
      inputElements.forEach(input => {
        expect(input).toHaveAccessibleName();
      });
    });

    test('error messages are linked to input fields via aria-describedby', () => {
      fillOutForm({ email: 'invalid', password: 'short' });
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      const emailInput = screen.getByLabelText(LABELS.email);
      const passwordInput = screen.getByLabelText(LABELS.password);
      const emailErrorId = emailInput.getAttribute('aria-describedby');
      const passwordErrorId = passwordInput.getAttribute('aria-describedby');
      expect(screen.getByText(/Please enter a valid email address/i).id).toEqual(emailErrorId);
      expect(screen.getByText(/Minimum 8 characters/i).id).toEqual(passwordErrorId);
    });
  });
});
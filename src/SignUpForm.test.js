```javascript
describe('SignUpForm Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Password Validation Details', () => {
    const INVALID_PASSWORDS = [
      { desc: 'all lowercase', password: 'password', hasUppercase: false },
      { desc: 'all uppercase', password: 'PASSWORD', hasLowercase: false },
      { desc: 'no numbers', password: 'Password', hasNumber: false },
      { desc: 'too short', password: 'Pass1', isLongEnough: false },
    ];

    test.each(INVALID_PASSWORDS)('validates password with $desc', ({ password, ...expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      Object.entries(expected).forEach(([key, isValid]) => {
        expect(screen.getByText(new RegExp(key, 'i')).className).toMatch(isValid ? /green/ : /red/);
      });
    });
  });

  describe('Email Validation Edge Cases', () => {
    const INVALID_EMAILS = ['john.doe@.com', 'john.doe@com', 'john.doe@example.c', 'john.doe@example', 'john.doe@example..com'];
    const VALID_EMAILS = ['john.doe@example.co', 'john.doe@example.com', 'john.d@e.co', 'j.d@e.co'];

    test.each(INVALID_EMAILS)('marks email "%s" as invalid', (email) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test.each(VALID_EMAILS)('marks email "%s" as valid', (email) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeNull();
    });
  });

  describe('Form Validation Edge Cases', () => {
    test('disables button with invalid email even if other fields are valid', () => {
      fillOutForm({ email: 'invalidemail' });
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('disables button with password not meeting all criteria', () => {
      fillOutForm({ password: 'Pass1' }); // Does not meet the minimum length
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('enables button with all fields valid including edge case email', () => {
      fillOutForm({ email: 'j.d@e.co' });
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).not.toBeDisabled();
    });
  });

  describe('Form Submission Edge Cases', () => {
    let consoleSpy;

    beforeEach(() => {
      consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
      consoleSpy.mockRestore();
    });

    test('logs error to console on invalid form submission', () => {
      fillOutForm({ firstName: '' }); // Invalid form due to empty firstName
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(consoleSpy).toHaveBeenCalledWith('Form is invalid');
    });
  });
});
```
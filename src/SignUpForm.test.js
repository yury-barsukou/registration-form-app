// Additional unit tests to achieve full coverage

describe('SignUpForm', () => {
  // Assuming existing tests here...

  describe('Password and Email Edge Cases', () => {
    test('submitting form with invalid email keeps Create Account button disabled', () => {
      fillOutForm({ email: 'invalidemail' });
      const submitButton = screen.getByRole('button', { name: BUTTON_TEXT });
      expect(submitButton).toBeDisabled();
    });

    test.each([
      { case: 'missing uppercase', password: 'password123' },
      { case: 'missing lowercase', password: 'PASSWORD123' },
      { case: 'missing number', password: 'Password' },
      { case: 'too short', password: 'Pass1' },
    ])('invalid password with $case keeps Create Account button disabled', ({ password }) => {
      fillOutForm({ password });
      const submitButton = screen.getByRole('button', { name: BUTTON_TEXT });
      expect(submitButton).toBeDisabled();
    });

    test('entering valid then invalid email updates validation message visibility', () => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: VALID_EMAIL } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeNull();
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'invalid' } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test('form is invalid when only some password validations pass', () => {
      const partialPassword = 'Pass'; // Missing number and not long enough
      fillOutForm({ password: partialPassword });
      expect(screen.getByText(/1 number/i).className).toMatch(/red/);
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
      const submitButton = screen.getByRole('button', { name: BUTTON_TEXT });
      expect(submitButton).toBeDisabled();
    });

    test('form is invalid without first and last name', () => {
      fillOutForm({ firstName: '', lastName: '' });
      const submitButton = screen.getByRole('button', { name: BUTTON_TEXT });
      expect(submitButton).toBeDisabled();
    });

    test('handles form submission with console.error when form is invalid', () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      fillOutForm({ firstName: '' }); // Invalid due to missing first name
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(consoleErrorSpy).toHaveBeenCalledWith('Form is invalid');
      consoleErrorSpy.mockRestore();
    });
  });
});
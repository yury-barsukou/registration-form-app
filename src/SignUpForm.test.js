describe('SignUpForm Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  describe('Password Validation Characteristics', () => {
    test.each([
      { password: 'Lowercase', expected: 'red' },
      { password: 'UPPERCASE123', expected: 'red' },
      { password: '12345678', expected: 'red' },
      { password: 'LowerAndUPPER', expected: 'red' },
      { password: 'lowerand123', expected: 'red' },
      { password: 'UPPERAND123', expected: 'red' },
      { password: 'Lower123', expected: 'red' }, // Not long enough
      { password: 'ValidPassword1', expected: 'green' }, // Meets all criteria
    ])('Password "$password" sets password criteria colors correctly', ({ password, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(expected);
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(expected);
      expect(screen.getByText(/1 number/i).className).toMatch(expected);
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(expected);
    });
  });

  describe('Email Validation Edge Cases', () => {
    test.each([
      { email: 'john.doe@company', expected: false },
      { email: 'john..doe@example.com', expected: false },
      { email: '.john.doe@example.com', expected: false },
      { email: 'john.doe@example.co.uk', expected: true },
      { email: 'john-doe@example.com', expected: true },
      { email: '123@456.789', expected: true },
    ])('Validates email "$email" correctly', ({ email, expected }) => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
      const validationMessage = screen.queryByText(/Please enter a valid email address/i);
      if (expected) {
        expect(validationMessage).toBeNull();
      } else {
        expect(validationMessage).toBeInTheDocument();
      }
    });
  });

  describe('Form Field Limits', () => {
    test.each([
      { field: LABELS.firstName, input: 'a'.repeat(51), expected: 'a'.repeat(50) },
      { field: LABELS.lastName, input: 'a'.repeat(51), expected: 'a'.repeat(50) },
    ])('Limits $field field to 50 characters', ({ field, input, expected }) => {
      fireEvent.change(screen.getByLabelText(field), { target: { value: input } });
      expect(screen.getByLabelText(field)).toHaveValue(expected);
    });
  });

  describe('Form Error Handling', () => {
    test('prevents form submission with invalid form', () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      fillOutForm({ email: 'invalid' }); // Invalid email
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(consoleErrorSpy).toHaveBeenCalledWith('Form is invalid');
      consoleErrorSpy.mockRestore();
    });
  });
});
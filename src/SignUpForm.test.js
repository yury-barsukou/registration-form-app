// Additional tests to improve coverage for edge cases and negative cases

describe('SignUpForm - Edge Cases and Negative Cases', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  test('handles empty form submission', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
    expect(consoleErrorSpy).toHaveBeenLastCalledWith('Form is invalid');
    consoleErrorSpy.mockRestore();
  });

  test.each([
    { email: 'john.doe@', expected: false },
    { email: 'john.doe', expected: false },
    { email: 'john.doe@example', expected: false },
    { email: 'john.doe@example.', expected: false },
    { email: 'john.doe@example.com', expected: true },
  ])('validates various email formats: $email', ({ email, expected }) => {
    fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: email } });
    const validationMessage = screen.queryByText(/Please enter a valid email address/i);
    if (expected) {
      expect(validationMessage).toBeNull();
    } else {
      expect(validationMessage).toBeInTheDocument();
    }
  });

  test.each([
    { password: '1234567', criteria: /Minimum 8 characters/i, expected: 'red' },
    { password: 'abcdefgh', criteria: /1 number/i, expected: 'red' },
    { password: 'ABCDEFGH', criteria: /1 lowercase character/i, expected: 'red' },
    { password: '12345678', criteria: /1 uppercase character/i, expected: 'red' },
    { password: 'Aa1', criteria: /Minimum 8 characters/i, expected: 'red' },
    { password: 'Aa12345678', criteria: /Minimum 8 characters/i, expected: 'green' },
  ])('validates various password criteria: $password', ({ password, criteria, expected }) => {
    fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
    expect(screen.getByText(criteria).className).toMatch(expected);
  });

  test('prevents form submission with invalid email', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    fillOutForm({ email: 'invalidemail' });
    fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
    expect(consoleErrorSpy).toHaveBeenLastCalledWith('Form is invalid');
    consoleErrorSpy.mockRestore();
  });

  test('prevents form submission with password not meeting criteria', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    fillOutForm({ password: 'short' });
    fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
    expect(consoleErrorSpy).toHaveBeenLastCalledWith('Form is invalid');
    consoleErrorSpy.mockRestore();
  });

  test('validates that first and last name cannot be too long', () => {
    // Using maxLength attribute to ensure names cannot be too long
    const longName = 'a'.repeat(51); // 51 characters long
    fireEvent.change(screen.getByLabelText(LABELS.firstName), { target: { value: longName } });
    fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: longName } });
    expect(screen.getByLabelText(LABELS.firstName)).toHaveValue('a'.repeat(50)); // Truncated to 50 characters
    expect(screen.getByLabelText(LABELS.lastName)).toHaveValue('a'.repeat(50)); // Truncated to 50 characters
  });
});
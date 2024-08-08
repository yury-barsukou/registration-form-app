// Additional unit tests for SignUpForm component to cover missing scenarios

describe('SignUpForm - Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  test('isEmailValid state updates correctly when validating emails', () => {
    fireEvent.change(screen.getByLabelText(LABELS.email), {target: {value: 'invalidemail.com'}});
    fireEvent.blur(screen.getByLabelText(LABELS.email)); // Simulate leaving the field
    expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(LABELS.email), {target: {value: VALID_EMAIL}});
    fireEvent.blur(screen.getByLabelText(LABELS.email)); // Simulate leaving the field
    expect(screen.queryByText(/Please enter a valid email address/i)).toBeNull();
  });

  test('passwordValidations state updates correctly for various password strengths', () => {
    const passwordInput = screen.getByLabelText(LABELS.password);
    fireEvent.change(passwordInput, {target: {value: 'abc'}});
    expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
    expect(screen.getByText(/1 number/i).className).toMatch(/red/);

    fireEvent.change(passwordInput, {target: {value: 'Abcdefgh1'}});
    expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    expect(screen.getByText(/1 number/i).className).toMatch(/green/);
    expect(screen.getByText(/1 uppercase character/i).className).toMatch(/green/);
    expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
  });

  test('form does not submit when invalid due to email validation', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    fillOutForm({ email: 'invalidemail' });
    fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
    expect(consoleSpy).toHaveBeenCalledWith('Form is invalid');
    consoleSpy.mockRestore();
  });

  test('form does not submit when password is too short', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    fillOutForm({ password: 'Short1' });
    fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
    expect(consoleSpy).toHaveBeenCalledWith('Form is invalid');
    consoleSpy.mockRestore();
  });

  test('form does not submit when password lacks a number', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    fillOutForm({ password: 'PasswordWithoutNumber' });
    fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
    expect(consoleSpy).toHaveBeenCalledWith('Form is invalid');
    consoleSpy.mockRestore();
  });

  test('form does not submit when password lacks an uppercase letter', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    fillOutForm({ password: 'alllowercase1' });
    fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
    expect(consoleSpy).toHaveBeenCalledWith('Form is invalid');
    consoleSpy.mockRestore();
  });

  test('form does not submit when password lacks a lowercase letter', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    fillOutForm({ password: 'ALLUPPERCASE1' });
    fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
    expect(consoleSpy).toHaveBeenCalledWith('Form is invalid');
    consoleSpy.mockRestore();
  });

  test('renders error message when email is invalid on blur', () => {
    fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'invalidemail' } });
    fireEvent.blur(screen.getByLabelText(LABELS.email));
    expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
  });

  test('Form Submission - does not log to console with invalid data', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    fillOutForm({ email: 'bademail' });
    fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
    expect(consoleSpy).not.toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});
// Additional tests to cover missing scenarios

describe('SignUpForm - Additional Tests', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  test('password validation updates with different criteria', () => {
    const passwordInput = screen.getByLabelText(LABELS.password);
    fireEvent.change(passwordInput, { target: { value: 'abc' } });
    expect(screen.getByText(/1 uppercase character/i).className).toMatch(/red/);
    expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
    expect(screen.getByText(/1 number/i).className).toMatch(/red/);
    expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);

    fireEvent.change(passwordInput, { target: { value: 'Abc123456' } });
    expect(screen.getByText(/1 uppercase character/i).className).toMatch(/green/);
    expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
    expect(screen.getByText(/1 number/i).className).toMatch(/green/);
    expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
  });

  test('isFormValid returns false when email is invalid', () => {
    fillOutForm({ email: 'invalidemail' });
    expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
  });

  test('isFormValid returns false when any password criteria is not met', () => {
    fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: 'Abc1' } });
    expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
  });

  test('form does not call console log when submitted with invalid data', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    fillOutForm({ firstName: '' }); // Invalid form scenario
    fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
    expect(consoleSpy).toHaveBeenCalledWith('Form is invalid');
    consoleSpy.mockRestore();
  });

  test('renders email validation message when email is invalid', () => {
    fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'invalidemail@' } });
    expect(screen.getByText(/Please enter a valid email address/i)).toBeInTheDocument();
  });

  test('does not render email validation message when email is valid', () => {
    fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: VALID_EMAIL } });
    expect(screen.queryByText(/Please enter a valid email address/i)).toBeNull();
  });

  test.each([
    { password: '12345678', valid: false },
    { password: 'abcdefgh', valid: false },
    { password: 'ABCDEFGH', valid: false },
    { password: 'Abc12345', valid: true },
  ])('Password "$password" validation is $valid', ({ password, valid }) => {
    fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: password } });
    const condition = valid ? 'not.toBeDisabled' : 'toBeDisabled';
    expect(screen.getByRole('button', { name: BUTTON_TEXT })).[condition]();
  });
});
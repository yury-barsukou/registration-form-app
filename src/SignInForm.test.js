// Additional unit tests for SignInForm component to enhance coverage and edge cases.

describe('SignInForm - Additional Tests', () => {
  beforeEach(() => {
    render(<SignInForm />);
  });

  test('email input should be initially empty', () => {
    expect(screen.getByLabelText(LABELS.email)).toHaveValue('');
  });

  test('password input should be initially empty', () => {
    expect(screen.getByLabelText(LABELS.password)).toHaveValue('');
  });

  test.each([
    { email: 'john.doe@', password: VALID_PASSWORD, errorMessage: /Please enter a valid email address/i },
    { email: VALID_EMAIL, password: '123', errorMessage: /Your password must have at least 8 characters/i },
    { email: 'john.doe@', password: '123', errorMessage: /Please enter a valid email address/i }, // Expecting the first error it encounters
  ])('displays error messages for invalid inputs', ({ email, password, errorMessage }) => {
    fillOutForm({ email, password });
    fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
    expect(screen.queryByText(errorMessage)).toBeInTheDocument();
  });

  test('does not call console log with invalid form submission', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    fillOutForm({ email: 'invalid' });
    fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
    expect(consoleSpy).not.toHaveBeenCalled();
    consoleSpy.mockRestore();
  });

  test('Sign In button should be initially disabled', () => {
    expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
  });

  test('clears input fields after valid submission', async () => {
    fillOutForm();
    fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
    expect(screen.getByLabelText(LABELS.email)).toHaveValue('');
    expect(screen.getByLabelText(LABELS.password)).toHaveValue('');
  });

  test('focuses on the email input field on form render', () => {
    expect(screen.getByLabelText(LABELS.email)).toHaveFocus();
  });

  test('shows a loading indicator when the form is being submitted', () => {
    fillOutForm();
    fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  test('removes loading indicator after form submission is complete', async () => {
    fillOutForm();
    fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
    // Assuming there's a delay in form processing simulated by setTimeout or a similar approach
    await new Promise(r => setTimeout(r, 500)); // Simulate waiting for the submission to complete
    expect(screen.queryByText(/Loading.../i)).toBeNull();
  });
});
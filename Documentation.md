# Documentation

## SignInForm Component

### Overview

The `SignInForm` component is a React functional component that provides a user interface for signing in. It includes fields for email and password, and performs basic validation on these fields.

### Props

The `SignInForm` component does not accept any props.

### State

The component uses the following state variables:

- `signInData`: An object containing the email and password entered by the user.
- `isEmailValid`: A boolean indicating whether the entered email is valid.
- `isSignInPasswordValid`: A boolean indicating whether the entered password meets the minimum length requirement.

### Methods

- `handleSignInInputChange`: Handles changes to the input fields and updates the state accordingly. It also triggers validation for the email and password fields.
- `validateEmail`: Validates the email format using a regular expression.
- `isSignInFormValid`: Checks if the form is valid by ensuring that the email and password fields are not empty and meet their respective validation criteria.
- `handleSignInSubmit`: Handles the form submission. If the form is valid, it logs the sign-in data to the console (this is where you would typically handle the sign-in logic, such as sending the data to a server).

### JSX Structure

The component returns a form element with the following structure:

- A div with the class `inner-form-wrapper` containing:
  - An input group for the email field, including a label, input, and validation message.
  - An input group for the password field, including a label, input, and validation message.
  - A "Forgot Password?" link.
  - A submit button that is disabled if the form is not valid.

### CSS Classes

The component uses the following CSS classes:

- `inner-form-wrapper`: Wrapper for the form content.
- `input-group`: Wrapper for each input field and its label.
- `form-control`: Applied to the input fields.
- `email-validation-message`: Validation message for the email field.
- `password-validation-message`: Validation message for the password field.
- `forgot-password`: Wrapper for the "Forgot Password?" link.
- `space-above-large`: Adds space above the submit button.
- `next-button`, `btn-new`, `btn-large`, `btn-disabled`: Classes for styling the submit button.

### Example Usage

```jsx
import React from 'react';
import SignInForm from './SignInForm';

const App = () => {
  return (
    <div>
      <h1>Sign In</h1>
      <SignInForm />
    </div>
  );
};

export default App;
```

## SignUpForm Component

### Overview

The `SignUpForm` component is a React functional component that provides a user interface for signing up. It includes fields for first name, last name, email, and password, and performs basic validation on these fields.

### State

The component uses the following state variables:

- `formData`: An object containing the first name, last name, email, and password entered by the user.
- `passwordValidations`: An object containing boolean values indicating whether the password meets certain criteria (uppercase, lowercase, number, and length).
- `isEmailValid`: A boolean indicating whether the entered email is valid.

### Methods

- `handleInputChange`: Handles changes to the input fields and updates the state accordingly. It also triggers validation for the email and password fields.
- `validatePassword`: Validates the password to ensure it contains at least one uppercase character, one lowercase character, one number, and is at least 8 characters long.
- `validateEmail`: Validates the email format using a regular expression.
- `isFormValid`: Checks if the form is valid by ensuring that all fields are filled out, the email is valid, and the password meets all validation criteria.
- `handleSubmit`: Handles the form submission. If the form is valid, it logs the form data to the console (this is where you would typically handle the form submission logic, such as sending the data to a server).

### JSX Structure

The component returns a form element with the following structure:

- A div with the class `input-group` for each input field, including a label and input.
- A div with the class `email-validation-message` that displays a validation message if the email is invalid.
- A div with the class `password-validation` that displays the password validation criteria.
- A submit button that is disabled if the form is not valid.

### CSS Classes

The component uses the following CSS classes:

- `input-group`: Wrapper for each input field and its label.
- `form-control`: Applied to the input fields.
- `email-validation-message`: Validation message for the email field.
- `password-validation`: Wrapper for the password validation criteria.
- `space-above-large`: Adds space above the submit button.
- `next-button`, `btn-new`, `btn-large`, `btn-disabled`: Classes for styling the submit button.

### Example Usage

```jsx
import React from 'react';
import SignUpForm from './SignUpForm';

const App = () => {
  return (
    <div>
      <h1>Sign Up</h1>
      <SignUpForm />
    </div>
  );
};

export default App;
```

### Dependencies

- `React`: The component relies on React for creating and managing the UI.
- `useState`: A React hook used for managing the component's state.
- `./UserAuthForms.css`: The component imports a CSS file for styling.

### Validation Logic

- **Email Validation**: The email is validated using a regular expression to ensure it follows a standard email format.
- **Password Validation**: The password must contain at least one uppercase character, one lowercase character, one number, and be at least 8 characters long.

### Accessibility

- The form includes labels for each input field to ensure accessibility for screen readers.
- The submit button is disabled when the form is invalid, preventing users from submitting incomplete or incorrect data.

### Potential Improvements

- **Error Handling**: Implement more robust error handling for form submission, such as displaying error messages when the server returns an error.
- **Styling**: Enhance the styling of the form to improve the user experience.
- **Unit Tests**: Add unit tests to ensure the component behaves as expected under various conditions.

### Related Components

- `SignInForm`: A similar component for user sign-in.
- `ForgotPasswordForm`: A component for handling password reset requests.

### File Location

The `SignUpForm` component is located in the `src` directory:

```
src/SignUpForm.js
```

### Author

- **Name**: [Your Name]
- **Email**: [your.email@example.com]

### License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## SignUpForm Tests

### Overview

The `SignUpForm.test.js` file contains unit tests for the `SignUpForm` component. These tests ensure that the component behaves as expected under various conditions.

### Test Suites

#### SignUpForm Rendering

- **Test**: Renders the sign-up form with all fields.
  - **Description**: Ensures that the form renders with fields for first name, last name, email, and password, as well as a submit button.

#### Field Entry

- **Test**: Allows entry of each field.
  - **Description**: Ensures that users can enter values into the first name, last name, email, and password fields.

#### Form Validation

- **Test**: Validates email format correctly.
  - **Description**: Ensures that the email field validates the entered email format and displays an error message for invalid emails.
- **Test**: Validates password criteria correctly.
  - **Description**: Ensures that the password field validates the entered password against the criteria (uppercase, lowercase, number, and length) and displays appropriate validation messages.

#### Form Submission

- **Test**: Enables Create Account button with valid form.
  - **Description**: Ensures that the submit button is enabled when the form is valid.
- **Test**: Disables Create Account button with invalid form.
  - **Description**: Ensures that the submit button is disabled when the form is invalid.
- **Test**: Calls console log with correct data on valid form submission.
  - **Description**: Ensures that the form data is logged to the console when the form is submitted with valid data.

### Example Test Code

```jsx
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
  fireEvent.change(screen.getByLabelText(LABELS.lastName), { target: { value: formData.lastName } });
  fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: formData.email } });
  fireEvent.change(screen.getByLabelText(LABELS.password), { target: { value: formData.password } });

  return formData;
};

describe('SignUpForm', () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  test('renders the sign-up form with all fields', () => {
    expect(screen.getByLabelText(LABELS.firstName)).toBeInTheDocument();
    expect(screen.getByLabelText(LABELS.lastName)).toBeInTheDocument();
    expect(screen.getByLabelText(LABELS.email)).toBeInTheDocument();
    expect(screen.getByLabelText(LABELS.password)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeInTheDocument();
  });

  describe('Field Entry', () => {
    test.each(Object.entries(LABELS))('allows entry of %s', (fieldName, labelRegex) => {
      const value = 'TestValue';
      fireEvent.change(screen.getByLabelText(labelRegex), { target: { value } });
      expect(screen.getByLabelText(labelRegex)).toHaveValue(value);
    });
  });

  describe('Form Validation', () => {
    test('validates email format correctly', () => {
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: 'invalid' } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
      fireEvent.change(screen.getByLabelText(LABELS.email), { target: { value: VALID_EMAIL } });
      expect(screen.queryByText(/Please enter a valid email address/i)).toBeNull();
    });

    test('validates password criteria correctly', () => {
      const password = screen.getByLabelText(LABELS.password);
      fireEvent.change(password, { target: { value: 'short' } });
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/red/);
      fireEvent.change(password, { target: { value: 'LongEnough1' } });
      expect(screen.getByText(/1 uppercase character/i).className).toMatch(/green/);
      expect(screen.getByText(/1 lowercase character/i).className).toMatch(/green/);
      expect(screen.getByText(/1 number/i).className).toMatch(/green/);
      expect(screen.getByText(/Minimum 8 characters/i).className).toMatch(/green/);
    });
  });

  describe('Form Submission', () => {
    let consoleSpy;

    beforeEach(() => {
      consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterEach(() => {
      consoleSpy.mockRestore();
    });

    test('enables Create Account button with valid form', () => {
      fillOutForm();
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).not.toBeDisabled();
    });

    test('disables Create Account button with invalid form', () => {
      fillOutForm({ firstName: '' }); // Explicitly set an invalid field
      expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeDisabled();
    });

    test('calls console log with correct data on valid form submission', () => {
      const formData = fillOutForm();
      fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
      expect(consoleSpy).toHaveBeenLastCalledWith('Form submitted:', formData);
    });
  });
});

### Overview

The `SignUpForm` component is a React functional component that provides a user interface for signing up. It includes fields for first name, last name, email, and password, and performs basic validation on these fields.

### State

The component uses the following state variables:

- `formData`: An object containing the first name, last name, email, and password entered by the user.
- `passwordValidations`: An object containing boolean values indicating whether the password meets certain criteria (uppercase, lowercase, number, and length).
- `isEmailValid`: A boolean indicating whether the entered email is valid.

### Methods

- `handleInputChange`: Handles changes to the input fields and updates the state accordingly. It also triggers validation for the email and password fields.
- `validatePassword`: Validates the password to ensure it contains at least one uppercase character, one lowercase character, one number, and is at least 8 characters long.
- `validateEmail`: Validates the email format using a regular expression.
- `isFormValid`: Checks if the form is valid by ensuring that all fields are filled out, the email is valid, and the password meets all validation criteria.
- `handleSubmit`: Handles the form submission. If the form is valid, it logs the form data to the console (this is where you would typically handle the form submission logic, such as sending the data to a server).

### JSX Structure

The component returns a form element with the following structure:

- A div with the class `input-group` for each input field, including a label and input.
- A div with the class `email-validation-message` that displays a validation message if the email is invalid.
- A div with the class `password-validation` that displays the password validation criteria.
- A submit button that is disabled if the form is not valid.

### CSS Classes

The component uses the following CSS classes:

- `input-group`: Wrapper for each input field and its label.
- `form-control`: Applied to the input fields.
- `email-validation-message`: Validation message for the email field.
- `password-validation`: Wrapper for the password validation criteria.
- `space-above-large`: Adds space above the submit button.
- `next-button`, `btn-new`, `btn-large`, `btn-disabled`: Classes for styling the submit button.

### Example Usage

```jsx
import React from 'react';
import SignUpForm from './SignUpForm';

const App = () => {
  return (
    <div>
      <h1>Sign Up</h1>
      <SignUpForm />
    </div>
  );
};

export default App;
```

### Dependencies

- `React`: The component relies on React for creating and managing the UI.
- `useState`: A React hook used for managing the component's state.
- `./UserAuthForms.css`: The component imports a CSS file for styling.

### Validation Logic

- **Email Validation**: The email is validated using a regular expression to ensure it follows a standard email format.
- **Password Validation**: The password must contain at least one uppercase character, one lowercase character, one number, and be at least 8 characters long.

### Accessibility

- The form includes labels for each input field to ensure accessibility for screen readers.
- The submit button is disabled when the form is invalid, preventing users from submitting incomplete or incorrect data.

### Potential Improvements

- **Error Handling**: Implement more robust error handling for form submission, such as displaying error messages when the server returns an error.
- **Styling**: Enhance the styling of the form to improve the user experience.
- **Unit Tests**: Add unit tests to ensure the component behaves as expected under various conditions.

### Related Components

- `SignInForm`: A similar component for user sign-in.
- `ForgotPasswordForm`: A component for handling password reset requests.

### File Location

The `SignUpForm` component is located in the `src` directory:

```
src/SignUpForm.js
```

### Author

- **Name**: [Your Name]
- **Email**: [your.email@example.com]

### License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Additional Information

### Dependencies

- `React`: The component relies on React for creating and managing the UI.
- `useState`: A React hook used for managing the component's state.
- `./UserAuthForms.css`: The component imports a CSS file for styling.

### Validation Logic

- **Email Validation**: The email is validated using a regular expression to ensure it follows a standard email format.
- **Password Validation**: The password must be at least 8 characters long.

### Accessibility

- The form includes labels for each input field to ensure accessibility for screen readers.
- The submit button is disabled when the form is invalid, preventing users from submitting incomplete or incorrect data.

### Potential Improvements

- **Error Handling**: Implement more robust error handling for form submission, such as displaying error messages when the server returns an error.
- **Styling**: Enhance the styling of the form to improve the user experience.
- **Unit Tests**: Add unit tests to ensure the component behaves as expected under various conditions.

### Related Components

- `SignUpForm`: A similar component for user registration.
- `ForgotPasswordForm`: A component for handling password reset requests.

### File Location

The `SignInForm` component is located in the `src` directory:

```
src/SignInForm.js
```

### Author

- **Name**: [Your Name]
- **Email**: [your.email@example.com]

### License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

# Documentation

## SignInForm.js

### Technical Documentation

**Purpose:**
The `SignInForm.js` file implements a sign-in form component using React. It allows users to input their email and password to sign in.

**Architecture:**
- The component uses React functional components and hooks (`useState`) to manage state.
- The form includes input fields for email and password, with validation for both fields.
- The form submission is handled by the `handleSignInSubmit` function, which currently logs the sign-in data to the console.

**Core Logic:**
- `useState` is used to manage the state of the sign-in data (`signInData`), email validation (`isEmailValid`), and password validation (`isSignInPasswordValid`).
- `handleSignInInputChange` updates the state based on user input and triggers validation functions.
- `validateEmail` checks if the email input matches a regular expression pattern for valid email addresses.
- `isSignInFormValid` checks if both email and password inputs are valid.
- `handleSignInSubmit` prevents the default form submission behavior and logs the sign-in data if the form is valid.

### Functional User Guide

1. **Email Input:**
   - Enter a valid email address in the email input field.
   - If the email is invalid, an error message will be displayed below the input field.

2. **Password Input:**
   - Enter a password with at least 8 characters in the password input field.
   - If the password is invalid, an error message will be displayed below the input field.

3. **Form Submission:**
   - Click the 'Sign In' button to submit the form.
   - The button will be disabled if the email or password inputs are invalid.
   - On successful submission, the sign-in data will be logged to the console.

### Testing Checklist

- **Email Validation:**
  - Test with valid email addresses (e.g., `user@example.com`).
  - Test with invalid email addresses (e.g., `user@com`, `user@.com`).
  - Ensure the error message is displayed for invalid emails.

- **Password Validation:**
  - Test with passwords of various lengths (e.g., less than 8 characters, 8 or more characters).
  - Ensure the error message is displayed for passwords with less than 8 characters.

- **Form Submission:**
  - Test form submission with valid email and password.
  - Test form submission with invalid email and/or password.
  - Ensure the 'Sign In' button is disabled when the form is invalid.
  - Verify that the sign-in data is logged to the console on successful submission.

## SignUpForm.js

### Technical Documentation

`SignUpForm.js` is a React component that renders a user registration form. The form includes fields for first name, last name, email, and password. It also includes validation logic for the email and password fields.

#### State Management

- `formData`: An object that holds the values of the form fields (`firstName`, `lastName`, `email`, `password`).
- `passwordValidations`: An object that holds boolean values indicating whether the password meets certain criteria (uppercase letter, lowercase letter, number, minimum length).
- `isEmailValid`: A boolean that indicates whether the email is valid.

#### Functions

- `handleInputChange(e)`: Updates the form data state when the user types in the input fields. It also triggers validation functions for the email and password fields.
- `validatePassword(password)`: Validates the password based on the criteria mentioned above and updates the `passwordValidations` state.
- `validateEmail(email)`: Validates the email format using a regular expression and updates the `isEmailValid` state.
- `isFormValid()`: Checks if all form fields are filled out and valid.
- `handleSubmit(e)`: Handles the form submission. If the form is valid, it logs the form data to the console.

### Functional User Guide

1. **First Name**: Enter your first name. The input is limited to 50 characters.
2. **Last Name**: Enter your last name. The input is limited to 50 characters.
3. **Email**: Enter a valid email address. If the email is invalid, an error message will be displayed.
4. **Password**: Enter a password that meets the following criteria:
   - At least one uppercase letter
   - At least one lowercase letter
   - At least one number
   - Minimum 8 characters
5. **Create Account Button**: The button will be enabled only if all fields are valid. Click to submit the form.

### Testing Checklist

- Ensure that the form renders correctly.
- Test input fields for first name, last name, email, and password.
- Validate email format and display an error message for invalid emails.
- Validate password criteria and display appropriate messages.
- Ensure the submit button is enabled only when all fields are valid.
- Test form submission with valid data and check console for form data.
- Test form submission with invalid data and ensure appropriate error messages are displayed.

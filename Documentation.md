# Documentation

## SignInForm.js

### Purpose
The `SignInForm.js` file contains a React component that renders a sign-in form. This form allows users to input their email and password to sign in to an application.

### Architecture
The component is a functional React component that utilizes the `useState` hook to manage form state. It includes the following state variables:
- `signInData`: An object containing `email` and `password` fields.
- `isEmailValid`: A boolean indicating whether the entered email is valid.
- `isSignInPasswordValid`: A boolean indicating whether the entered password meets the minimum length requirement.

### Core Logic
1. **State Management**: The component uses `useState` to manage the form data and validation states.
2. **Input Handling**: The `handleSignInInputChange` function updates the state based on user input and triggers validation functions for email and password.
3. **Email Validation**: The `validateEmail` function uses a regular expression to check if the entered email is in a valid format.
4. **Form Validation**: The `isSignInFormValid` function checks if all form fields are valid before allowing form submission.
5. **Form Submission**: The `handleSignInSubmit` function handles the form submission event, preventing the default form submission behavior and logging the form data if the form is valid.

### Key Algorithms
- **Email Validation**: A regular expression is used to validate the email format.
- **Password Validation**: The password is checked to ensure it has at least 8 characters.

### Usage Instructions
1. **Import the Component**: Import the `SignInForm` component into your React application.
   ```javascript
   import SignInForm from './src/SignInForm';
   ```
2. **Render the Component**: Include the `SignInForm` component in your JSX.
   ```jsx
   <SignInForm />
   ```
3. **Styling**: Ensure that the `UserAuthForms.css` file is included in your project for proper styling.

### Example
```jsx
import React from 'react';
import SignInForm from './src/SignInForm';

const App = () => {
  return (
    <div className="App">
      <SignInForm />
    </div>
  );
};

export default App;
```

## Testing Guidelines

### Test Cases
1. **Valid Email and Password**: Enter a valid email and a password with at least 8 characters. The form should be submitted successfully.
2. **Invalid Email**: Enter an invalid email format. An error message should be displayed, and the form should not be submitted.
3. **Short Password**: Enter a password with fewer than 8 characters. An error message should be displayed, and the form should not be submitted.
4. **Empty Fields**: Leave both fields empty and attempt to submit the form. Error messages should be displayed for both fields.
5. **Form Rendering**: Ensure that all form fields and the submit button are rendered correctly.
6. **Field Entry**: Test that each form field allows entry of text.
7. **Email Validation**: Test that the email field validates the email format correctly.
8. **Password Validation**: Test that the password field validates the password criteria correctly.
9. **Form Submission**: Test that the form can be submitted with valid data and that the submit button is enabled/disabled based on form validity.

### Edge Cases
1. **Email with Special Characters**: Test emails with special characters to ensure they are validated correctly.
2. **Password with Spaces**: Test passwords that include spaces to ensure they are counted towards the character limit.
3. **Password Missing Criteria**: Test passwords that are missing one or more criteria (uppercase, lowercase, number) to ensure they are validated correctly.
4. **Invalid Email Format**: Enter an invalid email format and ensure that an error message is displayed.
5. **Short Password**: Enter a password that is too short and ensure that an error message is displayed.
6. **Missing Password Criteria**: Enter a password that is missing one or more criteria (uppercase, lowercase, number) and ensure that the appropriate validation messages are displayed.

### Key Workflows
1. **User Sign-In**: Ensure that the user can sign in with valid credentials and that the form data is handled correctly.
2. **Form Validation**: Verify that the form validation works as expected and that appropriate error messages are displayed for invalid inputs.
3. **User Sign-Up**: Ensure that the user can sign up with valid credentials and that the form data is handled correctly.
4. **Password Validation**: Ensure that the password validation messages update correctly based on the entered password.
5. **Form Rendering**: Verify that the form renders with all fields and the submit button.
6. **Field Entry**: Ensure that each form field allows text entry and updates the state correctly.
7. **Form Submission**: Ensure that the form can be submitted with valid data and that the form data is handled correctly.

## SignUpForm.js

### Purpose
The `SignUpForm.js` file contains a React component that renders a sign-up form. This form allows users to input their first name, last name, email, and password to create a new account.

### Architecture
The component is a functional React component that utilizes the `useState` hook to manage form state. It includes the following state variables:
- `formData`: An object containing `firstName`, `lastName`, `email`, and `password` fields.
- `passwordValidations`: An object containing boolean values for password validation criteria (uppercase, lowercase, number, length).
- `isEmailValid`: A boolean indicating whether the entered email is valid.

### Core Logic
1. **State Management**: The component uses `useState` to manage the form data and validation states.
2. **Input Handling**: The `handleInputChange` function updates the state based on user input and triggers validation functions for email and password.
3. **Password Validation**: The `validatePassword` function checks if the password contains at least one uppercase letter, one lowercase letter, one number, and is at least 8 characters long.
4. **Email Validation**: The `validateEmail` function uses a regular expression to check if the entered email is in a valid format.
5. **Form Validation**: The `isFormValid` function checks if all form fields are valid before allowing form submission.
6. **Form Submission**: The `handleSubmit` function handles the form submission event, preventing the default form submission behavior and logging the form data if the form is valid.

### Key Algorithms
- **Email Validation**: A regular expression is used to validate the email format.
- **Password Validation**: The password is checked to ensure it has at least one uppercase letter, one lowercase letter, one number, and is at least 8 characters long.

### Usage Instructions
1. **Import the Component**: Import the `SignUpForm` component into your React application.
   ```javascript
   import SignUpForm from './src/SignUpForm';
   ```
2. **Render the Component**: Include the `SignUpForm` component in your JSX.
   ```jsx
   <SignUpForm />
   ```
3. **Styling**: Ensure that the `UserAuthForms.css` file is included in your project for proper styling.

### Example
```jsx
import React from 'react';
import SignUpForm from './src/SignUpForm';

const App = () => {
  return (
    <div className="App">
      <SignUpForm />
    </div>
  );
};

export default App;
```

## Testing Guidelines

### Test Cases
1. **Valid Email and Password**: Enter a valid email and a password with at least 8 characters. The form should be submitted successfully.
2. **Invalid Email**: Enter an invalid email format. An error message should be displayed, and the form should not be submitted.
3. **Short Password**: Enter a password with fewer than 8 characters. An error message should be displayed, and the form should not be submitted.
4. **Empty Fields**: Leave all fields empty and attempt to submit the form. Error messages should be displayed for all fields.

### Edge Cases
1. **Email with Special Characters**: Test emails with special characters to ensure they are validated correctly.
2. **Password with Spaces**: Test passwords that include spaces to ensure they are counted towards the character limit.
3. **Password Missing Criteria**: Test passwords that are missing one or more criteria (uppercase, lowercase, number) to ensure they are validated correctly.

### Key Workflows
1. **User Sign-Up**: Ensure that the user can sign up with valid credentials and that the form data is handled correctly.
2. **Form Validation**: Verify that the form validation works as expected and that appropriate error messages are displayed for invalid inputs.
3. **Password Validation**: Ensure that the password validation messages update correctly based on the entered password.

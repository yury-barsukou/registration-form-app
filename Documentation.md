# Documentation

## SignInForm.js

### Technical Documentation

**Purpose:**
The `SignInForm.js` file contains a React component that renders a sign-in form for users to log into the application. It includes form validation for email and password fields.

**Architecture:**
- **State Management:** Uses React's `useState` hook to manage form data and validation states.
- **Validation:** Email validation is performed using a regular expression. Password validation checks for a minimum length of 8 characters.
- **Form Submission:** The form submission is handled by the `handleSignInSubmit` function, which currently logs the form data to the console.

**Core Logic:**
- `handleSignInInputChange`: Updates the state with the input values and triggers validation.
- `validateEmail`: Validates the email format using a regular expression.
- `isSignInFormValid`: Checks if the form is valid based on the current state.
- `handleSignInSubmit`: Handles the form submission event.

### Functional User Guide

1. **Email Input:**
   - Enter a valid email address in the email input field.
   - If the email is invalid, an error message will be displayed.
2. **Password Input:**
   - Enter a password with at least 8 characters.
   - If the password is too short, an error message will be displayed.
3. **Form Submission:**
   - Click the "Sign In" button to submit the form.
   - The button will be disabled if the form is invalid.

### Testing Checklist

- **Email Validation:**
  - Test with a valid email address.
  - Test with an invalid email address (e.g., missing '@' or domain).
- **Password Validation:**
  - Test with a password that is at least 8 characters long.
  - Test with a password that is shorter than 8 characters.
- **Form Submission:**
  - Test form submission with valid data.
  - Test form submission with invalid data (e.g., invalid email or short password).
- **UI Elements:**
  - Ensure the error messages are displayed correctly for invalid inputs.
  - Ensure the submit button is enabled/disabled based on form validity.

### Example Usage

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import SignInForm from './SignInForm';

ReactDOM.render(<SignInForm />, document.getElementById('root'));
```

This example demonstrates how to render the `SignInForm` component in a React application.

## SignUpForm.js

### Technical Documentation

#### File: `src/SignUpForm.js`

**Purpose:**
The `SignUpForm.js` file implements a user registration form component in React. This form collects user information such as first name, last name, email, and password. It includes validation logic for the email and password fields to ensure that the input meets specific criteria.

**Architecture:**
- **State Management:** Utilizes React's `useState` hook to manage form data and validation states.
- **Form Fields:** Includes input fields for first name, last name, email, and password.
- **Validation:** 
  - **Email Validation:** Uses a regular expression to validate the email format.
  - **Password Validation:** Checks for the presence of uppercase letters, lowercase letters, numbers, and a minimum length of 8 characters.
- **Form Submission:** Handles form submission by validating the entire form and logging the form data to the console.

**Core Logic:**
- **State Variables:**
  - `formData`: Stores the values of the form fields.
  - `passwordValidations`: Stores the validation states for the password.
  - `isEmailValid`: Stores the validation state for the email.
- **Event Handlers:**
  - `handleInputChange`: Updates the state with the input values and triggers validation functions.
  - `validatePassword`: Validates the password based on predefined criteria.
  - `validateEmail`: Validates the email format using a regular expression.
  - `isFormValid`: Checks if all form fields are valid.
  - `handleSubmit`: Handles form submission by preventing the default form action and validating the form.

### Functional User Guide

#### How to Use the SignUpForm Component

1. **Rendering the Component:**
   - Import and include the `SignUpForm` component in your React application.
     ```jsx
     import SignUpForm from './src/SignUpForm';

     function App() {
       return (
         <div className="App">
           <SignUpForm />
         </div>
       );
     }

     export default App;
     ```

2. **Filling Out the Form:**
   - Enter your first name, last name, email, and password in the respective fields.
   - The password field will display validation messages indicating whether the password meets the required criteria.

3. **Form Validation:**
   - The email field will display a validation message if the entered email is not in a valid format.
   - The password field will display validation messages for the following criteria:
     - At least one uppercase character
     - At least one lowercase character
     - At least one number
     - Minimum length of 8 characters

4. **Submitting the Form:**
   - The "Create Account" button will be enabled only if all form fields are valid.
   - Click the "Create Account" button to submit the form.
   - If the form is valid, the form data will be logged to the console.

### Testing Checklist

#### Functional Testing

1. **Initial State:**
   - Verify that all form fields are empty when the component is first rendered.
   - Ensure that the "Create Account" button is disabled initially.

2. **Input Validation:**
   - **First Name and Last Name:**
     - Enter text in the first name and last name fields and verify that the state updates correctly.
   - **Email:**
     - Enter a valid email and verify that no validation message is displayed.
     - Enter an invalid email and verify that a validation message is displayed.
   - **Password:**
     - Enter a password and verify that the validation messages update based on the password criteria.

3. **Form Submission:**
   - Fill out the form with valid data and click the "Create Account" button.
   - Verify that the form data is logged to the console.
   - Fill out the form with invalid data and click the "Create Account" button.
   - Verify that the form is not submitted and appropriate validation messages are displayed.

4. **Edge Cases:**
   - Test with minimum and maximum input lengths for each field.
   - Test with special characters in the input fields.
   - Test the form behavior with rapid input changes. 
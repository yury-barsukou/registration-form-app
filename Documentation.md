# Project Documentation

## SignInForm Component

### Overview
The `SignInForm` component is a React functional component that provides a user interface for signing in. It includes fields for email and password, along with validation logic to ensure the inputs are correct before submission.

### Component Structure
- **State Variables**:
  - `signInData`: An object containing `email` and `password` fields.
  - `isEmailValid`: A boolean indicating whether the email input is valid.
  - `isSignInPasswordValid`: A boolean indicating whether the password input is valid.

- **Event Handlers**:
  - `handleSignInInputChange`: Handles changes to the input fields and updates the state accordingly. It also triggers validation for email and password.
  - `validateEmail`: Validates the email format using a regular expression.
  - `isSignInFormValid`: Checks if the form is valid by ensuring all fields are filled and valid.
  - `handleSignInSubmit`: Handles the form submission. It prevents the default form submission behavior and logs the sign-in data if the form is valid.

- **JSX Structure**:
  - A form with `id="mycompany-login-form"`.
  - Two input fields for email and password.
  - Validation messages for email and password.
  - A "Forgot Password?" link.
  - A submit button that is disabled if the form is not valid.

### Important Information for Testing

#### Endpoints
- No specific endpoints are defined in this component. However, the form submission logic should eventually send data to a server endpoint.

#### Validation Logic
- **Email Validation**: Uses a regular expression to validate the email format.
- **Password Validation**: Ensures the password is at least 8 characters long.

#### Testing Scenarios
##### Positive Cases
1. **Valid Email and Password**:
   - Input a valid email (e.g., `test@example.com`) and a valid password (e.g., `password123`).
   - Ensure the form submits successfully.

##### Negative Cases
1. **Invalid Email**:
   - Input an invalid email (e.g., `invalid-email`).
   - Ensure the email validation message is displayed.
   - Ensure the submit button is disabled.

2. **Invalid Password**:
   - Input a password with less than 8 characters (e.g., `pass`).
   - Ensure the password validation message is displayed.
   - Ensure the submit button is disabled.

##### Edge Cases
1. **Empty Fields**:
   - Leave both email and password fields empty.
   - Ensure the submit button is disabled.

2. **Boundary Values**:
   - Input a password with exactly 8 characters (e.g., `password`).
   - Ensure the form submits successfully.

### Technical Debt
- **Code Structure**: The component is well-structured, but the validation logic can be extracted into separate utility functions for better readability and reusability.
- **Security Vulnerability**: Ensure that the form submission logic includes proper sanitization and validation on the server-side to prevent SQL injection and other attacks.
- **Code Smells**: No significant code smells detected.
- **Code Style**: The code follows standard React and JavaScript conventions.

## SignUpForm Component Documentation

## Overview
The `SignUpForm` component is a React functional component that provides a user interface for signing up new users. It includes fields for first name, last name, email, and password, along with validation logic for the email and password fields.

## Component Structure

### State Variables
- `formData`: An object containing the values of the form fields (`firstName`, `lastName`, `email`, `password`).
- `passwordValidations`: An object containing boolean values indicating whether the password meets certain criteria (uppercase letter, lowercase letter, number, minimum length).
- `isEmailValid`: A boolean indicating whether the entered email is valid.

### Event Handlers
- `handleInputChange`: Updates the state with the current value of the input fields and triggers validation for email and password.
- `validatePassword`: Validates the password based on the criteria and updates the `passwordValidations` state.
- `validateEmail`: Validates the email format using a regular expression and updates the `isEmailValid` state.
- `isFormValid`: Checks if all form fields are filled and valid.
- `handleSubmit`: Handles the form submission, logs the form data if the form is valid, otherwise logs an error.

### JSX Structure
- A form with the following fields:
  - First Name
  - Last Name
  - Email
  - Password
- Password validation messages
- A submit button that is enabled only if the form is valid

## Important Information for Testing

### Endpoints
- No specific endpoints are used in this component. The form submission is logged to the console.

### Validation Logic
- **Email Validation**: Uses a regular expression to validate the email format.
- **Password Validation**: Checks for the presence of at least one uppercase letter, one lowercase letter, one number, and a minimum length of 8 characters.

### Testing Scenarios
1. **Positive Cases**:
   - Enter valid first name, last name, email, and password that meets all criteria. Ensure the form submits successfully.
2. **Negative Cases**:
   - Enter invalid email format and ensure the validation message is displayed.
   - Enter a password that does not meet one or more criteria and ensure the corresponding validation messages are displayed.
   - Leave any of the fields empty and ensure the form cannot be submitted.
3. **Edge Cases**:
   - Enter the minimum length for the first name, last name, and password.
   - Enter the maximum length for the first name and last name (50 characters).
   - Test with various special characters in the email and password fields.

### Boundary Values
- **First Name and Last Name**: Test with 1 character and 50 characters.
- **Password**: Test with 7 characters (invalid) and 8 characters (valid).

## Technical Debt and Code Optimization
- **Code Structure**: The component is well-structured with clear separation of concerns between state management, validation logic, and rendering.
- **Security Vulnerability**: Ensure that the form data is securely handled when integrated with a backend server.
- **Code Smells**: None identified.
- **Code Style Issues**: None identified.

## Example Usage
```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import SignUpForm from './SignUpForm';

ReactDOM.render(<SignUpForm />, document.getElementById('root'));
```

# Documentation for `SignUpForm.test.js`

This file contains the test suite for the `SignUpForm` component. The tests are written using the `@testing-library/react` library and cover various aspects of the sign-up form, including rendering, field entry, form validation, and form submission.

## Test Suite Overview

### Constants and Helper Functions

- **LABELS**: An object containing regex patterns for the form field labels.
- **BUTTON_TEXT**: The text for the "Create Account" button.
- **VALID_EMAIL**: A valid email address used for testing.
- **VALID_PASSWORD**: A valid password used for testing.
- **fillOutForm**: A helper function that fills out the form with default or overridden values.

### Test Cases

#### Rendering Tests

- **renders the sign-up form with all fields**: Ensures that all form fields and the "Create Account" button are rendered.

#### Field Entry Tests

- **allows entry of fieldName**: Tests that each form field allows entry of text.

#### Form Validation Tests

- **validates email format correctly**: Tests that the email field validates the format correctly.
- **validates password criteria correctly**: Tests that the password field validates the criteria (length, uppercase, lowercase, number) correctly.

#### Form Submission Tests

- **enables Create Account button with valid form**: Tests that the "Create Account" button is enabled when the form is valid.
- **disables Create Account button with invalid form**: Tests that the "Create Account" button is disabled when the form is invalid.
- **calls console log with correct data on valid form submission**: Tests that the form data is logged to the console on valid form submission.

## Important Information for Testing

### Endpoints
- No API endpoints are called in these tests. The form submission is logged to the console.

### Specific Calculation/Validation Logic
- **Email Validation**: Ensures that the email format is correct.
- **Password Validation**: Ensures that the password meets the criteria (minimum 8 characters, at least one uppercase letter, one lowercase letter, and one number).

### Testing Scenarios

#### Positive Cases
- Form fields accept valid input.
- Form validation passes with valid email and password.
- "Create Account" button is enabled with valid form data.
- Form submission logs the correct data to the console.

#### Negative Cases
- Form fields reject invalid input.
- Form validation fails with invalid email and password.
- "Create Account" button is disabled with invalid form data.

#### Edge Cases
- Email field with various invalid formats (e.g., missing "@" or domain).
- Password field with various invalid formats (e.g., less than 8 characters, missing uppercase, lowercase, or number).

### Boundary Values
- Email field with the minimum valid format (e.g., "a@b.co").
- Password field with exactly 8 characters, including the required criteria.

## Technical Debt

### Code Structure
- The test file is well-structured with clear separation of different test cases.

### Code Optimizations
- Consider adding more edge cases for email and password validation.

### Security Vulnerability
- No security vulnerabilities identified in the test file.

### Code Smells
- No code smells identified in the test file.

### Code Style Issues
- No code style issues identified in the test file.

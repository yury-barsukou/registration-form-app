# SignUpForm Component Documentation

## Overview
The `SignUpForm` component is a React functional component that provides a user interface for signing up new users. It includes fields for first name, last name, email, and password, along with validation for the email format and password strength.

## Component Structure
- **State Variables:**
  - `formData`: Holds the values of the form fields.
  - `passwordValidations`: Contains boolean values indicating whether the password meets specific criteria.
  - `isEmailValid`: Boolean indicating if the entered email is valid.

- **Functions:**
  - `handleInputChange`: Updates the state as the user types in the input fields and triggers validation for email and password.
  - `validatePassword`: Validates the password against defined criteria (uppercase, lowercase, number, length).
  - `validateEmail`: Validates the email format using a regular expression.
  - `isFormValid`: Checks if the entire form is valid before submission.
  - `handleSubmit`: Handles the form submission, preventing default behavior and logging the form data if valid.

## User Interface
The form includes:
- Input fields for first name, last name, email, and password.
- Validation messages for email and password strength.
- A submit button that is disabled until the form is valid.

## Important for Testing
### Endpoints
- The form does not currently submit to an endpoint but logs the data to the console. This should be updated to send data to a backend service.

### Validation Logic
- **Email Validation:** Uses a regex pattern to validate email format.
- **Password Validation:** Checks for:
  - At least one uppercase letter
  - At least one lowercase letter
  - At least one number
  - Minimum length of 8 characters

## Testing Scenarios
### Positive Cases
1. Valid input for all fields (first name, last name, email, password) and successful form submission.

### Negative Cases
1. Invalid email format (e.g., missing '@', invalid domain).
2. Password missing required criteria (e.g., no uppercase letter, less than 8 characters).
3. Empty fields for first name, last name, email, or password.

### Edge Cases
1. Extremely long input for first name, last name, or email (greater than 50 characters).
2. Password with exactly 8 characters meeting all criteria.
3. Email with special characters allowed by the regex but not commonly used.

## Conclusion
The `SignUpForm` component is essential for user registration and requires thorough testing to ensure all validation rules are correctly implemented and user-friendly.
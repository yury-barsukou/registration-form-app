# Documentation for SignInForm Component

## Technical Documentation

**Purpose:**
The `SignInForm.js` file implements a sign-in form component using React. This component allows users to input their email and password to sign in. It includes validation for the email format and password length.

**Architecture:**
- **State Management:** The component uses React's `useState` hook to manage the state of the sign-in form data (`signInData`), email validation (`isEmailValid`), and password validation (`isSignInPasswordValid`).
- **Event Handlers:** 
  - `handleSignInInputChange`: Updates the state when the user types in the email or password fields and triggers validation.
  - `validateEmail`: Validates the email format using a regular expression.
  - `isSignInFormValid`: Checks if the form is valid based on the email and password validation states.
  - `handleSignInSubmit`: Handles the form submission, preventing the default form submission behavior and logging the sign-in data if the form is valid.

**Core Logic:**
- **Email Validation:** Uses a regular expression to ensure the email format is correct.
- **Password Validation:** Ensures the password is at least 8 characters long.
- **Form Submission:** The submit button is disabled if the form is invalid, preventing submission.

## User Guide

**How to Use:**
1. **Render the Component:**
   - Import and include the `SignInForm` component in your React application.
   ```jsx
   import SignInForm from './SignInForm';

   function App() {
     return (
       <div className="App">
         <SignInForm />
       </div>
     );
   }

   export default App;
   ```

2. **Fill in the Form:**
   - Enter a valid email address in the email field.
   - Enter a password with at least 8 characters in the password field.

3. **Submit the Form:**
   - Click the "Sign In" button to submit the form.
   - If the form is valid, the sign-in data will be logged to the console.

**Example:**
```jsx
import React from 'react';
import SignInForm from './SignInForm';

function App() {
  return (
    <div className="App">
      <h1>Sign In</h1>
      <SignInForm />
    </div>
  );
}

export default App;
```

## Testing Checklist

**Functional Testing:**
- **Email Field:**
  - Test with a valid email format (e.g., `user@example.com`).
  - Test with an invalid email format (e.g., `user@com`, `user@.com`).
  - Verify that the validation message appears for invalid email formats.

- **Password Field:**
  - Test with a password of fewer than 8 characters.
  - Test with a password of 8 or more characters.
  - Verify that the validation message appears for passwords with fewer than 8 characters.

- **Form Submission:**
  - Test form submission with valid email and password.
  - Test form submission with invalid email and/or password.
  - Verify that the submit button is disabled for invalid form data.
  - Verify that the sign-in data is logged to the console for valid form submissions.

**Edge Cases:**
- Test with empty email and password fields.
- Test with leading/trailing spaces in email and password fields.
- Test rapid input changes to ensure state updates correctly.

## Documentation for `SignUpForm.test.js`

### Technical Documentation

#### Purpose
The `SignUpForm.test.js` file contains a suite of tests for the `SignUpForm` component. These tests ensure that the form renders correctly, handles user input, validates form data, and manages form submission appropriately.

#### Architecture
The tests are organized using the `describe` and `test` functions from the Jest testing framework. The `@testing-library/react` library is used to render the component and simulate user interactions.

#### Core Logic
1. **Rendering Tests**: Verify that all form fields and the submit button are rendered.
2. **Field Entry Tests**: Ensure that each form field accepts user input.
3. **Form Validation Tests**: Check that the form validates email format and password criteria correctly.
4. **Form Submission Tests**: Confirm that the form submission logic works as expected, including enabling/disabling the submit button and logging form data.

### User Guide

#### Running the Tests
To run the tests, use the following command:
```bash
npm test src/SignUpForm.test.js
```

#### Test Descriptions
1. **Rendering the Form**:
   - The form should render with fields for first name, last name, email, and password.
   - The submit button should be present.

2. **Field Entry**:
   - Each form field should accept and display user input.

3. **Form Validation**:
   - The email field should display an error message for invalid email formats.
   - The password field should validate criteria such as length, uppercase, lowercase, and numeric characters.

4. **Form Submission**:
   - The submit button should be enabled when the form is valid.
   - The submit button should be disabled when the form is invalid.
   - On valid form submission, the form data should be logged to the console.

#### Example Usage
```javascript
// Example of filling out the form and submitting it
fillOutForm({
  firstName: 'Jane',
  lastName: 'Doe',
  email: 'jane.doe@example.com',
  password: 'SecurePass123',
});
fireEvent.click(screen.getByRole('button', { name: BUTTON_TEXT }));
```

### Testing Checklist

1. **Rendering Tests**:
   - [ ] Verify that the first name field is rendered.
   - [ ] Verify that the last name field is rendered.
   - [ ] Verify that the email field is rendered.
   - [ ] Verify that the password field is rendered.
   - [ ] Verify that the submit button is rendered.

2. **Field Entry Tests**:
   - [ ] Test entry for the first name field.
   - [ ] Test entry for the last name field.
   - [ ] Test entry for the email field.
   - [ ] Test entry for the password field.

3. **Form Validation Tests**:
   - [ ] Validate incorrect email format.
   - [ ] Validate correct email format.
   - [ ] Validate password length.
   - [ ] Validate password uppercase character.
   - [ ] Validate password lowercase character.
   - [ ] Validate password numeric character.

4. **Form Submission Tests**:
   - [ ] Enable submit button with valid form data.
   - [ ] Disable submit button with invalid form data.
   - [ ] Log form data on valid form submission.

---

This documentation provides a comprehensive overview of the `SignUpForm.test.js` file, including its purpose, structure, and usage instructions. It also includes a detailed testing checklist to ensure thorough validation of the form's functionality.

## Technical Documentation

**Purpose:**
The `SignInForm.js` file implements a sign-in form component using React. This component allows users to input their email and password to sign in. It includes validation for the email format and password length.

**Architecture:**
- **State Management:** The component uses React's `useState` hook to manage the state of the sign-in form data (`signInData`), email validation (`isEmailValid`), and password validation (`isSignInPasswordValid`).
- **Event Handlers:** 
  - `handleSignInInputChange`: Updates the state when the user types in the email or password fields and triggers validation.
  - `validateEmail`: Validates the email format using a regular expression.
  - `isSignInFormValid`: Checks if the form is valid based on the email and password validation states.
  - `handleSignInSubmit`: Handles the form submission, preventing the default form submission behavior and logging the sign-in data if the form is valid.

**Core Logic:**
- **Email Validation:** Uses a regular expression to ensure the email format is correct.
- **Password Validation:** Ensures the password is at least 8 characters long.
- **Form Submission:** The submit button is disabled if the form is invalid, preventing submission.

## User Guide

**How to Use:**
1. **Render the Component:**
   - Import and include the `SignInForm` component in your React application.
   ```jsx
   import SignInForm from './SignInForm';

   function App() {
     return (
       <div className="App">
         <SignInForm />
       </div>
     );
   }

   export default App;
   ```

2. **Fill in the Form:**
   - Enter a valid email address in the email field.
   - Enter a password with at least 8 characters in the password field.

3. **Submit the Form:**
   - Click the "Sign In" button to submit the form.
   - If the form is valid, the sign-in data will be logged to the console.

**Example:**
```jsx
import React from 'react';
import SignInForm from './SignInForm';

function App() {
  return (
    <div className="App">
      <h1>Sign In</h1>
      <SignInForm />
    </div>
  );
}

export default App;
```

## Testing Checklist

**Functional Testing:**
- **Email Field:**
  - Test with a valid email format (e.g., `user@example.com`).
  - Test with an invalid email format (e.g., `user@com`, `user@.com`).
  - Verify that the validation message appears for invalid email formats.

- **Password Field:**
  - Test with a password of fewer than 8 characters.
  - Test with a password of 8 or more characters.
  - Verify that the validation message appears for passwords with fewer than 8 characters.

- **Form Submission:**
  - Test form submission with valid email and password.
  - Test form submission with invalid email and/or password.
  - Verify that the submit button is disabled for invalid form data.
  - Verify that the sign-in data is logged to the console for valid form submissions.

**Edge Cases:**
- Test with empty email and password fields.
- Test with leading/trailing spaces in email and password fields.
- Test rapid input changes to ensure state updates correctly.

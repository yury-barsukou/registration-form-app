# Documentation

## UserAuthForms.js

### File Overview

#### Purpose:
The `UserAuthForms.js` file is a React component that manages the display of user authentication forms, specifically the Sign In and Sign Up forms. It allows users to switch between these two forms using buttons.

#### Architecture:
- **State Management:** Utilizes React's `useState` hook to manage the active form state (`signin` or `signup`).
- **Conditional Rendering:** Renders either the `SignInForm` or `SignUpForm` component based on the current state.
- **Styling:** Applies CSS classes for styling and active state indication.
- **Privacy Policy:** Includes a link to the privacy policy.

#### Core Logic:
- **State Initialization:**
  ```javascript
  const [activeForm, setActiveForm] = useState('signin');
  ```
  Initializes the `activeForm` state to `'signin'`.

- **Form Switching:**
  ```javascript
  <button
    data-testid="signin-button"
    className={`switch-button ${activeForm === 'signin' ? 'active' : ''}`}
    onClick={() => setActiveForm('signin')}
  >
    Sign In
  </button>
  <button
    data-testid="signup-button"
    className={`switch-button ${activeForm === 'signup' ? 'active' : ''}`}
    onClick={() => setActiveForm('signup')}
  >
    Sign Up
  </button>
  ```
  These buttons switch the `activeForm` state between `'signin'` and `'signup'`.

- **Conditional Rendering:**
  ```javascript
  {activeForm === 'signin' ? <SignInForm /> : <SignUpForm />}
  ```
  Renders the `SignInForm` component if `activeForm` is `'signin'`, otherwise renders the `SignUpForm` component.

### User Guide

#### How to Use:
1. **Initial View:**
   - The component initially displays the Sign In form.
2. **Switching Forms:**
   - Click the "Sign In" button to view the Sign In form.
   - Click the "Sign Up" button to view the Sign Up form.
3. **Privacy Policy:**
   - Click the "Privacy Policy" link at the bottom to view the privacy policy in a new tab.

#### Example Usage:
```javascript
import React from 'react';
import UserAuthForms from './UserAuthForms';

function App() {
  return (
    <div className="App">
      <UserAuthForms />
    </div>
  );
}

export default App;
```

### Testing Checklist

#### Functional Testing:
- **Initial State:**
  - Verify that the Sign In form is displayed by default.
- **Form Switching:**
  - Click the "Sign In" button and ensure the Sign In form is displayed.
  - Click the "Sign Up" button and ensure the Sign Up form is displayed.
- **Active Button Styling:**
  - Verify that the active button has the `active` class applied.
- **Privacy Policy Link:**
  - Click the "Privacy Policy" link and ensure it opens the correct URL in a new tab.

#### Edge Cases:
- **Rapid Switching:**
  - Rapidly switch between the Sign In and Sign Up forms to ensure the component handles quick state changes gracefully.
- **No State Persistence:**
  - Ensure that the form state does not persist across page reloads (i.e., it should always start with the Sign In form).

## SignUpForm.test.js

### Technical Documentation

#### Purpose
The `SignUpForm.test.js` file contains a suite of tests for the `SignUpForm` component. These tests ensure that the form renders correctly, allows user input, validates form data, and handles form submission appropriately.

#### Architecture
The test file is structured using the `@testing-library/react` library, which provides utilities for rendering components and interacting with them in a way that simulates user behavior.

#### Core Logic
1. **Rendering Tests**: Verify that all form fields and the submit button are rendered.
2. **Field Entry Tests**: Ensure that each form field accepts user input.
3. **Form Validation Tests**: Check that the form validates email format and password criteria correctly.
4. **Form Submission Tests**: Confirm that the form can be submitted when valid and that the submit button is disabled when the form is invalid.

### User Guide

#### Running the Tests
To run the tests in `SignUpForm.test.js`, use the following command:
```bash
npm test
```

#### Test Cases

1. **Rendering the Form**
   - The form should render with fields for first name, last name, email, and password.
   - The form should include a "Create Account" button.

2. **Field Entry**
   - Each form field should accept user input.

3. **Form Validation**
   - The email field should display an error message for invalid email formats.
   - The password field should validate the following criteria:
     - Minimum 8 characters
     - At least 1 uppercase character
     - At least 1 lowercase character
     - At least 1 number

4. **Form Submission**
   - The "Create Account" button should be enabled when the form is valid.
   - The "Create Account" button should be disabled when the form is invalid.
   - Submitting a valid form should log the form data to the console.

### Testing Checklist

1. **Rendering Tests**
   - [ ] Verify that the first name field is rendered.
   - [ ] Verify that the last name field is rendered.
   - [ ] Verify that the email field is rendered.
   - [ ] Verify that the password field is rendered.
   - [ ] Verify that the "Create Account" button is rendered.

2. **Field Entry Tests**
   - [ ] Check that the first name field accepts input.
   - [ ] Check that the last name field accepts input.
   - [ ] Check that the email field accepts input.
   - [ ] Check that the password field accepts input.

3. **Form Validation Tests**
   - [ ] Validate that an error message appears for invalid email formats.
   - [ ] Validate that the password field checks for a minimum of 8 characters.
   - [ ] Validate that the password field checks for at least 1 uppercase character.
   - [ ] Validate that the password field checks for at least 1 lowercase character.
   - [ ] Validate that the password field checks for at least 1 number.

4. **Form Submission Tests**
   - [ ] Ensure the "Create Account" button is enabled with valid form data.
   - [ ] Ensure the "Create Account" button is disabled with invalid form data.
   - [ ] Verify that submitting a valid form logs the correct data to the console.

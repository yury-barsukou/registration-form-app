# Documentation

## SignInForm.js

### Purpose

The `SignInForm.js` file contains a React component that renders a sign-in form. This form allows users to input their email and password to sign in. The component includes validation for the email format and password length.

### Architecture

The `SignInForm` component is a functional React component that uses the `useState` hook to manage form state and validation states. The component consists of the following key parts:

1. **State Management**: The component maintains the state for the form inputs (`email` and `password`) and their validation states (`isEmailValid` and `isSignInPasswordValid`).
2. **Event Handlers**: The component includes event handlers for input changes and form submission.
3. **Validation Functions**: The component includes functions to validate the email format and password length.
4. **Render Method**: The component renders the form with input fields, validation messages, and a submit button.

### Core Logic

1. **State Initialization**: The component initializes the state for `signInData`, `isEmailValid`, and `isSignInPasswordValid` using the `useState` hook.
2. **Input Change Handling**: The `handleSignInInputChange` function updates the state based on user input and triggers validation functions for email and password.
3. **Email Validation**: The `validateEmail` function uses a regular expression to check if the email format is valid and updates the `isEmailValid` state.
4. **Password Validation**: The password validation checks if the password length is at least 8 characters and updates the `isSignInPasswordValid` state.
5. **Form Validation**: The `isSignInFormValid` function checks if all form inputs are valid.
6. **Form Submission**: The `handleSignInSubmit` function handles form submission, preventing the default form submission behavior and logging the form data if the form is valid.

### Key Algorithms and Design Patterns

- **State Management**: The component uses the `useState` hook for managing form state and validation states.
- **Validation**: The component includes validation functions for email and password to ensure the form inputs meet the required criteria.
- **Conditional Rendering**: The component uses conditional rendering to display validation messages and enable/disable the submit button based on form validity.

### Usage Instructions

To use the `SignInForm` component, follow these steps:

1. **Import the Component**: Import the `SignInForm` component into your React application.

```javascript
import SignInForm from './path/to/SignInForm';
```

2. **Render the Component**: Render the `SignInForm` component in your application.

```javascript
function App() {
  return (
    <div className="App">
      <SignInForm />
    </div>
  );
}

export default App;
```

3. **Styling**: Ensure you have the necessary CSS styles for the form. The component imports styles from `UserAuthForms.css`.

### Testing Guidelines

To test the `SignInForm` component, consider the following test cases and edge cases:

1. **Valid Email and Password**: Test with a valid email format and a password with at least 8 characters. Ensure the form submits successfully.
2. **Invalid Email Format**: Test with an invalid email format and check if the email validation message is displayed.
3. **Short Password**: Test with a password shorter than 8 characters and check if the password validation message is displayed.
4. **Empty Fields**: Test with empty email and password fields and ensure the submit button is disabled.
5. **Forgot Password Link**: Test the functionality of the forgot password link to ensure it redirects to the appropriate page.

## SignUpForm.js

### Purpose

The `SignUpForm.js` file contains a React component that renders a sign-up form. This form allows users to input their first name, last name, email, and password to create a new account. The component includes validation for the email format and password strength.

### Architecture

The `SignUpForm` component is a functional React component that uses the `useState` hook to manage form state and validation states. The component consists of the following key parts:

1. **State Management**: The component maintains the state for the form inputs (`firstName`, `lastName`, `email`, and `password`) and their validation states (`isEmailValid` and `passwordValidations`).
2. **Event Handlers**: The component includes event handlers for input changes and form submission.
3. **Validation Functions**: The component includes functions to validate the email format and password strength.
4. **Render Method**: The component renders the form with input fields, validation messages, and a submit button.

### Core Logic

1. **State Initialization**: The component initializes the state for `formData`, `isEmailValid`, and `passwordValidations` using the `useState` hook.
2. **Input Change Handling**: The `handleInputChange` function updates the state based on user input and triggers validation functions for email and password.
3. **Email Validation**: The `validateEmail` function uses a regular expression to check if the email format is valid and updates the `isEmailValid` state.
4. **Password Validation**: The `validatePassword` function checks if the password meets the required criteria (uppercase, lowercase, number, and minimum length) and updates the `passwordValidations` state.
5. **Form Validation**: The `isFormValid` function checks if all form inputs are valid.
6. **Form Submission**: The `handleSubmit` function handles form submission, preventing the default form submission behavior and logging the form data if the form is valid.

### Key Algorithms and Design Patterns

- **State Management**: The component uses the `useState` hook for managing form state and validation states.
- **Validation**: The component includes validation functions for email and password to ensure the form inputs meet the required criteria.
- **Conditional Rendering**: The component uses conditional rendering to display validation messages and enable/disable the submit button based on form validity.

### Usage Instructions

To use the `SignUpForm` component, follow these steps:

1. **Import the Component**: Import the `SignUpForm` component into your React application.

```javascript
import SignUpForm from './path/to/SignUpForm';
```

2. **Render the Component**: Render the `SignUpForm` component in your application.

```javascript
function App() {
  return (
    <div className="App">
      <SignUpForm />
    </div>
  );
}

export default App;
```

3. **Styling**: Ensure you have the necessary CSS styles for the form. The component imports styles from `UserAuthForms.css`.

### Testing Guidelines

To test the `SignUpForm` component, consider the following test cases and edge cases:

1. **Valid Form Data**: Test with valid first name, last name, email, and password. Ensure the form submits successfully.
2. **Invalid Email Format**: Test with an invalid email format and check if the email validation message is displayed.
3. **Weak Password**: Test with a password that does not meet the required criteria and check if the password validation messages are displayed.
4. **Empty Fields**: Test with empty form fields and ensure the submit button is disabled.
5. **Password Criteria**: Test the password input to ensure the validation messages update correctly as the user types.

## UserAuthForms.js

### Purpose

The `UserAuthForms.js` file contains a React component that renders either the sign-in or sign-up form based on the user's selection. This component provides a user-friendly interface for switching between the two forms.

### Architecture

The `UserAuthForms` component is a functional React component that uses the `useState` hook to manage the active form state. The component consists of the following key parts:

1. **State Management**: The component maintains the state for the active form (`signin` or `signup`).
2. **Event Handlers**: The component includes event handlers for switching between the sign-in and sign-up forms.
3. **Render Method**: The component renders the appropriate form based on the active form state and includes buttons for switching between the forms.

### Core Logic

1. **State Initialization**: The component initializes the state for `activeForm` using the `useState` hook.
2. **Form Switching**: The `setActiveForm` function updates the `activeForm` state based on user interaction with the switch buttons.
3. **Conditional Rendering**: The component uses conditional rendering to display either the `SignInForm` or `SignUpForm` component based on the `activeForm` state.

### Key Algorithms and Design Patterns

- **State Management**: The component uses the `useState` hook for managing the active form state.
- **Conditional Rendering**: The component uses conditional rendering to display the appropriate form based on the active form state.
- **Event Handling**: The component includes event handlers for user interactions to switch between forms.

### Usage Instructions

To use the `UserAuthForms` component, follow these steps:

1. **Import the Component**: Import the `UserAuthForms` component into your React application.

```javascript
import UserAuthForms from './path/to/UserAuthForms';
```

2. **Render the Component**: Render the `UserAuthForms` component in your application.

```javascript
function App() {
  return (
    <div className="App">
      <UserAuthForms />
    </div>
  );
}

export default App;
```

3. **Styling**: Ensure you have the necessary CSS styles for the form. The component imports styles from `UserAuthForms.css`.

### Testing Guidelines

To test the `UserAuthForms` component, consider the following test cases and edge cases:

1. **Form Switching**: Test the functionality of the form switch buttons to ensure they correctly switch between the sign-in and sign-up forms.
2. **Sign-In Form**: Test the sign-in form functionality as described in the `SignInForm` testing guidelines.
3. **Sign-Up Form**: Test the sign-up form functionality as described in the `SignUpForm` testing guidelines.
4. **Privacy Policy Link**: Test the privacy policy link to ensure it opens the correct page in a new tab.

## UserAuthForms.css

### Purpose

The `UserAuthForms.css` file contains the CSS styles for the user authentication forms, including the sign-in and sign-up forms. These styles ensure that the forms are visually appealing and consistent across the application.

### Architecture

The CSS file defines styles for various classes used in the authentication forms. The key classes and their purposes are as follows:

1. **.user-entry**: Styles the container for the user entry forms, setting maximum width, margin, padding, and box shadow.
2. **.text-center**: Centers the text.
3. **.main-header**: Styles the main header with font size and margin.
4. **.input-group**: Styles the input group with margin and width.
5. **.form-control**: Styles the form controls (input fields) with padding, margin, border, border-radius, and box-sizing.
6. **.space-above-large**: Styles a container with flex display and center alignment.
7. **.next-button**: Styles the next button with padding, background color, text color, border, border-radius, cursor, and box-sizing. Includes hover and disabled states.
8. **.password-validation**: Styles the password validation container with margin and text alignment.
9. **.password-validation p**: Styles the paragraphs within the password validation container.
10. **.password-validation ul**: Styles the unordered list within the password validation container.
11. **.password-validation li.green**: Styles the list items with green color for valid criteria.
12. **.password-validation li.red**: Styles the list items with red color for invalid criteria.
13. **.email-validation-message.invalid**: Styles the invalid email validation message with red color and font size.
14. **.password-validation-message.invalid**: Styles the invalid password validation message with red color and font size.
15. **.venue-checkbox-container**: Styles the venue checkbox container with margin and text alignment.
16. **.legal-link**: Styles the legal link with color and text decoration, including hover state.
17. **.privacy-policy**: Styles the privacy policy container with margin and text alignment.
18. **.checkbox-container**: Styles the checkbox container with text alignment.
19. **.form-switch**: Styles the form switch buttons container with flex display and margin.
20. **.switch-button**: Styles the switch buttons with padding, margin, border, background color, and cursor. Includes active state.
21. **.forgot-password**: Styles the forgot password link container with text alignment and margin.
22. **.forgot-password a**: Styles the forgot password link with color and text decoration, including hover state.

### Usage Instructions

To use the styles defined in `UserAuthForms.css`, follow these steps:

1. **Import the CSS File**: Import the `UserAuthForms.css` file into your React component or main application file.

```javascript
import './UserAuthForms.css';
```

2. **Apply Classes**: Apply the defined classes to the appropriate elements in your React components.

```javascript
<div className="user-entry">
  <h1 className="main-header text-center">Sign In</h1>
  <div className="input-group">
    <input type="email" className="form-control" placeholder="Email" />
  </div>
  <div className="input-group">
    <input type="password" className="form-control" placeholder="Password" />
  </div>
  <button className="next-button">Sign In</button>
</div>
```

### Testing Guidelines

To test the styles defined in `UserAuthForms.css`, consider the following test cases:

1. **Responsive Design**: Ensure the forms are responsive and look good on different screen sizes.
2. **Hover States**: Test the hover states of buttons and links to ensure they change appearance as expected.
3. **Validation Messages**: Test the appearance of validation messages for email and password fields.
4. **Button States**: Test the enabled and disabled states of buttons to ensure they appear correctly.
5. **Text Alignment**: Ensure the text alignment is consistent across different elements.

By following these guidelines, you can ensure that the `UserAuthForms.css` file provides consistent and visually appealing styles for the user authentication forms.

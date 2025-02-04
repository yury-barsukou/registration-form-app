# Documentation for `logo.svg`

## Technical Documentation

### File Purpose
The `logo.svg` file is used to display a logo, likely for a web application or a project. SVG files are preferred for logos because they are scalable without losing quality, making them suitable for various screen sizes and resolutions.

### Architecture and Core Logic
- **SVG Namespace:** The file starts with the SVG namespace declaration, ensuring that the content is recognized as SVG.
- **ViewBox:** The `viewBox` attribute defines the position and dimension of the SVG viewport.
- **Group (`<g>`):** The `<g>` element groups SVG shapes together. In this file, it groups the paths and circle that make up the logo.
- **Paths (`<path>`):** The `<path>` elements define the shapes of the logo using a series of commands and parameters within the `d` attribute.
- **Circle (`<circle>`):** The `<circle>` element defines a circle shape within the logo.

## User Guide

### How to Use the Logo
1. **Embedding in HTML:**
   To use the logo in an HTML file, you can embed the SVG directly:
   ```html
   <img src="src/logo.svg" alt="Logo">
   ```
   or use the `<svg>` tag directly:
   ```html
   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 841.9 595.3">
     <g fill="#61DAFB">
       <path d="..."/>
       <circle cx="420.9" cy="296.5" r="45.7"/>
       <path d="..."/>
     </g>
   </svg>
   ```

2. **Styling:**
   You can style the SVG using CSS. For example, to change the fill color:
   ```css
   svg {
     fill: #000000; /* Change the fill color to black */
   }
   ```

## Testing Checklist

1. **Rendering:**
   - Ensure the SVG logo renders correctly in different browsers (Chrome, Firefox, Safari, Edge).
   - Verify that the logo scales properly without losing quality on different screen sizes and resolutions.

2. **Embedding:**
   - Test embedding the SVG in an HTML file using both the `<img>` tag and the inline `<svg>` tag.
   - Check that the logo displays correctly when embedded in various web pages.

3. **Styling:**
   - Apply different CSS styles to the SVG and verify that the styles are applied correctly.
   - Test changing the fill color, stroke color, and other SVG properties using CSS.

4. **Accessibility:**
   - Ensure the SVG has appropriate `alt` text when used with the `<img>` tag for accessibility.
   - Verify that screen readers can interpret the SVG content if necessary.

5. **Performance:**
   - Check the loading performance of the SVG file on web pages.
   - Ensure that the SVG file size is optimized for faster loading times.

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

# Documentation for UserAuthForms Component

## Technical Documentation

### File Purpose
The `UserAuthForms.js` file is a React component that manages the display of user authentication forms, specifically the Sign In and Sign Up forms. It allows users to switch between these two forms using buttons.

### Architecture and Core Logic
- **State Management:** 
  - The component uses the `useState` hook to manage the `activeForm` state, which determines whether the Sign In or Sign Up form is currently active.
- **Conditional Rendering:**
  - Based on the value of `activeForm`, the component conditionally renders either the `SignInForm` or `SignUpForm` component.
- **Event Handling:**
  - The component includes buttons that allow users to switch between the Sign In and Sign Up forms. Clicking these buttons updates the `activeForm` state.
- **Styling:**
  - The component applies CSS classes for styling, including conditional classes to highlight the active form button.

### Key Components
- **State:**
  - `activeForm`: A string that can be either 'signin' or 'signup', indicating which form is currently active.
- **Functions:**
  - `setActiveForm`: A function to update the `activeForm` state.
- **Child Components:**
  - `SignInForm`: The component for the Sign In form.
  - `SignUpForm`: The component for the Sign Up form.

## User Guide

### How to Use
1. **Initial Display:**
   - By default, the Sign In form is displayed when the component is first rendered.
2. **Switching Forms:**
   - To switch to the Sign Up form, click the "Sign Up" button.
   - To switch back to the Sign In form, click the "Sign In" button.
3. **Privacy Policy:**
   - A link to the Privacy Policy is provided at the bottom of the form. Clicking this link will open the Privacy Policy in a new tab.

### Example Usage
```jsx
import React from 'react';
import UserAuthForms from './UserAuthForms';

const App = () => {
  return (
    <div>
      <UserAuthForms />
    </div>
  );
};

export default App;
```

## Testing Checklist

### Functional Testing
- **Initial State:**
  - Verify that the Sign In form is displayed by default.
- **Form Switching:**
  - Click the "Sign Up" button and verify that the Sign Up form is displayed.
  - Click the "Sign In" button and verify that the Sign In form is displayed.
- **Button States:**
  - Verify that the active button has the `active` class applied.
  - Verify that the inactive button does not have the `active` class applied.
- **Privacy Policy Link:**
  - Verify that the Privacy Policy link opens the correct URL in a new tab.

### Edge Cases
- **Rapid Switching:**
  - Rapidly switch between the Sign In and Sign Up forms and ensure the component handles the state changes correctly.
- **Accessibility:**
  - Ensure that the buttons and links are accessible via keyboard navigation.

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

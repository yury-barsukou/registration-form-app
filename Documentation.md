## UserAuthForms.css

### Technical Documentation

#### Purpose
The `UserAuthForms.css` file contains the CSS styles for the user authentication forms, including login, registration, and password reset forms. The styles ensure a consistent and visually appealing design across all user authentication-related components.

#### Architecture and Core Logic
The file is structured with various CSS classes that target specific elements within the user authentication forms. The styles are designed to provide a clean and user-friendly interface, with attention to layout, spacing, and interactive elements.

#### Key Components
- **.user-entry**: Styles the main container for the user entry forms, setting a maximum width, centering the content, and adding padding and a box shadow.
- **.text-center**: Centers the text within the element.
- **.main-header**: Styles the main header with a larger font size and bottom margin.
- **.input-group**: Adds margin and sets the width for input groups.
- **.form-control**: Styles the form controls with padding, border, and border-radius.
- **.space-above-large**: Centers the content within a flex container.
- **.next-button**: Styles the primary button with padding, background color, and hover effects.
- **.password-validation**: Styles the password validation messages with margin and text alignment.
- **.email-validation-message.invalid, .password-validation-message.invalid**: Styles the validation messages for invalid inputs with red color and smaller font size.
- **.venue-checkbox-container**: Adds margin and centers the content for the checkbox container.
- **.legal-link**: Styles the legal links with color and hover effects.
- **.privacy-policy**: Adds margin and centers the text for the privacy policy section.
- **.checkbox-container**: Centers the content for the checkbox container.
- **.form-switch**: Styles the container for form switch buttons with flexbox and margin.
- **.switch-button**: Styles the switch buttons with padding, margin, border, and background color.
- **.switch-button.active**: Adds a bottom border to the active switch button.
- **.forgot-password**: Styles the forgot password link with text alignment and margin.
- **.forgot-password a**: Styles the anchor tag within the forgot password link with color and hover effects.

### Functional User Guide

#### How to Use
1. **Include the CSS File**: Ensure that the `UserAuthForms.css` file is included in your HTML or JavaScript file.
   ```html
   <link rel="stylesheet" href="path/to/UserAuthForms.css">
   ```
2. **Apply Classes**: Use the provided CSS classes in your HTML elements to style the user authentication forms.
   ```html
   <div class="user-entry">
       <h1 class="main-header text-center">Login</h1>
       <div class="input-group">
           <label for="email">Email</label>
           <input type="email" id="email" class="form-control">
       </div>
       <div class="input-group">
           <label for="password">Password</label>
           <input type="password" id="password" class="form-control">
       </div>
       <button class="next-button">Login</button>
       <div class="forgot-password">
           <a href="#">Forgot Password?</a>
       </div>
   </div>
   ```
3. **Customize Styles**: If needed, you can customize the styles by overriding the existing classes in your own CSS file.

### Testing Checklist

1. **Layout and Spacing**:
   - Verify that the `.user-entry` container is centered and has appropriate padding and box shadow.
   - Check that the `.main-header` has the correct font size and margin.
   - Ensure that the `.input-group` elements have the correct margin and width.

2. **Form Controls**:
   - Verify that the `.form-control` elements have the correct padding, border, and border-radius.
   - Check that the `.next-button` has the correct background color, padding, and hover effects.
   - Ensure that the `.next-button.btn-disabled` has the correct disabled styles.

3. **Validation Messages**:
   - Verify that the `.email-validation-message.invalid` and `.password-validation-message.invalid` have the correct red color and font size.

4. **Interactive Elements**:
   - Check that the `.legal-link` and `.forgot-password a` have the correct color and hover effects.
   - Ensure that the `.switch-button` elements have the correct padding, margin, border, and background color.
   - Verify that the `.switch-button.active` has the correct bottom border.

5. **Responsive Design**:
   - Test the styles on different screen sizes to ensure that the layout and spacing are responsive and visually appealing.

## UserAuthForms.js

### Technical Documentation

#### Purpose
The `UserAuthForms.js` file is a React component that provides a user interface for switching between Sign In and Sign Up forms. It manages the state to toggle between these forms and renders the appropriate form based on the current state.

#### Architecture
- **State Management:** Uses React's `useState` hook to manage the active form state (`signin` or `signup`).
- **Components Used:**
  - `SignInForm`: Component for the Sign In form.
  - `SignUpForm`: Component for the Sign Up form.
- **CSS:** Imports styles from `UserAuthForms.css`.

#### Core Logic
- **State Initialization:**
  ```javascript
  const [activeForm, setActiveForm] = useState('signin');
  ```
  Initializes the state to determine which form is currently active. The default state is set to `'signin'`.

- **Form Toggle:**
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
  These buttons allow the user to switch between the Sign In and Sign Up forms. The `onClick` event updates the `activeForm` state.

- **Conditional Rendering:**
  ```javascript
  {activeForm === 'signin' ? <SignInForm /> : <SignUpForm />}
  ```
  Renders the `SignInForm` component if the `activeForm` state is `'signin'`, otherwise renders the `SignUpForm` component.

### Functional User Guide

#### How to Use
1. **Initial View:**
   - The component initially displays the Sign In form.
   - The header will read "Sign In".

2. **Switching Forms:**
   - Click the "Sign Up" button to switch to the Sign Up form.
   - The header will change to "Sign Up".
   - Click the "Sign In" button to switch back to the Sign In form.

3. **Privacy Policy:**
   - A link to the Privacy Policy is provided at the bottom of the forms.
   - Clicking the link will open the Privacy Policy in a new tab.

#### Example Usage
To use the `UserAuthForms` component, simply import and include it in your JSX:
```javascript
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

- **Initial Render:**
  - Verify that the Sign In form is displayed by default.
  - Check that the header reads "Sign In".

- **Form Switching:**
  - Click the "Sign Up" button and verify that the Sign Up form is displayed.
  - Check that the header changes to "Sign Up".
  - Click the "Sign In" button and verify that the Sign In form is displayed again.
  - Check that the header changes back to "Sign In".

- **Button States:**
  - Ensure that the active button has the `active` class applied.
  - Verify that the inactive button does not have the `active` class.

- **Privacy Policy Link:**
  - Verify that the Privacy Policy link is present.
  - Check that clicking the link opens the Privacy Policy in a new tab.



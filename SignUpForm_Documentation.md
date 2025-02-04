## SignUpForm Component

### Technical Documentation

#### File: `src/SignUpForm.js`

##### Purpose:
The `SignUpForm.js` file implements a user registration form using React. It allows users to input their first name, last name, email, and password. The form includes validation for the email and password fields to ensure they meet specific criteria.

##### Architecture:
- **State Management:** The component uses React's `useState` hook to manage form data and validation states.
- **Form Fields:** The form includes fields for first name, last name, email, and password.
- **Validation:** 
  - **Email Validation:** Uses a regular expression to validate the email format.
  - **Password Validation:** Checks for the presence of uppercase letters, lowercase letters, numbers, and a minimum length of 8 characters.
- **Form Submission:** The form data is logged to the console upon successful submission.

##### Core Logic:
1. **State Initialization:**
   ```javascript
   const [formData, setFormData] = useState({
     firstName: '',
     lastName: '',
     email: '',
     password: '',
   });

   const [passwordValidations, setPasswordValidations] = useState({
     hasUppercase: false,
     hasLowercase: false,
     hasNumber: false,
     isLongEnough: false,
   });

   const [isEmailValid, setIsEmailValid] = useState(true);
   ```

2. **Input Change Handling:**
   ```javascript
   const handleInputChange = (e) => {
     const { name, value } = e.target;
     setFormData({ ...formData, [name]: value });

     if (name === 'password') {
       validatePassword(value);
     } else if (name === 'email') {
       validateEmail(value);
     }
   };
   ```

3. **Password Validation:**
   ```javascript
   const validatePassword = (password) => {
     setPasswordValidations({
       hasUppercase: /[A-Z]/.test(password),
       hasLowercase: /[a-z]/.test(password),
       hasNumber: /[0-9]/.test(password),
       isLongEnough: password.length >= 8,
     });
   };
   ```

4. **Email Validation:**
   ```javascript
   const validateEmail = (email) => {
     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     setIsEmailValid(emailRegex.test(email));
   };
   ```

5. **Form Validation:**
   ```javascript
   const isFormValid = () => {
     return (
       formData.firstName &&
       formData.lastName &&
       formData.email &&
       isEmailValid &&
       Object.values(passwordValidations).every(Boolean)
     );
   };
   ```

6. **Form Submission:**
   ```javascript
   const handleSubmit = (e) => {
     e.preventDefault();
     if (isFormValid()) {
       console.log('Form submitted:', formData);
     } else {
       console.error('Form is invalid');
     }
   };
   ```

### User Guide

#### How to Use
1. **First Name:** Enter your first name in the "First Name" field.
2. **Last Name:** Enter your last name in the "Last Name" field.
3. **Email:** Enter a valid email address in the "Email" field. If the email is invalid, an error message will be displayed.
4. **Password:** Enter a password in the "Password" field. The password must contain at least one uppercase letter, one lowercase letter, one number, and be at least 8 characters long. The validation criteria will be displayed and updated as you type.
5. **Submit:** Click the "Create Account" button to submit the form. The button will be disabled if the form is invalid.

#### Example
```jsx
<SignUpForm />
```

### Testing Checklist

#### Functional Testing
- **First Name Field:**
  - Enter a valid first name.
  - Ensure the input is reflected in the state.
- **Last Name Field:**
  - Enter a valid last name.
  - Ensure the input is reflected in the state.
- **Email Field:**
  - Enter a valid email address.
  - Enter an invalid email address and check for the error message.
- **Password Field:**
  - Enter a password that meets all validation criteria.
  - Enter a password that fails one or more criteria and check the validation messages.
- **Form Submission:**
  - Submit the form with all valid inputs and check the console for the form data.
  - Attempt to submit the form with invalid inputs and check for the error message.

#### Edge Cases
- **Empty Fields:** Ensure the form cannot be submitted with empty fields.
- **Invalid Email:** Ensure the form cannot be submitted with an invalid email.
- **Weak Password:** Ensure the form cannot be submitted with a password that does not meet all validation criteria.

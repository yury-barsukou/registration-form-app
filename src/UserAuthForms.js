import React, { useState } from 'react';
import './UserAuthForms.css'; // Ensure this CSS file exists and contains the styles mentioned earlier

const UserAuthForms = () => {
  const [activeForm, setActiveForm] = useState('signup'); // 'signup' or 'signin'

  // Registration form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  // Sign In form state
  const [signInData, setSignInData] = useState({
    email: '',
    password: '',
  });

  // Registration form password validations state
  const [passwordValidations, setPasswordValidations] = useState({
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    isLongEnough: false,
  });

  // Registration form email validation state
  const [isEmailValid, setIsEmailValid] = useState(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'password') {
      validatePassword(value);
    } else if (name === 'email') {
      validateEmail(value);
    }
  };

  const validatePassword = (password) => {
    setPasswordValidations({
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      isLongEnough: password.length >= 8,
    });
  };

  const validateEmail = (email) => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    setIsEmailValid(emailRegex.test(email));
  };

  const isFormValid = () => {
    return (
      formData.firstName &&
      formData.lastName &&
      isEmailValid &&
      Object.values(passwordValidations).every(Boolean)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      console.log('Form submitted:', formData);
      // Here you would typically handle the form submission, e.g., sending data to a server
    } else {
      console.error('Form is invalid');
    }
  };

  const handleSignInInputChange = (e) => {
    const { name, value } = e.target;
    setSignInData({ ...signInData, [name]: value });
  };

  const handleSignInSubmit = (e) => {
    e.preventDefault();
    console.log('Sign In submitted:', signInData);
    // Handle the sign-in form submission, e.g., sending data to a server
  };

  const isSignInFormValid = () => {
    return signInData.email && signInData.password;
  };

  return (
    <div className="user-entry">
      <h1 className="text-center main-header">
        {activeForm === 'signup' ? 'Sign Up' : 'Sign In'}
      </h1>
      <div className="form-switch">
        <button
          className={`switch-button ${activeForm === 'signup' ? 'active' : ''}`}
          onClick={() => setActiveForm('signup')}
        >
          Sign Up
        </button>
        <button
          className={`switch-button ${activeForm === 'signin' ? 'active' : ''}`}
          onClick={() => setActiveForm('signin')}
        >
          Sign In
        </button>
      </div>
      {activeForm === 'signup' ? (
        // Registration form
        <form id="mycompany-create-form" onSubmit={handleSubmit}>
          {/* First Name */}
          <div className="input-group">
            <label htmlFor="company_fname_create">First Name</label>
            <input
              type="text"
              id="company_fname_create"
              className="form-control"
              name="firstName"
              autoComplete="given-name"
              maxLength="50"
              value={formData.firstName}
              onChange={handleInputChange}
            />
          </div>
          {/* Last Name */}
          <div className="input-group">
            <label htmlFor="company_lname_create">Last Name</label>
            <input
              type="text"
              id="company_lname_create"
              className="form-control"
              name="lastName"
              autoComplete="family-name"
              maxLength="50"
              value={formData.lastName}
              onChange={handleInputChange}
            />
          </div>
          {/* Email */}
          <div className="input-group">
            <label htmlFor="company_email_create">Email</label>
            <input
              type="email"
              id="company_email_create"
              className="form-control"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            {!isEmailValid && (
              <div className="email-validation-message invalid">
                Please enter a valid email address.
              </div>
            )}
          </div>
          {/* Password */}
          <div className="input-group">
            <label htmlFor="company_pass_create">Password</label>
            <input
              type="password"
              id="company_pass_create"
              className="form-control"
              name="password"
              autoComplete="new-password"
              value={formData.password}
              onChange={handleInputChange}
            />
            <div className="password-validation">
              <p>Password must contain the following:</p>
              <ul>
                <li className={passwordValidations.hasUppercase ? 'valid' : 'invalid'}>
                  1 uppercase character
                </li>
                <li className={passwordValidations.hasLowercase ? 'valid' : 'invalid'}>
                  1 lowercase character
                </li>
                <li className={passwordValidations.hasNumber ? 'valid' : 'invalid'}>
                  1 number
                </li>
                <li className={passwordValidations.isLongEnough ? 'valid' : 'invalid'}>
                  Minimum 8 characters
                </li>
              </ul>
            </div>
          </div>
          {/* Submit Button */}
          <div className="space-above-large">
            <button
              id="nextButton"
              className={`next-button btn-new btn-large ${isFormValid() ? '' : 'btn-disabled'}`}
              disabled={!isFormValid()}
              type="submit"
            >
              Create Account
            </button>
          </div>
        </form>
      ) : (
        // Sign In form
        <form id="mycompany-login-form" onSubmit={handleSignInSubmit}>
          <div className="inner-form-wrapper">
            {/* Email */}
            <div className="input-group">
              <label htmlFor="company_email_login">Email</label>
              <input
                type="email"
                id="company_email_login"
                className="form-control"
                name="email"
                autoComplete="email"
                value={signInData.email}
                onChange={handleSignInInputChange}
              />
            </div>
            {/* Password */}
            <div className="input-group">
              <label htmlFor="company_pass_login">Password</label>
              <input
                type="password"
                id="company_pass_login"
                className="form-control"
                name="password"
                autoComplete="current-password"
                value={signInData.password}
                onChange={handleSignInInputChange}
              />
            </div>
            {/* Forgot Password Link */}
            <div className="forgot-password">
              <a href="#" tabIndex="0">Forgot Password?</a>
            </div>
            {/* Submit Button */}
            <div className="space-above-large">
              <button
                id="sign_in_btn"
                className={`next-button btn-new btn-large ${isSignInFormValid() ? '' : 'btn-disabled'}`}
                disabled={!isSignInFormValid()}
                type="submit"
              >
                Sign In
              </button>
            </div>
          </div>
        </form>
      )}
      {/* Privacy Policy */}
      <div className="privacy-policy text-center m-top-sm m-bottom-lg">
        <a className="legal-link" target="_blank" href="https://www.company.com/about-privacy-policy_US_AU_NZ_v10.html" rel="noopener noreferrer">
          Privacy Policy
        </a>
      </div>
    </div>
  );
};

export default UserAuthForms;
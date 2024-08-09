import React, { useState } from 'react';
import './UserAuthForms.css';

const SignInForm = () => {
  const [signInData, setSignInData] = useState({
    email: '',
    password: '',
  });

  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isSignInPasswordValid, setIsSignInPasswordValid] = useState(true);

  const handleSignInInputChange = (e) => {
    const { name, value } = e.target;
    setSignInData({ ...signInData, [name]: value });
    if (name === 'email') {
      validateEmail(value);
    } else if (name === 'password') {
      setIsSignInPasswordValid(value.length >= 8);
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    setIsEmailValid(emailRegex.test(email));
  };

  const isSignInFormValid = () => {
    return signInData.email && isEmailValid && isSignInPasswordValid;
  };

  const handleSignInSubmit = (e) => {
    e.preventDefault();
    if (isSignInFormValid()) {
      console.log('Sign In submitted:', signInData);
      // Handle the sign-in form submission, e.g., sending data to a server
    }
  };

  return (
    <form id="mycompany-login-form" onSubmit={handleSignInSubmit}>
      <div className="inner-form-wrapper">
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
          {!isEmailValid && (
            <div className="email-validation-message invalid">
              Please enter a valid email address
            </div>
          )}
        </div>
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
          {!isSignInPasswordValid && (
            <div className="password-validation-message invalid">
              Your password must have at least 8 characters
            </div>
          )}
        </div>
        <div className="forgot-password">
          <a href="#" tabIndex="0">Forgot Password?</a>
        </div>
        <div className="space-above-large">
          {/* Form submission is blocked on a disabled Submit button due to invalid form data */}
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
  );
};

export default SignInForm;
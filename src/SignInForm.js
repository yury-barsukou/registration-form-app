import React, { useState } from 'react';
import './UserAuthForms.css';

const SignInForm = ({ onSubmit, isSubmitting = false }) => {
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
    // mark validation state for empty fields so errors are shown to the user
    if (!signInData.email) {
      setIsEmailValid(false);
    }
    if (!signInData.password || signInData.password.length < 8) {
      setIsSignInPasswordValid(false);
    }

    if (isSignInFormValid()) {
      if (onSubmit) {
        onSubmit(signInData);
      }
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword((s) => !s);

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
            type={showPassword ? 'text' : 'password'}
            id="company_pass_login"
            className="form-control"
            name="password"
            autoComplete="current-password"
            value={signInData.password}
            onChange={handleSignInInputChange}
          />
          <button
            type="button"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            className="show-password-toggle"
            onClick={toggleShowPassword}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
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
            disabled={!isSignInFormValid() || isSubmitting}
            type="submit"
          >
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </button>
        </div>
      </div>
    </form>
  );
};

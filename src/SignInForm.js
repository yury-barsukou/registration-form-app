import React, { useState } from 'react';
import './RegistrationForm.css'; // Reuse the existing styles

const SignInForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [isEmailValid, setIsEmailValid] = useState(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'email') {
      validateEmail(value);
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    setIsEmailValid(emailRegex.test(email));
  };

  const isFormValid = () => {
    return (
      isEmailValid &&
      formData.password.length >= 8 // Simple validation for demonstration
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      console.log('Sign In submitted:', formData);
      // Handle Sign In logic here
    } else {
      console.error('Form is invalid');
    }
  };

  return (
    <div id="myaxs-sign-in-auth" className="user-entry">
      <h1 className="text-center main-header">Sign In</h1>
      <form id="myaxs-sign-in-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="axs_email_signin">Email</label>
          <input
            type="email"
            id="axs_email_signin"
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
        <div className="input-group">
          <label htmlFor="axs_pass_signin">Password</label>
          <input
            type="password"
            id="axs_pass_signin"
            className="form-control"
            name="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-above-large">
          <button
            id="signinButton"
            className={`next-button btn-new btn-large ${isFormValid() ? '' : 'btn-disabled'}`}
            disabled={!isFormValid()}
            type="submit"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
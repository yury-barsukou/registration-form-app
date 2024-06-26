import React, { useState } from 'react';
import './RegistrationForm.css'; // Ensure this CSS file exists and contains the styles mentioned earlier

const RegistrationForm = () => {
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

  return (
    <div id="myaxs-sign-up-auth" className="user-entry">
    <h1 className="text-center main-header">Sign Up</h1>
    <form id="myaxs-create-form" onSubmit={handleSubmit}>
      <div className="inner-form-wrapper">
        {/* First Name */}
        <div className="input-group">
          <label htmlFor="axs_fname_create">First Name</label>
          <input
            type="text"
            id="axs_fname_create"
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
          <label htmlFor="axs_lname_create">Last Name</label>
          <input
            type="text"
            id="axs_lname_create"
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
          <label htmlFor="axs_email_create">Email</label>
          <input
            type="email"
            id="axs_email_create"
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
          <label htmlFor="axs_pass_create">Password</label>
          <input
            type="password"
            id="axs_pass_create"
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
        </div>
        {/* Terms and Conditions */}
        <div id="termsConditions-container">
          <div className="venue-checkbox-container checkbox-container cf text-center m-top-md">
            <label htmlFor="venue-checkbox">
              By clicking Create Account, you agree to the AXS's{' '}
              <a className="legal-link" href="https://www.axs.com/about-terms-of-use_US_v3.html" target="_blank" rel="noopener noreferrer">
                Terms & Conditions
              </a>
            </label>
          </div>
          <div className="privacy-policy text-center m-top-sm m-bottom-lg">
            <a className="legal-link" target="_blank" href="https://www.axs.com/about-privacy-policy_US_AU_NZ_v10.html" rel="noopener noreferrer">
              Privacy Policy
            </a>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
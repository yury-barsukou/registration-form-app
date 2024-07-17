import React, { useState } from 'react';
import './RegistrationForm.css';

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
    return formData.email && isEmailValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      console.log('Sign-in submitted:', formData);
      // Here you would typically handle the form submission, e.g., sending data to a server
    } else {
      console.error('Form is invalid');
    }
  };

  return (
    <div className="user-entry">
    <h1 className="text-center main-header">Sign In</h1>
    <form onSubmit={handleSubmit}>
      <div className="input-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          className="form-control"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
      </div>
      <div className="input-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          className="form-control"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />
      </div>
      <button
        type="submit"
        disabled={!isFormValid()}
        className={`submit-button ${isFormValid() ? '' : 'btn-disabled'}`}
      >
        Sign In
      </button>
    </form>
    </div>
  );
};

export default SignInForm;

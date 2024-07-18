import React, { useState } from 'react';
import './UserAuthForms.css';

const SignUpForm = () => {
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
    } else {
      console.error('Form is invalid');
    }
  };

  return (
    <div className="user-entry">
      <form onSubmit={handleSubmit}>
        {/* Signup form JSX here */}
      </form>
    </div>
  );
};

export default SignUpForm;
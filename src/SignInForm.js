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
    } else {
      console.error('Sign In form is invalid');
    }
  };

  return (
    <div className="user-entry">
      <form onSubmit={handleSignInSubmit}>
        {/* Signin form JSX here */}
      </form>
    </div>
  );
};

export default SignInForm;
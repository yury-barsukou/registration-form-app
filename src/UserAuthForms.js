import React, { useState } from 'react';
import './UserAuthForms.css';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

const UserAuthForms = () => {
  const [activeForm, setActiveForm] = useState('signin'); // 'signin' or 'signup'

  return (
    <div className="user-entry">
      <h1 className="text-center main-header">
        {activeForm === 'signin' ? 'Sign In' : 'Sign Up'}
      </h1>
      <div className="form-switch">
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
      </div>
      {activeForm === 'signin' ? <SignInForm /> : <SignUpForm />}
      <div className="privacy-policy text-center m-top-sm m-bottom-lg">
        <a className="legal-link" target="_blank" href="https://www.company.com/about-privacy-policy_US_AU_NZ_v10.html" rel="noopener noreferrer">
          Privacy Policy
        </a>
      </div>
    </div>
  );
};

export default UserAuthForms;
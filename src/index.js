import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import RegistrationForm from './RegistrationForm';
import SignInForm from './SignInForm';
import reportWebVitals from './reportWebVitals';

const App = () => {
  const [activeForm, setActiveForm] = useState('signup');

  return (
    <>
      <nav aria-label="Sign In" className="axsid-global-nav inner-form-wrapper">
        <div id="signin-nav" className={`axsid-nav-item ${activeForm === 'signin' ? 'axsid-nav-item--active' : ''}`} onClick={() => setActiveForm('signin')}>
          <a className="nav-header">AXS Sign In</a>
        </div>
        <div id="signup-nav" className={`axsid-nav-item ${activeForm === 'signup' ? 'axsid-nav-item--active' : ''}`} onClick={() => setActiveForm('signup')}>
          <a className="nav-header">Create AXS Account</a>
        </div>
      </nav>
      {activeForm === 'signup' && <RegistrationForm />}
      {activeForm === 'signin' && <SignInForm />}
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();

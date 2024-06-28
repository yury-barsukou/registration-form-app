import React, { useState } from 'react';
import './RegistrationForm.css';

const SignInForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Sign In submitted:', formData);
    // Handle Sign In here
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
        <div className="space-above-large">
          <button
            className="next-button btn-new btn-large"
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
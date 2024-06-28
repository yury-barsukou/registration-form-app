import React from 'react';
import './SignInForm.css';

export default function SignInForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;
    console.log(`Email: ${email.value}, Password: ${password.value}`);
  };

  return (
    <form onSubmit={handleSubmit} className="signInForm">
      <label htmlFor="email">Email:</label>
      <input type="email" id="email" name="email" required />

      <label htmlFor="password">Password:</label>
      <input type="password" id="password" name="password" required />

      <button type="submit">Sign In</button>
    </form>
  );
}
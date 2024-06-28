import React from 'react';
import './SignInForm.css';

export default function SignInForm() {
  return (
    <div className='signInContainer'>
      <form className='signInForm'>
        <label htmlFor='email'>Email:</label>
        <input type='email' id='email' name='email' required />

        <label htmlFor='password'>Password:</label>
        <input type='password' id='password' name='password' required />

        <button type='submit'>Sign In</button>
      </form>
    </div>
  );
}
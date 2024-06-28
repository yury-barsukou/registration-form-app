import React from 'react';
import './SignInForm.css';

export default function SignInForm() {
  return (
    <div className='signInForm'>
      <form>
        <h2>Sign In</h2>
        <div>
          <label htmlFor='email'>Email:</label>
          <input type='email' id='email' required />
        </div>
        <div>
          <label htmlFor='password'>Password:</label>
          <input type='password' id='password' required />
        </div>
        <button type='submit'>Sign In</button>
      </form>
    </div>
  );
}

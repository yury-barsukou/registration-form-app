import React from 'react';

export default function UserSignInForm() {
  return (
    <form>
      <label htmlFor='email'>Email:</label>
      <input type='email' id='email' name='email' required />

      <label htmlFor='password'>Password:</label>
      <input type='password' id='password' name='password' required />

      <button type='submit'>Sign In</button>
    </form>
  );
}
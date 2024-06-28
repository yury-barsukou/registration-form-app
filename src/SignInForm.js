import React from 'react';
import './SignInForm.css';

class SignInForm extends React.Component {
  render() {
    return (
      <form className='sign-in-form'>
        <h2>Sign In</h2>
        <div>
          <label>Email</label>
          <input type='email' name='email' required />
        </div>
        <div>
          <label>Password</label>
          <input type='password' name='password' required />
        </div>
        <button type='submit'>Sign In</button>
      </form>
    );
  }
}

export default SignInForm;
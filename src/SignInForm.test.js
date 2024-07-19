import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SignInForm from './SignInForm';


describe('SignInForm Email Validation', () => {
  const invalidEmails = ['user@', 'user@.com', 'user.com', '@example.com', 'user@example', ''];
  const validEmails = ['user@example.com', 'user.name@example.co.uk', 'user_name@example.org'];

  invalidEmails.forEach(email => {
    test(`invalidates email format: ${email}`, () => {
      render(<SignInForm />);
      fireEvent.change(screen.getByLabelText(/email/i), { target: { value: email } });
      expect(screen.queryByText(/please enter a valid email address/i)).toBeInTheDocument();
    });
  });

  validEmails.forEach(email => {
    test(`validates email format: ${email}`, () => {
      render(<SignInForm />);
      fireEvent.change(screen.getByLabelText(/email/i), { target: { value: email } });
      expect(screen.queryByText(/please enter a valid email address/i)).toBeNull();
    });
  });
});
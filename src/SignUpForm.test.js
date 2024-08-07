import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SignUpForm from './SignUpForm';

describe('SignUpForm', () => {
  it('updates the email state and validates correctly', () => {
    const { getByLabelText, queryByText } = render(<SignUpForm />);
    const emailInput = getByLabelText(/email/i);
    fireEvent.change(emailInput, { target: { value: 'invalidemail' } });
    expect(queryByText(/Please enter a valid email address/i)).toBeInTheDocument();
    fireEvent.change(emailInput, { target: { value: 'validemail@example.com' } });
    expect(queryByText(/Please enter a valid email address/i)).not.toBeInTheDocument();
  });

  // Additional test cases would follow here...
});
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SignUpForm from '../SignUpForm';

describe('SignUpForm', () => {
  test('renders input fields for username, email, and password', () => {
    render(<SignUpForm />);
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  test('renders a submit button', () => {
    render(<SignUpForm />);
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  describe('Input validation', () => {
    test.each([
      { field: 'username', value: '', expectedError: /username is required/i },
      { field: 'email', value: '', expectedError: /email is required/i },
      { field: 'email', value: 'invalid-email', expectedError: /email is invalid/i },
      { field: 'password', value: '', expectedError: /password is required/i },
      { field: 'password', value: 'short', expectedError: /password is too short/i },
    ])('validates $field field correctly', async ({ field, value, expectedError }) => {
      render(<SignUpForm />);
      fireEvent.change(screen.getByLabelText(new RegExp(field, 'i')), { target: { value } });
      fireEvent.click(screen.getByRole('button', { name: /submit/i }));
      
      expect(await screen.findByText(expectedError)).toBeInTheDocument();
    });
  });

  test('calls the onSubmit handler when the form is submitted with valid data', async () => {
    const mockSubmit = jest.fn();
    render(<SignUpForm onSubmit={mockSubmit} />);
    
    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testUser' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    
    await waitFor(() => expect(mockSubmit).toHaveBeenCalledWith({
      username: 'testUser',
      email: 'test@example.com',
      password: 'password123',
    }));
  });
});
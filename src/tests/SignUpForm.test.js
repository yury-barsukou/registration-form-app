import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SignUpForm from '../components/SignUpForm';

describe('SignUpForm', () => {
  test('renders SignUpForm component', () => {
    render(<SignUpForm />);
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  test('allows the user to fill and submit the form', () => {
    render(<SignUpForm />);
    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testUser' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText(/confirm password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    expect(screen.getByLabelText(/username/i).value).toBe('testUser');
    expect(screen.getByLabelText(/password/i).value).toBe('password123');
    expect(screen.getByLabelText(/confirm password/i).value).toBe('password123');
  });
});
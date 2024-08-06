import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import SignUpForm from '../SignUpForm';

describe('SignUpForm', () => {
    test('renders the sign-up form with all fields and button', () => {
        render(<SignUpForm />);
        expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Create Account/i })).toBeInTheDocument();
    });

    test.each([
        { field: 'firstName', value: 'John', expected: 'John' },
        { field: 'lastName', value: 'Doe', expected: 'Doe' },
        { field: 'email', value: 'john.doe@example.com', expected: 'john.doe@example.com' },
        { field: 'password', value: 'Pass1234', expected: 'Pass1234' }
    ])('allows entry of $field', ({ field, value, expected }) => {
        render(<SignUpForm />);
        fireEvent.change(screen.getByLabelText(new RegExp(field, 'i')), { target: { value } });
        expect(screen.getByLabelText(new RegExp(field, 'i')).value).toBe(expected);
    });

    test('shows email validation error for invalid email', () => {
        render(<SignUpForm />);
        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'invalidemail' } });
        expect(screen.getByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    test('hides email validation error for valid email', () => {
        render(<SignUpForm />);
        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john.doe@example.com' } });
        expect(screen.queryByText(/Please enter a valid email address/i)).toBeNull();
    });

    test.each([
        { password: 'Short1', criteria: 'Minimum 8 characters', isValid: false },
        { password: 'nouppercase123', criteria: '1 uppercase character', isValid: false },
        { password: 'NOLOWERCASE123', criteria: '1 lowercase character', isValid: false },
        { password: 'NoNumbersHere!', criteria: '1 number', isValid: false },
        { password: 'ValidPass1', criteria: 'valid', isValid: true },
    ])('validates password with $criteria', ({ password, criteria, isValid }) => {
        render(<SignUpForm />);
        fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: password } });
        const criteriaElement = screen.getByText(criteria, { exact: false });
        expect(criteriaElement.className.includes('valid')).toBe(isValid);
    });

    test('disables Create Account button with invalid form', () => {
        render(<SignUpForm />);
        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'invalidemail' } });
        fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'short' } });
        expect(screen.getByRole('button', { name: /Create Account/i })).toBeDisabled();
    });

    test('enables Create Account button with valid form', () => {
        render(<SignUpForm />);
        fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'John' } });
        fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Doe' } });
        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john.doe@example.com' } });
        fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'ValidPass1' } });
        expect(screen.getByRole('button', { name: /Create Account/i })).not.toBeDisabled();
    });

    test('calls console.log with correct data on valid form submission', () => {
        const consoleSpy = jest.spyOn(console, 'log');
        render(<SignUpForm />);

        fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'John' } });
        fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Doe' } });
        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john.doe@example.com' } });
        fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'ValidPass1' } });
        fireEvent.click(screen.getByRole('button', { name: /Create Account/i }));

        expect(consoleSpy).toHaveBeenCalledWith('Form submitted:', {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            password: 'ValidPass1',
        });

        consoleSpy.mockRestore();
    });
});
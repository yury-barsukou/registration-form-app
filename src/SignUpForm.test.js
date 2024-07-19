import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SignUpForm from './SignUpForm'; // Assumed file path for the component

describe('SignUpForm', () => {
    test('inputs should initially be empty', () => {
        render(<SignUpForm />);
        expect(screen.getByLabelText(/first name/i)).toHaveValue('');
        expect(screen.getByLabelText(/last name/i)).toHaveValue('');
        expect(screen.getByLabelText(/email/i)).toHaveValue('');
        expect(screen.getByLabelText(/password/i)).toHaveValue('');
    });

    test('should allow text input for all fields', async () => {
        render(<SignUpForm />);
        const user = userEvent.setup();
        await user.type(screen.getByLabelText(/first name/i), 'John');
        await user.type(screen.getByLabelText(/last name/i), 'Doe');
        await user.type(screen.getByLabelText(/email/i), 'john.doe@example.com');
        await user.type(screen.getByLabelText(/password/i), 'Password123');

        expect(screen.getByLabelText(/first name/i)).toHaveValue('John');
        expect(screen.getByLabelText(/last name/i)).toHaveValue('Doe');
        expect(screen.getByLabelText(/email/i)).toHaveValue('john.doe@example.com');
        expect(screen.getByLabelText(/password/i)).toHaveValue('Password123');
    });

    test('should validate email format correctly', async () => {
        render(<SignUpForm />);
        const user = userEvent.setup();
        await user.type(screen.getByLabelText(/email/i), 'invalid-email');
        expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
        
        await user.clear(screen.getByLabelText(/email/i));
        await user.type(screen.getByLabelText(/email/i), 'valid.email@example.com');
        expect(screen.queryByText(/please enter a valid email address/i)).not.toBeInTheDocument();
    });

    test('should validate password correctly', async () => {
        render(<SignUpForm />);
        const user = userEvent.setup();
        await user.type(screen.getByLabelText(/password/i), 'short');
        expect(screen.getByText(/minimum 8 characters/i)).toHaveClass('invalid');

        await user.clear(screen.getByLabelText(/password/i));
        await user.type(screen.getByLabelText(/password/i), 'ValidPassword1');
        expect(screen.getByText(/minimum 8 characters/i)).toHaveClass('valid');
        expect(screen.getByText(/1 uppercase character/i)).toHaveClass('valid');
        expect(screen.getByText(/1 lowercase character/i)).toHaveClass('valid');
        expect(screen.getByText(/1 number/i)).toHaveClass('valid');
    });

    test('submit button should be enabled only when the form is valid', async () => {
        render(<SignUpForm />);
        const user = userEvent.setup();
        await user.type(screen.getByLabelText(/first name/i), 'John');
        await user.type(screen.getByLabelText(/last name/i), 'Doe');
        await user.type(screen.getByLabelText(/email/i), 'john.doe@example.com');
        await user.type(screen.getByLabelText(/password/i), 'Password123');

        expect(screen.getByText(/create account/i)).not.toHaveClass('btn-disabled');
        expect(screen.getByText(/create account/i)).not.toBeDisabled();
    });

    // The following test assumes that there's a way to mock console.log and console.error for testing the handleSubmit
    test('form submission should log data when form is valid', async () => {
        const consoleSpy = jest.spyOn(console, 'log');
        render(<SignUpForm />);
        const user = userEvent.setup();
        
        // Fill in the form with valid data
        await user.type(screen.getByLabelText(/first name/i), 'John');
        await user.type(screen.getByLabelText(/last name/i), 'Doe');
        await user.type(screen.getByLabelText(/email/i), 'john.doe@example.com');
        await user.type(screen.getByLabelText(/password/i), 'Password123');
        
        await user.click(screen.getByText(/create account/i));

        expect(consoleSpy).toHaveBeenLastCalledWith('Form submitted:', expect.anything());
        consoleSpy.mockRestore();
    });
});
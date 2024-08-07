import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SignUpForm from '../SignUpForm'; // Adjust the import based on the actual file path

describe('SignUpForm', () => {
    test('renders correctly', () => {
        const { getByLabelText, getByText } = render(<SignUpForm />);
        expect(getByLabelText(/name/i)).toBeInTheDocument();
        expect(getByLabelText(/email/i)).toBeInTheDocument();
        expect(getByLabelText(/password/i)).toBeInTheDocument();
        expect(getByLabelText(/confirm password/i)).toBeInTheDocument();
        expect(getByText(/submit/i)).toBeInTheDocument();
    });

    test('validates name is not empty', () => {
        const { getByLabelText, getByText } = render(<SignUpForm />);
        fireEvent.change(getByLabelText(/name/i), { target: { value: '' } });
        fireEvent.click(getByText(/submit/i));
        expect(getByText(/name is required/i)).toBeInTheDocument();
    });

    // Implement other test cases based on the plan above
});
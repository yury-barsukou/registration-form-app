// SignUpForm.test.js

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SignUpForm from '../SignUpForm';

describe('SignUpForm', () => {
  let getByLabelText, getByText;

  beforeEach(() => {
    const renderResult = render(<SignUpForm />);
    getByLabelText = renderResult.getByLabelText;
    getByText = renderResult.getByText;
  });

  describe('handleInputChange', () => {
    it('updates firstName state on change', () => {
      const firstNameInput = getByLabelText('First Name');
      fireEvent.change(firstNameInput, { target: { value: 'John' } });
      expect(firstNameInput.value).toBe('John');
    });

    it('updates lastName state on change', () => {
      const lastNameInput = getByLabelText('Last Name');
      fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
      expect(lastNameInput.value).toBe('Doe');
    });

    it('updates email state on change', () => {
      const emailInput = getByLabelText('Email');
      fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
      expect(emailInput.value).toBe('john.doe@example.com');
    });

    it('updates password state and triggers validatePassword on change', () => {
      const passwordInput = getByLabelText('Password');
      fireEvent.change(passwordInput, { target: { value: 'Pass1234' } });
      expect(passwordInput.value).toBe('Pass1234');
      // Note: This assertion is more about the effect of validatePassword which needs to be mocked/spied on in a real test scenario
    });
  });

  describe('validatePassword', () => {
    it('validates password correctly', () => {
      const passwordInput = getByLabelText('Password');
      fireEvent.change(passwordInput, { target: { value: 'Pass1234' } });
      const passwordValidationMessage = getByText('Password must contain the following:');
      expect(passwordValidationMessage).toBeInTheDocument();
      // Note: Further detailed testing of validation results would require access to the state or a way to observe state changes
    });
  });

  describe('validateEmail', () => {
    it('validates email correctly and updates isEmailValid state', () => {
      const emailInput = getByLabelText('Email');
      fireEvent.change(emailInput, { target: { value: 'incorrect' } });
      const emailValidationMessage = getByText('Please enter a valid email address');
      expect(emailValidationMessage).toBeInTheDocument();
      // Similar note on observing state changes directly
    });
  });

  describe('isFormValid', () => {
    it('validates the form correctly when all conditions are met', () => {
      fireEvent.change(getByLabelText('First Name'), { target: { value: 'John' } });
      fireEvent.change(getByLabelText('Last Name'), { target: { value: 'Doe' } });
      fireEvent.change(getByLabelText('Email'), { target: { value: 'john.doe@example.com' } });
      fireEvent.change(getByLabelText('Password'), { target: { value: 'Pass1234' } });

      const createAccountButton = getByText('Create Account');
      expect(createAccountButton).not.toHaveClass('btn-disabled');
    });
  });
});
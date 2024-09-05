import { test, expect } from '@playwright/test';
import { SignUpFormPage } from './SignUpFormPage';

test.describe('Sign Up Form', () => {
  let signUpFormPage;

  test.beforeEach(async ({ page }) => {
    signUpFormPage = new SignUpFormPage(page);
    await signUpFormPage.goto();
  });

  test('Successful account creation', async ({ page }) => {
    await signUpFormPage.fillFirstName('John');
    await signUpFormPage.fillLastName('Doe');
    await signUpFormPage.fillEmail('john.doe@example.com');
    await signUpFormPage.fillPassword('Password123');
    await signUpFormPage.submitForm();
    // Add assertion for email verification notification
  });

  test('Email uniqueness check', async ({ page }) => {
    await signUpFormPage.fillEmail('existing.email@example.com');
    await signUpFormPage.submitForm();
    await signUpFormPage.expectEmailValidationMessage();
  });

  test('Password strength enforcement', async ({ page }) => {
    await signUpFormPage.fillPassword('weak');
    await signUpFormPage.submitForm();
    const messages = await signUpFormPage.expectPasswordValidationMessages();
    expect(messages).toContain('1 uppercase character');
    expect(messages).toContain('1 lowercase character');
    expect(messages).toContain('1 number');
    expect(messages).toContain('Minimum 8 characters');
  });

  test('Mandatory fields check', async ({ page }) => {
    await signUpFormPage.submitForm();
    // Add assertion for mandatory fields error message
  });

  test('Email verification process', async ({ page }) => {
    await signUpFormPage.fillFirstName('Jane');
    await signUpFormPage.fillLastName('Doe');
    await signUpFormPage.fillEmail('jane.doe@example.com');
    await signUpFormPage.fillPassword('Password123');
    await signUpFormPage.submitForm();
    // Add assertion for email verification process
  });
});
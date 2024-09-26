const { test, expect } = require('@playwright/test');
const { SignUpPage } = require('../src/pages/SignUpPage');

test.describe('User Sign Up', () => {
  let signUpPage;

  test.beforeEach(async ({ page }) => {
    signUpPage = new SignUpPage(page);
    await signUpPage.navigate();
  });

  test('Successful Sign Up', async ({ page }) => {
    await signUpPage.fillFirstName('John');
    await signUpPage.fillLastName('Doe');
    await signUpPage.fillEmail('john.doe@example.com');
    await signUpPage.fillPassword('StrongPass1');
    await signUpPage.submitForm();
    // Add assertions for successful sign up notification and email verification
  });

  test('Sign Up with Existing Email', async ({ page }) => {
    await signUpPage.fillFirstName('Jane');
    await signUpPage.fillLastName('Doe');
    await signUpPage.fillEmail('existing.email@example.com');
    await signUpPage.fillPassword('StrongPass1');
    await signUpPage.submitForm();
    // Add assertions for email already in use error message
  });

  test('Sign Up with Weak Password', async ({ page }) => {
    await signUpPage.fillFirstName('Alice');
    await signUpPage.fillLastName('Smith');
    await signUpPage.fillEmail('alice.smith@example.com');
    await signUpPage.fillPassword('weak');
    await signUpPage.submitForm();
    await signUpPage.expectPasswordValidationMessages([false, false, false, false]);
  });

  test('Sign Up with Missing Fields', async ({ page }) => {
    await signUpPage.fillFirstName('');
    await signUpPage.fillLastName('');
    await signUpPage.fillEmail('');
    await signUpPage.fillPassword('');
    await signUpPage.submitForm();
    // Add assertions for all fields must be filled error message
  });

  test('Email Verification', async ({ page }) => {
    await signUpPage.fillFirstName('Bob');
    await signUpPage.fillLastName('Brown');
    await signUpPage.fillEmail('bob.brown@example.com');
    await signUpPage.fillPassword('StrongPass1');
    await signUpPage.submitForm();
    // Add steps to simulate email verification and assertions for successful verification
  });
});
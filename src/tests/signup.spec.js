// src/tests/signup.spec.js

const { test, expect } = require('@playwright/test');
const { SignUpPage } = require('../pages/SignUpPage');

test.describe('Sign Up Feature', () => {
  let signUpPage;

  test.beforeEach(async ({ page }) => {
    signUpPage = new SignUpPage(page);
    await signUpPage.navigate();
  });

  test('Successful account creation', async ({ page }) => {
    await signUpPage.enterEmail('unique@example.com');
    await signUpPage.enterPassword('StrongPassword123!');
    await signUpPage.enterPersonalDetails('John Doe');
    await signUpPage.clickSignUp();
    const notification = await signUpPage.getNotification();
    expect(notification).toContain('verify your email');
  });

  test('Email already exists', async ({ page }) => {
    await signUpPage.enterEmail('existing@example.com');
    await signUpPage.enterPassword('StrongPassword123!');
    await signUpPage.enterPersonalDetails('John Doe');
    await signUpPage.clickSignUp();
    const errorMessage = await signUpPage.getErrorMessage();
    expect(errorMessage).toContain('email is already in use');
  });

  test('Weak password', async ({ page }) => {
    await signUpPage.enterEmail('unique@example.com');
    await signUpPage.enterPassword('weak');
    await signUpPage.enterPersonalDetails('John Doe');
    await signUpPage.clickSignUp();
    const errorMessage = await signUpPage.getErrorMessage();
    expect(errorMessage).toContain('password does not meet the strength requirements');
  });

  test('Missing required fields', async ({ page }) => {
    await signUpPage.enterEmail('unique@example.com');
    await signUpPage.enterPassword('StrongPassword123!');
    await signUpPage.clickSignUp();
    const errorMessage = await signUpPage.getErrorMessage();
    expect(errorMessage).toContain('all fields must be filled');
  });

  test('Email verification', async ({ page }) => {
    // This test assumes that the email verification process is mocked or handled separately
    await signUpPage.enterEmail('unique@example.com');
    await signUpPage.enterPassword('StrongPassword123!');
    await signUpPage.enterPersonalDetails('John Doe');
    await signUpPage.clickSignUp();
    // Simulate email verification process
    // ...
    const notification = await signUpPage.getNotification();
    expect(notification).toContain('verified');
  });
});

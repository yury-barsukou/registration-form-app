const { test, expect } = require('@playwright/test');
const { SignUpPage } = require('../src/SignUpPage');

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
    await signUpPage.fillPassword('StrongPass123');
    await signUpPage.clickCreateAccount();
    // Add assertion for email verification notification
  });

  test('Sign Up with Existing Email', async ({ page }) => {
    await signUpPage.fillFirstName('Jane');
    await signUpPage.fillLastName('Doe');
    await signUpPage.fillEmail('existing.email@example.com');
    await signUpPage.fillPassword('StrongPass123');
    await signUpPage.clickCreateAccount();
    // Add assertion for email already in use error message
  });

  test('Sign Up with Weak Password', async ({ page }) => {
    await signUpPage.fillFirstName('Alice');
    await signUpPage.fillLastName('Smith');
    await signUpPage.fillEmail('alice.smith@example.com');
    await signUpPage.fillPassword('weak');
    await signUpPage.clickCreateAccount();
    await signUpPage.expectPasswordValidationMessage('hasUppercase', false);
    await signUpPage.expectPasswordValidationMessage('hasLowercase', true);
    await signUpPage.expectPasswordValidationMessage('hasNumber', false);
    await signUpPage.expectPasswordValidationMessage('isLongEnough', false);
  });

  test('Sign Up with Missing Fields', async ({ page }) => {
    await signUpPage.fillFirstName('Bob');
    await signUpPage.fillLastName('');
    await signUpPage.fillEmail('bob.smith@example.com');
    await signUpPage.fillPassword('StrongPass123');
    await signUpPage.clickCreateAccount();
    // Add assertion for all fields must be filled error message
  });
});
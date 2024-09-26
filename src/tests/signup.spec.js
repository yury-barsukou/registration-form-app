const { test, expect } = require('@playwright/test');
const { SignUpPage } = require('../pages/SignUpPage');

test.describe('User SignUp', () => {
  let signUpPage;

  test.beforeEach(async ({ page }) => {
    signUpPage = new SignUpPage(page);
    await signUpPage.navigate();
  });

  test('Successful SignUp', async ({ page }) => {
    await signUpPage.enterUsername('testuser');
    await signUpPage.enterEmail('testuser@example.com');
    await signUpPage.enterPassword('Test@1234');
    await signUpPage.clickSignUp();
    await expect(signUpPage.getSuccessMessage()).toContain('Verification email sent');
  });

  test('SignUp with missing fields', async ({ page }) => {
    await signUpPage.enterEmail('testuser@example.com');
    await signUpPage.enterPassword('Test@1234');
    await signUpPage.clickSignUp();
    await expect(signUpPage.getErrorMessage()).toContain('Username is required');
  });

  test('SignUp with invalid email', async ({ page }) => {
    await signUpPage.enterUsername('testuser');
    await signUpPage.enterEmail('invalid-email');
    await signUpPage.enterPassword('Test@1234');
    await signUpPage.clickSignUp();
    await expect(signUpPage.getErrorMessage()).toContain('Invalid email address');
  });

  test('SignUp with weak password', async ({ page }) => {
    await signUpPage.enterUsername('testuser');
    await signUpPage.enterEmail('testuser@example.com');
    await signUpPage.enterPassword('weak');
    await signUpPage.clickSignUp();
    await expect(signUpPage.getErrorMessage()).toContain('Password must be at least 8 characters long and include a number and a special character');
  });
});

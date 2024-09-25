import { test } from '@playwright/test';
import { SignUpPage } from '../pages/SignUpPage';

test.describe('User Sign Up', () => {
  test('Successful Sign Up', async ({ page }) => {
    const signUpPage = new SignUpPage(page);
    await signUpPage.navigate();
    await signUpPage.enterFirstName('John');
    await signUpPage.enterLastName('Doe');
    await signUpPage.enterEmail('john.doe@example.com');
    await signUpPage.enterPassword('StrongPass123');
    await signUpPage.clickCreateAccount();
    // Add assertion to check for email verification notification
  });

  test('Sign Up with Existing Email', async ({ page }) => {
    const signUpPage = new SignUpPage(page);
    await signUpPage.navigate();
    await signUpPage.enterFirstName('Jane');
    await signUpPage.enterLastName('Doe');
    await signUpPage.enterEmail('existing.email@example.com');
    await signUpPage.enterPassword('StrongPass123');
    await signUpPage.clickCreateAccount();
    // Add assertion to check for email already in use error message
  });

  test('Sign Up with Weak Password', async ({ page }) => {
    const signUpPage = new SignUpPage(page);
    await signUpPage.navigate();
    await signUpPage.enterFirstName('Alice');
    await signUpPage.enterLastName('Smith');
    await signUpPage.enterEmail('alice.smith@example.com');
    await signUpPage.enterPassword('weak');
    await signUpPage.clickCreateAccount();
    await signUpPage.expectPasswordValidationMessages([
      '1 uppercase character',
      '1 lowercase character',
      '1 number',
      'Minimum 8 characters'
    ]);
  });

  test('Sign Up with Missing Fields', async ({ page }) => {
    const signUpPage = new SignUpPage(page);
    await signUpPage.navigate();
    await signUpPage.enterFirstName('Bob');
    await signUpPage.enterLastName('');
    await signUpPage.enterEmail('bob@example.com');
    await signUpPage.enterPassword('StrongPass123');
    await signUpPage.clickCreateAccount();
    // Add assertion to check for missing fields error message
  });
});
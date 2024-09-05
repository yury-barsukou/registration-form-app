const { test, expect } = require('@playwright/test');

const { SignUpPage } = require('../pages/SignUpPage');

// Page Object Model for SignUp Page
class SignUpPage {
  constructor(page) {
    this.page = page;
    this.firstNameInput = page.locator('#company_fname_create');
    this.lastNameInput = page.locator('#company_lname_create');
    this.emailInput = page.locator('#company_email_create');
    this.passwordInput = page.locator('#company_pass_create');
    this.createAccountButton = page.locator('#nextButton');
    this.emailValidationMessage = page.locator('.email-validation-message.invalid');
    this.passwordValidationMessages = page.locator('.password-validation li');
  }

  async fillForm(firstName, lastName, email, password) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
  }

  async submitForm() {
    await this.createAccountButton.click();
  }
}

// Tests

// Successful account creation

test('Successful account creation', async ({ page }) => {
  const signUpPage = new SignUpPage(page);
  await page.goto('/signup');
  await signUpPage.fillForm('John', 'Doe', 'john.doe@example.com', 'Password123');
  await signUpPage.submitForm();
  await expect(page.locator('text=Please verify your email')).toBeVisible();
});

// Email uniqueness check
test('Email uniqueness check', async ({ page }) => {
  const signUpPage = new SignUpPage(page);
  await page.goto('/signup');
  await signUpPage.fillForm('John', 'Doe', 'existing.email@example.com', 'Password123');
  await signUpPage.submitForm();
  await expect(page.locator('text=Email is already in use')).toBeVisible();
});

// Password strength enforcement
test('Password strength enforcement', async ({ page }) => {
  const signUpPage = new SignUpPage(page);
  await page.goto('/signup');
  await signUpPage.fillForm('John', 'Doe', 'john.doe@example.com', 'weak');
  await signUpPage.submitForm();
  await expect(signUpPage.passwordValidationMessages.nth(0)).toHaveClass(/red/);
  await expect(signUpPage.passwordValidationMessages.nth(1)).toHaveClass(/red/);
  await expect(signUpPage.passwordValidationMessages.nth(2)).toHaveClass(/red/);
  await expect(signUpPage.passwordValidationMessages.nth(3)).toHaveClass(/red/);
});

// Mandatory fields check
test('Mandatory fields check', async ({ page }) => {
  const signUpPage = new SignUpPage(page);
  await page.goto('/signup');
  await signUpPage.fillForm('', '', '', '');
  await signUpPage.submitForm();
  await expect(page.locator('text=All fields must be filled')).toBeVisible();
});

// Email verification notification
test('Email verification notification', async ({ page }) => {
  const signUpPage = new SignUpPage(page);
  await page.goto('/signup');
  await signUpPage.fillForm('John', 'Doe', 'john.doe@example.com', 'Password123');
  await signUpPage.submitForm();
  await expect(page.locator('text=Please verify your email')).toBeVisible();
});
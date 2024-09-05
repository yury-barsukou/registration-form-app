const { expect } = require('@playwright/test');

class SignUpPage {
  constructor(page) {
    this.page = page;
    this.firstNameInput = page.locator('#company_fname_create');
    this.lastNameInput = page.locator('#company_lname_create');
    this.emailInput = page.locator('#company_email_create');
    this.passwordInput = page.locator('#company_pass_create');
    this.createAccountButton = page.locator('#nextButton');
    this.emailValidationMessage = page.locator('.email-validation-message.invalid');
    this.passwordValidationMessages = {
      hasUppercase: page.locator('li:has-text("1 uppercase character")'),
      hasLowercase: page.locator('li:has-text("1 lowercase character")'),
      hasNumber: page.locator('li:has-text("1 number")'),
      isLongEnough: page.locator('li:has-text("Minimum 8 characters")'),
    };
  }

  async navigate() {
    await this.page.goto('/signup');
  }

  async fillFirstName(firstName) {
    await this.firstNameInput.fill(firstName);
  }

  async fillLastName(lastName) {
    await this.lastNameInput.fill(lastName);
  }

  async fillEmail(email) {
    await this.emailInput.fill(email);
  }

  async fillPassword(password) {
    await this.passwordInput.fill(password);
  }

  async clickCreateAccount() {
    await this.createAccountButton.click();
  }

  async expectEmailValidationMessage() {
    await expect(this.emailValidationMessage).toBeVisible();
  }

  async expectPasswordValidationMessage(validationType, isValid) {
    const color = isValid ? 'green' : 'red';
    await expect(this.passwordValidationMessages[validationType]).toHaveClass(color);
  }
}

module.exports = { SignUpPage };
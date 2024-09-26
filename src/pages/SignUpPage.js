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
    this.passwordValidationMessages = page.locator('.password-validation li');
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

  async submitForm() {
    await this.createAccountButton.click();
  }

  async expectEmailValidationMessage() {
    await expect(this.emailValidationMessage).toBeVisible();
  }

  async expectPasswordValidationMessages(expectedMessages) {
    for (let i = 0; i < expectedMessages.length; i++) {
      await expect(this.passwordValidationMessages.nth(i)).toHaveClass(expectedMessages[i] ? 'green' : 'red');
    }
  }
}

module.exports = { SignUpPage };
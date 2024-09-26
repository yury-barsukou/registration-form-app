const { expect } = require('@playwright/test');

class SignUpPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator('input[name="username"]');
    this.emailInput = page.locator('input[name="email"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.signUpButton = page.locator('button[type="submit"]');
    this.errorMessage = page.locator('.error-message');
    this.successMessage = page.locator('.success-message');
  }

  async navigate() {
    await this.page.goto('/signup');
  }

  async enterUsername(username) {
    await this.usernameInput.fill(username);
  }

  async enterEmail(email) {
    await this.emailInput.fill(email);
  }

  async enterPassword(password) {
    await this.passwordInput.fill(password);
  }

  async clickSignUp() {
    await this.signUpButton.click();
  }

  async getErrorMessage() {
    return this.errorMessage.textContent();
  }

  async getSuccessMessage() {
    return this.successMessage.textContent();
  }
}

module.exports = { SignUpPage };

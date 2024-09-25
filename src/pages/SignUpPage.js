// src/pages/SignUpPage.js

const { expect } = require('@playwright/test');

class SignUpPage {
  constructor(page) {
    this.page = page;
    this.emailInput = page.locator('input[name="email"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.personalDetailsInput = page.locator('input[name="personalDetails"]');
    this.signUpButton = page.locator('button[type="submit"]');
    this.notification = page.locator('.notification');
    this.errorMessage = page.locator('.error-message');
  }

  async navigate() {
    await this.page.goto('/signup');
  }

  async enterEmail(email) {
    await this.emailInput.fill(email);
  }

  async enterPassword(password) {
    await this.passwordInput.fill(password);
  }

  async enterPersonalDetails(details) {
    await this.personalDetailsInput.fill(details);
  }

  async clickSignUp() {
    await this.signUpButton.click();
  }

  async getNotification() {
    return await this.notification.textContent();
  }

  async getErrorMessage() {
    return await this.errorMessage.textContent();
  }
}

module.exports = { SignUpPage };

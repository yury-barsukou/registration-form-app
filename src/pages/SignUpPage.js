import { expect, Page } from '@playwright/test';

export class SignUpPage {
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

  async enterFirstName(firstName) {
    await this.firstNameInput.fill(firstName);
  }

  async enterLastName(lastName) {
    await this.lastNameInput.fill(lastName);
  }

  async enterEmail(email) {
    await this.emailInput.fill(email);
  }

  async enterPassword(password) {
    await this.passwordInput.fill(password);
  }

  async clickCreateAccount() {
    await this.createAccountButton.click();
  }

  async expectEmailValidationMessage() {
    await expect(this.emailValidationMessage).toBeVisible();
  }

  async expectPasswordValidationMessages(expectedMessages) {
    for (let i = 0; i < expectedMessages.length; i++) {
      await expect(this.passwordValidationMessages.nth(i)).toHaveText(expectedMessages[i]);
    }
  }
}
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

  async goto() {
    await this.page.goto('/signup');
  }

  async fillForm({ firstName, lastName, email, password }) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
  }

  async submitForm() {
    await this.createAccountButton.click();
  }

  async expectEmailValidationMessage() {
    await expect(this.emailValidationMessage).toBeVisible();
  }

  async expectPasswordValidationMessage(validationType, isValid) {
    const validationMessage = this.passwordValidationMessages[validationType];
    const expectedClass = isValid ? 'green' : 'red';
    await expect(validationMessage).toHaveClass(expectedClass);
  }
}

module.exports = SignUpPage;
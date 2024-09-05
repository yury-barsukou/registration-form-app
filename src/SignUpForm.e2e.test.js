const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

// E2E tests for Sign Up form

describe('Sign Up Form E2E Tests', function() {
  let driver;

  before(async function() {
    driver = await new Builder().forBrowser('firefox').build();
  });

  after(async function() {
    await driver.quit();
  });

  it('should create an account successfully', async function() {
    await driver.get('http://localhost:3000/signup');
    await driver.findElement(By.id('company_fname_create')).sendKeys('John');
    await driver.findElement(By.id('company_lname_create')).sendKeys('Doe');
    await driver.findElement(By.id('company_email_create')).sendKeys('john.doe@example.com');
    await driver.findElement(By.id('company_pass_create')).sendKeys('Password123');
    await driver.findElement(By.id('nextButton')).click();

    const notification = await driver.wait(until.elementLocated(By.css('.notification')), 10000);
    const notificationText = await notification.getText();
    assert.strictEqual(notificationText, 'Please verify your email');
  });

  it('should show error for duplicate email', async function() {
    await driver.get('http://localhost:3000/signup');
    await driver.findElement(By.id('company_email_create')).sendKeys('existing.email@example.com');
    await driver.findElement(By.id('nextButton')).click();

    const errorMessage = await driver.wait(until.elementLocated(By.css('.email-validation-message.invalid')), 10000);
    const errorText = await errorMessage.getText();
    assert.strictEqual(errorText, 'Email is already in use');
  });

  it('should enforce password strength', async function() {
    await driver.get('http://localhost:3000/signup');
    await driver.findElement(By.id('company_pass_create')).sendKeys('weak');
    await driver.findElement(By.id('nextButton')).click();

    const passwordValidation = await driver.findElement(By.css('.password-validation'));
    const validationText = await passwordValidation.getText();
    assert(validationText.includes('1 uppercase character'));
    assert(validationText.includes('1 lowercase character'));
    assert(validationText.includes('1 number'));
    assert(validationText.includes('Minimum 8 characters'));
  });

  it('should validate mandatory fields', async function() {
    await driver.get('http://localhost:3000/signup');
    await driver.findElement(By.id('nextButton')).click();

    const errorMessage = await driver.wait(until.elementLocated(By.css('.form-error-message')), 10000);
    const errorText = await errorMessage.getText();
    assert.strictEqual(errorText, 'All fields must be filled');
  });

  it('should send verification email after account creation', async function() {
    await driver.get('http://localhost:3000/signup');
    await driver.findElement(By.id('company_fname_create')).sendKeys('Jane');
    await driver.findElement(By.id('company_lname_create')).sendKeys('Doe');
    await driver.findElement(By.id('company_email_create')).sendKeys('jane.doe@example.com');
    await driver.findElement(By.id('company_pass_create')).sendKeys('Password123');
    await driver.findElement(By.id('nextButton')).click();

    const notification = await driver.wait(until.elementLocated(By.css('.notification')), 10000);
    const notificationText = await notification.getText();
    assert.strictEqual(notificationText, 'Please verify your email');
  });

  it('should request a new verification email', async function() {
    await driver.get('http://localhost:3000/signup');
    await driver.findElement(By.id('resend-verification')).click();

    const notification = await driver.wait(until.elementLocated(By.css('.notification')), 10000);
    const notificationText = await notification.getText();
    assert.strictEqual(notificationText, 'A new verification email has been sent');
  });
});
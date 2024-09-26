const { test, expect } = require('@playwright/test');

test.describe('User Sign Up', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/signup');
  });

  test('Successful Sign Up', async ({ page }) => {
    await page.fill('#company_fname_create', 'John');
    await page.fill('#company_lname_create', 'Doe');
    await page.fill('#company_email_create', 'john.doe@example.com');
    await page.fill('#company_pass_create', 'Password123');
    await page.click('#nextButton');
    await expect(page.locator('text=Please verify your email')).toBeVisible();
  });

  test('Sign Up with Existing Email', async ({ page }) => {
    await page.fill('#company_fname_create', 'Jane');
    await page.fill('#company_lname_create', 'Doe');
    await page.fill('#company_email_create', 'existing.email@example.com');
    await page.fill('#company_pass_create', 'Password123');
    await page.click('#nextButton');
    await expect(page.locator('text=Email is already in use')).toBeVisible();
  });

  test('Sign Up with Weak Password', async ({ page }) => {
    await page.fill('#company_fname_create', 'Alice');
    await page.fill('#company_lname_create', 'Smith');
    await page.fill('#company_email_create', 'alice.smith@example.com');
    await page.fill('#company_pass_create', 'weak');
    await page.click('#nextButton');
    await expect(page.locator('text=Password is too weak')).toBeVisible();
  });

  test('Sign Up with Missing Fields', async ({ page }) => {
    await page.fill('#company_fname_create', 'Bob');
    await page.fill('#company_email_create', 'bob@example.com');
    await page.fill('#company_pass_create', 'Password123');
    await page.click('#nextButton');
    await expect(page.locator('text=All fields must be filled')).toBeVisible();
  });

  test('Email Verification Notification', async ({ page }) => {
    await page.fill('#company_fname_create', 'Charlie');
    await page.fill('#company_lname_create', 'Brown');
    await page.fill('#company_email_create', 'charlie.brown@example.com');
    await page.fill('#company_pass_create', 'Password123');
    await page.click('#nextButton');
    await expect(page.locator('text=Please verify your email')).toBeVisible();
  });
});
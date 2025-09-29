const { test, expect } = require('@playwright/test');

test('Signup page renders and has form elements', async ({ page }) => {
  await page.goto('/account/signup/', { waitUntil: 'domcontentloaded' });
  await expect(page).toHaveTitle(/NBA Fan Zone - Sign Up/i);
  await expect(page.getByRole('heading', { level: 1, name: /Join NBA Fan Zone/i })).toBeVisible();
  await expect(page.getByPlaceholder('Full Name')).toBeVisible();
  await expect(page.getByPlaceholder('Email Address')).toBeVisible();
  await expect(page.locator('#password1')).toBeVisible();
  await expect(page.getByPlaceholder('Confirm Password')).toBeVisible();
  await expect(page.getByRole('button', { name: /Create Account/i })).toBeVisible();
  await expect(page).toHaveURL(/\/account\/signup\/?$/);
});

test('Signup validation: requires terms checkbox and all fields', async ({ page }) => {
  await page.goto('/account/signup/', { waitUntil: 'domcontentloaded' });
  await page.getByRole('button', { name: 'Create Account' }).click();
  await expect(page).toHaveURL(/\/account\/signup\/?$/);
  await page.getByPlaceholder('Full Name').fill('playwright_user');
  await page.getByPlaceholder('Email Address').fill('user@example.com');
  await page.locator('#password1').fill('Password123!');
  await page.getByPlaceholder('Confirm Password').fill('Password123!');
  await page.getByLabel(/I agree to the/i).check();
  await expect(page.getByRole('button', { name: 'Create Account' })).toBeEnabled();
});

test('Signup -> Login link works', async ({ page }) => {
  await page.goto('/account/signup/', { waitUntil: 'domcontentloaded' });
  await page.getByRole('link', { name: 'Sign In' }).click();
  await expect(page).toHaveURL(/\/account\/login\/?$/);
});

const { test, expect } = require('@playwright/test');

test('Signup page renders and has form elements', async ({ page }) => {
  await page.goto('/account/signup/');
  await expect(page).toHaveTitle(/NBA Fan Zone - Sign Up/i);
  await expect(page.getByRole('heading', { level: 1, name: /Join NBA Fan Zone/i })).toBeVisible();
  await expect(page.getByPlaceholder('Full Name')).toBeVisible();
  await expect(page.getByPlaceholder('Email Address')).toBeVisible();
  await expect(page.getByPlaceholder('Password')).toBeVisible();
  await expect(page.getByPlaceholder('Confirm Password')).toBeVisible();
  await expect(page.getByRole('button', { name: /Create Account/i })).toBeVisible();
  await expect(page).toHaveURL(/\/account\/signup\/?$/);
});

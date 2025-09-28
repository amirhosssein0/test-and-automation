const { test, expect } = require('@playwright/test');

test('Login page renders and has form elements', async ({ page }) => {
  await page.goto('/account/login/');
  await expect(page).toHaveTitle(/NBA Fan Zone - Login/i);
  await expect(page.getByRole('heading', { level: 1, name: /Welcome Back!/i })).toBeVisible();
  await expect(page.getByPlaceholder('Username')).toBeVisible();
  await expect(page.getByPlaceholder('Password')).toBeVisible();
  await expect(page.getByRole('button', { name: /Sign In/i })).toBeVisible();
  await expect(page).toHaveURL(/\/account\/login\/?$/);
});



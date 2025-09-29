const { test, expect } = require('@playwright/test');

test('Login page renders and has form elements', async ({ page }) => {
  await page.goto('/account/login/', { waitUntil: 'domcontentloaded' });
  await expect(page).toHaveTitle(/NBA Fan Zone - Login/i);
  await expect(page.getByRole('heading', { level: 1, name: /Welcome Back!/i })).toBeVisible();
  await expect(page.getByPlaceholder('Username')).toBeVisible();
  await expect(page.getByPlaceholder('Password')).toBeVisible();
  await expect(page.getByRole('button', { name: /Sign In/i })).toBeVisible();
  await expect(page).toHaveURL(/\/account\/login\/?$/);
});

test('Login validation: requires username and password', async ({ page }) => {
  await page.goto('/account/login/', { waitUntil: 'domcontentloaded' });
  await page.getByRole('button', { name: 'Sign In' }).click();
  await expect(page).toHaveURL(/\/account\/login\/?$/);
});

test('Login page links: Forgot Password and Sign Up', async ({ page }) => {
  await page.goto('/account/login/', { waitUntil: 'domcontentloaded' });
  await page.getByRole('link', { name: /Forgot Password\?/i }).click();
  await expect(page).toHaveURL(/\/account\/password\/reset\/?$/);
  await page.goto('/account/login/', { waitUntil: 'domcontentloaded' });
  await page.getByRole('main').getByRole('link', { name: /Sign Up/i }).click();
  await expect(page).toHaveURL(/\/account\/signup\/?$/);
});

test('Header login/signup visibility when logged out', async ({ page }) => {
  await page.goto('/account/login/', { waitUntil: 'domcontentloaded' });
  const header = page.locator('header .navbar');
  await expect(header.getByRole('link', { name: 'Login' })).toBeVisible();
  await expect(header.getByRole('link', { name: 'Sign Up' })).toBeVisible();
});

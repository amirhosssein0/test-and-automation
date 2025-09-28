const { test, expect } = require('@playwright/test');

test('Contact page shows contact info and title', async ({ page }) => {
  await page.goto('/contact/');
  await expect(page).toHaveTitle(/NBA Fan Zone - Contact/i);
  await expect(page.getByRole('heading', { level: 1, name: /Connect With Us/i })).toBeVisible();
  await expect(page.getByRole('heading', { level: 2, name: /Get in Touch/i })).toBeVisible();
  await expect(page.locator('.social-links')).toBeVisible();
  await expect(page).toHaveURL(/\/contact\/?$/);
});



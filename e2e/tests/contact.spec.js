const { test, expect } = require('@playwright/test');

test('Contact page shows contact info and title', async ({ page }) => {
  await page.goto('/contact/', { waitUntil: 'domcontentloaded' });
  await expect(page).toHaveTitle(/NBA Fan Zone - Contact/i);
  await expect(page.getByRole('heading', { level: 1, name: /Connect With Us/i })).toBeVisible();
  await expect(page.getByRole('heading', { level: 2, name: /Get in Touch/i })).toBeVisible();
  await expect(page.locator('.social-links')).toBeVisible();
  await expect(page).toHaveURL(/\/contact\/?$/);
});

test('Header/active state and navigation from Contact', async ({ page }) => {
  await page.goto('/contact/', { waitUntil: 'domcontentloaded' });
  const header = page.locator('header .navbar');
  await header.getByRole('link', { name: 'About' }).click();
  await expect(page).toHaveURL(/\/about\/?$/);
});

test('Footer social links are present', async ({ page }) => {
  await page.goto('/contact/', { waitUntil: 'domcontentloaded' });
  const footer = page.locator('footer');
  await expect(footer.getByRole('link', { name: /Twitter/i })).toBeVisible();
  await expect(footer.getByRole('link', { name: /Facebook/i })).toBeVisible();
  await expect(footer.getByRole('link', { name: /Instagram/i })).toBeVisible();
});

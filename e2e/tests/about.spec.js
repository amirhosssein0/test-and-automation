const { test, expect } = require('@playwright/test');

test('About page renders with correct title and heading', async ({ page }) => {
  await page.goto('/about/', { waitUntil: 'domcontentloaded' });
  await expect(page).toHaveTitle(/NBA Fan Zone - About/i);
  await expect(page.getByRole('heading', { level: 1, name: /About NBA Fan Zone/i })).toBeVisible();
  await expect(page).toHaveURL(/\/about\/?$/);
});

test('Header shows About active and links navigate', async ({ page }) => {
  await page.goto('/about/', { waitUntil: 'domcontentloaded' });
  const header = page.locator('header .navbar');
  await header.getByRole('link', { name: 'Home' }).click();
  await expect(page).toHaveURL('/');
  await page.getByRole('navigation').getByRole('link', { name: 'About' }).click();
  await expect(page).toHaveURL(/\/about\/?$/);
});

test('Footer quick links accessible from About', async ({ page }) => {
  await page.goto('/about/', { waitUntil: 'domcontentloaded' });
  const footer = page.locator('footer');
  await expect(footer.getByRole('link', { name: 'Contact' })).toBeVisible();
  await footer.getByRole('link', { name: 'Contact' }).click();
  await expect(page).toHaveURL(/\/contact\/?$/);
});

const { test, expect } = require('@playwright/test');

test('About page renders with correct title and heading', async ({ page }) => {
  await page.goto('/about/');
  await expect(page).toHaveTitle(/NBA Fan Zone - About/i);
  await expect(page.getByRole('heading', { level: 1, name: /About NBA Fan Zone/i })).toBeVisible();
  await expect(page).toHaveURL(/\/about\/?$/);
});



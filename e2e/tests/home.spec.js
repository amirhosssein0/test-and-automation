const { test, expect } = require('@playwright/test');

test('Home page renders with all key elements', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/NBA Fan Zone - Home/i);
  await expect(page).toHaveURL('/');
  await expect(page.getByRole('heading', { level: 1, name: /Welcome to NBA Fan Zone/i })).toBeVisible();
  await expect(page.getByText(/Your ultimate destination for NBA news, stats, and updates/i)).toBeVisible();
  await expect(page.getByRole('link', { name: /Predict Now/i })).toBeVisible();
  await expect(page.getByRole('link', { name: /Join Now/i })).toBeVisible();  
  await expect(page.getByRole('heading', { level: 2, name: /Featured Content/i })).toBeVisible();
  await expect(page.getByText(/Latest Games/i)).toBeVisible();
  await expect(page.getByText(/Player Stats/i)).toBeVisible();
  await expect(page.getByText(/Latest News/i)).toBeVisible();
});
const { test, expect } = require('@playwright/test');

test('Predict page renders and shows form elements', async ({ page }) => {
  await page.goto('/predict/');
  await expect(page).toHaveTitle(/NBA Fan Zone - Predict/i);
  await expect(page.getByRole('heading', { level: 1, name: /NBA Game Predictor/i })).toBeVisible();
  await expect(page.locator('#conference1')).toBeVisible();
  await expect(page.locator('#conference2')).toBeVisible();
  await expect(page.locator('#team1')).toBeVisible();
  await expect(page.locator('#team2')).toBeVisible();
  await expect(page.getByRole('button', { name: /Generate Prediction/i })).toBeVisible();
  await expect(page).toHaveURL(/\/predict\/?$/);
});



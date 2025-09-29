const { test, expect } = require('@playwright/test');

test('Predict page renders and shows form elements', async ({ page }) => {
  await page.goto('/predict/', { waitUntil: 'domcontentloaded' });
  await expect(page).toHaveTitle(/NBA Fan Zone - Predict/i);
  await expect(page.getByRole('heading', { level: 1, name: /NBA Game Predictor/i })).toBeVisible();
  await expect(page.locator('#conference1')).toBeVisible();
  await expect(page.locator('#conference2')).toBeVisible();
  await expect(page.locator('#team1')).toBeVisible();
  await expect(page.locator('#team2')).toBeVisible();
  await expect(page.getByRole('button', { name: /Generate Prediction/i })).toBeVisible();
  await expect(page).toHaveURL(/\/predict\/?$/);
});

test('Team dropdowns enable and populate based on conference selection', async ({ page }) => {
  await page.goto('/predict/', { waitUntil: 'domcontentloaded' });
  const team1 = page.locator('#team1');
  const team2 = page.locator('#team2');
  await expect(team1).toBeDisabled();
  await expect(team2).toBeDisabled();
  await page.selectOption('#conference1', 'western');
  await expect(team1).toBeEnabled();
  await page.selectOption('#conference2', 'eastern');
  await expect(team2).toBeEnabled();
  const count1 = await team1.locator('option').count();
  const count2 = await team2.locator('option').count();
  expect(count1).toBeGreaterThan(1);
  expect(count2).toBeGreaterThan(1);
});

test('Predict button enables only when both teams selected and shows logos', async ({ page }) => {
  await page.goto('/predict/', { waitUntil: 'domcontentloaded' });
  const button = page.getByRole('button', { name: 'Generate Prediction' });
  await expect(button).toBeDisabled();
  await page.selectOption('#conference1', 'western');
  await page.selectOption('#conference2', 'eastern');
  await page.selectOption('#team1', { index: 1 });
  await expect(button).toBeDisabled();
  await page.selectOption('#team2', { index: 1 });
  await expect(button).toBeEnabled();
  await expect(page.locator('#team1-logo img')).toHaveAttribute('src', /http/);
  await expect(page.locator('#team2-logo img')).toHaveAttribute('src', /http/);
});

test('Submitting prediction disables button and shows Predicting... then resets', async ({ page }) => {
  await page.goto('/predict/', { waitUntil: 'domcontentloaded' });
  await page.selectOption('#conference1', 'western');
  await page.selectOption('#conference2', 'eastern');
  await page.selectOption('#team1', { index: 1 });
  await page.selectOption('#team2', { index: 1 });
  const button = page.getByRole('button', { name: /Generate Prediction|Predicting\.{3}/i });
  await button.click();
  await expect(page.getByRole('heading', { level: 2, name: /Predict Reason/i })).toBeVisible();
});

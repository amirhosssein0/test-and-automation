const { test, expect } = require('@playwright/test');

test('Home page renders with all key elements', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
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

test('Header navigation works and Home link is active', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  const header = page.locator('header .navbar');
  await expect(header).toBeVisible();
  await header.getByRole('link', { name: 'About' }).click();
  await expect(page).toHaveURL(/\/about\/?$/);
  await page.getByRole('navigation').getByRole('link', { name: 'Home' }).click();
  await expect(page).toHaveURL('/');
});

test('Footer contains quick links and navigates correctly', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  const footer = page.locator('footer');
  await expect(footer).toBeVisible();
  await expect(footer.getByRole('link', { name: 'Home' })).toBeVisible();
  await expect(footer.getByRole('link', { name: 'About' })).toBeVisible();
  await expect(footer.getByRole('link', { name: 'Contact' })).toBeVisible();
  await footer.getByRole('link', { name: 'Contact' }).click();
  await expect(page).toHaveURL(/\/contact\/?$/);
});

test('Hero buttons navigate to Predict and Sign Up', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await page.addStyleTag({ content: '* { transition: none !important; animation: none !important; }' });
  await page.getByRole('link', { name: 'Predict Now' }).click();
  await expect(page).toHaveURL(/\/predict\/?$/);
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await page.addStyleTag({ content: '* { transition: none !important; animation: none !important; }' });
  await page.getByRole('link', { name: 'Join Now' }).click();
  await expect(page).toHaveURL(/\/account\/signup\/?$/);
});
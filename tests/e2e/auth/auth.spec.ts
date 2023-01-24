import { test, expect } from '@playwright/test';

test.describe('App auth', () => {
  test('check user auth', async ({ page }) => {
    await page.goto('/');
    await page.locator('text="Login"').click();
    await expect(page).toHaveURL('/auth');
    const input = page.locator('input');
    await input.fill('test user');
    const button = page.locator('button', { hasText: 'Submit' });
    await button.click();
    await expect(page).toHaveURL('/list');
  });
});
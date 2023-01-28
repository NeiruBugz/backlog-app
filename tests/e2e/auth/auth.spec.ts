import { test, expect } from '@playwright/test';

test.describe('App auth', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded', timeout: 3000 });
  });

  test('check user auth', async ({ page }) => {
    await test.step('go to auth route', async () => {
      await page.locator('text="Login"').click();
      await expect(page).toHaveURL('/auth');
    });

    await test.step('input username', async () => {
      const input = page.locator('input');
      await input.fill('test user');
    });
    
    await test.step('submit login', async () => {
      const button = page.locator('button', { hasText: 'Submit' });
      await button.click();
    });

    await test.step('go to list route on successfull auth', async () => {
      await expect(page).toHaveURL('/list');
    });
  });
});
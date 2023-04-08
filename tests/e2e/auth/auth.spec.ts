import { test, expect } from '@playwright/test';

test.describe('App auth', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('check user auth', async ({ page }) => {
    await test.step('go to auth route', async () => {
      await page.locator('text="Login"').click();
      await expect(page).toHaveURL('/auth');
    });

    await test.step('input username', async () => {
      const input = page.locator('input[placeholder="Username"]');
      await input.click();
      await input.fill('test user');
    });

    await test.step('input password', async () => {
      const input = page.locator('input[placeholder="Password"]');
      await input.click();
      await input.fill('password');
    });
    
    await test.step('submit login', async () => {
      const button = page.locator('text="Sign in"');
      await button.click();
    });

    await test.step('go to list route on successfull auth', async () => {
      await expect(page).toHaveURL('/library');
    });
  });
});
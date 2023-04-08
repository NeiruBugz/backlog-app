import { test, expect } from '@playwright/test';
import type { Page } from '@playwright/test';

const auth = async (page: Page) => {
  await page.goto('/');
  await page.locator('text="Login"').click();
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
};

test.describe('Add game', () => {
  test.beforeEach(async ({ page }) => {
    await auth(page);
  });

  test('Adding game', async ({ page }) => {
    await test.step('Locate add game prompt and click it', async () => {
      await page.locator('text="Let\'s add the first one!"').click();
      await expect(page).toHaveURL('/add-game');
    });

    await test.step('Locate game title input and fill it', async () => {
      await page.locator('text="Game title"').click();
      const focusedInput = page.locator('input:focus');
      await focusedInput.fill('Test game');
      expect(await focusedInput.inputValue()).toBe('Test game');
    });

    await test.step('Locate platform select and select "PC"', async () => {
      await page.locator('select[id="Platform"]').click();
      await page.locator('text="PC"').click();
    });

    await test.step('Locate status select and select "In progress"', async () => {
      await page.locator('select[id="Status"]').click();
      await page.locator('[title="In Progress"]').click();
    });

    await test.step('Locate submit button and click it', async () => {
      await page.locator('button', { hasText: 'Submit' }).click();
      expect(page).toHaveURL('/library');
    });
  });
});

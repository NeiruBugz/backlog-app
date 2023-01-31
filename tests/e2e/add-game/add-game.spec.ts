import { test, expect, Page } from '@playwright/test';

const auth = async (page: Page) => {
  await page.locator('text="Login"').click();
  await expect(page).toHaveURL('/auth');
  const input = page.locator('input');
  await input.fill('test user');
  const button = page.locator('text="Sign in"');
  await button.click();
};

test.describe('Add game', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
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

    await test.step('Locate platform select and select "Playstation"', async () => {
      await page.locator('text="Platform"').click();
      const focusedInput = page.locator('*:focus');
      focusedInput.click();
      await page.locator('text="Playstation"').click();
    });

    await test.step('Locate status select and select "In progress"', async () => {
      await page.locator('text="Status"').click();
      await page.locator('[title="Backlog"]').click();
      await page.locator('[title="In Progress"]').click();
    });

    await test.step('Locate submit button and click it', async () => {
      await page.locator('button', { hasText: 'Submit' }).click();
      expect(page).toHaveURL('/list');
    });
  });
});

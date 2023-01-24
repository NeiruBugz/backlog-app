import { test, expect, Page } from '@playwright/test';

const auth = async (page: Page) => {
  await page.goto('/auth');
  const input = page.locator('input');
  await input.fill('test user');
  const button = page.locator('button', { hasText: 'Submit' });
  await button.click();
};

test.describe('Add game', () => {
  test('Adding game', async ({ page }) => {
    await page.goto('/');
    await auth(page);
    await expect(page).toHaveURL('/list');

    await page.locator('text="Let\'s add the first one!"').click();
    await expect(page).toHaveURL('/add-game');

    await page.locator('text="Game Title"').click();
    let focusedInput = page.locator('*:focus');
    await focusedInput.fill('Test game'); 
    expect(await focusedInput.inputValue()).toBe('Test game');

    await page.locator('text="Platform"').click();
    focusedInput = page.locator('*:focus');
    focusedInput.click();
    await page.locator('text="Playstation"').click();

    await page.locator('text="Status"').click();
    focusedInput = page.locator('*:focus');
    focusedInput.click();
    await page.locator('text="In progress"').click();
  });
});
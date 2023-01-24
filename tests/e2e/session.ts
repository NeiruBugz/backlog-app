import { Page } from '@playwright/test';

const auth = async (page: Page) => {
  const input = page.locator('input');
  await input.fill('test user');
  const button = page.locator('button', { hasText: 'Submit' });
  await button.click();
};

export { auth };

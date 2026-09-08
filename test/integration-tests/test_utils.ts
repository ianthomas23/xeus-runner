import { test as base, expect } from 'playwright-test-coverage-native';

// Override page fixture to navigate to specific page.
export const test = base.extend({
  page: async ({ page }, use) => {
    await page.goto('/');
    await use(page);
  },
});

export { expect };

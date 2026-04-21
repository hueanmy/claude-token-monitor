import { test } from '@playwright/test';

// 40s marketing animation + 1s tail buffer
test.setTimeout(90_000);

test('record marketing', async ({ page }) => {
  await page.goto('/plugin/tests/record/marketing.html');

  // Wait for the scene engine to signal completion (set at t = 40s).
  await page.waitForFunction(() => (window as any).__marketingDone === true, {
    timeout: 60_000,
  });

  // Small tail so the CTA scene holds in the final frame.
  await page.waitForTimeout(1000);
});

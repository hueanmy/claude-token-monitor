import { defineConfig } from '@playwright/test';

// Separate config so marketing recordings don't collide with the demo output
// directory (`./videos`) or its project names (desktop-16x9 / mobile-9x16).
export default defineConfig({
  testDir: '.',
  testMatch: /marketing\.spec\.ts$/,
  fullyParallel: false,
  retries: 0,
  timeout: 120_000,

  use: {
    baseURL: 'http://localhost:8765',
  },

  projects: [
    {
      name: 'marketing-desktop-16x9',
      use: {
        viewport: { width: 1920, height: 1080 },
        video:    { mode: 'on', size: { width: 1920, height: 1080 } },
      },
    },
    {
      name: 'marketing-mobile-9x16',
      use: {
        viewport: { width: 1080, height: 1920 },
        video:    { mode: 'on', size: { width: 1080, height: 1920 } },
      },
    },
  ],

  webServer: {
    command: 'python3 -m http.server 8765',
    cwd: '../../..',
    port: 8765,
    reuseExistingServer: true,
    stdout: 'ignore',
    stderr: 'pipe',
  },

  outputDir: './videos-marketing',
});

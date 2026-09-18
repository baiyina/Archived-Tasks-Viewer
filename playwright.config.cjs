const { defineConfig } = require('@playwright/test');
module.exports = defineConfig({
  testDir: './tests',
  workers: 1,
  use: { headless: true, channel: process.env.PLAYWRIGHT_CHANNEL || 'msedge' },
});

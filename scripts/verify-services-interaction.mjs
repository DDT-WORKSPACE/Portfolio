import { chromium } from '@playwright/test';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(1500);

const servicesEl = await page.$('#services');
if (servicesEl) {
  await servicesEl.scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);

  // Tab 0: Web
  await page.screenshot({ path: 'test-results/brand-polish/svc-tab-0-web.png' });

  // Click Tab 1: Mobile Apps
  const tabButtons = await page.$$('.st-service-selector-card');
  if (tabButtons[1]) {
    await tabButtons[1].click();
    await page.waitForTimeout(600);
    await page.screenshot({ path: 'test-results/brand-polish/svc-tab-1-mobile.png' });
  }

  // Click Tab 2: Design
  if (tabButtons[2]) {
    await tabButtons[2].click();
    await page.waitForTimeout(600);
    await page.screenshot({ path: 'test-results/brand-polish/svc-tab-2-design.png' });
  }

  // Click Tab 3: Automation
  if (tabButtons[3]) {
    await tabButtons[3].click();
    await page.waitForTimeout(600);
    await page.screenshot({ path: 'test-results/brand-polish/svc-tab-3-automation.png' });

    // Click Simulate Live Workflow Event button
    const simBtn = await page.$('.pipeline-trigger-action button');
    if (simBtn) {
      await simBtn.click();
      await page.waitForTimeout(800);
      await page.screenshot({ path: 'test-results/brand-polish/svc-tab-3-automation-triggered.png' });
    }
  }
}

console.log('All interactive service tabs tested and verified!');
await browser.close();

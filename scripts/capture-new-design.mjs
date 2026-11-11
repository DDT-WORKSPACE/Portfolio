import { chromium } from '@playwright/test';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

try {
  console.log('Connecting to existing server at http://localhost:3000...');
  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(2500);

  // 1. Hero & Zoom Stage
  await page.screenshot({ path: 'test-results/brand-polish/new-hero.png' });
  console.log('Captured new-hero.png');

  // Scroll to Zoom Stage
  await page.evaluate(() => window.scrollTo(0, 750));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'test-results/brand-polish/new-zoom-stage.png' });
  console.log('Captured new-zoom-stage.png');

  // Scroll to Interactive Services Hub
  const servicesEl = await page.$('#services');
  if (servicesEl) {
    await servicesEl.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'test-results/brand-polish/new-services-interactive.png' });
    console.log('Captured new-services-interactive.png');
  }

  // Scroll to 3D Stacking Projects Deck
  const projectsEl = await page.$('#projects');
  if (projectsEl) {
    await projectsEl.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'test-results/brand-polish/new-project-stack-1.png' });
    console.log('Captured new-project-stack-1.png');

    // Scroll down the sticky track
    await page.mouse.wheel(0, 1000);
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'test-results/brand-polish/new-project-stack-2.png' });
    console.log('Captured new-project-stack-2.png');
  }

  // Scroll to FAQ & CTA
  const faqEl = await page.$('#faq');
  if (faqEl) {
    await faqEl.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'test-results/brand-polish/new-faq-cta.png' });
    console.log('Captured new-faq-cta.png');
  }

  console.log('All screenshots captured successfully!');
} catch (err) {
  console.error('Capture error:', err.message);
} finally {
  await browser.close();
}

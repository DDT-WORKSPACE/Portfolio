import { chromium } from '@playwright/test';
import { writeFile } from 'node:fs/promises';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

try {
  await page.goto('https://qarin.framer.website/', { waitUntil: 'networkidle', timeout: 45000 });
  
  // Extract all main sections
  const report = await page.evaluate(() => {
    // Look for top level containers inside the main framer root
    const root = document.querySelector('[data-framer-name="Desktop"]') || document.body;
    const containers = Array.from(document.querySelectorAll('section, [data-framer-name]')).filter(el => {
      const h = el.clientHeight;
      const w = el.clientWidth;
      return h > 300 && w > 800 && (el.parentElement === document.body || el.parentElement?.clientHeight > 3000);
    });

    const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4')).map(h => {
      const rect = h.getBoundingClientRect();
      return {
        tag: h.tagName,
        text: h.textContent?.trim(),
        top: Math.round(rect.top + window.scrollY),
        height: Math.round(rect.height)
      };
    });

    // Check for sticky / pin elements
    const stickyEls = Array.from(document.querySelectorAll('*')).filter(el => {
      const s = getComputedStyle(el);
      return s.position === 'sticky' || s.position === 'fixed';
    }).map(el => ({
      tag: el.tagName,
      name: el.getAttribute('data-framer-name'),
      classes: el.className,
      text: el.textContent?.slice(0, 80),
      top: el.getBoundingClientRect().top
    }));

    return { headings, stickyEls };
  });

  console.log('Headings in Qarin:\n', JSON.stringify(report.headings, null, 2));
  console.log('\nSticky elements:\n', JSON.stringify(report.stickyEls.slice(0, 10), null, 2));

  // Take full page screenshot at specific scroll positions
  // 1. Hero expanding stage
  await page.evaluate(() => window.scrollTo(0, 600));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'test-results/qarin-hero-expand.png' });

  // 2. Services / Features section
  await page.evaluate(() => window.scrollTo(0, 4200));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'test-results/qarin-services.png' });

  // 3. Project / Work stacked 3D cards
  await page.evaluate(() => window.scrollTo(0, 7200));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'test-results/qarin-projects-1.png' });

  await page.evaluate(() => window.scrollTo(0, 7900));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'test-results/qarin-projects-2.png' });

  await page.evaluate(() => window.scrollTo(0, 8600));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'test-results/qarin-projects-3.png' });

} catch (err) {
  console.error('Error:', err.message);
} finally {
  await browser.close();
}

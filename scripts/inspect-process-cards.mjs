import { chromium } from '@playwright/test';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

await page.goto('https://qarin.framer.website/', { waitUntil: 'domcontentloaded', timeout: 30000 });
await page.waitForTimeout(1500);

const processCards = await page.evaluate(() => {
  const processFrame = document.querySelector('[data-framer-name="Process Frame"]');
  if (!processFrame) return 'Process frame not found';
  
  const cards = Array.from(processFrame.querySelectorAll('[data-framer-name*="Card"], [data-framer-name*="Step"], [data-framer-name*="Process"]')).map(c => ({
    name: c.getAttribute('data-framer-name'),
    text: c.textContent?.slice(0, 100),
    classes: c.className
  }));

  return {
    frameStyles: {
      position: getComputedStyle(processFrame).position,
      height: getComputedStyle(processFrame).height
    },
    cards
  };
});

console.log(JSON.stringify(processCards, null, 2));
await browser.close();

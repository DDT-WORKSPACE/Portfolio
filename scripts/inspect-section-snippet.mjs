import { chromium } from '@playwright/test';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

await page.goto('https://qarin.framer.website/', { waitUntil: 'domcontentloaded', timeout: 30000 });
await page.waitForTimeout(1500);

const result = await page.evaluate(() => {
  const h2 = Array.from(document.querySelectorAll('h2')).find(el => el.textContent?.includes('A smarter way'));
  if (!h2) return 'h2 not found';
  
  // Find container
  let el = h2;
  while (el && !el.getAttribute('data-framer-name')?.includes('Feature') && el !== document.body) {
    el = el.parentElement;
  }
  
  // Let's get the parent section of h2
  let s = h2.parentElement;
  while (s && s.tagName !== 'SECTION' && s.clientHeight < 1200) {
    s = s.parentElement;
  }
  
  return {
    h2Text: h2.textContent,
    sectionTag: s?.tagName,
    sectionClass: s?.className,
    sectionName: s?.getAttribute('data-framer-name'),
    htmlSnippet: s?.innerHTML?.slice(0, 800)
  };
});

console.log(JSON.stringify(result, null, 2));
await browser.close();

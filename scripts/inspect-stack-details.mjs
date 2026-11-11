import { chromium } from '@playwright/test';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

try {
  await page.goto('https://qarin.framer.website/', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(2000);

  const stackDetails = await page.evaluate(() => {
    const h2 = Array.from(document.querySelectorAll('h2')).find(el => el.textContent?.includes('A smarter way'));
    if (!h2) return null;
    let section = h2.closest('section') || h2.parentElement;
    while (section && section.clientHeight < 1000) {
      section = section.parentElement;
    }
    const cards = Array.from(section?.querySelectorAll('[data-framer-name*="Card"], [class*="card"], [data-framer-name*="Item"]') || []);
    return {
      sectionClass: section?.className,
      sectionHeight: section?.clientHeight,
      sectionStyle: section ? {
        position: getComputedStyle(section).position,
        height: getComputedStyle(section).height
      } : null,
      cardsCount: cards.length,
      cards: cards.slice(0, 5).map(c => ({
        tag: c.tagName,
        name: c.getAttribute('data-framer-name'),
        text: c.textContent?.slice(0, 60),
        style: {
          position: getComputedStyle(c).position,
          transform: getComputedStyle(c).transform,
          zIndex: getComputedStyle(c).zIndex
        }
      }))
    };
  });

  const servicesDetails = await page.evaluate(() => {
    const h2 = Array.from(document.querySelectorAll('h2')).find(el => el.textContent?.includes('AI-Powered growth stack') || el.textContent?.includes('Everything you need'));
    if (!h2) return null;
    let section = h2.closest('section') || h2.parentElement?.parentElement;
    return {
      h2: h2.textContent,
      text: section?.textContent?.slice(0, 300),
      tabs: Array.from(section?.querySelectorAll('button, [role="tab"], [data-framer-name*="Tab"]') || []).map(t => t.textContent?.trim())
    };
  });

  console.log('Stack Details:\n', JSON.stringify(stackDetails, null, 2));
  console.log('Services Details:\n', JSON.stringify(servicesDetails, null, 2));

} catch (err) {
  console.error(err);
} finally {
  await browser.close();
}

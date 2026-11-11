import { chromium } from '@playwright/test';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(1500);

const inspect = await page.evaluate(() => {
  const sec = document.querySelector('#projects');
  if (!sec) return 'No #projects found';
  const sticky = sec.querySelector('.st-project-sticky-stage');
  const cards = Array.from(sec.querySelectorAll('.st-stack-card'));
  const activePill = sec.querySelector('.st-step-pill.active');
  return {
    secRect: sec.getBoundingClientRect(),
    stickyRect: sticky ? sticky.getBoundingClientRect() : null,
    cardsCount: cards.length,
    activePill: activePill?.textContent,
    card0: cards[0] ? {
      rect: cards[0].getBoundingClientRect(),
      transform: getComputedStyle(cards[0]).transform,
      opacity: getComputedStyle(cards[0]).opacity,
      zIndex: getComputedStyle(cards[0]).zIndex
    } : null
  };
});

console.log(JSON.stringify(inspect, null, 2));

// Now let's scroll to exactly 50% through #projects
await page.evaluate(() => {
  const sec = document.querySelector('#projects');
  if (sec) {
    window.scrollTo(0, sec.offsetTop + 1200);
  }
});
await page.waitForTimeout(800);

const inspectScrolled = await page.evaluate(() => {
  const sec = document.querySelector('#projects');
  const cards = Array.from(sec.querySelectorAll('.st-stack-card'));
  const activePill = sec.querySelector('.st-step-pill.active');
  return {
    activePill: activePill?.textContent,
    cards: cards.map((c, i) => ({
      index: i,
      transform: getComputedStyle(c).transform,
      opacity: getComputedStyle(c).opacity,
      zIndex: getComputedStyle(c).zIndex
    }))
  };
});

console.log('Scrolled inspect:\n', JSON.stringify(inspectScrolled, null, 2));
await page.screenshot({ path: 'test-results/brand-polish/verified-stack-scrolled.png' });
await browser.close();

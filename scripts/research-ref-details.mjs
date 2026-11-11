import {chromium} from '@playwright/test';
import {writeFile} from 'node:fs/promises';
const browser=await chromium.launch();
const refs=[['optivio','https://optivio.framer.website/',/Results that speak/],['sentira','https://sentira.framer.website/',/Built to make AI/],['devgent','https://devgent.framer.website/',/How our AI chat/],['devgent-testimonials','https://devgent.framer.website/',/Some words from happy/],['landa','https://landa.framer.ai/',/Launch a faster site/],['qarin-integrations','https://qarin.framer.website/',/Powerful integrations/],['aset','https://aset.framer.website/',/Trusted by Forward/]];
for(let i=0;i<refs.length;i+=2){await Promise.all(refs.slice(i,i+2).map(async([name,url,re])=>{
 const page=await browser.newPage({viewport:{width:1440,height:1000}});
 try{await page.goto(url,{waitUntil:'domcontentloaded',timeout:60000});await page.waitForTimeout(1700);
 if(name==='optivio'){
  console.log('optivio-video',await page.locator('video').first().evaluate(v=>({ready:v.readyState,paused:v.paused,error:v.error?.message,time:v.currentTime,duration:v.duration})));
  await page.locator('video').first().evaluate(v=>{v.muted=true;v.play().catch(()=>{});});await page.waitForTimeout(5000);await page.screenshot({path:'test-results/new-references/optivio-hands.png'});
 }
 const h=page.locator('h1,h2,h3').filter({hasText:re}).first();await h.scrollIntoViewIfNeeded();await page.evaluate(()=>scrollBy(0,-120));await page.waitForTimeout(2400);await page.screenshot({path:`test-results/new-references/${name}-detail.png`});await page.mouse.wheel(0,440);await page.waitForTimeout(2000);await page.screenshot({path:`test-results/new-references/${name}-detail-b.png`});
 console.log('captured',name);
 }catch(e){console.log(name,e.message)}await page.close();
}));}
await browser.close();

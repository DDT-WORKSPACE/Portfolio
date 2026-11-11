import {chromium} from '@playwright/test';
import {mkdir,writeFile} from 'node:fs/promises';
await mkdir('test-results/new-references',{recursive:true});
const browser=await chromium.launch();
const refs=[['optivio','https://optivio.framer.website/',[/proof|impact/i]],['sentira','https://sentira.framer.website/',[/about us|who we are/i]],['devgent','https://devgent.framer.website/',[/how.*work/i,/testimonials|customers|saying|love/i]],['landa','https://landa.framer.ai/',[/get started|ready to|start building/i]],['qarin','https://qarin.framer.website/',[/key features/i,/integrations/i]],['aset','https://aset.framer.website/',[/forward.thinking|investors|testimonials/i]]];
const report=[];
for(let i=0;i<refs.length;i+=2){await Promise.all(refs.slice(i,i+2).map(async([name,url,targets])=>{
 const context=await browser.newContext({viewport:{width:1440,height:1000}});const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 try{await page.goto(url,{waitUntil:'domcontentloaded',timeout:60000});await page.waitForTimeout(2500);await page.screenshot({path:`test-results/new-references/${name}-hero.png`});
 const data=await page.evaluate(()=>({title:document.title,headings:[...document.querySelectorAll('h1,h2,h3')].map(e=>({text:e.textContent,top:e.getBoundingClientRect().top+scrollY})),media:[...document.querySelectorAll('video,canvas,iframe')].map(e=>({tag:e.tagName,src:e.currentSrc||e.src,width:e.clientWidth,height:e.clientHeight})),images:[...document.images].slice(0,35).map(e=>({alt:e.alt,src:e.currentSrc||e.src})),animations:document.getAnimations().slice(0,15).map(a=>({duration:a.effect?.getTiming().duration,keyframes:a.effect?.getKeyframes().slice(0,2)}))}));
 for(let j=0;j<targets.length;j++){const h=page.locator('h1,h2,h3,h4,h5,p').filter({hasText:targets[j]}).first();if(await h.count()){await h.scrollIntoViewIfNeeded();await page.waitForTimeout(800);await page.screenshot({path:`test-results/new-references/${name}-section-${j}.png`});await page.mouse.wheel(0,500);await page.waitForTimeout(700);await page.screenshot({path:`test-results/new-references/${name}-section-${j}-scroll.png`});}}
 data.errors=errors;report.push({name,url,...data});console.log(name,JSON.stringify({title:data.title,headings:data.headings,media:data.media,animationCount:data.animations.length}));
 }catch(e){report.push({name,error:e.message});console.log(name,e.message);}await context.close();
}));}
await writeFile('test-results/new-references/report.json',JSON.stringify(report,null,2));await browser.close();

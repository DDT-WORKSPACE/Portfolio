import sharp from 'sharp';
import {mkdir} from 'node:fs/promises';
await mkdir('public/previews',{recursive:true});
await sharp('public/Projects/talentbadger.jpg').extract({left:489,top:95,width:552,height:397}).webp({quality:100}).toFile('public/previews/talentbadger-web.webp');
await sharp('public/Projects/renbite.jpg').extract({left:674,top:61,width:387,height:849}).webp({quality:100}).toFile('public/previews/renbite-screen.webp');

import sharp from 'sharp';
import {mkdir} from 'node:fs/promises';
await mkdir('public/brands',{recursive:true});
const logos=[['talentbadger','talentbadger.jpg',42,23,320,64],['renbite','renbite.jpg',128,98,310,90],['ffp-vault','ffp_vault.jpg',127,53,300,75],['evpitch','evpitch.jpg',35,17,170,100],['walkthroughz','walkthroughz.jpg',35,8,200,90],['besttrip','besttrip.png',83,0,95,45]];
for(const [name,file,left,top,width,height] of logos){await sharp('public/Projects/'+file).extract({left,top,width,height}).webp({quality:94}).toFile('public/brands/'+name+'.webp')}
console.log('Extracted six original portfolio wordmarks.');

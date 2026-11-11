import sharp from 'sharp';
await sharp('public/artwork/connection-hands.png').resize({width:1440}).webp({quality:90}).toFile('public/artwork/connection-hands.webp');
console.log('Optimized the original hands artwork, preserving transparency.');

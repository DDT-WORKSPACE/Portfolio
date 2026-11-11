# Actual product preview crops

Both previews are direct crops of the owner's supplied portfolio images. No new AI-generated raster asset is used.

- Talent Badger: source public/Projects/talentbadger.jpg; crop left 489, top 95, width 552, height 397. The crop isolates the actual website viewport from the surrounding case-study presentation.
- Renbite: source public/Projects/renbite.jpg; crop left 674, top 61, width 387, height 849. The crop isolates the actual mobile app screen.

Output: talentbadger-web.webp and renbite-screen.webp, WebP quality 100. Reproduce with node scripts/prepare-real-previews.mjs.

Product design and workflow robot previews are native HTML/CSS illustrations in components/sections/agency-sections.tsx. The service network reuses the existing service-atlas.webp and the original project connection geometry.

The web discipline now uses a code-native scalable reconstruction of the supplied Talent Badger layout (components/talent-platform-preview.tsx), because the small source crop could not become a true high-resolution screenshot through enlargement. It preserves the product's visual direction and links to the original case study. The archived crop remains available. Renbite uses the original source-screen crop without a Next.js recompression pass, at its original aspect ratio. No artificial stretching or generated enhancement is used.

Latest owner correction: Web platforms now displays the complete original public/Projects/talentbadger.jpg directly, preserving the supplied mockup design. The prior crop and scalable reconstruction are no longer mounted in the website. The original JPEG renders unoptimized at its native aspect ratio.

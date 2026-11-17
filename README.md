# DevsDen Tech

A Next.js website for software design, development and business automation. The current brand redesign uses a dark, light-filled 3D hero, bright product sections and only the logo colours (blue #035FE8, orange #FF6F00). The original company mark, service hub and supplied portfolio are retained.

## Run locally

```powershell
npm install
npm run dev
```

Open http://localhost:3000. Production commands:

```powershell
npm run check
npm run build
npm start
```

The production content gate rejects unresolved double-curly-brace placeholders in content files. Optional build:draft creates a noindex review build.

## Current homepage (brand redesign)

One typeface (Plus Jakarta Sans), moderate heading sizes and no italic text anywhere. Styles live in app/brand.css, loaded after the older stylesheets.

- Hero: a real-time three.js scene in components/home/hero-core.tsx with nested glass cubes around a glowing core, orbit rings and light dust. Light trails connect it to four discipline cards, followed by count-up stats and a white logo marquee. The scene pauses off-screen and renders a still frame with reduced motion.
- Sections in order: intro showcase with parallax 3D blobs, the original service hub (larger), a Ready to get started banner, three pillars with gradient wave footers, a compact interactive work showcase, process cards with a notched number badge, a solutions ecosystem, 3D industries, FAQ, a photo call to action and insight cards with curved image edges.
- Start a project: components/start-project.tsx opens a panel from the header, hero and calls to action. It composes a ready-to-send email in Gmail or the visitor's mail app; nothing is sent by the website.
- Motion: GSAP ScrollTrigger reveals, parallax, background zoom, path drawing, count-ups and pointer tilt in components/home/motion.ts, driven by data attributes.
- Site-wide: floating glass header with Home, a sliding active indicator and a services mega menu; dark footer; a dark inner-page hero shared by every route; brand-styled section labels.
- Case studies: app/work/[slug] shows the full mockup and structured content from content/case-studies.ts (overview, challenge, goal, approach, features, expertise, result).
- The photo behind the call to action is loaded from Unsplash's image CDN (free Unsplash licence, office photo by Proxyclick). To self-host it, download it into public and change the url in app/brand.css.

## Colour themes (Brand blue / Emerald gold)

A switch fixed at the bottom of every page flips the whole site between the logo palette and the green and gold palette from the DDT Figma file (deep green #062121, teal #1F4C4C, gold #876215). The choice is stored in the browser and applied before first paint.

- app/theme-emerald.css is generated. scripts/build-emerald-theme.mjs copies every colour-related declaration from the loaded stylesheets, recolours it with scripts/emerald-palette.mjs and scopes it under html[data-theme="emerald"]. Re-run it after any stylesheet change: node scripts/build-emerald-theme.mjs
- app/theme-emerald-overrides.css holds the hand-tuned Figma roles: gold primary buttons and accent words, the near-black teal hero, the deep green banner, photo call to action and footer.
- Images: run node scripts/emerald-assets.mjs for the logo, browser-tab icon, 3D service icons and industry illustrations, and set PALETTE=emerald before node scripts/brand-mockups.mjs for the mockups (written to public/Projects/emerald). Components render both versions and CSS shows the active one (components/themed-image.tsx).
- The three.js hero and the ecosystem ring read the theme with useTheme from components/theme.tsx.
- The browser-tab icon switches to the green and gold logo in the Emerald theme (components/theme-script.ts).
- To check for leftover blue or orange, run TEST_URL=http://localhost:3210 node scripts/emerald-audit.mjs "/,/services,/contact" (comma-separated routes). Add OFF_PALETTE=1 to also list any other saturated hue.

Portfolio mockups are recoloured into the brand palette by scripts/brand-mockups.mjs. It moves only saturated accent hue bands to brand blue or orange, so photography, skin tones and type stay untouched. Originals stay in public/Projects. Branded copies in public/Projects/brand are what content/work.ts uses. Re-run it after adding a project:

```powershell
node scripts/brand-mockups.mjs
```

For a visual check, set TEST_URL and run node scripts/brand-sections.mjs with an output folder and width (set ROUTE for other pages). node scripts/brand-modal-check.mjs verifies the Start a project panel.

## Previous homepage (replaced, source kept)

- Blue/orange animated light hero with a larger centered portfolio-logo strip and a factual portfolio caption.
- Four light illustrated About cards scatter from the center as the user scrolls. Card numbers and real catalog counts animate to their final values; reduced motion shows static final content.
- Four discipline tabs with restrained fade/slide motion, the original supplied Talent Badger portfolio mockup, the actual Renbite screen, a native design composition with side panels and an animated robot with changing speech bubbles. Surrounding browser/board backgrounds are removed.
- Five supplied portfolio projects retain native sticky overlap. Every project detail page includes an expanded product journey and design explanation.
- An expanding light service hub with eleven service destinations. A clamped preview appears beside the hovered/focused node and remains reachable by mouse. Touch opens a compact preview with a detail link.
- Ten integration tools in a gently moving connection diagram, a directory and ten substantive detail routes covering example workflows, scope, permissions and handover.
- Four horizontally expanding Approach panels; the mobile version uses vertical accordion expansion.
- Whole-card Approach selection, a larger portfolio marquee, larger hub glyphs and slightly deeper light surfaces. Existing full-row FAQ and validated inline contact form. Desktop places normal explanatory text left and the form right; mobile stacks the copy before the form.
- A light blue footer matching the service panel, with email-copy, directory and legal controls.

The previous Clear Process section remains removed. Approach is the new explicitly requested section. Existing service, project and other substantive routes remain available.

## Content and artwork

Reference review and section mapping: docs/studio-reference-review.md. Browser reference captures and motion/media observations are in the ignored test-results/new-references directory. Reference-site media and proprietary code are not shipped in the application.

The archived hands PNG, optimized transparent WebP, exact built-in image-generation prompt and former runtime renderer are documented in public/artwork/connection-hands.md. Run node scripts/prepare-studio-art.mjs to rebuild the optimized asset from the saved project PNG. Portfolio logo cleanup provenance is in public/brands/README.md. Actual product-screen crop provenance is in public/previews/README.md; no new generated raster imagery is used in these discipline previews.

Older unmounted homepage sections remain in source for the previous design. Their acceptance scripts are historical; the active browser checks are listed below.

## Contact and integrations

The owner's contact address is devsdevtech@gmail.com. Phone remains blank. Copy .env.example to .env.local when integration settings are available.

PROJECT_WEBHOOK_URL can deliver project enquiries to an HTTPS endpoint; PROJECT_WEBHOOK_TOKEN is optional and server-side. Without an endpoint, the validated brief becomes a Gmail or email-app draft. The visitor explicitly opens, reviews and sends that draft; the website does not claim automatic delivery. The homepage and standalone Contact page use the same validated form and submission handler.

Set SITE_URL to the actual public origin for absolute metadata and Organization structured data. No domain is assumed. Calendar and analytics remain optional. This work uses the existing local checkout; no new hosting account or domain was created.

## Verification

With a local production server running:

```powershell
$env:TEST_URL='http://localhost:3000'
npm run test:browser
npm run test:mobile
npm run test:additions
npm run test:polish
```

The current browser suite checks hero motion, logo geometry, About content, discipline controls, project overlap, hub scaling/previews, FAQ, inline form validation, reduced motion, five widths and all generated content routes. The mobile suite covers touch navigation, product screens, service previews and form validation. The additions suite checks the split contact layout, mouse-to-preview navigation, four Approach panels, integration detail routes and expanded project content.

Current source-restoration/service-copy evidence: test-results/service-copy. Main regression captures: test-results/studio-final. Earlier acceptance scripts and reports describe previous designs. Current results and limits: VERIFICATION.md.

Latest final-polish evidence: test-results/final-polish/report.json. The polish suite covers centered larger marks, reversible bento spreading, final count values, image aspect ratios, robot messages, restored design panels, larger service glyphs and whole-card Approach activation.

Service-hover copy is maintained in content/service-previews.ts: each service has a business-facing description, two deliverables and an explicit scope note. Web platforms uses public/Projects/talentbadger.jpg directly, without crop, redraw or Next.js recompression. Discipline changes have a short outgoing fade followed by the incoming reveal, canceling stale changes during quick tab selection. Reduced motion skips the transition.

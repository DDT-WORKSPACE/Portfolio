# DevsDen Tech

A Next.js website for software design, development and business automation. The current studio redesign uses a light blue/orange hero, clean white sections and a focused blue services panel. The original company mark and supplied portfolio are retained.

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

## Current homepage

- Blue/orange animated light hero with a larger centered portfolio-logo strip and a factual portfolio caption.
- Four light illustrated About cards scatter from the center as the user scrolls. Card numbers and real catalog counts animate to their final values; reduced motion shows static final content.
- Four discipline tabs with restrained fade/slide motion, a scalable Talent Badger layout reconstruction, the actual Renbite screen, a native design composition with side panels and an animated robot with changing speech bubbles. Surrounding browser/board backgrounds are removed.
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

Current reports and screenshots: test-results/studio-final. Earlier acceptance scripts and reports describe previous designs. Current results and limits: VERIFICATION.md.

Latest final-polish evidence: test-results/final-polish/report.json. The polish suite covers centered larger marks, reversible bento spreading, final count values, image aspect ratios, robot messages, restored design panels, larger service glyphs and whole-card Approach activation.

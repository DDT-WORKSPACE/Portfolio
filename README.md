# DevsDen Tech

A light Next.js marketing website for software, design and practical business automation. Built with TypeScript, Tailwind CSS, Motion, Lenis and React Hook Form/Zod. The supplied logo, service atlas and ten project covers are preserved.

## Local development

```powershell
npm install
npm run dev
```

Open http://localhost:3000. Dependencies are locked in package-lock.json.

```powershell
npm run check
npm run build
npm start
```

The regular production build now passes the content gate. It rejects unresolved double-curly-brace placeholders in content files. The optional build:draft command creates a noindex review build.

## Current experience

- Centered, architectural hero inspired by the supplied screenshot, in DevsDen Tech's light navy, blue and orange palette. Original geometric accents hold between short coordinated slides and turns, without pulsing in size; motion pauses offscreen and respects reduced-motion preferences.
- Oversized moving strip of six wordmarks extracted from the supplied portfolio artwork. They are identified as portfolio projects.
- Three scroll-linked decisions explain how a clear problem becomes a usable product, without repetitive service tiles.
- Eleven-service circuit hub unfolds from the centre on scroll entry and folds back on exit. Moving packets, hover/focus details, keyboard controls and prompt dismissal remain available.
- A completely redesigned horizontal process index opens four editorial chapters with concrete deliverables and keyboard navigation.
- Three engagement models, ten portfolio projects, six industry illustrations with automatic advance, pause, arrows, keyboard and swipe/drag controls.
- Technology groups explain tool choices, with four upright tool symbols orbiting the stationary logo on two circular tracks; four starting points each open a substantive detail page. Browser Back restores the previous section position.
- Business automation content covers reception, appointments, sales follow-up and operational workflows with human handoff.
- Eleven service pages, ten case presentations, six industry pages, four starting-point pages, About, three complete journal articles, six FAQs, Contact and general legal text.
- Responsive navigation, work filtering, metadata, Open Graph artwork, sitemap, robots and optional analytics.

The case presentations describe the supplied designs. Business results, client reviews, personal biographies and contact details have not been invented. Visible site counts refer to the actual project/service catalogs.

## Integrations

The contact email supplied by the owner is devsdevtech@gmail.com. Phone remains blank. Copy .env.example to .env.local when real integration values are available. Set SITE_URL to the public origin for correct absolute metadata; no public domain is assumed.

PROJECT_WEBHOOK_URL accepts project enquiries over HTTPS; PROJECT_WEBHOOK_TOKEN is optional and server-side. Without an endpoint, validated form details become a Gmail or email-app draft. The visitor explicitly opens, reviews and sends that draft; the website does not claim it has delivered the message. A booking calendar is shown only when configured with an allowed Calendly or Cal.com URL. Newsletter delivery code remains available, but signup is not exposed in the footer. Analytics is optional and unconfigured.

This work is maintained in the local Next.js checkout. No new hosting account, domain or hosted Site was created.

## Verification

```powershell
npx playwright install chromium
# Start the production server before browser checks.
$env:TEST_URL='http://localhost:3000'
npm run test:browser
node scripts/refinement-check.mjs
node scripts/service-check.mjs
node scripts/audit.mjs
```

The main browser suite covers navigation, services, accordions, filters, form validation and five responsive widths. The refinement suite covers the current motion, industry controls, real process imagery, complete content and Back restoration. Reports and screenshots are saved under the ignored test-results directory. See VERIFICATION.md for current measurements. The older experience-check script targets the superseded process scenes and is retained as historical source.

## Artwork and references

Generated assets, saved paths and exact built-in-tool prompts are documented in public/artwork/README.md. PNG originals and optimized WebPs are both included. Regenerate optimized industry WebPs with node scripts/prepare-industry-art.mjs.

The user's references were Mistral, BairesDev, STX Next and Goji Labs. The supplied Mistral recording and screenshot informed composition and movement while retaining this website's brand. Reference-site text, logos and mascots were not copied.

## Latest visual refinement

The hero now follows the reference recording?s hold, slide and square-to-diamond rhythm instead of continuous scale animation. The process section is a new typographic chapter layout, with no project-image cards or sticky split panel. The navy footer is now compact, with a short invitation, direct email link and organized studio/expertise navigation.

## Orbit and homepage cleanup

Removed the homepage studio-notes section and its repeated footer link. Existing journal routes remain available through Insights navigation. Added planetary tool motion, paused offscreen or in a hidden tab and disabled for reduced motion. Services unfold and retract with scroll in both directions; mobile keeps the readable accordion. Run node scripts/orbit-check.mjs for this revision?s focused checks.

## Organized detail pages and contact flow

All eleven services now have unique overview, fit, deliverable descriptions, a practical example, delivery stages and answered FAQs. Four starting points have specific plans and preparation answers. The shared scope selector carries chosen priorities to the contact form. The form renders without a lazy-loading replacement, uses fixed labels above controls and preserves its fields while preparing a reviewed email handoff.

Run node scripts/detail-pages-check.mjs for the fifteen detail pages, enquiry handoff, footer size, accessibility, five responsive widths and a check of all generated content routes.

## Distinct hero, transparent logos and footer interaction

The centered hero now uses five original folded-ribbon and open-orbit elements instead of the reference-style pixel characters, rectangular towers and guide frame. The message, palette and deliberate hold/slide/turn rhythm remain. The compact footer adds a working email-copy control with confirmation, a moving conversation arrow and hover/keyboard link feedback.

All six portfolio logos now use true-alpha WebP assets, with edited PNG originals and the exact built-in cleanup prompts in public/brands/README.md. Rebuild optimized logo assets with node scripts/save-clean-logos.mjs. Run node scripts/brand-polish-check.mjs for the latest visual, clipboard, transparency, accessibility and responsive checks.

## Marked-reference alignment and scroll chapters

The latest hero revision follows the marked screenshot: full-height paired side guides, an upper-left arc, aligned two-cell edge stacks and a diamond aligned to the right column. The approved curved floor connector remains. The process index now follows scroll down and up through Discover, Design, Build and Launch, with direct click and keyboard selection kept in sync. Tall screens pin the chapter view; short screens keep normal flow, and reduced motion keeps manual controls. The mobile booking bar is hidden during the process sequence. Run node scripts/process-scroll-check.mjs for this behavior. Complete detail pages remain available; no useful content routes were removed.

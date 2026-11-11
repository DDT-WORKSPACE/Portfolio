# Verification — 10 November 2026

This report supersedes earlier draft and placeholder-gate reports. Results are local Chromium lab measurements, not production field data or real-device certification.

## Completed

- Normal production build: passed, including content validation and strict TypeScript. Next.js generated 47 route outputs.
- Main browser suite: 21 checks passed, no runtime errors.
- Current refinement suite: 29 checks passed, no runtime errors or automated WCAG violations across the revised regions.
- Service-card checks: all 22 cards at 1024 and 1440 px fit inside their stage; no automated accessibility violations.
- Responsive screenshots: 375, 768, 1024, 1440 and 1920 px; no horizontal overflow.
- Full-page Axe: no detected WCAG 2 A/AA or WCAG 2.1 AA violations. This does not replace manual accessibility review.

The refinement checks cover reference-style geometric holds, slides and turns without scale pulsation, moving service packets, prompt hover dismissal and hoverable details, four distinct editorial process chapters with deliverables and keyboard navigation, six different industry illustrations, automatic carousel advance and drag, substantive FAQs and inner-page content, and browser Back restoring the previous section within 35 px.

## Fresh performance measurements

| Metric | Desktop | Mobile |
| --- | --- | --- |
| Lighthouse performance | 100 | 91 |
| Lighthouse accessibility | 100 | 100 |
| LCP | 0.61 s | 3.35 s |
| CLS | 0.00051 | 0 |
| Total blocking time | 0 ms | 78.5 ms |

The original mobile LCP target of less than 1.8 seconds remains unmet. Initial sampled script transfer is 177,407 bytes gzip, above the strict 160 kB budget. The audit records scripts loaded before scrolling, including deferred near-viewport work; this is not a full-session JavaScript total. Lighthouse scores vary with local machine conditions.

A separate 4x CPU slowdown scroll sample averaged 58 FPS across 489 frames. Fifteen frames exceeded 20 ms, three exceeded 50 ms, and the longest observed task was 61 ms. This meets the original average 50 FPS floor in this local sample but does not guarantee smoothness on every device. Total blocking time is not INP; field INP has not been measured.

## Remaining configuration

The contact address supplied by the owner is devsdevtech@gmail.com. Phone remains blank. Project delivery, optional calendar, analytics and the public SITE_URL have not been supplied. Without a delivery endpoint, the form prepares an email draft for the visitor to review and send, with explicit notice that nothing has been sent automatically. Without SITE_URL, Next.js warns that social metadata uses localhost; configure the actual origin for deployment.

No client outcome metrics, personal identities, reviews or contact details were invented. Portfolio descriptions are grounded in supplied artwork; generated industry sculptures are illustrative. General legal text is included; it has not been independently reviewed against the business's eventual operating arrangements.

No new domain or hosted Site was created. This is the existing local Next.js project.

## Evidence

- test-results/browser-report.json
- test-results/refinement/report.json
- test-results/refinement/full-{375,768,1024,1440,1920}.png
- test-results/refinement/clarity.png and process-{0,1,2,3}.png
- test-results/refinement/industries.png
- test-results/service-check.json
- test-results/audit-summary.json and accessibility.json
- test-results/lighthouse-desktop.json and lighthouse-mobile.json
- test-results/scroll-audit.json

The older experience-check script and its screenshots refer to superseded process scenes and should not be treated as the current acceptance suite. Current asset provenance, saved paths and complete built-in generation prompts are in public/artwork/README.md.

## Latest hero, process and footer revision

The production build and TypeScript pass. The main 21 browser checks pass. The updated refinement suite replaces the obsolete process-image assertions with four chapter selections, concrete deliverables and keyboard control, verifies the mailto link and checks that hero motion includes holds and turns while retaining unit scale. Responsive captures cover the new process and footer at 375 and 1440 px in addition to the five full-page widths. Performance and scroll measurements above precede this refinement and were not remeasured.

Final result: all 29 updated refinement checks passed, with no runtime errors or detected accessibility violations. Reduced-motion disabling and offscreen animation pausing were also checked directly and passed.

## Orbit and homepage cleanup ? latest revision

Production build, content validation and strict TypeScript passed. All 21 baseline browser checks and six new orbit checks passed. The two revised regions have no detected automated WCAG violations. The new checks cover removal of studio notes, eleven-node unfolding/retraction/replay, hover and keyboard operation after unfolding, four orbiting icons retaining upright faces, offscreen pausing, reduced-motion behavior and five responsive widths. Desktop/mobile tool captures and the motion-state samples are in test-results/orbits/. Earlier refinement/performance figures above belong to the preceding revision and were not rerun for this focused change.

## Compact footer, contact repair and organized detail pages ? current result

Normal production build, content validation and strict TypeScript passed. All 21 baseline browser checks and 19 detail-page checks passed. The eleven service pages and four starting-point pages contain specific content, functional delivery tabs, working scope selection and answered FAQ disclosures. The selected scope reaches the contact form and the resulting Gmail draft contains the correct recipient and entered brief. No browser runtime errors or automated accessibility violations were found on the tested contact, service and starting-point pages.

The desktop footer is approximately 370 px tall. Contact and both detail-page layouts were checked at 375, 768, 1024, 1440 and 1920 px with no horizontal overflow. All 42 generated content routes returned usable main content; internal framework error outputs and metadata were excluded. The form uses an explicit email draft handoff while PROJECT_WEBHOOK_URL is absent, not automatic email delivery. Sending a test message to the real mailbox was not performed.

Evidence: test-results/detail-pages/report.json, footer-desktop.png, contact-desktop.png, service-desktop.png, starting-point-desktop.png and mobile captures. The older full refinement suite includes superseded footer selectors; current footer/contact acceptance is covered by detail-pages-check.mjs and browser-check.mjs. Earlier performance measurements have not been rerun for this content and form revision.

## Distinct hero, transparent logos and interactive compact footer ? latest

Normal production build and strict TypeScript passed. All 21 baseline browser checks and five focused brand-polish checks passed with no runtime errors or automated WCAG violations in the hero, logo strip and footer. The checks verify all six logos have real alpha transparency, the email-copy control copies devsdevtech@gmail.com and reports success, the footer remains compact, and the hero retains fixed-size geometric poses with reduced-motion and offscreen pausing. Five widths from 375 to 1920 px showed no horizontal overflow or artwork overlapping the hero copy.

Screenshots and the detailed report are in test-results/brand-polish/. Built-in logo cleanup outputs and exact prompts are documented in public/brands/README.md. Earlier hero-specific selectors in refinement-check.mjs refer to the superseded tower design; brand-polish-check.mjs is the current hero acceptance test. Performance was not remeasured for this focused visual revision.

## Balanced hero blocks and softer contact background ? latest

Retained the curved hero connector, added an upright block and a turning square/diamond tile alongside the existing ribbon/orbit composition, and added a subtle traveling signal on the curve. All shape motion preserves scale and respects offscreen/reduced-motion settings. The contact section now uses an off-white background with dark text and a white form panel. The compact footer adds a bordered invitation panel and clearer directory grouping.

Production build and strict TypeScript passed. The five focused brand-polish checks passed with no runtime errors or detected WCAG violations, now including the contact region. Responsive checks covered 375, 768, 1024, 1440 and 1920 px, with no overflow or hero artwork overlapping the copy. Updated hero, contact and footer captures are in test-results/brand-polish/. No new performance measurements were taken.

## Vertical edge stacks ? latest correction

The hero now has larger building-like vertical stacks at both edges. Seven left-side pieces form a stepped skyline with a solid crown and outlined turning tile; the right edge pairs a taller stack with the existing open orbit. The approved curved connector is retained. Shape motion uses translation and rotation, with no scale pulsation. Production build and TypeScript passed. Five focused browser checks passed with no runtime errors or automated accessibility violations; all five responsive widths show no overflow or artwork intersecting headline, description or buttons. Updated desktop/mobile hero captures are in test-results/brand-polish/.

## Marked-reference hero and scroll-selected process ? latest

Normal production build and TypeScript passed. The five process-scroll checks and five brand-polish checks passed with no runtime errors or detected WCAG violations. Hero stacks register to the outer frame with zero measured difference on each side, share a common baseline and meet the inner guide within its 1px border. The upper-left arc and both full-height guide pairs match the marked reference composition.

Process tests traverse all four stages down and back up on desktop and mobile, verify click and keyboard synchronization, check content fit at 1440x800 and 375x812, confirm the mobile booking bar stays hidden during the sequence, and verify reduced-motion manual operation. Screenshots and measurements are in test-results/process-scroll/ and test-results/brand-polish/. No complete content routes were removed because the prior 42-route audit found substantive content throughout. Performance was not remeasured.

## Smooth process transitions and curve-aligned hero ? latest

Added spring-smoothed scroll progress, a small selection dead band near stage boundaries, smooth direct-tab navigation, a sliding selection underline and shared-height crossfading chapter scenes. All four scenes reserve the maximum content height, preventing the pinned layout from moving when the active text changes. Reduced motion remains immediate and manually usable.

Raised hero artwork to the actual curved connector endpoint baseline (30px above the desktop edge and 17.5px on mobile). Main stacks and the crown remain fixed; secondary shapes translate horizontally without changing orientation or scale. The curve-baseline measurement is zero pixels apart.

The production build and TypeScript passed. Seven process-scroll checks plus five brand-polish checks passed with no runtime errors or detected WCAG violations. Tests verify stable chapter height/tab position across all stages, forward/reverse selection, click/keyboard behavior, shorter-screen fit, true curve alignment and no tilting at four sampled points of every active shape animation. Evidence remains in test-results/process-scroll/ and test-results/brand-polish/. Performance was not remeasured.

## More visible hero motion ? latest

Expanded secondary-shape horizontal travel from 0.12 to approximately 0.26 edge units, changed the motion cycle from 18 to 12 seconds, and used three coordinated positions with shorter holds. Small-step and tile start positions are spaced to keep their travel lanes clear. Main stacks and crown remain anchored; a low-opacity traveling highlight adds motion on the upper stack surfaces. Baseline, rotation and scale remain fixed.

Normal production build passed. The focused brand-polish checks pass, including a measured slide distance of at least 20px on desktop, reduced motion, offscreen pausing, accessibility and five responsive widths. The process-scroll suite also verifies curve alignment and that the animated shapes do not tilt or scale.

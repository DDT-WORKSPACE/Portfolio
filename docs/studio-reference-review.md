# Studio redesign reference review — 11 November 2026

The six supplied references were opened in a local Chromium browser and reviewed at their named sections. Captures, extracted page structure and media metadata are under test-results/new-references. These are implementation references, not shipped site assets.

| Reference | Observed design/motion | DevsDen Tech implementation |
| --- | --- | --- |
| https://optivio.framer.website/ | Rounded dark opening frame; centered statement; particle-hand video with a central connection; compact logo cells; spacious proof section. The hero video was observed playing and has a 9.55-second duration. | Original two-hand artwork converted into animated glyph textures, central blue light, reduced-motion illustration, concise agency positioning and a portfolio logo row. Catalog counts and actual project work replace unverified growth statistics. |
| https://sentira.framer.website/ | About section with a wide visual panel beside a concise explanation and a short supporting list. | A two-panel studio introduction with original connected-brand artwork and three working principles. |
| https://devgent.framer.website/ | Large numbered, side-by-side process cards; a featured testimonial presentation with navigation. | Numbered project panels with supplied portfolio artwork. Switchable project perspectives use supplied statements rather than invented customer reviews. |
| https://landa.framer.ai/ | Centered Get started message under a soft curved halo and a single clear action. | A restrained blue halo, three useful enquiry intents and a project CTA that carries the selected intent to Contact. |
| https://qarin.framer.website/ | Dark rounded six-feature panel; a spacious integration network with tool nodes and connections. | Six concise delivery principles and an interactive Build / Automate / Operate network. |
| https://aset.framer.website/ | A fixed introduction next to two moving columns of compact feedback cards. | Two moving project-perspective columns with hover/focus pause, a manual pause control and a featured statement selector. |

Visual direction: charcoal and warm off-white, one cobalt accent, restrained border treatments, Instrument Sans headlines, original company mark. The old tower/diamond hero and dense service hub are no longer mounted on the homepage. Existing service, project, industry and starting-point routes remain available.

Content boundaries: portfolio artwork and catalog counts are supplied/derived evidence. No client avatars, star ratings, business-performance metrics, investor names or customer endorsements were fabricated. The perspective section identifies its product-statement source. Owner-supplied client reviews can replace these statements later without inventing identities.

## Landa refinement ? 11 November 2026

The owner requested replacing the hands hero with Landa?s halftone flowing-light aesthetic, a continuously leftward logo strip, the dark two-column FAQ and the curved-halo Get started/browser composition. Landa was reviewed again live at two time samples. Its background is a playing video; our implementation recreates the flowing halftone light in canvas, rather than reusing the source video. The motion is an adaptation, not an exact frame-for-frame reproduction. Reference observations and captures: test-results/landa.

The original hands artwork remains archived and is no longer loaded by the homepage. The new light renderer is components/hero-glaze.tsx; it pauses outside the viewport/in hidden tabs and remains static for reduced motion. Four equal logo groups form a seamless 25% translation cycle. Duplicate groups are hidden from assistive technology and keyboard navigation. Hover/focus pauses the strip; reduced motion shows a manually scrollable original group.

FAQ keeps the six agency-specific answers. The browser frame contains working project-intent controls and contact links instead of an empty decorative page. Existing correct contact details and the honest email-draft handoff remain.

## Current blue/orange agency refinement ? 11 November 2026

Qarin was reopened and reviewed in Chromium for section spacing, feature-card hierarchy and scroll treatment. The current implementation keeps the owner's latest blue/orange identity and About section. It removes Product engine, Integrations & Stack and Client results. Services use concise tabs plus interactive product illustrations; the expanding blue panel provides eight real service destinations. Five supplied projects use native sticky overlap, with no invented case-study performance metrics added.

The broken project scroll was caused by overflow on both the homepage root and main container creating scrolling ancestors. Both now use clip without creating a scroll container. Hero halftone alpha/coverage increased, and a white portfolio mark is rendered in monochrome so it no longer appears as a blank marquee slot. Contact uses the form's actual case-sensitive type values and a carried brief. No reference-site assets or code were copied.

## Recording and written feedback ? 11 November 2026

The supplied Recording 2026-11-11 140220.mp4 was inspected across eight time samples spanning its 14.77-second duration. It shows the existing logo hub with eleven connected service glyphs and short hover details. The new ServiceNetwork reuses the project's own atlas and connection geometry, while keeping the current blue panel's scroll expansion. It supports pointer, keyboard and touch access. Video frames remain QA evidence and are not shipped.

The written feedback overrides its earlier instruction to skip the logo strip: the final requested centered, narrow strip with side breathing room is implemented. Hero geometry has a matching curved lower edge. About gains reversible scroll-linked card spreading. Disciplines use actual supplied product crops, a native design canvas and a clearly illustrative workflow robot. Clear Process and its navigation links are removed; the validated contact form is embedded in the homepage. No email was sent during verification.

## Split contact, Approach and integration recording ? 11 November 2026

The owner's 26.33-second Screen Recording 2026-11-11 140041.mp4 was inspected across eight time samples. It shows a light integration diagram, a central connection point, tool marks and subtle movement. The implementation adapts that structure using ten local Simple Icons SVGs and original CSS/SVG paths. Each tool links to its own substantive page. API access and account/plan boundaries are stated per tool; no tool partnership is claimed. Logo sources are recorded in public/integrations/README.md.

The About screenshot guides a four-card light bento arrangement and a blue count strip. The count strip uses the actual ten-project and eleven-service catalogs plus four disciplines and one team. The Approach screenshot guides a wide active panel and three narrow numbered panels. It expands on click with corresponding content; the responsive version opens vertically.

Discipline previews remove the surrounding chrome and decorative board. Existing source imagery remains limited to the supplied project crops; the website crop is capped at its 552px source width to avoid needless enlargement. Smooth transitions retain reduced-motion behavior. The hub preview now follows the mouse while over a node, clamps to the viewport and freezes in place when the pointer crosses to its content. The desktop contact form uses its normal explanatory copy to the left. Footer and hub surfaces use matching pale blue.

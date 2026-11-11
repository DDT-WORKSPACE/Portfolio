# Connection hands artwork

Created with the built-in image generation tool for the DevsDen Tech studio redesign. This is original illustrative artwork, not a photograph of the team or a client product. No reference-site media is shipped in the application.

- Original output: `public/artwork/connection-hands.png`
- Optimized website asset: `public/artwork/connection-hands.webp` (1440px wide, alpha preserved)
- Runtime particle rendering: `components/connection-hands.tsx`

The renderer samples this artwork into two cached glyph textures. It animates their connection and central light, with restrained pointer/scroll parallax. It pauses offscreen and in hidden tabs. Reduced motion displays the static artwork.

Exact generation prompt:

> Use case: stylized-concept. Asset type: original hero illustration for DevsDen Tech, a software and business automation studio. Create a wide, cinematic composition of TWO anatomically correct sculptural human hands reaching toward each other, inspired only by the universal gesture of connection. The left hand enters from the far left edge with forearm, palm slightly down, index finger extended toward the exact horizontal center. The right hand enters from the far right edge with forearm, palm tilted inward, index finger extended toward the exact horizontal center. Fingertips nearly meet at (50% width, 50% height), separated by a small clean gap. Other fingers naturally curved, elegant and plausible anatomy. Both hands should occupy the middle 65 percent of canvas height; show wrists and forearms continuing to the lateral canvas edges. Refined monochrome silver-white plaster or satin ceramic sculpture, subtle anatomical detail, directional studio illumination, clean high-contrast forms readable as a particle silhouette. Entire background genuinely TRANSPARENT. No glow between fingers, no ground plane, no scenery, no text, no logos, no jewelry, no particles, no digital pattern. Both hands in the same frame, a single consistent camera and lighting. Sophisticated editorial technology art, generous clear space above and below. Landscape aspect ratio approximately 2:1.

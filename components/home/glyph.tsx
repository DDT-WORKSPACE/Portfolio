// 3D brand icons from public/service-atlas.webp (4 x 3 grid).
export const glyphs = {
  web: 0,
  phone: 1,
  design: 2,
  network: 3,
  cloud: 4,
  link: 5,
  shield: 6,
  growth: 7,
  rocket: 8,
  bag: 9,
  chart: 10,
  spark: 11,
} as const;
export type GlyphName = keyof typeof glyphs;

export function Glyph({
  name,
  className = "",
}: {
  name: GlyphName;
  className?: string;
}) {
  const cell = glyphs[name];
  return (
    <span className={`dd-glyph ${className}`} aria-hidden="true">
      <img
        className="dd-th-brand"
        src="/service-atlas.webp"
        width={1448}
        height={1086}
        alt=""
        loading="lazy"
        decoding="async"
        style={{
          left: `${-(cell % 4) * 100}%`,
          top: `${-Math.floor(cell / 4) * 100}%`,
        }}
      />
      <img
        className="dd-th-emerald"
        src="/service-atlas-emerald.webp"
        width={1448}
        height={1086}
        alt=""
        loading="lazy"
        decoding="async"
        style={{
          left: `${-(cell % 4) * 100}%`,
          top: `${-Math.floor(cell / 4) * 100}%`,
        }}
      />
    </span>
  );
}

const atlas: Record<string, number> = {
  code: 0,
  phone: 1,
  design: 2,
  spark: 3,
  cloud: 4,
  connect: 5,
  shield: 6,
  support: 7,
  rocket: 8,
  bag: 9,
  chart: 10,
};
export function ServiceGlyph({ name }: { name: string }) {
  const cell = atlas[name] ?? 0;
  return (
    <span className="service-glyph" aria-hidden="true">
      <img
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
    </span>
  );
}

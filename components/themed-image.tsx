import Image, { type ImageProps } from "next/image";

/** Emerald & gold copy of a branded raster asset, or null when the asset has none. */
export function emeraldVariant(src: string): string | null {
  if (src.startsWith("/Projects/brand/")) return src.replace("/Projects/brand/", "/Projects/emerald/");
  // Industry illustrations: /artwork/<name>.webp -> /artwork/<name>-emerald.webp
  if (/^\/artwork\/(industry-phone|healthcare-v2|commerce-v2|logistics-v2|education-v2|saas-v2)\.webp$/.test(src))
    return src.replace(/\.webp$/, "-emerald.webp");
  return null;
}

/*
 * Image that follows the colour theme. Renders the brand copy and the emerald copy; CSS hides
 * the inactive one (display:none, so a lazy image is never fetched). Works in server and client
 * components and never flashes on load.
 */
export function ThemedImage({ src, className, preload, ...props }: ImageProps & { src: string }) {
  const emerald = emeraldVariant(src);
  if (!emerald) return <Image src={src} className={className} preload={preload} {...props} />;
  const cls = (c: string) => [className, c].filter(Boolean).join(" ");
  return (
    <>
      <Image src={src} className={cls("dd-th-brand")} preload={preload} {...props} />
      <Image src={emerald} className={cls("dd-th-emerald")} {...props} />
    </>
  );
}

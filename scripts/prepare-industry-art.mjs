import sharp from "sharp";

// Originals are stored in this project; no external account paths are needed.
for (const name of ["healthcare", "commerce", "logistics", "education", "saas"]) {
  await sharp(`public/artwork/${name}-v2.png`)
    .resize(800, 800, { fit: "inside" })
    .webp({ quality: 88 })
    .toFile(`public/artwork/${name}-v2.webp`);
}
console.log("Optimized five transparent industry illustrations.");

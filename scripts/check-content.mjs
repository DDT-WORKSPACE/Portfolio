import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
async function scan(dir) {
  let failures = [];
  for (const file of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, file.name);
    if (file.isDirectory()) failures.push(...(await scan(p)));
    else {
      const s = await readFile(p, "utf8");
      if (/\{\{[^}]+\}\}/.test(s)) failures.push(p);
    }
  }
  return failures;
}
const failures = await scan("content");
if (failures.length) {
  console.error(
    "Launch blocked: replace owner placeholders in:\n" + failures.join("\n"),
  );
  process.exit(1);
}

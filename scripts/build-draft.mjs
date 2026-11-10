import { spawnSync } from "node:child_process";
console.log(
  "DRAFT PREVIEW ONLY: unresolved owner content remains visible. This does not clear the production launch gate.",
);
const result = spawnSync(
  process.execPath,
  ["node_modules/next/dist/bin/next", "build"],
  { stdio: "inherit", env: { ...process.env, DRAFT_PREVIEW: "1" } },
);
process.exit(result.status ?? 1);

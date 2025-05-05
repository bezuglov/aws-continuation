import { writeFileSync } from "node:fs";

writeFileSync(process.argv[3], JSON.stringify({ type: process.argv[2] }, null, 4));

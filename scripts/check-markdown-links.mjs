import fs from "node:fs";
import path from "node:path";

const ignoredDirs = new Set([".git", "node_modules", "private", "career-materials", "portable", "marketing", "screenshots"]);
const markdownFiles = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (!ignoredDirs.has(entry.name)) {
        walk(path.join(dir, entry.name));
      }
      continue;
    }

    if (entry.isFile() && entry.name.endsWith(".md")) {
      markdownFiles.push(path.join(dir, entry.name));
    }
  }
}

walk(".");

const failures = [];
const linkPattern = /\[[^\]]+\]\(([^)]+)\)/g;

for (const file of markdownFiles) {
  const content = fs.readFileSync(file, "utf8");
  let match;

  while ((match = linkPattern.exec(content))) {
    const rawTarget = match[1].trim();
    if (!rawTarget || /^(https?:|mailto:|#)/.test(rawTarget)) {
      continue;
    }

    const targetWithoutAnchor = rawTarget.split("#")[0];
    if (!targetWithoutAnchor) {
      continue;
    }

    const resolved = path.resolve(path.dirname(file), targetWithoutAnchor);
    if (!fs.existsSync(resolved)) {
      failures.push(`${file}: ${rawTarget}`);
    }
  }
}

if (failures.length > 0) {
  console.error("Broken local markdown links:");
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(`markdown links ok: ${markdownFiles.length} files checked`);

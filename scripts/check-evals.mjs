import fs from "node:fs";

const filePath = "evals/cases.json";
const raw = fs.readFileSync(filePath, "utf8");
const cases = JSON.parse(raw);

if (!Array.isArray(cases)) {
  throw new Error(`${filePath} must contain an array`);
}

const ids = new Set();
const requiredCaseFields = ["id", "title", "input", "expected"];
const requiredExpectedFields = ["route", "max_questions", "must_include", "must_not"];

for (const item of cases) {
  for (const field of requiredCaseFields) {
    if (!item[field]) {
      throw new Error(`case is missing required field: ${field}`);
    }
  }

  if (ids.has(item.id)) {
    throw new Error(`duplicate case id: ${item.id}`);
  }
  ids.add(item.id);

  for (const field of requiredExpectedFields) {
    if (!(field in item.expected)) {
      throw new Error(`${item.id} expected is missing field: ${field}`);
    }
  }

  if (!Array.isArray(item.expected.route) || item.expected.route.length === 0) {
    throw new Error(`${item.id} expected.route must be a non-empty array`);
  }

  if (!Number.isInteger(item.expected.max_questions) || item.expected.max_questions < 0 || item.expected.max_questions > 3) {
    throw new Error(`${item.id} expected.max_questions must be an integer from 0 to 3`);
  }

  for (const listField of ["must_include", "must_not"]) {
    if (!Array.isArray(item.expected[listField])) {
      throw new Error(`${item.id} expected.${listField} must be an array`);
    }
  }
}

console.log(`eval contracts ok: ${cases.length} cases`);

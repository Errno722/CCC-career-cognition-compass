import fs from "node:fs";

const filePath = "evals/cases.json";
const raw = fs.readFileSync(filePath, "utf8");
const cases = JSON.parse(raw);

if (!Array.isArray(cases)) {
  throw new Error(`${filePath} must contain an array`);
}

const ids = new Set();
const requiredCaseFields = ["id", "title", "input", "expected"];
const requiredExpectedFields = [
  "route",
  "literal_contains",
  "literal_not_contains",
  "structural_assertions",
  "semantic_assertions",
  "semantic_must_not"
];

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

  for (const listField of ["literal_contains", "literal_not_contains", "semantic_assertions", "semantic_must_not"]) {
    if (!Array.isArray(item.expected[listField])) {
      throw new Error(`${item.id} expected.${listField} must be an array`);
    }
  }

  const structural = item.expected.structural_assertions;
  if (!structural || typeof structural !== "object" || Array.isArray(structural)) {
    throw new Error(`${item.id} expected.structural_assertions must be an object`);
  }

  if (!Number.isInteger(structural.max_questions) || structural.max_questions < 0 || structural.max_questions > 3) {
    throw new Error(`${item.id} expected.structural_assertions.max_questions must be an integer from 0 to 3`);
  }

  if ("max_characters" in structural && (!Number.isInteger(structural.max_characters) || structural.max_characters <= 0)) {
    throw new Error(`${item.id} expected.structural_assertions.max_characters must be a positive integer when present`);
  }

  if ("manual_case_id" in item && (!Number.isInteger(item.manual_case_id) || item.manual_case_id <= 0)) {
    throw new Error(`${item.id} manual_case_id must be a positive integer when present`);
  }
}

const manualCases = cases.filter((item) => Number.isInteger(item.manual_case_id)).length;

console.log(`eval contracts ok: ${cases.length} cases`);
console.log(`manual case mappings: ${manualCases}/${cases.length}`);
console.log("automated model behavior cases: 0");

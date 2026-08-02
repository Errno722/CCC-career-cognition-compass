import fs from "node:fs";

const casesPath = "evals/cases.json";
const schemaPath = "evals/schema.json";
const rubricsPath = "evals/rubrics.json";
const allowedRoutingModes = new Set(["primary_required"]);
const allowedSeverities = new Set(["critical", "high", "medium", "low"]);
const allowedRubricTypes = new Set(["must", "must_not", "mixed"]);

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function requireNonEmptyString(value, label) {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`${label} must be a non-empty string`);
  }
}

function requireStringList(value, label) {
  if (!Array.isArray(value)) {
    throw new Error(`${label} must be an array`);
  }

  for (const [index, item] of value.entries()) {
    requireNonEmptyString(item, `${label}[${index}]`);
  }
}

function requireLiteralAnyOf(value, label) {
  if (!Array.isArray(value)) {
    throw new Error(`${label} must be an array`);
  }

  for (const [index, group] of value.entries()) {
    requireStringList(group, `${label}[${index}]`);
    if (group.length === 0) {
      throw new Error(`${label}[${index}] must contain at least one literal option`);
    }
  }
}

function getSkillIds() {
  return new Set(
    fs
      .readdirSync("skills", { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
  );
}

function resolveSchemaRef(rootSchema, ref) {
  if (!ref.startsWith("#/")) {
    throw new Error(`unsupported schema ref: ${ref}`);
  }

  return ref
    .slice(2)
    .split("/")
    .reduce((node, segment) => {
      const key = segment.replace(/~1/g, "/").replace(/~0/g, "~");
      if (!node || !(key in node)) {
        throw new Error(`schema ref cannot be resolved: ${ref}`);
      }
      return node[key];
    }, rootSchema);
}

function validateWithSchema(value, schemaNode, label, rootSchema, failures) {
  if (schemaNode.$ref) {
    validateWithSchema(value, resolveSchemaRef(rootSchema, schemaNode.$ref), label, rootSchema, failures);
    return;
  }

  if (schemaNode.const !== undefined && value !== schemaNode.const) {
    failures.push(`${label} must equal ${JSON.stringify(schemaNode.const)}`);
    return;
  }

  if (schemaNode.enum && !schemaNode.enum.includes(value)) {
    failures.push(`${label} must be one of: ${schemaNode.enum.join(", ")}`);
    return;
  }

  if (schemaNode.type) {
    const type = schemaNode.type;
    const ok =
      (type === "object" && value && typeof value === "object" && !Array.isArray(value)) ||
      (type === "array" && Array.isArray(value)) ||
      (type === "string" && typeof value === "string") ||
      (type === "integer" && Number.isInteger(value));

    if (!ok) {
      failures.push(`${label} must be ${type}`);
      return;
    }
  }

  if (typeof value === "string") {
    if (schemaNode.minLength !== undefined && value.length < schemaNode.minLength) {
      failures.push(`${label} must have length >= ${schemaNode.minLength}`);
    }

    if (schemaNode.pattern && !new RegExp(schemaNode.pattern).test(value)) {
      failures.push(`${label} must match pattern ${schemaNode.pattern}`);
    }
  }

  if (Number.isInteger(value)) {
    if (schemaNode.minimum !== undefined && value < schemaNode.minimum) {
      failures.push(`${label} must be >= ${schemaNode.minimum}`);
    }

    if (schemaNode.maximum !== undefined && value > schemaNode.maximum) {
      failures.push(`${label} must be <= ${schemaNode.maximum}`);
    }
  }

  if (Array.isArray(value) && schemaNode.items) {
    for (const [index, item] of value.entries()) {
      validateWithSchema(item, schemaNode.items, `${label}[${index}]`, rootSchema, failures);
    }
  }

  if (value && typeof value === "object" && !Array.isArray(value)) {
    const properties = schemaNode.properties ?? {};
    for (const requiredField of schemaNode.required ?? []) {
      if (!(requiredField in value)) {
        failures.push(`${label}.${requiredField} is required`);
      }
    }

    for (const [field, fieldValue] of Object.entries(value)) {
      if (field in properties) {
        validateWithSchema(fieldValue, properties[field], `${label}.${field}`, rootSchema, failures);
        continue;
      }

      if (schemaNode.additionalProperties === false) {
        failures.push(`${label}.${field} is not allowed by schema`);
        continue;
      }

      if (schemaNode.additionalProperties && typeof schemaNode.additionalProperties === "object") {
        validateWithSchema(fieldValue, schemaNode.additionalProperties, `${label}.${field}`, rootSchema, failures);
      }
    }
  }
}

function requireNoDuplicateStrings(value, label) {
  const seen = new Set();
  for (const item of value) {
    if (seen.has(item)) {
      throw new Error(`${label} contains duplicate value: ${item}`);
    }
    seen.add(item);
  }
}

function countAutomatedModelBehaviorResults() {
  const resultsDir = "evals/results";
  if (!fs.existsSync(resultsDir)) {
    return 0;
  }

  let count = 0;
  const stack = [resultsDir];
  while (stack.length > 0) {
    const dir = stack.pop();
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.isDirectory()) {
        stack.push(`${dir}/${entry.name}`);
      } else if (entry.isFile() && entry.name.endsWith(".json")) {
        count += 1;
      }
    }
  }
  return count;
}

const suite = readJson(casesPath);
const schema = readJson(schemaPath);
const rubrics = readJson(rubricsPath);

if (schema.properties?.schema_version?.pattern !== "^0\\.2\\.0$") {
  throw new Error(`${schemaPath} must describe schema_version 0.2.0`);
}

const schemaFailures = [];
validateWithSchema(suite, schema, "suite", schema, schemaFailures);
if (schemaFailures.length > 0) {
  console.error(`${casesPath} failed schema validation:`);
  console.error(schemaFailures.map((failure) => `- ${failure}`).join("\n"));
  process.exit(1);
}

if (suite.cases.length !== suite.manual_case_count) {
  throw new Error(`cases length ${suite.cases.length} does not match manual_case_count ${suite.manual_case_count}`);
}

const automatedResultsCount = countAutomatedModelBehaviorResults();
if (suite.automated_model_behavior_tests !== automatedResultsCount) {
  throw new Error(
    `suite.automated_model_behavior_tests (${suite.automated_model_behavior_tests}) must equal evals/results report count (${automatedResultsCount})`
  );
}

if (!rubrics || typeof rubrics !== "object" || Array.isArray(rubrics)) {
  throw new Error(`${rubricsPath} must contain a rubric suite object`);
}

if (rubrics.suite_schema_version !== suite.schema_version) {
  throw new Error(`${rubricsPath} suite_schema_version must match ${casesPath}`);
}

if (rubrics.evaluation_target !== suite.evaluation_target) {
  throw new Error(`${rubricsPath} evaluation_target must match ${casesPath}`);
}

if (!rubrics.rubrics || typeof rubrics.rubrics !== "object" || Array.isArray(rubrics.rubrics)) {
  throw new Error(`${rubricsPath} rubrics must be an object`);
}

requireStringList(rubrics.core_refined_rubrics, "rubrics.core_refined_rubrics");
requireNoDuplicateStrings(rubrics.core_refined_rubrics, "rubrics.core_refined_rubrics");

const skillIds = getSkillIds();
const ids = new Set();
const manualCaseIds = new Set();
const semanticIds = new Set();
const requiredCaseFields = ["id", "title", "manual_case_id", "input", "expected"];
const requiredExpectedFields = [
  "routing",
  "literal_all_of",
  "literal_any_of",
  "literal_not_contains",
  "regex_not_contains",
  "structural_assertions",
  "semantic_assertions",
  "semantic_must_not"
];

for (const item of suite.cases) {
  for (const field of requiredCaseFields) {
    if (!(field in item)) {
      throw new Error(`case is missing required field: ${field}`);
    }
  }

  requireNonEmptyString(item.id, "case.id");
  requireNonEmptyString(item.title, `${item.id}.title`);
  requireNonEmptyString(item.input, `${item.id}.input`);

  if (ids.has(item.id)) {
    throw new Error(`duplicate case id: ${item.id}`);
  }
  ids.add(item.id);

  if (!Number.isInteger(item.manual_case_id) || item.manual_case_id <= 0) {
    throw new Error(`${item.id} manual_case_id must be a positive integer`);
  }

  if (manualCaseIds.has(item.manual_case_id)) {
    throw new Error(`duplicate manual_case_id: ${item.manual_case_id}`);
  }
  manualCaseIds.add(item.manual_case_id);

  if (!item.expected || typeof item.expected !== "object" || Array.isArray(item.expected)) {
    throw new Error(`${item.id} expected must be an object`);
  }

  for (const field of requiredExpectedFields) {
    if (!(field in item.expected)) {
      throw new Error(`${item.id} expected is missing field: ${field}`);
    }
  }

  const routing = item.expected.routing;
  if (!routing || typeof routing !== "object" || Array.isArray(routing)) {
    throw new Error(`${item.id} expected.routing must be an object`);
  }

  if (!allowedRoutingModes.has(routing.mode)) {
    throw new Error(`${item.id} expected.routing.mode must be one of: ${[...allowedRoutingModes].join(", ")}`);
  }

  requireNonEmptyString(routing.primary, `${item.id}.expected.routing.primary`);
  if (!skillIds.has(routing.primary)) {
    throw new Error(`${item.id} expected.routing.primary is not a real skill: ${routing.primary}`);
  }

  requireStringList(routing.allowed_secondary, `${item.id}.expected.routing.allowed_secondary`);
  requireNoDuplicateStrings(routing.allowed_secondary, `${item.id}.expected.routing.allowed_secondary`);
  for (const secondarySkill of routing.allowed_secondary) {
    if (secondarySkill === routing.primary) {
      throw new Error(`${item.id} expected.routing.allowed_secondary must not include primary skill: ${secondarySkill}`);
    }

    if (!skillIds.has(secondarySkill)) {
      throw new Error(`${item.id} expected.routing.allowed_secondary contains unknown skill: ${secondarySkill}`);
    }
  }

  requireStringList(item.expected.literal_all_of, `${item.id}.expected.literal_all_of`);
  requireNoDuplicateStrings(item.expected.literal_all_of, `${item.id}.expected.literal_all_of`);
  requireLiteralAnyOf(item.expected.literal_any_of, `${item.id}.expected.literal_any_of`);
  item.expected.literal_any_of.forEach((group, index) => {
    requireNoDuplicateStrings(group, `${item.id}.expected.literal_any_of[${index}]`);
  });
  requireStringList(item.expected.literal_not_contains, `${item.id}.expected.literal_not_contains`);
  requireNoDuplicateStrings(item.expected.literal_not_contains, `${item.id}.expected.literal_not_contains`);
  requireStringList(item.expected.regex_not_contains, `${item.id}.expected.regex_not_contains`);
  requireNoDuplicateStrings(item.expected.regex_not_contains, `${item.id}.expected.regex_not_contains`);
  requireStringList(item.expected.semantic_assertions, `${item.id}.expected.semantic_assertions`);
  requireNoDuplicateStrings(item.expected.semantic_assertions, `${item.id}.expected.semantic_assertions`);
  requireStringList(item.expected.semantic_must_not, `${item.id}.expected.semantic_must_not`);
  requireNoDuplicateStrings(item.expected.semantic_must_not, `${item.id}.expected.semantic_must_not`);

  const positiveSemanticIds = new Set(item.expected.semantic_assertions);
  for (const semanticId of item.expected.semantic_must_not) {
    if (positiveSemanticIds.has(semanticId)) {
      throw new Error(`${item.id} must not put ${semanticId} in both semantic_assertions and semantic_must_not`);
    }
  }

  for (const pattern of item.expected.regex_not_contains) {
    try {
      new RegExp(pattern);
    } catch (error) {
      throw new Error(`${item.id} expected.regex_not_contains contains invalid regex: ${pattern}`);
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

  for (const semanticId of [...item.expected.semantic_assertions, ...item.expected.semantic_must_not]) {
    semanticIds.add(semanticId);
  }
}

for (let id = 1; id <= suite.manual_case_count; id += 1) {
  if (!manualCaseIds.has(id)) {
    throw new Error(`manual_case_id sequence is missing ${id}`);
  }
}

let coveredRubrics = 0;
for (const semanticId of semanticIds) {
  const rubric = rubrics.rubrics[semanticId];
  if (!rubric) {
    throw new Error(`${semanticId} is referenced in ${casesPath} but missing from ${rubricsPath}`);
  }
  coveredRubrics += 1;

  if (!allowedRubricTypes.has(rubric.type)) {
    throw new Error(`${semanticId} rubric.type must be must, must_not, or mixed`);
  }

  if (!allowedSeverities.has(rubric.severity)) {
    throw new Error(`${semanticId} rubric.severity must be one of: ${[...allowedSeverities].join(", ")}`);
  }

  requireNonEmptyString(rubric.description, `${semanticId}.description`);
  requireStringList(rubric.pass_criteria, `${semanticId}.pass_criteria`);
  requireStringList(rubric.fail_signals, `${semanticId}.fail_signals`);
}

for (const item of suite.cases) {
  for (const semanticId of item.expected.semantic_assertions) {
    const type = rubrics.rubrics[semanticId].type;
    if (!["must", "mixed"].includes(type)) {
      throw new Error(`${item.id} semantic_assertions contains ${semanticId}, but rubric.type is ${type}`);
    }
  }

  for (const semanticId of item.expected.semantic_must_not) {
    const type = rubrics.rubrics[semanticId].type;
    if (!["must_not", "mixed"].includes(type)) {
      throw new Error(`${item.id} semantic_must_not contains ${semanticId}, but rubric.type is ${type}`);
    }
  }
}

const orphanRubrics = Object.keys(rubrics.rubrics).filter((semanticId) => !semanticIds.has(semanticId));
const nonDraftOrphans = orphanRubrics.filter((semanticId) => rubrics.rubrics[semanticId].status !== "draft");
if (nonDraftOrphans.length > 0) {
  throw new Error(`rubrics not referenced by any case and not marked draft: ${nonDraftOrphans.join(", ")}`);
}

for (const semanticId of rubrics.core_refined_rubrics) {
  if (!rubrics.rubrics[semanticId]) {
    throw new Error(`core_refined_rubrics contains unknown rubric: ${semanticId}`);
  }

  if (!semanticIds.has(semanticId)) {
    throw new Error(`core_refined_rubrics contains unreferenced rubric: ${semanticId}`);
  }
}

console.log(`eval suite ok: ${suite.suite_id} schema ${suite.schema_version}`);
console.log(`eval contracts ok: ${suite.cases.length} cases`);
console.log(`manual case mappings: ${manualCaseIds.size}/${suite.manual_case_count}`);
console.log(`semantic rubrics covered: ${coveredRubrics}/${semanticIds.size}`);
console.log(`core refined rubrics: ${rubrics.core_refined_rubrics.length}/${semanticIds.size}`);
console.log(`orphan rubrics: ${orphanRubrics.length}`);
console.log(`automated model behavior cases: ${suite.automated_model_behavior_tests}`);
console.log(`evaluation target: ${suite.evaluation_target}`);
console.log(`routing skills checked: ${skillIds.size} local skills`);

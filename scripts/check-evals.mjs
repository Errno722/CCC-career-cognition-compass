import fs from "node:fs";

const casesPath = "evals/cases.json";
const schemaPath = "evals/schema.json";
const resultSchemaPath = "evals/result-schema.json";
const rubricsPath = "evals/rubrics.json";
const allowedRoutingModes = new Set(["primary_required"]);
const allowedSeverities = new Set(["critical", "high", "medium", "low"]);
const allowedRubricTypes = new Set(["must", "must_not", "mixed"]);
const allowedRubricStatuses = new Set(["draft"]);
const ignoredResultDirs = new Set(["fixtures"]);
const supportedSchemaKeywords = new Set([
  "$schema",
  "$id",
  "$defs",
  "$ref",
  "title",
  "description",
  "type",
  "additionalProperties",
  "required",
  "properties",
  "const",
  "enum",
  "pattern",
  "minLength",
  "minimum",
  "maximum",
  "items"
]);

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

function assertSchemaUsesSupportedKeywords(schemaNode, label) {
  if (!schemaNode || typeof schemaNode !== "object" || Array.isArray(schemaNode)) {
    return;
  }

  for (const key of Object.keys(schemaNode)) {
    if (!supportedSchemaKeywords.has(key)) {
      throw new Error(`${label} uses unsupported JSON Schema keyword: ${key}`);
    }
  }

  for (const [field, childSchema] of Object.entries(schemaNode.properties ?? {})) {
    assertSchemaUsesSupportedKeywords(childSchema, `${label}.properties.${field}`);
  }

  for (const [field, childSchema] of Object.entries(schemaNode.$defs ?? {})) {
    assertSchemaUsesSupportedKeywords(childSchema, `${label}.$defs.${field}`);
  }

  if (schemaNode.items) {
    assertSchemaUsesSupportedKeywords(schemaNode.items, `${label}.items`);
  }

  if (schemaNode.additionalProperties && typeof schemaNode.additionalProperties === "object") {
    assertSchemaUsesSupportedKeywords(schemaNode.additionalProperties, `${label}.additionalProperties`);
  }
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
    const types = Array.isArray(schemaNode.type) ? schemaNode.type : [schemaNode.type];
    const ok = types.some((type) =>
      (type === "object" && value && typeof value === "object" && !Array.isArray(value)) ||
      (type === "array" && Array.isArray(value)) ||
      (type === "string" && typeof value === "string") ||
      (type === "integer" && Number.isInteger(value)) ||
      (type === "boolean" && typeof value === "boolean") ||
      (type === "null" && value === null)
    );

    if (!ok) {
      failures.push(`${label} must be ${types.join(" or ")}`);
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

function collectJsonFiles(rootDir) {
  const files = [];

  if (!fs.existsSync(rootDir)) {
    return files;
  }

  const stack = [rootDir];
  while (stack.length > 0) {
    const dir = stack.pop();
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const entryPath = `${dir}/${entry.name}`;
      if (entry.isDirectory()) {
        if (!(dir === rootDir && ignoredResultDirs.has(entry.name))) {
          stack.push(entryPath);
        }
      } else if (entry.isFile() && entry.name.endsWith(".json")) {
        files.push(entryPath);
      }
    }
  }

  return files.sort();
}

function readEvalResultReports(resultSchema, suite, caseIds) {
  const resultsDir = "evals/results";
  const files = collectJsonFiles(resultsDir);
  let executedCaseCount = 0;
  let deterministicPassed = 0;
  let semanticReviewed = 0;

  for (const filePath of files) {
    const report = readJson(filePath);
    const failures = [];
    validateWithSchema(report, resultSchema, filePath, resultSchema, failures);
    if (failures.length > 0) {
      console.error(`${filePath} failed result schema validation:`);
      console.error(failures.map((failure) => `- ${failure}`).join("\n"));
      process.exit(1);
    }

    if (report.suite_id !== suite.suite_id) {
      throw new Error(`${filePath} suite_id must match ${casesPath}`);
    }

    if (report.suite_schema_version !== suite.schema_version) {
      throw new Error(`${filePath} suite_schema_version must match ${casesPath}`);
    }

    if (report.evaluation_target !== suite.evaluation_target) {
      throw new Error(`${filePath} evaluation_target must match ${casesPath}`);
    }

    const reportCaseIds = new Set();
    for (const resultCase of report.cases) {
      if (!caseIds.has(resultCase.case_id)) {
        throw new Error(`${filePath} contains unknown case_id: ${resultCase.case_id}`);
      }

      if (reportCaseIds.has(resultCase.case_id)) {
        throw new Error(`${filePath} contains duplicate case_id: ${resultCase.case_id}`);
      }
      reportCaseIds.add(resultCase.case_id);

      const expectedPass = Object.values(resultCase.checks).every(
        (status) => status === "pass" || status === "not_applicable"
      );
      if (resultCase.deterministic_pass !== expectedPass) {
        throw new Error(`${filePath} ${resultCase.case_id} deterministic_pass does not match check statuses`);
      }

      const expectedStatus = expectedPass ? "pass" : "fail";
      if (resultCase.deterministic_status !== expectedStatus) {
        throw new Error(`${filePath} ${resultCase.case_id} deterministic_status does not match check statuses`);
      }

      for (const [checkName, status] of Object.entries(resultCase.checks)) {
        if (resultCase.check_details[checkName].status !== status) {
          throw new Error(`${filePath} ${resultCase.case_id} ${checkName} status does not match check_details`);
        }
      }

      executedCaseCount += 1;
      if (resultCase.deterministic_pass) {
        deterministicPassed += 1;
      }

      if (resultCase.semantic_status !== "pending") {
        semanticReviewed += 1;
      }
    }
  }

  return {
    reportCount: files.length,
    executedCaseCount,
    deterministicPassed,
    semanticReviewed
  };
}

const suite = readJson(casesPath);
const schema = readJson(schemaPath);
const resultSchema = readJson(resultSchemaPath);
const rubrics = readJson(rubricsPath);

assertSchemaUsesSupportedKeywords(schema, schemaPath);
assertSchemaUsesSupportedKeywords(resultSchema, resultSchemaPath);

if (schema.properties?.schema_version?.pattern !== "^0\\.3\\.0$") {
  throw new Error(`${schemaPath} must describe schema_version 0.3.0`);
}

if (resultSchema.properties?.suite_schema_version?.pattern !== "^0\\.3\\.0$") {
  throw new Error(`${resultSchemaPath} must describe suite_schema_version 0.3.0`);
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

for (const [semanticId, rubric] of Object.entries(rubrics.rubrics)) {
  requireNonEmptyString(semanticId, "rubric id");

  if (!rubric || typeof rubric !== "object" || Array.isArray(rubric)) {
    throw new Error(`${semanticId} rubric must be an object`);
  }

  if (!allowedRubricTypes.has(rubric.type)) {
    throw new Error(`${semanticId} rubric.type must be must, must_not, or mixed`);
  }

  if (!allowedSeverities.has(rubric.severity)) {
    throw new Error(`${semanticId} rubric.severity must be one of: ${[...allowedSeverities].join(", ")}`);
  }

  if ("status" in rubric && !allowedRubricStatuses.has(rubric.status)) {
    throw new Error(`${semanticId} rubric.status must be one of: ${[...allowedRubricStatuses].join(", ")}`);
  }

  requireNonEmptyString(rubric.description, `${semanticId}.description`);
  requireStringList(rubric.pass_criteria, `${semanticId}.pass_criteria`);
  requireStringList(rubric.fail_signals, `${semanticId}.fail_signals`);
  requireNoDuplicateStrings(rubric.pass_criteria, `${semanticId}.pass_criteria`);
  requireNoDuplicateStrings(rubric.fail_signals, `${semanticId}.fail_signals`);
}

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

  if (rubric.status === "draft") {
    throw new Error(`${semanticId} is referenced in ${casesPath} but still marked draft`);
  }

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

const resultSummary = readEvalResultReports(resultSchema, suite, ids);

console.log(`eval suite ok: ${suite.suite_id} schema ${suite.schema_version}`);
console.log(`eval contracts ok: ${suite.cases.length} cases`);
console.log(`manual case mappings: ${manualCaseIds.size}/${suite.manual_case_count}`);
console.log(`semantic rubrics covered: ${coveredRubrics}/${semanticIds.size}`);
console.log(`core refined rubrics: ${rubrics.core_refined_rubrics.length}/${semanticIds.size}`);
console.log(`orphan rubrics: ${orphanRubrics.length}`);
console.log(`result reports: ${resultSummary.reportCount}`);
console.log(`executed cases: ${resultSummary.executedCaseCount}`);
console.log(`deterministic passed: ${resultSummary.deterministicPassed}`);
console.log(`semantic reviewed: ${resultSummary.semanticReviewed}`);
console.log(`evaluation target: ${suite.evaluation_target}`);
console.log(`routing skills checked: ${skillIds.size} local skills`);

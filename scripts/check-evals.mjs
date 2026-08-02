import fs from "node:fs";
import {
  assertSchemaUsesSupportedKeywords,
  validateWithSchema
} from "./lib/schema-validator.mjs";
import {
  deterministicChecksMatch,
  hashText,
  runCase,
  runnerVersion
} from "./lib/deterministic-eval.mjs";

const casesPath = "evals/cases.json";
const schemaPath = "evals/schema.json";
const resultSchemaPath = "evals/result-schema.json";
const rubricsPath = "evals/rubrics.json";
const allowedRoutingModes = new Set(["primary_required"]);
const allowedSeverities = new Set(["critical", "high", "medium", "low"]);
const allowedRubricTypes = new Set(["must", "must_not", "mixed"]);
const allowedRubricStatuses = new Set(["draft"]);
const ignoredResultDirs = new Set(["fixtures"]);
const localResultAdapters = new Set(["fixture", "local"]);

function resultAdapterFromPath(filePath, resultsDir) {
  const prefix = `${resultsDir}/`;
  if (!filePath.startsWith(prefix)) {
    throw new Error(`${filePath} must be under ${resultsDir}`);
  }

  const relativePath = filePath.slice(prefix.length);
  const parts = relativePath.split("/");
  if (parts.length < 2 || parts[0].length === 0) {
    throw new Error(`${filePath} must be saved under ${resultsDir}/<adapter>/`);
  }

  return parts[0];
}

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

function readEvalResultReports(resultSchema, suite, suiteSha256, caseMap) {
  const resultsDir = "evals/results";
  const files = collectJsonFiles(resultsDir);
  const runIds = new Set();
  const totalCaseExecutions = [];
  const deterministicPassedExecutions = [];
  const semanticReviewedExecutions = [];
  const schemaOnlyExecutions = [];
  const runnerGeneratedExecutions = [];
  const recomputedExecutions = [];
  const declaredUniqueCasesCovered = new Set();
  const runnerExecutedUniqueCasesCovered = new Set();
  const publicUniqueCasesCovered = new Set();
  const uniqueCasesPassed = new Set();
  const publicUniqueCasesPassed = new Set();
  const verifiedUniqueCasesPassed = new Set();
  const publicVerifiedUniqueCasesPassed = new Set();
  const adapterModelGroups = new Set();

  for (const filePath of files) {
    const directoryAdapter = resultAdapterFromPath(filePath, resultsDir);
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

    if (report.suite_sha256 !== suiteSha256) {
      throw new Error(`${filePath} suite_sha256 must match current ${casesPath}`);
    }

    if (report.evaluation_target !== suite.evaluation_target) {
      throw new Error(`${filePath} evaluation_target must match ${casesPath}`);
    }

    if (!Number.isFinite(Date.parse(report.created_at))) {
      throw new Error(`${filePath} created_at must be parseable as an ISO-like date`);
    }

    if (directoryAdapter !== report.adapter) {
      throw new Error(`${filePath} directory adapter ${directoryAdapter} must match report.adapter ${report.adapter}`);
    }

    const isLocalReport = localResultAdapters.has(report.adapter);
    const isSchemaOnlyReport = report.verification_level === "schema_only";
    const isRunnerBackedReport = report.verification_level === "runner_generated" ||
      report.verification_level === "recomputed";

    if (isRunnerBackedReport && report.runner_version !== runnerVersion) {
      throw new Error(`${filePath} ${report.verification_level} requires runner_version ${runnerVersion}`);
    }

    if (!isLocalReport) {
      if (typeof report.source_commit !== "string" || report.source_commit.trim().length === 0) {
        throw new Error(`${filePath} non-local adapter reports must include source_commit`);
      }

      if (typeof report.model !== "string" || report.model.trim().length === 0) {
        throw new Error(`${filePath} non-local adapter reports must include model`);
      }
    }

    if (runIds.has(report.run_id)) {
      throw new Error(`${filePath} duplicate run_id across result reports: ${report.run_id}`);
    }
    runIds.add(report.run_id);

    if (!Array.isArray(report.cases) || report.cases.length === 0) {
      throw new Error(`${filePath} must contain at least one case result`);
    }

    adapterModelGroups.add(`${report.adapter}/${report.model ?? "unknown-model"}`);
    const reportCaseIds = new Set();
    for (const resultCase of report.cases) {
      const caseItem = caseMap.get(resultCase.case_id);
      if (!caseItem) {
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

      if (report.verification_level === "recomputed" && typeof resultCase.assistant_output !== "string") {
        throw new Error(`${filePath} ${resultCase.case_id} verification_level recomputed requires assistant_output`);
      }

      if (typeof resultCase.assistant_output === "string" && report.verification_level !== "recomputed") {
        throw new Error(`${filePath} ${resultCase.case_id} assistant_output requires verification_level recomputed`);
      }

      if (typeof resultCase.assistant_output === "string") {
        const recomputed = runCase(caseItem, resultCase.assistant_output, {
          includeAssistantOutput: true
        });
        if (!deterministicChecksMatch(resultCase, recomputed)) {
          throw new Error(`${filePath} ${resultCase.case_id} does not match recomputed deterministic checks`);
        }
      }

      for (const [checkName, status] of Object.entries(resultCase.checks)) {
        if (resultCase.check_details[checkName].status !== status) {
          throw new Error(`${filePath} ${resultCase.case_id} ${checkName} status does not match check_details`);
        }
      }

      totalCaseExecutions.push(resultCase.case_id);
      declaredUniqueCasesCovered.add(resultCase.case_id);
      if (isSchemaOnlyReport) {
        schemaOnlyExecutions.push(resultCase.case_id);
      } else if (report.verification_level === "runner_generated") {
        runnerGeneratedExecutions.push(resultCase.case_id);
      } else if (report.verification_level === "recomputed") {
        recomputedExecutions.push(resultCase.case_id);
      }

      if (!isSchemaOnlyReport) {
        runnerExecutedUniqueCasesCovered.add(resultCase.case_id);
        if (!isLocalReport) {
          publicUniqueCasesCovered.add(resultCase.case_id);
        }
      }

      if (resultCase.deterministic_pass && !isSchemaOnlyReport) {
        deterministicPassedExecutions.push(resultCase.case_id);
        uniqueCasesPassed.add(resultCase.case_id);
        if (!isLocalReport) {
          publicUniqueCasesPassed.add(resultCase.case_id);
        }
      }

      if (resultCase.deterministic_pass && report.verification_level === "recomputed") {
        verifiedUniqueCasesPassed.add(resultCase.case_id);
        if (!isLocalReport) {
          publicVerifiedUniqueCasesPassed.add(resultCase.case_id);
        }
      }

      if (resultCase.semantic_status !== "pending") {
        semanticReviewedExecutions.push(resultCase.case_id);
      }
    }
  }

  return {
    reportCount: files.length,
    totalCaseExecutions: totalCaseExecutions.length,
    deterministicPassedExecutions: deterministicPassedExecutions.length,
    semanticReviewedExecutions: semanticReviewedExecutions.length,
    schemaOnlyExecutions: schemaOnlyExecutions.length,
    runnerGeneratedExecutions: runnerGeneratedExecutions.length,
    recomputedExecutions: recomputedExecutions.length,
    declaredUniqueCasesCovered: declaredUniqueCasesCovered.size,
    runnerExecutedUniqueCasesCovered: runnerExecutedUniqueCasesCovered.size,
    publicUniqueCasesCovered: publicUniqueCasesCovered.size,
    uniqueCasesPassed: uniqueCasesPassed.size,
    publicUniqueCasesPassed: publicUniqueCasesPassed.size,
    verifiedUniqueCasesPassed: verifiedUniqueCasesPassed.size,
    publicVerifiedUniqueCasesPassed: publicVerifiedUniqueCasesPassed.size,
    adapterModelGroups: adapterModelGroups.size
  };
}

const suiteRaw = fs.readFileSync(casesPath, "utf8");
const suite = JSON.parse(suiteRaw);
const suiteSha256 = hashText(suiteRaw);
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

const caseMap = new Map(suite.cases.map((item) => [item.id, item]));
const resultSummary = readEvalResultReports(resultSchema, suite, suiteSha256, caseMap);

console.log(`eval suite ok: ${suite.suite_id} schema ${suite.schema_version}`);
console.log(`eval contracts ok: ${suite.cases.length} cases`);
console.log(`manual case mappings: ${manualCaseIds.size}/${suite.manual_case_count}`);
console.log(`semantic rubrics covered: ${coveredRubrics}/${semanticIds.size}`);
console.log(`core refined rubrics: ${rubrics.core_refined_rubrics.length}/${semanticIds.size}`);
console.log(`orphan rubrics: ${orphanRubrics.length}`);
console.log(`result reports: ${resultSummary.reportCount}`);
console.log(`total case executions: ${resultSummary.totalCaseExecutions}`);
console.log(`schema-only executions: ${resultSummary.schemaOnlyExecutions}`);
console.log(`runner-generated executions: ${resultSummary.runnerGeneratedExecutions}`);
console.log(`recomputed executions: ${resultSummary.recomputedExecutions}`);
console.log(`declared unique cases covered: ${resultSummary.declaredUniqueCasesCovered}/${suite.manual_case_count}`);
console.log(`runner-executed unique cases covered: ${resultSummary.runnerExecutedUniqueCasesCovered}/${suite.manual_case_count}`);
console.log(`public unique cases covered: ${resultSummary.publicUniqueCasesCovered}/${suite.manual_case_count}`);
console.log(`runner unique cases passed: ${resultSummary.uniqueCasesPassed}/${suite.manual_case_count}`);
console.log(`public unique cases passed: ${resultSummary.publicUniqueCasesPassed}/${suite.manual_case_count}`);
console.log(`verified runner unique cases passed: ${resultSummary.verifiedUniqueCasesPassed}/${suite.manual_case_count}`);
console.log(`public verified unique cases passed: ${resultSummary.publicVerifiedUniqueCasesPassed}/${suite.manual_case_count}`);
console.log(`deterministic passed executions: ${resultSummary.deterministicPassedExecutions}`);
console.log(`semantic reviewed executions: ${resultSummary.semanticReviewedExecutions}`);
console.log(`adapter/model groups: ${resultSummary.adapterModelGroups}`);
console.log(`evaluation target: ${suite.evaluation_target}`);
console.log(`routing skills checked: ${skillIds.size} local skills`);

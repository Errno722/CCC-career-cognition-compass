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
  "minItems",
  "minimum",
  "maximum",
  "items"
]);

export function resolveSchemaRef(rootSchema, ref) {
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

export function assertSchemaUsesSupportedKeywords(schemaNode, label) {
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

export function validateWithSchema(value, schemaNode, label, rootSchema, failures) {
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

  if (Array.isArray(value)) {
    if (schemaNode.minItems !== undefined && value.length < schemaNode.minItems) {
      failures.push(`${label} must contain at least ${schemaNode.minItems} item(s)`);
    }

    if (schemaNode.items) {
      for (const [index, item] of value.entries()) {
        validateWithSchema(item, schemaNode.items, `${label}[${index}]`, rootSchema, failures);
      }
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

export function validateJson(value, schema, label) {
  assertSchemaUsesSupportedKeywords(schema, label);
  const failures = [];
  validateWithSchema(value, schema, label, schema, failures);
  return failures;
}

export function validateJsonOrThrow(value, schema, label) {
  const failures = validateJson(value, schema, label);
  if (failures.length > 0) {
    throw new Error(`${label} failed schema validation:\n${failures.map((failure) => `- ${failure}`).join("\n")}`);
  }
}

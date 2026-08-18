# English Edition Usability Checklist

Purpose: add English-language naturalness and context-activation checks to the canonical continuous flows.

This is a manual usability checklist. It does not:

- add behavior contracts;
- change `manual_case_count`;
- generate Smoke Reports;
- claim platform validation.

Use only synthetic or fully redacted materials.

## Test Source

Do not maintain another copy of the English turn scripts here. Run these lanes from [canonical-entrypoint-smoke-plan.md](canonical-entrypoint-smoke-plan.md):

1. `Lane B1: English Domestic Job Search`
2. `Lane B2: English Cross-Market Job Search`
3. `Lane B3: Domestic + Second-Language Communication`

Record each turn with [observation-template.md](observation-template.md).

## Domestic Context

Check that CCC:

- stays focused on targeting, evidence, resume patches, and interview signals;
- does not ask about visa or sponsorship without a reason;
- does not label the user an international candidate merely because the conversation is in English;
- does not introduce cross-market Resume/CV rules;
- retains employed status and limited-energy constraints when supplied.

## Cross-Market Context

Check that CCC:

- activates target-market context only when it changes the answer;
- separates candidate fit from work authorization and sponsorship;
- distinguishes remote from work-from-anywhere;
- checks local Resume/CV context without universal claims;
- asks only minimum eligibility-level questions and does not request sensitive document details.

## Domestic + Second-Language Context

Check that CCC:

- activates second-language communication support without activating international framing;
- prioritizes clear, short, speakable English;
- does not upgrade working communication to fluent or native without evidence;
- preserves the user's meaning instead of translating Chinese phrasing literally.

## Naturalness Review

For recruiter messages, interview structures, and resume patches, record:

- `Naturalness`: does it sound like a person rather than a policy document?
- `Brevity`: can the user identify the main point quickly?
- `Speakability`: can the user say the sentence naturally?
- `Corporate tone`: does it sound like a cover letter when the user asked for a chat reply?
- `Complexity`: are sentences more sophisticated than the user needs?
- `Language claim`: does the output stay within supplied evidence?

Also record Rule Interference and Instruction Saturation through the shared observation template. Do not recommend prompt compression from one awkward output.

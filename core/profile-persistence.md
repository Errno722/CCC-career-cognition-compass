# Shared Rule: Profile Persistence

rule_id: profile-persistence
version: v1.1

CCC may create reusable profile cards, but it must not pretend to store long-term memory unless the runtime actually supports storage.

Use technical keys for configuration, knowledge-base variables, and developer docs. In ordinary user replies, prefer the Chinese card name `候选人面试资料卡补丁`; show raw keys such as `candidate_interview_profile_patch` only when the user asks for a template, WorkBuddy variable, or copyable state card.

## Persistence Modes

```text
stored
└─ The runtime has explicit file, database, knowledge-base, or long-term memory write capability and the write happened.

output_only
└─ The profile exists only in the current reply. The user must bring it back in a later session.
```

## Candidate Interview Profile Layers

```text
candidate_interview_profile_base
├─ profile_id:
├─ profile_version:
├─ stable_background:
├─ cross_role_strengths:
├─ reusable_evidence:
├─ general_expression_risks:
├─ persistence_mode:
└─ last_updated:
```

```text
candidate_interview_profile_by_role_family
├─ profile_id:
├─ profile_version:
├─ role_family:
├─ role_specific_strengths:
├─ role_specific_concerns:
├─ recent_feedback:
├─ next_round_focus:
├─ reusable_evidence:
├─ missing_evidence:
├─ excluded_feedback:
├─ persistence_mode:
└─ last_updated:
```

## Source Item Fields

```text
item_id:
content:
source_type:
source_role:
source_jd_family:
interview_round:
reliability:
evidence:
applies_to_role_families:
status:
first_seen:
last_seen:
```

Allowed statuses: `open`, `mitigated`, `resolved`, `role_specific`, `retired`.

## Rules

- Default to `output_only` in ordinary LLM, prompt, WorkBuddy, ChatGPT, Claude, or Codex conversations unless storage is explicit.
- If `output_only`, say the user should bring the previous card back for future rounds.
- Do not claim "已保存", "我会记住", or "下次自动继承" without real storage.
- Do not store or repeat names, phone numbers, emails, interviewer names, company secrets, salary, offer, contract text, or complete interview records.
- Reuse stable evidence across rounds; do not inherit role-specific bias into a different role family.
- Full profile output is only needed for first creation, user request, entering second/third/new round, merging multiple updates, or scope migration.

---
name: career-direction-clarifier
description: >-
  Career intention and direction clarification. Use when the user is unsure what the job search is really solving, says they do not know what they want, feels overwhelmed by social media, wants to understand job-search pain points, uses MBTI/zodiac/personality labels to describe themselves, or needs to choose a mode such as direction clarity, fast employment, career transition, target-company preparation, review, or restabilization. Not for resume-only optimization or clinical counseling.
---

# Career Direction Clarifier

## Overview

Clarify what the user is actually trying to solve before recommending jobs. Treat "finding a job" as a possible surface request, not the whole diagnosis.

## Workflow

1. **Name the real problem.** Check whether the user is seeking income, safety, direction, identity, confidence recovery, escape from current work, visa/graduation timing, or fast employment.
2. **Choose the mode.** Select one primary mode for the next step: `clarify_direction`, `quick_job`, `career_change`, `target_company`, `interview_review`, `low_energy`, or `bridge_work`.
3. **Translate self-description.** If the user mentions MBTI, zodiac, Enneagram, or personality labels, convert them into work preferences, collaboration style, energy sources, pressure triggers, and examples to verify.
4. **Reduce noise.** If the user is overloaded by social media or advice, separate useful signal from anxiety-generating content.
5. **Avoid premature certainty.** Offer hypotheses and validation actions, not life conclusions.

## Output Shape

```text
你现在可能在解决的不是一个问题
├─ 表层问题:
├─ 更深层需求:
└─ 当前最优先:

建议先进入的模式
├─ mode:
└─ 为什么:

需要验证的假设
├─ 假设 1:
├─ 假设 2:
└─ 需要你补一个例子:

下一步 1-3 个动作
```

## Style Rules

- Use the user's own words; do not create a polished persona.
- Do not say "your type is suited to X" based on MBTI or zodiac.
- Do not produce a large job list. If direction is still unclear, ask for one concrete example of energizing and draining work.

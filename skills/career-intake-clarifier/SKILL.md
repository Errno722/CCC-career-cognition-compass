---
name: career-intake-clarifier
description: >-
  Messy job-search intake and state triage. Use when the user provides chaotic career notes, voice transcripts, long speech-to-text dumps, one-sentence-at-a-time updates, keyword-only or no-punctuation fragments, scattered resume/JD fragments, abbreviations, pain points, interview memories, too many simultaneous directions/skills/materials/plans, or asks to start from unclear job-search information; produce a concise recap, current status, evidence inventory, missing information, initial hard-skill knowledge base/glossary, over-divergence focus card when needed, and up to three follow-up questions. If project details, project boundaries, personal contribution, or evidence are unclear, hand off to career-project-experience-miner. Not for final resume polishing, full portfolio production, therapy, or crisis counseling.
---

# Career Intake Clarifier

## Overview

Turn unstructured job-search input into a first usable picture. Do not require tables, fixed fields, or polished resumes; extract what is available and mark uncertainty clearly.

## Workflow

1. **Receive the mess.** Accept free text, voice transcript, long speech-to-text dump, one-sentence-at-a-time updates, keyword-only/no-punctuation fragments, old resume snippets, JD fragments, interview memories, emotional notes, abbreviations, and scattered project/course names.
2. **Separate certainty.** Label information as `confirmed`, `needs_confirmation`, `inference`, `missing`, or `user_preference`.
3. **Identify status.** Capture whether the user is a student, new graduate, employed, employed but exhausted, resigned, long Gap, career changer, overseas seeker, or unsure.
4. **Inventory evidence.** Extract work, internship, coursework, project, volunteer, part-time, self-study, tool, language, and interview evidence.
5. **Detect project-mining need.** If the user mentions projects, side projects, fragmented tasks, unclear contribution, no data, failed/paused projects, or "I don't know what counts as a project", mark `handoff: career-project-experience-miner` and assign a rough project state.
6. **Detect over-divergence.** If the user lists many roles, skills, materials, platforms, tutorials, emotions, or plans at once, group branches, choose one current thread, and park the rest. Do not turn the intake recap into a larger task list.
7. **Start the knowledge base.** Build a small hard-skill list and user glossary from whatever is already present.
8. **Ask lightly.** Ask at most 3 high-impact questions unless the user explicitly requests a full checklist.

## Keyword Fragment Handling

If the user sends words or short phrases without punctuation, do not ask them to rewrite or fill a form. First group the fragments:

```text
词块归类
├─ 状态:
├─ 经历:
├─ 技能/工具:
├─ 方向想法:
├─ 痛点:
├─ JD/面试:
└─ 待确认:
```

Rules:

- Start with `我先按词块理解`.
- Do not force fragments into a confident story; mark relationships as `inference` or `needs_confirmation`.
- Ask at most 2 clarifying questions and give 1 small next action.
- Example input: `gap 一年 运营 ai 转行 不知道投什么`.

## Over-Divergence Handling

Use this when the user starts with too many branches at once, such as several roles, skills to learn, resumes to edit, portfolios, platforms, tutorials, interviews, and emotional blockers in one message.

```text
发散收束卡
├─ 我看到的分支:
├─ 本轮主线:
├─ 暂存分支:
├─ 本轮先不处理:
├─ 选择主线的理由:
└─ 下一步 1 个动作:
```

Rules:

- Treat scattered thinking as raw material, not as a problem to criticize.
- Group before advising.
- Keep only 1 current main thread unless the user explicitly asks for comparison.
- Put secondary branches in parking, not in a full plan.
- Choose the main thread by urgency, evidence strength, deadline, energy, and whether it unlocks later work.
- Do not produce a full role list, skill list, resume package, platform plan, and interview plan in the same reply.

## Voice Transcript And Incremental Input

- Accept long speech-to-text content with repetition, pauses, filler words, and mixed order.
- Do not ask the user to rewrite it into formal language.
- First extract usable clues, then ask up to 3 high-impact questions.
- If the user sends one sentence at a time, merge each new sentence into the same temporary picture instead of restarting the intake.
- Remind users to remove phone, email, ID, salary, offer, contract, and company-internal information before sending transcripts.
- If the user asks how to start, suggest a concrete flow: record 5-10 minutes on a phone, speak freely about current state, past work, reasons for looking, roles seen, constraints, available time, and biggest blockers; transcribe with a phone/input-method/meeting-note tool; replace sensitive details with placeholders; then send the transcript.
- For WorkBuddy or other mobile-first channels, prefer one sentence, a few keywords, or short chunks. For ordinary LLM/Codex/Claude Code style environments, long transcripts are acceptable when desensitized.

## Output Shape

Use a compact response. Rename or merge sections when natural.

```text
我听到的重点
├─ ...

当前状态
├─ confirmed:
├─ inference:
└─ needs_confirmation:

初版经历证据
├─ 工作/实习:
├─ 项目/课程:
└─ 工具/技能:

项目深挖判断
├─ 是否需要 career-project-experience-miner:
├─ 初步状态: DISCOVERED / PARTIALLY_MAPPED / EVIDENCE_READY
└─ 原因:

初版硬技能知识库
├─ 技能:
├─ 证据:
└─ 待补:

术语/缩写表
├─ 用户已定义:
└─ 需要确认:

发散收束卡（仅在需要时）
├─ 我看到的分支:
├─ 本轮主线:
├─ 暂存分支:
└─ 下一步 1 个动作:

下一步最该补充的 1-3 件事
```

## Boundaries

- Do not write a resume before the user picture is usable.
- Do not treat a named project as usable evidence until project role, personal contribution, output, result/current status, and evidence gaps are clear.
- Do not make resume writing the default next step when the user has not asked for it.
- Do not force the user to fill every field.
- Do not reward over-divergence by expanding every branch in one reply.
- Do not store or repeat sensitive personal information; remind the user to desensitize phone numbers, email, IDs, contracts, offers, salary screenshots, and full interview transcripts.
- If the user expresses severe crisis or self-harm risk, stop job-search coaching and encourage local emergency or trusted support.

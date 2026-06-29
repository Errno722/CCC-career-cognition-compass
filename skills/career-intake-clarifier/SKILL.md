---
name: career-intake-clarifier
description: >-
  Messy job-search intake and state triage. Use when the user provides chaotic career notes, voice transcripts, long speech-to-text dumps, one-sentence-at-a-time updates, keyword-only or no-punctuation fragments, scattered resume/JD fragments, abbreviations, pain points, interview memories, or asks to start from unclear job-search information; produce a concise recap, current status, evidence inventory, missing information, initial hard-skill knowledge base/glossary, and up to three follow-up questions. Not for final resume polishing, full portfolio production, therapy, or crisis counseling.
---

# Career Intake Clarifier

## Overview

Turn unstructured job-search input into a first usable picture. Do not require tables, fixed fields, or polished resumes; extract what is available and mark uncertainty clearly.

## Workflow

1. **Receive the mess.** Accept free text, voice transcript, long speech-to-text dump, one-sentence-at-a-time updates, keyword-only/no-punctuation fragments, old resume snippets, JD fragments, interview memories, emotional notes, abbreviations, and scattered project/course names.
2. **Separate certainty.** Label information as `confirmed`, `needs_confirmation`, `inference`, `missing`, or `user_preference`.
3. **Identify status.** Capture whether the user is a student, new graduate, employed, employed but exhausted, resigned, long Gap, career changer, overseas seeker, or unsure.
4. **Inventory evidence.** Extract work, internship, coursework, project, volunteer, part-time, self-study, tool, language, and interview evidence.
5. **Start the knowledge base.** Build a small hard-skill list and user glossary from whatever is already present.
6. **Ask lightly.** Ask at most 3 high-impact questions unless the user explicitly requests a full checklist.

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

## Voice Transcript And Incremental Input

- Accept long speech-to-text content with repetition, pauses, filler words, and mixed order.
- Do not ask the user to rewrite it into formal language.
- First extract usable clues, then ask up to 3 high-impact questions.
- If the user sends one sentence at a time, merge each new sentence into the same temporary picture instead of restarting the intake.
- Remind users to remove phone, email, ID, salary, offer, contract, and company-internal information before sending transcripts.

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

初版硬技能知识库
├─ 技能:
├─ 证据:
└─ 待补:

术语/缩写表
├─ 用户已定义:
└─ 需要确认:

下一步最该补充的 1-3 件事
```

## Boundaries

- Do not write a resume before the user picture is usable.
- Do not force the user to fill every field.
- Do not store or repeat sensitive personal information; remind the user to desensitize phone numbers, email, IDs, contracts, offers, salary screenshots, and full interview transcripts.
- If the user expresses severe crisis or self-harm risk, stop job-search coaching and encourage local emergency or trusted support.

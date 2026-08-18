# Canonical Entrypoint Usability Plan

Status: `partially_run`

Latest observed run: [2026-08-19 Codex Canonical Validation](runs/2026-08-19-codex-canonical-validation.md)

- Chinese Prompt: 12-turn Codex model run completed.
- English Domestic: 10-turn Codex model run completed.
- English Cross-market: 10-turn Codex model run completed.
- English Second-language: 6-turn Codex model run completed.
- WorkBuddy System Prompt: 12-turn Codex proxy run completed; actual WorkBuddy platform remains `not_run`.
- Public automated Smoke Reports remain 0.

This is a manual longitudinal usability plan for the three formal CCC entrypoints:

```text
General chat models
├─ prompts/copy-paste-prompt-cn.md
└─ prompts/copy-paste-prompt-en.md

WorkBuddy
└─ workbuddy/system-prompt.md

Developers
└─ Core + Skills + Evals
```

This plan does not:

- add to `manual_case_count`;
- add to the machine contract count;
- generate a Smoke Report;
- claim platform validation without real model output;
- use real resumes, offers, interview transcripts, employer data, or personal identifiers.

The purpose is to observe whether a canonical entrypoint remains clear, natural, and stateful over 10-15 consecutive turns. It is not a collection of isolated prompts.

## Run Metadata

Fill this before each lane:

```text
platform:
model:
date:
entrypoint:
prompt version:
source commit:
conversation record:
tester:
```

Use one new conversation per lane. Keep all turns in that conversation. Save only synthetic or fully redacted records outside the public repository unless they are reviewed for publication.

## Current Size Snapshot

Measured on 2026-08-18. Rerun the commands before an actual test and record the source commit used.

| Entrypoint | Lines | Characters |
| --- | ---: | ---: |
| Chinese Prompt | 347 | 43,651 |
| English Prompt | 97 | 10,985 |
| WorkBuddy System Prompt | 1,196 | 47,589 |

Commands:

```bash
wc -l -c prompts/copy-paste-prompt-cn.md
wc -l -c prompts/copy-paste-prompt-en.md
wc -l -c workbuddy/system-prompt.md
```

Length is an observation signal, not a failure threshold. Do not compress a prompt only because it is long.

## Capability Alignment

This table checks whether a capability is declared in each entrypoint. It is not runtime proof.

| Capability | Chinese | English | WorkBuddy | Static note |
| --- | --- | --- | --- | --- |
| Messy input | Declared | Declared | Declared | Both languages accept fragments and voice-to-text. |
| Focus control | Declared | Declared | Declared | Internal state keys must stay hidden. |
| Privacy | Declared | Declared | Declared | WorkBuddy includes additional in-job privacy boundaries. |
| Project evidence | Declared | Declared | Declared | English uses a compact recovery rule rather than the full project-state model. |
| Resume patch | Declared | Declared | Declared | All prefer targeted patches over full rewrites. |
| HR screening reply | Declared | Declared | Declared | All prioritize one concise, sendable reply. |
| Interview structure | Declared | Declared | Declared | English explicitly prioritizes speakability. |
| Application feedback | Declared | Declared | Declared | All separate a data point, signal, pattern, and strategy change. |
| Employed user | Declared | Partial | Declared | English covers employment context and manager departure, but not the full fatigue / low-energy market-exploration path. Mark as `Potential drift`; test before changing. |
| Time-boxed action | Declared | Declared | Declared | All should select one action and allow an early stop. |
| Manager departure | Declared | Declared | Declared | Do not turn the event into an automatic resignation decision. |
| Offer decision | Declared | Declared | Declared | No mechanical score or outcome promise. |
| Incremental state update | Declared | Declared | Declared | A new event should update, not reset, the current direction. |
| Continuation context | Declared | Declared | Declared | Platform memory must not be overstated. |

Intentional differences:

- English contains cross-market, work-authorization, remote-eligibility, Resume/CV, and second-language guidance.
- WorkBuddy contains stricter mobile brevity, staged expansion, state-variable guidance, and platform-specific deployment behavior.
- Chinese contains more detailed user-facing scenarios and examples.

## Shared Observation Questions

Across every lane, record:

- Does CCC remember the main role family, employment status, project, and resume baseline?
- Does it ask again for facts already supplied?
- Does one setback reset the direction or trigger a full resume rewrite?
- Does the reply become longer or more templated over time?
- Does a new event change the immediate priority for a clear reason?
- Does CCC move only one main thread forward?
- Can the next action answer: `Why is this the priority now?`
- Does the action have a stop condition: `What is enough for this round?`

Use [observation-template.md](observation-template.md) for every turn.

## Lane A: Chinese Canonical Prompt

Entrypoint: `prompts/copy-paste-prompt-cn.md`

Use one continuous conversation. After Turn 1, provide only the new event.

| Turn | Synthetic user input | Primary observation |
| ---: | --- | --- |
| 1 | `我还在职，做了三年内容和用户运营，最近很累，也在看产品运营和项目执行，但越看越乱。每周大概只有四小时求职。` | Select one main thread; retain employed status and time budget. |
| 2 | `我还做过一个 Shopify 小项目，网站上线了，但没有销售数据。` | Add project evidence without calling it a commercial success. |
| 3 | `这是一个产品运营 JD：要做用户反馈、活动排期、数据看板，还要协同产品和研发。` | Classify role by work, not title; reuse prior evidence. |
| 4 | `按这个 JD 帮我改简历，但固定信息不要重写。` | Produce a patch; retain the neutral resume baseline. |
| 5 | `HR 问我为什么想换工作，怎么回？` | Answer the HR question directly; avoid direction, emotion, and resume detours. |
| 6 | `约到明天下午面试了。` | Update priority from application material to interview prep. |
| 7 | `今晚只有一个小时，我做什么？` | Choose one highest-value action and define what is enough. |
| 8 | `如果面试官问需求变更和研发排期冲突，我怎么回答？` | Give a short structure using known facts; do not invent ownership. |
| 9 | `刚面完。对方说我项目推进经验不够，回答也有点散。` | Record feedback as a data point/signal; update the interview profile. |
| 10 | `是不是说明我不适合产品运营，要重新换方向？` | Keep the direction unless evidence justifies a reset; narrow the gap instead. |
| 11 | `又有一个 HR 回我了，是偏用户运营的岗位。` | Compare the new event with the current role-family signal without restarting. |
| 12 | `那我现在下一步做什么？` | Select one action from the latest state and explain why now. |

Required spot checks:

- Turn 5: Rule Interference.
- Turn 7: why-now rationale and stop condition.
- Turn 9-10: event -> signal -> conclusion boundary.
- Turn 11-12: Context Reuse and incremental state update.

## Lane B1: English Domestic Job Search

Entrypoint: `prompts/copy-paste-prompt-en.md`

Context: US-based user, US Product Operations roles, English preferred, no sponsorship issue mentioned.

| Turn | Synthetic user input | Primary observation |
| ---: | --- | --- |
| 1 | `I'm based in the US and applying for US Product Operations roles. I keep changing my resume.` | Keep the context domestic; do not ask about sponsorship. |
| 2 | `I'm currently employed in content operations and have limited energy after work.` | Retain employed status; observe whether the partial employed-user rule is enough. |
| 3 | `My strongest example is a workflow cleanup project.` | Recover project evidence with minimal questions. |
| 4 | `This JD focuses on launch coordination, process documentation, and dashboard use.` | Classify the work and connect existing evidence. |
| 5 | `Patch my resume for it, but don't rewrite the fixed sections.` | Use a patch and preserve the baseline. |
| 6 | `The recruiter asked why I'm looking for a change. What should I send?` | Provide one concise reply without unrelated analysis. |
| 7 | `I have an interview tomorrow and only 45 minutes tonight.` | Pick one action, give a why-now reason, and stop condition. |
| 8 | `Help me structure an answer about cross-functional conflict.` | Produce speakable structure, not a cover letter or long script. |
| 9 | `The interview was okay, but they said my answer lacked clear ownership.` | Treat feedback as evidence with uncertainty; do not invent ownership. |
| 10 | `What should I do next?` | Reuse all relevant context and update one next action. |

Must not activate:

- visa or sponsorship questions;
- international-candidate framing;
- cross-market Resume/CV rules.

## Lane B2: English Cross-Market Job Search

Entrypoint: `prompts/copy-paste-prompt-en.md`

Context: US-based user considering UK roles, possible sponsorship need, remote eligibility unclear.

| Turn | Synthetic user input | Primary observation |
| ---: | --- | --- |
| 1 | `I'm based in the US and considering Product Operations roles in the UK.` | Ask or mark only context that changes eligibility or materials. |
| 2 | `I may need employer sponsorship.` | Treat sponsorship as eligibility, not candidate weakness. |
| 3 | `Some roles say remote. Can I work from the US?` | Separate remote from work-from-anywhere. |
| 4 | `Should I use a resume or a CV?` | Avoid universal rules; use market and role context. |
| 5 | `My main project was a workflow cleanup across content and support teams.` | Recover evidence without changing the market context. |
| 6 | `Here's a UK JD that mentions hybrid work and right to work.` | Identify application constraints and decision-changing unknowns. |
| 7 | `Patch my application materials for this role.` | Patch only relevant sections; do not overclaim eligibility. |
| 8 | `The recruiter asked about sponsorship and availability.` | Draft one concise answer using only supplied facts. |
| 9 | `I have an interview in two days and one hour tonight.` | Prioritize one role-relevant preparation action. |
| 10 | `What should I verify before I invest more time in this process?` | Reuse eligibility, remote, and role facts; give a bounded check. |

Must activate only when relevant:

- target market;
- work authorization / sponsorship;
- remote eligibility;
- local Resume/CV context.

## Lane B3: Domestic + Second-Language Communication

Optional supporting flow. It does not replace B1 or B2.

```text
Turn 1: I'm applying locally. English is not my first language, but the role uses English in meetings.
Turn 2: My answers sound too formal and too long.
Turn 3: Here's my answer about a workflow project.
Turn 4: Make it easier to say, but don't call me fluent.
Turn 5: The recruiter asked whether I can work in English.
Turn 6: Give me one short practice action for tonight.
```

Expected:

- activate second-language expression support;
- prioritize natural, short, speakable English;
- preserve the user's actual language evidence;
- do not activate sponsorship or international-candidate framing.

## Lane C: WorkBuddy Canonical Prompt

Entrypoint: `workbuddy/system-prompt.md`

Use a mobile-sized continuous conversation. Keep user messages short.

| Turn | Synthetic user input | Primary observation |
| ---: | --- | --- |
| 1 | `还在职 想换工作 运营三年 最近很累` | Understand fragments; select one main thread. |
| 2 | `之前做过一个活动复盘项目` | Reuse status and start one project card. |
| 3 | `今天看到个产品运营JD` | Ask only for the JD information needed now. |
| 4 | `里面要跨部门推进和数据看板` | Classify the role and reuse project evidence. |
| 5 | `HR回我了` | Ask at most one question needed to identify the message. |
| 6 | `他说为什么想换工作` | Give one sendable reply; do not trigger the full employed-user workflow. |
| 7 | `明天下午面试` | Update the current priority. |
| 8 | `今晚只有半小时` | Give one bounded preparation action. |
| 9 | `需求老变怎么回答` | Give a short, structured answer framework. |
| 10 | `刚面完 有点乱` | Capture fresh keywords before expanding. |
| 11 | `他说我推进经验不够` | Update feedback and next-round preparation without resetting direction. |
| 12 | `接下来呢` | Reuse the current state and give one next action. |

Mobile usability target:

```text
1 current judgment
1 main content block
1 next action
at most 1-2 questions
```

Do not mechanically cut useful context to meet a character count. Watch for:

- repeated CCC introductions;
- large reports after short inputs;
- exposed internal state keys;
- repeated questions;
- lost context;
- mobile reading burden.

## Rule Interference

Definition: multiple valid rules compete for the response and pull it away from the user's requested deliverable.

Example input:

```text
HR 问我为什么换工作，怎么回？
```

Failure:

- analyzes career direction;
- opens a work-fatigue assessment;
- suggests resume changes;
- gives emotional support;
- provides the HR reply last.

Expected:

- answer the HR question directly;
- ask at most one fact that materially changes the reply;
- park unrelated support.

Record the rules that appeared to compete, the user impact, and whether it happened again.

## Instruction Saturation

Definition: a rule appears to be ignored later in a long prompt or long conversation.

Do not infer saturation from prompt length alone. Record:

```text
entrypoint:
platform / model:
turn:
rule that appeared to fail:
observable output:
repeated in the same lane:
repeated in another run or model:
alternative explanation:
```

Only consider prompt compression when the same failure repeats or when several models show the same interference pattern.

## Potential Compression Candidates

These are static candidates, not approved edits:

| Entrypoint | Candidate | Why it may overlap | Why it may still be intentional |
| --- | --- | --- | --- |
| English | Rules 11 and 12 both classify ambiguous titles through responsibilities, scope, stakeholders, tools, seniority, and context. | The second sentence is nearly repeated. | Rule 12 protects cross-company and cross-market title mapping. |
| Chinese | Rules 6, 6a, and 71 repeat short reply, one main thread, staged expansion, and mobile constraints. | A shared response-budget rule may reduce repetition. | Rule 71 is specifically for WorkBuddy/mobile/timeout contexts. |
| Chinese | Rules 15, 67, and 71 repeat patch-over-rewrite behavior. | The baseline could be centralized. | JD patch, Resume Freeze, and token saving are different triggers. |
| Chinese | Intro privacy warning, Rules 9/9a, and scenario-specific privacy reminders recur. | A shared privacy baseline may reduce length. | Employed and international contexts need stricter boundaries. |
| Chinese | Rules 19a, 72, and 73 repeat no-re-onboarding / context reuse. | A single continuation principle may be enough. | HR direct response, post-update handoff, and new-event updates have different priorities. |
| WorkBuddy | Core rules, Short Reply Mode, Token Saving Mode, and Focus Control repeat response-length boundaries. | Could compete or add instruction weight. | Platform-specific mobile behavior benefits from explicit reinforcement. |
| WorkBuddy | Core continuous-use rule and later state sections repeat incremental update behavior. | May be consolidated after runtime evidence. | One is global routing; later sections define state details. |

Observe first, compress second. Similar wording alone is not enough to change a canonical prompt.

## Validation Conclusion Template

```text
Canonical Entrypoint Validation

Chinese Prompt:
- status: not_run / partial / completed
- major friction:
- repeated friction:
- next action:

English Prompt:
- status: not_run / partial / completed
- major friction:
- repeated friction:
- next action:

WorkBuddy:
- status: not_run / partial / completed
- major friction:
- repeated friction:
- next action:

Cross-entrypoint issue:
-

Prompt compression needed: yes / no / insufficient evidence

Reason:
-
```

## Next-Round Change Gate

Allow product or prompt changes only when:

- a P0 or P1 usability issue is observed; or
- the same P2 friction repeats at least 2-3 times.

Record P3 wording issues without immediately changing the core architecture.

Before proposing a change, ask:

```text
Did actual testing expose this problem,
or is it only another problem we can imagine?
```

Only the first should enter the next development round.

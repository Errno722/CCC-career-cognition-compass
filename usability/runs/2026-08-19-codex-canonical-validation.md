# Canonical Entrypoint Validation: Codex Model Run

Status: `completed_with_platform_limits`

This record summarizes a real-model longitudinal run using synthetic inputs. It is a usability observation, not an automated Smoke Report and not proof of behavior on every supported platform.

## Run Metadata

```text
date: 2026-08-19
platform: Codex subagent executor
model: inherited Codex model (gpt-5.6-sol configuration; executor did not echo the model ID)
source_commit: 401e9bda8147794f7a0a7b09867588784a88792f
version: 0.1.1-beta
materials: synthetic only
full outputs: current local Codex task transcript; not committed
smoke report generated: no
```

Entrypoint sizes at the tested commit:

| Entrypoint | Lines | Characters |
| --- | ---: | ---: |
| Chinese Prompt | 347 | 43,651 |
| English Prompt | 97 | 10,985 |
| WorkBuddy System Prompt | 1,196 | 47,589 |

## Validation Status

| Lane | Entrypoint | Turns | Run status | Result |
| --- | --- | ---: | --- | --- |
| Chinese | `prompts/copy-paste-prompt-cn.md` | 12 | completed on Codex | Core state reuse passed; one P1 user-facing project-table friction observed. |
| English Domestic | `prompts/copy-paste-prompt-en.md` | 10 | completed on Codex | Domestic context stayed domestic; no unnecessary visa or sponsorship framing. |
| English Cross-market | `prompts/copy-paste-prompt-en.md` | 10 | completed on Codex | Market, sponsorship, remote eligibility, and CV context activated only when relevant. |
| English Second-language | `prompts/copy-paste-prompt-en.md` | 6 | completed on Codex | English was made shorter and more speakable without claiming fluency. |
| WorkBuddy Prompt proxy | `workbuddy/system-prompt.md` | 12 | completed on Codex | Short-message behavior and context reuse were testable; this is not a WorkBuddy platform run. |
| WorkBuddy platform | `workbuddy/system-prompt.md` | 0 | `not_run` | No authenticated WorkBuddy execution environment was available. |

Agent identifiers are retained only to distinguish independent conversations:

```text
Chinese: 01a015d0-659c-7173-87f7-8071c4bc5dab
English Domestic: 01a015d0-6636-7e20-b0f2-96bd0f46f81e
English Cross-market: 01a015d0-66f7-7da0-98d8-fb09b3af3ec0
English Second-language: 01a015d8-87a8-78a2-ad17-0a2dc1852380
WorkBuddy Prompt proxy: 01a015d0-67ca-7333-bbe4-d8cc0912cef6
```

## Chinese Prompt: 12 Turns

| Turn | Input cue | Task result | Observation |
| ---: | --- | --- | --- |
| 1 | Employed; operations, coordination, data; three possible directions | partial | Chose Product Operations as the main validation line and kept alternatives, but also opened a 7-day plan, six-JD task, and three questions. One overlong-reply P2 candidate; not repeated. |
| 2 | `继续补项目吧` | yes | Recovered the project branch without onboarding again. Asked for a 3-8 item inventory and exposed project status labels; heavier than necessary but still actionable. |
| 3 | Coordinated three teams to launch an internal tool; memory is fragmented | partial | Preserved facts and did not invent ownership, but printed an eight-column technical project table and prematurely assigned `PARTIALLY_MAPPED`. Logged as P1 unnecessary template / internal-state exposure. |
| 4 | Product Operations JD; is this project usable? | yes | Reused the project and role direction; separated confirmed coordination evidence from unconfirmed requirements and data evidence. |
| 5 | Should the full resume be rewritten? | yes | Entered Minimal Tailoring: preserve fixed sections, complete facts, patch only the relevant summary, skills order, and 2-3 bullets. |
| 6 | Recruiter asks employment status and reason for change | yes | Gave one concise, sendable reply first. No direction, fatigue, or resume detour. |
| 7 | Interview scheduled for tomorrow | yes | Changed the immediate priority from resume work to one interview project; treated the invitation as a positive data point, not a final conclusion. |
| 8 | One hour available and tired | yes | Selected one 20-minute project-fact action, explicitly said not to use the full hour, and defined the stop condition. |
| 9 | How to explain why the project was advanced that way | yes | Used answer-first, evidence, trade-off, and result; separated personal judgment from team decisions and avoided forcing STAR. |
| 10 | Interview ended; still got stuck on the judgment question | yes | Stored one first signal, asked for fresh keywords, and did not rewrite the resume or reset the direction. |
| 11 | Doubts about suitability for Product Operations | yes | Used existing evidence to reduce overgeneralization, time-boxed reflection, and avoided motivational filler. |
| 12 | Another Product Operations role replied | yes | Updated the market signal, explained why the earlier interview did not invalidate the direction, and asked only for the new message needed now. |

### Chinese Findings

- Context Reuse: passed across project, JD, resume, recruiter, interview, and feedback turns.
- Rule Interference: HR reply turn passed; unrelated workflows did not compete with the deliverable.
- Instruction Saturation: one observable failure at Turn 3, where internal project machinery surfaced in a user-facing response. It did not repeat later in this lane.
- Major friction: `CF-001` in [friction-log.md](../friction-log.md).
- Repeated friction: none established from this single run.

## English Domestic: 10 Turns

| Turn | Input cue | Task result | Observation |
| ---: | --- | --- | --- |
| 1 | US-based, US Product Operations, repeated resume rewrites | yes | Kept the context domestic and selected a stable baseline plus JD patches. The initial request for summary, several bullets, and one JD was a broad gate, but it did not recur. |
| 2 | Employed in content operations; limited energy | yes | Reused employment and energy context; selected one 10-minute evidence action. |
| 3 | Workflow cleanup project | yes | Asked only for problem, personal action, and result; allowed approximate evidence if labeled. |
| 4 | JD: launches, documentation, dashboards | yes | Matched only supported evidence and left launch coordination unconfirmed. |
| 5 | Patch resume; fixed sections stay fixed | partial | Respected the baseline but required the missing editable content and JD text before producing a patch. No full rewrite. |
| 6 | Recruiter asks why the user is looking | yes | Returned one concise message with no unrelated analysis. |
| 7 | Interview tomorrow; 45 minutes tonight | yes | Changed priority to one reusable project answer and used only 20-25 minutes. |
| 8 | Structure a cross-functional conflict answer | yes | Gave a speakable framework, not a cover letter or long script, and warned against using a project without a real conflict. |
| 9 | Interview feedback: ownership was unclear | yes | Treated feedback as answer-structure evidence, separated `I` from team outcomes, and did not invent ownership. |
| 10 | What next? | yes | Reused the fresh feedback and selected one 15-minute repair action; no resume or direction reset. |

### English Domestic Findings

- Unnecessary sponsorship / visa activation: none.
- International-candidate framing: none.
- Context Reuse: passed.
- Repeated friction: none.

## English Cross-market: 10 Turns

| Turn | Input cue | Task result | Observation |
| ---: | --- | --- | --- |
| 1 | US-based user considering UK roles | yes | Identified a cross-market search and asked only for eligibility context that could change the decision. |
| 2 | Sponsorship may be needed | yes | Treated sponsorship as an eligibility constraint rather than candidate weakness. |
| 3 | Does remote mean working from the US? | yes | Correctly separated remote from work-from-anywhere and proposed a bounded location check. |
| 4 | Resume or CV? | yes | Recommended a concise UK professional CV while preserving the US resume as the baseline. |
| 5 | Workflow cleanup across content and support | yes | Returned to evidence recovery without losing market context. |
| 6 | UK JD mentions hybrid and right to work | yes | Asked for exact wording before deciding whether sponsorship was excluded, possible, or unclear. |
| 7 | Patch application materials | partial | Refused to fabricate a patch without the JD and editable materials; requested the minimum content needed for the requested deliverables. |
| 8 | Recruiter asks about sponsorship and availability | yes | Asked for two decision-changing facts and explicitly rejected visa documents or numbers. |
| 9 | Interview in two days; one hour tonight | yes | Selected one 45-minute project-answer action and stopped. |
| 10 | What to verify before investing more time | yes | Prioritized sponsorship, UK work authorization, hybrid attendance, and relocation gates before more preparation. |

### English Cross-market Findings

- Cross-market constraints activated when relevant and remained separate from role fit.
- Remote eligibility was not overstated.
- No unsupported work-authorization or sponsorship claim was generated.
- Repeated friction: none.

## English Second-language: 6 Turns

| Turn | Input cue | Task result | Observation |
| ---: | --- | --- | --- |
| 1 | Local search; English is not first language; meetings use English | yes | Explicitly kept the search domestic and framed the issue as clear communication, not native-like English. |
| 2 | Answers are formal and long | yes | Gave a short spoken structure and natural phrases. |
| 3 | Overformal workflow-project answer | yes | Simplified the supplied facts and asked only for the missing change and result. |
| 4 | Make it easier to say; do not call the user fluent | yes | Shortened again and made no language-level claim. |
| 5 | Recruiter asks whether the user can work in English | yes | Asked whether the user has actual workplace evidence before drafting a claim. |
| 6 | One practice action tonight | yes | Gave one 10-minute recording action with an honest-evidence structure. |

### English Second-language Findings

- Sponsorship and international framing: not activated.
- Fluency / native-level overclaim: none.
- Speakability: passed.

## WorkBuddy Prompt Proxy: 12 Turns

This lane used the real WorkBuddy System Prompt on Codex. It tests prompt behavior under short fragmented inputs, but it does not validate WorkBuddy deployment, mobile rendering, timeout behavior, or platform memory.

| Turn | Input cue | Task result | Observation |
| ---: | --- | --- | --- |
| 1 | Employed, wants change, three years in operations, tired | yes | Parsed fragments and chose employed-user energy as the main thread. Asked two short questions. |
| 2 | Activity review project | yes | Started evidence recovery with two questions and no resume packaging. |
| 3 | Saw a Product Operations JD | yes | Asked for responsibilities and one motivation distinction; slightly more than the minimum but still short. |
| 4 | Cross-functional work and dashboards | yes | Classified a mixed Product Operations role and kept unsupported dashboard evidence open. |
| 5 | Recruiter replied | yes | Switched the main thread and asked for the message plus the user's intended reply. |
| 6 | Recruiter asks why the user wants to change jobs | yes | Produced one sendable reply directly. |
| 7 | Interview tomorrow afternoon | yes | Changed priority to interview preparation and asked only the interviewer type. |
| 8 | Only 30 minutes tonight | yes | Chose one 60-second project answer and said the full 30 minutes need not be used. |
| 9 | How to answer frequent requirement changes | partial | Answer was useful and bounded, but it became a generic first-person script rather than a compact framework grounded in confirmed experience. One P2 speakability candidate. |
| 10 | Interview just ended; user feels scattered | yes | Captured fresh keywords before interpretation and asked about the next-step timeline. |
| 11 | Interviewer said project-advancement experience was insufficient | yes | Distinguished experience gap, expression gap, and role-level mismatch; treated one interview as one data point. |
| 12 | What next? | yes | Selected one review action without changing direction or rewriting the resume. It did not explicitly time-box the review or remind the user to move on afterward. One P2 closure candidate. |

### WorkBuddy Proxy Findings

- Fragment understanding: passed.
- Context Reuse: passed.
- Repeated CCC introduction: none.
- Internal state-key exposure: none.
- Actual WorkBuddy platform status: `not_run`.
- Repeated friction: none established.

## Cross-Lane Findings

### Context Reuse

Passed in all Codex lanes. The model retained employment status, role family, project, market, interview timing, and feedback without asking for the full background again.

### Rule Interference

No repeated interference was observed. Recruiter-reply turns delivered the reply first instead of reopening career direction, work fatigue, or resume analysis.

### Instruction Saturation

One clear issue appeared in Chinese Turn 3: the user received implementation-style project-state fields instead of a compact fact-recovery response. Other late-turn rules, including no direction reset and incremental event updates, remained active through Turn 12.

### Prompt Compression Evidence

`insufficient evidence`

The existing static compression candidates remain candidates only. This one-model run does not show repeated Rule Interference or several late-turn instruction failures, so prompt length alone does not justify deleting or merging rules.

## Friction Gate Result

```text
P0: 0
P1: 1 (Chinese project-table exposure)
P2 candidates: 3, all single occurrences
P3: 0 recorded
```

No product files were changed during this run. `CF-001` is eligible for a later narrow product correction because it is P1, but the correction should be made in a separate development round rather than inside the observation run.

## Current Limits

- One Codex model family was tested; cross-model repetition is unknown.
- The subagent executor did not provide per-turn latency or exact response character metrics.
- Full outputs remain in the local Codex task transcript rather than the repository.
- WorkBuddy was tested only as a prompt proxy on Codex; actual WorkBuddy platform behavior remains unverified.
- This run does not change Eval case counts or public Smoke Report metrics.

# English Edition Usability Plan

Purpose:
Check whether the English Edition feels natural to English-language users and whether context-sensitive rules activate only when relevant.

This is a manual longitudinal usability plan.

It does not:

- add behavior contracts
- change `manual_case_count`
- generate Smoke Reports
- claim platform validation

Use only synthetic or fully redacted materials. Do not use real phone numbers, email addresses, resumes, offers, contracts, salary screenshots, confidential employer information, or complete interview records.

## Flow A: Domestic Job Search

Scenario:

```text
User:
Based in the US
Applying for US Product Operations roles
No work authorization issue mentioned
Uses English naturally
```

Suggested continuous inputs:

```text
Turn 1:
I'm applying for Product Operations roles and I keep changing my resume.

Turn 2:
I've had three recruiter screens and two first-round interviews.

Turn 3:
I don't know whether the problem is my resume or how I explain my projects.

Turn 4:
Here's one project I usually talk about.

Turn 5:
Here's a JD.
```

Should:

- stay focused on targeting, evidence, and interview signals
- use natural English
- avoid full resume rewrites
- give one next action

Should not:

- ask about visa
- ask about sponsorship
- call this international job search
- introduce cross-market rules without reason

## Flow B: Cross-Market Job Search

Scenario:

```text
User:
Based in one country
Applying in another market
May need sponsorship
```

Suggested continuous inputs:

```text
Turn 1:
I'm based in the US and considering Product Operations roles in the UK.

Turn 2:
I may need employer sponsorship.

Turn 3:
Some roles say remote. Does that mean I can apply from the US?

Turn 4:
Should I use a resume or CV?
```

Should:

- identify target market relevance
- separate fit from work authorization
- avoid sensitive visa questions
- distinguish remote from work-from-anywhere
- avoid universal resume rules

Should not:

- assume US rules for UK applications
- treat sponsorship as low candidate quality

## Flow C: Domestic + Second-Language Communication

Scenario:

```text
User:
Applying locally
English is not first language
No cross-market issue
```

Suggested continuous inputs:

```text
Turn 1:
I'm applying locally and English is not my first language.

Turn 2:
I can work in English, but my interview answers sound too formal.

Turn 3:
Help me make this answer easier to say.
```

Should:

- activate second-language communication
- keep job-search context domestic
- prefer speakable English
- not inflate fluent or native claims

Should not:

- assume sponsorship
- assume international job search

## Watch For

- unnecessary onboarding
- repeated questions
- context over-activation
- full-resume rewrite drift
- overly long answers
- unnatural English
- premature conclusions from small samples
- unnecessary visa or sponsorship discussion

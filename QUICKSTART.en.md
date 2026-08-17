# CCC Quickstart

CCC is Career Cognition Compass. It helps turn messy job-search situations into evidence, judgment, and one next action.

Before using it, redact sensitive information. Do not send passport numbers, visa document numbers, national IDs, full offer letters, contracts, salary screenshots, confidential employer information, or complete interview transcripts.

## I Just Want To Try It

1. Open ChatGPT, Claude, Gemini, or another LLM.
2. Copy [prompts/copy-paste-prompt-en.md](prompts/copy-paste-prompt-en.md).
3. Start a new chat.
4. Send your situation in messy form.

Example:

```text
I'm based in the US and applying for US Product Operations roles.
English is my preferred language for this conversation.
I want help deciding what to fix first in my resume and interview prep.
```

Another example:

```text
I'm applying for Product Operations roles in the UK.
English is my second language and I may need sponsorship.
I've had several interviews but no offer.
```

## I Use Codex / Claude Code

Use the modular skills in:

```text
skills/
```

Start with [SKILLS.md](SKILLS.md). Most users should begin with `career-cognition-compass`, then move to a narrower skill only when the task is clear.

## Job Search Context

The language you use with CCC does not determine your job market.

CCC only checks location, target market, work authorization, relocation, remote eligibility, local hiring conventions, or second-language communication when they can change the current answer.

Examples:

```text
English user + US roles from the US -> domestic context
English user + UK roles from the US -> cross-market context
Second-language English user + local roles -> domestic + second-language context
```

Remote does not always mean work from anywhere.

More detail: [docs/international-job-search.md](docs/international-job-search.md)

## Privacy

Do not send:

- passport numbers;
- visa document numbers;
- national IDs;
- social security numbers;
- full home addresses;
- private phone numbers;
- personal emails;
- full offer letters;
- contracts;
- salary screenshots;
- confidential employer information;
- complete interview transcripts;
- API keys or tokens.

## More

- [README.en.md](README.en.md)
- [examples/international-job-search.md](examples/international-job-search.md)
- [DOWNLOADS.md](DOWNLOADS.md)

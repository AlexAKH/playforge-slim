# Playwright Project Root Contract

## Purpose
This repository contains a strict TypeScript and Playwright Component-DSL test automation framework. Protect readable tests and preserve the separation between page objects, reusable components, and specs.

## Authority
- `package.json` defines available commands and dependencies.
- `playwright.config.ts` defines test-runner behavior.
- `docs/conventions/page-objects.md` defines page-object rules.
- `docs/conventions/components.md` defines component rules.
- `.ai/conventions/skill-vs-agent.md` defines capability classification rules.
- `.ai/docs/project_specification.md` defines the project profile and scope.
- Existing files under `pages/`, `pages/components/`, and `tests/` demonstrate current code conventions.

## Boundaries
- Do not expose secrets or commit generated credentials.
- Do not place page objects, components, or specs outside their documented folders without human approval.
- Do not report a test as passing without running it and observing the result.
- Changes to test conventions require human review.

## Classification Gate
Before creating, editing, or deleting any file:
1. Classify the task out loud as either **trivial** or **non-trivial**.
   - **Trivial:** Isolated typos, simple cosmetic edits, single-command checks, or read-only inquiries. Proceed directly.
   - **Non-trivial:** Any test creation, test modification, refactoring, framework changes, or instruction updates.
   - If unsure: treat as non-trivial.
2. For non-trivial tasks, stop. Load the concrete routing capability and follow its procedure before implementation.
3. Every non-trivial routed task must execute `.ai/skills/task-complete/SKILL.md` as its final closure gate before completion is declared.

## Capability Routing
- **Create or modify a test:**
  1. Trigger `.ai/skills/clarify-test-scope/SKILL.md` in the main conversation before reading or modifying any test code.
  2. Implement test code adhering to `docs/conventions/page-objects.md` and `docs/conventions/components.md`.
  3. Run the test and observe results.
  4. Trigger `.ai/agents/test-reviewer.md` in an isolated context and report its verdict before declaring completion.
  5. Conclude with `.ai/skills/task-complete/SKILL.md`.
- **Add or evaluate instruction capabilities:**
  1. Classify the capability using `.ai/conventions/skill-vs-agent.md`.
  2. Before accepting new or updated instruction artifacts, evaluate them using `.ai/agents/instruction-evaluator.md`.
  3. Conclude with `.ai/skills/task-complete/SKILL.md`.
- **Page objects and components:**
  - Before creating or updating a page object, read `docs/conventions/page-objects.md`.
  - Before creating or updating a component, read `docs/conventions/components.md`.

## Capability Registry
- **Skills:**
  - `clarify-test-scope`: `.ai/skills/clarify-test-scope/SKILL.md`
  - `task-complete`: `.ai/skills/task-complete/SKILL.md`
- **Agents:**
  - `test-reviewer`: `.ai/agents/test-reviewer.md`
  - `instruction-evaluator`: `.ai/agents/instruction-evaluator.md`
- **Conventions:**
  - `skill-vs-agent`: `.ai/conventions/skill-vs-agent.md`

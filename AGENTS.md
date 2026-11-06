# Playwright Project Root Contract

## Purpose
This repository contains a strict TypeScript and Playwright Component-DSL test automation framework. Protect readable tests and preserve the separation between page objects, reusable components, and specs.

## Authority
- `package.json` defines available commands and dependencies.
- `playwright.config.ts` defines test-runner behavior.
- `docs/conventions/page-objects.md` defines page-object rules.
- `docs/conventions/components.md` defines component rules.
- `docs/conventions/test-standards.md` defines locator and wait conventions.
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
- **Create a test:**
  - Follow the create-test pipeline at `.ai/pipelines/create-test.md`, starting from step 1.
- **Craft test cases:**
  - Follow the craft-test-cases pipeline at `.ai/pipelines/craft-test-cases.md`.
- **Modify an existing test:**
  1. Follow the `clarify-test-scope` skill at `.ai/skills/clarify-test-scope/SKILL.md` before reading or editing code.
  2. Implement test code adhering to `docs/conventions/page-objects.md`, `docs/conventions/components.md`, and `docs/conventions/test-standards.md`.
  3. Run the test with `npx playwright test <spec-path>` and observe results.
  4. Trigger `.ai/agents/test-reviewer.md` in an isolated context and report its verdict before declaring completion.
  5. Conclude with `.ai/skills/task-complete/SKILL.md`.
- **Update project documentation:**
  - Follow the update-project-docs pipeline at `.ai/pipelines/update-project-docs.md`.
  - Trigger when a file under `test-cases/` is created or changed outside the craft-test-cases pipeline.
  - Trigger when a spec file under `tests/` is created or changed, for the feature whose test-case file the changed spec implements.
- **Add or evaluate instruction capabilities:**
  1. Classify the capability using `.ai/conventions/skill-vs-agent.md`.
  2. Before accepting new or updated instruction artifacts, evaluate them using `.ai/agents/instruction-evaluator.md`.
  3. Conclude with `.ai/skills/task-complete/SKILL.md`.
- **Page objects and components:**
  - Before creating or updating a page object, read `docs/conventions/page-objects.md`.
  - Before creating or updating a component, read `docs/conventions/components.md`.
- **Test coverage inquiries:**
  - Before answering any question about what is tested, covered, or already specified, read `docs/test-index.md` first, then the feature doc that the index names.

## Capability Registry
- **Pipelines:**
  - `create-test`: `.ai/pipelines/create-test.md`
  - `craft-test-cases`: `.ai/pipelines/craft-test-cases.md`
  - `update-project-docs`: `.ai/pipelines/update-project-docs.md`
- **Skills:**
  - `clarify-test-scope`: `.ai/skills/clarify-test-scope/SKILL.md`
  - `implement-test`: `.ai/skills/implement-test/SKILL.md`
  - `task-complete`: `.ai/skills/task-complete/SKILL.md`
  - `parse-requirement`: `.ai/skills/parse-requirement/SKILL.md`
  - `apply-test-techniques`: `.ai/skills/apply-test-techniques/SKILL.md`
  - `produce-test-cases`: `.ai/skills/produce-test-cases/SKILL.md`
  - `update-domain-knowledge`: `.ai/skills/update-domain-knowledge/SKILL.md`
  - `write-feature-doc`: `.ai/skills/write-feature-doc/SKILL.md`
  - `update-test-index`: `.ai/skills/update-test-index/SKILL.md`
- **Agents:**
  - `test-reviewer`: `.ai/agents/test-reviewer.md`
  - `instruction-evaluator`: `.ai/agents/instruction-evaluator.md`
- **Conventions:**
  - `skill-vs-agent`: `.ai/conventions/skill-vs-agent.md`
  - `test-standards`: `docs/conventions/test-standards.md`
  - `page-objects`: `docs/conventions/page-objects.md`
  - `components`: `docs/conventions/components.md`

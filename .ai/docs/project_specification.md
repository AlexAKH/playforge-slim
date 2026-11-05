# Project Specification: playforge

## 1. Project Purpose
- TypeScript + Playwright practice fixture for AI-native test automation.
- Provides a strict Component-DSL foundation targeting `https://automationexercise.com` (UI e-commerce flows and user API).

## 2. User Role & Duties
- **Role:** QA Automation Engineer (SDET).
- **Recurring Duties:**
  - Test writing and automation (specs, page objects, reusable components, fixtures).
  - Code review and quality gating for automated tests.

## 3. AI Tooling Surface
- **Tool Mode:** Single-tool.
- **Active AI Tool:** Antigravity CLI / IDE.
- **External Best-Practice Research:** Not allowed (rely strictly on local authoritative conventions).

## 4. Known Capability Triggers
- **Create or modify a test:** Trigger `clarify-test-scope` (`instructions/agents/clarify-test-scope.md`) before reading or modifying code.
- **After test creation/modification:** Trigger `test-reviewer` (`instructions/agents/test-reviewer.md`) and report verdict before declaring done.
- **Before creating/modifying a page object:** Read `docs/conventions/page-objects.md`.
- **Before creating/modifying a component:** Read `docs/conventions/components.md`.
- **Before adding a skill or agent:** Classify using `docs/conventions/skill-vs-agent.md`.

## 5. Authoritative Local Sources
- `AGENTS.md` (root contract, boundaries, routing).
- `docs/conventions/` (`page-objects.md`, `components.md`, `skill-vs-agent.md`).
- `package.json` & `playwright.config.ts` (tooling, commands, test-runner config).
- Existing codebase architecture (`pages/`, `pages/components/`, `tests/`, `framework/`, `assertions/`).

## 6. Domain Vocabulary
- **Page Objects (`pages/`):** Top-level representations of distinct pages/routes.
- **Components (`pages/components/`):** Reusable UI widgets and blocks across pages.
- **Specs (`tests/ui/`, `tests/api/`):** Executable test definitions.
- **Core DSL:** `xPage`, `xLocator`, `xComponent`, custom step assertions (`assertions/`).
- **Target Application Domain:** `https://automationexercise.com` (Account creation, Login/Logout, Products, Cart, Search, Subscriptions).

## 7. Quality Expectations & Preferred Workflows
- **Validation:**
  - TypeScript compilation check (`npm run typecheck`).
  - Linter check (`npm run lint`).
  - Test suite verification (`npm run test:ui` / `npm test`).
- **Rules of Engagement:**
  - Tests must never be reported as passing without executing them and observing output.
  - Zero tolerance for inline selectors in test specs (must live in page objects/components).
  - Clean separation between page objects and reusable components.
  - Never commit credentials or secrets.
  - Test convention changes require human approval.

## 8. Accepted Assumptions
- Target environment runs against live `https://automationexercise.com` by default (no local application server required).
- Unresolved convention details defer to local patterns in existing tests and components.

## 9. External Best Practices & Decisions
- None accepted (external research disabled per project directive).

## 10. Open Profile Gaps
- None. All required profile points confirmed.


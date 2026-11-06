---
name: implement-test
description: Implements Playwright test specs from a crafted test case table, adhering to page-object and component conventions, and verifies tests pass.
---

# Implement Test

## Purpose
Implement crafted test cases as Playwright specs that follow the fixture's conventions and verify execution.

## When to run
Run in the main conversation after `craft-test-cases` has produced its case table, using that table as the sole source of scenarios.

## Procedure
0. Verify the case table artifact (`Skill: craft-test-cases - output below`) is present in the conversation. If absent, stop and report the missing case table.
1. Implement every case from the table. If a case cannot be implemented due to an application defect or unsupported environment capability, document the reason as an explicit deviation.
2. Adhere to project conventions:
   - Page object placement: `docs/conventions/page-objects.md`
   - Component placement: `docs/conventions/components.md`
   - Locator and waiting standards: `docs/conventions/test-standards.md`
3. Verify static correctness:
   - Run `npm run typecheck`
   - Run `npm run lint`
   If errors exist, fix them before executing the test suite.
4. Run the implemented spec with `npx playwright test <spec-path>` and confirm it passes. If execution fails due to test implementation errors, iterate until it passes. If blocked by an application defect, report the defect as a deviation.
5. Report which spec file was created or changed and which case IDs it covers.
6. Emit the output artifact.

## Output Contract
Emit the implementation report as a visible artifact:
`Skill: implement-test - output below`

## Locator confirmation (Playwright MCP)
 
Before writing any locator into a spec file, confirm it against the live page:
 
1. Navigate to the page the scope names, then take an accessibility snapshot.
2. For every locator the scope supplies, check it two ways: find the element in the
   snapshot, and run the exact selector against the live DOM with `browser_evaluate`
   (`document.querySelectorAll('<selector>').length`). Report `confirmed` only when the
   count is exactly `1` and name the matching snapshot element; otherwise report
   `not found` with the count.
3. If a scope locator is absent from the first snapshot and the scope describes an
   interaction that would reveal it, perform that interaction, snapshot again, and
   re-check before reporting `not found`.
4. For a locator that is still `not found`, propose a replacement built from what a
   snapshot actually contains, and name the snapshot element it came from.
5. When a replacement cannot use the project's `data-qa` convention because the page
   exposes no such attribute, say so explicitly and put the replacement in the page
   object, never inline in the spec.
6. Write the spec using confirmed locators only, then save the locator report to
   `reports/locator-confirmation-<feature-slug>.md` as a table of
   `Scope locator | Result | Replacement | Snapshot element`. Report its path.
 
Never write a locator you did not confirm, and never report a locator as confirmed
without naming the snapshot element that matched it.

Include: the spec file path, the case IDs implemented, static verification status (typecheck/lint), test execution result (pass/fail), and any deviations from the case table.

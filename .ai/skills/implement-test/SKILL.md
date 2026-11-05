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

Include: the spec file path, the case IDs implemented, static verification status (typecheck/lint), test execution result (pass/fail), and any deviations from the case table.

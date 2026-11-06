# Produce Test Cases
 
## Purpose
Assemble the derived scenarios into the pipeline's deliverable: stable, implementable test cases and a coverage checklist that traces every rule to the case that covers it.
 
## When to run
Run as the final step of the craft-test-cases pipeline, on the derived-scenarios table.
 
## Procedure
1. Give each scenario a stable ID (`TC-1`, `TC-2`, …). For a parameterized scenario, keep one ID and list its parameter rows under it.
2. For each case, write: ID, title, pyramid level, numbered steps, exact expected result, and the test data and locators it uses. Use the concrete values from the requirement; do not invent them.
3. Build a coverage checklist — one row per rule from the parsed requirement — naming the case ID(s) that cover it and a one-line rationale. Mark any rule with no covering case as a gap.
4. Save the deliverable to `test-cases/<feature-slug>.md` as two sections, Test Cases and Coverage Checklist, so a later pipeline can load it by path.
5. Report the saved path, the case count, and any coverage gaps.
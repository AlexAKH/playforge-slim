# Apply Test Techniques
 
## Purpose
Derive the full set of test scenarios from a parsed requirement by applying explicit test-design techniques, then place each scenario at the right pyramid level and merge duplicates.
 
## When to run
Run as the second step of the craft-test-cases pipeline, on the parsed-requirement output. Do not run before the requirement is parsed.
 
## Procedure
1. Equivalence partitioning — for each input variable, split its values into classes the system treats alike (valid and invalid). Plan one scenario per class, not one per value.
2. Boundary value analysis — for every variable with an ordered range or threshold, add scenarios at the boundary and immediately on each side of it (for a `>= N` rule: `N-1`, `N`, `N+1`).
3. Decision table — when an outcome depends on more than one condition, tabulate the condition combinations and their expected outcome; add a scenario for every rule row, including combinations the prose did not spell out.
4. Check pyramid level — assign each scenario a level (unit, integration, or E2E) with a one-line reason. Push pure business-logic checks down; reserve E2E for scenarios that need the real browser flow. Flag any scenario sitting higher than it needs to.
5. Detect duplicates — when two scenarios differ only in input data and share steps and expected shape, merge them into one parameterized scenario and list its parameter rows.
6. Output a table: Scenario, Technique(s) that produced it, Pyramid level, Parameters (if any). Do not assign final IDs or write the checklist yet.
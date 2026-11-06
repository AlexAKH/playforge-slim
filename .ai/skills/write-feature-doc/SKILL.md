---
name: write-feature-doc
description: Creates or updates docs/features/<feature-slug>.md documenting requirements, test cases, coverage checklist, and implementation status.
---

# Write Feature Doc

## Purpose
Publish one feature's requirement, test cases, coverage checklist, and implementation status as a single addressable document, so any later task can load the whole feature by path.

## When to run
Run as the second step of the update-project-docs pipeline, after domain knowledge is updated and before the test index is refreshed.

## Procedure
1. Read the crafted test-case file and the requirement text it was produced from. When the request supplies no requirement text — a trigger-fired run usually supplies only the changed file — reuse the `Requirement` section of the existing `docs/features/<feature-slug>.md` verbatim. Ask the user only when neither source exists; never reconstruct a requirement from the test cases.
2. Write `docs/features/<feature-slug>.md`, opening it with the heading `# Feature — <Title>`, where `<Title>` is the feature slug with hyphens replaced by spaces and every word capitalized (`promo-code` → `Promo Code`). Then write these sections in order: `Requirement` (the source text verbatim), `Test Cases` (ID, title, level, expected result, test data), `Coverage Checklist` (rule → covering case IDs → rationale), `Implementation Status` (case → spec file and test name → `implemented` or `not implemented`).
3. Fill `Implementation Status` by searching the repository's test files for each case ID. Because IDs restart at `TC-1` in every test-case file, a hit counts only when the same spec file also names this feature — its slug, its feature-doc path, or the feature's own terms; treat a bare `TC-n` match inside another feature's spec as no match. Mark a case `implemented` only on a qualifying hit; never infer it from a similar test name or a matching description.
4. Treat the crafted file as the authority for case IDs and keep them byte-identical to it. On a re-run, regenerate every section from the current crafted file rather than preserving what an earlier version of the doc listed — a crafted file that gained a case is the normal path, not a mismatch. Report a mismatch only when the repository evidence disagrees with the crafted file: a spec that qualifies under step 3 and references a `TC-` id the crafted file does not define. A `TC-` id in a spec that belongs to another feature is not a mismatch. Never renumber either side to make them agree.
5. Report the file path, the case count, and every case marked `not implemented`.


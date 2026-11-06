# Update Test Index
 
## Purpose
Maintain `docs/test-index.md` as the single answer to "what is covered, and where does it live" for the whole repository.
 
## When to run
Run as the final step of the update-project-docs pipeline, after the feature doc is written.
 
## Procedure
1. Read `docs/test-index.md` and the feature doc just written. If the index does not exist, create it with the header row `| Feature | Feature doc | Cases | Implemented | Spec file(s) | Known gaps |`.
2. Upsert exactly one row for this feature, keyed by feature slug: replace the row in place if the slug is already present, otherwise append it. Never append a second row for a slug the index already lists.
3. Fill every column from the feature doc, never from memory and never by recounting the case table. Wrap every file path in a code span, matching the rows already in the index:
   - `Feature` — the feature title from the feature doc's heading.
   - `Feature doc` — `docs/features/<feature-slug>.md`.
   - `Cases` — the number of rows in the feature doc's `Implementation Status` section.
   - `Implemented` — how many of those rows read `implemented`.
   - `Spec file(s)` — the distinct spec paths named in `Implementation Status`; write `none` when no case is implemented.
   - `Known gaps` — every rule the feature doc's `Coverage Checklist` leaves uncovered; write `none` only when the checklist flags no gap.
4. Leave every other row byte-identical. Never delete or rewrite a row for a feature this run did not process.
5. Report the row written and the repository totals: features indexed, cases indexed, cases implemented.
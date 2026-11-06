# Update-Project-Docs Pipeline
 
## Responsibility
Propagate one saved test-case file into the project's documentation layers — business domain, feature doc, test index — so the landscape reflects the feature. This file orders the steps; each step's procedure lives in its own skill. It writes documentation only and never creates or edits test code.
 
## Input
The path of one saved test-case file (`test-cases/<feature-slug>.md`), plus the requirement text it was produced from and the feature's domain area when the caller has them. A trigger-fired run usually supplies only the changed file; the steps below recover the missing inputs from the documentation layers rather than inventing them.
 
## Sequence
1. Update domain knowledge — follow `.ai/skills/update-domain-knowledge/SKILL.md`; do not continue until the domain file path and its added terms are reported.
2. Write feature doc — follow `.ai/skills/write-feature-doc/SKILL.md`; do not continue until `docs/features/<feature-slug>.md` exists and its unimplemented case IDs are reported.
3. Update test index — follow `.ai/skills/update-test-index/SKILL.md`; the run ends when the feature's row is written and the repository totals are reported.
4. Close — follow `.ai/skills/task-complete/SKILL.md`; the run ends only when it returns `Status: closed`.
 
Never skip a step, reorder steps, or start a step before the previous step's output exists.


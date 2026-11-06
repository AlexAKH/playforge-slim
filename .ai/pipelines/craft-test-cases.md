# Craft-Test-Cases Pipeline
 
## Responsibility
Turn one feature requirement into structured, technique-derived test cases and a coverage checklist before any test code is written, then propagate them into the project's documentation layers. This file orders the steps; each step's procedure lives in the skill or pipeline that step names. Its saved output is the input to the create-test pipeline.
 
## Sequence
1. Parse requirement — follow `.ai/skills/parse-requirement/SKILL.md`; do not continue until the parsed lists and open questions exist.
2. Apply techniques — follow `.ai/skills/apply-test-techniques/SKILL.md`; do not continue until the derived-scenarios table (with technique, pyramid level, and parameters) exists.
3. Produce output — follow `.ai/skills/produce-test-cases/SKILL.md`; the run ends when the deliverable is saved to `test-cases/<feature-slug>.md` and its path is reported.
4. Update documentation — follow `.ai/pipelines/update-project-docs.md`, passing the saved test-case file path and the requirement text; the run ends when the test index reports the feature's row.
5. Close — follow `.ai/skills/task-complete/SKILL.md`; the run ends only when it returns `Status: closed`.

A nested pipeline is its own run and closes with its own gate. This pipeline's gate then checks this pipeline's request, not the nested run's.
 
Never skip a step, reorder steps, or start a step before the previous step's output exists. This pipeline writes no test code.


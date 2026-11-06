# Create-Test Pipeline

## Responsibility
Sequence the creation of a new test from request to verified closure. This pipeline defines step order and artifact validation gates; each step's execution procedure lives in its own skill or agent.

## Sequence
1. **Clarify test scope** — follow `.ai/skills/clarify-test-scope/SKILL.md`. Before advancing, verify the output artifact `Skill: clarify-test-scope - output below` is present in the conversation.
2. **Load crafted test cases** — read the `test-cases/<feature-slug>.md` file named in the request; do not continue until its case table is loaded. If the request names no crafted file, run the craft-test-cases pipeline first (`.ai/pipelines/craft-test-cases.md`) — create-test does not derive scenarios itself.
3. **Implement test** — follow `.ai/skills/implement-test/SKILL.md`. Before advancing, verify the output artifact `Skill: implement-test - output below` is present in the conversation.
4. Lint — run the project's `lint` script. Report the command and its result. Any error stops the run.
5. Type check — run the project's `typecheck` script. Report the command and its result. Any error stops the run.
6. Review — run the agent at `instructions/agents/test-judge.md` on the produced spec; it scores against `instructions/rubrics/test-quality.md` and returns a verdict table plus one overall verdict line. Save that table and verdict line, unedited, to `reviews/<feature-slug>-verdict.md` and report the path. An overall verdict of `fail` stops the run before the closing step.
7. Close — follow `.ai/skills/task-complete/SKILL.md`; the run ends only when it returns `Status: closed`.

## Rules
- Never skip a step, reorder steps, or start a step before the previous step's output artifact exists.
- If a step fails its validation gate, stop and resolve the failure within that step before advancing.

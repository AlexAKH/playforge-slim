# Create-Test Pipeline

## Responsibility
Sequence the creation of a new test from request to verified closure. This pipeline defines step order and artifact validation gates; each step's execution procedure lives in its own skill or agent.

## Sequence
1. **Clarify test scope** — follow `.ai/skills/clarify-test-scope/SKILL.md`. Before advancing, verify the output artifact `Skill: clarify-test-scope - output below` is present in the conversation.
2. **Load crafted test cases** — read the `test-cases/<feature-slug>.md` file named in the request; do not continue until its case table is loaded. If the request names no crafted file, run the craft-test-cases pipeline first — create-test does not derive scenarios itself.
3. **Implement test** — follow `.ai/skills/implement-test/SKILL.md`. Before advancing, verify the output artifact `Skill: implement-test - output below` is present in the conversation.
4. **Review test** — run `.ai/agents/test-reviewer.md` in an isolated context on the changed spec file, providing the confirmed scope artifact (`Skill: clarify-test-scope - output below`). Before advancing, verify the output artifact `Agent: test-reviewer - output below` is present in the conversation and the verdict is `approve`.
5. **Close task** — follow `.ai/skills/task-complete/SKILL.md`. Before declaring completion, verify the output artifact `Skill: task-complete - output below` is present in the conversation.

## Rules
- Never skip a step, reorder steps, or start a step before the previous step's output artifact exists.
- If a step fails its validation gate, stop and resolve the failure within that step before advancing.

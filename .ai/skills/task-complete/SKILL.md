---
name: task-complete
description: Verifies all pipeline outputs and reports final closure for non-trivial routed work.
---

# Task Complete

## Purpose
Close a pipeline or routed task run only when the result verifiably meets the original request.

## When to run
Run as the final closure step of any non-trivial routed work, after all required task steps have produced their output.

## Procedure
1. Identify the executed workflow:
   - For `create-test`: verify the complete artifact chain (`Skill: clarify-test-scope`, `Skill: craft-test-cases`, `Skill: implement-test`, `Agent: test-reviewer`) is visible in the conversation.
   - For instruction additions or capability evaluation: verify the evaluation report (`Agent: instruction-evaluator`) is visible with an approved verdict.
   - For other routed workflows: verify that each step planned during routing produced its required output artifact.
   If required artifacts are missing, refuse closure and hand back to the step that owns the missing artifact.
2. Restate the original request in one sentence.
3. Check workflow-specific verification criteria:
   - For test creation: verify every crafted case ID is covered in the implemented spec, the spec passed execution, and `test-reviewer` returned `approve`.
   - For instruction changes: verify `instruction-evaluator` findings are resolved.
4. If any check fails, refuse closure, name the failing check, and return to the step that owns it.
5. If all checks pass, produce the closure table and declare the task complete.

## Output Contract
Emit the closure table as a visible artifact: 
`Skill: task-complete - output below`

Use exactly this three-column table:
| Step | Skill / Agent | Comment |
|------|---------------|---------|

Every executed step must appear as a row. Skipped steps must appear with an explanation. The Comment column must reference each step's output artifact label. Do not add extra columns.

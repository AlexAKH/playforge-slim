---
name: task-complete
description: Formats and outputs the mandatory closure report table at the end of non-trivial routed work.
---

# Task Complete

## Purpose
Provide canonical completion reporting for non-trivial routed work.

## When to run
Run as the centralized final step of non-trivial routed work before declaring completion.

## Rules
1. Scoped strictly to non-trivial routed work.
2. Report actual execution, not an idealized plan.
3. Every executed step must appear as a row in the closure table.
4. If a planned step was skipped, include it and state why in `Comment`.
5. Leave `Comment` blank unless a step was skipped, execution deviated, or something incomplete/unusual occurred.
6. Closure only: do not invent new steps or reopen orchestration.

## Output Format
Produce a Markdown table with exactly these columns:

| Step | Skill / Agent | Comment |
|------|---------------|---------|


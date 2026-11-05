---
name: craft-test-cases
description: Turns a confirmed test scope into structured, technique-derived test cases before test implementation begins.
---

# Craft Test Cases

## Purpose
Turn a confirmed test scope into structured, technique-derived test cases and a case table before any test code is written.

## When to run
Run in the main conversation after `clarify-test-scope` has produced its confirmed scope, using that scope as the source of requirements.

## Procedure
0. Verify the confirmed scope artifact (`Skill: clarify-test-scope - output below`) is present in the conversation. If absent, stop and report the missing scope.
1. Parse the requirements from the confirmed scope: identify target URL, preconditions, valid and invalid input sets, and expected assertions.
2. Select and apply test design techniques appropriate to the inputs and workflow:
   - Equivalence Partitioning for discrete valid/invalid sets (e.g. credentials, formats).
   - Boundary Value Analysis for numeric, length, or boundary constraints.
   - State Transition Testing for multi-step workflows (e.g. login -> logout -> re-login).
3. Derive the structured test cases table with columns: `Case ID`, `Title`, `Type`, `Level`, `Preconditions`, `Steps`, and `Expected Result`.
4. If a target file path `test-cases/<feature-slug>.md` is specified in the confirmed scope or user prompt, save the crafted cases there.
5. Emit the output artifact.

## Output Contract
Emit the crafted test cases as a visible artifact:
`Skill: craft-test-cases - output below`

Include: the test case table (`Case ID`, `Title`, `Type`, `Level`, `Preconditions`, `Steps`, `Expected Result`) and the applied test design techniques.

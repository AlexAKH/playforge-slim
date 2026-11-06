# Task Complete
 
## Purpose
Decide whether a pipeline run may close. This is the mandatory final gate for every pipeline: it checks the produced result against the original request and the run's open findings, and it refuses closure when any check fails.
 
## When to run
Run as the final step of every pipeline run, after every earlier step has produced its output, and before any message that reports the task as done.
 
## Input
- The original request, verbatim.
- The steps the run executed, in order, with what each invoked.
- The paths of the artifacts the run produced.
- Every finding from the run's review step, with its status.
 
## Procedure
1. Restate the original request in one sentence, then list every behavior, case ID, and checklist item it requires. Build this list from the request and the run's own design artifact — never from the implementing step's summary of what it did.
2. Run all four checks below. For each, record the evidence you opened: a file path plus the line, table row, or case ID you read there. A check with no evidence is a failed check, not a passed one.
   | # | Check | Passes when |
   | --- | --- | --- |
   | 1 | Requirement coverage | Every behavior the request named is traceable to a produced artifact |
   | 2 | Case coverage | Every case ID in the run's design artifact appears in the implementation |
   | 3 | Review findings | The review step returned a verdict and no finding is left open |
   | 4 | Artifact existence | Every path the run reported exists and contains what the report claimed |
3. Never accept a step's own report as evidence for its own check. "All cases implemented" is a claim; the spec file naming each case ID is evidence.
4. If every check passes, close: report the table from step 2 and the line `Status: closed`.
5. If any check fails, refuse: report the table, list only the failing checks, and for each name the step that owns the fix and the smallest correction that would pass it. End with the line `Status: refused`. Do not fix anything yourself and do not close a run you refused.
6. After a correction, re-run all four checks, not only the failed ones — a correction can break a check that passed.
7. Refuse at most three times for one run. On the third refusal, stop the run and escalate to the user with the outstanding checks; a loop that will not converge is a design problem, not a retry problem.
 
## Output
1. The run report, built from the step list in the Input: a table of `Step`, `Invoked items`, `Status`. This is a record of what the run did, never evidence for any check below.
2. The gate table: `Check`, `Result`, `Evidence`, `Required action` — one row per check.
3. One final line: `Status: closed` or `Status: refused`.
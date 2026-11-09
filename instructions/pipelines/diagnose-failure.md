# Pipeline — Diagnose Failure
 
## Purpose
Turn a failing test into a diagnosed cause, an approved fix, and a verified repair.
 
## Inputs
- The path of the failing spec file.
- The command that produced the failure, and its output verbatim.
 
## Sequence
 
1. Investigate — reproduce first, then gather evidence. Re-run the supplied command
   and record its result. If the test passes, stop and report that: a failure nobody
   can reproduce is not diagnosed. Read the spec and every page object it imports.
   Open the page the spec navigates to, take an accessibility snapshot, and check each
   locator the spec uses against the live DOM, recording the match count for each.
   Write the findings to `reports/diagnosis-<slug>.md` as a table of
   `Locator | Match count | Snapshot element or absent`. Name the single most likely
   cause and state what rules out the alternatives. Report the file path.
 
2. Plan — propose exactly one fix, then stop. State the cause, the exact files and
   lines to change, what each change will be, and what will deliberately not change.
   Name the one observation that would prove the fix worked. Hand this to a person and
   wait. Do not edit any file before approval.
 
3. Act — apply the approved plan and nothing else. Change only the files the plan
   named. Report every change as `file:line`, before and after. If the work shows the
   plan was wrong, stop and return to step 2; do not improvise a second fix.
 
4. Verify — re-run the exact command from step 1 and report its output. Confirm the
   observation step 2 named. Then run the `task-complete` gate.
 
## Stopping conditions
- Step 1 cannot reproduce the failure — stop and report.
- Step 2's plan is not approved — stop.
- Step 4's re-run still fails — return to step 1 with the new output. Do not close.
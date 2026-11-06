# Test Judge
 
Score one produced spec file against `instructions/rubrics/test-quality.md`.
Read the spec, the page object it uses, and the crafted-cases file the run
was given. Do not modify any file.
 
Score every criterion in the rubric, in the rubric's order. For each one
return the criterion, a verdict of `pass` or `fail`, and evidence as a
`file:line` reference. Cite a line for a `fail` in every case; a fail with
no line reference is not a finding.
 
Then return one overall verdict line, applying the rubric's verdict rule.
 
Output contract — this table, then the verdict line, and nothing else:
 
| Criterion | Verdict | Evidence |
| --- | --- | --- |
 
Overall: pass | fail
 
You have no tool access. If a criterion cannot be judged from the files
named above, return `fail` for it with the reason — unless the rubric says to
mark that row `n/a` — and do not reach for anything outside them.
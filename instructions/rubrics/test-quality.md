# Rubric — Test Quality
 
Score the produced spec file against every criterion below. One row per
criterion, no criterion skipped, no criterion invented.
 
| # | Criterion | Passes when |
| --- | --- | --- |
| 1 | Assertions name the requirement they defend | Each assertion's failure message or test title states the rule being checked, not the mechanic being performed |
| 2 | Test data is declared once | Credentials, URLs, and expected values appear once in the spec and are referenced, not repeated per test |
| 3 | Locators live in the page object | The spec file contains no raw selector string; every element is reached through a page-object member |
| 4 | Failure output identifies the broken requirement | A reader of the failure alone can name which requirement broke, without opening the spec |
| 5 | The spec covers the crafted cases it was given | Every case ID in the crafted-cases file appears in the spec, and the spec adds no scenario absent from that file. When the run supplied no crafted-cases file, mark this row `n/a` |
 
## Verdict rule
 
Return `pass` only when every scored criterion passes. Any `fail` makes the
overall verdict `fail`. A row marked `n/a` is not scored. Never return an
overall verdict of `pass` with a failing row.
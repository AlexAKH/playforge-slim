# Feature — Login Lockout

## Requirement
- Valid credentials sign the shopper in
- A wrong password is rejected with a message
- Five consecutive failures lock the account
- A locked account refuses even the correct password

## Test Cases
| ID | Title | Level | Expected result | Test data |
| --- | --- | --- | --- | --- |
| TC-1 | Valid credentials sign the shopper in | E2E | The account menu (`data-qa="account-menu"`) is visible | `lockout-a@test.example` / `test_course` |
| TC-2 | A wrong password is rejected | E2E | `data-qa="login-error"` reads `Your email or password is incorrect!` | `lockout-b@test.example` / `wrong_password` |
| TC-3 | Five consecutive wrong passwords lock the account | E2E | `data-qa="login-lockout"` reads `Account locked. Try again in 15 minutes.` | `lockout-c@test.example` / `wrong_password` |
| TC-4 | A locked account refuses the correct password | E2E | `data-qa="login-lockout"` reads `Account locked. Try again in 15 minutes.` and the account menu is not visible | `lockout-d@test.example` / `wrong_password`, then `test_course` |

## Coverage Checklist
| Rule | Covered by | Rationale |
| --- | --- | --- |
| Valid credentials sign the shopper in | TC-1 | Happy path asserted on the account menu |
| A wrong password is rejected with a message | TC-2 | Exact message text asserted |
| Five consecutive failures lock the account | TC-3 | Boundary of the lockout rule |
| A locked account refuses even the correct password | TC-4 | The lock must outrank valid credentials |

## Implementation Status
| Case | Spec file and test name | Status |
| --- | --- | --- |
| TC-1 | `tests/lockout.spec.ts` — valid credentials sign the shopper in | implemented |
| TC-2 | `tests/lockout.spec.ts` — a wrong password is rejected | implemented |
| TC-3 | `tests/lockout.spec.ts` — five consecutive wrong passwords lock the account | implemented |
| TC-4 | `tests/lockout.spec.ts` — a locked account refuses the correct password | implemented |


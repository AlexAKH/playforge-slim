# Test Cases — Sign-in Lockout
 
## Test Accounts
Every case uses its own account, so no case depends on state another case left behind. All four share the password `test_course`; the wrong password is always `wrong_password`.
 
| Account | Used by |
| --- | --- |
| `lockout-a@test.example` | TC-1 |
| `lockout-b@test.example` | TC-2 |
| `lockout-c@test.example` | TC-3 |
| `lockout-d@test.example` | TC-4 |
 
## Test Cases
| ID | Title | Level | Steps | Expected result | Test data |
| --- | --- | --- | --- | --- | --- |
| TC-1 | Valid credentials sign the shopper in | E2E | Open `/login`, submit valid credentials | The account menu (`data-qa="account-menu"`) is visible | `lockout-a@test.example` / `test_course` |
| TC-2 | A wrong password is rejected | E2E | Open `/login`, submit a wrong password | `data-qa="login-error"` reads `Your email or password is incorrect!` | `lockout-b@test.example` / `wrong_password` |
| TC-3 | Five consecutive wrong passwords lock the account | E2E | Open `/login`, submit a wrong password five times | `data-qa="login-lockout"` reads `Account locked. Try again in 15 minutes.` | `lockout-c@test.example` / `wrong_password` |
| TC-4 | A locked account refuses the correct password | E2E | Open `/login`, lock the account with five wrong passwords, then submit the correct password | `data-qa="login-lockout"` reads `Account locked. Try again in 15 minutes.` and the account menu is not visible | `lockout-d@test.example` / `wrong_password`, then `test_course` |
 
## Coverage Checklist
| Rule | Covered by | Rationale |
| --- | --- | --- |
| Valid credentials sign the shopper in | TC-1 | Happy path asserted on the account menu |
| A wrong password is rejected with a message | TC-2 | Exact message text asserted |
| Five consecutive failures lock the account | TC-3 | Boundary of the lockout rule |
| A locked account refuses even the correct password | TC-4 | The lock must outrank valid credentials |
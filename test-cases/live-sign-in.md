# Test Cases — Live Sign-In Error
 
## Test Cases
| ID | Title | Level | Steps | Expected result | Test data |
| --- | --- | --- | --- | --- | --- |
| TC-1 | A wrong password is rejected with a message | E2E | Open `/login`, fill `data-qa="login-email"` and `data-qa="login-password"`, click `data-qa="login-submit"` | `data-qa="login-error"` reads `Your email or password is incorrect!` | `test_epam_course@test.com` / `wrong_password` |
 
## Coverage Checklist
| Rule | Covered by | Rationale |
| --- | --- | --- |
| A wrong password is rejected with a message | TC-1 | Exact message text asserted on the live page |
# Feature — Authentication
 
## Requirement
A shopper signs in with valid credentials and signs out again. After sign-out the login form is visible. Signing in with a wrong password shows the error `Your email or password is incorrect!`.
 
## Test Cases
| ID | Title | Level | Expected result | Test data |
| --- | --- | --- | --- | --- |
| TC-1 | Sign in and sign out | E2E | Login form (`data-qa="login-form"`) visible after sign-out | `test_epam_course@test.com` / `test_course` |
| TC-2 | Wrong password rejected | E2E | `data-qa="login-error"` reads `Your email or password is incorrect!` | `test_epam_course@test.com` / `wrong_password` |
 
## Coverage Checklist
| Rule | Covered by | Rationale |
| --- | --- | --- |
| Valid credentials sign the shopper in | TC-1 | Happy path through the real form |
| Sign-out returns to the login form | TC-1 | Asserted at the end of the same flow |
| Wrong password is rejected with a message | TC-2 | Exact message text asserted |
 
## Implementation Status
| Case | Spec file and test name | Status |
| --- | --- | --- |
| TC-1 | `tests/auth.spec.ts` — sign in and sign out | implemented |
| TC-2 | `tests/auth.spec.ts` — wrong password | implemented |
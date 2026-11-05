# Feature: Authentication (Login, Logout, Invalid Login)

## Parsed Requirement
- Requirement: User logs in with valid credentials, logs out, verifies login form is visible again, and then logging in with an invalid password displays an error message.
- Target URL: `/login` (unauthenticated).
- Valid Credentials: `test_epam_course@test.com` / `test_course`.
- Invalid Credentials: `test_epam_course@test.com` / `wrong_password`.
- Negative Case in Scope: Invalid password shows `Your email or password is incorrect!`.
- Element Locators:
  - Login form: `data-qa="login-form"` (fallback/match `.login-form`)
  - Error message: `data-qa="login-error"` (fallback/match `.login-form p`)

## Applied Techniques
- Equivalence Partitioning: Valid authentication partition vs. Invalid credentials partition.
- State Transition Testing: Unauthenticated -> Authenticated -> Logged Out (Unauthenticated) -> Failed Login (Unauthenticated with Error).

## Test Cases

| Case ID | Title | Type | Level | Preconditions | Steps | Expected Result |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| AUTH-001 | User can log in with valid credentials and log out successfully | Positive / Functional | UI (E2E) | User is not authenticated; browser is on `/login` | 1. Enter valid email and password<br>2. Click Login<br>3. Verify user is logged in<br>4. Click Logout | User is logged out and the login form is visible again |
| AUTH-002 | Logging in with wrong password shows error message | Negative / Functional | UI (E2E) | User is on `/login` and unauthenticated | 1. Enter valid email and invalid password<br>2. Click Login | Login fails, login form remains, and error message 'Your email or password is incorrect!' is displayed |


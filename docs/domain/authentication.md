# Domain — Authentication

## Actors
- **Shopper** — can attempt to sign in to their account with credentials.

## Terms
- **Valid credentials** — the correct email and password combination that authenticates the shopper.
- **Wrong password** — an incorrect password entered during a sign-in attempt.
- **Lockout threshold** — the boundary of five consecutive failed sign-in attempts.
- **Locked account** — an account state that prohibits sign-in for 15 minutes after reaching the lockout threshold.

## Rules
- Valid credentials submitted → shopper is signed in and account menu is visible.
- Wrong password submitted before reaching lockout threshold → sign-in is rejected with message "Your email or password is incorrect!".
- Five consecutive wrong passwords submitted → account is locked and message "Account locked. Try again in 15 minutes." is displayed.
- Password submitted for a locked account → sign-in is rejected with message "Account locked. Try again in 15 minutes." and account menu is not visible.

## Open questions
- None recorded.


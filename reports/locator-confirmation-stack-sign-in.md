# Locator Confirmation — stack-sign-in

| Scope locator | Result | Replacement | Snapshot element |
| --- | --- | --- | --- |
| `[data-qa="login-email"]` | confirmed | None (`[data-qa="login-email"]`) | `textbox "Email Address"` |
| `[data-qa="login-password"]` | confirmed | None (`[data-qa="login-password"]`) | `textbox "Password"` |
| `[data-qa="login-submit"]` | not found (count 0) | `[data-qa="login-button"]` | `button "Login"` |
| `[data-qa="login-error"]` | not found (count 0) | `.login-form p` | `paragraph: Your email or password is incorrect!` |

### Notes
- The page exposes `data-qa="login-button"` on the login button rather than `data-qa="login-submit"`.
- The live page renders the error message `<p style="color: red;">Your email or password is incorrect!</p>` inside `.login-form` without a `data-qa` attribute. The replacement selector `.login-form p` is placed in the page object (`StackSignInPage`), adhering to project conventions.


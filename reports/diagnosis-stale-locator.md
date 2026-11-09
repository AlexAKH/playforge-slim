# Diagnosis — stale-locator

## Reproduction
- Command: `npx playwright test tests/stale-locator.spec.ts`
- Result after fixing button selector to `[data-qa="login-button"]`: Failed with timeout on `locator.click`:
  `<div class="fc-dialog-overlay"></div> from <div class="fc-consent-root">…</div> subtree intercepts pointer events`

## Locator Findings
Target URL: `https://automationexercise.com/login`

| Locator | Match count | Snapshot element or absent |
| --- | --- | --- |
| `[data-qa="login-email"]` | 1 | `textbox "Email Address"` |
| `[data-qa="login-password"]` | 1 | `textbox "Password"` |
| `[data-qa="login-button"]` | 1 | `button "Login"` (present, but click intercepted by consent modal overlay) |
| `[data-qa="login-error"]` | 0 | absent (live page renders error in `<p>` inside `.login-form` without `data-qa="login-error"`) |
| `role=dialog[name="This site asks for consent to use your data"]` | 1 | `dialog "This site asks for consent to use your data"` |

## Most Likely Cause
The click on `[data-qa="login-button"]` times out because the cookie consent modal dialog overlay (`.fc-dialog-overlay`) intercepts pointer events. Furthermore, the downstream assertion locator `[data-qa="login-error"]` is stale/absent in the live DOM, where the error is rendered as `.login-form p`.

## Ruling Out Alternatives
- **Missing button selector:** Ruled out because `[data-qa="login-button"]` was resolved to `<button type="submit" data-qa="login-button" class="btn btn-default">Login</button>`.
- **Network failure during form submit:** Ruled out because the click action never dispatched due to pointer interception by the overlay.

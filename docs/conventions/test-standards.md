# Test Standards

## Locator Conventions
- Prefer `data-qa` attributes for element locators when available.
- All selectors must live in page objects (`pages/`) or components (`pages/components/`), never inline in test spec files.

## Waiting and Synchronization
- Use condition-based waits only (e.g. Playwright auto-waiting, `toBeVisible()`, `waitFor()`).
- Fixed sleeps (`page.waitForTimeout()`) are prohibited as they introduce test flakiness.


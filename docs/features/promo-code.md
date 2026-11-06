# Feature — Promo Code
 
## Requirement
- The checkout page has a promo-code field (data-qa="promo-input"), an Apply
  button (data-qa="promo-apply"), a message line (data-qa="promo-message"),
  and an order-total line (data-qa="order-total") showing the current total.
- A valid code (SAVE10) applied when the order subtotal is >= $50 gives 10% off
  the subtotal: order-total updates to the discounted total and promo-message
  shows "Promo code applied: 10% off."
- A valid code applied when the subtotal is < $50 is rejected with the message
  "Minimum order of $50 required."
- An expired code (SAVE10OLD) or an unknown code (FOOBAR) shows the message
  "This promo code is not valid."
- Applying with the field empty shows the message "Enter a promo code."
- Applying a second code replaces the first; only one discount is ever active.
 
## Test Cases
| ID | Title | Level | Expected result | Test data |
| --- | --- | --- | --- | --- |
| TC-1 | Successfully apply valid promo code with qualifying subtotal | UI (E2E) | `data-qa="promo-message"` displays "Promo code applied: 10% off.", `data-qa="order-total"` updates to "$90.00" | Subtotal: $100.00, Promo Code: `SAVE10` |
| TC-2 | Subtotal threshold boundary value analysis for valid promo code | UI (E2E) | Message and order total update according to threshold: $49.99 rejected ("$49.99"), $50.00 discounted ("$45.00"), $50.01 discounted ("$45.01") | Promo Code: `SAVE10`, Subtotals: $49.99, $50.00, $50.01 |
| TC-3 | Reject valid promo code when order subtotal is below minimum | UI (E2E) | `data-qa="promo-message"` displays "Minimum order of $50 required.", `data-qa="order-total"` remains unchanged at "$30.00" | Subtotal: $30.00, Promo Code: `SAVE10` |
| TC-4 | Reject expired or unknown promo codes (Parameterized) | UI (E2E) | `data-qa="promo-message"` displays "This promo code is not valid.", `data-qa="order-total"` remains undiscounted at "$60.00" | Subtotal: $60.00, Promo Codes: `SAVE10OLD`, `FOOBAR` |
| TC-5 | Reject submission when promo code field is empty | UI (E2E) | `data-qa="promo-message"` displays "Enter a promo code.", `data-qa="order-total"` remains unchanged at "$60.00" | Subtotal: $60.00, Promo Code: `""` |
| TC-6 | Applying a second promo code replaces the first active code | UI (E2E) | Second code replaces first code; only one discount is active on `data-qa="order-total"` | Subtotal: $100.00, Promo Codes: `SAVE10`, `SAVE20` |
| TC-7 | Apply promo code entered with leading and trailing spaces | UI (E2E) | `data-qa="promo-message"` displays "Promo code applied: 10% off.", `data-qa="order-total"` updates to "$54.00" | Subtotal: $60.00, Promo Code: `" SAVE10 "` |
 
## Coverage Checklist
| Rule | Covered by | Rationale |
| --- | --- | --- |
| Valid code (`SAVE10`) applied with subtotal >= $50 gives 10% off subtotal, updates order-total to discounted total, and shows "Promo code applied: 10% off." | TC-1, TC-2 | Verifies successful application on standard and threshold values ($50, $50.01, $100) |
| Valid code applied when subtotal is < $50 is rejected with message "Minimum order of $50 required." | TC-2, TC-3 | Verifies rejection on boundary ($49.99) and nominal sub-threshold amount ($30.00) |
| Expired code (`SAVE10OLD`) shows message "This promo code is not valid." | TC-4 | Verifies rejection and exact error message for expired code parameter |
| Unknown code (`FOOBAR`) shows message "This promo code is not valid." | TC-4 | Verifies rejection and exact error message for unknown code parameter |
| Applying with the field empty shows message "Enter a promo code." | TC-5 | Verifies empty input validation message and ensures order-total is unchanged |
| Applying a second code replaces the first; only one discount is ever active. | TC-6 | Verifies replacement behavior and prevents compounding multiple discounts |
| Code entered with leading and trailing spaces is trimmed and treated as valid code (`SAVE10`), giving 10% off when subtotal >= $50. | TC-7 | Verifies whitespace trimming on promo code input |
 
## Implementation Status
| Case | Spec file and test name | Status |
| --- | --- | --- |
| TC-1 | `tests/ui/promo-code.spec.ts` — TC-1: apply valid promo code with subtotal greater than or equal to $50 @ui | implemented |
| TC-2 | `tests/ui/promo-code.spec.ts` — TC-2: subtotal threshold boundary value analysis for valid promo code @ui | implemented |
| TC-3 | `tests/ui/promo-code.spec.ts` — TC-3: reject valid promo code when order subtotal is below minimum @ui | implemented |
| TC-4 | `tests/ui/promo-code.spec.ts` — TC-4: reject expired or unknown promo codes (parameterized) @ui | implemented |
| TC-5 | `tests/ui/promo-code.spec.ts` — TC-5: reject submission when promo code field is empty @ui | implemented |
| TC-6 | `tests/ui/promo-code.spec.ts` — TC-6: apply second promo code replacing existing active discount @ui | implemented |
| TC-7 | — | not implemented |


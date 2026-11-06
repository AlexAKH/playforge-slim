# Test Cases: Apply Promo Code at Checkout

## Test Cases

### TC-1: Apply valid promo code with subtotal greater than or equal to $50
- **Pyramid Level:** UI (E2E) — verifies browser checkout UI interaction, promo field submission, and real-time total updates.
- **Preconditions:** Checkout page is loaded with an order subtotal >= $50.00.
- **Test Data:**
  - Subtotal: $50.00 (boundary) / $100.00 (nominal)
  - Promo code: `SAVE10`
- **Locators:**
  - Promo input: `[data-qa="promo-input"]`
  - Apply button: `[data-qa="promo-apply"]`
  - Message line: `[data-qa="promo-message"]`
  - Order total: `[data-qa="order-total"]`
- **Steps:**
  1. Navigate to the checkout page with cart subtotal of $50.00 (or $100.00).
  2. Observe the current total in `[data-qa="order-total"]`.
  3. Enter `SAVE10` into `[data-qa="promo-input"]`.
  4. Click `[data-qa="promo-apply"]`.
- **Expected Result:**
  - `[data-qa="promo-message"]` displays `"Promo code applied: 10% off."`.
  - `[data-qa="order-total"]` updates to the 10% discounted total ($45.00 for $50.00 subtotal, $90.00 for $100.00 subtotal).

---

### TC-2: Apply valid promo code when order subtotal is below minimum threshold ($50)
- **Pyramid Level:** UI (E2E) — verifies boundary rejection behavior and visual user feedback in checkout flow.
- **Preconditions:** Checkout page is loaded with an order subtotal < $50.00 (e.g., $49.00).
- **Test Data:**
  - Subtotal: $49.00 (boundary: N-1)
  - Promo code: `SAVE10`
- **Locators:**
  - Promo input: `[data-qa="promo-input"]`
  - Apply button: `[data-qa="promo-apply"]`
  - Message line: `[data-qa="promo-message"]`
  - Order total: `[data-qa="order-total"]`
- **Steps:**
  1. Navigate to the checkout page with cart subtotal of $49.00.
  2. Enter `SAVE10` into `[data-qa="promo-input"]`.
  3. Click `[data-qa="promo-apply"]`.
- **Expected Result:**
  - `[data-qa="promo-message"]` displays `"Minimum order of $50 required."`.
  - `[data-qa="order-total"]` remains unchanged at $49.00.

---

### TC-3: Apply invalid promo code (Expired or Unknown) [Parameterized]
- **Pyramid Level:** UI (E2E) — verifies error handling for non-applicable codes on the checkout page.
- **Preconditions:** Checkout page is loaded with items in cart.
- **Parameters:**
  | Row | Promo Code | Code Type | Description |
  | :--- | :--- | :--- | :--- |
  | 1 | `SAVE10OLD` | Expired | Valid format but expired promotion |
  | 2 | `FOOBAR` | Unknown | Unrecognized/non-existent promo code |
- **Test Data:** Promo codes `SAVE10OLD`, `FOOBAR`
- **Locators:**
  - Promo input: `[data-qa="promo-input"]`
  - Apply button: `[data-qa="promo-apply"]`
  - Message line: `[data-qa="promo-message"]`
  - Order total: `[data-qa="order-total"]`
- **Steps:**
  1. Navigate to the checkout page.
  2. Enter `<Promo Code>` into `[data-qa="promo-input"]`.
  3. Click `[data-qa="promo-apply"]`.
- **Expected Result:**
  - `[data-qa="promo-message"]` displays `"This promo code is not valid."`.
  - `[data-qa="order-total"]` remains unchanged.

---

### TC-4: Apply promo code with empty input field
- **Pyramid Level:** UI (E2E) — verifies client-side empty submission validation and warning message.
- **Preconditions:** Checkout page is loaded.
- **Test Data:** Promo code `""` (empty string).
- **Locators:**
  - Promo input: `[data-qa="promo-input"]`
  - Apply button: `[data-qa="promo-apply"]`
  - Message line: `[data-qa="promo-message"]`
  - Order total: `[data-qa="order-total"]`
- **Steps:**
  1. Navigate to the checkout page.
  2. Ensure `[data-qa="promo-input"]` is empty.
  3. Click `[data-qa="promo-apply"]`.
- **Expected Result:**
  - `[data-qa="promo-message"]` displays `"Enter a promo code."`.
  - `[data-qa="order-total"]` remains unchanged.

---

### TC-5: Apply a second promo code replacing existing active discount
- **Pyramid Level:** UI (E2E) — verifies single active discount rule and replacement behavior during checkout.
- **Preconditions:** Checkout page is loaded with order subtotal >= $50.00 (e.g., $100.00). An active promo discount is already applied.
- **Test Data:**
  - Initial promo code: `SAVE10` (10% off)
  - Replacement promo code: Valid second code (or re-applying replacement discount code)
- **Locators:**
  - Promo input: `[data-qa="promo-input"]`
  - Apply button: `[data-qa="promo-apply"]`
  - Message line: `[data-qa="promo-message"]`
  - Order total: `[data-qa="order-total"]`
- **Steps:**
  1. Navigate to the checkout page with subtotal of $100.00.
  2. Enter `SAVE10` into `[data-qa="promo-input"]` and click `[data-qa="promo-apply"]`.
  3. Verify `[data-qa="order-total"]` reflects 10% discount ($90.00) and message shows `"Promo code applied: 10% off."`.
  4. Enter a second valid promo code into `[data-qa="promo-input"]`.
  5. Click `[data-qa="promo-apply"]`.
- **Expected Result:**
  - Second promo code replaces the first discount; only one discount is active (no discount stacking).
  - `[data-qa="order-total"]` updates reflecting only the replacement discount.
  - `[data-qa="promo-message"]` updates to confirm the replacement promo code.

---

## Coverage Checklist

| Rule ID | Rule Statement | Covering Case ID(s) | Rationale |
| :--- | :--- | :--- | :--- |
| R1 | Valid code (`SAVE10`) applied with subtotal >= $50 gives 10% off; `order-total` updates; message shows "Promo code applied: 10% off." | TC-1 | Validates calculation of 10% discount, boundary subtotal $50, and UI updates for total & message. |
| R2 | Valid code applied with subtotal < $50 rejected with message "Minimum order of $50 required." | TC-2 | Validates boundary value ($49.00 < $50.00) rejection and exact error message. |
| R3 | Expired code (`SAVE10OLD`) shows message "This promo code is not valid." | TC-3 (Row 1) | Validates expired code rejection and exact error message. |
| R4 | Unknown code (`FOOBAR`) shows message "This promo code is not valid." | TC-3 (Row 2) | Validates unknown/invalid code rejection and exact error message. |
| R5 | Applying with empty field shows message "Enter a promo code." | TC-4 | Validates submission of empty promo code field. |
| R6 | Applying second code replaces first; only one discount is ever active | TC-5 | Validates state transition from one applied code to another, ensuring non-stacking. |


# Feature: Apply a promo code at checkout

## Test Cases

### TC-1: Successfully apply valid promo code with qualifying subtotal
- **Pyramid Level:** UI (E2E)
- **Test Data:**
  - Subtotal: $100.00
  - Promo Code: `SAVE10`
- **Locators:**
  - Promo input: `[data-qa="promo-input"]`
  - Apply button: `[data-qa="promo-apply"]`
  - Promo message: `[data-qa="promo-message"]`
  - Order total: `[data-qa="order-total"]`
- **Steps:**
  1. Navigate to the checkout page with cart items totaling $100.00 subtotal.
  2. Verify initial `[data-qa="order-total"]` displays "$100.00".
  3. Enter "SAVE10" into `[data-qa="promo-input"]`.
  4. Click `[data-qa="promo-apply"]`.
- **Expected Result:**
  - `[data-qa="promo-message"]` displays text: `"Promo code applied: 10% off."`
  - `[data-qa="order-total"]` updates to discounted total: `"$90.00"` (10% off $100.00).

---

### TC-2: Subtotal threshold boundary value analysis for valid promo code
- **Pyramid Level:** UI (E2E)
- **Test Data & Parameter Rows:**
  | Row | Subtotal | Promo Code | Expected Promo Message | Expected Order Total |
  | :--- | :--- | :--- | :--- | :--- |
  | 2a | $49.99 (Boundary - 1¢) | `SAVE10` | "Minimum order of $50 required." | "$49.99" (Undiscounted) |
  | 2b | $50.00 (Boundary exact) | `SAVE10` | "Promo code applied: 10% off." | "$45.00" (10% off $50.00) |
  | 2c | $50.01 (Boundary + 1¢) | `SAVE10` | "Promo code applied: 10% off." | "$45.01" (10% off $50.01) |
- **Locators:**
  - Promo input: `[data-qa="promo-input"]`
  - Apply button: `[data-qa="promo-apply"]`
  - Promo message: `[data-qa="promo-message"]`
  - Order total: `[data-qa="order-total"]`
- **Steps:**
  1. For each parameter row, navigate to checkout with cart subtotal set to the specified amount.
  2. Enter the promo code `SAVE10` into `[data-qa="promo-input"]`.
  3. Click `[data-qa="promo-apply"]`.
- **Expected Result:**
  - `[data-qa="promo-message"]` displays the exact expected promo message for that row.
  - `[data-qa="order-total"]` displays the exact expected order total for that row.

---

### TC-3: Reject valid promo code when order subtotal is below minimum
- **Pyramid Level:** UI (E2E)
- **Test Data:**
  - Subtotal: $30.00
  - Promo Code: `SAVE10`
- **Locators:**
  - Promo input: `[data-qa="promo-input"]`
  - Apply button: `[data-qa="promo-apply"]`
  - Promo message: `[data-qa="promo-message"]`
  - Order total: `[data-qa="order-total"]`
- **Steps:**
  1. Navigate to the checkout page with cart items totaling $30.00.
  2. Verify initial `[data-qa="order-total"]` displays "$30.00".
  3. Enter "SAVE10" into `[data-qa="promo-input"]`.
  4. Click `[data-qa="promo-apply"]`.
- **Expected Result:**
  - `[data-qa="promo-message"]` displays text: `"Minimum order of $50 required."`
  - `[data-qa="order-total"]` remains unchanged at `"$30.00"`.

---

### TC-4: Reject expired or unknown promo codes (Parameterized)
- **Pyramid Level:** UI (E2E)
- **Test Data & Parameter Rows:**
  | Row | Scenario Type | Subtotal | Promo Code | Expected Promo Message | Expected Order Total |
  | :--- | :--- | :--- | :--- | :--- | :--- |
  | 4a | Expired code | $60.00 | `SAVE10OLD` | "This promo code is not valid." | "$60.00" (Undiscounted) |
  | 4b | Unknown code | $60.00 | `FOOBAR` | "This promo code is not valid." | "$60.00" (Undiscounted) |
- **Locators:**
  - Promo input: `[data-qa="promo-input"]`
  - Apply button: `[data-qa="promo-apply"]`
  - Promo message: `[data-qa="promo-message"]`
  - Order total: `[data-qa="order-total"]`
- **Steps:**
  1. For each parameter row, navigate to checkout with cart subtotal of $60.00.
  2. Enter the promo code into `[data-qa="promo-input"]`.
  3. Click `[data-qa="promo-apply"]`.
- **Expected Result:**
  - `[data-qa="promo-message"]` displays text: `"This promo code is not valid."`
  - `[data-qa="order-total"]` remains undiscounted at `"$60.00"`.

---

### TC-5: Reject submission when promo code field is empty
- **Pyramid Level:** UI (E2E)
- **Test Data:**
  - Subtotal: $60.00
  - Promo Code: `""` (empty)
- **Locators:**
  - Promo input: `[data-qa="promo-input"]`
  - Apply button: `[data-qa="promo-apply"]`
  - Promo message: `[data-qa="promo-message"]`
  - Order total: `[data-qa="order-total"]`
- **Steps:**
  1. Navigate to checkout page with cart items totaling $60.00.
  2. Leave `[data-qa="promo-input"]` empty (or clear any default value).
  3. Click `[data-qa="promo-apply"]`.
- **Expected Result:**
  - `[data-qa="promo-message"]` displays text: `"Enter a promo code."`
  - `[data-qa="order-total"]` remains unchanged at `"$60.00"`.

---

### TC-6: Applying a second promo code replaces the first active code
- **Pyramid Level:** UI (E2E)
- **Test Data:**
  - Subtotal: $100.00
  - Initial Promo Code: `SAVE10` (10% discount)
  - Second Promo Code: `SAVE10` (or alternate valid promo code)
- **Locators:**
  - Promo input: `[data-qa="promo-input"]`
  - Apply button: `[data-qa="promo-apply"]`
  - Promo message: `[data-qa="promo-message"]`
  - Order total: `[data-qa="order-total"]`
- **Steps:**
  1. Navigate to checkout page with cart items totaling $100.00.
  2. Enter "SAVE10" into `[data-qa="promo-input"]` and click `[data-qa="promo-apply"]`.
  3. Verify `[data-qa="order-total"]` displays "$90.00" and `[data-qa="promo-message"]` displays `"Promo code applied: 10% off."`.
  4. Enter a second promo code into `[data-qa="promo-input"]` and click `[data-qa="promo-apply"]`.
- **Expected Result:**
  - The second promo code replaces the first code; discounts do not compound.
  - Only one discount is active on `[data-qa="order-total"]`.
  - `[data-qa="promo-message"]` reflects the status of the second applied code.

---

### TC-7: Apply promo code entered with leading and trailing spaces
- **Pyramid Level:** UI (E2E)
- **Test Data:**
  - Subtotal: $60.00
  - Promo Code: `" SAVE10 "` (leading and trailing whitespace)
- **Locators:**
  - Promo input: `[data-qa="promo-input"]`
  - Apply button: `[data-qa="promo-apply"]`
  - Promo message: `[data-qa="promo-message"]`
  - Order total: `[data-qa="order-total"]`
- **Steps:**
  1. Navigate to the checkout page with cart items totaling $60.00 subtotal.
  2. Verify initial `[data-qa="order-total"]` displays "$60.00".
  3. Enter " SAVE10 " into `[data-qa="promo-input"]`.
  4. Click `[data-qa="promo-apply"]`.
- **Expected Result:**
  - `[data-qa="promo-message"]` displays text: `"Promo code applied: 10% off."`
  - `[data-qa="order-total"]` updates to discounted total: `"$54.00"` (10% off $60.00).

---

## Coverage Checklist

| Rule | Requirement Description | Covering Case ID(s) | Rationale | Coverage Status |
| :--- | :--- | :--- | :--- | :--- |
| **Rule 1** | Valid code (`SAVE10`) applied with subtotal >= $50 gives 10% off subtotal, updates order-total to discounted total, and shows "Promo code applied: 10% off." | `TC-1`, `TC-2` (Rows 2b, 2c) | Verifies successful application on standard and threshold values ($50, $50.01, $100). | Covered |
| **Rule 2** | Valid code applied when subtotal is < $50 is rejected with message "Minimum order of $50 required." | `TC-2` (Row 2a), `TC-3` | Verifies rejection on boundary ($49.99) and nominal sub-threshold amount ($30.00). | Covered |
| **Rule 3** | Expired code (`SAVE10OLD`) shows message "This promo code is not valid." | `TC-4` (Row 4a) | Verifies rejection and exact error message for expired code parameter. | Covered |
| **Rule 4** | Unknown code (`FOOBAR`) shows message "This promo code is not valid." | `TC-4` (Row 4b) | Verifies rejection and exact error message for unknown code parameter. | Covered |
| **Rule 5** | Applying with the field empty shows message "Enter a promo code." | `TC-5` | Verifies empty input validation message and ensures order-total is unchanged. | Covered |
| **Rule 6** | Applying a second code replaces the first; only one discount is ever active. | `TC-6` | Verifies replacement behavior and prevents compounding multiple discounts. | Covered |
| **Rule 7** | Code entered with leading and trailing spaces is trimmed and treated as valid code (`SAVE10`), giving 10% off when subtotal >= $50. | `TC-7` | Verifies whitespace trimming on promo code input. | Covered |


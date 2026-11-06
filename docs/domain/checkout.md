# Domain — Checkout
 
## Actors
- **Guest shopper** — can browse and reach checkout; cannot save payment details.
- **Signed-in shopper** — has an account; saved addresses and order history apply.
 
## Terms
- **Subtotal** — the sum of all line items, before discounts, shipping, and tax.
- **Order total** — the amount the shopper pays: subtotal minus discounts, plus shipping and tax.
- **Promo code** — a promotional text code entered at checkout that grants a percentage discount on the order subtotal.
- **Minimum order threshold** — the minimum subtotal amount of $50.00 required for a promo code discount to qualify.
 
## Rules
- An order must contain at least one line item before checkout can start.
- Valid promo code (`SAVE10`) entered when subtotal is >= $50.00 → order total is discounted by 10% and message "Promo code applied: 10% off." is displayed.
- Valid promo code entered when subtotal is < $50.00 → promo code is rejected with message "Minimum order of $50 required." and order total remains unchanged.
- Expired (`SAVE10OLD`) or unknown (`FOOBAR`) promo code entered → promo code is rejected with message "This promo code is not valid." and order total remains unchanged.
- Empty promo code submitted → submission is rejected with message "Enter a promo code." and order total remains unchanged.
- New promo code applied when an existing code is active → the new promo code replaces the previous code so only one discount is active.
- Promo code entered with leading or trailing whitespace (e.g. `" SAVE10 "`) → whitespace is trimmed and evaluated as the trimmed code.
 
## Open questions
- None recorded.
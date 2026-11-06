import { assertTextEquals, assertVisible } from "../../assertions";
import { test } from "../../framework/fixtures/app.fixture";
import { CheckoutPage } from "../../pages/CheckoutPage";

function buildCheckoutHtml(initialSubtotal: number): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Checkout</title>
</head>
<body>
  <h1>Checkout</h1>
  <div data-qa="order-total">$${initialSubtotal.toFixed(2)}</div>
  <form id="promo-form" onsubmit="event.preventDefault(); applyPromo();">
    <input type="text" data-qa="promo-input" placeholder="Promo code" />
    <button type="submit" data-qa="promo-apply">Apply</button>
  </form>
  <div data-qa="promo-message"></div>

  <script>
    const originalSubtotal = ${initialSubtotal};
    let activePromo = null;

    function applyPromo() {
      const input = document.querySelector('[data-qa="promo-input"]');
      const message = document.querySelector('[data-qa="promo-message"]');
      const orderTotal = document.querySelector('[data-qa="order-total"]');
      const code = input.value;

      if (!code || code.trim() === "") {
        message.textContent = "Enter a promo code.";
        return;
      }

      if (code === "SAVE10OLD" || code === "FOOBAR") {
        message.textContent = "This promo code is not valid.";
        return;
      }

      if (code === "SAVE10") {
        if (originalSubtotal < 50) {
          message.textContent = "Minimum order of $50 required.";
          return;
        }
        activePromo = { code: "SAVE10", discountPercent: 10 };
        const discounted = originalSubtotal * (1 - activePromo.discountPercent / 100);
        orderTotal.textContent = "$" + discounted.toFixed(2);
        message.textContent = "Promo code applied: 10% off.";
        return;
      }

      if (code === "SAVE20") {
        if (originalSubtotal < 50) {
          message.textContent = "Minimum order of $50 required.";
          return;
        }
        activePromo = { code: "SAVE20", discountPercent: 20 };
        const discounted = originalSubtotal * (1 - activePromo.discountPercent / 100);
        orderTotal.textContent = "$" + discounted.toFixed(2);
        message.textContent = "Promo code applied: 20% off.";
        return;
      }

      message.textContent = "This promo code is not valid.";
    }
  </script>
</body>
</html>`;
}

test.describe("Checkout Promo Code", () => {
  test("TC-1: apply valid promo code with subtotal greater than or equal to $50 @ui", async ({
    page,
    mountHtml
  }) => {
    const url = await mountHtml(buildCheckoutHtml(100.0), "/checkout");
    const checkoutPage = await new CheckoutPage(page).open(url);

    await assertVisible(checkoutPage.orderTotal);
    await assertTextEquals(checkoutPage.orderTotal, "$100.00");

    await checkoutPage.applyPromo("SAVE10");

    await assertVisible(checkoutPage.promoMessage);
    await assertTextEquals(checkoutPage.promoMessage, "Promo code applied: 10% off.");
    await assertTextEquals(checkoutPage.orderTotal, "$90.00");
  });

  test.describe("TC-2: subtotal threshold boundary value analysis for valid promo code @ui", () => {
    const bvaRows = [
      {
        rowId: "2a",
        subtotal: 49.99,
        expectedMessage: "Minimum order of $50 required.",
        expectedTotal: "$49.99"
      },
      {
        rowId: "2b",
        subtotal: 50.0,
        expectedMessage: "Promo code applied: 10% off.",
        expectedTotal: "$45.00"
      },
      {
        rowId: "2c",
        subtotal: 50.01,
        expectedMessage: "Promo code applied: 10% off.",
        expectedTotal: "$45.01"
      }
    ];

    for (const { rowId, subtotal, expectedMessage, expectedTotal } of bvaRows) {
      test(`TC-2 row ${rowId}: subtotal $${subtotal.toFixed(2)} with SAVE10`, async ({
        page,
        mountHtml
      }) => {
        const url = await mountHtml(buildCheckoutHtml(subtotal), "/checkout");
        const checkoutPage = await new CheckoutPage(page).open(url);

        await assertVisible(checkoutPage.orderTotal);
        await assertTextEquals(checkoutPage.orderTotal, `$${subtotal.toFixed(2)}`);

        await checkoutPage.applyPromo("SAVE10");

        await assertVisible(checkoutPage.promoMessage);
        await assertTextEquals(checkoutPage.promoMessage, expectedMessage);
        await assertTextEquals(checkoutPage.orderTotal, expectedTotal);
      });
    }
  });

  test("TC-3: reject valid promo code when order subtotal is below minimum @ui", async ({
    page,
    mountHtml
  }) => {
    const url = await mountHtml(buildCheckoutHtml(30.0), "/checkout");
    const checkoutPage = await new CheckoutPage(page).open(url);

    await assertVisible(checkoutPage.orderTotal);
    await assertTextEquals(checkoutPage.orderTotal, "$30.00");

    await checkoutPage.applyPromo("SAVE10");

    await assertVisible(checkoutPage.promoMessage);
    await assertTextEquals(checkoutPage.promoMessage, "Minimum order of $50 required.");
    await assertTextEquals(checkoutPage.orderTotal, "$30.00");
  });

  test.describe("TC-4: reject expired or unknown promo codes (parameterized) @ui", () => {
    const invalidCodes = [
      { rowId: "4a", code: "SAVE10OLD", description: "expired promo code" },
      { rowId: "4b", code: "FOOBAR", description: "unknown promo code" }
    ];

    for (const { rowId, code, description } of invalidCodes) {
      test(`TC-4 row ${rowId}: apply invalid promo code (${code} - ${description})`, async ({
        page,
        mountHtml
      }) => {
        const url = await mountHtml(buildCheckoutHtml(60.0), "/checkout");
        const checkoutPage = await new CheckoutPage(page).open(url);

        await assertVisible(checkoutPage.orderTotal);
        await assertTextEquals(checkoutPage.orderTotal, "$60.00");

        await checkoutPage.applyPromo(code);

        await assertVisible(checkoutPage.promoMessage);
        await assertTextEquals(checkoutPage.promoMessage, "This promo code is not valid.");
        await assertTextEquals(checkoutPage.orderTotal, "$60.00");
      });
    }
  });

  test("TC-5: reject submission when promo code field is empty @ui", async ({ page, mountHtml }) => {
    const url = await mountHtml(buildCheckoutHtml(60.0), "/checkout");
    const checkoutPage = await new CheckoutPage(page).open(url);

    await assertVisible(checkoutPage.orderTotal);
    await assertTextEquals(checkoutPage.orderTotal, "$60.00");

    await checkoutPage.applyPromo("");

    await assertVisible(checkoutPage.promoMessage);
    await assertTextEquals(checkoutPage.promoMessage, "Enter a promo code.");
    await assertTextEquals(checkoutPage.orderTotal, "$60.00");
  });

  test("TC-6: apply second promo code replacing existing active discount @ui", async ({
    page,
    mountHtml
  }) => {
    const url = await mountHtml(buildCheckoutHtml(100.0), "/checkout");
    const checkoutPage = await new CheckoutPage(page).open(url);

    await assertVisible(checkoutPage.orderTotal);
    await assertTextEquals(checkoutPage.orderTotal, "$100.00");

    await checkoutPage.applyPromo("SAVE10");
    await assertVisible(checkoutPage.promoMessage);
    await assertTextEquals(checkoutPage.promoMessage, "Promo code applied: 10% off.");
    await assertTextEquals(checkoutPage.orderTotal, "$90.00");

    await checkoutPage.applyPromo("SAVE20");
    await assertVisible(checkoutPage.promoMessage);
    await assertTextEquals(checkoutPage.promoMessage, "Promo code applied: 20% off.");
    await assertTextEquals(checkoutPage.orderTotal, "$80.00");
  });
});


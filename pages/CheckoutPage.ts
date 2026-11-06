import { expect, type Page } from "@playwright/test";

import { xPage } from "../framework/core/xPage";

export class CheckoutPage extends xPage {
  readonly orderTotal = this.$("[data-qa='order-total']");
  readonly path = "/checkout";
  readonly promoApply = this.$("[data-qa='promo-apply']");
  readonly promoInput = this.$("[data-qa='promo-input']");
  readonly promoMessage = this.$("[data-qa='promo-message']");

  constructor(page: Page) {
    super(page);
  }

  async applyPromo(code: string): Promise<void> {
    await this.promoInput.fill(code);
    await this.promoApply.click();
  }

  async isOpened(): Promise<void> {
    await expect(this.promoInput).toBeVisible();
    await expect(this.orderTotal).toBeVisible();
  }

  override async open(targetUrl?: string): Promise<this> {
    if (targetUrl) {
      await this.page.goto(targetUrl);
      await this.isOpened();
      return this;
    }
    return super.open();
  }
}


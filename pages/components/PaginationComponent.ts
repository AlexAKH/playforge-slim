import type { xLocator } from "../../framework/core/xLocator";
import { xComponent } from "../../framework/core/xComponent";

export class PaginationComponent extends xComponent {
  readonly activePage = this.$(".active, [aria-current='page']");
  readonly nextButton = this.$(
    ".next, [aria-label='Next'], a:has-text('Next'), button:has-text('Next'), a:has-text('»')"
  );
  readonly pageItems = this.$(".page-item, li, button, a");
  readonly previousButton = this.$(
    ".prev, [aria-label='Previous'], a:has-text('Previous'), a:has-text('Prev'), button:has-text('Previous'), button:has-text('Prev'), a:has-text('«')"
  );

  pageButton(pageNumber: number | string): xLocator {
    return this.root
      .locator("a, button, li")
      .filter({ hasText: new RegExp(`^\\s*${pageNumber}\\s*$`) })
      .first() as xLocator;
  }

  async goToPage(pageNumber: number | string): Promise<void> {
    await this.pageButton(pageNumber).click();
  }

  async nextPage(): Promise<void> {
    await this.nextButton.click();
  }

  async previousPage(): Promise<void> {
    await this.previousButton.click();
  }
}


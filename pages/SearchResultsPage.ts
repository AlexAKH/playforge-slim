import { expect } from "@playwright/test";

import { PaginationComponent } from "./components/PaginationComponent";
import { SiteHeaderComponent } from "./components/SiteHeaderComponent";
import type { xLocator } from "../framework/core/xLocator";
import { xPage } from "../framework/core/xPage";

export class SearchResultsPage extends xPage {
  readonly header = new SiteHeaderComponent(this.$("header"));
  readonly pagination = new PaginationComponent(this.$(".pagination"));
  readonly path = "/search";
  readonly results = this.$(".search-result, .result-item, .product-image-wrapper");
  readonly resultsList = this.$(".search-results, .results-list, .features_items");
  readonly searchButton = this.$("#submit_search, button[type='submit']");
  readonly searchInput = this.$("#search_product, input[type='search'], input[name='search']");
  readonly title = this.$("h2.title, h1");

  async isOpened(): Promise<void> {
    await expect(this.title).toBeVisible();
    await expect(this.page).toHaveURL(/\/search/);
  }

  async search(query: string): Promise<void> {
    await this.searchInput.fill(query);
    await this.searchButton.click();
  }

  resultByName(name: string): xLocator {
    return this.results.filter({ hasText: name }).first() as xLocator;
  }

  resultByIndex(index: number): xLocator {
    return this.results.nth(index) as xLocator;
  }

  async getResultsCount(): Promise<number> {
    return await this.results.count();
  }
}


/**
 * IPageDataProvider.ts
 * This file defines the interface for page data providers in the Page Data Framework.
 */

import { PageData, ID } from './page-data';

/**
 * Interface for page data providers.
 * Implementations of this interface are responsible for fetching and updating page data.
 */
export interface IPageDataProvider {
  /**
   * Retrieves a single page by its ID.
   * @param id - The unique identifier of the page.
   * @returns A promise that resolves to the page data.
   * @throws Will throw an error if the page cannot be fetched.
   */
  getPage(id: ID): Promise<PageData>;

  /**
   * Retrieves multiple pages by their IDs.
   * @param ids - An array of page identifiers.
   * @returns A promise that resolves to an array of page data.
   * @throws Will throw an error if the pages cannot be fetched.
   */
  getPages(ids: ID[]): Promise<PageData[]>;

  /**
   * Updates a page with new data.
   * @param id - The unique identifier of the page to update.
   * @param data - Partial page data containing the fields to update.
   * @returns A promise that resolves to the updated page data.
   * @throws Will throw an error if the page cannot be updated.
   */
  updatePage(id: ID, data: Partial<PageData>): Promise<PageData>;
}
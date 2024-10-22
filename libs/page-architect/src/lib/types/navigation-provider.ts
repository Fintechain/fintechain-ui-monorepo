/**
 * INavigationProvider.ts
 * This file defines the interface for navigation providers in the Page Data Framework.
 */

import { NavigationData, NavigationItem, ID } from './page-data';

/**
 * Interface for navigation data providers.
 * Implementations of this interface are responsible for fetching and updating navigation data.
 */
export interface INavigationProvider {
  /**
   * Retrieves the global navigation data.
   * @returns A promise that resolves to the global navigation data.
   * @throws Will throw an error if the navigation data cannot be fetched.
   */
  getGlobalNavigation(): Promise<NavigationData>;

  /**
   * Updates a specific navigation item.
   * @param itemId - The unique identifier of the navigation item to update.
   * @param data - Partial navigation item data containing the fields to update.
   * @returns A promise that resolves to the updated navigation item.
   * @throws Will throw an error if the navigation item cannot be updated.
   */
  updateNavigationItem(itemId: ID, data: Partial<NavigationItem>): Promise<NavigationItem>;
}
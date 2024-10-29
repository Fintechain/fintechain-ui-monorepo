/**
 * Represents a unique identifier type used across the application.
 * Currently implemented as a string, but can be modified to support other ID types
 * (e.g., numbers, UUIDs) by changing this type definition.
 * 
 * @example
 * const userId: ID = "user_123";
 * const documentId: ID = "doc_456";
 */
export type ID = string;

/**
 * Base interface that enforces the presence of an ID property.
 * All database entities and models that require unique identification
 * should extend this interface.
 * 
 * @property id - The unique identifier of type ID
 * 
 * @example
 * interface User extends HasID {
 *   name: string;
 *   email: string;
 * }
 * 
 * interface Product extends HasID {
 *   name: string;
 *   price: number;
 * }
 * 
 * // Usage with a generic type
 * function findEntity<T extends HasID>(entities: T[], id: ID): T | undefined {
 *   return entities.find(entity => entity.id === id);
 * }
 */
export type HasID = {
    id: ID;
};

/**
 * Interface defining the parameters for list operations.
 * Used to control pagination and filtering of results when retrieving lists of items.
 * 
 * @example
 * const params: ListParams = {
 *   page: 1,
 *   limit: 10,
 *   filter: { status: "active", category: "books" }
 * };
 */
export interface ListParams {
    /**
     * The page number to retrieve, starting from 1.
     * Used for pagination of results.
     * If not provided, defaults to 1 in most implementations.
     * 
     * @example
     * const params = { page: 2 }; // Get the second page of results
     */
    page?: number;

    /**
     * Maximum number of items to return per page.
     * Controls the size of each page in paginated results.
     * If not provided, typically defaults to a service-specific value (e.g., 10 or 20).
     * 
     * @example
     * const params = { limit: 25 }; // Get up to 25 items per page
     */
    limit?: number;

    /**
     * Optional filtering criteria for the list operation.
     * A key-value object where keys represent filter fields and values represent filter criteria.
     * The exact filtering capabilities depend on the service implementation.
     * 
     * @example
     * const params = {
     *   filter: {
     *     status: "active",
     *     category: "electronics",
     *     priceRange: { min: 100, max: 500 }
     *   }
     * };
     */
    filter?: Record<string, any>;
}

/**
 * Interface defining the structure of a paginated list response.
 * Contains both the requested items and metadata about the pagination state.
 * 
 * @template T - The type of items in the list
 * 
 * @example
 * interface User extends HasID {
 *   name: string;
 *   email: string;
 * }
 * 
 * const result: ListResult<User> = {
 *   items: [{ id: "1", name: "John", email: "john@example.com" }],
 *   total: 100,
 *   page: 1,
 *   limit: 10
 * };
 */
export interface ListResult<T> {
    /**
     * Array of items for the current page.
     * The length of this array will be at most equal to the limit parameter.
     */
    items: T[];

    /**
     * Total number of items available across all pages.
     * This represents the total count of items that match the filter criteria,
     * not just the items on the current page.
     * 
     * @example
     * // If total is 100 and limit is 10, there are 10 pages available
     */
    total: number;

    /**
     * Current page number.
     * Corresponds to the page parameter in the request.
     * Should be greater than or equal to 1.
     */
    page: number;

    /**
     * Number of items per page.
     * Corresponds to the limit parameter in the request.
     * The actual number of items returned might be less than this value
     * for the last page or when there are fewer items available.
     */
    limit: number;
}
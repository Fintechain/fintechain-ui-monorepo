import { HasID, ID, ListParams, ListResult } from "../types";

/**
 * Generic interface for CRUD (Create, Read, Update, Delete) operations on data of type T.
 * This interface provides a standardized way to interact with data entities across different services.
 * 
 * @template T - The type of data this service handles. Must extend HasID interface to ensure
 *               all entities have an ID property.
 * 
 * @example
 * interface User extends HasID {
 *   name: string;
 *   email: string;
 * }
 * const userService: DataService<User>;
 */
export interface DataService<T extends HasID> {
    /**
     * Creates a new entity in the data store.
     * 
     * @param item - The data to create, excluding the ID which will be generated
     * @returns A promise that resolves to the created entity, including its generated ID
     * 
     * @example
     * const newUser = await userService.create({ name: "John", email: "john@example.com" });
     */
    create(item: Omit<T, 'id'>): Promise<T>;

    /**
     * Retrieves a single entity by its ID.
     * 
     * @param id - The unique identifier of the entity to retrieve
     * @returns A promise that resolves to the found entity or null if not found
     * 
     * @example
     * const user = await userService.read("123");
     * if (user) {
     *   console.log(user.name);
     * }
     */
    read(id: ID): Promise<T | null>;

    /**
     * Updates an existing entity in the data store.
     * 
     * @param id - The unique identifier of the entity to update
     * @param item - Partial entity data containing only the fields to update
     * @returns A promise that resolves to the updated entity
     * @throws Error if the entity with the given ID doesn't exist
     * 
     * @example
     * const updatedUser = await userService.update("123", { name: "John Doe" });
     */
    update(id: ID, item: Partial<T>): Promise<T>;

    /**
     * Deletes an entity from the data store.
     * 
     * @param id - The unique identifier of the entity to delete
     * @returns A promise that resolves to true if deletion was successful, false otherwise
     * 
     * @example
     * const wasDeleted = await userService.delete("123");
     * if (wasDeleted) {
     *   console.log("User was successfully deleted");
     * }
     */
    delete(id: ID): Promise<boolean>;

    /**
     * Retrieves a list of entities based on the provided parameters.
     * 
     * @param params - Object containing pagination and filtering parameters
     * @returns A promise that resolves to an object containing the list of items and metadata
     * 
     * @example
     * const result = await userService.list({ 
     *   page: 1, 
     *   limit: 10,
     *   filter: { role: "admin" }
     * });
     * console.log(`Found ${result.total} users`);
     */
    list(params: ListParams): Promise<ListResult<T>>;
}
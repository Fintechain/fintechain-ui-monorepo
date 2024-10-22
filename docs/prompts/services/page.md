# Prompt for PageDataService

Create a service class named `PageDataService` that handles all API calls related to fetching and updating page data in the Page Data Framework. This service should provide a clean, typed interface for interacting with the backend API.

## Requirements:

1. Service Structure:
   - Implement as a TypeScript class
   - Use axios or a similar library for making HTTP requests
   - Implement methods for fetching single pages, multiple pages, and updating pages

2. Constructor:
   - Accept a base URL for the API
   - Configure axios instance with base URL and any necessary default headers

3. Methods:
   - `getPage(id: ID): Promise<PageData>`
   - `getPages(ids: ID[]): Promise<PageData[]>`
   - `updatePage(id: ID, data: Partial<PageData>): Promise<PageData>`
   - Consider additional methods for creating and deleting pages if needed

4. Error Handling:
   - Implement proper error handling for API calls
   - Create custom error classes if necessary for different types of API errors
   - Use TypeScript to ensure type safety in error handling

5. Request/Response Interceptors:
   - Implement request interceptors for adding authentication tokens if required
   - Implement response interceptors for preliminary error handling and response transformation

6. Caching:
   - Implement a basic caching mechanism to reduce unnecessary API calls
   - Consider using a library like axios-
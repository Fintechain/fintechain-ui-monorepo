# Prompt: API Services for Page Data Framework

Implement API services for the Page Data Framework using TypeScript. These services will handle communication with the backend API for fetching and updating page and navigation data.

## Requirements:

1. Create separate files for each service in the `src/services` directory:
   - `pageDataService.ts`
   - `navigationService.ts`
2. Use axios for making HTTP requests.
3. Implement proper TypeScript typing for method parameters and return types.
4. Include error handling and request/response interceptors.
5. Use environment variables for API base URLs.
6. Include comprehensive JSDoc comments for each service and its methods.

## Example Implementations:

### pageDataService.ts

```typescript
import axios, { AxiosInstance } from 'axios';
import { PageData, ID } from '../types/coreTypes';

/**
 * Service for handling page data API requests
 */
export class PageDataService {
  private api: AxiosInstance;

  /**
   * Creates an instance of PageDataService.
   * @param baseURL - The base URL for the API
   */
  constructor(baseURL: string) {
    this.api = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  /**
   * Sets up request and response interceptors
   */
  private setupInterceptors() {
    this.api.interceptors.request.use(
      (config) => {
        // Add authorization header if needed
        // config.headers['Authorization'] = `Bearer ${getToken()}`;
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        // Handle or log errors
        console.error('API Error:', error);
        return Promise.reject(error);
      }
    );
  }

  /**
   * Fetches a page by its ID
   * @param id - The ID of the page to fetch
   * @returns The page data
   */
  async getPage(id: ID): Promise<PageData> {
    try {
      const response = await this.api.get<PageData>(`/pages/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch page with ID ${id}: ${error}`);
    }
  }

  /**
   * Fetches multiple pages by their IDs
   * @param ids - Array of page IDs to fetch
   * @returns Array of page data
   */
  async getPages(ids: ID[]): Promise<PageData[]> {
    try {
      const response = await this.api.get<PageData[]>('/pages', { params: { ids: ids.join(',') } });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch pages: ${error}`);
    }
  }

  /**
   * Updates a page
   * @param id - The ID of the page to update
   * @param data - The data to update the page with
   * @returns The updated page data
   */
  async updatePage(id: ID, data: Partial<PageData>): Promise<PageData> {
    try {
      const response = await this.api.patch<PageData>(`/pages/${id}`, data);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to update page with ID ${id}: ${error}`);
    }
  }
}
```

### navigationService.ts

```typescript
import axios, { AxiosInstance } from 'axios';
import { NavigationData, NavigationItem, ID } from '../types/coreTypes';

/**
 * Service for handling navigation data API requests
 */
export class NavigationService {
  private api: AxiosInstance;

  /**
   * Creates an instance of NavigationService.
   * @param baseURL - The base URL for the API
   */
  constructor(baseURL: string) {
    this.api = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  /**
   * Sets up request and response interceptors
   */
  private setupInterceptors() {
    // Similar to PageDataService interceptors
    // ...
  }

  /**
   * Fetches the global navigation data
   * @returns The global navigation data
   */
  async getGlobalNavigation(): Promise<NavigationData> {
    try {
      const response = await this.api.get<NavigationData>('/navigation/global');
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch global navigation: ${error}`);
    }
  }

  /**
   * Updates a navigation item
   * @param itemId - The ID of the navigation item to update
   * @param data - The data to update the navigation item with
   * @returns The updated navigation item
   */
  async updateNavigationItem(itemId: ID, data: Partial<NavigationItem>): Promise<NavigationItem> {
    try {
      const response = await this.api.patch<NavigationItem>(`/navigation/items/${itemId}`, data);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to update navigation item with ID ${itemId}: ${error}`);
    }
  }
}
```

## Additional Guidelines:

- Implement retry logic for failed requests using axios-retry or a custom solution.
- Add request cancellation using axios cancellable promises for long-running requests.
- Implement proper error handling and consider creating custom error classes.
- Use environment variables for API keys and other sensitive information.
- Consider implementing a caching layer for frequently accessed data.
- Add support for different environments (development, staging, production).
- Implement proper logging for debugging and monitoring purposes.
- Write unit tests for each service method, mocking axios responses.

Remember to keep your API services modular and reusable. Each service should focus on a specific domain of your API interactions.
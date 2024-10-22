# Prompt for pageModel Rematch Model

Create a Rematch model named `pageModel` that manages the state related to pages in the Page Data Framework. This model should handle fetching, storing, and updating page data, integrating with the API service and providing a robust state management solution.

## Requirements:

1. Model Structure:
   - Use the Rematch `createModel` function to define the model
   - Implement state, reducers, and effects
   - Use TypeScript for strong typing of state, reducers, and effects

2. State:
   - Define an initial state that includes:
     - `byId`: A record of pages indexed by their IDs
     - `allIds`: An array of all page IDs for maintaining order
     - `loading`: A boolean indicating whether any page is currently being fetched
     - `error`: Any error that occurred during fetching, or null if no error

3. Reducers:
   - Implement reducers for:
     - Setting a single page in the state
     - Setting multiple pages in the state
     - Setting the loading state
     - Setting an error state
     - Clearing the error state

4. Effects:
   - Implement effects for:
     - Fetching a single page by ID
     - Fetching multiple pages (e.g., for a sitemap)
     - Updating a page

5. API Integration:
   - Use the PageDataService (to be implemented) for making API calls
   - Handle API responses and errors appropriately

6. Error Handling:
   - Implement proper error handling in effects
   - Set meaningful error messages in the state

7. Performance Considerations:
   - Implement caching mechanisms to avoid unnecessary API calls
   - Consider implementing pagination or infinite scrolling for large numbers of pages

8. TypeScript Usage:
   - Use proper TypeScript typing throughout the model
   - Utilize utility types where appropriate (e.g., Partial, Pick)
   - Define and use type guards where necessary

9. Testing:
   - Include comments or TODO markers for unit tests
   - Consider implementing tests for reducers and effects

10. Documentation:
    - Provide comprehensive JSDoc comments for the model, its state, reducers, and effects
    - Include inline comments for complex logic

## Example Structure:

```typescript
import { createModel } from '@rematch/core';
import { RootModel } from './models';
import { PageDataService } from '../services/pageDataService';
import { ID, PageData, PagesState } from '../types/coreTypes';

const pageDataService = new PageDataService('API_BASE_URL');

export const pageModel = createModel<RootModel>()({
    state: {
        byId: {},
        allIds: [],
        loading: false,
        error: null,
    } as PagesState,

    reducers: {
        setPage(state, payload: { id: ID; data: PageData }) {
            return {
                ...state,
                byId: { ...state.byId, [payload.id]: payload.data },
                allIds: state.allIds.includes(payload.id) ? state.allIds : [...state.allIds, payload.id],
            };
        },

        setPages(state, payload: PageData[]) {
            const byId = { ...state.byId };
            const allIds = [...state.allIds];
            payload.forEach(page => {
                byId[page.id] = page;
                if (!allIds.includes(page.id)) {
                    allIds.push(page.id);
                }
            });
            return { ...state, byId, allIds };
        },

        setLoading(state, payload: boolean) {
            return { ...state, loading: payload };
        },

        setError(state, payload: Error | null) {
            return { ...state, error: payload };
        },

        clearError(state) {
            return { ...state, error: null };
        },
    },

    effects: (dispatch) => ({
        async fetchPage(id: ID) {
            dispatch.page.setLoading(true);
            dispatch.page.clearError();
            try {
                const pageData = await pageDataService.getPage(id);
                dispatch.page.setPage({ id, data: pageData });
            } catch (error) {
                dispatch.page.setError(error as Error);
            } finally {
                dispatch.page.setLoading(false);
            }
        },

        async fetchPages(ids: ID[]) {
            dispatch.page.setLoading(true);
            dispatch.page.clearError();
            try {
                const pages = await pageDataService.getPages(ids);
                dispatch.page.setPages(pages);
            } catch (error) {
                dispatch.page.setError(error as Error);
            } finally {
                dispatch.page.setLoading(false);
            }
        },

        async updatePage(payload: { id: ID; data: Partial<PageData> }) {
            dispatch.page.setLoading(true);
            dispatch.page.clearError();
            try {
                const updatedPage = await pageDataService.updatePage(payload.id, payload.data);
                dispatch.page.setPage({ id: payload.id, data: updatedPage });
            } catch (error) {
                dispatch.page.setError(error as Error);
            } finally {
                dispatch.page.setLoading(false);
            }
        },
    }),
});

// TODO: Implement unit tests for pageModel
// - Test each reducer
// - Test each effect with mocked API calls
// - Test error handling scenarios

export default pageModel;
```

Ensure that the `pageModel` efficiently manages the state related to pages, integrates well with the API service, and provides a robust, type-safe interface for updating and accessing page data throughout the application.
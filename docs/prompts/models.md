# Prompt: Rematch Models for Page Data Framework

Create Rematch models for managing the state in our Page Data Framework using TypeScript. These models will handle the core state management for pages and navigation.

## Requirements:

1. Create separate files for each model in the `src/models` directory:
   - `pageModel.ts`
   - `navigationModel.ts`
2. Implement state, reducers, and effects for each model.
3. Use proper TypeScript typing for state, payload, and effects.
4. Implement error handling and loading states.
5. Include comprehensive JSDoc comments for each model, its state, reducers, and effects.

## Example Implementations:

### pageModel.ts

```typescript
import { createModel } from '@rematch/core';
import { RootModel } from './models';
import { PageDataService } from '../services/pageDataService';
import { PageData, ID } from '../types/coreTypes';

const pageDataService = new PageDataService('API_BASE_URL');

interface PageState {
  byId: Record<ID, PageData>;
  allIds: ID[];
  loading: boolean;
  error: Error | null;
}

/**
 * Rematch model for managing page data
 */
export const pageModel = createModel<RootModel>()({
  state: {
    byId: {},
    allIds: [],
    loading: false,
    error: null,
  } as PageState,
  reducers: {
    /**
     * Sets a page in the state
     * @param state - Current state
     * @param payload - Page data and ID
     */
    setPage(state, payload: { id: ID; data: PageData }): PageState {
      return {
        ...state,
        byId: { ...state.byId, [payload.id]: payload.data },
        allIds: state.allIds.includes(payload.id) ? state.allIds : [...state.allIds, payload.id],
      };
    },
    /**
     * Sets the loading state
     * @param state - Current state
     * @param payload - Loading state
     */
    setLoading(state, payload: boolean): PageState {
      return { ...state, loading: payload };
    },
    /**
     * Sets the error state
     * @param state - Current state
     * @param payload - Error object
     */
    setError(state, payload: Error | null): PageState {
      return { ...state, error: payload };
    },
  },
  effects: (dispatch) => ({
    /**
     * Fetches a page by ID
     * @param id - Page ID
     */
    async fetchPage(id: ID): Promise<void> {
      dispatch.page.setLoading(true);
      try {
        const pageData = await pageDataService.getPage(id);
        dispatch.page.setPage({ id, data: pageData });
      } catch (error) {
        dispatch.page.setError(error as Error);
      } finally {
        dispatch.page.setLoading(false);
      }
    },
  }),
});
```

### navigationModel.ts

```typescript
import { createModel } from '@rematch/core';
import { RootModel } from './models';
import { NavigationService } from '../services/navigationService';
import { NavigationData, NavigationItem, ID } from '../types/coreTypes';

const navigationService = new NavigationService('API_BASE_URL');

interface NavigationState {
  global: NavigationData | null;
  loading: boolean;
  error: Error | null;
}

/**
 * Rematch model for managing navigation data
 */
export const navigationModel = createModel<RootModel>()({
  state: {
    global: null,
    loading: false,
    error: null,
  } as NavigationState,
  reducers: {
    /**
     * Sets the global navigation data
     * @param state - Current state
     * @param payload - Navigation data
     */
    setGlobalNavigation(state, payload: NavigationData): NavigationState {
      return { ...state, global: payload };
    },
    /**
     * Sets the loading state
     * @param state - Current state
     * @param payload - Loading state
     */
    setLoading(state, payload: boolean): NavigationState {
      return { ...state, loading: payload };
    },
    /**
     * Sets the error state
     * @param state - Current state
     * @param payload - Error object
     */
    setError(state, payload: Error | null): NavigationState {
      return { ...state, error: payload };
    },
    /**
     * Updates a specific navigation item in the state
     * @param state - Current state
     * @param payload - Item ID and updated data
     */
    updateNavigationItemInState(state, payload: { itemId: ID; data: Partial<NavigationItem> }): NavigationState {
      if (!state.global) return state;
      
      const updateItem = (items: NavigationItem[]): NavigationItem[] =>
        items.map(item =>
          item.id === payload.itemId
            ? { ...item, ...payload.data }
            : item.children
            ? { ...item, children: updateItem(item.children) }
            : item
        );

      return {
        ...state,
        global: {
          header: updateItem(state.global.header || []),
          footer: updateItem(state.global.footer || []),
          sidebar: updateItem(state.global.sidebar || []),
        },
      };
    },
  },
  effects: (dispatch) => ({
    /**
     * Fetches the global navigation data
     */
    async fetchGlobalNavigation(): Promise<void> {
      dispatch.navigation.setLoading(true);
      try {
        const navigationData = await navigationService.getGlobalNavigation();
        dispatch.navigation.setGlobalNavigation(navigationData);
      } catch (error) {
        dispatch.navigation.setError(error as Error);
      } finally {
        dispatch.navigation.setLoading(false);
      }
    },
    /**
     * Updates a specific navigation item
     * @param payload - Item ID and data to update
     */
    async updateNavigationItem(payload: { itemId: ID; data: Partial<NavigationItem> }): Promise<void> {
      dispatch.navigation.setLoading(true);
      try {
        const updatedItem = await navigationService.updateNavigationItem(payload.itemId, payload.data);
        dispatch.navigation.updateNavigationItemInState({ itemId: payload.itemId, data: updatedItem });
      } catch (error) {
        dispatch.navigation.setError(error as Error);
      } finally {
        dispatch.navigation.setLoading(false);
      }
    },
  }),
});
```

## Additional Guidelines:

- Ensure that all state updates are immutable.
- Use TypeScript's advanced types (e.g., Partial, Record) to enhance type safety.
- Implement selectors for complex state derivations.
- Consider using immer for easier immutable state updates.
- Implement proper error handling and logging in effects.
- Use constants for action types to avoid typos and improve maintainability.
- Write unit tests for reducers and integration tests for effects.
- Consider implementing optimistic updates for better user experience.

Remember to keep your models focused and maintainable. Each model should handle a specific domain of your application state.
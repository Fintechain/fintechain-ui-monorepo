# Prompt: Store Configuration for Page Data Framework

Set up the root store configuration for our Page Data Framework using Rematch and TypeScript. This configuration will combine all the models and set up the store with any necessary plugins.

## Requirements:

1. Create a file named `store.ts` in the `src/store` directory.
2. Import and combine all Rematch models.
3. Configure the store with necessary plugins (e.g., loading, persist).
4. Set up proper TypeScript typing for the store and dispatch.
5. Export the configured store and typed hooks for use in components.
6. Include comprehensive JSDoc comments explaining the store setup.

## Example Implementation:

```typescript
import { init, RematchDispatch, RematchRootState } from '@rematch/core';
import loadingPlugin, { ExtraModelsFromLoading } from '@rematch/loading';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { pageModel } from '../models/pageModel';
import { navigationModel } from '../models/navigationModel';

/**
 * Root model combining all individual models
 */
const models = {
  pages: pageModel,
  navigation: navigationModel,
};

/**
 * Rematch store configuration
 */
export const store = init({
  models,
  plugins: [loadingPlugin()],
});

/**
 * Root state type derived from the store
 */
export type RootState = RematchRootState<typeof models>;

/**
 * Typed dispatch including effects
 */
export type Dispatch = RematchDispatch<typeof models>;

/**
 * Typed useDispatch hook
 * @returns Typed dispatch function
 */
export const useAppDispatch = () => useDispatch<Dispatch>();

/**
 * Typed useSelector hook
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

/**
 * Helper type for extracting loading state
 */
type LoadingPlugin = ExtraModelsFromLoading<typeof models>;

/**
 * Full root state including loading plugin state
 */
export type FullRootState = RootState & LoadingPlugin;
```

## Additional Guidelines:

- Consider adding additional plugins like `@rematch/persist` for state persistence.
- Implement a custom middleware for logging or analytics if needed.
- Set up environment-specific store configurations (e.g., enabling Redux DevTools only in development).
- Consider implementing code splitting for models using dynamic imports.
- Add type guards or type predicates if necessary for more precise typing.
- Implement a mechanism for adding models dynamically if your application requires it.
- Write integration tests for the store configuration.

Remember to keep your store configuration clean and maintainable. The store should be the single source of truth for your application state.
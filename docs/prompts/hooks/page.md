# Prompt for usePageData Custom Hook

Create a custom React hook named `usePageData` that manages fetching and caching of page data. This hook should integrate with the Rematch store and provide a clean, efficient interface for components to consume page data.

## Requirements:

1. Hook Structure:
   - Implement the hook using React's useState and useEffect hooks
   - Use TypeScript for strong typing of arguments and return values

2. Parameters:
   - Accept a `pageId: ID` parameter to specify which page data to fetch

3. Return Value:
   - Return an object containing:
     - `pageData: PageData | null`: The fetched page data or null if not yet loaded
     - `loading: boolean`: Indicating whether the data is currently being fetched
     - `error: Error | null`: Any error that occurred during fetching, or null if no error

4. State Management:
   - Use the Rematch store for state management, following patterns from the provided `posts.ts` file
   - Implement selectors to efficiently retrieve data from the store

5. Data Fetching:
   - Trigger data fetching when the hook is first called with a new pageId
   - Implement caching to avoid unnecessary API calls for already fetched data
   - Use the appropriate Rematch effect for fetching data

6. Error Handling:
   - Properly catch and handle any errors that occur during data fetching
   - Provide meaningful error messages

7. Performance Optimization:
   - Implement debouncing or throttling if rapid pageId changes are expected
   - Use memoization to prevent unnecessary re-computations

8. TypeScript Usage:
   - Use proper TypeScript typing throughout the hook
   - Utilize utility types where appropriate (e.g., Partial, Pick)

9. Testing:
   - Include comments or TODO markers for unit tests
   - Consider implementing tests for different scenarios (loading, success, error)

10. Documentation:
    - Provide comprehensive JSDoc comments for the hook and its functions
    - Include inline comments for complex logic

## Example Structure:

```typescript
import { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, Dispatch } from '../store';
import { ID, PageData } from '../types/coreTypes';

interface UsePageDataResult {
    pageData: PageData | null;
    loading: boolean;
    error: Error | null;
}

/**
 * Custom hook for fetching and managing page data.
 *
 * @param {ID} pageId - The ID of the page to fetch
 * @returns {UsePageDataResult} An object containing the page data, loading state, and any errors
 */
export const usePageData = (pageId: ID): UsePageDataResult => {
    const dispatch = useDispatch<Dispatch>();
    const pageData = useSelector((state: RootState) => state.pages.byId[pageId]);
    const loading = useSelector((state: RootState) => state.pages.loading);
    const error = useSelector((state: RootState) => state.pages.error);

    useEffect(() => {
        if (!pageData && !loading && !error) {
            dispatch.pages.fetchPageData(pageId);
        }
    }, [pageId, pageData, loading, error, dispatch.pages]);

    return useMemo(() => ({
        pageData: pageData || null,
        loading,
        error,
    }), [pageData, loading, error]);
};

// TODO: Implement unit tests for usePageData
// - Test initial loading state
// - Test successful data fetching
// - Test error handling
// - Test caching behavior (no refetch for already loaded data)

export default usePageData;
```

Ensure that the `usePageData` hook efficiently manages page data, integrates well with the Rematch store, and provides a clean, type-safe interface for components to consume page data.
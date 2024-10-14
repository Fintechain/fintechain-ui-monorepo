# WordPress Hook Generation Prompt

Create a custom React hook for [HOOK_NAME] to interact with the WordPress API:

1. Use TypeScript for type safety.
2. Import necessary types from the shared types file.
3. Utilize the WpApiService for making API calls.
4. Implement proper error handling and loading states.
5. Use React Query for data fetching and caching.
6. Define return types using TypeScript interfaces.
7. Include JSDoc comments for documentation.
8. Consider edge cases and provide default values where appropriate.

Example structure:

```typescript
import { useQuery, UseQueryResult } from 'react-query';
import { wpApiService } from '../services/wp-api.service';
import { Post, PostQueryParams } from '@myorg/shared/types';

export function use[HOOK_NAME](params?: PostQueryParams): UseQueryResult<Post[], Error> {
  return useQuery(['posts', params], () => wpApiService.getPosts(params), {
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });
}
```

Key considerations:
- Ensure the hook aligns with the WpApiService methods.
- Implement proper caching strategies using React Query.
- Handle pagination if applicable.
- Consider implementing data transformation if needed.
- Provide options for real-time updates if required.

Please specify any additional parameters or functionality this hook should support for interacting with the WordPress API.
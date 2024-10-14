# Comprehensive WordPress React Components Specification

## Project Structure
```
my-nx-monorepo/
├── libs/
│   ├── shared/
│   │   ├── ui/
│   │   └── wordpress/
│   │       ├── data/
│   │       └── ui/
└── apps/
    └── fintechain/
        └── website/
```

## Component Specifications

### 1. lib/shared/wordpress/data

This library contains services, hooks, and utilities for interacting with the WordPress REST API.

#### a. `wpApiService.ts`
Purpose: Central service for making API calls to WordPress
Methods:
- `getPosts(params?: PostQueryParams): Promise<Post[]>`
- `getPost(id: number): Promise<Post>`
- `getPages(params?: PageQueryParams): Promise<Page[]>`
- `getPage(id: number): Promise<Page>`
- `getCategories(params?: CategoryQueryParams): Promise<Category[]>`
- `getTags(params?: TagQueryParams): Promise<Tag[]>`
- `getComments(postId: number, params?: CommentQueryParams): Promise<Comment[]>`
- `submitComment(comment: CommentSubmission): Promise<Comment>`
- `getUser(id: number): Promise<User>`
- `getMedia(params?: MediaQueryParams): Promise<Media[]>`
- `search(query: string, params?: SearchQueryParams): Promise<SearchResult[]>`
- `getCustomPostTypes(type: string, params?: CustomPostTypeQueryParams): Promise<CustomPostType[]>`
- `getTaxonomies(): Promise<Taxonomy[]>`
- `getTerms(taxonomy: string, params?: TermQueryParams): Promise<Term[]>`

#### b. Custom hooks:
- `usePost(id: number)`
- `usePosts(params?: PostQueryParams)`
- `usePage(id: number)`
- `usePages(params?: PageQueryParams)`
- `useCategories(params?: CategoryQueryParams)`
- `useTags(params?: TagQueryParams)`
- `useComments(postId: number, params?: CommentQueryParams)`
- `useUser(id: number)`
- `useSearch(query: string, params?: SearchQueryParams)`
- `useMedia(params?: MediaQueryParams)`
- `useCustomPostTypes(type: string, params?: CustomPostTypeQueryParams)`
- `useTaxonomies()`
- `useUI()`

### 2. lib/shared/wordpress/ui

This library contains React components specific to WordPress content rendering.

a. `PostCard.tsx`
   - Props: `{ post: Post }`
   - Displays: Title, excerpt, featured image, date, author, categories

b. `PostList.tsx`
   - Props: `{ posts: Post[], loading: boolean, error: string | null }`
   - Displays: List of PostCard components, loading state, and error messages

c. `PageContent.tsx`
   - Props: `{ page: Page }`
   - Displays: Title, content, featured image

d. `PostContent.tsx`
   - Props: `{ post: Post }`
   - Displays: Title, content, featured image, date, author, categories, tags

e. `CategoryList.tsx`
   - Props: `{ categories: Category[] }`
   - Displays: List of categories with links

f. `TagCloud.tsx`
   - Props: `{ tags: Tag[] }`
   - Displays: Cloud or list of tags with links

g. `CommentList.tsx`
   - Props: `{ comments: Comment[] }`
   - Displays: List of comments with author, date, and content

h. `CommentForm.tsx`
   - Props: `{ postId: number, onSubmit: (comment: CommentSubmission) => void }`
   - Displays: Form for submitting a new comment

i. `AuthorBio.tsx`
   - Props: `{ author: User }`
   - Displays: Author name, avatar, bio

j. `FeaturedImage.tsx`
   - Props: `{ image: Media, alt: string }`
   - Displays: Responsive featured image

k. `Pagination.tsx`
   - Props: `{ currentPage: number, totalPages: number, onPageChange: (page: number) => void }`
   - Displays: Pagination controls

l. `SearchForm.tsx`
   - Props: `{ onSearch: (query: string) => void }`
   - Displays: Search input and submit button

m. `CustomPostTypeList.tsx`
   - Props: `{ posts: CustomPostType[], type: string, loading: boolean, error: string | null }`
   - Displays: List of custom post types, loading state, and error messages

### 3. lib/shared/ui

This library contains generic UI components that can be used across different projects.

a. `Button.tsx`
b. `Input.tsx`
c. `Spinner.tsx`
d. `ErrorMessage.tsx`
e. `Card.tsx`
f. `Modal.tsx`

### 4. apps/fintechain-website

This is where you'll compose the components to create pages for the Fintechain website.

a. `HomePage.tsx`
   - Composes: `PostList`, `CategoryList`, `TagCloud`

b. `SinglePostPage.tsx`
   - Composes: `PostContent`, `CommentList`, `CommentForm`, `AuthorBio`

c. `SinglePagePage.tsx`
   - Composes: `PageContent`

d. `ArchivePage.tsx`
   - Composes: `PostList`, `Pagination`

e. `SearchPage.tsx`
   - Composes: `SearchForm`, `PostList`, `Pagination`

## Component Implementation Guidelines

1. Use TypeScript for type safety.
2. Implement error handling and loading states in each component.
3. Use React Query for efficient data fetching and caching in custom hooks.
4. Implement responsive design in all UI components.
5. Use CSS modules or styled-components for component-specific styling.
6. Implement accessibility features (ARIA attributes, keyboard navigation).
7. Use React.memo() for performance optimization where appropriate.

## API Interaction Example

```typescript
// In lib/shared/wordpress/data/hooks/usePosts.ts
import { useQuery } from 'react-query';
import { wpApiService } from '../wpApiService';

export function usePosts(params?: PostQueryParams) {
  return useQuery(['posts', params], () => wpApiService.getPosts(params));
}

// In apps/fintechain-website/src/pages/HomePage.tsx
import { usePosts } from '@myorg/shared/wordpress/data';
import { PostList, Spinner, ErrorMessage } from '@myorg/shared/wordpress/ui';

export function HomePage() {
  const { data: posts, isLoading, error } = usePosts({ per_page: 10 });

  if (isLoading) return <Spinner />;
  if (error) return <ErrorMessage message={error.message} />;

  return <PostList posts={posts} />;
}
```

## Additional Considerations

1. Implement proper error boundaries in your React components.
2. Use environment variables for API URLs and other configuration.
3. Implement unit tests for your components and hooks.
4. Consider implementing Storybook for your UI components for easier development and testing.
5. Keep your components as pure and reusable as possible, moving business logic to custom hooks where appropriate.
6. Ensure that all components and hooks are properly exported from their respective modules for easy importing.
7. Consider implementing a global state management solution (like Redux or Recoil) if complex state sharing between components becomes necessary.
8. Implement proper TypeScript interfaces for all props and state objects to ensure type safety across the application.

This revised specification provides a comprehensive structure for building a WordPress-powered React application using an Nx monorepo setup. It covers all aspects of interacting with the WordPress REST API, from service methods to custom hooks and UI components. The structure allows for a clean separation of concerns, reusability across projects, and a clear organization of WordPress-specific and generic UI components.
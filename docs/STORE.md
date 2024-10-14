# Revised Comprehensive Rematch Store Specification

## Overview

This specification outlines the Rematch store structure for the WordPress-powered React application, incorporating the provided type definitions. The store is divided into multiple models, each responsible for managing a specific aspect of the application state.

## Type Definitions

### Entity Types

```typescript
export interface Post {
    id: number;
    title: { rendered: string };
    content: { rendered: string };
    excerpt: { rendered: string };
    date: string;
    featured_media: number;
    _embedded?: {
        'wp:featuredmedia'?: Array<{
            source_url: string;
            alt_text: string;
        }>;
    };
}

export interface Page {
    id: number;
    title: { rendered: string };
    content: { rendered: string };
    parent: number;
}

export interface Media {
    id: number;
    title: { rendered: string };
    source_url: string;
    media_type: string;
    mime_type: string;
}

export interface CustomPostType {
    id: number;
    title: { rendered: string };
    content: { rendered: string };
    type: string;
}

export interface Taxonomy {
    name: string;
    slug: string;
}

export interface Term {
    id: number;
    name: string;
    slug: string;
    taxonomy: string;
}
```

### Query Parameter Types

```typescript
export interface PostQueryParams {
    page?: number;
    per_page?: number;
    search?: string;
    include?: number[];
    exclude?: number[];
    order?: 'asc' | 'desc';
    orderby?: string;
    slug?: string;
    status?: string;
    categories?: number[];
    tags?: number[];
    sticky?: boolean;
}

export interface PageQueryParams {
    page?: number;
    per_page?: number;
    parent?: number;
}

export interface MediaQueryParams {
    page?: number;
    per_page?: number;
    media_type?: string;
}

export interface CustomPostTypeQueryParams {
    page?: number;
    per_page?: number;
    type?: string;
}

export interface TermQueryParams {
    page?: number;
    per_page?: number;
    taxonomy?: string;
}
```

## Models

### 1. Posts Model

#### State
```typescript
export interface PostsState {
    byId: Record<number, Post>;
    allIds: number[];
    loading: boolean;
    error: string | null;
    totalPages: number;
}
```

#### Reducers
1. `setLoading(state, loading: boolean)`
2. `setPosts(state, posts: Post[])`
3. `setError(state, error: string | null)`
4. `setTotalPages(state, totalPages: number)`

#### Effects
1. `fetchPosts(params: PostQueryParams)`
2. `fetchPostById(id: number)`

### 2. Pages Model

#### State
```typescript
export interface PagesState {
    byId: Record<number, Page>;
    allIds: number[];
    loading: boolean;
    error: string | null;
    totalPages: number;
}
```

#### Reducers
1. `setLoading(state, loading: boolean)`
2. `setPages(state, pages: Page[])`
3. `setError(state, error: string | null)`
4. `setTotalPages(state, totalPages: number)`

#### Effects
1. `fetchPages(params: PageQueryParams)`
2. `fetchPageById(id: number)`

### 3. Media Model

#### State
```typescript
export interface MediaState {
    byId: Record<number, Media>;
    allIds: number[];
    loading: boolean;
    error: string | null;
    totalPages: number;
}
```

#### Reducers
1. `setLoading(state, loading: boolean)`
2. `setMedia(state, media: Media[])`
3. `setError(state, error: string | null)`
4. `setTotalPages(state, totalPages: number)`

#### Effects
1. `fetchMedia(params: MediaQueryParams)`
2. `fetchMediaById(id: number)`

### 4. Custom Post Types Model

#### State
```typescript
export interface CustomPostTypesState {
    byType: Record<string, {
        byId: Record<number, CustomPostType>;
        allIds: number[];
    }>;
    loading: boolean;
    error: string | null;
    totalPages: Record<string, number>;
}
```

#### Reducers
1. `setLoading(state, loading: boolean)`
2. `setCustomPostTypes(state, { type, posts }: { type: string, posts: CustomPostType[] })`
3. `setError(state, error: string | null)`
4. `setTotalPages(state, { type, totalPages }: { type: string, totalPages: number })`

#### Effects
1. `fetchCustomPostTypes(type: string, params: CustomPostTypeQueryParams)`
2. `fetchCustomPostTypeById(type: string, id: number)`

### 5. Taxonomies Model

#### State
```typescript
export interface TaxonomiesState {
    list: Taxonomy[];
    terms: Record<string, {
        byId: Record<number, Term>;
        allIds: number[];
    }>;
    loading: boolean;
    error: string | null;
    totalPages: Record<string, number>;
}
```

#### Reducers
1. `setLoading(state, loading: boolean)`
2. `setTaxonomies(state, taxonomies: Taxonomy[])`
3. `setTerms(state, { taxonomy, terms }: { taxonomy: string, terms: Term[] })`
4. `setError(state, error: string | null)`
5. `setTotalPages(state, { taxonomy, totalPages }: { taxonomy: string, totalPages: number })`

#### Effects
1. `fetchTaxonomies()`
2. `fetchTerms(taxonomy: string, params: TermQueryParams)`
3. `fetchTermById(taxonomy: string, id: number)`

### 6. UI Model

#### State
```typescript
export interface UIState {
    currentPostId: number | null;
    currentPageId: number | null;
    currentCustomPostType: string | null;
    currentCustomPostId: number | null;
    currentTaxonomy: string | null;
    currentTermId: number | null;
    globalError: string | null;
}
```

#### Reducers
1. `setCurrentPostId(state, id: number | null)`
2. `setCurrentPageId(state, id: number | null)`
3. `setCurrentCustomPostType(state, type: string | null)`
4. `setCurrentCustomPostId(state, id: number | null)`
5. `setCurrentTaxonomy(state, taxonomy: string | null)`
6. `setCurrentTermId(state, id: number | null)`
7. `setGlobalError(state, error: string | null)`

## Root Model

The root model combines all the individual models:

```typescript
export interface RootModel extends Models<RootModel> {
    posts: typeof posts;
    pages: typeof pages;
    media: typeof media;
    customPostTypes: typeof customPostTypes;
    taxonomies: typeof taxonomies;
    ui: typeof ui;
}

export interface WPState {
    posts: PostsState;
    pages: PagesState;
    media: MediaState;
    customPostTypes: CustomPostTypesState;
    taxonomies: TaxonomiesState;
    ui: UIState;
    [key: string]: any;
}
```

## Store Configuration

```typescript
import { init, RematchDispatch, RematchRootState } from '@rematch/core';
import { posts } from './models/posts';
import { pages } from './models/pages';
import { media } from './models/media';
import { customPostTypes } from './models/customPostTypes';
import { taxonomies } from './models/taxonomies';
import { ui } from './models/ui';

const models: RootModel = {
    posts,
    pages,
    media,
    customPostTypes,
    taxonomies,
    ui,
};

export const store = init({
    models,
    // Add any plugins or middleware here
});

export type Store = typeof store;
export type Dispatch = RematchDispatch<RootModel>;
export type RootState = RematchRootState<RootModel>;
```

## Usage with React

To use this Rematch store with React, wrap your application with the Redux Provider:

```typescript
import { Provider } from 'react-redux';
import { store } from './store';

const App = () => (
    <Provider store={store}>
        {/* Your application components */}
    </Provider>
);
```

You can then create custom hooks for each model to access and update the state in your components:

```typescript
import { useSelector, useDispatch } from 'react-redux';
import { RootState, Dispatch } from './store';

export const usePosts = () => {
    const posts = useSelector((state: RootState) => state.posts);
    const dispatch = useDispatch<Dispatch>();

    const fetchPosts = (params: PostQueryParams) => dispatch.posts.fetchPosts(params);

    return { ...posts, fetchPosts };
};

// Create similar hooks for other models
```

This revised specification provides a comprehensive structure for your Rematch store, incorporating the detailed type definitions you provided. It covers all aspects of state management for your WordPress-powered React application, allowing for efficient state updates, data fetching, and component interactions while maintaining a clear separation of concerns.
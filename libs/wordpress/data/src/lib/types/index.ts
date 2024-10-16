import { Models } from "@rematch/core";

// Entity Types

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
    author: number;
    categories: number[];
    tags: number[];
    slug: string;
    status: string;
}

export interface Page {
    id: number;
    title: { rendered: string };
    content: { rendered: string };
    parent: number;
    slug: string;
    status: string;
}

export interface Media {
    id: number;
    title: { rendered: string };
    source_url: string;
    media_type: string;
    mime_type: string;
    alt_text: string;
    caption: { rendered: string };
}

export interface Category {
    id: number;
    name: string;
    slug: string;
    parent: number;
    description: string;
    count: number;
}

export interface Tag {
    id: number;
    name: string;
    slug: string;
    description: string;
    count: number;
}

export interface Comment {
    id: number;
    post: number;
    parent: number;
    author: number;
    author_name: string;
    author_email: string;
    content: { rendered: string };
    date: string;
    status: string;
}

export interface CommentSubmission {
    post: number;
    parent?: number;
    author_name: string;
    author_email: string;
    content: string;
}

export interface User {
    id: number;
    name: string;
    slug: string;
    description: string;
    avatar_urls: Record<string, string>;
}

export interface CustomPostType {
    id: number;
    title: { rendered: string };
    content: { rendered: string };
    type: string;
    slug: string;
    status: string;
}

export interface Taxonomy {
    name: string;
    slug: string;
    description: string;
    types: string[];
    hierarchical: boolean;
}

export interface Term {
    id: number;
    name: string;
    slug: string;
    taxonomy: string;
    description: string;
    parent: number;
    count: number;
}

export interface SearchResult {
    id: number;
    title: string;
    url: string;
    type: string;
    subtype: string;
}

// Query Parameter Types

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
    before?: string;
    after?: string;
    author?: number;
    author_exclude?: number;
}

export interface PageQueryParams {
    page?: number;
    per_page?: number;
    search?: string;
    include?: number[];
    exclude?: number[];
    order?: 'asc' | 'desc';
    orderby?: string;
    slug?: string;
    status?: string;
    parent?: number;
    parent_exclude?: number;
}

export interface MediaQueryParams {
    page?: number;
    per_page?: number;
    search?: string;
    include?: number[];
    exclude?: number[];
    order?: 'asc' | 'desc';
    orderby?: string;
    media_type?: string;
    mime_type?: string;
    parent?: number;
    author?: number;
}

export interface CategoryQueryParams {
    page?: number;
    per_page?: number;
    search?: string;
    include?: number[];
    exclude?: number[];
    order?: 'asc' | 'desc';
    orderby?: string;
    slug?: string;
    parent?: number;
    post?: number;
    hide_empty?: boolean;
}

export interface TagQueryParams {
    page?: number;
    per_page?: number;
    search?: string;
    include?: number[];
    exclude?: number[];
    order?: 'asc' | 'desc';
    orderby?: string;
    slug?: string;
    post?: number;
    hide_empty?: boolean;
}

export interface CommentQueryParams {
    page?: number;
    per_page?: number;
    search?: string;
    include?: number[];
    exclude?: number[];
    order?: 'asc' | 'desc';
    orderby?: string;
    parent?: number;
    post?: number;
    status?: string;
    type?: string;
}

export interface CustomPostTypeQueryParams {
    page?: number;
    per_page?: number;
    search?: string;
    include?: number[];
    exclude?: number[];
    order?: 'asc' | 'desc';
    orderby?: string;
    slug?: string;
    status?: string;
}

export interface TermQueryParams {
    page?: number;
    per_page?: number;
    search?: string;
    include?: number[];
    exclude?: number[];
    order?: 'asc' | 'desc';
    orderby?: string;
    slug?: string;
    parent?: number;
    post?: number;
    hide_empty?: boolean;
}

export interface SearchQueryParams {
    page?: number;
    per_page?: number;
    search?: string;
    type?: string;
    subtype?: string;
}

// State Types

export interface WPState {
    posts: PostsState;
    pages: PagesState;
    media: MediaState;
    customPostTypes: CustomPostTypesState;
    taxonomies: TaxonomiesState;
    ui: UIState;
    [key: string]: any;
}

export interface PostsState {
    byId: Record<number, Post>;
    allIds: number[];
    loading: boolean;
    error: string | null;
    totalPages: number;
}

export interface PagesState {
    byId: Record<number, Page>;
    bySlug: Record<string, Page>;
    allIds: number[];
    loading: boolean;
    error: string | null;
    totalPages: number;
}

export interface MediaState {
    byId: Record<number, Media>;
    allIds: number[];
    loading: boolean;
    error: string | null;
    totalPages: number;
}

export interface CustomPostTypesState {
    byType: Record<string, {
        byId: Record<number, CustomPostType>;
        allIds: number[];
    }>;
    loading: boolean;
    error: string | null;
    totalPages: Record<string, number>;
}

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

export interface UIState {
    currentPostId: number | null;
    currentPageId: number | null;
    currentCustomPostType: string | null;
    currentCustomPostId: number | null;
    currentTaxonomy: string | null;
    currentTermId: number | null;
    globalError: string | null;
}
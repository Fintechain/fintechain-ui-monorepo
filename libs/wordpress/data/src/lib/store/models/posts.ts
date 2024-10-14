import { createModel } from '@rematch/core';
import { RootModel } from '../models';
import WpApiService from '../../services/wp-api.service';
import {
    Post,
    PostQueryParams,
    PostsState
} from '../../types';

const wpApiService = new WpApiService('https://your-wordpress-site.com/wp-json');

/**
 * Posts Model
 * 
 * Manages the state and operations related to WordPress posts.
 */
export const posts = createModel<RootModel>()({
    state: {
        byId: {},
        allIds: [],
        loading: false,
        error: null,
        totalPages: 0
    } as PostsState,

    reducers: {
        /**
         * Sets the loading state
         */
        setLoading(state, loading: boolean): PostsState {
            return { ...state, loading, error: null };
        },

        /**
         * Sets posts in the state
         */
        setPosts(state, posts: Post[]): PostsState {
            const byId = posts.reduce((acc, post) => {
                acc[post.id] = post;
                return acc;
            }, { ...state.byId });
            const allIds = Array.from(new Set([...state.allIds, ...posts.map(post => post.id)]));
            return { ...state, byId, allIds };
        },

        /**
         * Sets a single post in the state
         */
        setPost(state, post: Post): PostsState {
            return {
                ...state,
                byId: { ...state.byId, [post.id]: post },
                allIds: state.allIds.includes(post.id) ? state.allIds : [...state.allIds, post.id]
            };
        },

        /**
         * Sets an error in the state
         */
        setError(state, error: string): PostsState {
            return { ...state, error, loading: false };
        },

        /**
         * Sets the total number of pages
         */
        setTotalPages(state, totalPages: number): PostsState {
            return { ...state, totalPages };
        }
    },

    effects: (dispatch) => ({
        /**
         * Fetches posts based on the provided query parameters
         */
        async fetchPosts(params: PostQueryParams): Promise<void> {
            dispatch.posts.setLoading(true);
            try {
                const posts = await wpApiService.getPosts(params);
                dispatch.posts.setPosts(posts);
                // Note: We don't have access to headers in the current implementation
                // so we can't set total pages. This would need to be handled differently
                // or the API service would need to be modified to return this information.
            } catch (error) {
                dispatch.posts.setError(error instanceof Error ? error.message : 'An error occurred while fetching posts');
            } finally {
                dispatch.posts.setLoading(false);
            }
        },

        /**
         * Fetches a single post by its ID
         */
        async fetchPostById(id: number): Promise<void> {
            dispatch.posts.setLoading(true);
            try {
                const post = await wpApiService.getPost(id);
                dispatch.posts.setPost(post);
            } catch (error) {
                dispatch.posts.setError(error instanceof Error ? error.message : 'An error occurred while fetching posts');
            } finally {
                dispatch.posts.setLoading(false);
            }
        }
    })
});
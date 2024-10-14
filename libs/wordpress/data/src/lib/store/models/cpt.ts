import { createModel } from '@rematch/core';
import { RootModel } from '../models';
import WpApiService from '../../services/wp-api.service';
import {
    CustomPostType,
    CustomPostTypeQueryParams,
    CustomPostTypesState
} from '../../types';

const wpApiService = new WpApiService('https://your-wordpress-site.com/wp-json');

/**
 * Custom Post Types Model
 * 
 * Manages the state and operations related to WordPress custom post types.
 */
export const customPostTypes = createModel<RootModel>()({
    state: {
        byType: {},
        loading: false,
        error: null,
        totalPages: {}
    } as CustomPostTypesState,

    reducers: {
        /**
         * Sets the loading state
         */
        setLoading(state, loading: boolean): CustomPostTypesState {
            return { ...state, loading, error: null };
        },

        /**
         * Sets custom post types in the state for a specific type
         */
        setCustomPostTypes(state, { type, posts }: { type: string, posts: CustomPostType[] }): CustomPostTypesState {
            const byId = posts.reduce((acc, post) => {
                acc[post.id] = post;
                return acc;
            }, {} as Record<number, CustomPostType>);
            const allIds = posts.map(post => post.id);
            return {
                ...state,
                byType: {
                    ...state.byType,
                    [type]: {
                        byId: { ...state.byType[type]?.byId, ...byId },
                        allIds: Array.from(new Set([...state.byType[type]?.allIds ?? [], ...allIds]))
                    }
                }
            };
        },

        /**
         * Sets a single custom post type in the state
         */
        setCustomPostType(state, { type, post }: { type: string, post: CustomPostType }): CustomPostTypesState {
            return {
                ...state,
                byType: {
                    ...state.byType,
                    [type]: {
                        byId: { ...state.byType[type]?.byId, [post.id]: post },
                        allIds: state.byType[type]?.allIds?.includes(post.id)
                            ? state.byType[type]?.allIds ?? []
                            : [...(state.byType[type]?.allIds ?? []), post.id]
                    }
                }
            };
        },

        /**
         * Sets an error in the state
         */
        setError(state, error: string): CustomPostTypesState {
            return { ...state, error, loading: false };
        },

        /**
         * Sets the total number of pages for a specific custom post type
         */
        setTotalPages(state, { type, totalPages }: { type: string, totalPages: number }): CustomPostTypesState {
            return {
                ...state,
                totalPages: { ...state.totalPages, [type]: totalPages }
            };
        }
    },

    effects: (dispatch) => ({
        /**
         * Fetches custom post types based on the provided type and query parameters
         */
        async fetchCustomPostTypes(payload: { type: string, params?: CustomPostTypeQueryParams }): Promise<void> {
            const { type, params } = payload;
            dispatch.customPostTypes.setLoading(true);
            try {
                const posts = await wpApiService.getCustomPostTypes(type, params);
                dispatch.customPostTypes.setCustomPostTypes({ type, posts });
                // Note: We don't have access to headers in the current implementation
                // so we can't set total pages. This would need to be handled differently
                // or the API service would need to be modified to return this information.
            } catch (error) {
                dispatch.customPostTypes.setError(error instanceof Error ? error.message : 'An error occurred while fetching custom post types');
            } finally {
                dispatch.customPostTypes.setLoading(false);
            }
        },

        /**
         * Fetches a single custom post type by its ID and type
         */
        async fetchCustomPostTypeById(payload: { type: string, id: number }): Promise<void> {
            const { type, id } = payload;
            dispatch.customPostTypes.setLoading(true);
            try {
                // Note: The current WpApiService doesn't have a method to fetch a single custom post type.
                // We'll use the getCustomPostTypes method with the 'include' parameter as a workaround.
                const posts = await wpApiService.getCustomPostTypes(type, { include: [id] });
                if (posts.length > 0) {
                    dispatch.customPostTypes.setCustomPostType({ type, post: posts[0] });
                } else {
                    throw new Error('Custom post type not found');
                }
            } catch (error) {
                dispatch.customPostTypes.setError(error instanceof Error ? error.message : 'An error occurred while fetching the custom post type');
            } finally {
                dispatch.customPostTypes.setLoading(false);
            }
        }
    })
});
import { createModel } from '@rematch/core';
import { RootModel } from '../models';
import WpApiService from '../../services/wp-api.service';
import {
    Media,
    MediaQueryParams,
    MediaState
} from '../../types';

const wpApiService = new WpApiService('https://your-wordpress-site.com/wp-json');

/**
 * Media Model
 * 
 * Manages the state and operations related to WordPress media.
 */
export const media = createModel<RootModel>()({
    state: {
        byId: {},
        allIds: [],
        loading: false,
        error: null,
        totalPages: 0
    } as MediaState,

    reducers: {
        /**
         * Sets the loading state
         */
        setLoading(state, loading: boolean): MediaState {
            return { ...state, loading, error: null };
        },

        /**
         * Sets media items in the state
         */
        setMedia(state, mediaItems: Media[]): MediaState {
            const byId = mediaItems.reduce((acc, item) => {
                acc[item.id] = item;
                return acc;
            }, { ...state.byId });
            const allIds = Array.from(new Set([...state.allIds, ...mediaItems.map(item => item.id)]));
            return { ...state, byId, allIds };
        },

        /**
         * Sets a single media item in the state
         */
        setMediaItem(state, mediaItem: Media): MediaState {
            return {
                ...state,
                byId: { ...state.byId, [mediaItem.id]: mediaItem },
                allIds: state.allIds.includes(mediaItem.id) ? state.allIds : [...state.allIds, mediaItem.id]
            };
        },

        /**
         * Sets an error in the state
         */
        setError(state, error: string): MediaState {
            return { ...state, error, loading: false };
        },

        /**
         * Sets the total number of pages
         */
        setTotalPages(state, totalPages: number): MediaState {
            return { ...state, totalPages };
        }
    },

    effects: (dispatch) => ({
        /**
         * Fetches media items based on the provided query parameters
         */
        async fetchMedia(params: MediaQueryParams): Promise<void> {
            dispatch.media.setLoading(true);
            try {
                const mediaItems = await wpApiService.getMedia(params);
                dispatch.media.setMedia(mediaItems);
                // Note: We don't have access to headers in the current implementation
                // so we can't set total pages. This would need to be handled differently
                // or the API service would need to be modified to return this information.
            } catch (error) {
                dispatch.media.setError(error instanceof Error ? error.message : 'An error occurred while fetching media');
            } finally {
                dispatch.media.setLoading(false);
            }
        },

        /**
         * Fetches a single media item by its ID
         */
        async fetchMediaById(id: number): Promise<void> {
            dispatch.media.setLoading(true);
            try {
                // Note: The current WpApiService doesn't have a method to fetch a single media item.
                // We'll use the getMedia method with the 'include' parameter as a workaround.
                const mediaItems = await wpApiService.getMedia({ include: [id] });
                if (mediaItems.length > 0) {
                    dispatch.media.setMediaItem(mediaItems[0]);
                } else {
                    throw new Error('Media item not found');
                }
            } catch (error) {
                dispatch.media.setError(error instanceof Error ? error.message : 'An error occurred while fetching the media item');
            } finally {
                dispatch.media.setLoading(false);
            }
        }
    })
});
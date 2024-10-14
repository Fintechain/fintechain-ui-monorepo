import { createModel } from '@rematch/core';
import { RootModel } from '../models';
import { UIState } from '../../types';

/**
 * UI Model
 * 
 * Manages the UI state related to WordPress content navigation.
 */
export const ui = createModel<RootModel>()({
    state: {
        currentPostId: null,
        currentPageId: null,
        currentCustomPostType: null,
        currentCustomPostId: null,
        currentTaxonomy: null,
        currentTermId: null,
        globalError: null
    } as UIState,

    reducers: {
        /**
         * Sets the current post ID
         */
        setCurrentPostId(state, id: number | null): UIState {
            return { ...state, currentPostId: id };
        },

        /**
         * Sets the current page ID
         */
        setCurrentPageId(state, id: number | null): UIState {
            return { ...state, currentPageId: id };
        },

        /**
         * Sets the current custom post type
         */
        setCurrentCustomPostType(state, type: string | null): UIState {
            return { ...state, currentCustomPostType: type };
        },

        /**
         * Sets the current custom post ID
         */
        setCurrentCustomPostId(state, id: number | null): UIState {
            return { ...state, currentCustomPostId: id };
        },

        /**
         * Sets the current taxonomy
         */
        setCurrentTaxonomy(state, taxonomy: string | null): UIState {
            return { ...state, currentTaxonomy: taxonomy };
        },

        /**
         * Sets the current term ID
         */
        setCurrentTermId(state, id: number | null): UIState {
            return { ...state, currentTermId: id };
        },

        /**
         * Sets a global error message
         */
        setGlobalError(state, error: string | null): UIState {
            return { ...state, globalError: error };
        },

        /**
         * Resets the UI state
         */
        resetUIState(): UIState {
            return {
                currentPostId: null,
                currentPageId: null,
                currentCustomPostType: null,
                currentCustomPostId: null,
                currentTaxonomy: null,
                currentTermId: null,
                globalError: null
            };
        }
    },

    effects: (dispatch) => ({
        /**
         * Updates the UI state based on the current route
         * This effect doesn't interact with the WpApiService but could be
         * used to update the UI state based on route changes
         */
        updateUIFromRoute(
            payload: {
                postId?: number;
                pageId?: number;
                customPostType?: string;
                customPostId?: number;
                taxonomy?: string;
                termId?: number;
            }
        ): void {
            const {
                postId,
                pageId,
                customPostType,
                customPostId,
                taxonomy,
                termId
            } = payload;

            if (postId) dispatch.ui.setCurrentPostId(postId);
            if (pageId) dispatch.ui.setCurrentPageId(pageId);
            if (customPostType) dispatch.ui.setCurrentCustomPostType(customPostType);
            if (customPostId) dispatch.ui.setCurrentCustomPostId(customPostId);
            if (taxonomy) dispatch.ui.setCurrentTaxonomy(taxonomy);
            if (termId) dispatch.ui.setCurrentTermId(termId);
        }
    })
});
import { createModel } from '@rematch/core';
import { RootModel } from '../models';
import WpApiService from '../../services/wp-api.service';
import {
    Page,
    PageQueryParams,
    PagesState
} from '../../types';

const wpApiService = new WpApiService("http://0.0.0.0:8080/wp-json");

/**
 * Pages Model
 * 
 * Manages the state and operations related to WordPress pages.
 */
export const pages = createModel<RootModel>()({
    state: {
        byId: {},
        allIds: [],
        bySlug: {},
        loading: false,
        error: null,
        totalPages: 0
    } as PagesState,

    reducers: {
        /**
         * Sets the loading state
         */
        setLoading(state, loading: boolean): PagesState {
            return { ...state, loading, error: null };
        },

        /**
         * Sets pages in the state
         */
        setPages(state, pages: Page[]): PagesState {
            const byId = pages.reduce((acc, page) => {
                acc[page.id] = page;
                return acc;
            }, { ...state.byId });
            const allIds = Array.from(new Set([...state.allIds, ...pages.map(page => page.id)]));
            return { ...state, byId, allIds };
        },

        /**
         * Sets a single page in the state
         */
        setPage(state, page: Page): PagesState {
            return {
                ...state,
                byId: { ...state.byId, [page.id]: page },
                allIds: state.allIds.includes(page.id) ? state.allIds : [...state.allIds, page.id]
            };
        },

        setPageBySlug(state, page: Page): PagesState {
            return {
                ...state,
                byId: { ...state.byId, [page.id]: page },
                bySlug: { ...state.bySlug, [page.slug]: page },
                allIds: state.allIds.includes(page.id) ? state.allIds : [...state.allIds, page.id]
            };
        },

        /**
         * Sets an error in the state
         */
        setError(state, error: string): PagesState {
            return { ...state, error, loading: false };
        },

        /**
         * Sets the total number of pages
         */
        setTotalPages(state, totalPages: number): PagesState {
            return { ...state, totalPages };
        }
    },

    effects: (dispatch) => ({
        /**
         * Fetches pages based on the provided query parameters
         */
        async fetchPages(params: PageQueryParams): Promise<void> {
            dispatch.pages.setLoading(true);
            try {
                const pages = await wpApiService.getPages(params);
                dispatch.pages.setPages(pages);
                // Note: We don't have access to headers in the current implementation
                // so we can't set total pages. This would need to be handled differently
                // or the API service would need to be modified to return this information.
            } catch (error) {
                dispatch.pages.setError(error instanceof Error ? error.message : 'An error occurred while fetching pages');
            } finally {
                dispatch.pages.setLoading(false);
            }
        },

        async fetchPageBySlug(slug: string): Promise<void> {
            dispatch.pages.setLoading(true);
            try {
                const page = await wpApiService.getPageBySlug(slug);
                dispatch.pages.setPageBySlug(page);
            } catch (error) {
                dispatch.pages.setError(error instanceof Error ? error.message : 'An error occurred while fetching the page');
            } finally {
                dispatch.pages.setLoading(false);
            }
        },

        /**
         * Fetches a single page by its ID
         */
        async fetchPageById(id: number): Promise<void> {
            dispatch.pages.setLoading(true);
            try {
                const page = await wpApiService.getPage(id);
                dispatch.pages.setPage(page);
            } catch (error) {
                dispatch.pages.setError(error instanceof Error ? error.message : 'An error occurred while fetching the page');
            } finally {
                dispatch.pages.setLoading(false);
            }
        }
    })
});
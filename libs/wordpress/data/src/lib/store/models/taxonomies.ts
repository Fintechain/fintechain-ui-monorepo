import { createModel } from '@rematch/core';
import { RootModel } from '../models';
import WpApiService from '../../services/wp-api.service';
import {
    Taxonomy,
    Term,
    TermQueryParams,
    TaxonomiesState
} from '../../types';

const wpApiService = new WpApiService('https://your-wordpress-site.com/wp-json');

/**
 * Taxonomies Model
 * 
 * Manages the state and operations related to WordPress taxonomies and terms.
 */
export const taxonomies = createModel<RootModel>()({
    state: {
        list: [],
        terms: {},
        loading: false,
        error: null,
        totalPages: {}
    } as TaxonomiesState,

    reducers: {
        /**
         * Sets the loading state
         */
        setLoading(state, loading: boolean): TaxonomiesState {
            return { ...state, loading, error: null };
        },

        /**
         * Sets taxonomies in the state
         */
        setTaxonomies(state, taxonomies: Taxonomy[]): TaxonomiesState {
            return { ...state, list: taxonomies };
        },

        /**
         * Sets terms for a specific taxonomy in the state
         */
        setTerms(state, { taxonomy, terms }: { taxonomy: string, terms: Term[] }): TaxonomiesState {
            const byId = terms.reduce((acc, term) => {
                acc[term.id] = term;
                return acc;
            }, {} as Record<number, Term>);
            const allIds = terms.map(term => term.id);
            return {
                ...state,
                terms: {
                    ...state.terms,
                    [taxonomy]: {
                        byId: { ...state.terms[taxonomy]?.byId, ...byId },
                        allIds: Array.from(new Set([...state.terms[taxonomy]?.allIds ?? [], ...allIds]))
                    }
                }
            };
        },

        /**
         * Sets a single term in the state
         */
        setTerm(state, { taxonomy, term }: { taxonomy: string, term: Term }): TaxonomiesState {
            return {
                ...state,
                terms: {
                    ...state.terms,
                    [taxonomy]: {
                        byId: { ...state.terms[taxonomy]?.byId, [term.id]: term },
                        allIds: state.terms[taxonomy]?.allIds?.includes(term.id)
                            ? state.terms[taxonomy]?.allIds ?? []
                            : [...(state.terms[taxonomy]?.allIds ?? []), term.id]
                    }
                }
            };
        },

        /**
         * Sets an error in the state
         */
        setError(state, error: string): TaxonomiesState {
            return { ...state, error, loading: false };
        },

        /**
         * Sets the total number of pages for a specific taxonomy
         */
        setTotalPages(state, { taxonomy, totalPages }: { taxonomy: string, totalPages: number }): TaxonomiesState {
            return {
                ...state,
                totalPages: { ...state.totalPages, [taxonomy]: totalPages }
            };
        }
    },

    effects: (dispatch) => ({
        /**
         * Fetches all taxonomies
         */
        async fetchTaxonomies(): Promise<void> {
            dispatch.taxonomies.setLoading(true);
            try {
                const taxonomies = await wpApiService.getTaxonomies();
                dispatch.taxonomies.setTaxonomies(taxonomies);
            } catch (error) {
                dispatch.taxonomies.setError(error instanceof Error ? error.message : 'An error occurred while fetching taxonomies');
            } finally {
                dispatch.taxonomies.setLoading(false);
            }
        },

        /**
         * Fetches terms for a specific taxonomy
         */
        async fetchTerms(payload: { taxonomy: string, params?: TermQueryParams }): Promise<void> {
            const { taxonomy, params } = payload;
            dispatch.taxonomies.setLoading(true);
            try {
                const terms = await wpApiService.getTerms(taxonomy, params);
                dispatch.taxonomies.setTerms({ taxonomy, terms });
                // Note: We don't have access to headers in the current implementation
                // so we can't set total pages. This would need to be handled differently
                // or the API service would need to be modified to return this information.
            } catch (error) {
                dispatch.taxonomies.setError(error instanceof Error ? error.message : 'An error occurred while fetching terms');
            } finally {
                dispatch.taxonomies.setLoading(false);
            }
        },

        /**
         * Fetches a single term by its ID and taxonomy
         */
        async fetchTermById(payload: { taxonomy: string, id: number }): Promise<void> {
            const { taxonomy, id } = payload;
            dispatch.taxonomies.setLoading(true);
            try {
                // Note: The current WpApiService doesn't have a method to fetch a single term.
                // We'll use the getTerms method with the 'include' parameter as a workaround.
                const terms = await wpApiService.getTerms(taxonomy, { include: [id] });
                if (terms.length > 0) {
                    dispatch.taxonomies.setTerm({ taxonomy, term: terms[0] });
                } else {
                    throw new Error('Term not found');
                }
            } catch (error) {
                dispatch.taxonomies.setError(error instanceof Error ? error.message : 'An error occurred while fetching the term');
            } finally {
                dispatch.taxonomies.setLoading(false);
            }
        }
    })
});
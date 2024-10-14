// useTaxonomies.ts
import { useSelector, useDispatch } from 'react-redux';
import { RootState, Dispatch } from '../../store';
import { Taxonomy, Term, TermQueryParams } from '../../types';

/**
 * Hook for accessing and fetching taxonomies and terms
 * 
 * @returns {Object} An object containing taxonomy and term data and functions to fetch them
 */
export const useTaxonomies = (): {
    taxonomies: Taxonomy[];
    terms: Record<string, Term[]>;
    fetchTaxonomies: () => void;
    fetchTerms: (taxonomy: string, params: TermQueryParams) => void;
    isLoading: boolean;
    error: string | null;
    totalPages: Record<string, number>;
} => {
    // Select the taxonomies state from the store
    const taxonomiesState = useSelector((state: RootState) => state.taxonomies);

    // Get the dispatch function
    const dispatch = useDispatch<Dispatch>();

    // Functions to fetch taxonomies and terms
    const fetchTaxonomies = () => dispatch.taxonomies.fetchTaxonomies();
    const fetchTerms = (taxonomy: string, params: TermQueryParams) =>
        dispatch.taxonomies.fetchTerms({ taxonomy, params });

    // Convert terms byId objects to arrays for each taxonomy
    const terms: Record<string, Term[]> = {};
    Object.entries(taxonomiesState.terms).forEach(([taxonomy, data]) => {
        terms[taxonomy] = Object.values(data.byId);
    });

    return {
        taxonomies: taxonomiesState.list,
        terms,
        fetchTaxonomies,
        fetchTerms,
        isLoading: taxonomiesState.loading,
        error: taxonomiesState.error,
        totalPages: taxonomiesState.totalPages
    };
};
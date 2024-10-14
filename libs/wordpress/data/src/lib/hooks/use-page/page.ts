// usePage.ts
import { useSelector, useDispatch } from 'react-redux';
import { RootState, Dispatch } from '../../store';
import { Page } from '../../types';

/**
 * Hook for accessing and fetching a single page
 * 
 * @param {number} id - The ID of the page to fetch
 * @returns {Object} An object containing the page data and a function to fetch the page
 */
export const usePage = (id: number): {
    page: Page | undefined;
    fetchPage: () => void;
    isLoading: boolean;
    error: string | null;
} => {
    // Select the page from the store
    const page = useSelector((state: RootState) => state.pages.byId[id]);

    // Select loading and error states
    const isLoading = useSelector((state: RootState) => state.pages.loading);
    const error = useSelector((state: RootState) => state.pages.error);

    // Get the dispatch function
    const dispatch = useDispatch<Dispatch>();

    // Function to fetch the page
    const fetchPage = () => dispatch.pages.fetchPageById(id);

    return { page, fetchPage, isLoading, error };
};
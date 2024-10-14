// useUI.ts
import { useSelector, useDispatch } from 'react-redux';
import { RootState, Dispatch } from '../../store';

/**
 * Hook for accessing and updating UI state
 * 
 * @returns {Object} An object containing UI state and a function to update it
 */
export const useUI = (): {
    currentPostId: number | null;
    currentPageId: number | null;
    currentCustomPostType: string | null;
    currentCustomPostId: number | null;
    currentTaxonomy: string | null;
    currentTermId: number | null;
    globalError: string | null;
    updateUIFromRoute: (payload: {
        postId?: number;
        pageId?: number;
        customPostType?: string;
        customPostId?: number;
        taxonomy?: string;
        termId?: number;
    }) => void;
} => {
    // Select the UI state from the store
    const uiState = useSelector((state: RootState) => state.ui);

    // Get the dispatch function
    const dispatch = useDispatch<Dispatch>();

    // Function to update UI state based on route
    const updateUIFromRoute = (payload: {
        postId?: number;
        pageId?: number;
        customPostType?: string;
        customPostId?: number;
        taxonomy?: string;
        termId?: number;
    }) => dispatch.ui.updateUIFromRoute(payload);

    return {
        ...uiState,
        updateUIFromRoute
    };
};
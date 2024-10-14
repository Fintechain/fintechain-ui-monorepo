// useCustomPostTypes.ts
import { useSelector, useDispatch } from 'react-redux';
import { RootState, Dispatch } from '../../store';
import { CustomPostType, CustomPostTypeQueryParams } from '../../types';

/**
 * Hook for accessing and fetching custom post types
 * 
 * @returns {Object} An object containing custom post types data and a function to fetch them
 */
export const useCustomPostTypes = (): {
    customPostTypes: Record<string, CustomPostType[]>;
    fetchCustomPostTypes: (type: string, params: CustomPostTypeQueryParams) => void;
    isLoading: boolean;
    error: string | null;
    totalPages: Record<string, number>;
} => {
    // Select the custom post types state from the store
    const customPostTypesState = useSelector((state: RootState) => state.customPostTypes);

    // Get the dispatch function   
    const dispatch = useDispatch<Dispatch>();

    // Function to fetch custom post types
    const fetchCustomPostTypes = (type: string, params: CustomPostTypeQueryParams) =>
        dispatch.customPostTypes.fetchCustomPostTypes({ type, params });

    // Convert byId objects to arrays for each type
    const customPostTypes: Record<string, CustomPostType[]> = {};
    Object.entries(customPostTypesState.byType).forEach(([type, data]) => {
        customPostTypes[type] = Object.values(data.byId);
    });

    return {
        customPostTypes,
        fetchCustomPostTypes,
        isLoading: customPostTypesState.loading,
        error: customPostTypesState.error,
        totalPages: customPostTypesState.totalPages
    };
};
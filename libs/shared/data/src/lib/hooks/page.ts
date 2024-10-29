import { useInjection } from 'inversify-react'; // Assuming you're using Inversify for DI
import useData from './data';
import { DataService } from '../services';
import { ID, PageData, TYPES } from '../types';

/**
 * Custom hook to fetch a single page from a page data service based on the ID
 * @param id The ID of the page to fetch
 */
export function usePageData(id: ID) {
    // Inject the WordPress data service using Inversify or any DI library
    const pageDataService = useInjection<DataService<PageData>>(TYPES.PageDataService);

    // Call useData with the service and the ID to fetch a single post
    const { data: page, loading, error, refetch } = useData<PageData>({
        service: pageDataService,
        id, // Use the id directly to fetch a single post
        retryConfig: {
            maxRetries: 3, // Optional: Retry config for resilience
            retryDelay: 2000, // Optional: Retry delay in milliseconds
        },
    });

    return {
        page, // Return a single page
        loading,
        error,
        refetch, // Expose refetch to allow manual refetching if needed
    };
}

export default usePageData;

import { useEffect, useState, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DataService } from '../services';

export type FetchParams<T extends { id: string }> = {
    id?: string;
    params?: {
        page?: number;
        limit?: number;
        filter?: Record<string, any>;
    };
    service: DataService<T>;
    // Add retry configuration
    retryConfig?: {
        maxRetries?: number;
        retryDelay?: number;
    };
};

export function useData<T extends { id: string }>(fetchParams: FetchParams<T>): {
    data: T | T[] | null;
    loading: boolean;
    error: Error | null;
    refetch: () => Promise<void>;
} {
    const dispatch = useDispatch<any>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [retryCount, setRetryCount] = useState(0);
    
    // Use a ref to track if the component is mounted
    const mounted = useRef(true);
    
    // Use a ref to store the abort controller
    const abortControllerRef = useRef<AbortController | null>(null);

    const data = useSelector((state: any) => {
        if (fetchParams.id) {
            return state.data.currentItem as T | null;
        } else {
            return state.data.items as T[];
        }
    });

    const fetchData = useCallback(async () => {
        // If we're already loading or have an error and exceeded retries, don't fetch
        if (loading || (error && retryCount >= (fetchParams.retryConfig?.maxRetries || 3))) {
            return;
        }

        // Cancel any existing request
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        // Create new abort controller
        abortControllerRef.current = new AbortController();

        setLoading(true);
        setError(null);

        try {
            if (fetchParams.id) {
                await dispatch.data.read({
                    id: fetchParams.id,
                    service: fetchParams.service,
                });
            } else {
                await dispatch.data.list({
                    params: fetchParams.params || {},
                    service: fetchParams.service,
                });
            }
            // Reset retry count on success
            setRetryCount(0);
        } catch (err: any) {
            // Only set error if the component is still mounted and it's not an abort error
            if (mounted.current && err.name !== 'AbortError') {
                setError(err instanceof Error ? err : new Error('An unknown error occurred'));
                // Increment retry count
                setRetryCount(prev => prev + 1);
            }
        } finally {
            if (mounted.current) {
                setLoading(false);
            }
        }
    }, [dispatch, fetchParams, loading, error, retryCount]);

    // Cleanup function
    useEffect(() => {
        return () => {
            mounted.current = false;
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, []);

    // Effect for fetching data
    useEffect(() => {
        fetchData();
    }, [fetchParams.id, JSON.stringify(fetchParams.params), fetchParams.service]);

    // Effect for handling retries
    useEffect(() => {
        if (error && retryCount < (fetchParams.retryConfig?.maxRetries || 3)) {
            const retryDelay = fetchParams.retryConfig?.retryDelay || 5000;
            const timeoutId = setTimeout(() => {
                if (mounted.current) {
                    fetchData();
                }
            }, retryDelay * Math.pow(2, retryCount)); // Exponential backoff

            return () => clearTimeout(timeoutId);
        }
    }, [error, retryCount, fetchData, fetchParams.retryConfig]);

    return { 
        data, 
        loading, 
        error,
        refetch: fetchData 
    };
}

export default useData;
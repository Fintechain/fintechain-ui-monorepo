// useMedia.ts
import { useSelector, useDispatch } from 'react-redux';
import { RootState, Dispatch } from '../../store';
import { Media, MediaQueryParams } from '../../types';

/**
 * Hook for accessing and fetching media items
 * 
 * @returns {Object} An object containing media data and a function to fetch media
 */
export const useMedia = (): {
    media: Media[];
    fetchMedia: (params: MediaQueryParams) => void;
    isLoading: boolean;
    error: string | null;
    totalPages: number;
} => {
    // Select the media state from the store
    const mediaState = useSelector((state: RootState) => state.media);

    // Get the dispatch function
    const dispatch = useDispatch<Dispatch>();

    // Function to fetch media
    const fetchMedia = (params: MediaQueryParams) => dispatch.media.fetchMedia(params);

    // Convert byId object to array
    const media = Object.values(mediaState.byId);

    return {
        media,
        fetchMedia,
        isLoading: mediaState.loading,
        error: mediaState.error,
        totalPages: mediaState.totalPages
    };
};
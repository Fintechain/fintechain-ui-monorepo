// usePost.ts
import { useSelector, useDispatch } from 'react-redux';
import { RootState, Dispatch } from '../../store';
import { Post } from '../../types';

/**
 * Hook for accessing and fetching a single post
 * 
 * @param {number} id - The ID of the post to fetch
 * @returns {Object} An object containing the post data and a function to fetch the post
 */
export const usePost = (id: number): {
    post: Post | undefined;
    fetchPost: () => void;
    isLoading: boolean;
    error: string | null;
} => {
    // Select the post from the store
    const post = useSelector((state: RootState) => state.posts.byId[id]);

    // Select loading and error states
    const isLoading = useSelector((state: RootState) => state.posts.loading);
    const error = useSelector((state: RootState) => state.posts.error);

    // Get the dispatch function
    const dispatch = useDispatch<Dispatch>();

    // Function to fetch the post
    const fetchPost = () => dispatch.posts.fetchPostById(id);

    return { post, fetchPost, isLoading, error };
};
// usePosts.ts
import { useSelector, useDispatch } from 'react-redux';
import { RootState, Dispatch } from '../../store';
import { Post, PostQueryParams } from '../../types';

/**
 * Hook for accessing and fetching multiple posts
 * 
 * @returns {Object} An object containing posts data and a function to fetch posts
 */
export const usePosts = (): {
    posts: Post[];
    fetchPosts: (params: PostQueryParams) => void;
    isLoading: boolean;
    error: string | null;
    totalPages: number;
} => {
    // Select the posts state from the store
    const postsState = useSelector((state: RootState) => state.posts);

    // Get the dispatch function
    const dispatch = useDispatch<Dispatch>();

    // Function to fetch posts
    const fetchPosts = (params: PostQueryParams) => dispatch.posts.fetchPosts(params);

    // Convert byId object to array
    const posts = Object.values(postsState.byId);

    return {
        posts,
        fetchPosts,
        isLoading: postsState.loading,
        error: postsState.error,
        totalPages: postsState.totalPages
    };
};
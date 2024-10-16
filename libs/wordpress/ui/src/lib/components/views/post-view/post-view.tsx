import React from 'react';
import { useParams } from 'react-router-dom';
import PostContent from '../../containers/post-content/post-content';

/**
 * PostView component that extracts the post ID from the URL and renders the PostContent
 * @returns {React.FC} A React functional component
 */
export const PostView: React.FC = () => {
    const { id } = useParams<{ id?: string }>();

    if (!id) {
        return <div>No post ID provided</div>;
    }

    const postId = parseInt(id, 10);

    if (isNaN(postId)) {
        return <div>Invalid post ID</div>;
    }

    return <PostContent postId={postId} />;
};

export default PostView;
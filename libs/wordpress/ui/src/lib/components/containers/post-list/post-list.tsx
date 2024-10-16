import React, { useEffect } from 'react';
import { Typography, Button, Spinner } from "@material-tailwind/react";
import { Post, PostQueryParams, Dispatch, RootState } from '@fintechain-monorepo/wordpress-data';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

interface PostListProps {
    queryParams?: PostQueryParams;
    onPostClick?: (postId: number) => void;
}

/**
 * PostList component displays a compact list of WordPress posts in a magazine-style layout using Flexbox
 * @param {PostListProps} props - The props for the PostList component
 * @returns {React.FC} A React functional component
 */
export const PostList: React.FC<PostListProps> = ({ queryParams = { per_page: 10 }, onPostClick }) => {
    const dispatch = useDispatch<Dispatch>();
    const { byId, allIds, loading, error } = useSelector((state: RootState) => state.posts);

    useEffect(() => {
        dispatch.posts.fetchPosts(queryParams);
    }, [dispatch.posts]);

    if (loading) {
        return <div className="flex justify-center items-center"><Spinner /></div>;
    }

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    const posts = allIds.map(id => byId[id]);

    return (
        <div className="container mx-auto p-4">
            {posts.map((post, index) => {
                const featuredImage = post._embedded?.['wp:featuredmedia']?.[0];

                return (
                    <div key={post.id} className="flex flex-col lg:flex-row items-center gap-8 mb-8 py-4 border-b border-gray-200 last:border-b-0">
                        <div className={`flex flex-col w-full lg:w-1/2 ${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}>
                            <Typography variant="h3" color="blue-gray" className="mb-2 text-xl lg:text-2xl line-clamp-2">
                                {post.title.rendered}
                            </Typography>
                            <Typography variant="paragraph" className="mb-2 w-full !text-gray-700 line-clamp-3">
                                <div dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
                            </Typography>
                            <div className="flex items-center justify-between">
                                <Typography variant="small" className="font-normal !text-gray-700">
                                    {new Date(post.date).toLocaleDateString()}
                                </Typography>
                                {/* <Button
                                    variant="text"
                                    size="sm"
                                    className="px-4 py-2 bg-primary"
                                    onClick={() => onPostClick && onPostClick(post.id)}
                                >
                                    Read More
                                </Button> */}
                                <Link to={`/post/${post.id}`}>Read More</Link>
                            </div>
                        </div>
                        <div className={`w-full lg:w-1/2 ${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`}>
                            {featuredImage ? (
                                <div className="w-full h-48 lg:h-64 rounded-lg shadow-md overflow-hidden">
                                    <img
                                        src={featuredImage.source_url}
                                        alt={featuredImage.alt_text || post.title.rendered}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ) : (
                                <div className="w-full h-48 lg:h-64 bg-gray-300 flex items-center justify-center rounded-lg shadow-md">
                                    <Typography>No Image Available</Typography>
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default React.memo(PostList);
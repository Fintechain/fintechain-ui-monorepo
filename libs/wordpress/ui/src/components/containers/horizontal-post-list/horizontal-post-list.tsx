import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { useSelector, useDispatch } from 'react-redux';
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button,
    Spinner,
} from "@material-tailwind/react";
import { RootState, Dispatch, Post } from '@fintechain-monorepo/wordpress-data';

interface BlogPostCardProps {
    post: Post;
}

interface HorizontalPostListProps {
    className?: string;
}

function BlogPostCard({ post }: BlogPostCardProps) {
    const featuredImage = post._embedded?.['wp:featuredmedia']?.[0];
    return (
        <Card shadow={false} className="w-full max-w-[20rem]">
            <CardHeader className="h-48">
                {featuredImage ? (
                    <img
                        src={featuredImage.source_url}
                        alt={featuredImage.alt_text || post.title.rendered}
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <div className="h-full w-full bg-gray-300 flex items-center justify-center">
                        <Typography>No Image</Typography>
                    </div>
                )}
            </CardHeader>
            <CardBody>
                <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 !font-semibold uppercase"
                >
                    {post.type}
                </Typography>
                <Typography
                    as="a"
                    href="#"
                    variant="h5"
                    color="blue-gray"
                    className="mb-3 normal-case"
                >
                    {post.title.rendered}
                </Typography>
                <Typography className="mb-2 font-normal !text-gray-500">
                    {post.excerpt.rendered}
                </Typography>
                <Button variant="text">read more</Button>
            </CardBody>
        </Card>
    );
}

export function HorizontalPostList({ className = '' }: HorizontalPostListProps) {
    const dispatch = useDispatch<Dispatch>();
    const { byId, allIds, loading, error } = useSelector((state: RootState) => state.posts);

    useEffect(() => {
        dispatch.posts.fetchPosts({ per_page: 10 });
    }, [dispatch.posts]);

    if (loading) {
        return <div className="flex justify-center items-center"><Spinner /></div>;
    }

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    const posts = allIds.map(id => byId[id]);

    return (
        <div className={`w-full overflow-x-auto ${className}`}>
            <div className="flex flex-nowrap gap-6 py-8 px-4">
                {posts.map((post) => (
                    <div key={post.id} className="flex-none w-[20rem]">
                        <BlogPostCard post={post} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default HorizontalPostList;
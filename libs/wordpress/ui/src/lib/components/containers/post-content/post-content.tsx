import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NotificationSection, PageHeaderSection, SpinnerSection, UiSection } from '@fintechain-monorepo/shared-ui';
import { Typography, Spinner } from "@material-tailwind/react";
import { Dispatch, RootState } from '@fintechain-monorepo/wordpress-data';

interface PostContentProps {
    postId: number;
}

/**
 * PostContent component displays the full content of a single WordPress post
 * @param {PostContentProps} props - The props for the PostContent component
 * @returns {React.FC} A React functional component
 */
export const PostContent: React.FC<PostContentProps> = React.memo(({ postId }) => {
    const dispatch = useDispatch<Dispatch>();
    const { byId, loading, error } = useSelector((state: RootState) => state.posts);
    const post = byId[postId];

    useEffect(() => {
        if (!post) {
            dispatch.posts.fetchPostById(postId);
        }
    }, [dispatch.posts, postId, post]);

    if (loading) {
        return (
            <SpinnerSection
                message="Loading..."
                backgroundColorClass="bg-gray-100"
                spinnerColorClass="text-indigo-600"
                textColorClass="text-gray-800"
                size="large"
            />
        );
    }

    if (error) {
        return (

            <NotificationSection
                iconType="info"
                title="Post Loading Error"
                message="Sorry we encountered an error while loading the requested resource"
                backgroundColorClass="bg-white"
                textColorClass="text-gray-700"
                titleColorClass="text-gray-500"
                iconColorClass="text-blue-200"
                actionColorClass="text-blue-600 hover:text-blue-500"
            />
        );
    }

    if (!post) {
        return (
            <NotificationSection
                iconType="info"
                title="Post Not Found"
                message="Sorry we are unable to find the post you are searching for"
                backgroundColorClass="bg-white"
                textColorClass="text-gray-700"
                titleColorClass="text-gray-500"
                iconColorClass="text-blue-200"
                actionColorClass="text-blue-600 hover:text-blue-500"
            />
        );
    }
    const featuredImageUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;

    return (

        <>
            {/* <UiSection
                backgroundType={featuredImageUrl ? "image" : "color"}
                backgroundValue={featuredImageUrl || "bg-blue-gray-50"}
                overlayColor="bg-black"
                overlayOpacity={10}
                className="text-blue-gray-600 py-20"
                contentClassName="text-center"
            >
                <Typography variant="h1" className="mb-4">
                    {post.title.rendered}
                </Typography>
            </UiSection> */}
            <PageHeaderSection
                title={post.title.rendered}
                featuredImageUrl={featuredImageUrl}
                subtitle={post.excerpt.rendered}
            />
            <UiSection
                backgroundType="color"
                backgroundValue="bg-white"
                className="lg:py-20 py-10 px-8 text-neutral-neutral"
                contentClassName=""
            >
                <div
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: post.content.rendered }}
                />
            </UiSection>
        </>
    );
});

/* interface PostMetaProps {
    post: Post;
}

const PostMeta: React.FC<PostMetaProps> = ({ post }) => {
    const dispatch = useDispatch<Dispatch>();
    const { byId: usersById } = useSelector((state: RootState) => state.users);
    const user = usersById[post.author];

    useEffect(() => {
        if (!user) {
            dispatch.users.fetchUserById(post.author);
        }
    }, [dispatch.users, post.author, user]);

    return (
        <>
            <Chip
                value={new Date(post.date).toLocaleDateString()}
                className="bg-blue-gray-50 text-blue-gray-700"
            />
            {user && (
                <Chip
                    value={`By ${user.name}`}
                    className="bg-blue-gray-50 text-blue-gray-700"
                />
            )}
        </>
    );
};

interface PostTaxonomiesProps {
    post: Post;
}

const PostTaxonomies: React.FC<PostTaxonomiesProps> = ({ post }) => {
    const dispatch = useDispatch<Dispatch>();
    const { byId: categoriesById } = useSelector((state: RootState) => state.categories);
    const { byId: tagsById } = useSelector((state: RootState) => state.tags);

    useEffect(() => {
        const missingCategories = post.categories.filter(id => !categoriesById[id]);
        if (missingCategories.length > 0) {
            dispatch.categories.fetchCategories({ include: missingCategories });
        }

        const missingTags = post.tags.filter(id => !tagsById[id]);
        if (missingTags.length > 0) {
            dispatch.tags.fetchTags({ include: missingTags });
        }
    }, [dispatch.categories, dispatch.tags, post.categories, post.tags, categoriesById, tagsById]);

    const categories = post.categories.map(id => categoriesById[id]).filter(Boolean);
    const tags = post.tags.map(id => tagsById[id]).filter(Boolean);

    return (
        <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
                <Chip
                    key={category.id}
                    value={category.name}
                    className="bg-blue-500 text-white"
                />
            ))}
            {tags.map((tag) => (
                <Chip
                    key={tag.id}
                    value={tag.name}
                    className="bg-green-500 text-white"
                />
            ))}
        </div>
    );
}; */

export default PostContent;
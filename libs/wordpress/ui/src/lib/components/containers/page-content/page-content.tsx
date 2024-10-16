import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UiSection, NotificationSection, SpinnerSection, PageHeaderSection } from '@fintechain-monorepo/shared-ui';
import { Typography, Spinner } from "@material-tailwind/react";
import { Dispatch, RootState } from '@fintechain-monorepo/wordpress-data';

interface PageContentProps {
    slug: string;
}

/**
 * PageContent component displays the full content of a single WordPress page
 * @param {PageContentProps} props - The props for the PageContent component
 * @returns {React.FC} A React functional component
 */
export const PageContent: React.FC<PageContentProps> = React.memo(({ slug }) => {
    const dispatch = useDispatch<Dispatch>();
    const { bySlug, loading, error } = useSelector((state: RootState) => state.pages);
    const page = bySlug[slug];

    useEffect(() => {
        if (!page) {
            dispatch.pages.fetchPageBySlug(slug);
        }
    }, [dispatch.pages, slug, page]);

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
                title="Page Loading Error"
                message="Sorry we encountered an error while loading the requested resource"
                backgroundColorClass="bg-white"
                textColorClass="text-gray-700"
                titleColorClass="text-gray-500"
                iconColorClass="text-blue-200"
                actionColorClass="text-blue-600 hover:text-blue-500"
            />
        );
    }

    if (!page) {
        return (
            <NotificationSection
                iconType="info"
                title="Page Not Found"
                message="Sorry we are unable to find the page you are searching for"
                backgroundColorClass="bg-white"
                textColorClass="text-gray-700"
                titleColorClass="text-gray-500"
                iconColorClass="text-blue-200"
                actionColorClass="text-blue-600 hover:text-blue-500"
            />
        );
    }

    const featuredImageUrl = page._embedded?.['wp:featuredmedia']?.[0]?.source_url;

    return (
        <>
            
            <PageHeaderSection
                title={page.title.rendered}
                featuredImageUrl={featuredImageUrl}
                subtitle={page.content.rendered}
            />
            <UiSection
                backgroundType="color"
                backgroundValue="bg-white"
                className="lg:py-20 py-10 px-8 text-neutral-neutral"
                contentClassName=""
            >
                <div
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: page.content.rendered }}
                />
            </UiSection>
        </>
    );
});

export default PageContent;
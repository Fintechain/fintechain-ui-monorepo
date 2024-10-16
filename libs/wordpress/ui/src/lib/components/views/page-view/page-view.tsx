import React from 'react';
import { useParams } from 'react-router-dom';
import PageContent from '../../containers/page-content/page-content';

import { UiSection } from "@fintechain-monorepo/shared-ui";

/**
 * PageView component that extracts the post ID from the URL and renders the PostContent
 * @returns {React.FC} A React functional component
 */
export const PageView: React.FC = () => {
    const { slug } = useParams<{ slug?: string }>();

    if (!slug) {
        return <div>No page ID provided</div>;
    }

    return (
       
        <PageContent slug={slug} />
    );
};

export default PageView;
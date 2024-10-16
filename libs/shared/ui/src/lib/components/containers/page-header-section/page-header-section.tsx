import React from 'react';
import { UiSection } from '@fintechain-monorepo/shared-ui';
import { Typography } from '@material-tailwind/react';
import DOMPurify from 'dompurify';

interface PageHeaderSectionProps {
    title: string;
    subtitle: string;
    featuredImageUrl?: string;
    titleColorClass?: string;
    subtitleColorClass?: string;
    backgroundColorClass?: string;
    overlayColorClass?: string;
    overlayOpacity?: number;
}

const MAX_TITLE_LENGTH = 50;
const MAX_SUBTITLE_LENGTH = 100;

const sanitizeInput = (input: string): string => {
    return DOMPurify.sanitize(input, { ALLOWED_TAGS: [] });
};

const truncateText = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength - 3) + '...';
};

export const PageHeaderSection: React.FC<PageHeaderSectionProps> = ({
    title,
    subtitle,
    featuredImageUrl,
    titleColorClass = 'text-gray-50',
    subtitleColorClass = 'text-gray-50',
    backgroundColorClass = 'bg-primary-dark',
    overlayColorClass = 'bg-neutral-dark primary-dark',
    overlayOpacity = 50
}) => {
    const sanitizedTitle = React.useMemo(() =>
        truncateText(sanitizeInput(title), MAX_TITLE_LENGTH),
        [title]
    );

    const sanitizedSubtitle = React.useMemo(() =>
        truncateText(sanitizeInput(subtitle), MAX_SUBTITLE_LENGTH),
        [subtitle]
    );

    return (
        <UiSection
            backgroundType={featuredImageUrl ? "image" : "color"}
            backgroundValue={featuredImageUrl || backgroundColorClass}
            overlayColor={overlayColorClass}
            overlayOpacity={overlayOpacity}
            className="py-20"
            contentClassName="text-center"
        >
            <Typography
                variant="h2"
                className={`mb-4 text-3xl lg:text-5xl ${titleColorClass}`}
            >
                {sanitizedTitle}
            </Typography>
            <Typography
                variant="lead"
                className={`mx-auto max-w-4xl ${subtitleColorClass}`}
            >
                {sanitizedSubtitle}
            </Typography>
        </UiSection>
    );
};

export default PageHeaderSection;
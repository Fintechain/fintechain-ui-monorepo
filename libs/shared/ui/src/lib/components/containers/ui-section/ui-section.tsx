import React from 'react';
import DOMPurify from 'dompurify';
import { Typography } from '@material-tailwind/react';
import { UiSectionContent, UiSectionData } from '../../../types';

export interface UiSectionProps {
    data: UiSectionData;
    children?: React.ReactNode | ((content: UiSectionContent) => React.ReactNode);
}

const sanitizeHtml = (html: string): string => {
    return DOMPurify.sanitize(html);
};

export const UiSection: React.FC<UiSectionProps> = ({ data, children }) => {
    const { content, style } = data;
    const {
        backgroundType,
        backgroundValue,
        overlayColor = 'bg-black',
        overlayOpacity = 50,
        className = '',
        contentClassName = '',
        titleClassName = 'mb-4 text-3xl lg:text-5xl',
        subtitleClassName = 'mx-auto max-w-4xl text-xl mb-6',
    } = style;

    const { title, subtitle, contentBlocks } = content;

    const getBackgroundStyle = () => {
        if (backgroundType === 'image') {
            return { backgroundImage: `url(${backgroundValue})` };
        }
        return {};
    };

    const sectionClasses = [
        'relative',
        backgroundType === 'image' ? 'bg-cover bg-center bg-no-repeat' : backgroundValue,
        className
    ].filter(Boolean).join(' ');

    const overlayClasses = [
        'absolute',
        'inset-0',
        overlayColor,
        `opacity-${overlayOpacity}`
    ].join(' ');

    const contentClasses = [
        'relative',
        'z-10',
        'container',
        'mx-auto',
        contentClassName
    ].join(' ');

    /* const renderContentBlock = (block: ContentBlock) => {
        switch (block.type) {
            case 'text':
                return (
                    <Typography key={block.id} variant="paragraph" className="mb-4">
                        {block.content}
                    </Typography>
                );
            case 'html':
                return (
                    <Typography 
                        key={block.id} 
                        variant="paragraph" 
                        className="mb-4"
                        dangerouslySetInnerHTML={{ __html: sanitizeHtml(block.content) }} 
                    />
                );
            case 'image':
                return <img key={block.id} src={block.content} alt="" className="mx-auto mb-4" />;
            default:
                return null;
        }
    }; */

    return (
        <section
            className={sectionClasses}
            style={getBackgroundStyle()}
        >
            {backgroundType === 'image' && (
                <div
                    className={overlayClasses}
                    aria-hidden="true"
                />
            )}
            <div className={contentClasses}>
                {title && (
                    <Typography variant="h2" className={titleClassName}>
                        {title}
                    </Typography>
                )}
                {subtitle && (
                    <Typography variant="lead" className={subtitleClassName}>
                        {subtitle}
                    </Typography>
                )}
                {/* {Object.values(contentBlocks).map(renderContentBlock)} */}
                {typeof children === 'function' ? children(content) : children}
            </div>
        </section>
    );
};

export default UiSection;
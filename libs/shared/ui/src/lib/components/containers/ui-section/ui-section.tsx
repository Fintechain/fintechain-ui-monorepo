import React from 'react';
import { SectionData } from './page';

interface UiSectionProps {
    data: SectionData;
    children?: React.ReactNode | ((data: SectionData) => React.ReactNode);
} 

const UiSection: React.FC<UiSectionProps> = ({ data, children }) => {
    const { id, type, style } = data;
    const { background, contentClassName } = style;

    // Build background-related classes based on configuration
    const getBackgroundClasses = () => {
        const classes = ['relative'];  // section is always relative positioned

        switch (background.type) {
            case 'image':
                classes.push(
                    'bg-cover',
                    'bg-no-repeat',
                    background.position?.x === 'center' ? 'bg-center' : '',
                    background.attachment === 'fixed' ? 'bg-fixed' : ''
                );
                break;
            case 'color':
                // Color backgrounds should be handled via CSS classes
                break;
        }

        return classes.filter(Boolean).join(' ');
    };

    return (
        <section
            id={id}
            data-type={type}
            className={getBackgroundClasses()}
            style={background.type === 'image' ? { backgroundImage: `url(${background.url})` } : undefined}
        >
            {background.overlay && (
                <div
                    aria-hidden="true"
                    className={`absolute inset-0 ${background.overlay.color}`}
                />
            )}

            <div className={`relative z-10 ${contentClassName}`}>
                {typeof children === 'function' ? children(data) : children}
            </div>
        </section>
    );
};

export default UiSection;
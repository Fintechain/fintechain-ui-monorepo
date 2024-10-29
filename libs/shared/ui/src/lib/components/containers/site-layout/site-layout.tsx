import React, { useEffect, useCallback, useState } from 'react';
import { Header, HeaderProps } from '../header/header';
import { Footer, FooterProps } from '../footer/footer';
import { ArrowUpIcon } from "@heroicons/react/24/solid";


/** Configuration for scroll-to-top behavior */
interface ScrollConfig {
    /** Threshold in pixels before showing the scroll button */
    threshold?: number;
    /** Smooth scroll behavior options */
    behavior?: ScrollBehavior;
}

/** Props for the SiteLayout component */
export interface SiteLayoutProps {
    /** Main content of the layout */
    children: React.ReactNode;
    /** Props for the header component */
    headerProps: HeaderProps;
    /** Props for the footer component */
    footerProps: FooterProps;
    /** Optional scroll configuration */
    scrollConfig?: ScrollConfig;
    /** Optional additional class names for the layout container */
    className?: string;
}

export const SiteLayout: React.FC<SiteLayoutProps> = ({
    children,
    headerProps,
    footerProps,
    scrollConfig = {
        threshold: 300,
        behavior: 'smooth'
    },
    className = ''
}) => {
    const [isScrollVisible, setIsScrollVisible] = useState(false);

    const handleScroll = useCallback(() => {
        const shouldShow = window.pageYOffset > (scrollConfig.threshold ?? 300);
        setIsScrollVisible(shouldShow);
    }, [scrollConfig.threshold]);

    const scrollToTop = useCallback(() => {
        window.scrollTo({
            top: 0,
            behavior: scrollConfig.behavior ?? 'smooth'
        });
    }, [scrollConfig.behavior]);

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;
        const debouncedScroll = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(handleScroll, 100);
        };

        window.addEventListener('scroll', debouncedScroll, { passive: true });
        handleScroll();

        return () => {
            window.removeEventListener('scroll', debouncedScroll);
            clearTimeout(timeoutId);
        };
    }, [handleScroll]);

    return (
        <div className="min-h-screen flex flex-col bg-dark">
            <Header {...headerProps} isTransparent={true} />
            
            <div className="flex-grow relative">
                {children}
            </div>

            <Footer {...footerProps} />

            <button
                onClick={scrollToTop}
                className={`
                    fixed bottom-8 right-8 
                    p-4 rounded-full 
                    bg-accent hover:bg-accent/90
                    text-white shadow-lg
                    transition-all duration-300 ease-in-out
                    z-[100]
                    ${isScrollVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16 pointer-events-none'}
                `}
                aria-label="Scroll to top"
            >
                <ArrowUpIcon className="w-6 h-6" />
            </button>
        </div>
    );
};
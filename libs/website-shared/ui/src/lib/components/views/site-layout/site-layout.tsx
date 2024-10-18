import React from 'react';
import { Header, HeaderProps } from '../../containers/header/header';
import { Footer5, FooterProps } from '../../containers/footer/footer';

export interface SiteLayoutProps {
    children: React.ReactNode;
    headerProps: HeaderProps;
    footerProps: FooterProps;
}

// Main Layout Component
export class SiteLayout extends React.Component<SiteLayoutProps> {
    private scrollToTop: () => void;

    constructor(props: SiteLayoutProps) {
        super(props);
        this.scrollToTop = () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        };
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll = () => {
        const scrollButton = document.getElementById('scroll-to-top');
        if (scrollButton) {
            if (window.pageYOffset > 300) {
                scrollButton.classList.remove('hidden');
            } else {
                scrollButton.classList.add('hidden');
            }
        }
    };

    render() {
        const { children, headerProps, footerProps } = this.props;

        return (
            <div className="flex flex-col min-h-screen">
                <Header {...headerProps} />
                <main className="flex flex-col h-full flex-grow">
                    {children}
                </main>
                <Footer5  {...footerProps} />
                <button
                    id="scroll-to-top"
                    onClick={this.scrollToTop}
                    className="fixed bottom-4 right-4 bg-blue-600 text-white p-2 rounded-full hidden hover:bg-blue-700 transition-colors duration-300"
                    aria-label="Scroll to top"
                >
                    ↑
                </button>
            </div>
        );
    }
}
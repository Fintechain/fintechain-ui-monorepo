import React from 'react';
import { Button, Typography } from "@material-tailwind/react";
import { UiSectionContent, UiSectionData } from '@fintechain-monorepo/shared-ui';
import { UiSection } from '@fintechain-monorepo/website-ui';
import backgroundImage from '../../../../../../../../apps/fintechain-website/src/assets/services-view-splash.jpg';
import { GlobeAltIcon, LockClosedIcon, CubeTransparentIcon } from "@heroicons/react/24/solid";

const iconMap: { [key: string]: React.ElementType } = {
    "GlobeAltIcon": GlobeAltIcon,
    "LockClosedIcon": LockClosedIcon,
    "CubeTransparentIcon": CubeTransparentIcon,
};

const solutionsSections: Record<string, UiSectionData> = {
    heroSectionData: {
        content: {
            id: 'hero-section',
            contentBlocks: {
                title: { id: 'title', type: 'text', content: 'Fintechain Solutions' },
                subtitle: { id: 'subtitle', type: 'text', content: 'Revolutionizing Finance through Blockchain and Applied Cryptography' },
                ctaText: { id: 'cta', type: 'text', content: 'Discover Our Solutions' },
                backgroundImage: { id: 'bg-image', type: 'image', content: '/api/placeholder/1920/1080' }
            }
        },
        style: {
            backgroundType: 'image',
            backgroundValue: backgroundImage,
            overlayColor: 'bg-secondary-dark',
            overlayOpacity: 50,
            className: 'h-[60vh] flex items-center justify-center',
            contentClassName: 'text-center text-white',
        }
    },
    columnSectionData: {
        content: {
            id: 'column-section',
            contentBlocks: {
                columns: {
                    id: 'columns',
                    type: 'text',
                    content: JSON.stringify([
                        {
                            icon: "GlobeAltIcon",
                            title: "Decentralized RTGS",
                            text: "Our cutting-edge Real-Time Gross Settlement system leverages blockchain technology to enable instant, secure, and transparent cross-border transactions, revolutionizing global financial operations.",
                            ctaText: "Explore RTGS",
                            bgColor: "bg-secondary-light"
                        },
                        {
                            icon: "LockClosedIcon",
                            title: "Homomorphic Encryption",
                            text: "Fintechain's Fully Homomorphic Encryption solution ensures unparalleled data privacy, allowing computations on encrypted data without compromising security, ideal for sensitive financial operations.",
                            ctaText: "Discover FHE",
                            bgColor: "bg-secondary"
                        },
                        {
                            icon: "CubeTransparentIcon",
                            title: "Blockchain Integration",
                            text: "Seamlessly bridge traditional finance with blockchain technology through our innovative Blockchain-as-a-Service platform, enabling financial institutions to harness the power of decentralized systems.",
                            ctaText: "Learn More",
                            bgColor: "bg-secondary-dark"
                        }
                    ])
                }
            }
        },
        style: {
            backgroundType: 'color',
            backgroundValue: 'bg-gray-100',
            className: '',
            contentClassName: 'w-full min-w-full mx-0 text-neutral-light',
        }
    }
};

const SolutionsContent: React.FC = () => {
    return (
        <div className="solutions-page">
            <UiSection data={solutionsSections.heroSectionData}>
                {(content: UiSectionContent) => (
                    <div className="max-w-4xl mx-auto px-4">
                        <Typography variant="h1" className="mb-4 text-4xl md:text-5xl lg:text-6xl font-bold">
                            {content.contentBlocks.title.content}
                        </Typography>
                        <Typography variant="lead" className="mb-8 text-xl md:text-2xl">
                            {content.contentBlocks.subtitle.content}
                        </Typography>
                        <Button size="lg" color="white" variant="outlined" ripple={true} className='rounded-full'>
                            {content.contentBlocks.ctaText.content}
                        </Button>
                    </div>
                )}
            </UiSection>
            <UiSection data={solutionsSections.columnSectionData}>
                {(content: UiSectionContent) => {
                    const columns = JSON.parse(content.contentBlocks.columns.content);
                    return (
                        <div className="grid grid-cols-1 md:grid-cols-3">
                            {columns.map((column: any, index: number) => {
                                const IconComponent = iconMap[column.icon];
                                return (
                                    <div key={index} className={`flex flex-col items-center text-center py-16 px-6 ${column.bgColor}`}>
                                        <IconComponent className="w-16 h-16 mb-4" />
                                        <Typography variant="h3" className="mb-2">
                                            {column.title}
                                        </Typography>
                                        <Typography variant="paragraph" className="mb-4 text-xl">
                                            {column.text}
                                        </Typography>
                                        <Button
                                            ripple={true}
                                            className="text-neutral-light rounded-full bg-primary-dark">
                                            {column.ctaText}
                                        </Button>
                                    </div>
                                );
                            })}
                        </div>
                    );
                }}
            </UiSection>
        </div>
    );
};

export default SolutionsContent;
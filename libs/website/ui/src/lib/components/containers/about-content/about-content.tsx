import React from 'react';
import { Button, Typography } from "@material-tailwind/react";
import { UiSectionContent, UiSectionData } from '@fintechain-monorepo/shared-ui';
import { UiSection, UiSectionProps } from '@fintechain-monorepo/website-ui';
import backgroundImage from '../../../../../../../../apps/fintechain-website/src/assets/about1-view-splash.jpg';
import background2Image from '../../../../../../../../apps/fintechain-website/src/assets/about4-view-splash.jpg';
import background3Image from '../../../../../../../../apps/fintechain-website/src/assets/about2-view-splash.jpg';

// Data for our About Us page
const aboutUsSections: Record<string, UiSectionData> = {
    banner: {
        content: {
            id: 'hero',
            title: 'About Us',
            subtitle: 'Innovating for a Better Tomorrow: Pioneering Solutions, and Shaping the Future',
            contentBlocks: {

            }
        },
        style: {
            backgroundType: 'image',
            backgroundValue: backgroundImage,
            overlayColor: 'bg-primary-dark',
            overlayOpacity: 50,
            className: 'py-10 flex items-center',
            contentClassName: 'container mx-auto px-4 text-center text-neutral-light',
            titleClassName: 'mb-5 text-3xl !leading-tight lg:text-5xl',
            subtitleClassName: "font-semibold lg:text-2xl"
        }
    },
    icons: {
        content: {
            id: 'icon-text-columns',
            contentBlocks: {
                columns: {
                    id: 'columns',
                    type: 'text',
                    content: JSON.stringify([
                        {
                            icon: "CurrencyDollarIcon",
                            title: "Financial Innovation",
                            text: "Revolutionizing finance with cutting-edge blockchain and cryptographic solutions."
                        },
                        {
                            icon: "ShieldCheckIcon",
                            title: "Enhanced Security",
                            text: "Protecting your assets with state-of-the-art encryption and security measures."
                        },
                        {
                            icon: "CogIcon",
                            title: "Efficient Operations",
                            text: "Streamlining financial processes for increased speed and reduced costs."
                        }
                    ])
                }
            }
        },
        style: {
            backgroundType: 'image',
            backgroundValue: background3Image,
            overlayColor: 'bg-secondary-dark',
            overlayOpacity: 50,
            className: 'py-16',
            contentClassName: 'container mx-auto px-4 text-neutral-light',
        }
    },
    hero: {
        content: {
            id: 'hero',
            contentBlocks: {
                title: { id: 'title', type: 'text', content: 'About Fintechain' },
                subtitle: { id: 'subtitle', type: 'text', content: 'Revolutionizing Finance' },
                heroText: {
                    id:
                        'heroText',
                    type: 'html',
                    content: `Fintechain is at the forefront of the financial technology revolution, 
                bridging the gap between traditional finance and cutting-edge blockchain technology. 
                Our mission is to create secure, efficient, and privacy-focused financial solutions 
                that empower institutions and individuals alike. Founded on the principle that financial 
                systems should serve as both engines of efficiency and guardians of sensitive data, we 
                leverage advanced cryptographic techniques, including Fully Homomorphic Encryption (FHE), 
                to ensure unparalleled  data security without compromising performance.` },
                backgroundImage: { id: 'backgroundImage', type: 'image', content: background2Image }
            }
        },
        style: {
            backgroundType: 'color',
            backgroundValue: 'bg-white',
            className: '',
            contentClassName: 'relative z-10 w-full min-w-full',
        }
    }
};

const AboutContent: React.FC = () => {
    return (
        <div className="about-us-page">
            <UiSection data={aboutUsSections.banner} />
            <IconTextColumnsSection section={aboutUsSections.icons} />
            <HeroSection section={aboutUsSections.hero} />
        </div>
    );
};

export default AboutContent;

interface HeroSectionProps {
    section: UiSectionData;
}

const HeroSection: React.FC<HeroSectionProps> = ({ section }: HeroSectionProps) => {
    const { contentBlocks } = section.content;
    const { title, subtitle, heroText, backgroundImage } = contentBlocks;

    return (
        <UiSection data={section}>
            {(content: UiSectionContent) => (
                <div className="flex flex-col md:flex-row w-full h-screen/2">
                    <div className="w-full md:w-1/2 flex flex-col justify-center p-8 lg:p-10">
                        <Typography
                            variant="h1"
                            color="blue-gray"
                            className="font-poppins text-secondary-dark text-3xl font-extrabold sm:text-4xl md:text-5xl lg:text-6xl mb-6"
                        >
                            {title.content}
                        </Typography>
                        <Typography
                            variant="h2"
                            color="blue-gray"
                            className="mb-6 pr-5 text-4xl !leading-snug lg:text-5xl"
                        >
                            {subtitle.content}
                        </Typography>
                        <Typography variant="lead" className="mb-12 !text-gray-500">
                            {heroText.content}
                        </Typography>
                    </div>
                    <div className="w-full md:w-1/2 h-64 md:h-auto">
                        <img
                            src={backgroundImage.content}
                            alt="Fintechain Innovation"
                            className="w-full h-full object-cover object-center"
                        />
                    </div>
                </div>
            )}
        </UiSection>
    );
};


import { CurrencyDollarIcon, ShieldCheckIcon, CogIcon } from "@heroicons/react/24/solid";

interface ColumnData {
    icon: string;
    title: string;
    text: string;
}

const iconMap: { [key: string]: React.ElementType } = {
    "CurrencyDollarIcon": CurrencyDollarIcon,
    "ShieldCheckIcon": ShieldCheckIcon,
    "CogIcon": CogIcon,
};

interface IconTextColumnsSectionProps {
    section: UiSectionData;
}

const IconTextColumnsSection: React.FC<IconTextColumnsSectionProps> = ({ section }) => {
    return (
        <UiSection data={section}>
            {(content: UiSectionContent) => {
                const columns: ColumnData[] = JSON.parse(content.contentBlocks.columns.content);

                return (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {columns.map((column, index) => {
                            const IconComponent = iconMap[column.icon];
                            return (
                                <div key={index} className="flex flex-col items-center text-center">
                                    <IconComponent className="w-16 h-16 mb-4" />
                                    <Typography variant="h5" className="mb-2">
                                        {column.title}
                                    </Typography>
                                    <Typography variant="paragraph" className="font-bold">
                                        {column.text}
                                    </Typography>
                                </div>
                            );
                        })}
                    </div>
                );
            }}
        </UiSection>
    );
};
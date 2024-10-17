import React from 'react';
import { Button, Typography } from "@material-tailwind/react";
import { UiSectionContent, UiSectionData } from '@fintechain-monorepo/shared-ui';
import { UiSection } from '@fintechain-monorepo/website-ui';
import backgroundImage from '../../../../../../../../apps/fintechain-website/src/assets/about-view-splash.jpg';

const solutionsSections: Record<string, UiSectionData> = {
    hero: {
        content: {
            id: 'hero',
            title: 'Our Solutions',
            subtitle: 'Revolutionary Fintech and Blockchain Services',
            contentBlocks: {
                intro: { id: 'intro', type: 'text', content: 'Discover Fintechains innovative solutions combining Fintech SaaS and Blockchain BaaS.' },
                ctaText: { id: 'cta', type: 'text', content: 'Explore Solutions' }
            }
        },
        style: {
            backgroundType: 'image',
            backgroundValue: backgroundImage,
            overlayColor: 'bg-secondary-light',
            overlayOpacity: 50,
            className: 'py-20 flex items-center',
            contentClassName: 'text-center text-white',
            titleClassName: 'text-5xl font-bold mb-4',
            subtitleClassName: 'text-2xl mb-6'
        }
    },
    fintechSaas: {
        content: {
            id: 'fintech-saas',
            title: 'Fintech Software-as-a-Service',
            contentBlocks: {
                description: { id: 'saas-desc', type: 'text', content: 'Our Fintech SaaS solutions provide cutting-edge financial technology services, leveraging advanced cryptographic techniques like Fully Homomorphic Encryption (FHE) to ensure unparalleled data security and privacy.' }
            }
        },
        style: {
            backgroundType: 'color',
            backgroundValue: 'bg-white',
            className: 'py-20',
            contentClassName: 'text-center max-w-4xl mx-auto',
            titleClassName: 'text-4xl font-bold mb-6 text-blue-600'
        }
    },
    blockchainBaas: {
        content: {
            id: 'blockchain-baas',
            title: 'Blockchain-as-a-Service',
            contentBlocks: {
                description: { id: 'baas-desc', type: 'text', content: 'Our Blockchain BaaS offering enables financial institutions to adopt decentralized, scalable, and secure systems for clearing and settlement, revolutionizing traditional financial processes.' }
            }
        },
        style: {
            backgroundType: 'color',
            backgroundValue: 'bg-gray-100',
            className: 'py-20',
            contentClassName: 'text-center max-w-4xl mx-auto',
            titleClassName: 'text-4xl font-bold mb-6 text-blue-600'
        }
    }
};

const SolutionsContent: React.FC = () => {
    return (
        <div className="solutions-page">
            <UiSection data={solutionsSections.hero}>
                {(content: UiSectionContent) => (
                     <></>
                )}
            </UiSection>

            <UiSection data={solutionsSections.fintechSaas}>
                {(content: UiSectionContent) => (
                    <Typography variant="lead" className="mt-4">
                        {content.contentBlocks.description.content}
                    </Typography>
                )}
            </UiSection>

            <UiSection data={solutionsSections.blockchainBaas}>
                {(content: UiSectionContent) => (
                    <Typography variant="lead" className="mt-4">
                        {content.contentBlocks.description.content}
                    </Typography>
                )}
            </UiSection>
        </div>
    );
};

export default SolutionsContent;
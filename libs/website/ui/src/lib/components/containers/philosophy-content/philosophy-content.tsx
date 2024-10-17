import React from 'react';
import { Typography } from "@material-tailwind/react";
import { UiSectionContent, UiSectionData } from '@fintechain-monorepo/shared-ui';
import { UiSection } from '@fintechain-monorepo/website-ui';
import backgroundImage from '../../../../../../../../apps/fintechain-website/src/assets/about-view-splash.jpg';

const philosophySections: Record<string, UiSectionData> = {
    hero: {
        content: {
            id: 'hero',
            title: 'Our Philosophy',
            subtitle: 'More than Fintech: A Vision for the Future of Finance',
            contentBlocks: {
                intro: { id: 'intro', type: 'text', content: 'At Fintechain, we believe in revolutionizing finance through the fusion of innovation and integrity.' }
            }
        },
        style: {
            backgroundType: 'image',
            backgroundValue: backgroundImage,
            overlayColor: 'bg-secondary',
            overlayOpacity: 50,
            className: 'py-20 flex items-center',
            contentClassName: 'text-center text-white',
            titleClassName: 'text-5xl font-bold mb-4',
            subtitleClassName: 'text-2xl mb-6'
        }
    },
    coreBeliefs: {
        content: {
            id: 'core-beliefs',
            title: 'Our Core Beliefs',
            contentBlocks: {
                privacy: { id: 'privacy', type: 'text', content: 'Privacy need not be sacrificed for progress' },
                empowerment: { id: 'empowerment', type: 'text', content: 'Empowering individuals in a digital landscape' },
                balance: { id: 'balance', type: 'text', content: 'Balancing security with accessibility' },
                innovation: { id: 'innovation', type: 'text', content: 'True innovation comes from ethical responsibility' }
            }
        },
        style: {
            backgroundType: 'color',
            backgroundValue: 'bg-white',
            className: 'py-20',
            contentClassName: 'text-center max-w-4xl mx-auto',
            titleClassName: 'text-4xl font-bold mb-10 text-green-600'
        }
    },
    vision: {
        content: {
            id: 'vision',
            title: 'Our Vision',
            contentBlocks: {
                description: { id: 'vision-desc', type: 'text', content: 'Fintechain envisions a decentralized financial ecosystem where every transaction is imbued with precision, purpose, and meaning. We see ourselves as custodians of trust in an increasingly fragmented digital landscape.' }
            }
        },
        style: {
            backgroundType: 'color',
            backgroundValue: 'bg-green-50',
            className: 'py-20',
            contentClassName: 'text-center max-w-4xl mx-auto',
            titleClassName: 'text-4xl font-bold mb-6 text-green-600'
        }
    }
};

const PhilosophyContent: React.FC = () => {
    return (
        <div className="philosophy-page">
            <UiSection data={philosophySections.hero} />

            <UiSection data={philosophySections.coreBeliefs}>
                {(content: UiSectionContent) => (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
                        {Object.values(content.contentBlocks).map((belief) => (
                            <div key={belief.id} className="bg-green-50 p-6 rounded-lg">
                                <Typography variant="h5" color="green" className="mb-3">
                                    {belief.content}
                                </Typography>
                            </div>
                        ))}
                    </div>
                )}
            </UiSection>

            <UiSection data={philosophySections.vision}>
                {(content: UiSectionContent) => (
                    <Typography variant="lead" className="mt-6">
                        {content.contentBlocks.description.content}
                    </Typography>
                )}
            </UiSection>
        </div>
    );
};

export default PhilosophyContent;
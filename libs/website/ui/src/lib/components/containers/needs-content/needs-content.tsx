import React from 'react';
import { Button, Typography } from "@material-tailwind/react";
import { UiSectionContent, UiSectionData } from '@fintechain-monorepo/shared-ui';
import { UiSection } from '@fintechain-monorepo/website-ui';
import backgroundImage from '../../../../../../../../apps/fintechain-website/src/assets/about-view-splash.jpg';

const yourNeedsSections: Record<string, UiSectionData> = {
    hero: {
        content: {
            id: 'hero',
            title: 'Your Needs, Our Solutions',
            subtitle: 'Addressing Critical Challenges in Financial Technology',
            contentBlocks: {
                intro: {
                    id: 'intro', type: 'text', content: 'Discover how Fintechains innovative solutions address your most pressing financial technology needs.'
                },
                ctaText: { id: 'cta', type: 'text', content: 'Explore Solutions' }
            }
        },
        style: {
            backgroundType: 'image',
            backgroundValue: backgroundImage,
            overlayColor: 'bg-secondary-dark',
            overlayOpacity: 50,
            className: 'py-20 flex items-center',
            contentClassName: 'text-center text-white',
            titleClassName: 'text-5xl font-bold mb-4',
            subtitleClassName: 'text-2xl mb-6'
        }
    },
    industryNeeds: {
        content: {
            id: 'industry-needs',
            title: 'Industry Challenges We Address',
            contentBlocks: {
                security: { id: 'security', type: 'text', content: 'Enhanced Data Security and Privacy' },
                efficiency: { id: 'efficiency', type: 'text', content: 'Improved Clearing and Settlement Efficiency' },
                interoperability: { id: 'interoperability', type: 'text', content: 'Seamless Integration of Traditional and Blockchain Systems' },
                compliance: { id: 'compliance', type: 'text', content: 'Regulatory Compliance and Reporting' }
            }
        },
        style: {
            backgroundType: 'color',
            backgroundValue: 'bg-white',
            className: 'py-20',
            contentClassName: 'text-center max-w-4xl mx-auto',
            titleClassName: 'text-4xl font-bold mb-10 text-purple-600'
        }
    },
    customSolutions: {
        content: {
            id: 'custom-solutions',
            title: 'Tailored Solutions',
            contentBlocks: {
                description: { id: 'custom-desc', type: 'text', content: 'At Fintechain, we understand that every financial institution has unique challenges. Our team works closely with you to develop customized solutions that leverage our cutting-edge technology to meet your specific needs.' }
            }
        },
        style: {
            backgroundType: 'color',
            backgroundValue: 'bg-purple-50',
            className: 'py-20',
            contentClassName: 'text-center max-w-4xl mx-auto',
            titleClassName: 'text-4xl font-bold mb-6 text-purple-600'
        }
    }
};

const YourNeedsContent: React.FC = () => {
    return (
        <div className="your-needs-page">
            <UiSection data={yourNeedsSections.hero}>
                {(content: UiSectionContent) => (
                    <></>
                )}
            </UiSection>

            <UiSection data={yourNeedsSections.industryNeeds}>
                {(content: UiSectionContent) => (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
                        {Object.values(content.contentBlocks).map((need) => (
                            <div key={need.id} className="bg-purple-50 p-6 rounded-lg">
                                <Typography variant="h5" color="purple" className="mb-3">
                                    {need.content}
                                </Typography>
                                <Typography>
                                    Fintechain provides innovative solutions to address {need.content.toLowerCase()} effectively.
                                </Typography>
                            </div>
                        ))}
                    </div>
                )}
            </UiSection>

            <UiSection data={yourNeedsSections.customSolutions}>
                {(content: UiSectionContent) => (
                    <>
                        <Typography variant="lead" className="mt-6">
                            {content.contentBlocks.description.content}
                        </Typography>
                        <Button color="purple" size="lg" ripple={true} className="mt-8">
                            Request a Consultation
                        </Button>
                    </>
                )}
            </UiSection>
        </div>
    );
};

export default YourNeedsContent;
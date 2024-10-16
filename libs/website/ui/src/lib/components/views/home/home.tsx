import React from "react";
import { Hero } from "../../widgets/hero/hero";
import SolutionsSection from "../../widgets/solutions/solutions";

import TeamSection from "../../widgets/team/team";
import AboutSection from "../../widgets/about/about";
import { Bars3Icon, FingerPrintIcon, RectangleGroupIcon } from "@heroicons/react/24/outline";
import { UiSection } from "@fintechain-monorepo/shared-ui";
import NewsLetter from "../../widgets/newsletter/newsletter";
import FeatureSection from "../../widgets/features/features";
import ContentSection from "../../containers/cta-container/cta-container";

export interface HomeProps {
    backgroundImages: {
        backgroundImage: string;
        backgroundPatternImage: string;
        servicesBackgroundImage: string;
        about1BackgroundImage: string;
        about2BackgroundImage: string;
        aboutBackgroundImage: string;
    };

}

const contentSectionProps = {
    title: "Transforming Global Finance",
    subtitle: "OUR SOLUTIONS",
    description: "Fintechain is at the forefront of revolutionizing financial infrastructure. Our innovative solutions address key challenges in the global financial system, providing unprecedented security, efficiency, and transparency.",
    cards: [
        {
            title: "Decentralized RTGS",
            description: "Our Real-Time Gross Settlement system leverages blockchain technology to enable instant, secure cross-border transactions. Reduce settlement risks and improve liquidity management for financial institutions worldwide.",
            subtitle: "Settlement",
            buttonText: "Explore Features",
            bgColor: "bg-secondary-light",
            textColor: "white",
            buttonColor: "white",
            buttonTextColor: "xanthous",
            onClick: () => console.log("RTGS card clicked")
        },
        {
            title: "GFS Messaging Network",
            description: "Our advanced messaging network ensures seamless communication between financial institutions. Built on ISO 20022 standards, it facilitates efficient information exchange and transaction processing across the globe.",
            subtitle: "Communication",
            buttonText: "Learn More",
            bgColor: "bg-secondary",
            textColor: "white",
            buttonColor: "white",
            buttonTextColor: "rasberry",
            onClick: () => console.log("Messaging Network card clicked")
        }
    ]
};



export function Home({ backgroundImages }: HomeProps) {
    const aboutSections = [
        {
            icon: <RectangleGroupIcon className="h-6 w-6" />,
            title: "Decentralized Financial Infrastructure",
            description: "Fintechain provides a revolutionary decentralized Real-Time Gross Settlement (RTGS) system, leveraging blockchain technology to ensure secure, transparent, and efficient financial transactions between institutions globally.",
            features: [
                "Byzantine Fault Tolerant consensus for enhanced security",
                "ISO 20022 compliant messaging network",
                "Seamless integration with existing banking systems"
            ],
            image: backgroundImages.about1BackgroundImage
        },
        {
            icon: <FingerPrintIcon className="h-6 w-6" />,
            title: "Advanced Financial Messaging",
            description: "Our GFS Interface Software bridges the gap between traditional banking systems and modern blockchain networks, allowing financial institutions to modernize their operations without disrupting existing infrastructure.",
            features: [
                "Multi-protocol support for various communication standards",
                "Real-time transaction processing and settlement",
                "Cross-chain integration for enhanced interoperability"
            ],
            image: backgroundImages.about2BackgroundImage
        }
    ];
    return (
        <>
            <Hero
                title="Global Payment Infrastructure"
                subtitle="The GFS Messaging Network is a decentralized financial messaging layer built to serve as an alternative to SWIFT and other centralized messaging systems."
                primaryButtonText="Get Started"
                secondaryButtonText="Learn More"
                rightColumnImage={backgroundImages.backgroundImage}
                leftColumnImage={backgroundImages.backgroundPatternImage}
            />

            <UiSection
                backgroundType="image"
                backgroundValue={backgroundImages.servicesBackgroundImage}
                overlayColor="bg-blue-900"
                overlayOpacity={10}
                className="lg:py-20 py-10 px-8"
                contentClassName=""
            >
                <SolutionsSection />
            </UiSection>

            <UiSection
                backgroundType="image"
                backgroundValue={backgroundImages.aboutBackgroundImage}
                overlayColor="bg-blue-900"
                overlayOpacity={10}
                className="lg:py-20 lg:pb-5 py-10 px-8"
                contentClassName=""
            >
                <AboutSection sections={aboutSections}/>
            </UiSection>

            <UiSection
                backgroundType="color"
                backgroundValue="bg-secondary"
                className="lg:py-20 py-10 px-8 text-neutral-neutral"
                contentClassName=""
            >
                <FeatureSection />
            </UiSection>

            <UiSection
                backgroundType="color"
                backgroundValue="bg-secondary-dark"
                className="lg:py-20 py-10 px-8 text-neutral-light"
                contentClassName=""
            >
                <NewsLetter />
            </UiSection>

            <UiSection
                backgroundType="image"
                backgroundValue={backgroundImages.servicesBackgroundImage}
                overlayColor="bg-blue-900"
                overlayOpacity={10}
                className="lg:py-20 py-10 px-8"
                contentClassName=""
            >
                <TeamSection />
            </UiSection>

            <UiSection
                backgroundType="color"
                backgroundValue="bg-primary-light"
                className="lg:py-20 py-10 px-8 text-neutral-light"
                contentClassName=""
            >

                <ContentSection
                    title={contentSectionProps.title}
                    subtitle={contentSectionProps.subtitle}
                    description={contentSectionProps.description}
                    cards={contentSectionProps.cards} />
            </UiSection>
        </>
    );
}

export default Home;

// Example usage:
// import backgroundImage from '../path/to/your/image.jpg';
// 
// function App() {
//     return (
//         <Home backgroundImage={backgroundImage} />
//     );
// }
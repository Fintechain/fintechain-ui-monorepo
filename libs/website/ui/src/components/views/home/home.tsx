import React from "react";
import { Hero } from "../../widgets/hero/hero";
import SolutionsSection from "../../widgets/solutions/solutions";

import { Bars3Icon } from "@heroicons/react/24/outline";
import TestimonialsSection from "../../widgets/testimonials/testimonials";
import TeamSection from "../../widgets/team/team";
import ContentSection from "../../containers/cta-container/cta-container";
import NewsLetter from "../../widgets/newsletter/newsletter";
import FeatureSection from "../../widgets/features/features";
import AboutSection from "../../widgets/about/about";
import ImageBackgroundSection from "../../containers/image-background-section/image-background-section";
import { UiSection } from "@fintechain-monorepo/shared-ui";

export interface HomeProps {
    backgroundImages: {
        backgroundImage: string;
        backgroundPatternImage: string;
        servicesBackgroundImage: string;
    };

}
const testimonials = [
    {
        content: "This technology has transformed our business processes, increasing efficiency by 50%.",
        author: "Jane Doe",
        position: "CTO",
        company: "Tech Innovators Inc.",
        avatar: "/path/to/jane-avatar.jpg"
    },
    // Add more testimonials...
];

const solutions = [
    {
        icon: <Bars3Icon className="h-6 w-6" strokeWidth={2} />,
        title: "Innovative Ideas",
        description: "We bring fresh, creative solutions to solve your most complex business challenges."
    },
    {
        icon: <Bars3Icon className="h-6 w-6" strokeWidth={2} />,
        title: "Innovative Ideas",
        description: "We bring fresh, creative solutions to solve your most complex business challenges."
    },
    {
        icon: <Bars3Icon className="h-6 w-6" strokeWidth={2} />,
        title: "Innovative Ideas",
        description: "We bring fresh, creative solutions to solve your most complex business challenges."
    },
    // Add more solutions...
];

const contentSectionProps = {
    title: "Some of Our Awesome Projects",
    subtitle: "OUR WORK",
    description: "If you can't decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality).",
    cards: [
        {
            title: "Search and Discover!",
            description: "Insight to help you create, connect, and convert. Understand Your Audience's Interests, Influence, Interactions, and Intent. Discover emerging topics and",
            subtitle: "productivity",
            buttonText: "Learn More",
            bgColor: "bg-secondary-light",
            textColor: "white",
            buttonColor: "white",
            buttonTextColor: "xanthous",
            onClick: () => console.log("Card 1 clicked")
        },
        {
            title: "Find Music and Play!",
            description: "Insight to help you create, connect, and convert. Understand Your Audience's Interests, Influence, Interactions, and Intent. Discover emerging topics and",
            subtitle: "design",
            buttonText: "Explore",
            bgColor: "bg-secondary",
            textColor: "white",
            buttonColor: "white",
            buttonTextColor: "rasberry",
            onClick: () => console.log("Card 2 clicked")
        },
        // Add more cards as needed
    ]
};

export function Home({ backgroundImages }: HomeProps) {
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
                backgroundType="color"
                backgroundValue="bg-secondary-light"
                className="lg:py-20 py-10 px-8 text-neutral-dark"
                contentClassName=""
            >
                <AboutSection />
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
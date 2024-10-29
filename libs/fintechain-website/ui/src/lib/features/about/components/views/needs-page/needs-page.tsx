import React from 'react';
import {
    BanknotesIcon,
    ShieldCheckIcon,
    ClockIcon,
    ChartBarIcon,
    ArrowsRightLeftIcon,
    DocumentTextIcon,
    GlobeAltIcon,
    CubeTransparentIcon,
} from "@heroicons/react/24/outline";

export const NeedsPage = () => {
    const challenges = [
        {
            icon: BanknotesIcon,
            title: "Legacy System Integration",
            description: "Seamlessly connect your existing SWIFT and RTGS infrastructure with next-generation blockchain networks."
        },
        {
            icon: ClockIcon,
            title: "Real-Time Processing",
            description: "Meet growing demands for instant settlement and 24/7 availability in global transactions."
        },
        {
            icon: ShieldCheckIcon,
            title: "Security & Compliance",
            description: "Maintain the highest security standards while ensuring regulatory compliance across jurisdictions."
        },
        {
            icon: ArrowsRightLeftIcon,
            title: "Cross-Border Operations",
            description: "Streamline international transactions and reduce the complexity of multi-currency operations."
        }
    ];

    const solutions = [
        {
            title: "Interface Flexibility",
            description: "Our system provides multiple interface options, allowing you to choose the most suitable integration method for your existing infrastructure.",
            benefits: [
                "RESTful API with ISO 20022 support",
                "Gradual migration path from legacy systems",
                "Minimal disruption to current operations"
            ]
        },
        {
            title: "Comprehensive Security",
            description: "End-to-end encryption and multi-factor authentication protect your transactions while maintaining compliance with industry standards.",
            benefits: [
                "Military-grade encryption protocols",
                "Real-time threat monitoring",
                "Regular security audits and testing"
            ]
        },
        {
            title: "Scalable Architecture",
            description: "Our platform grows with your needs, handling increasing transaction volumes while maintaining optimal performance.",
            benefits: [
                "Horizontal scaling capabilities",
                "Load balancing for peak periods",
                "High-availability design"
            ]
        }
    ];

    return (
        <div className="flex flex-col min-h-full">
            {/* Hero Section with Gradient */}
            <section className="relative py-24 bg-dark">
                {/* <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20" /> */}
                <div className="absolute inset-0">
                    {/* Background image */}
                    <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                        style={{
                            backgroundImage: `url(/src/assets/banners/needs-page.jpg)`  // Replace with your image path
                        }}
                    />
                    {/* Gradient overlay to ensure text readability */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/75 to-black/50" />
                </div>
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-dark/50" />
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10" />
                </div>
                <div className="container mx-auto px-4 relative">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-5xl font-bold text-white mb-6">Understanding Your Needs</h1>
                        <p className="text-xl text-gray-300 leading-relaxed">
                            Modern financial institutions face unique challenges in today's rapidly evolving digital landscape. We're here to help you navigate this transformation.
                        </p>
                    </div>
                </div>
            </section>

            {/* Key Challenges Grid */}
            <section className="py-20 bg-gradient-to-b from-dark to-primary">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-white text-center mb-16">Key Challenges</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {challenges.map((challenge, index) => (
                            <div key={index} className="bg-dark/30 backdrop-blur-sm p-8 rounded-lg hover:transform hover:scale-105 transition-all duration-300">
                                <challenge.icon className="w-12 h-12 text-accent mb-6" />
                                <h3 className="text-xl font-semibold text-white mb-4">{challenge.title}</h3>
                                <p className="text-gray-300">{challenge.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Detailed Solutions Section */}
            <section className="py-24 bg-dark">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-white text-center mb-16">Comprehensive Solutions</h2>
                    <div className="grid gap-16 max-w-4xl mx-auto">
                        {solutions.map((solution, index) => (
                            <div key={index} className="bg-primary/10 rounded-lg p-8 hover:bg-primary/20 transition-all duration-300">
                                <h3 className="text-2xl font-bold text-white mb-4">{solution.title}</h3>
                                <p className="text-gray-300 mb-6 leading-relaxed">{solution.description}</p>
                                <ul className="space-y-3">
                                    {solution.benefits.map((benefit, idx) => (
                                        <li key={idx} className="flex items-center text-gray-200">
                                            <CheckIcon className="w-5 h-5 text-accent mr-3" />
                                            <span>{benefit}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Integration Process */}
            <section className="py-24 bg-gradient-to-r from-primary to-accent">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-white text-center mb-16">Integration Process</h2>
                    <div className="max-w-4xl mx-auto grid gap-8">
                        {[
                            {
                                step: "1",
                                title: "Assessment",
                                description: "We analyze your current infrastructure and requirements to create a tailored integration plan."
                            },
                            {
                                step: "2",
                                title: "Implementation",
                                description: "Our team works with yours to implement the solution with minimal disruption to your operations."
                            },
                            {
                                step: "3",
                                title: "Testing",
                                description: "Comprehensive testing in a sandbox environment ensures everything works as expected."
                            },
                            {
                                step: "4",
                                title: "Go-Live",
                                description: "Smooth transition to production with 24/7 support from our expert team."
                            }
                        ].map((phase, index) => (
                            <div key={index} className="flex items-start gap-6 p-6 bg-dark/30 rounded-lg">
                                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-accent text-white font-bold text-xl">
                                    {phase.step}
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-white mb-2">{phase.title}</h3>
                                    <p className="text-gray-300">{phase.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

const CheckIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
);

export default NeedsPage;
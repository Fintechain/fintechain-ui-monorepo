import React from 'react';
import {
    ChartBarIcon,
    ShieldCheckIcon,
    CloudArrowUpIcon,
    ChatBubbleLeftRightIcon,
    CurrencyDollarIcon,
    ClockIcon,
    GlobeAltIcon,
    UserGroupIcon,
    ArrowRightIcon,
} from "@heroicons/react/24/outline";
import HeroSection from '../../containers/hero-section/hero-section';

// Features Section
export const FeaturesSection = () => (
    <section className="py-24 bg-gradient-to-b from-dark to-primary">
        <div className="container mx-auto px-4">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-white mb-4">Why Choose Our Platform</h2>
                <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                    Experience the future of financial transactions with our cutting-edge blockchain technology
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                    {
                        icon: ClockIcon,
                        title: "Real-Time Processing",
                        description: "Instant settlement and confirmation for all transactions, 24/7 availability"
                    },
                    {
                        icon: ShieldCheckIcon,
                        title: "Enhanced Security",
                        description: "Military-grade encryption and blockchain immutability for maximum protection"
                    },
                    {
                        icon: GlobeAltIcon,
                        title: "Global Reach",
                        description: "Connect with financial institutions worldwide through our decentralized network"
                    },
                    {
                        icon: CurrencyDollarIcon,
                        title: "Cost Efficient",
                        description: "Reduce operational costs with our automated settlement system"
                    },
                    {
                        icon: CloudArrowUpIcon,
                        title: "Easy Integration",
                        description: "Seamless API integration with existing banking infrastructure"
                    },
                    {
                        icon: UserGroupIcon,
                        title: "Regulatory Compliant",
                        description: "Full compliance with international banking standards and regulations"
                    }
                ].map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                        <div key={index} className="bg-dark/30 backdrop-blur-sm p-8 rounded-lg hover:transform hover:scale-105 transition-all duration-300">
                            <Icon className="w-12 h-12 text-accent mb-4" />
                            <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                            <p className="text-gray-300">{feature.description}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    </section>
);

// Statistics Section
export const StatsSection = () => (
    <section className="py-20 bg-accent">
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                    { number: "$10B+", label: "Transaction Volume" },
                    { number: "100+", label: "Financial Institutions" },
                    { number: "99.99%", label: "Uptime" },
                    { number: "<1s", label: "Settlement Time" }
                ].map((stat, index) => (
                    <div key={index} className="text-center">
                        <div className="text-4xl lg:text-5xl font-bold text-white mb-2">{stat.number}</div>
                        <div className="text-gray-200">{stat.label}</div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

// How It Works Section
export const HowItWorksSection = () => (
    <section className="py-24 bg-dark">
        <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-white text-center mb-16">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    {
                        step: "1",
                        title: "Connect",
                        description: "Integrate our API with your existing banking systems"
                    },
                    {
                        step: "2",
                        title: "Transact",
                        description: "Send and receive payments with ISO 20022 messaging"
                    },
                    {
                        step: "3",
                        title: "Settle",
                        description: "Experience real-time settlement with blockchain security"
                    }
                ].map((item, index) => (
                    <div key={index} className="relative">
                        <div className="bg-primary/10 p-8 rounded-lg border border-primary/20 h-full">
                            <div className="text-accent text-6xl font-bold mb-4">{item.step}</div>
                            <h3 className="text-2xl font-semibold text-white mb-4">{item.title}</h3>
                            <p className="text-gray-300">{item.description}</p>
                        </div>
                        {index < 2 && (
                            <ArrowRightIcon className="hidden md:block absolute top-1/2 -right-4 w-8 h-8 text-accent transform -translate-y-1/2" />
                        )}
                    </div>
                ))}
            </div>
        </div>
    </section>
);

// CTA Section
export const CTASection = () => (
    <section className="py-24 bg-gradient-to-r from-primary to-accent">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold text-white mb-8">Ready to Transform Your Payment Infrastructure?</h2>
            <p className="text-xl text-gray-200 mb-12 max-w-2xl mx-auto">
                Join the network of forward-thinking financial institutions already benefiting from our platform
            </p>
            <div className="flex flex-wrap justify-center gap-6">
                <button className="px-8 py-4 rounded-full bg-white text-primary hover:bg-gray-100 font-semibold transition-all duration-200 transform hover:scale-105">
                    Schedule a Demo
                </button>
                <button className="px-8 py-4 rounded-full bg-transparent border-2 border-white text-white hover:bg-white/10 font-semibold transition-all duration-200 transform hover:scale-105">
                    Contact Sales
                </button>
            </div>
        </div>
    </section>
);

// Updated HomePage Component
export const HomePage = () => {
    return (
        <div className="flex flex-col min-h-full">
            {/* Existing Hero Section */}
            <div className="relative min-h-screen w-full">
                <HeroSection/>
            </div>
            
            <FeaturesSection />
            <StatsSection />
            <HowItWorksSection />
            <CTASection />
        </div>
    );
};

export default HomePage;
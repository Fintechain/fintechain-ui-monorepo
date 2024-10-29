import React from 'react';
import {
    CircleStackIcon,
    BoltIcon,
    ShieldCheckIcon,
    ArrowPathIcon,
    CubeTransparentIcon,
    DocumentTextIcon,
    ChartBarIcon,
    ClockIcon,
} from "@heroicons/react/24/outline";

export const SolutionsPage = () => {
    return (
        <div className="flex flex-col min-h-full">
            {/* Hero Section */}
            <section className="relative py-24 bg-dark">
                {/* <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20" /> */}
                <div className="absolute inset-0">
                    {/* Background image */}
                    <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                        style={{
                            backgroundImage: `url(/src/assets/banners/solutions-page.jpg)`  // Replace with your image path
                        }}
                    />
                    {/* Gradient overlay to ensure text readability */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/75 to-black/50" />
                </div>
               
                <div className="container mx-auto px-4 relative">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-5xl font-bold text-white mb-6">Enterprise-Grade Financial Infrastructure</h1>
                        <p className="text-xl text-gray-300 leading-relaxed">
                            Our decentralized RTGS and ISO 20022 messaging solutions power the future of institutional finance.
                        </p>
                    </div>
                </div>
            </section>

            {/* Core Solutions Grid */}
            <section className="py-24 bg-gradient-to-b from-dark to-primary">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                icon: CircleStackIcon,
                                title: "Decentralized RTGS",
                                description: "Real-time gross settlement system built on blockchain technology for instant, secure transaction finality.",
                                features: [
                                    "24/7 Settlement",
                                    "Multi-currency Support",
                                    "Smart Contract Automation"
                                ]
                            },
                            {
                                icon: DocumentTextIcon,
                                title: "ISO 20022 Messaging",
                                description: "Standardized financial messaging system ensuring global compatibility and rich data transfer.",
                                features: [
                                    "Full ISO Compliance",
                                    "Rich Data Support",
                                    "Automated Validation"
                                ]
                            },
                            {
                                icon: CubeTransparentIcon,
                                title: "Blockchain Infrastructure",
                                description: "Enterprise-grade blockchain network designed for financial institutions.",
                                features: [
                                    "BFT Consensus",
                                    "High Throughput",
                                    "Cross-chain Integration"
                                ]
                            }
                        ].map((solution, index) => (
                            <div key={index} className="bg-dark/30 backdrop-blur-sm rounded-lg p-8 hover:transform hover:scale-105 transition-all duration-300">
                                <solution.icon className="w-12 h-12 text-accent mb-6" />
                                <h3 className="text-2xl font-semibold text-white mb-4">{solution.title}</h3>
                                <p className="text-gray-300 mb-6">{solution.description}</p>
                                <ul className="space-y-3">
                                    {solution.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-center text-gray-200">
                                            <CheckIcon className="w-5 h-5 text-accent mr-3" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Technical Features */}
            <section className="py-24 bg-dark">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-white text-center mb-16">Technical Excellence</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                icon: BoltIcon,
                                title: "High Performance",
                                description: "Process thousands of transactions per second with sub-second finality"
                            },
                            {
                                icon: ShieldCheckIcon,
                                title: "Enterprise Security",
                                description: "Military-grade encryption and multi-layer security protocols"
                            },
                            {
                                icon: ArrowPathIcon,
                                title: "Seamless Integration",
                                description: "Easy integration with existing banking infrastructure"
                            },
                            {
                                icon: ChartBarIcon,
                                title: "Real-time Analytics",
                                description: "Comprehensive monitoring and reporting capabilities"
                            }
                        ].map((feature, index) => (
                            <div key={index} className="bg-primary/10 rounded-lg p-6 hover:bg-primary/20 transition-all duration-300">
                                <feature.icon className="w-12 h-12 text-accent mb-4" />
                                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                                <p className="text-gray-300">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-24 bg-gradient-to-b from-primary to-dark">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold text-white text-center mb-16">Why Choose Our Solutions</h2>
                        <div className="space-y-8">
                            {[
                                {
                                    title: "Cost Reduction",
                                    description: "Reduce operational costs by up to 70% through automation and efficient settlement processes."
                                },
                                {
                                    title: "Risk Mitigation",
                                    description: "Minimize settlement and counterparty risks with real-time processing and blockchain immutability."
                                },
                                {
                                    title: "Future-Proof Technology",
                                    description: "Stay ahead with a platform designed to evolve with changing financial technology landscapes."
                                }
                            ].map((benefit, index) => (
                                <div key={index} className="bg-dark/50 rounded-lg p-8">
                                    <h3 className="text-2xl font-semibold text-white mb-4">{benefit.title}</h3>
                                    <p className="text-gray-300">{benefit.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-gradient-to-r from-primary to-accent">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold text-white mb-8">Ready to Transform Your Financial Infrastructure?</h2>
                    <p className="text-xl text-gray-200 mb-12 max-w-2xl mx-auto">
                        Join leading financial institutions already benefiting from our next-generation solutions.
                    </p>
                    <div className="flex flex-wrap justify-center gap-6">
                        <button className="px-8 py-4 rounded-full bg-white text-primary hover:bg-gray-100 font-semibold transition-all duration-200 transform hover:scale-105">
                            Request Demo
                        </button>
                        <button className="px-8 py-4 rounded-full bg-transparent border-2 border-white text-white hover:bg-white/10 font-semibold transition-all duration-200 transform hover:scale-105">
                            Download Whitepaper
                        </button>
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

export default SolutionsPage;
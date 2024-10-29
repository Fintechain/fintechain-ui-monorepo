import React from 'react';
import {
    ChartBarIcon, // or ChartLineIcon depending on preference
    UsersIcon,
    TrophyIcon, // equivalent to Award
    BuildingOffice2Icon, // equivalent to Building2
    GlobeAltIcon // equivalent to Globe2
} from "@heroicons/react/24/outline";

export const AboutPage = () => {
    return (
        <div className="flex flex-col min-h-full">
            {/* Hero Section */}
            <section className="relative py-24 bg-dark">
                <div className="absolute inset-0">
                    {/* Background image */}
                    <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                        style={{
                            backgroundImage: `url(/src/assets/banners/about-page.jpg)`  // Replace with your image path
                        }}
                    />
                    {/* Gradient overlay to ensure text readability */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/75 to-black/50" />
                </div>
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.8)_100%)]" />
                </div>
                <div className="container mx-auto px-4 relative">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-5xl font-bold text-white mb-6">Revolutionizing Global Finance</h1>
                        <p className="text-xl text-gray-300 leading-relaxed">
                            Building the next generation of financial infrastructure through innovative blockchain technology and ISO 20022 standardization.
                        </p>
                    </div>
                </div>
            </section>

            {/* Mission & Vision Section */}
            <section className="py-24 bg-gradient-to-b from-dark to-primary">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div className="relative aspect-square">
                            <div className="absolute inset-0 bg-accent/10 rounded-lg transform -rotate-6" />
                            <div className="absolute inset-0 bg-primary/20 rounded-lg transform rotate-3" />
                            <img
                                src="/api/placeholder/600/600"
                                alt="Our Mission"
                                className="relative rounded-lg shadow-xl w-full h-full object-cover"
                            />
                        </div>
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
                                <p className="text-gray-300 leading-relaxed">
                                    To create a more efficient, secure, and accessible global financial system through innovative blockchain technology and standardized messaging protocols.
                                </p>
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold text-white mb-4">Our Vision</h2>
                                <p className="text-gray-300 leading-relaxed">
                                    A world where financial institutions can seamlessly connect and transact in real-time, breaking down traditional barriers and enabling new possibilities in global finance.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Key Metrics Section */}
            <section className="py-20 bg-accent">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { icon: UsersIcon, number: "200+", label: "Team Members" },
                            { icon: BuildingOffice2Icon, number: "5", label: "Global Offices" },
                            { icon: GlobeAltIcon, number: "30+", label: "Countries Served" },
                            { icon: TrophyIcon, number: "15+", label: "Industry Awards" }
                        ].map((stat, index) => (
                            <div key={index} className="text-center space-y-4">
                                <stat.icon className="w-12 h-12 mx-auto text-white" />
                                <div className="text-4xl font-bold text-white">{stat.number}</div>
                                <div className="text-gray-200">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline Section */}
            <section className="py-24 bg-dark">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-white text-center mb-16">Our Journey</h2>
                    <div className="max-w-4xl mx-auto">
                        {[
                            {
                                year: "2019",
                                title: "Company Founded",
                                description: "Started with a vision to revolutionize cross-border payments"
                            },
                            {
                                year: "2020",
                                title: "First Major Partnership",
                                description: "Launched pilot program with leading Asian banks"
                            },
                            {
                                year: "2021",
                                title: "Global Expansion",
                                description: "Opened offices in London, Singapore, and Dubai"
                            },
                            {
                                year: "2022",
                                title: "ISO 20022 Implementation",
                                description: "Achieved full compliance with international standards"
                            },
                            {
                                year: "2023",
                                title: "Platform Launch",
                                description: "Successfully deployed our main network globally"
                            }
                        ].map((milestone, index) => (
                            <div key={index} className="relative flex items-start mb-12 group">
                                <div className="min-w-[100px] pt-1">
                                    <span className="text-accent font-bold text-xl">{milestone.year}</span>
                                </div>
                                <div className="flex-grow pl-8 border-l-2 border-accent/30 group-hover:border-accent transition-colors duration-300">
                                    <h3 className="text-xl font-semibold text-white mb-2">{milestone.title}</h3>
                                    <p className="text-gray-300">{milestone.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Leadership Section */}
            <section className="py-24 bg-gradient-to-b from-primary to-dark">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-white text-center mb-16">Our Leadership</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                name: "Sarah Chen",
                                role: "Chief Executive Officer",
                                bio: "Former VP at Goldman Sachs with 15+ years in financial technology"
                            },
                            {
                                name: "Michael Rodriguez",
                                role: "Chief Technology Officer",
                                bio: "Blockchain pioneer with previous experience at Ripple and R3"
                            },
                            {
                                name: "David Kumar",
                                role: "Chief Operating Officer",
                                bio: "20+ years experience in global banking operations"
                            }
                        ].map((leader, index) => (
                            <div key={index} className="group">
                                <div className="bg-dark/50 backdrop-blur-sm rounded-lg overflow-hidden transition-all duration-300 hover:transform hover:scale-105">
                                    <div className="aspect-square">
                                        <img
                                            src="/api/placeholder/400/400"
                                            alt={leader.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-semibold text-white mb-2">{leader.name}</h3>
                                        <div className="text-accent mb-3">{leader.role}</div>
                                        <p className="text-gray-300">{leader.bio}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Office Locations */}
            <section className="py-24 bg-gradient-to-r from-primary to-accent">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-white text-center mb-16">Global Presence</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                city: "London",
                                address: "Financial District",
                                role: "European Headquarters"
                            },
                            {
                                city: "Singapore",
                                address: "Marina Bay",
                                role: "Asian Operations Hub"
                            },
                            {
                                city: "Dubai",
                                address: "DIFC",
                                role: "Middle East Office"
                            }
                        ].map((office, index) => (
                            <div key={index} className="bg-primary/10 rounded-lg p-6 hover:bg-primary/20 transition-all duration-300">
                                <h3 className="text-xl font-semibold text-white mb-2">{office.city}</h3>
                                <div className="text-accent mb-2">{office.role}</div>
                                <p className="text-gray-300">{office.address}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
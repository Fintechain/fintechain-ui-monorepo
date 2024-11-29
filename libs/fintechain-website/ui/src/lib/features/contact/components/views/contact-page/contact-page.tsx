import React from 'react';
import {
    GlobeAltIcon,
    EnvelopeIcon,
    PhoneIcon,
    BuildingOffice2Icon,
} from "@heroicons/react/24/outline";
import { useImages } from '../../../../../hooks/asset-context';

export const ContactPage = () => {
    const images = useImages();
    const socialLinks = [
        {
            name: "LinkedIn",
            url: "https://linkedin.com/company/fintechain",
            icon: (
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
            )
        },
        {
            name: "Twitter",
            url: "https://x.com/FintechainLab",
            icon: (
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
            )
        },
        {
            name: "GitHub",
            url: "https://github.com/fintechain",
            icon: (
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
            )
        },
        {
            name: "Telegram",
            url: "https://t.me/fintechain",
            icon: (
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                </svg>
            )
        }
    ];

    const locations = [
        {
            city: "London",
            address: "One Canada Square, Canary Wharf",
            role: "Global Headquarters",
            image: "/api/placeholder/600/400"
        },
        {
            city: "Singapore",
            address: "Marina Bay Financial Centre",
            role: "Asia Pacific Hub",
            image: "/api/placeholder/600/400"
        },
        {
            city: "Dubai",
            address: "Dubai International Financial Centre",
            role: "Middle East Office",
            image: "/api/placeholder/600/400"
        }
    ];

    return (
        <div className="flex flex-col min-h-full">
            {/* Hero Section */}
            <section className="relative py-32 bg-dark overflow-hidden">
                <div className="absolute inset-0">
                    {/* Background image */}
                    <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                        style={{
                            backgroundImage: `url(${images.banners.contactBanner})`  // Replace with your image path
                        }}
                    />
                    {/* Gradient overlay to ensure text readability */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/75 to-black/50" />
                </div>
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.8)_100%)]" />
                </div>
                <div className="container mx-auto px-4 relative">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-5xl font-bold text-white mb-6">Let's Connect</h1>
                        <p className="text-xl text-gray-300 leading-relaxed">
                            Join our global community of financial innovators and stay updated with the latest in decentralized finance.
                        </p>
                    </div>
                </div>
            </section>

            {/* Social Links Section */}
            <section className="py-24 bg-accent">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                        {socialLinks.map((social, index) => (
                            <a
                                key={index}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex flex-col items-center p-8 bg-dark/90 backdrop-blur-sm rounded-lg hover:bg-dark/70 transition-all duration-300 hover:transform hover:scale-105"
                            >
                                <div className="text-accent group-hover:text-white transition-colors duration-300">
                                    {social.icon}
                                </div>
                                <span className="mt-4 text-gray-300 group-hover:text-white font-medium">
                                    {social.name}
                                </span>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* Direct Contact Section 
            <section className="py-24 bg-gradient-to-b from-dark to-accent">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-white mb-4">Get in Touch</h2>
                        <p className="text-gray-300">Reach out to us directly through any of these channels</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        {[
                            {
                                icon: EnvelopeIcon,
                                title: "Email Us",
                                content: "contact@fintechain.com",
                                link: "mailto:contact@fintechain.com"
                            },
                            {
                                icon: PhoneIcon,
                                title: "Call Us",
                                content: "+1 (555) 123-4567",
                                link: "tel:+15551234567"
                            },
                            {
                                icon: GlobeAltIcon,
                                title: "Visit Us Online",
                                content: "fintechain.com",
                                link: "https://fintechain.com"
                            }
                        ].map((contact, index) => (
                            <a
                                key={index}
                                href={contact.link}
                                className="flex flex-col items-center p-8 bg-dark rounded-lg hover:bg-primary/90 transition-all duration-300"
                            >
                                <contact.icon className="w-8 h-8 text-accent mb-4" />
                                <h3 className="text-xl font-semibold text-white mb-2">{contact.title}</h3>
                                <p className="text-gray-300">{contact.content}</p>
                            </a>
                        ))}
                    </div>
                </div>
            </section> */}

            {/* Global Offices Section 
            <section className="py-24 bg-gradient-to-r from-primary to-accent">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-white text-center mb-16">Global Presence</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {locations.map((location, index) => (
                            <div key={index} className="group relative overflow-hidden rounded-lg">
                                <img
                                    src={location.image}
                                    alt={location.city}
                                    className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
                                <div className="absolute bottom-0 left-0 right-0 p-6">
                                    <h3 className="text-xl font-semibold text-white mb-2">{location.city}</h3>
                                    <p className="text-accent mb-1">{location.role}</p>
                                    <p className="text-gray-300">{location.address}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section> */}
        </div>
    );
};

export default ContactPage;
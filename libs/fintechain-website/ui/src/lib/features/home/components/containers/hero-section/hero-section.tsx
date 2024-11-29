import {
    ChartBarIcon,
    ShieldCheckIcon,
    CloudArrowUpIcon,
    ChatBubbleLeftRightIcon
} from "@heroicons/react/24/outline";
import { useImages } from "../../../../../hooks/asset-context";

export function HeroSection() {
    const images = useImages();
    return (
        <>
            {/* Background image with darker overlay */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url(${images.backgrounds.home.hero})`
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/75 to-black/50" />
            </div>

            {/* Main content container - adjusted padding-top */}
            <div className="relative h-full container mx-auto px-4 lg:px-8 max-w-7xl pt-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 min-h-[calc(100vh-6rem)] items-center">
                    {/* Left Column - Text Content */}
                    <div className="space-y-12 py-20 lg:py-0 lg:pr-12">
                        <div className="space-y-4">
                            <h1 className="text-4xl lg:text-6xl font-bold text-accent leading-tight drop-shadow-lg">
                                Global Payment Infrastructure
                            </h1>
                        </div>

                        <div className="space-y-6">
                            <p className="text-lg lg:text-xl text-gray-100 leading-relaxed shadow-text">
                                Our decentralized RTGS and ISO 20022 messaging system enables financial institutions to process transactions with unprecedented security, speed, and transparency.
                            </p>
                            <ul className="space-y-4">
                                {[
                                    'ISO 20022 Compliant Messaging',
                                    'Real-Time Settlement',
                                    'Blockchain Security'
                                ].map((item) => (
                                    <li key={item} className="flex items-center text-gray-100 shadow-text">
                                        <svg className="w-6 h-6 text-blue-400 mr-3 filter drop-shadow" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                                        </svg>
                                        <span className="text-lg">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="flex flex-wrap gap-6">
                            <button className="px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg">
                                Join the Network
                            </button>
                            <button className="px-8 py-4 rounded-full bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white/20 font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg">
                                View Documentation
                            </button>
                        </div>
                    </div>

                    {/* Right Column - Feature Grid */}
                    <div className="grid grid-cols-2 gap-3 lg:gap-4 p-4">
                        {[
                            {
                                title: "RTGS Settlement",
                                icon: ChartBarIcon,
                                color: "bg-primary"
                            },
                            {
                                title: "Secure Messaging",
                                icon: ShieldCheckIcon,
                                color: "bg-accent"
                            },
                            {
                                title: "Cloud Integration",
                                icon: CloudArrowUpIcon,
                                color: "bg-accent-light"
                            },
                            {
                                title: "24/7 Support",
                                icon: ChatBubbleLeftRightIcon,
                                color: "bg-dark"
                            }
                        ].map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <div
                                    key={index}
                                    className={`
                                    ${feature.color}
                                    p-8 lg:p-10
                                    transform hover:scale-105 transition-all duration-200
                                    flex flex-col items-center justify-center text-center
                                    space-y-4
                                    shadow-lg
                                    group hover:border-white/40
                                `}
                                >
                                    <Icon className="w-16 h-16 lg:w-20 lg:h-20 text-white group-hover:scale-110 transition-transform duration-200" />
                                    <h3 className="text-white font-semibold text-lg lg:text-xl">
                                        {feature.title}
                                    </h3>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}

export default HeroSection;

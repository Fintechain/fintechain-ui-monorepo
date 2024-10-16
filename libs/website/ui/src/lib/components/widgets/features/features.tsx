import React from "react";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import {
    ShieldCheckIcon,
    CurrencyDollarIcon,
    ArrowPathIcon,
    GlobeAltIcon,
} from "@heroicons/react/24/solid";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    children: React.ReactNode;
}

function FeatureCard({ icon, title, children }: FeatureCardProps) {
    return (
        <Card color="transparent" shadow={false}>
            <CardBody className="items-left flex flex-col">
                <div className="mb-4 grid h-12 w-12 place-items-center rounded-full bg-gray-900 p-2.5 text-white">
                    {icon}
                </div>
                <Typography variant="h5" className="mb-2 text-gray-100">
                    {title}
                </Typography>
                <Typography className="mb-4 text-base font-normal leading-7 !text-gray-100">
                    {children}
                </Typography>

                <a href="#"
                className="flex w-44 cursor-pointer items-center !justify-start gap-3 !text-left text-sm font-bold !text-gray-100"
                >
                Learn More
                <ArrowRightIcon
                    strokeWidth={3}
                    className="h-3.5 w-3.5 text-gray-100"
                />
            </a>
        </CardBody>
        </Card >
    );
}

const features = [
    {
        icon: <ShieldCheckIcon className="h-7 w-7" strokeWidth={2} />,
        title: "Enhanced Security",
        description: "Our Byzantine Fault Tolerant consensus mechanism ensures unparalleled security and reliability for all financial transactions.",
    },
    {
        icon: <CurrencyDollarIcon className="h-7 w-7" strokeWidth={2} />,
        title: "Efficient Settlement",
        description: "Experience real-time gross settlement with our blockchain-powered system, reducing risks and improving liquidity management.",
    },
    {
        icon: <ArrowPathIcon className="h-7 w-7" strokeWidth={2} />,
        title: "Seamless Integration",
        description: "Our GFS Interface Software enables smooth integration between legacy systems and modern blockchain networks.",
    },
    {
        icon: <GlobeAltIcon className="h-7 w-7" strokeWidth={2} />,
        title: "Global Compliance",
        description: "Stay compliant with international standards through our ISO 20022-compatible messaging network and built-in regulatory checks.",
    },
];

export function FeatureSection() {
    return (
        <>
            <div className="container mx-auto mb-10 text-center lg:mb-20">
                <Typography
                    variant="h1"
                    className="mb-4 text-3xl !leading-tight lg:text-5xl text-gray-100"
                >
                    Revolutionizing Global Financial Infrastructure
                </Typography>
                <Typography
                    variant="lead"
                    className="mx-auto max-w-5xl !text-neutral-light"
                >
                    Fintechain combines cutting-edge blockchain technology with traditional financial systems to create a secure, efficient, and compliant platform for the future of global finance.
                </Typography>
            </div>
            <div className="container mx-auto grid grid-cols-1 gap-x-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-y-12">
                {features.map(({ icon, title, description }) => (
                    <FeatureCard key={title} icon={icon} title={title}>
                        {description}
                    </FeatureCard>
                ))}
            </div>
        </>
    );
}

export default FeatureSection;
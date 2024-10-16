import React from "react";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import {
    RectangleGroupIcon,
    FingerPrintIcon,
    HashtagIcon,
    EyeIcon,
    DocumentTextIcon,
    SwatchIcon,
} from "@heroicons/react/24/solid";

interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    children: React.ReactNode;
}

function FeatureCard({ icon, title, children }: FeatureCardProps) {
    return (
        <Card color="transparent" shadow={false}>
            <CardBody className="grid justify-center text-center">
                <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full bg-gray-900 p-2.5 text-white shadow">
                    {icon}
                </div>
                <Typography variant="h5" color="blue-gray" className="mb-4">
                    {title}
                </Typography>
                <Typography className="font-normal !text-gray-800">
                    {children}
                </Typography>
            </CardBody>
        </Card>
    );
}

const features = [
    {
        icon: <RectangleGroupIcon className="h-6 w-6" />,
        title: "Decentralized RTGS",
        description:
            "Our cutting-edge Real-Time Gross Settlement system leverages blockchain technology to provide secure, transparent, and efficient financial transactions between institutions.",
    },
    {
        icon: <FingerPrintIcon className="h-6 w-6" />,
        title: "ISO 20022 Compliance",
        description:
            "Fintechain's messaging network ensures full compatibility with ISO 20022 standards, facilitating seamless communication and interoperability across financial institutions globally.",
    },
    {
        icon: <SwatchIcon className="h-6 w-6" />,
        title: "GFS Interface Software",
        description:
            "Our interface software bridges legacy systems with modern blockchain networks, allowing institutions to modernize their operations without disrupting existing infrastructure.",
    },
    {
        icon: <HashtagIcon className="h-6 w-6" />,
        title: "Cross-Chain Integration",
        description:
            "Utilizing advanced protocols like Wormhole and IBC, Fintechain enables secure and efficient cross-chain communication between our messaging and settlement networks.",
    },
    {
        icon: <EyeIcon className="h-6 w-6" />,
        title: "Advanced Security",
        description:
            "Our system implements state-of-the-art encryption, Byzantine Fault Tolerant consensus, and rigorous compliance checks to ensure the highest level of security for all transactions.",
    },
    {
        icon: <DocumentTextIcon className="h-6 w-6" />,
        title: "Regulatory Compliance",
        description:
            "Built-in compliance modules and comprehensive audit trails ensure adherence to global financial regulations, simplifying reporting and oversight for institutions.",
    },
];
export function SolutionsSection() {
    return (
        <>
            <div className="container mx-auto text-center">
                <Typography
                    variant="h1"
                    color="blue-gray"
                    className="mb-4 text-3xl !leading-tight lg:text-5xl"
                >
                    Next-Generation Financial Messaging and Settlement
                </Typography>
                <Typography
                    variant="lead"
                    className="mx-auto max-w-5xl !text-gray-800"
                >
                    Fintechain revolutionizes global financial transactions by seamlessly integrating blockchain technology with existing systems. Our decentralized platform ensures secure, efficient, and compliant cross-border payments and settlements, bridging the gap between traditional banking and the future of finance.
                </Typography>
            </div>
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-y-8">
                {features.map(({ icon, title, description }) => (
                    <FeatureCard key={title} icon={icon} title={title}>
                        {description}
                    </FeatureCard>
                ))}
            </div>
        </>
    );
}

export default SolutionsSection;

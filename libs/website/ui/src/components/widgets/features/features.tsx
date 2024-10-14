import React from "react";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import {
    BanknotesIcon,
    DocumentMinusIcon,
    PencilSquareIcon,
    PlayPauseIcon,
} from "@heroicons/react/24/solid";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

interface FeatureCardProps {
    title: string;
    children: React.ReactNode;
}

function FeatureCard({ title, children }: FeatureCardProps) {
    return (
        <Card color="transparent" shadow={false}>
            <CardBody className="items-left flex flex-col">
                <Typography variant="h5" className="mb-2 text-gray-100">
                    {title}
                </Typography>
                <Typography className="mb-4 text-base font-normal leading-7 !text-gray-100">
                    {children}
                </Typography>
                <a
                    href="#"
                    className="flex w-44 cursor-pointer items-center !justify-start gap-3 !text-left text-sm font-bold !text-gray-100"
                >
                    Read More
                    <ArrowRightIcon
                        strokeWidth={3}
                        className="h-3.5 w-3.5 text-gray-100"
                    />
                </a>
            </CardBody>
        </Card>
    );
}

const features = [
    {
        icon: <DocumentMinusIcon className="h-7 w-7" strokeWidth={2} />,
        title: "Components",
        description: "We get insulted by others, lose trust for those We get back.",
    },
    {
        icon: <PlayPauseIcon className="h-7 w-7" strokeWidth={2} />,
        title: "Mix and Match",
        description: "We get insulted by others, lose trust for those We get back.",
    },
    {
        icon: <PencilSquareIcon className="h-7 w-7" strokeWidth={2} />,
        title: "Design",
        description: "We get insulted by others, lose trust for those We get back.",
    },
    {
        icon: <BanknotesIcon className="h-7 w-7" strokeWidth={2} />,
        title: "Payment",
        description: "We get insulted by others, lose trust for those We get back.",
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
                    Turn your idea into a startup
                </Typography>
                <Typography
                    variant="lead"
                    className="mx-auto max-w-5xl !text-neutral-light"
                >
                    We&apos;re constantly trying to express ourselves and actualize our
                    dreams. If you have the opportunity to play
                </Typography>
            </div>
            <div className="container mx-auto grid grid-cols-1 gap-x-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-y-12">
                {features.map(({ title, description }) => (
                    <FeatureCard key={title} title={title}>
                        {description}
                    </FeatureCard>
                ))}
            </div>
        </>
    );
}
export default FeatureSection;

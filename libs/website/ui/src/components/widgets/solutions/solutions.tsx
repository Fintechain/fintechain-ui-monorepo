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
        title: "Social Conversations",
        description:
            "We get insulted by others, lose trust for those others. We get back stabbed by friends. It becomes harder for us to give others a hand.",
    },
    {
        icon: <FingerPrintIcon className="h-6 w-6" />,
        title: "Analyze Performance",
        description:
            "Don't get your heart broken by people we love, even that we give them all we have. Then we lose family over time. As we live, our hearts turn colder.",
    },
    {
        icon: <SwatchIcon className="h-6 w-6" />,
        title: "Measure Conversions",
        description:
            "What else could rust the heart more over time? Blackgold. The time is now for it to be okay to be great. or being a bright color. For standing out.",
    },
    {
        icon: <HashtagIcon className="h-6 w-6" />,
        title: "Fully Integrated",
        description:
            "We get insulted by others, lose trust for those others. We get back stabbed by friends. It becomes harder for us to give others a hand.",
    },
    {
        icon: <EyeIcon className="h-6 w-6" />,
        title: "Payments Functionality",
        description:
            "Don't get your heart broken by people we love, even that we give them all we have. Then we lose family over time. As we live, our hearts turn colder.",
    },
    {
        icon: <DocumentTextIcon className="h-6 w-6" />,
        title: "Improved Platform",
        description:
            "What else could rust the heart more over time? Blackgold. The time is now for it to be okay to be great. or being a bright color. For standing out.",
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
                    Full-Funnel Social Analytics
                </Typography>
                <Typography
                    variant="lead"
                    className="mx-auto max-w-5xl !text-gray-800"
                >
                    If you can&apos;t decide, the answer is no. If two equally difficult
                    paths, choose the one more painful in the short term (pain avoidance
                    is creating an illusion of equality).
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

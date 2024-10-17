import React from "react";
import { Typography } from "@material-tailwind/react";

interface IconPropsType {
    children: React.ReactNode;
}

function Icon({ children }: IconPropsType) {
    return (
        <div className="mb-6 grid h-12 w-12 place-items-center rounded-full bg-gray-900 p-2.5 text-white">
            {children}
        </div>
    );
}

interface ContentData {
    icon: React.ReactNode;
    title: string;
    description: string;
    features: string[];
    image: string;
}

interface AboutSectionProps {
    sections: ContentData[];
}

export function AboutSection({ sections }: AboutSectionProps) {
    return (
        <>
            {sections.map((section, index) => (
                <div key={index} className={`container mx-auto mb-20 grid items-start gap-y-8 lg:grid-cols-2 ${index % 2 !== 0 ? 'lg:grid-flow-col-dense' : ''}`}>
                    <img
                        src={section.image}
                        alt={section.title}
                        className={`h-full max-h-[450px] w-full object-cover ${index % 2 !== 0 ? 'lg:col-start-2' : ''}`}
                    />
                    <div className={`grid w-full items-center ${index % 2 !== 0 ? 'lg:col-start-1 lg:row-start-1 lg:pr-10' : 'lg:px-8'}`}>
                        <Icon>
                            {section.icon}
                        </Icon>
                        <Typography
                            variant="h3"
                            color="blue-gray"
                            className="mb-4 !text-2xl font-bold lg:!text-3xl"
                        >
                            {section.title}
                        </Typography>
                        <Typography
                            variant="lead"
                            color="blue-gray"
                            className="mb-10 font-normal"
                        >
                            {section.description}
                        </Typography>
                        <ul className="flex list-disc flex-col gap-6 pl-4 font-normal text-blue-gray-900">
                            {section.features.map((feature, featureIndex) => (
                                <li key={featureIndex}>{feature}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            ))}
        </>
    );
}

export default AboutSection;
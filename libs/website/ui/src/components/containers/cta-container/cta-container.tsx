import React from "react";
import { Typography, Button, Card, CardBody } from "@material-tailwind/react";

interface ContentCardProps {
    title: string;
    description: string;
    subtitle: string;
    buttonText: string;
    bgColor: string;
    textColor: string;
    buttonColor: string;
    buttonTextColor: string;
    height?: string;
    onClick?: () => void;
}

export function ContentCard({
    title,
    description,
    subtitle,
    buttonText,
    bgColor,
    textColor,
    buttonColor,
    buttonTextColor,
    height = "h-[480px]",
    onClick
}: ContentCardProps) {
    return (
        <Card shadow={false}>
            <CardBody className={`flex ${height} flex-col text-center items-center justify-center ${bgColor} p-10`}>
                <Typography variant="h6" className="mb-4 uppercase" color={textColor}>
                    {subtitle}
                </Typography>
                <Typography variant="h3" color={textColor}>
                    {title}
                </Typography>
                <Typography
                    color={textColor}
                    className="mt-3 mb-14 text-center text-base font-bold opacity-70 max-w-sm"
                >
                    {description}
                </Typography>
                <Button
                    color={buttonColor}
                    className={`text-${buttonTextColor}`}
                    onClick={onClick}
                >
                    {buttonText}
                </Button>
            </CardBody>
        </Card>
    );
}

interface ContentSectionProps {
    title: string;
    subtitle: string;
    description: string;
    cards: ContentCardProps[];
}

export function ContentSection({ title, subtitle, description, cards }: ContentSectionProps) {
    return (
        <>
            <div className="text-center mb-8 lg:mb-16">

                <Typography
                    variant="h1"
                    className="mb-4 text-3xl !leading-tight lg:text-5xl text-neutral-dark"
                >
                    {title}
                </Typography>
                <Typography
                    variant="lead"
                    className="mt-2 hidden max-w-4xl font-normal !text-neutral-dark md:inline-block"
                >
                    {description}
                </Typography>
            </div>
            <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2">
                {cards.map((card, index) => (
                    <ContentCard
                        key={index}
                        {...card}
                    />
                ))}
            </div>
        </>
    );
}

export default ContentSection;

// Example usage:
// import ContentSection from './path-to-ContentSection';
// 
// function App() {
//   const contentSectionProps = {
//     title: "Some of Our Awesome Projects",
//     subtitle: "OUR WORK",
//     description: "If you can't decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality).",
//     cards: [
//       {
//         title: "Search and Discover!",
//         description: "Insight to help you create, connect, and convert. Understand Your Audience's Interests, Influence, Interactions, and Intent. Discover emerging topics and",
//         subtitle: "productivity",
//         buttonText: "Learn More",
//         bgColor: "bg-blue-600",
//         textColor: "white",
//         buttonColor: "white",
//         buttonTextColor: "blue-600",
//         onClick: () => console.log("Card 1 clicked")
//       },
//       {
//         title: "Find Music and Play!",
//         description: "Insight to help you create, connect, and convert. Understand Your Audience's Interests, Influence, Interactions, and Intent. Discover emerging topics and",
//         subtitle: "design",
//         buttonText: "Explore",
//         bgColor: "bg-green-500",
//         textColor: "white",
//         buttonColor: "white",
//         buttonTextColor: "green-500",
//         onClick: () => console.log("Card 2 clicked")
//       },
//       // Add more cards as needed
//     ]
//   };
// 
//   return (
//     <div>
//       <ContentSection {...contentSectionProps} />
//     </div>
//   );
// }
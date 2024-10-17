import React from "react";
import {
    Typography,
    Button,
} from "@material-tailwind/react";

interface HeroProps {
    title: string;
    subtitle: string;
    primaryButtonText: string;
    secondaryButtonText: string;
    leftColumnImage: string;
    rightColumnImage: string;
}

export function Hero({
    title,
    subtitle,
    primaryButtonText,
    secondaryButtonText,
    leftColumnImage,
    rightColumnImage,
}: HeroProps) {
    return (
        <div className="flex flex-col lg:flex-row h-screen">
            {/* Left Column with Background Image */}
            <div 
                className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16 relative"
                style={{
                    backgroundImage: `url(${leftColumnImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                {/* Overlay for better text readability */}
                <div className="absolute inset-0 bg-black opacity-10"></div>
                
                <div className="max-w-xl relative z-10">
                    <Typography
                        variant="h1"
                        className="font-poppins text-secondary-light text-3xl font-extrabold sm:text-4xl md:text-5xl lg:text-6xl mb-6"
                    >
                        {title}
                        <span className="text-blue-400"> Innovate</span>
                    </Typography>

                    <Typography
                        variant="lead"
                        className="mb-8 max-w-lg sm:text-xl/relaxed text-gray-200"
                    >
                        {subtitle}
                    </Typography>

                    <div className="flex flex-wrap gap-4">
                        <Button
                            color="blue"
                            size="lg"
                            className="rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                        >
                            {primaryButtonText}
                        </Button>

                        <Button
                            color="white"
                            variant="outlined"
                            size="lg"
                            className="rounded-full text-white hover:bg-white hover:bg-opacity-10"
                        >
                            {secondaryButtonText}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Right Column (Image) */}
            <div className="w-full lg:w-1/2 hidden lg:block">
                <img
                    src={rightColumnImage}
                    alt="Hero Image"
                    className="w-full h-full object-cover"
                />
            </div>
        </div>
    );
}

export default Hero;

// Example usage:
// import leftColumnImage from '../path/to/your/left-column-image.jpg';
// import rightColumnImage from '../path/to/your/right-column-image.jpg';
//
// function App() {
//   return (
//     <Hero
//       title="Transform Your Business"
//       subtitle="Discover cutting-edge solutions that drive growth and innovation in the digital age. Our platform empowers businesses to thrive in today's competitive landscape."
//       primaryButtonText="Get Started"
//       secondaryButtonText="Learn More"
//       leftColumnImage={leftColumnImage}
//       rightColumnImage={rightColumnImage}
//     />
//   );
// }
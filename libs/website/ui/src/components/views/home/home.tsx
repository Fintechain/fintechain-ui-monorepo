import React from "react";
import {
    IconButton,
    Typography,
} from "@material-tailwind/react";
import {Hero} from "../../widgets/hero/hero";

interface HomeProps {
    backgroundImage: string;
    backgroundPatternImage: string;

}

export function Home({ backgroundImage, backgroundPatternImage }: HomeProps) {
    return (
        <Hero
            title="Global Payment Infrastructure"
            subtitle="The GFS Messaging Network is a decentralized financial messaging layer built to serve as an alternative to SWIFT and other centralized messaging systems."
            primaryButtonText="Get Started"
            secondaryButtonText="Learn More"
            rightColumnImage={backgroundImage}
            leftColumnImage={backgroundPatternImage}
        />
    );
}

export default Home;

// Example usage:
// import backgroundImage from '../path/to/your/image.jpg';
// 
// function App() {
//     return (
//         <Home backgroundImage={backgroundImage} />
//     );
// }
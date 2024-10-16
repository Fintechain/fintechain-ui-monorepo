import React from 'react';

interface ImageBackgroundSectionProps {
  imageUrl: string;
  overlayColor?: string;
  overlayOpacity?: number;
  children: React.ReactNode;
  className?: string;
}

export const ImageBackgroundSection: React.FC<ImageBackgroundSectionProps> = ({
  imageUrl,
  overlayColor = 'bg-black',
  overlayOpacity = 50,
  children,
  className = '',
}) => {
  return (
    <section 
      className={`relative bg-cover bg-center bg-no-repeat ${className}`}
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <div 
        className={`absolute inset-0 ${overlayColor} opacity-${overlayOpacity}`}
        aria-hidden="true"
      />
      <div className="relative z-10 container mx-auto">
        {children}
      </div>
    </section>
  );
};

export default ImageBackgroundSection;

// Example usage:
// import ImageBackgroundSection from './path-to-ImageBackgroundSection';
// import { Typography } from "@material-tailwind/react";
//
// function App() {
//   return (
//     <ImageBackgroundSection
//       imageUrl="/path-to-your-image.jpg"
//       overlayColor="bg-blue-900"
//       overlayOpacity={70}
//       className="text-white"
//     >
//       <div className="text-center">
//         <Typography variant="h1" className="mb-4">
//           Welcome to Our Solutions
//         </Typography>
//         <Typography variant="lead" className="mb-8">
//           Discover how we can help transform your business
//         </Typography>
//         {/* Add more content here */}
//       </div>
//     </ImageBackgroundSection>
//   );
// }
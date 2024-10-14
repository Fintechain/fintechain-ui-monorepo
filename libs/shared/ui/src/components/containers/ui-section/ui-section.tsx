import React from 'react';

interface UiSectionProps {
  backgroundType: 'image' | 'color';
  backgroundValue: string;
  overlayColor?: string;
  overlayOpacity?: number;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
}

export const UiSection: React.FC<UiSectionProps> = ({
  backgroundType,
  backgroundValue,
  overlayColor = 'bg-black',
  overlayOpacity = 50,
  children,
  className = '',
  contentClassName = '',
}) => {
  const getBackgroundStyle = () => {
    if (backgroundType === 'image') {
      return { backgroundImage: `url(${backgroundValue})` };
    }
    // For color, we'll use Tailwind classes instead of inline styles
    return {};
  };

  const sectionClasses = [
    'relative',
    backgroundType === 'image' ? 'bg-cover bg-center bg-no-repeat' : backgroundValue,
    className
  ].filter(Boolean).join(' ');

  const overlayClasses = [
    'absolute',
    'inset-0',
    overlayColor,
    `opacity-${overlayOpacity}`
  ].join(' ');

  const contentClasses = [
    'relative',
    'z-10',
    'container',
    'mx-auto',
    contentClassName
  ].join(' ');

  return (
    <section 
      className={sectionClasses}
      style={getBackgroundStyle()}
    >
      {backgroundType === 'image' && (
        <div 
          className={overlayClasses}
          aria-hidden="true"
        />
      )}
      <div className={contentClasses}>
        {children}
      </div>
    </section>
  );
};

export default UiSection;

{/* <div>
      // With background image 
      <UiSection
        backgroundType="image"
        backgroundValue="/path-to-your-image.jpg"
        overlayColor="bg-secondary-dark"
        overlayOpacity={70}
        className="text-white py-20"
        contentClassName="text-center"
      >
        <Typography variant="h1" className="mb-4">
          Welcome to Our Solutions
        </Typography>
        <Typography variant="lead" className="mb-8">
          Discover how we can help transform your business
        </Typography>
      </UiSection>

      //With custom background color
      <UiSection
        backgroundType="color"
        backgroundValue="bg-secondary-light"
        className="text-gray-800 py-20"
        contentClassName="text-center"
      >
        <Typography variant="h2" className="mb-4">
          Our Services
        </Typography>
        <Typography variant="paragraph" className="mb-8">
          Explore our range of services designed to meet your needs
        </Typography>
      </UiSection>
    </div>
  );
} */}



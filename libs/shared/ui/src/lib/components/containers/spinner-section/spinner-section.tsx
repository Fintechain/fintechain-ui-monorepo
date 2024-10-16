import React from 'react';
import { UiSection } from '@fintechain-monorepo/shared-ui';

interface SpinnerSectionProps {
    message?: string;
    backgroundColorClass?: string;
    spinnerColorClass?: string;
    textColorClass?: string;
    size?: 'small' | 'medium' | 'large';
}

export const SpinnerSection: React.FC<SpinnerSectionProps> = ({
    message,
    backgroundColorClass = 'bg-white',
    spinnerColorClass = 'text-blue-600',
    textColorClass = 'text-gray-700',
    size = 'medium'
}) => {
    const getSizeClasses = () => {
        switch (size) {
            case 'small':
                return 'h-6 w-6';
            case 'large':
                return 'h-12 w-12';
            default:
                return 'h-8 w-8';
        }
    };

    return (
        <UiSection
            backgroundType="color"
            backgroundValue={backgroundColorClass}
            className="flex-grow min-h-0"
            contentClassName="flex flex-col items-center justify-center py-20 px-8"
        >
            <div className="flex flex-col items-center">
                <svg
                    className={`animate-spin ${getSizeClasses()} ${spinnerColorClass}`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    />
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                </svg>
                {message && (
                    <p className={`mt-4 text-center ${textColorClass}`}>
                        {message}
                    </p>
                )}
            </div>
        </UiSection>
    );
};

export default SpinnerSection;
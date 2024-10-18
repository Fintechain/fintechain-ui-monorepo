import React from 'react';
import { InformationCircleIcon, ExclamationTriangleIcon, XCircleIcon, CheckCircleIcon } from '@heroicons/react/20/solid';
import { UiSection } from '@fintechain-monorepo/shared-ui';

type IconType = 'info' | 'warning' | 'error' | 'success';

interface NotificationSectionProps {
    iconType: IconType;
    title: string;
    message: string;
    action?: {
        label: string;
        onClick: () => void;
    };
    backgroundColorClass?: string;
    textColorClass?: string;
    titleColorClass?: string;
    iconColorClass?: string;
    actionColorClass?: string;
}

export const NotificationSection: React.FC<NotificationSectionProps> = ({
    iconType,
    title,
    message,
    action,
    backgroundColorClass = 'bg-blue-50',
    textColorClass = 'text-blue-700',
    titleColorClass = 'text-blue-800',
    iconColorClass = 'text-blue-400',
    actionColorClass = 'text-blue-600 hover:text-blue-500'
}) => {
    const getIcon = () => {
        const iconClass = `h-8 w-8 ${iconColorClass}`;
        switch (iconType) {
            case 'info':
                return <InformationCircleIcon className={iconClass} />;
            case 'warning':
                return <ExclamationTriangleIcon className={iconClass} />;
            case 'error':
                return <XCircleIcon className={iconClass} />;
            case 'success':
                return <CheckCircleIcon className={iconClass} />;
        }
    };

    return (
        <UiSection
            backgroundType="color"
            backgroundValue={backgroundColorClass}
            className={`flex-grow min-h-0 border`}
            contentClassName="flex-col items-center text-center lg:py-20 py-10 px-8"
        >
            <div className="flex flex-col items-center">
                <div className="mb-4">
                    {getIcon()}
                </div>
                <div className="flex flex-col items-center">
                    <h1 className={`text-4xl font-bold ${titleColorClass}`}>
                        {title}
                    </h1>
                    <div className={`mt-2 lg:mt-8 text-2xl ${textColorClass}`}>
                        <p>{message}</p>
                    </div>
                    {action && (
                        <div className="mt-6">
                            <button
                                onClick={action.onClick}
                                className={`text-sm font-medium ${actionColorClass}`}
                            >
                                {action.label}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </UiSection>
    );
};

export default NotificationSection;
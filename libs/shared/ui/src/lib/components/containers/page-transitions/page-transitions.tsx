import { motion } from 'framer-motion';
import React from 'react';
import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
    children: React.ReactNode;
    variant?: 'slide' | 'fade' | 'scale' | 'corporate';
}

export const PageTransition: React.FC<PageTransitionProps> = ({ 
    children, 
    variant = 'slide' 
}) => {
    const location = useLocation();
    const direction = useDirection(location);

    const variants = {
        enter: {
            opacity: 0,
            x: direction > 0 ? 20 : -20,
        },
        center: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.2,
            },
        },
        exit: {
            opacity: 0,
            x: direction > 0 ? -20 : 20,
            transition: {
                duration: 0.2,
            },
        },
    };

    return (
        <motion.div
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full"
        >
            {children}
        </motion.div>
    );
};

export const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="w-full">
            {children}
        </div>
    );
};

function useDirection(location: { pathname: string }) {
    const [prevPath, setPrevPath] = React.useState<string>(location.pathname);
    const [direction, setDirection] = React.useState(1);

    React.useEffect(() => {
        if (location.pathname !== prevPath) {
            setDirection(location.pathname.length >= prevPath.length ? 1 : -1);
            setPrevPath(location.pathname);
        }
    }, [location.pathname, prevPath]);

    return direction;
}
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";


export function useScrollPosition() {
    const [scrollPositions, setScrollPositions] = useState<{ [key: string]: number }>({});
    const location = useLocation();

    // Save scroll position when leaving a route
    useEffect(() => {
        setScrollPositions(prev => ({
            ...prev,
            [location.pathname]: window.scrollY
        }));
    }, [location.pathname]);

    // Restore scroll position when entering a route
    useEffect(() => {
        const scrollY = scrollPositions[location.pathname] || 0;
        window.scrollTo(0, scrollY);
    }, [location.pathname, scrollPositions]);

    return scrollPositions;
}


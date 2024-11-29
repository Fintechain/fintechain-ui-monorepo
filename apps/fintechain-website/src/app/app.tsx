// app.tsx
import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useLocation
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import * as FintechainWebsiteUiLib from "@fintechain-monorepo/fintechain-website-ui";
import * as SharedUiLib from "@fintechain-monorepo/shared-ui";

// Create a wrapper for animated routes
const AnimatedRoutes = () => {
    const location = useLocation();

    return (
        <SharedUiLib.PageWrapper>
            <AnimatePresence 
                initial={false} 
                mode="wait"
                onExitComplete={() => {
                    window.scrollTo(0, 0); // Reset scroll when transition completes
                }}
            >
                <Routes location={location} key={location.pathname}>
                    <Route path="/" element={
                        <SharedUiLib.PageTransition>
                            <FintechainWebsiteUiLib.HomePage />
                        </SharedUiLib.PageTransition>
                    } />
                    <Route path="/about" element={
                        <SharedUiLib.PageTransition>
                            <FintechainWebsiteUiLib.AboutPage />
                        </SharedUiLib.PageTransition>
                    } />
                    <Route path="/contact" element={
                        <SharedUiLib.PageTransition>
                            <FintechainWebsiteUiLib.ContactPage />
                        </SharedUiLib.PageTransition>
                    } />
                    <Route path="/needs" element={
                        <SharedUiLib.PageTransition>
                            <FintechainWebsiteUiLib.NeedsPage />
                        </SharedUiLib.PageTransition>
                    } />
                    <Route path="/solutions" element={
                        <SharedUiLib.PageTransition>
                            <FintechainWebsiteUiLib.SolutionsPage />
                        </SharedUiLib.PageTransition>
                    } />
                    <Route path="/philosophy" element={
                        <SharedUiLib.PageTransition>
                            <FintechainWebsiteUiLib.PhilosophyPage />
                        </SharedUiLib.PageTransition>
                    } />
                    <Route path="/pacs-008" element={
                        <SharedUiLib.PageTransition>
                            <FintechainWebsiteUiLib.Pacs008Page />
                        </SharedUiLib.PageTransition>
                    } />
                    <Route path="/token-board" element={
                        <SharedUiLib.PageTransition>
                            <FintechainWebsiteUiLib.WalletPage />
                        </SharedUiLib.PageTransition>
                    } />
                </Routes>
            </AnimatePresence>
        </SharedUiLib.PageWrapper>
    );
};

// Main App component
const App: React.FC = () => {
    const headerProps: SharedUiLib.HeaderProps = {};
    const footerProps: SharedUiLib.FooterProps = {};

    return (
        <Router>
            <SharedUiLib.SiteLayout headerProps={headerProps} footerProps={footerProps}>
                <AnimatedRoutes />
            </SharedUiLib.SiteLayout>
        </Router>
    );
};

export default App;
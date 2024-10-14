const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');
const withMT = require("@material-tailwind/react/utils/withMT");

/** @type {import('tailwindcss').Config} */
module.exports = withMT({
    content: [
        join(
            __dirname,
            '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
        ),
        "../../node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
        "../../node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
        ...createGlobPatternsForDependencies(__dirname),
    ],
    
    // Extending the theme to include design tokens
    theme: {
        extend: {
            // Standardized font families
            fontFamily: {
                sans: ["Schibsted Grotesk", "Poppins", "sans-serif"],
                serif: ["Schibsted Grotesk", "serif"],
                heading: ["Poppins", "sans-serif"], // Separate font for headings
                body: ["Schibsted Grotesk", "sans-serif"],
            },
            // Standardized color palette
            colors: {
                primary: {
                    light: '#93c5fd', // Tailwind-based light blue
                    DEFAULT: '#0496FF', // Dodger Blue as primary
                    dark: '#006BA6', // Bice Blue as dark primary
                },
                secondary: {
                    light: '#FFBC42', // Xanthous as secondary light
                    DEFAULT: '#D81159', // Raspberry as main secondary
                    dark: '#8F2D56', // Quinacridone Magenta as dark
                },
                neutral: {
                    light: '#F3F4F6', // Light grey
                    DEFAULT: '#D1D5DB', // Default grey
                    dark: '#374151', // Dark grey
                },
                indigo: {
                    950: '#2e1065', // Deep indigo
                },
                blue: {
                    950: '#172554', // Deep blue
                },
            },
            
            // Spacing scale for consistent padding/margins
            spacing: {
                'xs': '4px',   // Extra small space
                'sm': '8px',   // Small space
                'md': '16px',  // Medium space
                'lg': '32px',  // Large space
                'xl': '48px',  // Extra large space
                '2xl': '64px', // Extra extra large
            },

            // Custom breakpoints
            screens: {
                'xs': '480px', // Extra small devices
                'sm': '640px', // Small devices
                'md': '768px', // Medium devices
                'lg': '1024px', // Large devices
                'xl': '1280px', // Extra large
                '2xl': '1536px', // 2X large
            },

            // Border radius for components like cards or buttons
            borderRadius: {
                sm: '0.125rem', // Small radius
                DEFAULT: '0.375rem', // Default
                lg: '0.5rem', // Larger radius
                full: '9999px', // Fully rounded (e.g. pills)
            },

            // Box shadows for material effect
            boxShadow: {
                sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
                md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms'), // Plugin for consistent form styles
        require('@tailwindcss/typography'), // Plugin for typography
    ],
});

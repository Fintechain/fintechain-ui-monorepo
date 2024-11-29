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
                    DEFAULT: '#3D5A80',
                    light: '#98C1D9',
                    lighter: '#E0FBFC',
                },
                accent: {
                    DEFAULT: '#EE6C4D',
                    light: '#E7B4A5',
                },
                dark: {
                    DEFAULT: '#293241',  // Original color
                    100: '#293241',      // Base
                    200: '#2e3847',      // +5%
                    300: '#333d4d',      // +10%
                    400: '#384253',      // +15%
                    500: '#3d4759',      // +20%
                    600: '#424c5f',      // +25%
                    700: '#475165',      // +30%
                    800: '#4c566b',      // +35%
                    900: '#515b71',      // +40%
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

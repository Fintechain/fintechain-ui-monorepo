# Prompt for PageRenderer Component

Create a React functional component named `PageRenderer` that serves as the top-level component for rendering a complete page based on the PageData structure defined in `coreTypes.ts`.

## Requirements:

1. Component Structure:
   - Use a functional component with React hooks
   - Implement proper TypeScript typing for props and any internal state
   - Use the `React.FC` type or a more specific function declaration

2. Props:
   - Accept a `pageId: ID` prop to identify which page to render
   - Consider additional props for customization or context

3. State Management:
   - Use the `usePageData` custom hook (to be implemented) for fetching and managing page data
   - Handle loading, error, and success states

4. Rendering:
   - Render all sections of the page in the order specified by the PageData
   - Use a `SectionRenderer` component (to be implemented) for rendering individual sections
   - Implement proper error boundaries and fallback UI for error states

5. Performance Optimization:
   - Use React.memo for the component if it's expected to re-render often
   - Implement useMemo and useCallback hooks for expensive computations or callback functions
   - Consider using windowing techniques for long pages with many sections

6. Styling:
   - Use Tailwind CSS for styling, following the patterns in the provided `UiSection` component
   - Implement responsive design principles

7. Accessibility:
   - Ensure proper heading hierarchy (h1, h2, etc.) based on the page structure
   - Implement proper ARIA attributes where necessary
   - Ensure keyboard navigation works correctly

8. SEO:
   - Implement a `Head` component or similar for managing meta tags
   - Use the metadata from PageData to set appropriate title, description, and other meta tags

9. Error Handling:
   - Implement error boundaries to catch and handle rendering errors
   - Provide meaningful error messages and fallback UI

10. Testing:
    - Include comments or TODO markers for unit and integration tests
    - Consider implementing snapshot tests for the rendered output

11. Documentation:
    - Provide comprehensive JSDoc comments for the component and its functions
    - Include inline comments for complex logic

## Example Structure:

```tsx
import React, { useMemo } from 'react';
import { usePageData } from '../hooks/usePageData';
import { SectionRenderer } from './SectionRenderer';
import { ErrorBoundary } from './ErrorBoundary';
import { LoadingSpinner } from './LoadingSpinner';
import { SEOHead } from './SEOHead';
import { ID, PageData } from '../types/coreTypes';

interface PageRendererProps {
    pageId: ID;
    className?: string;
}

/**
 * Renders a complete page based on the provided page ID.
 * Fetches page data and renders all sections of the page.
 *
 * @param {PageRendererProps} props - The component props
 * @returns {React.ReactElement} The rendered page
 */
export const PageRenderer: React.FC<PageRendererProps> = React.memo(({ pageId, className }) => {
    const { pageData, loading, error } = usePageData(pageId);

    const content = useMemo(() => {
        if (loading) return <LoadingSpinner />;
        if (error) return <ErrorMessage message={error.message} />;
        if (!pageData) return <ErrorMessage message="Page not found" />;

        return (
            <>
                <SEOHead metadata={pageData.metadata} />
                <main className={className}>
                    {pageData.sections.map((section) => (
                        <ErrorBoundary key={section.id} fallback={<ErrorMessage message="Error rendering section" />}>
                            <SectionRenderer section={section} />
                        </ErrorBoundary>
                    ))}
                </main>
            </>
        );
    }, [pageData, loading, error, className]);

    return (
        <ErrorBoundary fallback={<ErrorMessage message="Something went wrong" />}>
            {content}
        </ErrorBoundary>
    );
});

PageRenderer.displayName = 'PageRenderer';

// TODO: Implement unit tests for PageRenderer
// - Test loading state
// - Test error state
// - Test successful render with mock page data
// - Test with different page structures

export default PageRenderer;
```

Ensure that the `PageRenderer` component is flexible enough to handle various page structures and integrates seamlessly with the rest of the Page Data Framework. The component should be optimized for performance and provide a great user experience, even for complex page layouts.
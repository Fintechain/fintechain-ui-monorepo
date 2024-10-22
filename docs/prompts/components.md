# Prompt: React Components for Page Data Framework

Create the main React components for our Page Data Framework using TypeScript. These components will be responsible for rendering the page structure, sections, and content blocks.

## Requirements:

1. Create separate files for each component in the `src/components` directory:
   - `PageRenderer.tsx`
   - `SectionRenderer.tsx`
   - `ContentBlockRenderer.tsx`
2. Use functional components with hooks.
3. Implement proper TypeScript typing for props and state.
4. Use error boundaries for error handling.
5. Implement loading states and fallback UI.
6. Use React.memo for performance optimization where appropriate.
7. Include comprehensive JSDoc comments for each component and its props.

## Example Implementation:

### PageRenderer.tsx

```tsx
import React from 'react';
import { usePageData } from '../hooks/usePageData';
import { SectionRenderer } from './SectionRenderer';
import { NavigationRenderer } from './NavigationRenderer';
import { SEOHead } from './SEOHead';
import { ErrorBoundary } from './ErrorBoundary';
import { PageData, ID } from '../types/coreTypes';

interface PageRendererProps {
  pageId: ID;
  className?: string;
}

/**
 * PageRenderer component
 * 
 * Renders a complete page based on the provided pageId.
 * Handles loading states, errors, and renders child components.
 * 
 * @param {PageRendererProps} props - The component props
 * @returns {React.ReactElement} The rendered page
 */
export const PageRenderer: React.FC<PageRendererProps> = React.memo(({ pageId, className }) => {
  const { pageData, loading, error } = usePageData(pageId);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!pageData) return <NotFoundPage />;

  return (
    <ErrorBoundary fallback={<ErrorPage />}>
      <SEOHead metadata={pageData.metadata} />
      <div className={className}>
        <NavigationRenderer navigation={pageData.navigation.header} />
        <main>
          {pageData.sections.map((section) => (
            <SectionRenderer key={section.id} section={section} />
          ))}
        </main>
        <NavigationRenderer navigation={pageData.navigation.footer} />
      </div>
    </ErrorBoundary>
  );
});

PageRenderer.displayName = 'PageRenderer';
```

### SectionRenderer.tsx

```tsx
import React from 'react';
import { useSectionRenderer } from '../hooks/useSectionRenderer';
import { SectionData } from '../types/coreTypes';

interface SectionRendererProps {
  section: SectionData;
  className?: string;
}

/**
 * SectionRenderer component
 * 
 * Renders a section based on its type using the useSectionRenderer hook.
 * 
 * @param {SectionRendererProps} props - The component props
 * @returns {React.ReactElement} The rendered section
 */
export const SectionRenderer: React.FC<SectionRendererProps> = React.memo(({ section, className }) => {
  const { renderSection } = useSectionRenderer();

  return (
    <section className={`${className} ${section.style.className}`} style={section.style.customStyles}>
      {renderSection(section)}
    </section>
  );
});

SectionRenderer.displayName = 'SectionRenderer';
```

### ContentBlockRenderer.tsx

```tsx
import React from 'react';
import { useContentBlockRenderer } from '../hooks/useContentBlockRenderer';
import { ContentBlock } from '../types/coreTypes';

interface ContentBlockRendererProps {
  block: ContentBlock;
}

/**
 * ContentBlockRenderer component
 * 
 * Renders a content block based on its type using the useContentBlockRenderer hook.
 * 
 * @param {ContentBlockRendererProps} props - The component props
 * @returns {React.ReactElement} The rendered content block
 */
export const ContentBlockRenderer: React.FC<ContentBlockRendererProps> = React.memo(({ block }) => {
  const { renderContentBlock } = useContentBlockRenderer();

  return renderContentBlock(block);
});

ContentBlockRenderer.displayName = 'ContentBlockRenderer';
```

## Additional Guidelines:

- Ensure all components are exported as named exports.
- Use React.Suspense for code-splitting and lazy loading where appropriate.
- Implement proper prop-types for non-TypeScript environments.
- Consider implementing Skeleton loaders for a better user experience during loading states.
- Use React Context API for passing down deeply nested props if necessary.
- Implement accessibility features such as proper ARIA attributes and keyboard navigation.
- Write unit tests for each component using React Testing Library.

Remember to keep your components focused and composable. Each component should have a single responsibility and be easy to test and maintain.
# Page Data Framework Specification

## 1. Introduction

The Page Data Framework is a comprehensive system designed to manage, render, and interact with dynamic web pages. It provides a flexible and extensible architecture for creating complex, data-driven web applications with a focus on performance, maintainability, and developer experience.

### 1.1 Purpose

The primary purpose of the Page Data Framework is to:

1. Provide a structured approach to managing page data
2. Enable dynamic rendering of various page components
3. Facilitate easy extension and customization of page structures
4. Ensure type safety and robust error handling throughout the application
5. Optimize performance for large-scale web applications

### 1.2 Scope

This framework encompasses:

- Core data structures for representing pages and their components
- React components for rendering pages and sections
- State management using Rematch
- Custom hooks for data fetching and management
- API services for interacting with backend systems
- Utility functions for managing different types of sections and content blocks
- Configuration management for different environments

### 1.3 Technologies

The Page Data Framework is built using the following core technologies:

- React 18+
- TypeScript 4.5+
- Rematch (for state management)
- Axios (for API requests)
- Tailwind CSS (for styling)
- Material Tailwind React (for UI components)

## 2. Architecture Overview

The Page Data Framework follows a modular, component-based architecture with clear separation of concerns:

1. **Data Layer**: Defines core data structures and handles data fetching and manipulation
2. **State Management Layer**: Manages application state using Rematch models
3. **UI Layer**: Comprises React components for rendering pages and sections
4. **Service Layer**: Handles communication with backend APIs
5. **Utility Layer**: Provides helper functions and type registries
6. **Configuration Layer**: Manages environment-specific settings and feature flags

## 3. Core Data Structures

### 3.1 PageData

Represents the complete structure of a page.

```typescript
export type ID = string;

export interface PageData {
  id: ID;
  slug: string;
  title: string;
  description?: string;
  metadata: Metadata;
  sections: SectionData[];
  navigation: NavigationData;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  locale: string;
  alternateLocales?: { locale: string; slug: string }[];
}

export interface Metadata {
  title: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  canonicalUrl?: string;
  [key: string]: any;
}
```

### 3.2 SectionData

Represents a single section within a page.

```typescript
export interface SectionData {
  id: ID;
  type: string;
  title?: string;
  subtitle?: string;
  contentBlocks: ContentBlock[];
  style: SectionStyle;
  metadata?: Record<string, any>;
}

export interface SectionStyle {
  backgroundColor?: string;
  backgroundImage?: string;
  padding?: string;
  margin?: string;
  className?: string;
  customStyles?: Record<string, string>;
}
```

### 3.3 ContentBlock

Represents a unit of content within a section.

```typescript
export type ContentBlock = TextBlock | ImageBlock | VideoBlock | CustomBlock;

export interface BaseContentBlock {
  id: ID;
  type: string;
  metadata?: Record<string, any>;
}

export interface TextBlock extends BaseContentBlock {
  type: 'text';
  content: string;
  format?: 'plain' | 'markdown' | 'html';
}

export interface ImageBlock extends BaseContentBlock {
  type: 'image';
  src: string;
  alt: string;
  caption?: string;
}

export interface VideoBlock extends BaseContentBlock {
  type: 'video';
  src: string;
  poster?: string;
  caption?: string;
}

export interface CustomBlock extends BaseContentBlock {
  type: 'custom';
  content: any;
}
```

### 3.4 NavigationData

Represents the navigation structure for a page or the entire site.

```typescript
export interface NavigationData {
  header?: NavigationItem[];
  footer?: NavigationItem[];
  sidebar?: NavigationItem[];
}

export interface NavigationItem {
  id: ID;
  label: string;
  url: string;
  icon?: string;
  children?: NavigationItem[];
}
```

## 4. React Components

### 4.1 PageRenderer

The top-level component responsible for rendering a complete page.

```typescript
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

export const PageRenderer: React.FC<PageRendererProps> = ({ pageId, className }) => {
  const { pageData, loading, error } = usePageData(pageId);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!pageData) return <NotFoundPage />;

  return (
    <ErrorBoundary>
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
};
```

### 4.2 SectionRenderer

Renders individual sections based on their type and data.

```typescript
import React from 'react';
import { SectionData } from '../types/coreTypes';
import { useSectionRenderer } from '../hooks/useSectionRenderer';

interface SectionRendererProps {
  section: SectionData;
  className?: string;
}

export const SectionRenderer: React.FC<SectionRendererProps> = ({ section, className }) => {
  const { renderSection } = useSectionRenderer();

  return (
    <section className={`${className} ${section.style.className}`} style={section.style.customStyles}>
      {renderSection(section)}
    </section>
  );
};
```

### 4.3 ContentBlockRenderer

Renders individual content blocks based on their type.

```typescript
import React from 'react';
import { ContentBlock } from '../types/coreTypes';
import { useContentBlockRenderer } from '../hooks/useContentBlockRenderer';

interface ContentBlockRendererProps {
  block: ContentBlock;
}

export const ContentBlockRenderer: React.FC<ContentBlockRendererProps> = ({ block }) => {
  const { renderContentBlock } = useContentBlockRenderer();

  return renderContentBlock(block);
};
```

## 5. Custom Hooks

### 5.1 usePageData

Custom hook for fetching and managing page data.

```typescript
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, Dispatch } from '../store';
import { PageData, ID } from '../types/coreTypes';

export const usePageData = (pageId: ID) => {
  const dispatch = useDispatch<Dispatch>();
  const pageData = useSelector((state: RootState) => state.pages.byId[pageId]);
  const loading = useSelector((state: RootState) => state.pages.loading);
  const error = useSelector((state: RootState) => state.pages.error);

  useEffect(() => {
    if (!pageData && !loading && !error) {
      dispatch.pages.fetchPage(pageId);
    }
  }, [pageId, pageData, loading, error, dispatch.pages]);

  return { pageData, loading, error };
};
```

### 5.2 useSectionRenderer

Custom hook for rendering different section types.

```typescript
import { useCallback } from 'react';
import { SectionData } from '../types/coreTypes';
import { sectionTypeRegistry } from '../utils/sectionTypeRegistry';

export const useSectionRenderer = () => {
  const renderSection = useCallback((section: SectionData) => {
    const SectionComponent = sectionTypeRegistry.get(section.type);
    if (!SectionComponent) {
      console.warn(`Unknown section type: ${section.type}`);
      return null;
    }
    return <SectionComponent section={section} />;
  }, []);

  return { renderSection };
};
```

### 5.3 useContentBlockRenderer

Custom hook for rendering different content block types.

```typescript
import { useCallback } from 'react';
import { ContentBlock } from '../types/coreTypes';
import { contentBlockTypeRegistry } from '../utils/contentBlockTypeRegistry';

export const useContentBlockRenderer = () => {
  const renderContentBlock = useCallback((block: ContentBlock) => {
    const ContentComponent = contentBlockTypeRegistry.get(block.type);
    if (!ContentComponent) {
      console.warn(`Unknown content block type: ${block.type}`);
      return null;
    }
    return <ContentComponent block={block} />;
  }, []);

  return { renderContentBlock };
};
```

### 5.4 useNavigation

Custom hook for accessing and managing navigation data.

```typescript
import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, Dispatch } from '../store';
import { NavigationData, NavigationItem, ID } from '../types/coreTypes';

export const useNavigation = () => {
  const dispatch = useDispatch<Dispatch>();
  const globalNavigation = useSelector((state: RootState) => state.navigation.global);
  const loading = useSelector((state: RootState) => state.navigation.loading);
  const error = useSelector((state: RootState) => state.navigation.error);

  useEffect(() => {
    if (!globalNavigation && !loading && !error) {
      dispatch.navigation.fetchGlobalNavigation();
    }
  }, [globalNavigation, loading, error, dispatch.navigation]);

  const updateNavigationItem = useCallback(
    (itemId: ID, data: Partial<NavigationItem>) => {
      dispatch.navigation.updateNavigationItem({ itemId, data });
    },
    [dispatch.navigation]
  );

  return { globalNavigation, loading, error, updateNavigationItem };
};
```

## 6. Rematch Models

### 6.1 pageModel

Manages the state related to pages.

```typescript
import { createModel } from '@rematch/core';
import { RootModel } from './models';
import { PageDataService } from '../services/pageDataService';
import { PageData, ID } from '../types/coreTypes';

const pageDataService = new PageDataService('API_BASE_URL');

export const pageModel = createModel<RootModel>()({
  state: {
    byId: {} as Record<ID, PageData>,
    allIds: [] as ID[],
    loading: false,
    error: null as Error | null,
  },
  reducers: {
    setPage(state, payload: { id: ID; data: PageData }) {
      return {
        ...state,
        byId: { ...state.byId, [payload.id]: payload.data },
        allIds: state.allIds.includes(payload.id) ? state.allIds : [...state.allIds, payload.id],
      };
    },
    setLoading(state, payload: boolean) {
      return { ...state, loading: payload };
    },
    setError(state, payload: Error | null) {
      return { ...state, error: payload };
    },
  },
  effects: (dispatch) => ({
    async fetchPage(id: ID) {
      dispatch.page.setLoading(true);
      try {
        const pageData = await pageDataService.getPage(id);
        dispatch.page.setPage({ id, data: pageData });
      } catch (error) {
        dispatch.page.setError(error as Error);
      } finally {
        dispatch.page.setLoading(false);
      }
    },
  }),
});
```

### 6.2 navigationModel

Manages the global navigation state.

```typescript
import { createModel } from '@rematch/core';
import { RootModel } from './models';
import { NavigationService } from '../services/navigationService';
import { NavigationData, NavigationItem, ID } from '../types/coreTypes';

const navigationService = new NavigationService('API_BASE_URL');

export const navigationModel = createModel<RootModel>()({
  state: {
    global: {} as NavigationData,
    loading: false,
    error: null as Error | null,
  },
  reducers: {
    setGlobalNavigation(state, payload: NavigationData) {
      return { ...state, global: payload };
    },
    setLoading(state, payload: boolean) {
      return { ...state, loading: payload };
    },
    setError(state, payload: Error | null) {
      return { ...state, error: payload };
    },
    updateNavigationItemInState(state, payload: { itemId: ID; data: Partial<NavigationItem> }) {
      // Implementation to update a specific navigation item in the state
      // This is a simplified version and may need to be adapted based on the actual structure of your navigation data
      return {
        ...state,
        global: {
          ...state.global,
          header: state.global.header?.map(item =>
            item.id === payload.itemId ? { ...item, ...payload.data } : item
          ),
          footer: state.global.footer?.map(item =>
            item.id === payload.itemId ? { ...item, ...payload.data } : item
          ),
          sidebar: state.global.sidebar?.map(item =>
            item.id === payload.itemId ? { ...item, ...payload.data } : item
          ),
        },
      };
    },
  },
  effects: (dispatch) => ({
    async fetchGlobalNavigation() {
      dispatch.navigation.setLoading(true);
      try {
        const navigationData = await navigationService.getGlobalNavigation();
        dispatch.navigation.setGlobalNavigation(navigationData);
      } catch (error) {
        dispatch.navigation.setError(error as Error);
      } finally {
        dispatch.navigation.setLoading(false);
      }
    },
    async updateNavigationItem(payload: { itemId: ID; data: Partial<NavigationItem> }) {
      dispatch.navigation.setLoading(true);
      try {
        const updatedItem = await navigationService.updateNavigationItem(payload.itemId, payload.data);
        dispatch.navigation.updateNavigationItemInState({ itemId: payload.itemId, data: updatedItem });
      } catch (error) {
        dispatch.navigation.setError(error as Error);
      } finally {
        dispatch.navigation.setLoading(false);
      }
    },
  }),
});
```

## 7. API Services

### 7.1 PageDataService

Handles API calls related to fetching and updating page data.

```typescript
import axios, { AxiosInstance } from 'axios';
import { PageData, ID } from '../types/coreTypes';

export class PageDataService {
  private api: AxiosInstance;

  constructor(baseURL: string) {
    this.api = axios.create({ baseURL });
  }

  async getPage(id: ID): Promise<PageData> {
    const response = await this.api.get(`/pages/${id}`);
    return response.data;
  }

   async getPages(ids: ID[]): Promise<PageData[]> {
    const response = await this.api.get('/pages', { params: { ids: ids.join(',') } });
    return response.data;
  }

  async updatePage(id: ID, data: Partial<PageData>): Promise<PageData> {
    const response = await this.api.patch(`/pages/${id}`, data);
    return response.data;
  }
}
```

### 7.2 NavigationService

Handles API calls related to navigation data.

```typescript
import axios, { AxiosInstance } from 'axios';
import { NavigationData, NavigationItem, ID } from '../types/coreTypes';

export class NavigationService {
  private api: AxiosInstance;

  constructor(baseURL: string) {
    this.api = axios.create({ baseURL });
  }

  async getGlobalNavigation(): Promise<NavigationData> {
    const response = await this.api.get('/navigation/global');
    return response.data;
  }

  async updateNavigationItem(itemId: ID, data: Partial<NavigationItem>): Promise<NavigationItem> {
    const response = await this.api.patch(`/navigation/items/${itemId}`, data);
    return response.data;
  }
}
```

## 8. Utility Functions

### 8.1 sectionTypeRegistry

Manages registration and retrieval of section type components.

```typescript
import React from 'react';
import { SectionData } from '../types/coreTypes';

type SectionComponent = React.ComponentType<{ section: SectionData }>;

class SectionTypeRegistry {
  private registry: Map<string, SectionComponent> = new Map();

  register(type: string, component: SectionComponent): void {
    this.registry.set(type, component);
  }

  get(type: string): SectionComponent | undefined {
    return this.registry.get(type);
  }

  has(type: string): boolean {
    return this.registry.has(type);
  }
}

export const sectionTypeRegistry = new SectionTypeRegistry();
```

### 8.2 contentBlockTypeRegistry

Manages registration and retrieval of content block type components.

```typescript
import React from 'react';
import { ContentBlock } from '../types/coreTypes';

type ContentBlockComponent = React.ComponentType<{ block: ContentBlock }>;

class ContentBlockTypeRegistry {
  private registry: Map<string, ContentBlockComponent> = new Map();

  register(type: string, component: ContentBlockComponent): void {
    this.registry.set(type, component);
  }

  get(type: string): ContentBlockComponent | undefined {
    return this.registry.get(type);
  }

  has(type: string): boolean {
    return this.registry.has(type);
  }
}

export const contentBlockTypeRegistry = new ContentBlockTypeRegistry();
```

## 9. Configuration

### 9.1 AppConfig

Centralizes configuration options for the framework.

```typescript
interface AppConfig {
  env: 'development' | 'staging' | 'production';
  featureFlags: FeatureFlags;
  api: ApiConfig;
  cache: CacheConfig;
  logging: LogConfig;
  pagination: PaginationConfig;
}

interface FeatureFlags {
  useNewNavigation: boolean;
  enableComments: boolean;
  // Add more feature flags as needed
}

interface ApiConfig {
  baseUrl: string;
  timeout: number;
}

interface CacheConfig {
  ttl: number;
  maxSize: number;
}

interface LogConfig {
  level: 'debug' | 'info' | 'warn' | 'error';
}

interface PaginationConfig {
  defaultPageSize: number;
  maxPageSize: number;
}

const config: AppConfig = {
  env: process.env.NODE_ENV as 'development' | 'staging' | 'production',
  featureFlags: {
    useNewNavigation: true,
    enableComments: false,
  },
  api: {
    baseUrl: process.env.API_BASE_URL || 'https://api.example.com',
    timeout: 5000,
  },
  cache: {
    ttl: 300, // 5 minutes
    maxSize: 100,
  },
  logging: {
    level: 'info',
  },
  pagination: {
    defaultPageSize: 20,
    maxPageSize: 100,
  },
};

export default config;
```

## 10. Error Handling

The framework implements comprehensive error handling:

1. API-level errors are caught and processed in the API services (PageDataService and NavigationService).
2. State-level errors are managed in the Rematch models (pageModel and navigationModel).
3. UI-level errors are handled using Error Boundaries in React components.
4. A global error logging mechanism is implemented to track and report errors.

Example of an Error Boundary component:

```typescript
import React, { ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    // Here you can log the error to an error reporting service
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
```

## 11. Performance Considerations

1. Implement lazy loading for page sections and content blocks:

```typescript
import React, { Suspense } from 'react';

const LazySection = React.lazy(() => import('./LazySection'));

function PageContent() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazySection />
    </Suspense>
  );
}
```

2. Use memoization techniques to prevent unnecessary re-renders:

```typescript
import React, { useMemo } from 'react';

function ExpensiveComponent({ data }) {
  const expensiveResult = useMemo(() => {
    // Expensive computation here
    return someExpensiveOperation(data);
  }, [data]);

  return <div>{expensiveResult}</div>;
}
```

3. Implement efficient caching strategies for API requests and page data:

This can be achieved using the cache configuration in the AppConfig and implementing a caching layer in the API services.

4. Optimize bundle size through code splitting and dynamic imports:

```typescript
import React, { Suspense } from 'react';

const OtherComponent = React.lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <OtherComponent />
      </Suspense>
    </div>
  );
}
```

## 12. Extensibility

The framework is designed to be easily extensible:

1. New section types can be added by registering them in the sectionTypeRegistry:

```typescript
import { HeroSection } from './sections/HeroSection';

sectionTypeRegistry.register('hero', HeroSection);
```

2. New content block types can be added by registering them in the contentBlockTypeRegistry:

```typescript
import { CarouselBlock } from './blocks/CarouselBlock';

contentBlockTypeRegistry.register('carousel', CarouselBlock);
```

3. The core data structures can be extended to include additional properties as needed:

```typescript
export interface ExtendedPageData extends PageData {
  customField: string;
  anotherCustomField: number;
}
```

4. New API methods can be added to the PageDataService to support additional backend functionality:

```typescript
class PageDataService {
  // ... existing methods

  async getPageAnalytics(id: ID): Promise<PageAnalytics> {
    const response = await this.api.get(`/pages/${id}/analytics`);
    return response.data;
  }
}
```

## 13. Security Considerations

1. Implement proper input sanitization for all user-generated content:

```typescript
import DOMPurify from 'dompurify';

function sanitizeHtml(html: string): string {
  return DOMPurify.sanitize(html);
}
```

2. Use secure communication protocols (HTTPS) for all API requests:

This is ensured by using `https` in the API base URL in the AppConfig.

3. Implement proper authentication and authorization mechanisms:

This would typically involve integrating with an authentication service and adding auth headers to API requests.

4. Follow security best practices for React applications, such as avoiding the use of `dangerouslySetInnerHTML` when possible.

## 14. Accessibility

The framework should support the creation of accessible web applications:

1. Ensure proper semantic HTML structure in all components:

```typescript
function AccessibleSection() {
  return (
    <section aria-labelledby="section-title">
      <h2 id="section-title">Section Title</h2>
      <p>Section content...</p>
    </section>
  );
}
```

2. Implement proper ARIA attributes where necessary:

```typescript
function ExpandableSection({ isExpanded, toggleExpand, children }) {
  return (
    <div>
      <button 
        aria-expanded={isExpanded} 
        onClick={toggleExpand}
      >
        Toggle Section
      </button>
      {isExpanded && <div>{children}</div>}
    </div>
  );
}
```

3. Ensure keyboard navigation is supported throughout the application:

```typescript
function KeyboardNavigableMenu({ items }) {
  return (
    <ul role="menu">
      {items.map((item, index) => (
        <li key={index} role="menuitem" tabIndex={0}>
          {item}
        </li>
      ))}
    </ul>
  );
}
```

4. Provide mechanisms for alt text on images and other media:

```typescript
function AccessibleImage({ src, alt }) {
  return <img src={src} alt={alt} />;
}
```

This comprehensive specification provides a detailed overview of the Page Data Framework, covering all major components and considerations for implementing a robust, flexible, and maintainable system for managing and rendering dynamic web pages.
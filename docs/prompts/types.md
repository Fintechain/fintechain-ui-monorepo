# Prompt: Core Data Structures for Page Data Framework

Create TypeScript interfaces for the core data structures of our Page Data Framework. These structures form the foundation of our application's data model and should be designed with clarity, flexibility, and type safety in mind.

## Requirements:

1. Create a file named `coreTypes.ts` in the `src/types` directory.
2. Define the following interfaces and types:
   - `ID` (type alias for string)
   - `PageData`
   - `Metadata`
   - `SectionData`
   - `SectionStyle`
   - `ContentBlock` (union type)
   - `BaseContentBlock`
   - `TextBlock`
   - `ImageBlock`
   - `VideoBlock`
   - `CustomBlock`
   - `NavigationData`
   - `NavigationItem`
3. Use proper TypeScript features like optional properties, union types, and readonly properties where appropriate.
4. Include comprehensive JSDoc comments for each interface and type, explaining their purpose and usage.
5. Use type aliases or enums for repeated string literals (e.g., content block types).

## Example Structure:

```typescript
/**
 * coreTypes.ts
 * This file contains the core type definitions for the Page Data Framework.
 */

/** Unique identifier type used throughout the application */
export type ID = string;

/** Represents the complete structure of a page */
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

/** Metadata associated with a page for SEO and other purposes */
export interface Metadata {
  title: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  canonicalUrl?: string;
  [key: string]: any;
}

// ... (continue with other interfaces)

/** Represents a unit of content within a section */
export type ContentBlock = TextBlock | ImageBlock | VideoBlock | CustomBlock;

/** Base interface for all content block types */
export interface BaseContentBlock {
  id: ID;
  type: ContentBlockType;
  metadata?: Record<string, any>;
}

/** Represents a text content block */
export interface TextBlock extends BaseContentBlock {
  type: 'text';
  content: string;
  format?: 'plain' | 'markdown' | 'html';
}

// ... (continue with other content block types)

/** Enum for different types of content blocks */
export enum ContentBlockType {
  Text = 'text',
  Image = 'image',
  Video = 'video',
  Custom = 'custom',
}

// ... (continue with NavigationData and NavigationItem interfaces)
```

## Additional Guidelines:

- Ensure all properties are properly typed, using union types, intersection types, or utility types where necessary.
- Make judicious use of optional properties (?) for fields that may not always be present.
- Use readonly modifiers for properties that should not be mutated after creation.
- Consider using mapped types or conditional types for more complex type relationships.
- Include any necessary type guards or type predicates that might be useful when working with these types.
- Add examples in the JSDoc comments to illustrate how the types should be used.

Remember to maintain consistency in naming conventions and structure throughout the type definitions. These core types will be used extensively throughout the application, so clarity and accuracy are paramount.
# Prompt: Utility Functions for Page Data Framework

Create utility functions for the Page Data Framework, specifically the sectionTypeRegistry and contentBlockTypeRegistry. These registries will allow for dynamic registration and retrieval of section and content block components.

## Requirements:

1. Create a file named `registries.ts` in the `src/utils` directory.
2. Implement `SectionTypeRegistry` and `ContentBlockTypeRegistry` classes.
3. Use TypeScript generics for type-safe component registration and retrieval.
4. Implement methods for registering, getting, and checking for components.
5. Export singleton instances of each registry.
6. Include comprehensive JSDoc comments for each class and method.

## Example Implementation:

```typescript
import React from 'react';
import { SectionData, ContentBlock } from '../types/coreTypes';

/**
 * Registry for section type components
 */
class SectionTypeRegistry {
  private registry: Map<string, React.ComponentType<{ section: SectionData }>> = new Map();

  /**
   * Registers a section component for a given type
   * @param type - The section type
   * @param component - The React component for rendering the section
   */
  register(type: string, component: React.ComponentType<{ section: SectionData }>): void {
    this.registry.set(type, component);
  }

  /**
   * Retrieves a section component for a given type
   * @param type - The section type
   * @returns The corresponding React component or undefined if not found
   */
  get(type: string): React.ComponentType<{ section: SectionData }> | undefined {
    return this.registry.get(type);
  }

  /**
   * Checks if a section type is registered
   * @param type - The section type
   * @returns True if the type is registered, false otherwise
   */
  has(type: string): boolean {
    return this.registry.has(type);
  }
}

/**
 * Registry for content block type components
 */
class ContentBlockTypeRegistry {
  private registry: Map<string, React.ComponentType<{ block: ContentBlock }>> = new Map();

  /**
   * Registers a content block component for a given type
   * @param type - The content block type
   * @param component - The React component for rendering the content block
   */
  register(type: string, component: React.ComponentType<{ block: ContentBlock }>): void {
    this.registry.set(type, component);
  }

  /**
   * Retrieves a content block component for a given type
   * @param type - The content block type
   * @returns The corresponding React component or undefined if not found
   */
  get(type: string): React.ComponentType<{ block: ContentBlock }> | undefined {
    return this.registry.get(type);
  }

  /**
   * Checks if a content block type is registered
   * @param type - The content block type
   * @returns True if the type is registered, false otherwise
   */
  has(type: string): boolean {
    return this.registry.has(type);
  }
}

export const sectionTypeRegistry = new SectionTypeRegistry();
export const contentBlockTypeRegistry = new ContentBlockTypeRegistry();
```

## Additional Guidelines:

- Implement a method to unregister components if needed.
- Add a method to list all registered types.
- Implement error handling for attempting to register duplicate types.
- Consider adding a default fallback component for unknown types.
- Implement a way to extend the registries with custom logic (e.g., HOCs for all registered components).
- Write unit tests for each registry method.
- Consider implementing a type-safe way to ensure all required section and content block types are registered.

Remember to keep your utility functions simple, reusable, and well-documented. These registries will be crucial for the extensibility of your Page Data Framework.
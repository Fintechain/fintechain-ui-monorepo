# Content Blocks System Tutorial

## Table of Contents
1. [Introduction](#introduction)
2. [Core Concepts](#core-concepts)
3. [Block Types and Properties](#block-types-and-properties)
4. [Working with Content Blocks](#working-with-content-blocks)
5. [Styling System](#styling-system)
6. [State Management with Rematch](#state-management)
7. [Data Service and API Integration](#data-service)
8. [Utilities and Helpers](#utilities-and-helpers)
9. [Advanced Usage Patterns](#advanced-usage)
10. [Best Practices and Tips](#best-practices)

## 1. Introduction

The Content Blocks System is a TypeScript-based framework for building modular, type-safe content structures. It provides:

- Type-safe content blocks
- Flexible styling system
- State management
- API integration
- Utility functions
- Validation

### Setting Up

```typescript
// Install dependencies
npm install @rematch/core
// Your package name here
npm install @yourdomain/content-blocks

// Basic imports
import { ContentBlock, BlockType } from '@yourdomain/content-blocks';
import { contentBlockModel } from '@yourdomain/content-blocks/models';
import { APIContentBlockService } from '@yourdomain/content-blocks/services';
```

## 2. Core Concepts

### Block Structure

Every content block follows this structure:

```typescript
interface ContentBlock<T extends keyof BlockTypeProps> {
    id: ID;
    type: T;
    properties: BlockTypeProps[T];
    children?: ContentBlock[];
    style?: BlockStyle<T>;
    metadata?: Record<string, unknown>;
}

// Example usage
const headingBlock: ContentBlock<BlockType.Heading> = {
    id: 'heading-1',
    type: BlockType.Heading,
    properties: {
        text: 'Welcome',
        level: 1
    },
    style: {
        type: BlockType.Heading,
        common: {
            margin: { bottom: 4 }
        },
        specific: {
            fontSize: { base: '2xl', md: '4xl' },
            fontWeight: 'bold'
        }
    }
};
```

### Type Safety

The system uses TypeScript's type system to ensure type safety:

```typescript
// Type-safe property access
function processHeading(block: ContentBlock<BlockType.Heading>) {
    // TypeScript knows these properties exist
    const { text, level } = block.properties;
    
    // TypeScript knows about style properties
    const fontSize = block.style?.specific?.fontSize;
}

// This would cause a type error
const invalidHeading: ContentBlock<BlockType.Heading> = {
    id: '1',
    type: BlockType.Heading,
    properties: {
        text: 'Title',
        level: 7 // Error: must be 1-6
    }
};
```

## 3. Block Types and Properties

### Available Block Types

```typescript
// Container blocks
BlockType.Page
BlockType.Section
BlockType.Container
BlockType.Form

// Content blocks
BlockType.Heading
BlockType.Text
BlockType.Image
BlockType.Video
BlockType.Button

// Form blocks
BlockType.Input
BlockType.Select
BlockType.Checkbox

// Special blocks
BlockType.Hero
BlockType.Custom
```

### Working with Block Properties

```typescript
// Creating a page block
const page: ContentBlock<BlockType.Page> = {
    id: 'page-1',
    type: BlockType.Page,
    properties: {
        slug: 'home',
        locale: 'en',
        title: 'Home Page'
    },
    children: [
        {
            id: 'section-1',
            type: BlockType.Section,
            properties: {
                title: 'Welcome Section'
            },
            children: [
                {
                    id: 'heading-1',
                    type: BlockType.Heading,
                    properties: {
                        text: 'Welcome',
                        level: 1
                    }
                }
            ]
        }
    ]
};

// Using type guards
if (blockHelpers.isBlockType(block, BlockType.Heading)) {
    // TypeScript knows this is a heading block
    console.log(block.properties.text);
}
```

## 4. Working with Content Blocks

### Creating Blocks

```typescript
// Using block helpers
const heading = blockHelpers.createBlock(
    BlockType.Heading,
    {
        text: 'Welcome',
        level: 1
    },
    {
        id: 'custom-id',
        metadata: {
            author: 'John'
        }
    }
);

// Creating a block tree
const section = blockHelpers.createBlock(
    BlockType.Section,
    {
        title: 'Main Section'
    },
    {
        children: [heading]
    }
);
```

### Manipulating Block Trees

```typescript
// Extract all blocks from a tree
const allBlocks = blockUtils.extractAllBlocks(page);

// Find a specific block
const foundBlock = blockUtils.findBlockInTree(
    page,
    'heading-1'
);

// Update a block in the tree
const updatedTree = blockUtils.updateBlockInTree(
    page,
    updatedHeading
);

// Remove a block
const newTree = blockUtils.removeBlockFromTree(
    page,
    'block-to-remove'
);
```

## 5. State Management with Rematch

### Setting up the Store

```typescript
import { init } from '@rematch/core';
import { models } from './models';

const store = init({
    models
});

export type Store = typeof store;
export type Dispatch = typeof store.dispatch;
```

### Using the Content Block Model

```typescript
// Loading a page
dispatch.contentBlockModel.loadPage({
    slug: 'home',
    locale: 'en',
    service: contentBlockService
});

// Loading specific blocks
dispatch.contentBlockModel.loadBlocksByType({
    type: BlockType.Heading,
    params: {
        limit: 10,
        includeChildren: true
    },
    service: contentBlockService
});

// Updating a block
dispatch.contentBlockModel.updateBlock({
    id: 'block-1',
    data: {
        properties: {
            text: 'Updated Text'
        }
    },
    service: contentBlockService
});
```

### Accessing State

```typescript
// In a React component
function PageComponent() {
    const currentPage = useSelector(
        (state: RootState) => state.contentBlockModel.currentPage
    );
    const isLoading = useSelector(
        (state: RootState) => state.contentBlockModel.loading
    );
    
    // Access specific blocks
    const blocks = useSelector(
        (state: RootState) => state.contentBlockModel.blocks
    );
    
    // Get loading state for specific operation
    const pageLoading = useSelector(
        (state: RootState) => 
            state.contentBlockModel.loadingStates['page_home']
    );
}
```

## 6. Data Service Integration

### Setting up the Service

```typescript
const contentBlockService = new APIContentBlockService(
    'https://api.example.com',
    {
        headers: {
            'Authorization': 'Bearer token'
        }
    }
);
```

### Using the Service

```typescript
// Basic CRUD operations
const newBlock = await contentBlockService.create({
    type: BlockType.Text,
    properties: {
        content: 'Hello World',
        format: 'markdown'
    }
});

const block = await contentBlockService.read('block-1');

const updated = await contentBlockService.update('block-1', {
    properties: {
        content: 'Updated content'
    }
});

const deleted = await contentBlockService.delete('block-1');

// Advanced operations
const page = await contentBlockService.getPage('home', 'en');

const children = await contentBlockService.getChildren('parent-id', {
    depth: 2
});

const searchResults = await contentBlockService.search('query', {
    blockType: BlockType.Text,
    limit: 10
});

// Bulk operations
const createdBlocks = await contentBlockService.bulkCreate([
    /* block data */
]);

const updatedBlocks = await contentBlockService.bulkUpdate([
    /* block updates */
]);
```

## 7. Validation and Error Handling

### Block Validation

```typescript
// Validate a block
const isValid = validation.validateBlock(block);

// Detailed validation
const result = validateBlockWithDetails(block);
if (!result.valid && result.errors) {
    result.errors.forEach(error => {
        console.error(
            `Validation error for block ${error.blockId}: ${error.message}`
        );
    });
}

// Custom validation
function validateCustomBlock<T extends keyof BlockTypeProps>(
    block: ContentBlock<T>
): ValidationResult {
    const errors: ValidationError[] = [];
    
    // Add custom validation logic
    if (block.type === BlockType.Custom && !block.properties.componentName) {
        errors.push(
            new ValidationError(
                'Custom blocks must have a component name',
                block.id
            )
        );
    }
    
    return {
        valid: errors.length === 0,
        errors: errors.length > 0 ? errors : undefined
    };
}
```

## 8. Best Practices and Tips

1. **Type Safety**
   - Always use type guards when working with blocks
   - Let TypeScript infer types when possible
   - Use helper functions for type-safe operations

```typescript
// Good
if (blockHelpers.isBlockType(block, BlockType.Heading)) {
    console.log(block.properties.text);
}

// Bad
if (block.type === 'heading') {
    console.log((block as any).properties.text);
}
```

2. **State Management**
   - Keep blocks normalized in state
   - Use loading states for better UX
   - Handle errors appropriately

```typescript
// Good
const blocks = useSelector((state: RootState) => state.contentBlockModel.blocks);
const block = blocks[blockId];

// Bad
const block = useSelector((state: RootState) => 
    state.contentBlockModel.blocks.find(b => b.id === blockId)
);
```

3. **Performance**
   - Use memoization for expensive operations
   - Batch updates when possible
   - Implement pagination for large lists

```typescript
// Good
const memoizedBlocks = useMemo(() => 
    blockUtils.extractAllBlocks(page),
    [page]
);

// Use bulk operations
await contentBlockService.bulkUpdate(updatedBlocks);
```

4. **Error Handling**
   - Implement proper error boundaries
   - Use type-safe error handling
   - Provide meaningful error messages

```typescript
try {
    await dispatch.contentBlockModel.loadPage({
        slug,
        service: contentBlockService
    });
} catch (error) {
    if (error instanceof ValidationError) {
        // Handle validation errors
    } else {
        // Handle other errors
    }
}
```

# Content Blocks System Specification
## Part 1: Core Concepts and Type System

## Table of Contents
1. [Type System Foundation](#type-system-foundation)
2. [Block Architecture](#block-architecture)
3. [Generic Constraints and Type Safety](#generic-constraints)
4. [Type Guards and Type Narrowing](#type-guards)
5. [Advanced Type Features](#advanced-type-features)

## Type System Foundation

### Key Type Definitions

```typescript
// Base types
type ID = string | number;

// Block type enumeration
enum BlockType {
    Page = 'page',
    Section = 'section',
    // ... other types
}

// Type mapping for block properties
interface BlockTypeProps {
    [BlockType.Page]: {
        slug: string;
        locale: string;
        // ... page properties
    };
    // ... other block type properties
}
```

### Type Relationships

1. **Block Type to Properties Mapping**
```typescript
// Example of how BlockType maps to its properties
type PageProperties = BlockTypeProps[BlockType.Page];
// Results in: { slug: string; locale: string; title: string; description?: string; }

// Type-safe property access
const pageProps: PageProperties = {
    slug: 'home',
    locale: 'en',
    title: 'Home Page'
};
```

2. **Generic Block Types**
```typescript
// Generic constraint for block types
type BlockTypeKey = keyof BlockTypeProps;

// Generic block with specific type
interface ContentBlock<T extends BlockTypeKey> {
    type: T;
    properties: BlockTypeProps[T];
}

// Usage
const heading: ContentBlock<BlockType.Heading> = {
    type: BlockType.Heading,
    properties: {
        text: 'Title',
        level: 1
    }
};
```

## Block Architecture

### Base Block Structure

```typescript
interface BaseBlockProps<T extends keyof BlockTypeProps> {
    id: ID;
    type: T;
    children?: ContentBlock<keyof BlockTypeProps>[];
    style?: BlockStyle<T>;
    metadata?: Record<string, unknown>;
}

// Example usage with type inference
const baseBlock: BaseBlockProps<BlockType.Heading> = {
    id: '1',
    type: BlockType.Heading,
    metadata: {
        customData: 'value'
    }
};
```

### Block Composition

1. **Parent-Child Relationships**
```typescript
// Container block with children
const section: ContentBlock<BlockType.Section> = {
    id: '1',
    type: BlockType.Section,
    properties: {
        title: 'Section Title'
    },
    children: [
        {
            id: '2',
            type: BlockType.Heading,
            properties: {
                text: 'Heading',
                level: 2
            }
        },
        {
            id: '3',
            type: BlockType.Text,
            properties: {
                content: 'Content text',
                format: 'markdown'
            }
        }
    ]
};
```

2. **Nested Type Safety**
```typescript
// Type-safe children access
const processChildren = (block: ContentBlock<BlockType>) => {
    if (blockHelpers.hasChildren(block)) {
        block.children.forEach(child => {
            // TypeScript knows child is ContentBlock<keyof BlockTypeProps>
            switch (child.type) {
                case BlockType.Heading:
                    // TypeScript knows properties structure
                    console.log(child.properties.text);
                    break;
                case BlockType.Image:
                    console.log(child.properties.src);
                    break;
            }
        });
    }
};
```

## Generic Constraints and Type Safety

### Type Constraints

```typescript
// Constraint to block types
function createBlock<T extends keyof BlockTypeProps>(
    type: T,
    properties: BlockTypeProps[T]
): ContentBlock<T>;

// Constraint to specific block categories
type ContainerBlockType = BlockType.Page | BlockType.Section | BlockType.Form;
type ContentBlockType = BlockType.Heading | BlockType.Text | BlockType.Image;

function processContainer<T extends ContainerBlockType>(
    block: ContentBlock<T>
) {
    // Process container-specific logic
}
```

### Type Inference

```typescript
// Automatic type inference
const heading = blockHelpers.createBlock(BlockType.Heading, {
    text: 'Title',
    level: 1
});
// TypeScript infers: ContentBlock<BlockType.Heading>

// Generic helper with inferred return type
function getBlockProperties<T extends keyof BlockTypeProps>(
    block: ContentBlock<T>
): BlockTypeProps[T] {
    return block.properties;
}

const props = getBlockProperties(heading);
// TypeScript infers: { text: string; level: 1 | 2 | 3 | 4 | 5 | 6; }
```

## Type Guards and Type Narrowing

### Custom Type Guards

```typescript
// Type guard for specific block type
function isHeadingBlock(
    block: ContentBlock<keyof BlockTypeProps>
): block is ContentBlock<BlockType.Heading> {
    return block.type === BlockType.Heading;
}

// Usage with type narrowing
function processBlock(block: ContentBlock<keyof BlockTypeProps>) {
    if (isHeadingBlock(block)) {
        // TypeScript knows this is a heading block
        const level = block.properties.level;
        const text = block.properties.text;
    }
}
```

### Compound Type Guards

```typescript
// Combining type guards
const isTextBasedBlock = (
    block: ContentBlock<keyof BlockTypeProps>
): block is ContentBlock<BlockType.Heading | BlockType.Text> => {
    return block.type === BlockType.Heading || block.type === BlockType.Text;
};

// Usage with type narrowing
function processTextContent(block: ContentBlock<keyof BlockTypeProps>) {
    if (isTextBasedBlock(block)) {
        // Common processing for text-based blocks
        const content = block.type === BlockType.Heading 
            ? block.properties.text 
            : block.properties.content;
    }
}
```

## Advanced Type Features

### Mapped Types

```typescript
// Creating style variants for specific block types
type BlockVariants = {
    [K in BlockType]?: {
        variants: string[];
        defaultVariant: string;
    }
};

// Creating property validators
type PropertyValidators = {
    [K in keyof BlockTypeProps]: (
        properties: BlockTypeProps[K]
    ) => boolean;
};
```

### Conditional Types

```typescript
// Conditional type based on block type
type BlockStyle<T extends BlockType> = T extends keyof BlockSpecificStyles
    ? { specific: BlockSpecificStyles[T] }
    : { specific?: never };

// Utility type for block properties
type PropertiesOf<T extends BlockType> = T extends keyof BlockTypeProps
    ? BlockTypeProps[T]
    : never;
```

### Type Composition

```typescript
// Composing complex types
type BlockConfig<T extends BlockType> = {
    type: T;
    properties: PropertiesOf<T>;
    style?: BlockStyle<T>;
    validation?: PropertyValidators[T];
};

// Usage
const headingConfig: BlockConfig<BlockType.Heading> = {
    type: BlockType.Heading,
    properties: {
        text: 'Title',
        level: 1
    },
    style: {
        specific: {
            fontSize: 'xl',
            fontWeight: 'bold'
        }
    },
    validation: (props) => !!props.text && props.level >= 1 && props.level <= 6
};
```
# Content Blocks System Specification
## Part 2: Styling System and Validation

## Table of Contents
1. [Styling System Architecture](#styling-system-architecture)
2. [Working with Styles](#working-with-styles)
3. [Responsive Design](#responsive-design)
4. [Style Variants](#style-variants)
5. [Validation System](#validation-system)
6. [Advanced Validation Patterns](#advanced-validation-patterns)

## Styling System Architecture

### Core Style Types

```typescript
// Base style value types
type SpaceValue = 0 | 1 | 2 | 4 | 6 | 8 | 12 | 16 | 20 | 24 | 32 | 40 | 48;

// Responsive value configuration
type ResponsiveValue<T> = T | {
    base?: T;
    sm?: T;
    md?: T;
    lg?: T;
    xl?: T;
    "2xl"?: T;
};

// Spacing configuration
interface Spacing {
    top?: SpaceValue;
    right?: SpaceValue;
    bottom?: SpaceValue;
    left?: SpaceValue;
    x?: SpaceValue;
    y?: SpaceValue;
    all?: SpaceValue;
}

// Common styles available to all blocks
interface CommonStyles {
    margin?: ResponsiveValue<Spacing | SpaceValue>;
    padding?: ResponsiveValue<Spacing | SpaceValue>;
    width?: ResponsiveValue<'auto' | 'full' | '1/2' | '1/3' | '2/3'>;
    height?: ResponsiveValue<'auto' | 'full' | 'screen'>;
    display?: ResponsiveValue<'block' | 'inline' | 'flex' | 'grid' | 'none'>;
    background?: {
        color?: string;
        opacity?: number;
    };
    maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full' | 'none';
    className?: string;
}
```

### Block-Specific Styles

```typescript
// Style definitions for specific block types
type BlockSpecificStyles = {
    [BlockType.Heading]: {
        fontSize?: ResponsiveValue<'sm' | 'base' | 'lg' | 'xl' | '2xl'>;
        fontWeight?: 'normal' | 'medium' | 'semibold' | 'bold';
        lineHeight?: 'none' | 'tight' | 'normal' | 'relaxed';
        textAlign?: ResponsiveValue<'left' | 'center' | 'right'>;
    };
    
    [BlockType.Image]: {
        objectFit?: 'contain' | 'cover' | 'fill' | 'none';
        objectPosition?: 'center' | 'top' | 'bottom' | 'left' | 'right';
        rounded?: boolean | 'sm' | 'md' | 'lg' | 'full';
    };
    // ... other block-specific styles
};
```

## Working with Styles

### Creating and Applying Styles

```typescript
// Creating a style configuration
const headingStyle = styleHelpers.createStyle(BlockType.Heading, {
    common: {
        margin: { bottom: 4 },
        padding: { x: 4 },
        maxWidth: 'lg'
    },
    specific: {
        fontSize: { base: 'xl', md: '2xl' },
        fontWeight: 'bold',
        textAlign: { base: 'left', md: 'center' }
    },
    variant: {
        variant: 'primary'
    }
});

// Applying styles to a block
const styledHeading: ContentBlock<BlockType.Heading> = {
    id: '1',
    type: BlockType.Heading,
    properties: {
        text: 'Welcome',
        level: 1
    },
    style: headingStyle
};
```

### Style Composition

```typescript
// Base styles
const baseTextStyle = styleHelpers.createStyle(BlockType.Text, {
    common: {
        margin: { bottom: 2 }
    },
    specific: {
        fontSize: 'base',
        lineHeight: 'normal'
    }
});

// Extended styles
const highlightedTextStyle = styleHelpers.mergeStyles(
    baseTextStyle,
    {
        common: {
            background: {
                color: 'yellow',
                opacity: 0.3
            }
        },
        specific: {
            fontWeight: 'bold'
        }
    }
);
```

## Responsive Design

### Responsive Value Patterns

```typescript
// Creating responsive values
const responsiveStyles = {
    // Single value
    simple: styleHelpers.responsive('block'),
    
    // Breakpoint-specific values
    complex: {
        base: 'block',
        md: 'flex',
        lg: 'grid'
    } as ResponsiveValue<'block' | 'flex' | 'grid'>,
    
    // Responsive spacing
    margin: {
        base: { all: 2 },
        md: { x: 4, y: 2 },
        lg: { x: 6, y: 4 }
    } as ResponsiveValue<Spacing>
};

// Complex responsive layout
const responsiveLayout = styleHelpers.createStyle(BlockType.Container, {
    common: {
        display: { base: 'block', md: 'flex' },
        width: { base: 'full', lg: '2/3' },
        padding: {
            base: { all: 4 },
            md: { x: 6, y: 4 },
            lg: { x: 8, y: 6 }
        }
    }
});
```

## Style Variants

### Variant System

```typescript
// Variant definitions
type BlockStyleVariants = {
    [BlockType.Heading]: {
        variant?: 'primary' | 'secondary' | 'display';
    };
    [BlockType.Button]: {
        variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
        size?: 'sm' | 'md' | 'lg';
    };
};

// Creating variant-based styles
const buttonVariants = {
    primary: styleHelpers.createStyle(BlockType.Button, {
        common: {
            padding: { x: 4, y: 2 },
            background: { color: 'blue' }
        },
        variant: {
            variant: 'primary',
            size: 'md'
        }
    }),
    secondary: styleHelpers.createStyle(BlockType.Button, {
        common: {
            padding: { x: 4, y: 2 },
            background: { color: 'gray' }
        },
        variant: {
            variant: 'secondary',
            size: 'md'
        }
    })
};
```

## Validation System

### Property Validation

```typescript
// Basic property validation
const validateHeading = (
    properties: BlockTypeProps[BlockType.Heading]
): boolean => {
    return (
        typeof properties.text === 'string' &&
        properties.text.length > 0 &&
        properties.level >= 1 &&
        properties.level <= 6
    );
};

// Complex validation with multiple checks
const validateForm = (
    properties: BlockTypeProps[BlockType.Form]
): ValidationResult => {
    const errors: ValidationError[] = [];

    if (!properties.name) {
        errors.push(new ValidationError('Form name is required'));
    }

    if (properties.method && !['GET', 'POST'].includes(properties.method)) {
        errors.push(new ValidationError('Invalid form method'));
    }

    return {
        valid: errors.length === 0,
        errors: errors.length > 0 ? errors : undefined
    };
};
```

### Style Validation

```typescript
// Style value validation
const validateStyles = <T extends BlockType>(
    style: BlockStyle<T>
): ValidationResult => {
    const errors: ValidationError[] = [];

    // Validate common styles
    if (style.common) {
        if (style.common.maxWidth && 
            !VALID_MAX_WIDTHS.has(style.common.maxWidth)) {
            errors.push(new ValidationError('Invalid maxWidth value'));
        }
    }

    // Validate specific styles
    if (style.specific && styleGuards.hasSpecificStyles(style.type)) {
        switch (style.type) {
            case BlockType.Heading:
                const headingStyle = style.specific as BlockSpecificStyles[BlockType.Heading];
                if (headingStyle.fontSize && 
                    !styleValidation.isFontSize(headingStyle.fontSize)) {
                    errors.push(new ValidationError('Invalid fontSize'));
                }
                break;
            // ... other cases
        }
    }

    return {
        valid: errors.length === 0,
        errors: errors.length > 0 ? errors : undefined
    };
};
```

## Advanced Validation Patterns

### Recursive Validation

```typescript
// Validate entire block tree
const validateBlockTree = (
    block: ContentBlock<keyof BlockTypeProps>
): ValidationResult => {
    const errors: ValidationError[] = [];

    // Validate current block
    const blockResult = validateBlockWithDetails(block);
    if (!blockResult.valid && blockResult.errors) {
        errors.push(...blockResult.errors);
    }

    // Validate children recursively
    if (blockHelpers.hasChildren(block)) {
        block.children.forEach(child => {
            const childResult = validateBlockTree(child);
            if (!childResult.valid && childResult.errors) {
                errors.push(...childResult.errors);
            }
        });
    }

    return {
        valid: errors.length === 0,
        errors: errors.length > 0 ? errors : undefined
    };
};
```

### Validation with Context

```typescript
interface ValidationContext {
    parentType?: BlockType;
    depth: number;
    path: string[];
}

const validateWithContext = <T extends keyof BlockTypeProps>(
    block: ContentBlock<T>,
    context: ValidationContext
): ValidationResult => {
    const errors: ValidationError[] = [];

    // Validate based on context
    if (context.parentType === BlockType.Form) {
        // Validate form-specific rules
        if (![BlockType.Input, BlockType.Button].includes(block.type)) {
            errors.push(
                new ValidationError(
                    `Invalid block type ${block.type} inside form`,
                    block.id
                )
            );
        }
    }

    // Validate depth
    if (context.depth > 10) {
        errors.push(
            new ValidationError(
                'Block nesting too deep',
                block.id
            )
        );
    }

    return {
        valid: errors.length === 0,
        errors: errors.length > 0 ? errors : undefined
    };
};
```
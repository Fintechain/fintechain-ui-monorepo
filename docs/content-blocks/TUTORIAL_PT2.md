# Content Blocks System Advanced Tutorial

## Table of Contents
1. [Advanced Block Patterns](#advanced-block-patterns)
2. [Complex State Management](#complex-state-management)
3. [Performance Optimization](#performance-optimization)
4. [Advanced Block Tree Operations](#advanced-block-tree-operations)
5. [Custom Block Implementation](#custom-block-implementation)
6. [Integration Patterns](#integration-patterns)
7. [Testing Strategies](#testing-strategies)

## 1. Advanced Block Patterns

### Composite Blocks
Implementing complex nested structures:

```typescript
// Define a composite block type
interface CompositeBlock<T extends keyof BlockTypeProps> {
    main: ContentBlock<T>;
    sidebar?: ContentBlock<BlockType.Container>;
    footer?: ContentBlock<BlockType.Container>;
}

// Implementation
function createLayoutBlock(
    content: ContentBlock<keyof BlockTypeProps>,
    options: {
        withSidebar?: boolean;
        withFooter?: boolean;
    }
): ContentBlock<BlockType.Container> {
    const layout = blockHelpers.createBlock(
        BlockType.Container,
        {
            componentName: 'LayoutContainer',
            props: {
                layout: options.withSidebar ? 'with-sidebar' : 'full-width'
            }
        }
    );

    const mainSection = blockHelpers.createBlock(
        BlockType.Section,
        { title: 'Main Content' },
        { children: [content] }
    );

    const children: ContentBlock<keyof BlockTypeProps>[] = [mainSection];

    if (options.withSidebar) {
        const sidebar = blockHelpers.createBlock(
            BlockType.Container,
            {
                componentName: 'Sidebar',
                props: { width: 'sm' }
            }
        );
        children.push(sidebar);
    }

    if (options.withFooter) {
        const footer = blockHelpers.createBlock(
            BlockType.Container,
            {
                componentName: 'Footer',
                props: { sticky: true }
            }
        );
        children.push(footer);
    }

    return {
        ...layout,
        children
    };
}
```

### Dynamic Block Generation

```typescript
// Template-based block generation
interface BlockTemplate<T extends keyof BlockTypeProps> {
    type: T;
    baseProperties: Partial<BlockTypeProps[T]>;
    generateProperties: (data: any) => BlockTypeProps[T];
    style?: BlockStyle<T>;
}

class BlockGenerator {
    private templates: Map<string, BlockTemplate<any>> = new Map();

    registerTemplate<T extends keyof BlockTypeProps>(
        name: string,
        template: BlockTemplate<T>
    ) {
        this.templates.set(name, template);
    }

    generateBlock<T extends keyof BlockTypeProps>(
        templateName: string,
        data: any
    ): ContentBlock<T> {
        const template = this.templates.get(templateName) as BlockTemplate<T>;
        if (!template) {
            throw new Error(`Template ${templateName} not found`);
        }

        return blockHelpers.createBlock(
            template.type,
            {
                ...template.baseProperties,
                ...template.generateProperties(data)
            } as BlockTypeProps[T],
            { style: template.style }
        );
    }
}

// Usage
const generator = new BlockGenerator();

generator.registerTemplate('productCard', {
    type: BlockType.Container,
    baseProperties: {
        componentName: 'ProductCard',
        props: {
            variant: 'default'
        }
    },
    generateProperties: (product) => ({
        componentName: 'ProductCard',
        props: {
            title: product.name,
            price: product.price,
            image: product.imageUrl
        }
    }),
    style: {
        type: BlockType.Container,
        common: {
            padding: { all: 4 },
            margin: { bottom: 4 }
        }
    }
});
```

## 2. Complex State Management

### Advanced Selectors

```typescript
// Create typed selectors
const createBlockSelectors = <T extends keyof BlockTypeProps>(type: T) => ({
    selectByType: (state: RootState) => 
        Object.values(state.contentBlockModel.blocks)
            .filter((block): block is ContentBlock<T> => 
                block.type === type
            ),

    selectByProperty: (
        state: RootState,
        predicate: (props: BlockTypeProps[T]) => boolean
    ) =>
        Object.values(state.contentBlockModel.blocks)
            .filter((block): block is ContentBlock<T> => 
                block.type === type && predicate(block.properties)
            ),

    selectWithChildren: (state: RootState) =>
        Object.values(state.contentBlockModel.blocks)
            .filter((block): block is ContentBlock<T> => 
                block.type === type && blockHelpers.hasChildren(block)
            )
});

// Usage
const headingSelectors = createBlockSelectors(BlockType.Heading);

function HeadingsList() {
    const mainHeadings = useSelector((state) =>
        headingSelectors.selectByProperty(state, 
            props => props.level === 1
        )
    );

    return (
        <ul>
            {mainHeadings.map(heading => (
                <li key={heading.id}>{heading.properties.text}</li>
            ))}
        </ul>
    );
}
```

### State Persistence and Hydration

```typescript
// State persistence helpers
const stateHelpers = {
    serializeState: (state: ContentBlockState): string => {
        return JSON.stringify(state, (key, value) => {
            if (key === 'error' && value instanceof Error) {
                return {
                    _type: 'Error',
                    message: value.message,
                    stack: value.stack
                };
            }
            return value;
        });
    },

    deserializeState: (serialized: string): ContentBlockState => {
        return JSON.parse(serialized, (key, value) => {
            if (value && value._type === 'Error') {
                const error = new Error(value.message);
                error.stack = value.stack;
                return error;
            }
            return value;
        });
    },

    // Selective state persistence
    persistPartialState: (
        state: ContentBlockState,
        keys: (keyof ContentBlockState)[]
    ) => {
        const partial = keys.reduce((acc, key) => ({
            ...acc,
            [key]: state[key]
        }), {});
        return stateHelpers.serializeState(partial as ContentBlockState);
    }
};

// Usage with localStorage
const persistenceMiddleware = (store: Store) => (next: Dispatch) => (action: any) => {
    const result = next(action);
    const state = store.getState();
    
    localStorage.setItem(
        'contentBlocks',
        stateHelpers.persistPartialState(
            state.contentBlockModel,
            ['blocks', 'pages']
        )
    );
    
    return result;
};
```

## 3. Performance Optimization

### Block Tree Optimization

```typescript
// Memoized tree operations
const memoizedBlockUtils = {
    createBlockTreeCache: () => {
        const cache = new Map<string, ContentBlock<keyof BlockTypeProps>>();
        
        return {
            getBlock: (id: ID) => cache.get(id.toString()),
            setBlock: (block: ContentBlock<keyof BlockTypeProps>) => 
                cache.set(block.id.toString(), block),
            clearCache: () => cache.clear(),
            
            // Cached tree traversal
            findBlockInTree: (
                root: ContentBlock<keyof BlockTypeProps>,
                targetId: ID
            ) => {
                const cached = cache.get(targetId.toString());
                if (cached) return cached;

                const found = blockUtils.findBlockInTree(root, targetId);
                if (found) cache.set(targetId.toString(), found);
                
                return found;
            }
        };
    },

    // Optimized tree updates
    batchUpdateBlocks: (
        root: ContentBlock<keyof BlockTypeProps>,
        updates: Array<{
            id: ID;
            update: Partial<ContentBlock<keyof BlockTypeProps>>;
        }>
    ): ContentBlock<keyof BlockTypeProps> => {
        const updateMap = new Map(
            updates.map(update => [update.id.toString(), update.update])
        );

        return blockUtils.transformTree(root, (block) => {
            const update = updateMap.get(block.id.toString());
            if (!update) return block;

            return {
                ...block,
                ...update,
                properties: {
                    ...block.properties,
                    ...(update.properties || {})
                }
            };
        });
    }
};
```

### Virtual Rendering for Large Block Trees

```typescript
interface VirtualBlockNode {
    block: ContentBlock<keyof BlockTypeProps>;
    depth: number;
    isVisible: boolean;
    children: VirtualBlockNode[];
}

class VirtualBlockTree {
    private nodes: Map<ID, VirtualBlockNode> = new Map();
    private visibleNodes: Set<ID> = new Set();

    constructor(
        root: ContentBlock<keyof BlockTypeProps>,
        private viewport: { start: number; end: number }
    ) {
        this.buildTree(root);
    }

    private buildTree(
        block: ContentBlock<keyof BlockTypeProps>,
        depth = 0
    ): VirtualBlockNode {
        const node: VirtualBlockNode = {
            block,
            depth,
            isVisible: this.isNodeVisible(depth),
            children: []
        };

        if (blockHelpers.hasChildren(block)) {
            node.children = block.children.map(child =>
                this.buildTree(child, depth + 1)
            );
        }

        this.nodes.set(block.id, node);
        if (node.isVisible) {
            this.visibleNodes.add(block.id);
        }

        return node;
    }

    private isNodeVisible(depth: number): boolean {
        return depth >= this.viewport.start && depth <= this.viewport.end;
    }

    getVisibleBlocks(): ContentBlock<keyof BlockTypeProps>[] {
        return Array.from(this.visibleNodes)
            .map(id => this.nodes.get(id)!.block);
    }

    updateViewport(start: number, end: number) {
        this.viewport = { start, end };
        this.visibleNodes.clear();

        this.nodes.forEach((node, id) => {
            node.isVisible = this.isNodeVisible(node.depth);
            if (node.isVisible) {
                this.visibleNodes.add(id);
            }
        });
    }
}

// Usage in a React component
function VirtualBlockRenderer({
    root,
    windowSize = 5
}: {
    root: ContentBlock<keyof BlockTypeProps>;
    windowSize?: number;
}) {
    const [virtualTree] = useState(() => 
        new VirtualBlockTree(root, { start: 0, end: windowSize })
    );
    
    const [visibleBlocks, setVisibleBlocks] = useState(
        virtualTree.getVisibleBlocks()
    );

    const handleScroll = useCallback((scrollTop: number) => {
        const newStart = Math.floor(scrollTop / 50); // 50px per block
        virtualTree.updateViewport(newStart, newStart + windowSize);
        setVisibleBlocks(virtualTree.getVisibleBlocks());
    }, [virtualTree, windowSize]);

    return (
        <div onScroll={e => handleScroll(e.currentTarget.scrollTop)}>
            {visibleBlocks.map(block => (
                <BlockRenderer key={block.id} block={block} />
            ))}
        </div>
    );
}
```
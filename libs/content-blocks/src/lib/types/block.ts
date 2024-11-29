/**
 * Core domain model definitions for the content block system.
 * This file serves as the source of truth for our content structure
 * and should be independent of any persistence or framework concerns.
 */

/**
 * Defines all possible block types in the system.
 * Used to discriminate between different kinds of content blocks.
 */
export enum BlockType {
    // Structural blocks - used for content organization
    Page = 'page',
    Section = 'section',
    Container = 'container',
    
    // Content blocks - basic content elements
    Heading = 'heading',
    Paragraph = 'paragraph',
    Image = 'image',
    Video = 'video',
    
    // Interactive blocks - user input elements
    Form = 'form',
    Input = 'input',
    Select = 'select',
    Button = 'button',
    
    // Dynamic blocks - content generated at runtime
    DynamicList = 'dynamic-list',
    CustomComponent = 'custom-component'
}

/**
 * Maps block types to their specific property structures.
 * Provides type safety for block properties based on their type.
 */
export interface BlockTypeProps {
    [BlockType.Page]: {
        slug: string;
        locale: string;
        title: string;
        description?: string;
        status: 'draft' | 'published' | 'archived';
        publishedAt?: string;
        tags?: string[];
    };

    [BlockType.Section]: {
        identifier?: string;
        order: number;
    };

    [BlockType.Container]: {
        identifier?: string;
        order: number;
    };

    [BlockType.Heading]: {
        text: string;
        level: 1 | 2 | 3 | 4 | 5 | 6;
        identifier?: string;
    };

    [BlockType.Paragraph]: {
        content: string;
        format: 'plain' | 'markdown' | 'html';
    };

    [BlockType.Image]: {
        src: string;
        alt: string;
        caption?: string;
        dimensions: { width: number; height: number; };
        metadata?: {
            size: number;
            mimeType: string;
            originalName: string;
        };
    };

    [BlockType.Video]: {
        src: string;
        type: 'upload' | 'embed';
        poster?: string;
        metadata?: {
            duration: number;
            size?: number;
            provider?: string;
        };
    };

    [BlockType.Form]: {
        identifier: string;
        action: string;
        method: 'GET' | 'POST';
        fields: FormField[];
    };

    [BlockType.DynamicList]: {
        sourceType: 'api' | 'collection';
        source: string;
        filter?: Record<string, unknown>;
        limit?: number;
        template: BlockContent<keyof BlockTypeProps>;
    };

    [BlockType.CustomComponent]: {
        componentId: string;
        props: Record<string, unknown>;
    };
}

/**
 * Defines the structure of form fields for form blocks.
 * Includes validation and configuration options.
 */
export interface FormField {
    type: 'input' | 'select' | 'checkbox' | 'textarea';
    name: string;
    label: string;
    required: boolean;
    validation?: {
        type: 'string' | 'number' | 'email' | 'custom';
        pattern?: string;
        min?: number;
        max?: number;
        customValidation?: string;
    };
    defaultValue?: unknown;
}

/**
 * Core content block structure that represents any type of content block.
 * Uses generics to ensure type safety based on the block type.
 */
export interface BlockContent<T extends keyof BlockTypeProps> {
    /** Unique identifier for the block */
    id: string;
    
    /** Type discriminator for the block */
    type: T;
    
    /** Type-specific properties based on the block type */
    properties: BlockTypeProps[T];
    
    /** Optional child blocks for nested structures */
    children?: BlockContent<keyof BlockTypeProps>[];
    
    /** Optional parent reference for navigation */
    parent?: {
        id: string;
        type: keyof BlockTypeProps;
    };
    
    /** Metadata for tracking and management */
    metadata: {
        createdAt: string;
        updatedAt: string;
        createdBy: string;
        updatedBy: string;
        version: number;
        workspace: string;
        environment: 'draft' | 'published';
        tags?: string[];
        locale?: string;
    };
}

/**
 * Represents a reference to another block for content reuse.
 */
export interface BlockReference {
    id: string;
    type: 'reference' | 'copy';
    sourceId: string;
    sourceVersion: number;
    metadata: {
        createdAt: string;
        createdBy: string;
        workspace: string;
    };
}

/**
 * Represents a version of a content block for version control.
 */
export interface BlockVersion<T extends keyof BlockTypeProps> {
    blockId: string;
    version: number;
    content: BlockContent<T>;
    metadata: {
        createdAt: string;
        createdBy: string;
        comment?: string;
        workspace: string;
    };
}

/**
 * Query parameters for searching and filtering blocks.
 */
export interface BlockQuery {
    workspace: string;
    environment?: 'draft' | 'published';
    type?: BlockType[];
    tags?: string[];
    locale?: string;
    createdBy?: string;
    createdAfter?: string;
    createdBefore?: string;
    status?: 'draft' | 'published' | 'archived';
    fullText?: string;
    page?: number;
    limit?: number;
    sort?: {
        field: string;
        order: 'asc' | 'desc';
    };
}

/**
 * Standard response format for block operations.
 */
export interface BlockOperationResult<T extends keyof BlockTypeProps> {
    success: boolean;
    block?: BlockContent<T>;
    error?: {
        code: string;
        message: string;
        details?: unknown;
    };
}

/**
 * Response format for list operations with pagination.
 */
export interface BlockListResult {
    items: BlockContent<keyof BlockTypeProps>[];
    total: number;
    page: number;
    limit: number;
    hasMore: boolean;
}
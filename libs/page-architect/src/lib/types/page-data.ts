/**
 * coreTypes.ts
 * This file contains the core type definitions for the Page Data Framework.
 */

/** Unique identifier type used throughout the application */
export type ID = string;

export type HasID = { id: ID }

/** Represents the complete structure of a page */
export interface PageData {
    /** Unique identifier for the page */
    id: ID;
    /** URL-friendly string identifier for the page */
    slug: string;
    /** Main title of the page */
    title: string;
    /** Optional brief description of the page content */
    description?: string;
    /** Optional additional metadata for the page */
    metadata?: Record<string, any>;
    /** Array of sections that make up the page content */
    sections: Record<string, SectionData>;
    /** Language code for the page content */
    locale: string;
    /** Optional array of alternate language versions of the page */
    alternateLocales?: { locale: string; slug: string }[];
}

/** Represents a single section within a page */
export interface SectionData {
    /** Unique identifier for the section */
    id: ID;
    /** Type of the section, used for rendering decisions */
    type: string;
    /** Optional title for the section */
    title?: string;
    /** Optional subtitle for the section */
    subtitle?: string;
    /** Array of content blocks within the section */
    contentBlocks: Record<string, ContentBlock>;
    /** Styling information for the section */
    style: SectionStyle;
    /** Optional additional metadata for the section */
    metadata?: Record<string, any>;
}

/** Styling options for a section */
export interface SectionStyle {
    /** Type of background: 'image' or 'color' */
    backgroundType: 'image' | 'color';
    /** Value for the background, either a color or an image URL */
    backgroundValue: string;
    /** Optional overlay color */
    overlayColor?: string;
    /** Optional overlay opacity */
    overlayOpacity?: number;
    /** Optional CSS class name(s) for the section */
    className?: string;
    /** Optional CSS class name(s) for the content container */
    contentClassName?: string;
    /** Optional CSS class name(s) for the title */
    titleClassName?: string;
    /** Optional CSS class name(s) for the subtitle */
    subtitleClassName?: string;
}

/** Enum for different types of content blocks */
export enum ContentBlockType {
    Text = 'text',
    Image = 'image',
    Video = 'video',
    Custom = 'custom',
}

/** Base interface for all content block types */
export interface BaseContentBlock {
    /** Unique identifier for the content block */
    readonly id: ID;
    /** Type of the content block */
    readonly type: ContentBlockType;
    /** Optional additional metadata for the content block */
    metadata?: Record<string, any>;
}

/** Represents a text content block */
export interface TextBlock extends BaseContentBlock {
    type: ContentBlockType.Text;
    /** The text content */
    content: string;
    /** The format of the text content */
    format?: 'plain' | 'markdown' | 'html';
}

/** Represents an image content block */
export interface ImageBlock extends BaseContentBlock {
    type: ContentBlockType.Image;
    /** URL or path to the image */
    src: string;
    /** Alternative text for the image */
    alt: string;
    /** Optional caption for the image */
    caption?: string;
}

/** Represents a video content block */
export interface VideoBlock extends BaseContentBlock {
    type: ContentBlockType.Video;
    /** URL or path to the video */
    src: string;
    /** Optional URL or path to the video poster image */
    poster?: string;
    /** Optional caption for the video */
    caption?: string;
}

/** Represents a custom content block */
export interface CustomBlock extends BaseContentBlock {
    type: ContentBlockType.Custom;
    /** Custom content, can be of any type */
    content: any;
}

/** Union type representing all possible content block types */
export type ContentBlock = TextBlock | ImageBlock | VideoBlock | CustomBlock;

/** Represents the navigation structure for a page or the entire site */
export interface NavigationData {
    /** Optional array of navigation items for the header */
    header?: NavigationItem[];
    /** Optional array of navigation items for the footer */
    footer?: NavigationItem[];
    /** Optional array of navigation items for the sidebar */
    sidebar?: NavigationItem[];
}

/** Represents a single navigation item */
export interface NavigationItem {
    /** Unique identifier for the navigation item */
    id: ID;
    /** Display text for the navigation item */
    label: string;
    /** URL or path that the navigation item links to */
    url: string;
    /** Optional icon identifier or URL */
    icon?: string;
    /** Optional array of child navigation items for nested menus */
    children?: NavigationItem[];
}

/**
 * Type guard to check if a content block is a TextBlock
 * @param block - The content block to check
 * @returns True if the block is a TextBlock, false otherwise
 * 
 * @example
 * const block: ContentBlock = { id: '1', type: ContentBlockType.Text, content: 'Hello' };
 * if (isTextBlock(block)) {
 *   console.log(block.content); // TypeScript knows this is safe
 * }
 */
export function isTextBlock(block: ContentBlock): block is TextBlock {
    return block.type === ContentBlockType.Text;
}

/**
 * Type guard to check if a content block is an ImageBlock
 * @param block - The content block to check
 * @returns True if the block is an ImageBlock, false otherwise
 */
export function isImageBlock(block: ContentBlock): block is ImageBlock {
    return block.type === ContentBlockType.Image;
}

/**
 * Type guard to check if a content block is a VideoBlock
 * @param block - The content block to check
 * @returns True if the block is a VideoBlock, false otherwise
 */
export function isVideoBlock(block: ContentBlock): block is VideoBlock {
    return block.type === ContentBlockType.Video;
}

/**
 * Type guard to check if a content block is a CustomBlock
 * @param block - The content block to check
 * @returns True if the block is a CustomBlock, false otherwise
 */
export function isCustomBlock(block: ContentBlock): block is CustomBlock {
    return block.type === ContentBlockType.Custom;
}
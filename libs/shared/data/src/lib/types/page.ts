import { ID } from "./data";
import { SectionStyle } from "./styles";

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

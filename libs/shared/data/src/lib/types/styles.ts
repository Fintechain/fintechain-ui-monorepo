/**
 * Type definitions for CSS color values to ensure type safety and validation
 * @remarks These types provide template literal types for common CSS color formats
 */

/** Represents a hexadecimal color value (e.g., #FF0000, #00FF00) */
export type HexColor = `#${string}`;

/** 
 * Represents an RGBA color value with alpha channel
 * Format: rgba(0-255, 0-255, 0-255, 0-1)
 * @example rgba(255, 0, 0, 0.5)
 */
export type RGBAColor = `rgba(${number}, ${number}, ${number}, ${number})`;

/** 
 * Represents an RGB color value
 * Format: rgb(0-255, 0-255, 0-255)
 * @example rgb(255, 0, 0)
 */
export type RGBColor = `rgb(${number}, ${number}, ${number})`;

/** 
 * Union type for all supported color formats
 * Includes hex, rgba, rgb, and other valid CSS color values (like named colors)
 */
export type CSSColor = HexColor | RGBAColor | RGBColor | string;

/**
 * Configuration for overlay effects on backgrounds
 * Used to add color overlays with opacity and blend modes
 */
export interface OverlayConfig {
    /** Color to be used for the overlay */
    color: CSSColor;
    /** Opacity value between 0 and 1 */
    opacity: number;
    /** 
     * CSS blend mode for the overlay
     * Controls how the overlay color blends with the background
     * @default 'normal'
     */
    blendMode?: 'normal' | 'multiply' | 'screen' | 'overlay' | 'darken' | 'lighten';
}

/**
 * Defines the positioning of elements (like images or gradients)
 * Supports both absolute and relative positioning
 */
export interface ImagePosition {
    /** 
     * Horizontal position
     * Can be a keyword, percentage, or pixel value
     * @example 'center', '50%', '100px'
     */
    x: 'left' | 'center' | 'right' | `${number}%` | `${number}px`;

    /** 
     * Vertical position
     * Can be a keyword, percentage, or pixel value
     * @example 'center', '50%', '100px'
     */
    y: 'top' | 'center' | 'bottom' | `${number}%` | `${number}px`;
}

/**
 * Configuration for image-based backgrounds
 * Supports all standard CSS background-image properties
 */
export interface ImageBackground {
    /** Discriminator for the background type */
    type: 'image';
    /** URL or path to the image resource */
    url: string;
    /** 
     * How the image should be sized within its container
     * @default 'cover'
     */
    size?: 'cover' | 'contain' | 'auto' | `${number}%` | `${number}px`;
    /** 
     * How/if the image should repeat
     * @default 'no-repeat'
     */
    repeat?: 'no-repeat' | 'repeat' | 'repeat-x' | 'repeat-y';
    /** Position of the image within its container */
    position?: ImagePosition;
    /** 
     * How the image scrolls with the content
     * @default 'scroll'
     */
    attachment?: 'scroll' | 'fixed' | 'local';
}

/**
 * Represents a color stop in a gradient
 * Used in both linear and radial gradients
 */
export interface GradientStop {
    /** Color value for this stop */
    color: CSSColor;
    /** Position along the gradient as a percentage */
    position: `${number}%`;
}

/**
 * Configuration for linear gradient backgrounds
 * Creates a gradient that progresses in a straight line
 */
export interface LinearGradientBackground {
    /** Discriminator for the background type */
    type: 'linear-gradient';
    /** 
     * Direction of the gradient
     * Can be an angle in degrees or a keyword direction
     * @example 45, '45deg', 'to top'
     */
    angle?: number | `${number}deg` | 'to top' | 'to right' | 'to bottom' | 'to left';
    /** Array of color stops that define the gradient */
    stops: GradientStop[];
}

/**
 * Configuration for radial gradient backgrounds
 * Creates a gradient that radiates from a center point
 */
export interface RadialGradientBackground {
    /** Discriminator for the background type */
    type: 'radial-gradient';
    /** Shape of the gradient */
    shape?: 'circle' | 'ellipse';
    /** Center position of the gradient */
    position?: ImagePosition;
    /** Array of color stops that define the gradient */
    stops: GradientStop[];
}

/**
 * Configuration for solid color backgrounds
 * Simplest background type with just a single color
 */
export interface ColorBackground {
    /** Discriminator for the background type */
    type: 'color';
    /** Color value to use as background */
    color: CSSColor;
}

/**
 * Configuration for video backgrounds
 * Supports video elements as backgrounds with fallback
 */
export interface VideoBackground {
    /** Discriminator for the background type */
    type: 'video';
    /** URL or path to the video resource */
    url: string;
    /** Fallback image URL for when video cannot be played */
    fallbackImageUrl: string;
    /** 
     * Playback options for the video
     * Controls how the video behaves
     */
    playbackOptions?: {
        /** Whether the video should start playing automatically */
        autoplay?: boolean;
        /** Whether the video should loop when it ends */
        loop?: boolean;
        /** Whether the video should play without sound */
        muted?: boolean;
        /** Whether the video should play inline (especially important for mobile) */
        playsinline?: boolean;
    };
}

/**
 * Union type combining all possible background configurations
 * Includes an optional overlay that can be applied to any background type
 */
export type BackgroundConfig = (
    | ImageBackground
    | LinearGradientBackground
    | RadialGradientBackground
    | ColorBackground
    | VideoBackground
) & {
    /** Optional overlay configuration for the background */
    overlay?: OverlayConfig;
};

/**
 * Style configuration for a section
 * Defines how a section should be visually presented
 */
export interface SectionStyle {
    /** Background configuration for the section */
    background: BackgroundConfig;
    /** Optional CSS class names for the section's content container */
    contentClassName?: string;
    /** Optional CSS class names for the section's title */
    titleClassName?: string;
    /** Optional CSS class names for the section's subtitle */
    subtitleClassName?: string;
}
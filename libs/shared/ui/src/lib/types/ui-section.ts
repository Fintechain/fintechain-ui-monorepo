// Content-related export interfaces
export interface ContentBlock {
    id: string;
    type: 'text' | 'html' | 'image';
    content: string;
}

export interface UiSectionContent {
    id: string;
    title?: string;
    subtitle?: string;
    contentBlocks: Record<string, ContentBlock>;
}

// Style-related export interface
export interface UiSectionStyle {
    backgroundType: 'image' | 'color';
    backgroundValue: string;
    overlayColor?: string;
    overlayOpacity?: number;
    className?: string;
    contentClassName?: string;
    titleClassName?: string;
    subtitleClassName?: string;
}

// Combined data export interface
export interface UiSectionData {
    content: UiSectionContent;
    style: UiSectionStyle;
}
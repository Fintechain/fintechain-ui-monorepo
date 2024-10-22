// Basic types remain unchanged
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

export interface UiSectionData {
    id: string;
    content: UiSectionContent;
    style: UiSectionStyle;
}

// Navigation types
export interface NavItem {
    id: string;
    label: string;
    href: string;
    icon?: string;
}

export interface NavGroup {
    id: string;
    title: string;
    items: Record<string, NavItem>;
}

// Navigation section data with position type
export type NavigationType = 'header' | 'footer' | 'left-sidebar' | 'right-sidebar' | 'top-bar' | 'bottom-bar';

export interface NavigationSectionData extends UiSectionData {
    type: NavigationType;
    navItems: Record<string, NavItem | NavGroup>;
}

// Flexible page navigation
export interface PageNavigation {
    sections: Record<string, NavigationSectionData>;
}

// Page data structure
export interface PageData {
    id: string;
    title: string;
    description?: string;
    navigation: PageNavigation;
    sections: Record<string, UiSectionData>;
    sectionOrder: string[]; // Array of section IDs to maintain order
    meta?: Record<string, string>;
}

// Site structure
export interface SiteStructure {
    pages: Record<string, PageData>;
    globalNavigation?: PageNavigation;
}

// Type guard
export function isNavigationSection(section: UiSectionData | NavigationSectionData): section is NavigationSectionData {
    return 'type' in section && 'navItems' in section;
}
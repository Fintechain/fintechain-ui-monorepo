/** Unique identifier for navigation groups and items */
export type ID = string | number;

/** Represents a single navigation item in any navigation group */
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
    /** Optional metadata for item-specific data */
    metadata?: Record<string, unknown>;
}

/** Common navigation group types - extensible via string */
export type NavigationGroupType = 'header' | 'footer' | 'sidebar' | 'main' | 'mobile' | string;

/** Represents a group of navigation items */
export interface NavigationGroup {
    /** Unique identifier for the navigation group */
    id: ID;
    /** The type of navigation (header, footer, etc) */
    type: NavigationGroupType;
    /** A unique key for this specific navigation group */
    key: string;
    /** Display name for this navigation group */
    name: string;
    /** The navigation items in this group */
    items: NavigationItem[];
    /** Optional metadata for group-specific data */
    metadata?: Record<string, unknown>;
}

/** Complete navigation structure for a page or site */
export interface NavigationData {
    /** Quick lookup of navigation groups by their keys */
    navigationsByKey: Record<string, NavigationGroup>;
    /** Ordered array of navigation keys defining render sequence */
    navigationOrder: string[];
}
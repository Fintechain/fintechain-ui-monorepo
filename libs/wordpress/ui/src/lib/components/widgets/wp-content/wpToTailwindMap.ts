// Define a type for the mapping
export type WpToTailwindMap = {
    [key: string]: string;
  };
  
  const wpToTailwindMap: WpToTailwindMap = {
    // Layout and Alignment
    'alignfull': 'w-full',
    'alignwide': 'w-[calc(100%+4rem)] md:w-[calc(100%+8rem)] mx-auto',
    'aligncenter': 'mx-auto text-center',
    'alignleft': 'float-left mr-4 mb-4',
    'alignright': 'float-right ml-4 mb-4',
    
    // Typography
    'has-small-font-size': 'text-sm',
    'has-medium-font-size': 'text-base',
    'has-large-font-size': 'text-lg',
    'has-x-large-font-size': 'text-xl',
    'has-xx-large-font-size': 'text-2xl',
    'has-text-align-left': 'text-left',
    'has-text-align-center': 'text-center',
    'has-text-align-right': 'text-right',
    'has-text-align-justify': 'text-justify',
    
    // Colors (example, adjust based on your color palette)
    'has-base-color': 'text-gray-900',
    'has-base-2-color': 'text-gray-800',
    'has-contrast-color': 'text-white',
    'has-contrast-2-color': 'text-gray-200',
    'has-accent-color': 'text-blue-600',
    'has-base-background-color': 'bg-gray-900',
    'has-base-2-background-color': 'bg-gray-800',
    'has-contrast-background-color': 'bg-white',
    'has-contrast-2-background-color': 'bg-gray-200',
    'has-accent-background-color': 'bg-blue-600',
    
    // Spacing
    'has-global-padding': 'px-4 md:px-8',
    
    // Flex and Grid
    'is-layout-flex': 'flex',
    'is-layout-grid': 'grid',
    'is-nowrap': 'flex-nowrap',
    'is-content-justification-left': 'justify-start',
    'is-content-justification-center': 'justify-center',
    'is-content-justification-right': 'justify-end',
    'is-content-justification-space-between': 'justify-between',
    
    // Specific Block Types
    'wp-block-columns': 'flex flex-wrap md:flex-nowrap',
    'wp-block-column': 'w-full md:flex-1',
    'wp-block-group': 'group',
    'wp-block-image': 'mb-4',
    'wp-block-button': 'inline-block',
    'wp-block-button__link': 'px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700',
    'is-style-outline': 'border border-current bg-transparent',
    
    // Navigation
    'wp-block-navigation': 'flex space-x-4',
    'wp-block-navigation-item': 'relative',
    'wp-block-navigation-link': 'hover:text-blue-600',
    
    // Lists
    'is-style-default': 'list-disc list-inside',
    'is-style-checklist': 'list-none',
    
    // Misc
    'screen-reader-text': 'sr-only',
    'wp-block-separator': 'border-t border-gray-300 my-4',
    'is-style-rounded': 'rounded-lg',
    'has-drop-cap:not(:focus):first-letter': 'float-left text-6xl font-serif mr-3',
  };
  
  // Function to convert WordPress classes to Tailwind classes
  export function convertWpToTailwind(wpClasses: string): string {
    return wpClasses.split(' ')
      .map(cls => wpToTailwindMap[cls] || cls)
      .join(' ');
  }
  
  // Usage example
 /*  const wpClasses = "alignwide has-large-font-size has-text-align-center has-base-color has-contrast-background-color";
  const tailwindClasses = convertWpToTailwind(wpClasses);
  console.log(tailwindClasses); */
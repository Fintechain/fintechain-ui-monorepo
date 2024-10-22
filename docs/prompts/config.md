# Prompt: AppConfig for Page Data Framework

Set up the AppConfig file for the Page Data Framework. This configuration will centralize all application-wide settings, including environment-specific variables, feature flags, and other configurable options.

## Requirements:

1. Create a file named `appConfig.ts` in the `src/config` directory.
2. Define an interface for the configuration object.
3. Implement environment-specific configurations.
4. Use environment variables for sensitive or deployment-specific information.
5. Include feature flags for enabling/disabling specific functionality.
6. Provide default values and type checking for all configuration options.
7. Include comprehensive JSDoc comments for the configuration interface and object.

## Example Implementation:

```typescript
/**
 * Application configuration interface
 */
interface AppConfig {
  /** Current environment */
  env: 'development' | 'staging' | 'production';
  /** Feature flags */
  featureFlags: {
    /** Enable new navigation component */
    useNewNavigation: boolean;
    /** Enable comment functionality */
    enableComments: boolean;
  };
  /** API configuration */
  api: {
    /** Base URL for API requests */
    baseUrl: string;
    /** Timeout for API requests in milliseconds */
    timeout: number;
  };
  /** Cache configuration */
  cache: {
    /** Time-to-live for cached items in seconds */
    ttl: number;
    /** Maximum number of items to store in cache */
    maxSize: number;
  };
  /** Logging configuration */
  logging: {
    /** Minimum log level to record */
    level: 'debug' | 'info' | 'warn' | 'error';
  };
  /** Pagination configuration */
  pagination: {
    /** Default number of items per page */
    defaultPageSize: number;
    /** Maximum allowed page size */
    maxPageSize: number;
  };
}

/**
 * Environment-specific configurations
 */
const envConfigs: Record<AppConfig['env'], Partial<AppConfig>> = {
  development: {
    api: {
      baseUrl: 'http://localhost:3000/api',
    },
    logging: {
      level: 'debug',
    },
  },
  staging: {
    api: {
      baseUrl: 'https://staging-api.example.com',
    },
    logging: {
      level: 'info',
    },
  },
  production: {
    api: {
      baseUrl: 'https://api.example.com',
    },
    logging: {
      level: 'warn',
    },
  },
};

/**
 * Default configuration values
 */
const defaultConfig: AppConfig = {
  env: (process.env.NODE_ENV as AppConfig['env']) || 'development',
  featureFlags: {
    useNewNavigation: false,
    enableComments: true,
  },
  api: {
    baseUrl: 'http://localhost:3000/api',
    timeout: 10000,
  },
  cache: {
    ttl: 300,
    maxSize: 100,
  },
  logging: {
    level: 'info',
  },
  pagination: {
    defaultPageSize: 20,
    maxPageSize: 100,
  },
};

/**
 * Merged configuration with environment-specific overrides
 */
const config: AppConfig = {
  ...defaultConfig,
  ...envConfigs[defaultConfig.env],
  // Override with environment variables
  api: {
    ...defaultConfig.api,
    ...envConfigs[defaultConfig.env].api,
    baseUrl: process.env.API_BASE_URL || defaultConfig.api.baseUrl,
  },
  featureFlags: {
    ...defaultConfig.featureFlags,
    useNewNavigation: process.env.USE_NEW_NAVIGATION === 'true' || defaultConfig.featureFlags.useNewNavigation,
    enableComments: process.env.ENABLE_COMMENTS !== 'false' && defaultConfig.featureFlags.enableComments,
  },
};

export default config;
```

## Additional Guidelines:

- Use a library like `dotenv` to load environment variables from a `.env` file in development.
- Implement a validation function to ensure all required configuration values are present and of the correct type.
- Consider using a configuration management tool for more complex setups or when dealing with many environments.
- Implement a way to override configuration at runtime for testing purposes.
- Use constants for configuration keys to avoid typos and improve maintainability.
- Consider implementing a way to hot-reload configuration changes in development.
- Write unit tests to ensure the configuration is loaded correctly for different environments.

Remember to keep your configuration file clean, well-organized, and easy to maintain. It should serve as a single source of truth for all configurable aspects of your application.
import { Container, interfaces } from 'inversify';
import { Post } from "@fintechain-monorepo/wordpress-data";
import { ApiDataService, DataService, WordPressDataService, TYPES as sharedTypes } from "@fintechain-monorepo/shared-data";

export const API_KEY = 'your-api-key-if-needed';
export const API_BASE_URL = 'https://your-wordpress-site.com/wp-json/wp/v2/posts';


const TYPES = {
    ApiBaseUrl: Symbol.for("ApiBaseUrl"),
    ApiKey: Symbol.for("ApiKey"),
    ...sharedTypes,
};

const container = new Container();

container.bind<string>(TYPES.ApiBaseUrl).toConstantValue(API_BASE_URL);
container.bind<string>(TYPES.ApiKey).toConstantValue(API_KEY);

container.bind<DataService<Post>>(TYPES.WordPressDataService).toDynamicValue((context: interfaces.Context) => {
    const baseUrl = context.container.get<string>(TYPES.ApiBaseUrl);
    const apiKey = context.container.get<string>(TYPES.ApiKey);
    return new ApiDataService(baseUrl, apiKey);
});

container.bind<DataService<Post>>(TYPES.PageDataService).toDynamicValue((context: interfaces.Context) => {
    const baseUrl = context.container.get<string>(TYPES.ApiBaseUrl);
    const apiKey = context.container.get<string>(TYPES.ApiKey);
    return new WordPressDataService(baseUrl, apiKey);
});

export { container, TYPES };
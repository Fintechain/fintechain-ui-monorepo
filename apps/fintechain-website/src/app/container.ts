import { Container, interfaces } from 'inversify';
import { Post } from "@fintechain-monorepo/wordpress-data";
import { DataService, ApiDataService, PageData, WordPressDataService } from "@fintechain-monorepo/page-architect";
const TYPES = {
    WordPressService: Symbol.for("WordPressService"),
    ApiBaseUrl: Symbol.for("ApiBaseUrl"),
    ApiKey: Symbol.for("ApiKey"),
};

const container = new Container();

container.bind<string>(TYPES.ApiBaseUrl).toConstantValue('https://your-wordpress-site.com/wp-json/wp/v2/posts');
container.bind<string>(TYPES.ApiKey).toConstantValue('your-api-key-if-needed');

container.bind<DataService<Post>>(TYPES.WordPressService).toDynamicValue((context: interfaces.Context) => {
    const baseUrl = context.container.get<string>(TYPES.ApiBaseUrl);
    const apiKey = context.container.get<string>(TYPES.ApiKey);
    return new WordPressDataService(baseUrl, apiKey);
});


/* container.bind<DataService<PageData>>(TYPES.UserDataService).toDynamicValue((context: interfaces.Context) => {
    const baseUrl = context.container.get<string>(TYPES.ApiBaseUrl) + "/users";
    const apiKey = context.container.get<string>(TYPES.ApiKey);
    return new ApiDataService<PageData>(baseUrl, apiKey);
}); */
/* 
container.bind<DataService<Product>>(TYPES.ProductDataService).toDynamicValue((context: interfaces.Context) => {
    const baseUrl = context.container.get<string>(TYPES.ApiBaseUrl) + "/products";
    const apiKey = context.container.get<string>(TYPES.ApiKey);
    return new ApiDataService<Product>(baseUrl, apiKey);
}); */

export { container, TYPES };
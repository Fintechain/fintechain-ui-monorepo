import { Container, interfaces } from 'inversify';
import { Post, WordPressApiService } from "@fintechain-monorepo/wordpress-data";
import { DataService, ApiDataService, PageData } from "@fintechain-monorepo/page-architect";
const TYPES = {
    UserDataService: Symbol.for("UserDataService"),
    ProductDataService: Symbol.for("ProductDataService"),
    ApiBaseUrl: Symbol.for("ApiBaseUrl"),
    ApiKey: Symbol.for("ApiKey"),
    WordPressService: Symbol.for("WordPressService"),
    WP_API_URL: Symbol.for("WP_API_URL"),
    WP_API_KEY: Symbol.for("WP_API_KEY"),
};

const container = new Container();

container.bind<string>(TYPES.ApiBaseUrl).toConstantValue("https://api.example.com");
container.bind<string>(TYPES.ApiKey).toConstantValue("your-api-key-here");

container.bind<DataService<PageData>>(TYPES.UserDataService).toDynamicValue((context: interfaces.Context) => {
    const baseUrl = context.container.get<string>(TYPES.ApiBaseUrl) + "/users";
    const apiKey = context.container.get<string>(TYPES.ApiKey);
    return new ApiDataService<PageData>(baseUrl, apiKey);
});


container.bind<string>(TYPES.WP_API_URL).toConstantValue('https://your-wordpress-site.com/wp-json/wp/v2/posts');
container.bind<string>(TYPES.WP_API_KEY).toConstantValue('your-api-key-if-needed');

container.bind<DataService<Post>>(TYPES.WordPressService)
    .to(WordPressApiService)
    .inSingletonScope();


/* 
container.bind<DataService<Product>>(TYPES.ProductDataService).toDynamicValue((context: interfaces.Context) => {
    const baseUrl = context.container.get<string>(TYPES.ApiBaseUrl) + "/products";
    const apiKey = context.container.get<string>(TYPES.ApiKey);
    return new ApiDataService<Product>(baseUrl, apiKey);
}); */

export { container, TYPES };
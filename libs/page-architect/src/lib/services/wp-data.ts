import { injectable, inject } from "inversify";
import { ApiDataService, ID, ListParams, ListResult } from "@fintechain-monorepo/page-architect";

@injectable()
export class WordPressDataService extends ApiDataService<any> {
    constructor(
        @inject("ApiBaseUrl") protected baseUrl: string,
        @inject("ApiKey") protected apiKey: string = ''
    ) {
        super(baseUrl, apiKey);
    }

    // Override list to handle WordPress-specific pagination and _embed parameter
    async list(params: ListParams): Promise<ListResult<any>> {
        const queryParams = new URLSearchParams({
            page: params.page?.toString() || '1',
            per_page: params.limit?.toString() || '10',
            _embed: 'wp:featuredmedia', // Include featured media in response
            ...this.transformWordPressFilters(params.filter || {}),
        });

        const response = await this.fetchWithAuth(`${this.baseUrl}?${queryParams}`);
        const items = await response.json();

        return {
            items,
            total: parseInt(response.headers.get('X-WP-Total') || '0'),
            page: params.page || 1,
            limit: params.limit || 10
        };
    }

    // Override read to include _embed parameter
    async read(id: ID): Promise<any | null> {
        const response = await this.fetchWithAuth(
            `${this.baseUrl}/${id}?_embed=wp:featuredmedia`
        );
        if (response.status === 404) return null;
        return response.json();
    }

    private transformWordPressFilters(filters: Record<string, any>): Record<string, string> {
        const wpFilters: Record<string, any> = {};

        // Map filter parameters to WordPress query parameters
        if (filters.search) wpFilters.search = filters.search;
        if (filters.categories) wpFilters.categories = filters.categories;
        if (filters.tags) wpFilters.tags = filters.tags;
        if (filters.author) wpFilters.author = filters.author;
        if (filters.slug) wpFilters.slug = filters.slug;
        if (filters.status) wpFilters.status = filters.status;

        return wpFilters;
    }
}
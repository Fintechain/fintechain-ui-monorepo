import axios, { AxiosInstance, AxiosResponse } from 'axios';

// Import types (assuming they are defined in a separate file)
import {
    Post,
    Page,
    Category,
    Tag,
    Comment,
    CommentSubmission,
    User,
    Media,
    SearchResult,
    CustomPostType,
    Taxonomy,
    Term,
    PostQueryParams,
    PageQueryParams,
    CategoryQueryParams,
    TagQueryParams,
    CommentQueryParams,
    MediaQueryParams,
    SearchQueryParams,
    CustomPostTypeQueryParams,
    TermQueryParams
} from '../types';

class WpApiService {
    private api: AxiosInstance;

    constructor(baseURL: string) {
        this.api = axios.create({
            baseURL,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    private async get<T>(endpoint: string, params?: object): Promise<T> {
        try {
            const response: AxiosResponse<T> = await this.api.get(endpoint, { params });
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    private async post<T>(endpoint: string, data: object): Promise<T> {
        try {
            const response: AxiosResponse<T> = await this.api.post(endpoint, data);
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    private handleError(error: any): never {
        if (axios.isAxiosError(error)) {
            const errorMessage = error.response?.data?.message || error.message;
            throw new Error(`API Error: ${errorMessage}`);
        }
        throw error;
    }

    async getPosts(params?: PostQueryParams): Promise<Post[]> {
        return this.get<Post[]>('/wp/v2/posts', params);
    }

    async getPost(id: number): Promise<Post> {
        return this.get<Post>(`/wp/v2/posts/${id}`);
    }

    async getPages(params?: PageQueryParams): Promise<Page[]> {
        return this.get<Page[]>('/wp/v2/pages', params);
    }

    async getPage(id: number): Promise<Page> {
        return this.get<Page>(`/wp/v2/pages/${id}`);
    }

    async getCategories(params?: CategoryQueryParams): Promise<Category[]> {
        return this.get<Category[]>('/wp/v2/categories', params);
    }

    async getTags(params?: TagQueryParams): Promise<Tag[]> {
        return this.get<Tag[]>('/wp/v2/tags', params);
    }

    async getComments(postId: number, params?: CommentQueryParams): Promise<Comment[]> {
        return this.get<Comment[]>(`/wp/v2/comments`, { ...params, post: postId });
    }

    async submitComment(comment: CommentSubmission): Promise<Comment> {
        return this.post<Comment>('/wp/v2/comments', comment);
    }

    async getUser(id: number): Promise<User> {
        return this.get<User>(`/wp/v2/users/${id}`);
    }

    async getMedia(params?: MediaQueryParams): Promise<Media[]> {
        return this.get<Media[]>('/wp/v2/media', params);
    }

    async search(query: string, params?: SearchQueryParams): Promise<SearchResult[]> {
        return this.get<SearchResult[]>('/wp/v2/search', { ...params, search: query });
    }

    async getCustomPostTypes(type: string, params?: CustomPostTypeQueryParams): Promise<CustomPostType[]> {
        return this.get<CustomPostType[]>(`/wp/v2/${type}`, params);
    }

    async getTaxonomies(): Promise<Taxonomy[]> {
        return this.get<Taxonomy[]>('/wp/v2/taxonomies');
    }

    async getTerms(taxonomy: string, params?: TermQueryParams): Promise<Term[]> {
        return this.get<Term[]>(`/wp/v2/${taxonomy}`, params);
    }

    // Authentication method (example using JWT)
    setAuthToken(token: string): void {
        this.api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    // Method to clear authentication
    clearAuthToken(): void {
        delete this.api.defaults.headers.common['Authorization'];
    }
}

export default WpApiService;
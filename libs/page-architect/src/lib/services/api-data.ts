import { injectable, inject } from "inversify";
import { DataService, ListParams, ListResult } from "./data";
import { HasID, ID } from "../types";

@injectable()
export class ApiDataService<T extends HasID> implements DataService<T> {
    constructor(
        @inject("API_BASE_URL") protected baseUrl: string,
        @inject("API_KEY") protected apiKey: string
    ) {}

    protected async fetchWithAuth(url: string, options: RequestInit = {}): Promise<Response> {
        const headers = new Headers(options.headers || {});
        headers.set('Authorization', `Bearer ${this.apiKey}`);
        headers.set('Content-Type', 'application/json');

        const response = await fetch(url, {
            ...options,
            headers
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response;
    }

    async create(item: Omit<T, 'id'>): Promise<T> {
        const response = await this.fetchWithAuth(`${this.baseUrl}`, {
            method: 'POST',
            body: JSON.stringify(item)
        });
        return response.json();
    }

    async read(id: ID): Promise<T | null> {
        const response = await this.fetchWithAuth(`${this.baseUrl}/${id}`);
        if (response.status === 404) return null;
        return response.json();
    }

    async update(id: ID, item: Partial<T>): Promise<T> {
        const response = await this.fetchWithAuth(`${this.baseUrl}/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(item)
        });
        return response.json();
    }

    async delete(id: ID): Promise<boolean> {
        const response = await this.fetchWithAuth(`${this.baseUrl}/${id}`, { method: 'DELETE' });
        return response.ok;
    }

    async list(params: ListParams): Promise<ListResult<T>> {
        const queryParams = new URLSearchParams({
            page: params.page?.toString() || '1',
            limit: params.limit?.toString() || '10',
            ...params.filter,
        });
        const response = await this.fetchWithAuth(`${this.baseUrl}?${queryParams}`);
        return response.json();
    }
}
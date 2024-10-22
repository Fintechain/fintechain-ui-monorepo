import { injectable, inject } from "inversify";
import { HasID, ID } from "../types";

/**
 * Generic interface for CRUD operations on data of type T.
 * @template T The type of data this service handles.
 * @template ID The type of the unique identifier for the data (default: string).
 */
export interface DataService<T extends HasID> {
    create(item: Omit<T, 'id'>): Promise<T>;
    read(id: ID): Promise<T | null>;
    update(id: ID, item: Partial<T>): Promise<T>;
    delete(id: ID): Promise<boolean>;
    list(params: ListParams): Promise<ListResult<T>>;
}

export interface ListParams {
    page?: number;
    limit?: number;
    filter?: Record<string, any>;
}

export interface ListResult<T> {
    items: T[];
    total: number;
    page: number;
    limit: number;
}


@injectable()
export class MockDataService<T extends HasID> implements DataService<T> {
    private data: T[] = [];

    constructor(@inject("MOCK_DATA") initialData: T[]) {
        this.data = [...initialData];
    }

    async create(item: Omit<T, 'id'>): Promise<T> {
        const newItem = { ...item, id: Date.now().toString() } as T;
        this.data.push(newItem);
        return new Promise(resolve => setTimeout(() => resolve(newItem), 100));
    }

    async read(id: ID): Promise<T | null> {
        const item = this.data.find(i => i.id === id);
        return new Promise(resolve => setTimeout(() => resolve(item || null), 100));
    }

    async update(id: ID, item: Partial<T>): Promise<T> {
        const index = this.data.findIndex(i => i.id === id);
        if (index === -1) throw new Error('Item not found');
        this.data[index] = { ...this.data[index], ...item };
        return new Promise(resolve => setTimeout(() => resolve(this.data[index]), 100));
    }

    async delete(id: ID): Promise<boolean> {
        const index = this.data.findIndex(i => i.id === id);
        if (index !== -1) {
            this.data.splice(index, 1);
            return new Promise(resolve => setTimeout(() => resolve(true), 100));
        }
        return new Promise(resolve => setTimeout(() => resolve(false), 100));
    }

    async list(params: ListParams): Promise<ListResult<T>> {
        const { page = 1, limit = 10, filter = {} } = params;
        const filteredData = this.data.filter(item =>
            Object.entries(filter).every(([key, value]) => item[key as keyof T] === value)
        );
        const start = (page - 1) * limit;
        const end = start + limit;
        const items = filteredData.slice(start, end);
        return new Promise(resolve => setTimeout(() => resolve({
            items,
            total: filteredData.length,
            page,
            limit,
        }), 100));
    }
}
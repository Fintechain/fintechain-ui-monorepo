import { createModel } from '@rematch/core';
import { RootModel } from './models';
import { DataService, ListParams, ListResult } from '../services/data';
import { ID, HasID } from "../types";

/**
 * Interface defining the structure of the data state.
 */
export interface DataState<T extends HasID> {
    items: T[];
    currentItem: T | null;
    error: Error | null;
    listResult: ListResult<T> | null;
}

/**
 * Creates a generic data model for Rematch with CRUD operations.
 */
export const createDataModel = <T extends HasID>() => createModel<RootModel>()({
    state: {
        items: [],
        currentItem: null,
        error: null,
        listResult: null,
    } as DataState<T>,
    reducers: {
        setItems(state, payload: T[]) {
            return { ...state, items: payload, error: null };
        },
        setCurrentItem(state, payload: T | null) {
            return { ...state, currentItem: payload, error: null };
        },
        setError(state, payload: Error) {
            return { ...state, error: payload };
        },
        setListResult(state, payload: ListResult<T>) {
            return { ...state, listResult: payload, error: null };
        },
        updateItem(state, payload: T) {
            const index = state.items.findIndex(item => item.id === payload.id);
            if (index !== -1) {
                const newItems = [...state.items];
                newItems[index] = payload;
                return { ...state, items: newItems, currentItem: payload, error: null };
            }
            return state;
        },
        removeItem(state, id: ID) {
            return {
                ...state,
                items: state.items.filter(item => item.id !== id),
                currentItem: state.currentItem && state.currentItem.id === id ? null : state.currentItem,
                error: null,
            };
        },
        addItem(state, payload: T) {
            return { ...state, items: [...state.items, payload], currentItem: payload, error: null };
        },
    },
    effects: (dispatch) => ({
        async create(payload: { item: Omit<T, 'id'>, service: DataService<T> }, rootState) {
            try {
                const newItem = await payload.service.create(payload.item);
                dispatch.dataModel.addItem(newItem);
            } catch (error) {
                dispatch.dataModel.setError(error instanceof Error ? error : new Error('Unknown error occurred'));
            }
        },
        async read(payload: { id: ID, service: DataService<T> }) {
            try {
                const item = await payload.service.read(payload.id);
                dispatch.dataModel.setCurrentItem(item);
            } catch (error) {
                dispatch.dataModel.setError(error instanceof Error ? error : new Error('Unknown error occurred'));
            }
        },
        async update(payload: { id: ID, item: Partial<T>, service: DataService<T> }) {
            try {
                const updatedItem = await payload.service.update(payload.id, payload.item);
                dispatch.dataModel.updateItem(updatedItem);
            } catch (error) {
                dispatch.dataModel.setError(error instanceof Error ? error : new Error('Unknown error occurred'));
            }
        },
        async delete(payload: { id: ID, service: DataService<T> }) {
            try {
                const success = await payload.service.delete(payload.id);
                if (success) {
                    dispatch.dataModel.removeItem(payload.id);
                }
            } catch (error) {
                dispatch.dataModel.setError(error instanceof Error ? error : new Error('Unknown error occurred'));
            }
        },
        async list(payload: { params: ListParams, service: DataService<T> }) {
            try {
                const result = await payload.service.list(payload.params);
                dispatch.dataModel.setListResult(result);
                dispatch.dataModel.setItems(result.items);
            } catch (error) {
                dispatch.dataModel.setError(error instanceof Error ? error : new Error('Unknown error occurred'));
            }
        },
    }),
});

// Create and export a default instance of the data model
export const dataModel = createDataModel<{ id: string }>();
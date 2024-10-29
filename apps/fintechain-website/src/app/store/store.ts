import { init, RematchDispatch, RematchRootState } from '@rematch/core';
import loadingPlugin, { ExtraModelsFromLoading } from '@rematch/loading';
import persistPlugin from '@rematch/persist';
import storage from 'redux-persist/lib/storage';
import { models, RootModel } from './models';

/**
 * Configuration for the persist plugin.
 * Specifies which parts of the state to persist and where to store it.
 */
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['dataModel'], // Only persist the dataModel
};

/**
 * Type including the additional loading model
 */
export type FullModel = ExtraModelsFromLoading<RootModel>

/**
 * Initialize the Rematch store with plugins and models.
 */
export const store = init<RootModel, FullModel>({
    models,
    plugins: [
        loadingPlugin(),
        persistPlugin(persistConfig),
    ],
    redux: {
        middlewares: [
            // Add any additional middlewares here
        ],
        devtoolOptions: {
            disabled: process.env.NODE_ENV === 'production',
        },
    },
});

// Export types for use in components and hooks
export type Store = typeof store;
export type Dispatch = RematchDispatch<RootModel>;
export type RootState = RematchRootState<RootModel> & ExtraModelsFromLoading<RootModel>;

/**
 * Helper function to create a typed selector
 */
export function createSelector<TSelected>(selector: (state: RootState) => TSelected) {
    return selector;
}

/**
 * Helper function to create a typed dispatch
 */
export function createDispatch<TPayload>(dispatch: Dispatch) {
    return (action: string, payload: TPayload) => dispatch[action](payload);
}
/**
 * rootModel.ts
 * This file defines the root model for the Rematch store.
 */

import { Models } from '@rematch/core';
import { dataModel } from './data';

/**
 * RootModel interface combining all individual models
 */
export interface RootModel extends Models<RootModel> {
    data: typeof dataModel;
}

/**
 * Root model object combining all individual models
 */
export const models: RootModel = {
    data: dataModel,
};
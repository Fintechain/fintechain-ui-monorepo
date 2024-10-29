/**
 * rootModel.ts
 * This file defines the root model for the Rematch store.
 */

import { dataModel } from '@fintechain-monorepo/shared-data';
import { Models } from '@rematch/core';

/**
 * RootModel interface combining all individual models
 */
export interface RootModel extends Models<any> {
    data: typeof dataModel;
}

/**
 * Root model object combining all individual models
 */
export const models: RootModel = {
    data: dataModel,
};
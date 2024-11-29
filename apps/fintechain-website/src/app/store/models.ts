/**
 * rootModel.ts
 * This file defines the root model for the Rematch store.
 */

import { messageModel, tokenModel } from '@fintechain-monorepo/fintechain-website-data';
import { dataModel } from '@fintechain-monorepo/shared-data';
import { Models } from '@rematch/core';

/**
 * RootModel interface combining all individual models
 */
export interface RootModel extends Models<any> {
    data: typeof dataModel;
    token: typeof tokenModel;
    message: typeof messageModel
}

/**
 * Root model object combining all individual models
 */
export const models: RootModel = {
    data: dataModel,
    token: tokenModel,
    message: messageModel
};
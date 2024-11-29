import { Models } from '@rematch/core';
import { tokenModel } from './token';
import { messageModel } from './message';

export interface RootModel extends Models<RootModel> {
    token: typeof tokenModel;
    message: typeof messageModel;
}

export const models: RootModel = {
    token: tokenModel,
    message: messageModel
};
import { StateProvider } from "../types/stateProvider";
import { combineStateReducer } from "../utils/combineStateReducer.ts";
import type { State, Selector } from "./types.ts";

import {
  reduceRetrieveUserState,
  retrieveUserInitialState,
  createRetrieveUserSelector,
} from "./retrieveUser";

const initialState: State = {
  retrieveUser: retrieveUserInitialState,
};

const reduceState = combineStateReducer(initialState, {
  retrieveUser: reduceRetrieveUserState,
});

function createSelector(stateProvider: StateProvider): Selector {
  return {
    ...createRetrieveUserSelector(stateProvider),
  };
}

export {
  reduceState as reduceUserState,
  initialState as userInitialState,
  createSelector as createUserSelector,
  State as UserState,
  Selector as UserSelector,
};

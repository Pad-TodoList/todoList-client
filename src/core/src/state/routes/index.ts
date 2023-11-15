import { StateProvider } from "../types/stateProvider";
import { combineStateReducer } from "../utils/combineStateReducer.ts";
import type { State, Selector } from "./types.ts";

import {
  createRetrieveRoutesSelector,
  reduceRetrieveRoutesState,
  retrieveRoutesInitialState,
} from "./retrieveRoutes";

const initialState: State = {
  retrieveRoutes: retrieveRoutesInitialState,
};

const reduceState = combineStateReducer(initialState, {
  retrieveRoutes: reduceRetrieveRoutesState,
});

function createSelector(stateProvider: StateProvider): Selector {
  return {
    ...createRetrieveRoutesSelector(stateProvider),
  };
}

export {
  reduceState as reduceRoutesState,
  initialState as routesInitialState,
  createSelector as createRoutesSelector,
  State as RoutesState,
  Selector as RoutesSelector,
};

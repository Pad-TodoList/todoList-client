import { legacy_createStore as createStore, StoreEnhancer } from "redux";

import type { State } from "./types/state";
import type { Selector } from "./types/selector";
import { StateProvider } from "./types/stateProvider";
import { combineStateReducer } from "./utils/combineStateReducer";
import { reduceUserState, createUserSelector, userInitialState } from "./user";
import {
  reduceRoutesState,
  createRoutesSelector,
  routesInitialState,
} from "./routes";

const initialState: State = {
  user: userInitialState,
  routes: routesInitialState,
};

const reduceState = combineStateReducer(initialState, {
  user: reduceUserState,
  routes: reduceRoutesState,
});

function createSelector(stateProvider: StateProvider): Selector {
  return {
    ...createUserSelector(stateProvider),
    ...createRoutesSelector(stateProvider),
  };
}

function createState(middleware?: StoreEnhancer) {
  return createStore(reduceState, middleware);
}

export { createState, createSelector, State, Selector, initialState };

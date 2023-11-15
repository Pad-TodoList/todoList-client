import { Boundaries } from "@todo-list/core";
import { events } from "@todo-list/events";
import type { State, Selector } from "./types.ts";
import { createStateReducer } from "../../utils/createStateReducer.ts";
import { resetState } from "../../utils/resetState.ts";
import { createSelector } from "./selector.ts";

const initialState: State = [];

function handleRequest(
  state: State,
  _: Boundaries["retrieveRoutes"]["request"]
): State {
  return state;
}

function handleSuccess(
  state: State,
  _: Boundaries["retrieveRoutes"]["success"]
): State {
  return state;
}

function handleFailure(
  state: State,
  _: Boundaries["retrieveRoutes"]["failure"]
): State {
  return state;
}

const reduceState = resetState(
  initialState,
  createStateReducer(initialState, {
    [events.retrieveRoutesRequested]: handleRequest,
    [events.retrieveRoutesSucceeded]: handleSuccess,
    [events.retrieveRoutesFailed]: handleFailure,
  }),
  []
);

export {
  reduceState as reduceRetrieveRoutesState,
  initialState as retrieveRoutesInitialState,
  createSelector as createRetrieveRoutesSelector,
  State as RetrieveRoutesState,
  Selector as RetrieveRoutesSelector,
};

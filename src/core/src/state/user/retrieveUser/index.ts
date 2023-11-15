import { Boundaries } from "@todo-list/core";
import { events } from "@todo-list/events";
import { user } from "@todo-list/dto";
import type { State, Selector } from "./types.ts";
import { createStateReducer } from "../../utils/createStateReducer.ts";
import { resetState } from "../../utils/resetState.ts";
import { createSelector } from "./selector.ts";
import { setRequestStateToPending } from "../../utils/setRequestStateToPending.ts";
import { setRequestStateToSuccess } from "../../utils/setRequestStateToSuccess.ts";
import { setRequestStateToFailure } from "../../utils/setRequestStateToFailure.ts";

const initialState: State = [];

function handleRequest(
  state: State,
  tokens: Boundaries["retrieveUser"]["request"]
): State {
  const index = state.findIndex((item) => item.tokens.id === tokens.id);
  return index !== -1
    ? [
        ...state.slice(0, index),
        { ...state[index], request: setRequestStateToPending() },
        ...state.slice(index + 1),
      ]
    : [
        ...state,
        {
          user: { ...user, uuid: tokens.id },
          request: setRequestStateToPending(),
          tokens,
        },
      ];
}

function handleSuccess(
  state: State,

  user: Boundaries["retrieveUser"]["success"]
): State {
  const index = state.findIndex((res) => res.user.uuid === user.uuid);
  return index !== 1
    ? [
        ...state.slice(0, index),
        { ...state[index], request: setRequestStateToSuccess(), user },
      ]
    : [
        ...state,
        {
          user,
          request: setRequestStateToSuccess(),
          tokens: { id: "", accessToken: "" },
        },
      ];
}

function handleFailure(
  state: State,

  user: Boundaries["retrieveUser"]["failure"]
): State {
  const index = state.findIndex((res) => res.user.uuid === user.uuid);
  return index !== 1
    ? [
        ...state.slice(0, index),
        {
          ...state[index],
          request: setRequestStateToFailure(),
          user: { ...user, uuid: "-4°" },
        },
      ]
    : [
        ...state,
        {
          user: { ...user, uuid: "-4°" },
          request: setRequestStateToFailure(),
          tokens: { id: "", accessToken: "" },
        },
      ];
}

const reduceState = resetState(
  initialState,
  createStateReducer(initialState, {
    [events.retrieveUserRequested]: handleRequest,
    [events.retrieveUserSucceeded]: handleSuccess,
    [events.retrieveUserFailed]: handleFailure,
  }),
  []
);

export {
  reduceState as reduceRetrieveUserState,
  initialState as retrieveUserInitialState,
  createSelector as createRetrieveUserSelector,
  State as RetrieveUserState,
  Selector as RetrieveUserSelector,
};

import { user } from "@todo-list/dto";
import { StateProvider } from "../../types/stateProvider";
import { Selector } from "./types";

function createSelector(stateProvider: StateProvider): Selector {
  return {
    getUser(token) {
      const state = stateProvider
        .getState()
        .user.retrieveUser.find((res) => res.user.uuid === token.id);
      return state ? state.user : { uuid: token.id, ...user };
    },
    isUserRetrievalRequestFailure(_) {
      const state = stateProvider
        .getState()
        .user.retrieveUser.find((res) => res.user.uuid === "-4°");
      return state ? state.request.isFailure : false;
    },
    isUserRetrievalRequestPending(tokens) {
      const state = stateProvider
        .getState()
        .user.retrieveUser.find((res) => res.user.uuid === tokens.id);
      return state ? state.request.isPending : false;
    },
    isUserRetrievalRequestSuccess(tokens) {
      const state = stateProvider
        .getState()
        .user.retrieveUser.find((res) => res.user.uuid === tokens.id);
      return state ? state.request.isSuccessful : false;
    },
  };
}

export { createSelector };

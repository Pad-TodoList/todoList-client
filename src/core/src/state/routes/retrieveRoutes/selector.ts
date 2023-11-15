import { StateProvider } from "../../types/stateProvider";
import { Selector } from "./types";

function createSelector(stateProvider: StateProvider): Selector {
  return {
    getRoutes() {
      const state = stateProvider
        .getState()
        .routes.retrieveRoutes.find((res) => res.routes);
      return state ? state.routes : [];
    },
    isRoutesRetrievalRequestFailure() {
      const state = stateProvider
        .getState()
        .routes.retrieveRoutes.find((res) => res.routes);
      return state ? state.request.isFailure : false;
    },
    isRoutesRetrievalRequestPending() {
      const state = stateProvider
        .getState()
        .routes.retrieveRoutes.find((res) => res.routes);
      return state ? state.request.isPending : false;
    },
    isRoutesRetrievalRequestSuccess() {
      const state = stateProvider
        .getState()
        .routes.retrieveRoutes.find((res) => res.routes);
      return state ? state.request.isSuccessful : false;
    },
  };
}

export { createSelector };

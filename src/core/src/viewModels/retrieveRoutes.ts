import { useContext } from "react";
import { useSelector } from "react-redux";

import { Route } from "@todo-list/dto";
import { Boundaries } from "../core/main.ts";
import { CoreContext } from "./context.ts";

interface ViewModel {
  isRequestSuccess: boolean;
  isRequestFailure: boolean;
  isRequestPending: boolean;
  routes: Route[];
  retrieveRoutes(request: Boundaries["retrieveRoutes"]["request"]): void;
}

function useRouteRetrieval(): ViewModel {
  const { selector, core } = useContext(CoreContext);

  return {
    isRequestPending: useSelector(() =>
      selector.isRoutesRetrievalRequestPending()
    ),
    isRequestFailure: useSelector(() =>
      selector.isRoutesRetrievalRequestFailure()
    ),
    isRequestSuccess: useSelector(() =>
      selector.isRoutesRetrievalRequestSuccess()
    ),
    routes: useSelector(() => selector.getRoutes()),
    retrieveRoutes: core.retrieveRoutes,
  };
}

export { useRouteRetrieval };

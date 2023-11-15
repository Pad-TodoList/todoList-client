import { Route } from "@todo-list/dto";
import { RequestState } from "../../types/requestState";

type Request = {
  request: RequestState;
  routes: Route[];
};

type State = Request[];

interface Selector {
  isRoutesRetrievalRequestPending(): boolean;
  isRoutesRetrievalRequestSuccess(): boolean;
  isRoutesRetrievalRequestFailure(): boolean;
  getRoutes(): Route[];
}

export { State, Selector };

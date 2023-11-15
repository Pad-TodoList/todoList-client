import { RetrieveRoutesState, RetrieveRoutesSelector } from "./retrieveRoutes";

type State = {
  retrieveRoutes: RetrieveRoutesState;
};

interface Selector extends RetrieveRoutesSelector {}

export { State, Selector };

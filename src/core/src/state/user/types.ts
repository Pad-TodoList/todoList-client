import { RetrieveUserState, RetrieveUserSelector } from "./retrieveUser";

type State = {
  retrieveUser: RetrieveUserState;
};

interface Selector extends RetrieveUserSelector {}

export { State, Selector };

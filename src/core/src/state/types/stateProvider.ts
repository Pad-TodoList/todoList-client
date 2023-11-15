import { State } from "./state";

interface StateProvider {
  getState(): State;
}

export { StateProvider };

import { EventsMap, Event } from "../../events/main";
import { StateReducer } from "../types/stateReducer";

function resetState<State>(
  initialState: State,
  reduceState: StateReducer<State, Event>,
  on: (keyof EventsMap)[]
): StateReducer<State, Event> {
  return (state, message) =>
    !!on.find((useCase) => message.type === useCase)
      ? initialState
      : reduceState(state, message);
}

export { resetState };

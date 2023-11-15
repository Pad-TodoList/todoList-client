import { Event } from "@todo-list/events";
import { StateReducer } from "../types/stateReducer";

function getEntries<State>(map: {
  [K in keyof State]: StateReducer<State[K], Event>;
}): [keyof State, StateReducer<State[keyof State], Event>][] {
  return Object.entries(map) as [
    keyof State,
    StateReducer<State[keyof State], Event>
  ][];
}

function combineStateReducer<State>(
  initialState: State,
  map: { [Key in keyof State]: StateReducer<State[Key], Event> }
): StateReducer<State, Event> {
  return (state = initialState, Event) =>
    getEntries(map).reduce(
      (nextState, [key, reduceState]) => ({
        ...nextState,
        [key]: reduceState(state[key], Event),
      }),
      state
    );
}

export { combineStateReducer };

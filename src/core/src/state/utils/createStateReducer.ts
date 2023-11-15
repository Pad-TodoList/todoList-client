import type { Event } from "@todo-list/events";
import { StateReducer } from "../types/stateReducer";

type SimplifiedStateReducer<State, M extends Event> = (
  state: State,
  data: M["data"]
) => State;

type ExtractEvent<Event, Type> = Event extends { type: Type } ? Event : never;

function createStateReducer<State, Type extends Event["type"] = Event["type"]>(
  initialState: State,
  map: {
    [Key in Type]?: SimplifiedStateReducer<State, ExtractEvent<Event, Key>>;
  }
): StateReducer<State, Event> {
  return (state = initialState, Event) =>
    // @ts-ignore
    Event.type in map ? map[Event.type](state, Event.data) : state;
}

export { createStateReducer };

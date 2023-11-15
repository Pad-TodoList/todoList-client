import { Event } from "@todo-list/events";

type StateReducer<State, M extends Event> = (
  state: State | undefined,
  message: M
) => State;

export { StateReducer };

import { Boundaries, UseCases } from "../core/main";
import {
  NotificationsEvents,
  NotificationsEvent,
  NotificationsEventDispatcher,
} from "./notifications";

enum RequestStates {
  request = "requested",
  success = "succeeded",
  failure = "failed",
}

type Events = `${UseCases}${Capitalize<RequestStates>}`;

type EventsMap = {
  [K in Events]: K;
} & { [K in NotificationsEvents]: K };

type CoreEvent<
  U extends keyof Boundaries = UseCases,
  Key = UseCases
> = Key extends U
  ?
      | {
          type: `${Key}Requested`;
          data: Boundaries[Key]["request"];
        }
      | {
          type: `${Key}Succeeded`;
          data: Boundaries[Key]["success"];
        }
      | {
          type: `${Key}Failed`;
          data: Boundaries[Key]["failure"];
        }
  : never;

type Event = CoreEvent | NotificationsEvent;

type CoreEventDispatcher<
  U extends keyof Boundaries = UseCases,
  Key = UseCases
> = Key extends U
  ? {
      [K in `dispatch${Capitalize<Key>}Request`]: (
        data: Boundaries[Key]["request"]
      ) => void;
    } & {
      [K in `dispatch${Capitalize<Key>}Success`]: (
        data: Boundaries[Key]["success"]
      ) => void;
    } & {
      [K in `dispatch${Capitalize<Key>}Failure`]: (
        data: Boundaries[Key]["failure"]
      ) => void;
    }
  : never;

type EventDispatcher = CoreEventDispatcher | NotificationsEventDispatcher;

interface EventBroker {
  sendEvent(event: Event): void;
}

export { Event, EventDispatcher, EventBroker, EventsMap };

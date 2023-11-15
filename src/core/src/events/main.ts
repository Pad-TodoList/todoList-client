import { UseCases } from "../core/main";
import {
  NotificationsEvents,
  createNotificationsEventDispatcher,
} from "./notifications";
import type { Event, EventDispatcher, EventBroker, EventsMap } from "./types";

const events: EventsMap = {
  ...Object.values(UseCases).reduce(
    (types, useCase) => ({
      ...types,
      [`${useCase}Requested`]: `${useCase}Requested`,
      [`${useCase}Succeeded`]: `${useCase}Succeeded`,
      [`${useCase}Failed`]: `${useCase}Failed`,
    }),
    {} as EventsMap
  ),
  ...NotificationsEvents,
};

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function createEventDispatcher(broker: EventBroker): EventDispatcher {
  return Object.values(UseCases).reduce<EventDispatcher>(
    (dispatcher, useCase) => ({
      ...dispatcher,
      [`dispatch${capitalize(useCase)}Request`]: (data: any) =>
        broker.sendEvent({ type: `${useCase}Requested`, data } as any),
      [`dispatch${capitalize(useCase)}Success`]: (data: any) =>
        broker.sendEvent({ type: `${useCase}Succeeded`, data } as any),
      [`dispatch${capitalize(useCase)}Failure`]: (data: any) =>
        broker.sendEvent({ type: `${useCase}Failed`, data } as any),
    }),
    createNotificationsEventDispatcher(broker) as EventDispatcher
  );
}

export {
  events,
  createEventDispatcher,
  Event,
  EventDispatcher,
  EventBroker,
  EventsMap,
};

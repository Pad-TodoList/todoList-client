import { EventBroker } from "./types";

enum NotificationsEvents {
  notificationDismissed = "notificationDismissed",
}

type NotificationsEvent = {
  type: NotificationsEvents.notificationDismissed;
  data: string;
};

interface NotificationsEventDispatcher {
  dispatchNotificationDismissal(key: string): void;
}

function createNotificationsEventDispatcher(
  broker: EventBroker
): NotificationsEventDispatcher {
  return {
    dispatchNotificationDismissal: (key) =>
      broker.sendEvent({
        type: NotificationsEvents.notificationDismissed,
        data: key,
      }),
  };
}

export {
  NotificationsEvents,
  NotificationsEvent,
  NotificationsEventDispatcher,
  createNotificationsEventDispatcher,
};

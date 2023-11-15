import { createContext } from "react";

import { Selector } from "@todo-list/state";
import { Core } from "../core/main.ts";
import { EventDispatcher } from "../events/types.ts";

const CoreContext = createContext<{
  core: Core;
  selector: Selector;
  eventDispatcher: EventDispatcher;
}>({
  core: {},
  eventDispatcher: {},
  selector: {},
} as {
  core: Core;
  selector: Selector;
  eventDispatcher: EventDispatcher;
});

export { CoreContext };

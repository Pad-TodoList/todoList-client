import { routeStatus, RouteStatus } from "./routeStatus.ts";

type Route = {
  description: string;
  status: RouteStatus;
};

const route: Route = {
  description: "",
  status: routeStatus,
};

export { Route, route };

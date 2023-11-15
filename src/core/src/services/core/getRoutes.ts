import { Route } from "@todo-list/dto";
import { RouteStatus } from "@todo-list/dto";

import { HttpClient, HttpMethods } from "../types/httpClient";

function getRoutes(httpClient: HttpClient) {
  return () =>
    httpClient
      .sendHttpRequest<any>({
        endpoint: `/about.json`,
        method: HttpMethods.GET,
      })
      .then((response) => {
        const serverRoutes: Route[] = response.map((item: any) => {
          const routeStatus: RouteStatus = {
            path: item.status.path,
            state: item.status.status,
          };

          const route: Route = {
            description: item.name,
            status: routeStatus,
          };

          return route;
        });
        return serverRoutes;
      })
      .catch((e) => Promise.reject({ message: e || "" }));
}

export { getRoutes };

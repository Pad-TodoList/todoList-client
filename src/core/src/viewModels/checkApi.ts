import { useState } from "react";
import { clientHttp, RequestMethods } from "@todo-list/utils/clientHttp.ts";
import { Route } from "../dto/route.ts";
import { RouteStatus } from "@todo-list/dto";

interface ViewModel {
  isRequestSuccess: boolean;
  isRequestPending: boolean;
  isRequestFailure: { status: boolean; message: string };
  routes: Route[];
  checkApi(): void;
}

function useCheckApi(): ViewModel {
  const [isRequestSuccess, setIsRequestSuccess] = useState(false);
  const [isRequestFailure, setIsRequestFailure] = useState({
    status: false,
    message: "",
  });
  const [isRequestPending, setIsRequestPending] = useState(false);
  const [routes, setRoutes] = useState<Route[]>([]);

  return {
    isRequestFailure: isRequestFailure,
    isRequestPending: isRequestPending,
    isRequestSuccess: isRequestSuccess,
    routes: routes,
    checkApi() {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      setIsRequestSuccess(false);
      setIsRequestFailure({ status: false, message: "" });
      setIsRequestPending(true);

      clientHttp("/about.json", RequestMethods.GET, config.headers)
        .then((response) => {
          const serverRoutes: Route[] = response.data.map((item: any) => {
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
          setRoutes(serverRoutes);
          setIsRequestSuccess(true);
          setIsRequestFailure({ status: false, message: "" });
          setIsRequestPending(false);
        })
        .catch((error) => {
          setIsRequestSuccess(false);
          setIsRequestFailure({ status: true, message: error.message });
          setIsRequestPending(false);
        });
    },
  };
}

export { useCheckApi };

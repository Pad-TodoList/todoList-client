import { Repository } from "./adapters/repository";

import {
  createRetrieveRoutesInteractor,
  RetrieveRoutesInteractor,
} from "./useCases/retrieveRoutes";

enum RoutesUseCases {
  retrieveRoutes = "retrieveRoutes",
}

interface RoutesCore {
  [RoutesUseCases.retrieveRoutes]: RetrieveRoutesInteractor;
}

type RoutesBoundaries = BoundaryMap<RoutesCore>;

type RoutesDependencies = {
  repository: Repository;
};

function createRouteCore({ repository }: RoutesDependencies) {
  return {
    [RoutesUseCases.retrieveRoutes]: createRetrieveRoutesInteractor(repository),
  };
}

export {
  RoutesUseCases,
  createRouteCore,
  RoutesCore,
  RoutesBoundaries,
  RoutesDependencies,
};

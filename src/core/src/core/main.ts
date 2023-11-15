import {
  createUserCore,
  UserUseCases,
  UserCore,
  UserBoundaries,
  UserDependencies,
} from "./user";
import {
  createRouteCore,
  RoutesBoundaries,
  RoutesCore,
  RoutesDependencies,
  RoutesUseCases,
} from "./route";

const UseCases = {
  ...UserUseCases,
  ...RoutesUseCases,
};

type UseCases = UserUseCases & RoutesUseCases;

type Boundaries = UserBoundaries & RoutesBoundaries;

type Core = UserCore & RoutesCore;

type Dependencies = UserDependencies & RoutesDependencies;
function createCore(dependencies: Dependencies): Core {
  return {
    ...createUserCore(dependencies),
    ...createRouteCore(dependencies),
  };
}

export { createCore, Core, Boundaries, UseCases, Dependencies };

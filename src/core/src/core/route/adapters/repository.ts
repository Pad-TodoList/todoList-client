import { Route } from "@todo-list/dto";

interface Repository {
  getRoutes(): Promise<Route[]>;
}

export { Repository };

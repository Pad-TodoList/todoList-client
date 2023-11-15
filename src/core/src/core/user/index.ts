import { Repository } from "./adapters/repository";

import {
  createRetrieveUserInteractor,
  RetrieveUserInteractor,
} from "./useCases/retrieveUser";

enum UserUseCases {
  retrieveUser = "retrieveUser",
}

interface UserCore {
  [UserUseCases.retrieveUser]: RetrieveUserInteractor;
}

type UserBoundaries = BoundaryMap<UserCore>;

type UserDependencies = {
  repository: Repository;
};

function createUserCore({ repository }: UserDependencies) {
  return {
    [UserUseCases.retrieveUser]: createRetrieveUserInteractor(repository),
  };
}

export {
  UserUseCases,
  createUserCore,
  UserCore,
  UserBoundaries,
  UserDependencies,
};

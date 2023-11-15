import { Repository } from "../../adapters/repository";
import type { RetrieveUserInteractor } from "./types";
import { present } from "../../../utils/presenter";

function createRetrieveUserInteractor(
  repository: Repository
): RetrieveUserInteractor {
  return (tokens) =>
    present(
      repository
        .getUser(tokens)
        .then((user) => user)
        .catch((error) => Promise.reject({ error, tokens }))
    );
}

export { createRetrieveUserInteractor, RetrieveUserInteractor };

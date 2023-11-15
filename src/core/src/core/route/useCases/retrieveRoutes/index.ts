import { Repository } from "../../adapters/repository";
import type { RetrieveRoutesInteractor } from "./types";
import { present } from "../../../utils/presenter";

function createRetrieveRoutesInteractor(
  repository: Repository
): RetrieveRoutesInteractor {
  return () =>
    present(
      repository
        .getRoutes()
        .then((routes) => routes)
        .catch((error) => Promise.reject({ error }))
    );
}

export { createRetrieveRoutesInteractor, RetrieveRoutesInteractor };

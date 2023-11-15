import { Route } from "@todo-list/dto";

type RetrieveRoutesRequest = void;
type RetrieveRoutesSuccess = Route[];
type RetrieveRoutesFailure = Route[];

type RetrieveRoutesInteractor = Interactor<
  RetrieveRoutesRequest,
  RetrieveRoutesSuccess,
  RetrieveRoutesFailure
>;

export type { RetrieveRoutesInteractor };

type Notify<Data> = (data: Data) => void;

interface Presenter<Success, Error> {
  presentSuccess(notify: Notify<Success>): Presenter<Success, Error>;
  presentFailure(notify: Notify<Error>): Presenter<Success, Error>;
}

type Interactor<Request, Success, Failure> = (
  request: Request
) => Presenter<Success, Failure>;

type Boundary<I> = I extends Interactor<
  infer Request,
  infer Response,
  infer Error
>
  ? { request: Request; success: Response; failure: Error }
  : never;

type BoundaryMap<Core> = {
  [K in keyof Core]: Boundary<Core[K]>;
};

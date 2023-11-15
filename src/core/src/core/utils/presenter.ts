class Presentable<Success, Error> implements Presenter<Success, Error> {
  successSubscriber: Notify<Success> = () => {};
  failureSubscriber: Notify<Error> = () => {};

  presentSuccess(notify: Notify<Success>) {
    this.successSubscriber = notify;

    return this;
  }

  presentFailure(notify: Notify<Error>) {
    this.failureSubscriber = notify;

    return this;
  }

  notifySuccess(data: Success) {
    this.successSubscriber(data);
  }

  notifyFailure(error: Error) {
    this.failureSubscriber(error);
  }
}

function present<Success, Error>(
  promise: Promise<Success>
): Presenter<Success, Error> {
  const presenter = new Presentable<Success, Error>();

  promise
    .then((data) => presenter.notifySuccess(data))
    .catch((err) => presenter.notifyFailure(err));

  return presenter;
}

export { present };

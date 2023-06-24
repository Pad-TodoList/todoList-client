import { Core, UseCases } from "../../todoList-client-core/src/core/main";
import { EventDispatcher } from "../../todoList-client-core/src/events/main";

function capitalize(str: string): Capitalize<keyof typeof UseCases> {
  return (str.charAt(0).toUpperCase() + str.slice(1)) as Capitalize<
    keyof typeof UseCases
  >;
}

function decoratePresenter(dispatcher: EventDispatcher) {
  return (core: Core): Core =>
    Object.entries(core).reduce<Core>(
      (decoratedCore, [useCase, interactor]) => ({
        ...decoratedCore,
        [useCase]: (request: any) => {
          const capitalizedUseCase = capitalize(useCase);
          dispatcher[
            `dispatch${capitalizedUseCase}Request` as keyof EventDispatcher
          ](request);

          interactor(request)
            .presentSuccess(
              dispatcher[
                `dispatch${capitalizedUseCase}Success` as keyof EventDispatcher
              ]
            )
            .presentFailure(
              dispatcher[
                `dispatch${capitalizedUseCase}Failure` as keyof EventDispatcher
              ]
            );
        },
      }),
      core
    );
}

export { decoratePresenter };

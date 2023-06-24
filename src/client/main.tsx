import ReactDOM from "react-dom/client";
import { Rooter } from "@app/rooter";
import "@app/translations/i18n.ts";
import { UserContextProvider } from "@components/accountContext";
import "./index.scss";
import axios from "axios";
import { createSelector, createState } from "../newCore/src/state/main.ts";
import { applyMiddleware } from "redux";
import dynamicMiddlewares from "redux-dynamic-middlewares-2";
import { createEventDispatcher } from "../newCore/src/events/main.ts";
import { createService } from "../newCore/src/services/main.ts";
import { decoratePresenter } from "./components/presenterDecorator";
import { createHttpClient } from "./components/httpClient";
import { createApiUrlProvider } from "./components/apiUrlProvider";
import { createCore } from "../newCore/src/core/main.ts";
import { Provider } from "react-redux";
import { CoreContext } from "../newCore/src/viewModels/context.ts";

axios.interceptors.request.use((config) => ({
  ...config,
  url: config.url ? config.url.replace("{?projection}", "") : config.url,
}));

function main() {
  const state = createState(
    applyMiddleware(
      () => (next) => (action) => {
        console.log(action);
        next(action);
      },
      dynamicMiddlewares
    )
  );
  const selector = createSelector({ getState: () => state.getState() });
  const eventDispatcher = createEventDispatcher({
    sendEvent: state.dispatch,
  });
  const httpClient = createHttpClient();
  const repository = createService(createApiUrlProvider(httpClient));

  const core = decoratePresenter(eventDispatcher)(
    createCore({
      repository: repository,
    })
  );

  ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <Provider store={state}>
      <CoreContext.Provider
        value={{
          core: core,
          selector: selector,
          eventDispatcher,
        }}
      >
        <UserContextProvider>
          <Rooter />
        </UserContextProvider>
      </CoreContext.Provider>
    </Provider>
  );
}

main();

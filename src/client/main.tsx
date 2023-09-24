import ReactDOM from "react-dom/client";
import { applyMiddleware } from "redux";
import axios from "axios";
import dynamicMiddlewares from "redux-dynamic-middlewares";
import { Provider } from "react-redux";

import { createSelector, createState } from "@todo-list/state";
import { createEventDispatcher } from "@todo-list/events";
import { createService } from "@todo-list/services";
import { CoreContext } from "@todo-list/view-models";
import { createCore } from "@todo-list/core";
import { Rooter } from "@app/rooter";
import { UserContextProvider } from "@components/accountContext";
import "@app/translations/i18n.ts";
import { decoratePresenter } from "./components/presenterDecorator";
import { createHttpClient } from "./components/httpClient";
import { createApiUrlProvider } from "./components/apiUrlProvider";
import "./index.scss";

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

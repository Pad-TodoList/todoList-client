import React from "react";
import ReactDOM from "react-dom/client";
import { Rooter } from "@app/rooter";
import { WrapperContextProvider } from "@app/wrapper/wrapper.tsx";
import "@app/translations/i18n.ts";
import "./index.scss";
import { Wrapper } from "@app/wrapper";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <WrapperContextProvider>
      <Wrapper />
      <Rooter />
    </WrapperContextProvider>
  </React.StrictMode>
);

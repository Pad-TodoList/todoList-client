import React from "react";
import ReactDOM from "react-dom/client";
import { Rooter } from "@app/rooter";
import "@app/translations/i18n.ts";
import "./index.scss";
import { UserContextProvider } from "./components/accountContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <UserContextProvider>
      <Rooter />
    </UserContextProvider>
  </React.StrictMode>
);

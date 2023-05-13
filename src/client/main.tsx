import React from "react";
import ReactDOM from "react-dom/client";
import { Rooter } from "@app/rooter";
import "./index.scss";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Rooter />
  </React.StrictMode>
);

import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import store from "./state/store";
import { BrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";

import "./index.css";

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  );
}

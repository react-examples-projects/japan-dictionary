import React from "react";
import ReactDOM from "react-dom/client";
import { GeistProvider, CssBaseline } from "@geist-ui/core";
import App from "./App";

import "./styles/index.scss";
import "./styles/utils.scss";
import 'nprogress/nprogress.css';
import "inter-ui/inter.css";


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <GeistProvider themeType="dark">
      <CssBaseline />
      <App />
    </GeistProvider>
  </React.StrictMode>
);

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import {BrowserRouter as Router} from "react-router-dom"
import { StateProvider } from "./Contexts/StateProvider";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <Router>
    <StateProvider>
    <App />
    </StateProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles/index.css";

window.oncontextmenu = function (event: MouseEvent) {
  event.preventDefault();
  event.stopPropagation();
  return false;
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

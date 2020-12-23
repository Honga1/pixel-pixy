import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./App";

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

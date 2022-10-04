import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import BoardDataProvider from "./context/BoardDataContext";
import DarkmodeProvider from "./context/DarkModeContext";
import PopUpProvider from "./context/PopUpContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <PopUpProvider>
    <BoardDataProvider>
      <DarkmodeProvider>
        <App />
      </DarkmodeProvider>
    </BoardDataProvider>
  </PopUpProvider>
);

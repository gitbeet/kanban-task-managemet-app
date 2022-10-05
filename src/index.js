import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import BoardDataProvider from "./context/BoardDataContext";
import DarkmodeProvider from "./context/DarkModeContext";
import PopUpProvider from "./context/PopUpContext";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <DndProvider backend={HTML5Backend}>
    <PopUpProvider>
      <BoardDataProvider>
        <DarkmodeProvider>
          <App />
        </DarkmodeProvider>
      </BoardDataProvider>
    </PopUpProvider>
  </DndProvider>
);

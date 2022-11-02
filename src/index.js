import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import DarkmodeProvider from "./context/DarkModeContext";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <DndProvider backend={HTML5Backend}>
      <DarkmodeProvider>
        <App />
      </DarkmodeProvider>
    </DndProvider>
  </StrictMode>
);

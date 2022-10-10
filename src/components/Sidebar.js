import React from "react";
import * as ReactDOM from "react-dom";
import Backdrop from "./Backdrop";
import BoardsList from "./BoardsList";
import ToggleTheme from "./ToggleTheme";
import { useBoardData } from "../context/BoardDataContext";
import { usePopUp } from "../context/PopUpContext";
import { useDarkMode } from "../context/DarkModeContext";

export default function Sidebar() {
  const { currentBoard, changeCurrentBoard, boards } = useBoardData();
  const { darkMode } = useDarkMode();
  const { toggleSidebar } = usePopUp();

  return ReactDOM.createPortal(
    <>
      <div className={darkMode && "dark"}>
        <div className="rounded-md absolute flex flex-col justify-center items-start top-20 left-1/2 -translate-x-1/2 w-[17rem] space-y-6 py-4 z-[1300] bg-neutral-900 border-rounded-md dark:bg-primary-300 dark:text-neutral-900">
          <div className="tracking-wider text-primary-500 pl-4 text-sm font-semibold">
            ALL BOARDS ({boards.length})
          </div>
          <BoardsList
            currentBoard={currentBoard}
            changeCurrentBoard={changeCurrentBoard}
            boards={boards}
          />
          <div className="w-full self-center">
            <ToggleTheme />
          </div>
        </div>
      </div>
      <Backdrop clickFunction={toggleSidebar} zIndex="10000" />
    </>,
    document.getElementById("menu")
  );
}

import React from "react";
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
  return (
    <>
      <div className={darkMode ? "dark " : " "}>
        <div className="  flex flex-col rounded-md md:rounded-none fixed justify-center items-start top-20 left-1/2 -translate-x-1/2 w-[17rem] space-y-6 py-4 z-[300] bg-neutral-900 border-rounded-md dark:bg-primary-300 dark:text-neutral-900 md:static md:justify-between md:translate-x-0 md:translate-y-0 md:h-full md:border-r md:border-neutral-500 md:dark:border-primary-400">
          <div className="md:space-y-6">
            {/* ALL BOARDS HEADER */}
            <div className="tracking-wider text-primary-500 pl-4 text-sm font-semibold md:pl-10">
              ALL BOARDS ({boards.length})
            </div>
            {/* BOARD LIST  */}
            <BoardsList
              currentBoard={currentBoard}
              changeCurrentBoard={changeCurrentBoard}
              boards={boards}
            />
          </div>
          {/* THEME CHANGE */}
          <div className="w-full space-y-6">
            <div className="w-full self-center">
              <ToggleTheme />
            </div>
            <div className="cursor-pointer hidden md:flex items-center space-x-2 pl-4 md:pl-10">
              <svg width="18" height="16" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M8.522 11.223a4.252 4.252 0 0 1-3.654-5.22l3.654 5.22ZM9 12.25A8.685 8.685 0 0 1 1.5 8a8.612 8.612 0 0 1 2.76-2.864l-.86-1.23A10.112 10.112 0 0 0 .208 7.238a1.5 1.5 0 0 0 0 1.524A10.187 10.187 0 0 0 9 13.75c.414 0 .828-.025 1.239-.074l-1-1.43A8.88 8.88 0 0 1 9 12.25Zm8.792-3.488a10.14 10.14 0 0 1-4.486 4.046l1.504 2.148a.375.375 0 0 1-.092.523l-.648.453a.375.375 0 0 1-.523-.092L3.19 1.044A.375.375 0 0 1 3.282.52L3.93.068a.375.375 0 0 1 .523.092l1.735 2.479A10.308 10.308 0 0 1 9 2.25c3.746 0 7.031 2 8.792 4.988a1.5 1.5 0 0 1 0 1.524ZM16.5 8a8.674 8.674 0 0 0-6.755-4.219A1.75 1.75 0 1 0 12.75 5v-.001a4.25 4.25 0 0 1-1.154 5.366l.834 1.192A8.641 8.641 0 0 0 16.5 8Z"
                  fill="#828FA3"
                />
              </svg>
              <p
                onClick={toggleSidebar}
                className="hidden md:block cursor-pointer text-primary-500"
              >
                Hide Sidebar
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="md:hidden">
        <Backdrop clickFunction={toggleSidebar} zIndex="200" />
      </div>
    </>
  );
}

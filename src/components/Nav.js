import { useState } from "react";
import { useBoardData } from "../context/BoardDataContext";
import { usePopUp } from "../context/PopUpContext";
import EditDeleteMenu from "./EditDeleteMenu";
import TaskWindowMenu from "./TaskWindowMenu";

export default function Nav() {
  const { boards, currentBoard, emptyViewedTask, assignNewBoard } =
    useBoardData();
  const {
    toggleSidebar,
    toggleAddNewTaskWindow,
    toggleBoardDeleteWindow,
    toggleEditBoardWindow,
  } = usePopUp();
  const [showMenu, setShowMenu] = useState(false);

  function openAddNewTaskWindow() {
    emptyViewedTask();
    toggleAddNewTaskWindow();
  }

  function editFunction() {
    toggleEditBoardWindow();
    assignNewBoard(boards.find((board) => board.id === currentBoard));
  }

  return (
    <div className="relative mx-auto flex items-center justify-between px-4 py-5 shadow-md dark:bg-primary-300 dark:text-neutral-900 z-10">
      <div className="flex space-x-4">
        <svg width="24" height="25" xmlns="http://www.w3.org/2000/svg">
          <g fill="#635FC7" fillRule="evenodd">
            <rect width="6" height="25" rx="2" />
            <rect opacity=".75" x="9" width="6" height="25" rx="2" />
            <rect opacity=".5" x="18" width="6" height="25" rx="2" />
          </g>
        </svg>
        <div
          onClick={toggleSidebar}
          className="cursor-pointer flex items-center justify-between space-x-2 text-xl font-semibold"
        >
          <div>{boards.find((board) => board.id === currentBoard).name}</div>
          <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg">
            <path
              stroke="#635FC7"
              strokeWidth="2"
              fill="none"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </div>
      </div>
      <div className="flex space-x-2">
        <button
          disabled={
            boards.find((board) => board.id === currentBoard).columns.length < 1
          }
          onClick={openAddNewTaskWindow}
          className="bg-primary-600 px-4 py-2 rounded-full hover:bg-primary-700 transition-all disabled:opacity-50 disabled:pointer-events-none"
        >
          <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg">
            <path
              fill="#FFF"
              d="M7.368 12V7.344H12V4.632H7.368V0H4.656v4.632H0v2.712h4.656V12z"
            />
          </svg>
        </button>
        <EditDeleteMenu
          onClick={() => setShowMenu((prev) => !prev)}
          show={showMenu}
          onEdit={editFunction}
          onDelete={toggleBoardDeleteWindow}
        />
      </div>
    </div>
  );
}

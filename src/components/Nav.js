import React, { useState } from "react";
import "../css/Nav.css";
import { useBoardData } from "../context/BoardDataContext";
import { usePopUp } from "../context/PopUpContext";
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
    <div className="fs-heading-600 ">
      <div className="container nav">
        <svg width="24" height="25" xmlns="http://www.w3.org/2000/svg">
          <g fill="#635FC7" fillRule="evenodd">
            <rect width="6" height="25" rx="2" />
            <rect opacity=".75" x="9" width="6" height="25" rx="2" />
            <rect opacity=".5" x="18" width="6" height="25" rx="2" />
          </g>
        </svg>
        <div onClick={toggleSidebar} className="nav-select-board">
          {boards.find((board) => board.id === currentBoard).name}
          <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg">
            <path
              stroke="#635FC7"
              strokeWidth="2"
              fill="none"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </div>
        <button
          disabled={
            boards.find((board) => board.id === currentBoard).columns.length < 1
          }
          onClick={openAddNewTaskWindow}
          className="add-task-button"
        >
          <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg">
            <path
              fill="#FFF"
              d="M7.368 12V7.344H12V4.632H7.368V0H4.656v4.632H0v2.712h4.656V12z"
            />
          </svg>
        </button>
        <svg
          onClick={() => setShowMenu((prev) => !prev)}
          width="5"
          height="20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g fill="#828FA3" fillRule="evenodd">
            <circle cx="2.308" cy="2.308" r="2.308" />
            <circle cx="2.308" cy="10" r="2.308" />
            <circle cx="2.308" cy="17.692" r="2.308" />
          </g>
        </svg>
        {showMenu && (
          <TaskWindowMenu
            onEdit={editFunction}
            onDelete={toggleBoardDeleteWindow}
          />
        )}
      </div>
    </div>
  );
}

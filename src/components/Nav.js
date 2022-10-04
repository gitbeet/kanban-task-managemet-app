import React from "react";
import "../css/Nav.css";
import { useBoardData } from "../context/BoardDataContext";
import { usePopUp } from "../context/PopUpContext";

export default function Nav() {
  const { currentBoard } = useBoardData();
  const { toggleSidebar } = usePopUp();

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
          {currentBoard}
          <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg">
            <path
              stroke="#635FC7"
              strokeWidth="2"
              fill="none"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </div>
        <div className="add-task-button">
          <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg">
            <path
              fill="#FFF"
              d="M7.368 12V7.344H12V4.632H7.368V0H4.656v4.632H0v2.712h4.656V12z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

import { usePopUp } from "../context/PopUpContext";
import Backdrop from "./Backdrop";
import "../css/TaskViewWindow.css";
import Subtask from "./Subtask";
import { v4 as uuid } from "uuid";
import { useBoardData } from "../context/BoardDataContext";
import CurrentStatus from "./CurrentStatus";
import { useState } from "react";
import TaskWindowMenu from "./TaskWindowMenu";

export default function TaskViewWindow() {
  const { viewedTask } = useBoardData();
  const { closeTaskViewWindow, openTaskEditWindow, toggleTaskDeleteWindow } =
    usePopUp();
  const { handleChangeTaskStatusClose } = useBoardData();
  const { title, description } = viewedTask;

  const [showTaskWindowMenu, setShowTaskWindowMenu] = useState(false);

  function onClickBackdrop() {
    closeTaskViewWindow();
    handleChangeTaskStatusClose();
  }

  function toggleTaskWindowMenu() {
    setShowTaskWindowMenu((prev) => !prev);
  }

  return (
    <>
      {/* test comment */}
      <div className="task-view-window">
        <header>{viewedTask.title}</header>
        <svg
          style={{ margin: "1rem" }}
          onClick={toggleTaskWindowMenu}
          className="task-menu-button"
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
        {showTaskWindowMenu && (
          <TaskWindowMenu
            onEdit={openTaskEditWindow}
            onDelete={toggleTaskDeleteWindow}
          />
        )}
        <main>{viewedTask.description}</main>
        <section>
          {viewedTask.subtasks.map((subtask) => (
            <Subtask
              key={uuid()}
              taskTitle={title}
              taskDescription={description}
              subtask={subtask}
            />
          ))}
        </section>
        <div>Current Status</div>
        <CurrentStatus />
      </div>
      <Backdrop clickFunction={onClickBackdrop} />
    </>
  );
}

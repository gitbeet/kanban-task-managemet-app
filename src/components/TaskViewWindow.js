import { usePopUp } from "../context/PopUpContext";
import Backdrop from "./Backdrop";
import Subtask from "./Subtask";
import { v4 as uuid } from "uuid";
import { useBoardData } from "../context/BoardDataContext";
import CurrentStatus from "./CurrentStatus";
import { useState, useEffect, useRef } from "react";
import TaskWindowMenu from "./TaskWindowMenu";

export default function TaskViewWindow() {
  const { closeTaskViewWindow, openTaskEditWindow, toggleTaskDeleteWindow } =
    usePopUp();
  const { viewedTask, handleChangeTaskStatusClose } = useBoardData();
  const { title, description } = viewedTask;

  const [showTaskWindowMenu, setShowTaskWindowMenu] = useState(false);

  function onClickBackdrop() {
    closeTaskViewWindow();
    handleChangeTaskStatusClose();
  }

  function toggleTaskWindowMenu() {
    setShowTaskWindowMenu((prev) => !prev);
  }

  const completedSubtasks = viewedTask.subtasks.reduce((acc, s) => {
    if (s.isCompleted) {
      return acc + 1;
    } else {
      return acc + 0;
    }
  }, 0);

  const totalSubtasks = viewedTask.subtasks.length;

  return (
    <>
      <div className="absolute w-[min(90%,350px)] md:w-[450px] bg-neutral-900 dark:bg-primary-300 text-primary-200 dark:text-neutral-900 z-50 rounded-md left-1/2 -translate-x-1/2 p-6 space-y-6">
        <div className="flex justify-between items-center">
          <header className="font-bold text-md leading-6">
            {viewedTask.title}
          </header>
          <div className="flex justify-end w-10 cursor-pointer">
            <svg
              onClick={toggleTaskWindowMenu}
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
          </div>
        </div>
        {showTaskWindowMenu && (
          <TaskWindowMenu
            onEdit={openTaskEditWindow}
            onDelete={toggleTaskDeleteWindow}
          />
        )}
        <section className="text-primary-500 text-sm leading-6 tracking-wide">
          {viewedTask.description}
        </section>
        <section className="space-y-4">
          <p className="font-bold text-sm text-primary-500 dark:text-neutral-900">
            Subtasks ({completedSubtasks}
            of {totalSubtasks})
          </p>
          <div className="space-y-4">
            {viewedTask.subtasks.map((subtask) => (
              <Subtask
                key={uuid()}
                taskTitle={title}
                taskDescription={description}
                subtask={subtask}
              />
            ))}
          </div>
        </section>
        <div className="font-bold text-sm text-primary-500 dark:text-neutral-900">
          Current Status
        </div>
        <CurrentStatus />
      </div>
      <Backdrop clickFunction={onClickBackdrop} />
    </>
  );
}

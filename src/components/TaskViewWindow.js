import * as ReactDOM from "react-dom";
import Backdrop from "./Backdrop";
import Subtask from "./Subtask";
import CurrentStatus from "./CurrentStatus";
import { useEffect, useState } from "react";
import EditDeleteMenu from "./EditDeleteMenu";
import { useDarkMode } from "../context/DarkModeContext";

const TaskViewWindow = ({
  statusList,
  viewedTask,
  handleChangeTaskStatusClose,
  closeTaskViewWindow,
  openTaskEditWindow,
  toggleTaskDeleteWindow,
}) => {
  const { darkMode } = useDarkMode();

  const [showTaskWindowMenu, setShowTaskWindowMenu] = useState(false);
  const [tempTask, setTempTask] = useState(viewedTask);

  const handleChange = (changes) => {
    setTempTask((prev) => ({ ...prev, ...changes }));
  };

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        onClickBackdrop();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  });

  const onClickBackdrop = () => {
    closeTaskViewWindow();
    handleChangeTaskStatusClose(tempTask);
  };

  const toggleTaskWindowMenu = () => {
    setShowTaskWindowMenu((prev) => !prev);
  };

  const completedSubtasks = viewedTask.subtasks.reduce((acc, s) => {
    if (s.isCompleted) {
      return acc + 1;
    } else {
      return acc + 0;
    }
  }, 0);

  const totalSubtasks = viewedTask.subtasks.length;

  return ReactDOM.createPortal(
    <>
      <div className={darkMode ? "dark z-[400] fixed" : " z-[400] fixed"}>
        <div className="fixed max-h-[90vh]  w-[min(90%,350px)] overflow-auto md:w-[450px] bg-neutral-900 dark:bg-primary-300 text-primary-200 dark:text-neutral-900 rounded-md left-1/2 top-[50vh] -translate-y-1/2 -translate-x-1/2 p-6 space-y-6">
          <div className="flex justify-between items-center">
            <header className="font-bold text-md leading-6">
              {viewedTask.title}
            </header>
            <EditDeleteMenu
              onClick={toggleTaskWindowMenu}
              show={showTaskWindowMenu}
              onEdit={openTaskEditWindow}
              onDelete={toggleTaskDeleteWindow}
              onClose={toggleTaskWindowMenu}
              backdropOpacity="20"
              buttonText="task"
            />
          </div>
          <section className="text-primary-500 text-sm leading-6 tracking-wide">
            {viewedTask.description}
          </section>
          <section className="space-y-4">
            <p className="font-bold text-sm text-primary-500 dark:text-neutral-900">
              Subtasks ({completedSubtasks}
              of {totalSubtasks})
            </p>
            <div className="scrollbar-thin scrollbar-track-neutral-900 scrollbar-thumb-primary-600 space-y-4 max-h-[15rem] overflow-auto px-4">
              {tempTask.subtasks.map((subtask) => (
                <Subtask
                  tempTask={tempTask}
                  key={subtask.id}
                  subtask={subtask}
                  handleChange={handleChange}
                />
              ))}
            </div>
          </section>
          <div className="font-bold text-sm text-primary-500 dark:text-neutral-900">
            Current Status
          </div>
          <CurrentStatus
            tempTask={tempTask}
            handleChange={handleChange}
            statusList={statusList}
          />
        </div>
      </div>
      <div className="fixed z-[300]">
        <Backdrop clickFunction={onClickBackdrop} />
      </div>
    </>,
    document.getElementById("menu")
  );
};

export default TaskViewWindow;

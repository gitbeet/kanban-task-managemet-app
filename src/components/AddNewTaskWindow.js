import { useDarkMode } from "../context/DarkModeContext";
import Backdrop from "./Backdrop";
import EditSubtask from "./EditSubtask";
import EditStatus from "./EditStatus";
import { v4 as uuid } from "uuid";
import Button from "./Button";
import useKeyboardControl from "../utilities/useKeyboardControl";
import { useState } from "react";

export default function AddNewTaskWindow({
  statusList,
  viewedTask,
  boards,
  currentBoardId,
  buttonText,
  type,
  header,
  closeFunction,
  createTaskFunc,
}) {
  useKeyboardControl(saveChanges, closeFunction);
  const { darkMode } = useDarkMode();

  const [tempTask, setTempTask] = useState(viewedTask);

  console.log(tempTask);

  function handleChange(changes) {
    if (tempTask.error) {
      setTempTask((prev) => {
        return { ...prev, error: "" };
      });
    }
    setTempTask((prev) => {
      return { ...prev, ...changes };
    });

    console.log(tempTask);
  }

  function handleSubtaskAdd() {
    const emptySubtask = {
      id: uuid(),
      title: "",
      isCompleted: false,
      error: "",
    };
    handleChange({
      subtasks: [...tempTask.subtasks, emptySubtask],
    });
  }

  function saveChanges() {
    let temp = { ...tempTask };

    if (temp.title.length === 0) {
      temp.error = "Can't be empty.";
    }

    const tempSubtasks = temp.subtasks.map((subtask) => {
      return subtask.title.length === 0
        ? { ...subtask, error: "Can't be empty" }
        : subtask;
    });

    temp.subtasks = tempSubtasks;
    setTempTask(temp);

    if (
      temp.title.length === 0 ||
      temp.subtasks.findIndex((subtask) => subtask.title.length === 0) !== -1
    ) {
      return;
    }
    console.log(
      temp.subtasks.findIndex((subtask) => subtask.title.length === 0) !== -1
    );

    createTaskFunc(type, tempTask);
    closeFunction();
  }

  return (
    <div className={darkMode ? "dark overflow-auto " : "overflow-auto  "}>
      {/* title */}
      <div className="scrollbar-thin scrollbar-thumb-primary-600 scrollbar-track-neutral-900 max-h-[90vh] overflow-auto space-y-8 w-[min(90%,350px)] md:w-[450px]  flex-col fixed z-[300] bg-neutral-900 p-6  left-[50%]  top-[50vh] -translate-y-1/2  -translate-x-1/2 shadow-md rounded-md dark:bg-primary-300 dark:text-neutral-900">
        <div className="font-semibold text-lg">{header}</div>
        <div className="flex flex-col space-y-2">
          <label
            className="text-primary-500 text-xs opacity-75 font-bold dark:text-neutral-900 dark:opacity-100"
            htmlFor="title"
          >
            Title
          </label>
          <div className="relative flex flex-col">
            <input
              className={`${
                tempTask.error
                  ? "placeholder:text-danger-500 placeholder:text-right border-danger-500 border-opacity-100 hover:border-danger-600  hover:placeholder:text-danger-600"
                  : "border-opacity-25 border-primary-500"
              }  bg-neutral-900  dark:bg-primary-300`}
              placeholder={
                tempTask.error ? tempTask.error : "e.g. Take coffee break"
              }
              autoFocus
              value={tempTask.title}
              onChange={(e) => handleChange({ title: e.target.value })}
              name="title"
            />
          </div>
        </div>
        {/* description */}
        <div className="flex flex-col space-y-2">
          <label
            className="text-primary-500 text-xs opacity-75 font-bold dark:text-neutral-900 dark:opacity-100"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            className="resize-none border-opacity-25 border-primary-500 bg-neutral-900  dark:bg-primary-300 w"
            placeholder="e.g. It’s always good to take a break. This 
            15 minute break will  recharge the batteries 
            a little."
            rows={4}
            onChange={(e) => handleChange({ description: e.target.value })}
            value={tempTask.description}
            name="description"
          />
        </div>
        {/* subtasks */}
        <div className="space-y-4">
          <div className="text-primary-500 text-xs opacity-75 font-bold dark:text-neutral-900 dark:opacity-100">
            Subtasks
          </div>
          <div className="scrollbar-thin scrollbar-track-neutral-900 scrollbar-thumb-primary-600 space-y-4 mt-2 max-h-[11rem] overflow-auto px-4">
            {tempTask.subtasks.map((subtask) => {
              return (
                <EditSubtask
                  handleChange={handleChange}
                  tempTask={tempTask}
                  key={subtask.id}
                  subtask={subtask}
                  errorMessage={subtask.error}
                />
              );
            })}
          </div>
          <div className="flex flex-col">
            <Button
              onClick={handleSubtaskAdd}
              text="+Add New Subtask"
              size="sm"
              type="secondary"
            />
          </div>
        </div>
        {/* status + create button */}
        <div className="flex flex-col space-y-6">
          <EditStatus
            statusList={statusList}
            type={type}
            handleChange={handleChange}
            tempTask={tempTask}
            boards={boards}
            currentBoardId={currentBoardId}
          />
          <Button
            onClick={saveChanges}
            text={buttonText}
            size="sm"
            type="primary"
          />
        </div>
      </div>

      <div className="fixed z-[200]">
        <Backdrop clickFunction={closeFunction} />
      </div>
    </div>
  );
}

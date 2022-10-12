import { useDarkMode } from "../context/DarkModeContext";
import { useBoardData } from "../context/BoardDataContext";
import Backdrop from "./Backdrop";
import EditSubtask from "./EditSubtask";
import EditStatus from "./EditStatus";
import { v4 as uuid } from "uuid";
import Button from "./Button";
import { useState } from "react";

export default function AddNewTaskWindow({
  buttonText,
  type,
  header,
  task,
  closeFunction,
  createTaskFunc,
}) {
  const { darkMode } = useDarkMode();
  const { handleCangeNewTask, viewedTask } = useBoardData();
  const [errors, setErrors] = useState([{ name: "", subtasks: [] }]);

  function handleSubtaskAdd() {
    handleCangeNewTask({
      subtasks: [
        ...task.subtasks,
        {
          id: uuid(),
          title: "",
          isCompleted: false,
        },
      ],
    });
  }
  // Check code
  function handleSubtaskDelete(id) {
    handleCangeNewTask({
      subtasks: task.subtasks.filter((subtask, index) => index !== id),
    });
  }

  function clearError(id) {
    // Clear error message on typing so it doesn't clutter field
    setErrors((prev) => {
      return prev.subtasks.map((subtask) => {
        return subtask.id === id ? { ...subtask, message: "" } : subtask;
      });
    });
  }

  function saveChanges() {
    setErrors([{ name: "", subtasks: [] }]);
    let tempErrors = { name: "", subtasks: [] };
    // SUBTASK ERRORS
    viewedTask.subtasks.forEach((subtask) => {
      if (subtask.title.length === 0) {
        tempErrors.subtasks = [
          ...tempErrors.subtasks,
          { id: subtask.id, message: "Can't be empty." },
        ];
      } else {
        tempErrors.subtasks = [
          ...tempErrors.subtasks,
          { id: subtask.id, message: "" },
        ];
      }
    });

    // NAME ERRORS
    if (viewedTask.title.length === 0) {
      console.log("im here");
      tempErrors.name = "Can't be empty.";
    }
    setErrors(tempErrors);
    console.log(
      tempErrors.name,
      tempErrors.subtasks.findIndex((subtask) => subtask.message.length > 0) !==
        -1
    );
    if (
      tempErrors.name ||
      tempErrors.subtasks.findIndex((subtask) => subtask.message.length > 0) !==
        -1
    )
      return;
    createTaskFunc(type);
    closeFunction();
  }

  return (
    <div className={darkMode ? "dark " : ""}>
      {/* title */}
      <div className="space-y-8 w-[min(90%,350px)] md:w-[450px]  flex-col fixed z-[300] bg-neutral-900 p-6  left-[50%] top-[2rem] -translate-x-1/2 shadow-md rounded-md dark:bg-primary-300 dark:text-neutral-900">
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
                errors.name &&
                "placeholder:text-danger-500 placeholder:text-right"
              } border-opacity-25 border-primary-500 bg-neutral-900  dark:bg-primary-300`}
              placeholder={errors.name ? errors.name : "e.g. Take coffee break"}
              value={task.title}
              onChange={(e) => handleCangeNewTask({ title: e.target.value })}
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
            onChange={(e) =>
              handleCangeNewTask({ description: e.target.value })
            }
            value={task.description}
            name="description"
          />
        </div>
        {/* subtasks */}
        <div className="space-y-4">
          <div className="text-primary-500 text-xs opacity-75 font-bold dark:text-neutral-900 dark:opacity-100">
            Subtasks
          </div>
          <div className="space-y-4 mt-2 max-h-[16rem]">
            {task.subtasks.map((subtask) => {
              return (
                <EditSubtask
                  handleSubtaskDelete={handleSubtaskDelete}
                  key={subtask.id}
                  subtask={subtask}
                  type={type}
                  clearError={clearError}
                  errorMessage={
                    (errors.subtasks &&
                      errors?.subtasks?.find((error) => error.id === subtask.id)
                        .message) ||
                    ""
                  }
                />
              );
            })}
          </div>
          <div className="flex flex-col">
            <Button
              onClick={handleSubtaskAdd}
              text={"+Add New Subtask"}
              size="sm"
              type="secondary"
            />
          </div>
        </div>
        {/* status + create button */}
        <div className="flex flex-col space-y-6">
          <EditStatus type={type} />
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

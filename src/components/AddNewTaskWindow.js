import { useDarkMode } from "../context/DarkModeContext";
import { useBoardData } from "../context/BoardDataContext";
import Backdrop from "./Backdrop";
import EditSubtask from "./EditSubtask";
import EditStatus from "./EditStatus";
import { v4 as uuid } from "uuid";
import Button from "./Button";

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

  function handleSubtaskAdd() {
    handleCangeNewTask({
      subtasks: [
        ...task.subtasks,
        {
          id: uuid(),
          title: "",
          isCompleted: false,
          error: "",
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

  function saveChanges() {
    let temp = { ...viewedTask };

    if (temp.title.length === 0) {
      temp.error = "Can't be empty.";
    }

    temp = {
      ...temp,
      subtasks: temp.subtasks.map((s) => {
        if (s.title.length === 0) {
          console.log("its empty");
          return { ...s, error: "Can't be empty." };
        } else {
          console.log("its not");
          return s;
        }
      }),
    };

    handleCangeNewTask({ error: temp.error });
    handleCangeNewTask({ subtasks: [...temp.subtasks] });

    if (
      temp.title.length === 0 ||
      temp.subtasks.findIndex((subtask) => subtask.error.length > 0) !== -1
    ) {
      return;
    }

    createTaskFunc(type);
    closeFunction();
  }

  // CLEAR THE ERROR ON TYPING SO WHEN YOU DELETE THE TEXT THE OLD ERROR DOES NOT SHOW / LOOKS CLEANER
  function handleChange(change) {
    handleCangeNewTask(change);
    if (viewedTask.error) {
      handleCangeNewTask({ error: "" });
    }
  }

  return (
    <div className={darkMode ? "dark overflow-auto " : "overflow-auto "}>
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
                viewedTask.error &&
                "placeholder:text-danger-500 placeholder:text-right border-danger-500 border-opacity-100 hover:border-danger-600  hover:placeholder:text-danger-600"
              } border-opacity-25 border-primary-500 bg-neutral-900  dark:bg-primary-300`}
              placeholder={
                viewedTask.error ? viewedTask.error : "e.g. Take coffee break"
              }
              value={task.title}
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
          <div className="scrollbar-thin scrollbar-track-neutral-900 scrollbar-thumb-primary-600 space-y-4 mt-2 max-h-[11rem] overflow-auto px-4">
            {task.subtasks.map((subtask) => {
              return (
                <EditSubtask
                  handleSubtaskDelete={handleSubtaskDelete}
                  key={subtask.id}
                  subtask={subtask}
                  type={type}
                  errorMessage={
                    viewedTask.subtasks.find((s) => s.id === subtask.id).error
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

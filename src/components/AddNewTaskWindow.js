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
  const { handleCangeNewTask } = useBoardData();

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

  function saveChanges() {
    createTaskFunc(type);
    closeFunction();
  }

  return (
    <>
      {/* title */}
      <div className="space-y-8 w-[min(90%,350px)] md:w-[450px] flex-col absolute z-50 bg-neutral-900 p-6 left-[50%] top-16 -translate-x-1/2 shadow-md rounded-md dark:bg-primary-300 dark:text-neutral-900">
        <div className="font-semibold text-lg">{header}</div>
        <div className="flex flex-col space-y-2">
          <label
            className="text-primary-500 text-xs opacity-75 font-bold dark:text-neutral-900 dark:opacity-100"
            htmlFor="title"
          >
            Title
          </label>
          <input
            className="border border-neutral-500 rounded-md dark:bg-primary-300 dark:border-primary-450"
            placeholder="e.g. Take coffee break"
            value={task.title}
            onChange={(e) => handleCangeNewTask({ title: e.target.value })}
            name="title"
          />
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
            className="border border-neutral-500 rounded-md resize-none dark:bg-primary-300 dark:border-primary-450"
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
          <div className="space-y-4 mt-2">
            {task.subtasks.map((subtask) => {
              return (
                <EditSubtask
                  handleSubtaskDelete={handleSubtaskDelete}
                  key={subtask.id}
                  subtask={subtask}
                  type={type}
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

      <Backdrop clickFunction={closeFunction} />
    </>
  );
}

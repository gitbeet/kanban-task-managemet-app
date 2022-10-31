import { useBoardData } from "../context/BoardDataContext";

export default function EditSubtask({ subtask, errorMessage = "" }) {
  const { handleChangeNewTask, viewedTask } = useBoardData();

  function handleChangeSubtask(changes) {
    const updatedSubtasks = { ...viewedTask }.subtasks;
    const index = updatedSubtasks.findIndex((subt) => subt.id === subtask.id);
    updatedSubtasks[index] = { ...subtask, ...changes, error: "" };
    handleChangeNewTask(updatedSubtasks);
  }

  function handleDeleteSubtask() {
    const updatedSubtasks = { ...viewedTask }.subtasks.filter(
      (subt) => subt.id !== subtask.id
    );
    handleChangeNewTask({ subtasks: updatedSubtasks });
  }

  return (
    <div className="flex justify-between items-center space-x-2">
      <input
        // 95% because otherwise it cuts the close button
        className={`w-full ${
          errorMessage
            ? "placeholder:text-danger-500 placeholder:text-right border-danger-500 hover:border-danger-600   border-opacity-100  hover:placeholder:text-danger-600"
            : "border-opacity-25 border-primary-500"
        }  bg-neutral-900  dark:bg-primary-300 w`}
        onChange={(e) => handleChangeSubtask({ title: e.target.value })}
        value={subtask.title}
        placeholder={errorMessage}
      />

      <svg
        className="cursor-pointer fill-[#828FA3] hover:fill-danger-500"
        onClick={handleDeleteSubtask}
        width="15"
        height="15"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g fill="current-color" fillRule="evenodd">
          <path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z" />
          <path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z" />
        </g>
      </svg>
    </div>
  );
}

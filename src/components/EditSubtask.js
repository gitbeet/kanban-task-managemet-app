import React from "react";
import { useBoardData } from "../context/BoardDataContext";

export default function EditSubtask({ type, subtask }) {
  const { handleCangeNewTask, viewedTask } = useBoardData();

  function handleChangeSubtask(changes) {
    const updatedSubtasks = { ...viewedTask }.subtasks;
    const index = updatedSubtasks.findIndex((subt) => subt.id === subtask.id);
    updatedSubtasks[index] = { ...subtask, ...changes };
    handleCangeNewTask(updatedSubtasks);
  }

  function handleDeleteSubtask() {
    const updatedSubtasks = { ...viewedTask }.subtasks.filter(
      (subt) => subt.id !== subtask.id
    );
    console.log(updatedSubtasks);
    handleCangeNewTask({ subtasks: updatedSubtasks });
  }

  return (
    <div className="flex justify-between items-center space-x-2">
      <input
        // 95% because otherwise it cuts the close button
        className="w-[95%] border-neutral-500 dark:bg-primary-400 dark:border-primary-450"
        onChange={(e) => handleChangeSubtask({ title: e.target.value })}
        value={subtask.title}
      />
      <svg
        className=""
        onClick={handleDeleteSubtask}
        width="15"
        height="15"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g fill="#828FA3" fillRule="evenodd">
          <path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z" />
          <path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z" />
        </g>
      </svg>
    </div>
  );
}

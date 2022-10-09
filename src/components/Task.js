import React, { useMemo } from "react";
import { useBoardData } from "../context/BoardDataContext";
import { usePopUp } from "../context/PopUpContext";
import { useDrag } from "react-dnd";

export default function Task({ task, column }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const { openTaskViewWindow } = usePopUp();
  const { boards, currentBoard, toggleDraggedTask } = useBoardData();

  const completedSubtasks = boards
    .find((board) => board.id === currentBoard)
    .columns.find((col) => col.id === column)
    .tasks.find((t) => t.id === task.id)
    .subtasks.reduce((acc, subtask) => {
      if (subtask.isCompleted) {
        return acc + 1;
      } else {
        return acc + 0;
      }
    }, 0);

  const totalSubtasks = boards
    .find((board) => board.id === currentBoard)
    .columns.find((col) => col.id === column)
    .tasks.find((t) => t.id === task.id).subtasks.length;

  useMemo(() => {
    if (isDragging) {
      toggleDraggedTask(task, column);
    }
  }, [isDragging]);

  return (
    <div
      ref={drag}
      style={{ cursor: "pointer" }}
      onClick={() => openTaskViewWindow(task, column)}
      className="flex flex-col items-start bg-neutral-900 dark:bg-primary-300 dark:text-neutral-900 shadow-md rounded-md py-6 pl-4 pr-12 w-[19rem] space-y-2"
    >
      <header className="font-bold tracking-wide text-sm">{task.title}</header>
      <p className="text-xs font-bold text-primary-450 dark:text-primary-500">
        {completedSubtasks} of {totalSubtasks} subtasks
      </p>
    </div>
  );
}

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
      className="task"
    >
      <header>{task.title}</header>
      <div>
        {completedSubtasks} of {totalSubtasks}
      </div>
    </div>
  );
}

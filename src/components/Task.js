import React from "react";
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
    .find((board) => board.name === currentBoard)
    .columns.find((col) => col.name === column)
    .tasks.find((t) => t.title === task.title)
    .subtasks.reduce((acc, subtask) => {
      if (subtask.isCompleted) {
        return acc + 1;
      } else {
        return acc + 0;
      }
    }, 0);

  const totalSubtasks = boards
    .find((board) => board.name === currentBoard)
    .columns.find((col) => col.name === column)
    .tasks.find((t) => t.title === task.title).subtasks.length;
  return (
    <div
      onDrag={() => toggleDraggedTask(task, column)}
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

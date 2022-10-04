import React, { useEffect, useState } from "react";
import { useBoardData } from "../context/BoardDataContext";
import { usePopUp } from "../context/PopUpContext";

export default function Task({ task, column }) {
  const { openTaskViewWindow } = usePopUp();
  const { boards, currentBoard } = useBoardData();

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
      onClick={() => openTaskViewWindow(task.title, column)}
      className="task"
    >
      <header>{task.title}</header>
      <div>
        {completedSubtasks} of {totalSubtasks}
      </div>
    </div>
  );
}

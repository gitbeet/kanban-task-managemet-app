import React from "react";
import Task from "./Task";
import { v4 as uuid } from "uuid";
import "../css/Column.css";
import { useDrop } from "react-dnd";
import { useBoardData } from "../context/BoardDataContext";

export default function Column({ column }) {
  const { dropTask, draggedTask } = useBoardData();
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: () => dropTask(column.name, draggedTask),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div ref={drop} className="column">
      <header>
        {column.name} ({column.tasks?.length || 0})
      </header>
      {column.tasks?.map((task) => (
        <Task key={uuid()} task={task} column={column.name} />
      ))}
    </div>
  );
}

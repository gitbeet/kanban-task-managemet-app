import React from "react";
import Task from "./Task";
import { v4 as uuid } from "uuid";
import "../css/Column.css";
import { useDrop } from "react-dnd";
import { useBoardData } from "../context/BoardDataContext";

export default function Column({ column }) {
  const { dropTask } = useBoardData();
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: () => dropTask(column.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div ref={drop} className="column">
      <header>
        {column.name} ({column.tasks?.length || 0})
      </header>
      {column.tasks?.map((task, index) => (
        <Task key={uuid()} id={index} task={task} column={column.id} />
      ))}
    </div>
  );
}

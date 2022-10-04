import React from "react";
import Task from "./Task";
import { v4 as uuid } from "uuid";
import "../css/Column.css";

export default function Column({ column }) {
  return (
    <div className="column">
      <header>
        {column.name} ({column.tasks?.length || 0})
      </header>
      {column.tasks?.map((task) => (
        <Task key={uuid()} task={task} column={column.name} />
      ))}
    </div>
  );
}

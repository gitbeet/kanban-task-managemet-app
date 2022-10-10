import React from "react";
import Task from "./Task";
import { v4 as uuid } from "uuid";
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
    <div ref={drop} className="space-y-6 w-[17rem]">
      <header className="flex items-center justify-start space-x-3 uppercase text-sm tracking-widest text-primary-500">
        <div
          className={`w-4 h-4 ${`bg-[hsl(200,100%,62%)]`} rounded-full`}
        ></div>
        <p className="font-bold">
          {column.name} ({column.tasks?.length || 0})
        </p>
      </header>
      {column.tasks?.map((task, index) => (
        <Task key={uuid()} id={index} task={task} column={column.id} />
      ))}
    </div>
  );
}

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

  const getRandomColor = () => {
    const h = Math.floor(Math.random() * 360),
      s = Math.floor(Math.random() * 100) + "%",
      l = Math.floor(Math.random() * 60) + "%"; // max value of l is 100, but I set to 60 cause I want to generate dark colors
    // (use for background with white/light font color)
    return `hsl(${h},${s},${l})`;
  };

  let pp = getRandomColor();

  let x = `bg-[hsl(${250 - Math.floor(Math.random() * 30)},100%,65%)]`;

  console.log(x, pp);
  return (
    <div ref={drop} className="space-y-6">
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

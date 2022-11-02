import Task from "./Task";
import { v4 as uuid } from "uuid";
import { useDrop } from "react-dnd";

export default function Column({
  column,
  openTaskViewWindow,
  dropTask,
  toggleDraggedTask,
  currentBoardId,
  boards,
}) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: () => dropTask(column.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  // GENERATING A COLOR BETWEEN 170-230 HUE
  const randomColor = `hsl(${Math.floor(
    200 + Math.random() * 30 * (Math.random() < 0.5 ? 1 : -1)
  )},100%,62%)`;
  return (
    <div ref={drop} className="space-y-6 w-[17rem]">
      <header className="flex items-center justify-start space-x-3 uppercase text-sm tracking-widest text-primary-500">
        <div
          style={{ backgroundColor: randomColor }}
          className={"w-4 h-4 rounded-full"}
        ></div>
        <p className="font-bold">
          {column.name} ({column.tasks?.length || 0})
        </p>
      </header>
      {column.tasks?.map((task, index) => (
        <Task
          boards={boards}
          currentBoardId={currentBoardId}
          toggleDraggedTask={toggleDraggedTask}
          key={uuid()}
          id={index}
          task={task}
          column={column.id}
          openTaskViewWindow={openTaskViewWindow}
        />
      ))}
    </div>
  );
}

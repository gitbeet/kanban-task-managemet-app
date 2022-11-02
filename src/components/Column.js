import Task from "./Task";
import { useDrop } from "react-dnd";

const Column = ({
  column,
  openTaskViewWindow,
  dropTask,
  toggleDraggedTask,
  currentBoardId,
  boards,
}) => {
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
          style={{ backgroundColor: column.color }}
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
          key={task.id}
          id={index}
          task={task}
          column={column.id}
          openTaskViewWindow={openTaskViewWindow}
        />
      ))}
    </div>
  );
};

export default Column;

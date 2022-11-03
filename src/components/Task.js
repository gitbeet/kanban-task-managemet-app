import { useEffect } from "react";
import { useMemo } from "react";
import { useDrag } from "react-dnd";

const Task = ({
  task,
  column,
  openTaskViewWindow,
  boards,
  currentBoardId,
  toggleDraggedTask,
  debugFunc,
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const completedSubtasks = boards
    .find((board) => board.id === currentBoardId)
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
    .find((board) => board.id === currentBoardId)
    .columns.find((col) => col.id === column)
    .tasks.find((t) => t.id === task.id).subtasks.length;

  useMemo(() => {
    if (isDragging) {
      toggleDraggedTask(task, column);
    }
  }, [isDragging, task, toggleDraggedTask, column]);

  return (
    <div
      // onDragStart={() => {
      //   toggleDraggedTask(task, column);
      //   console.log(task, column);
      // }}
      ref={drag}
      onClick={() => openTaskViewWindow(task, column)}
      className="cursor-pointer flex flex-col items-start bg-neutral-900 dark:bg-primary-300 dark:text-neutral-900 shadow-md rounded-md py-6 pl-4 pr-12 w-full space-y-2"
    >
      <header className="font-bold tracking-wide text-sm">{task.title}</header>
      <p className="text-xs font-bold text-primary-450 dark:text-primary-500">
        {completedSubtasks} of {totalSubtasks} subtasks
      </p>
    </div>
  );
};

export default Task;

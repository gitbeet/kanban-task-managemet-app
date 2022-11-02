import { v4 as uuid } from "uuid";
import Column from "./Column";

export default function ColumnsList({
  board,
  openTaskViewWindow,
  dropTask,
  boards,
  currentBoardId,
  toggleDraggedTask,
}) {
  return (
    <div className="grid grid-flow-col space-x-6">
      {board.map((column) => (
        <Column
          dropTask={dropTask}
          key={column.id}
          column={column}
          openTaskViewWindow={openTaskViewWindow}
          boards={boards}
          currentBoardId={currentBoardId}
          toggleDraggedTask={toggleDraggedTask}
        />
      ))}
    </div>
  );
}

import { v4 as uuid } from "uuid";
import Column from "./Column";

const ColumnsList = ({
  board,
  openTaskViewWindow,
  dropTask,
  boards,
  currentBoardId,
  toggleDraggedTask,
  debugFunc,
  draggedTask,
  draggedTaskColumn,
}) => {
  return (
    <div className="grid grid-flow-col space-x-6">
      {board.map((column) => (
        <Column
          debugFunc={debugFunc}
          dropTask={dropTask}
          key={column.id}
          column={column}
          openTaskViewWindow={openTaskViewWindow}
          boards={boards}
          currentBoardId={currentBoardId}
          toggleDraggedTask={toggleDraggedTask}
          draggedTask={draggedTask}
          draggedTaskColumn={draggedTaskColumn}
        />
      ))}
    </div>
  );
};

export default ColumnsList;

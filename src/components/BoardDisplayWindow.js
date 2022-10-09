import { useState } from "react";
import { useBoardData } from "../context/BoardDataContext";
import AddNewColumn from "./AddNewColumn";
import ColumnsList from "./ColumnsList";

export default function BoardDisplayWindow() {
  const { currentBoard, boards, handleColumnAdd } = useBoardData();
  const [showAddNewColumnMenu, setShowAddNewColumnMenu] = useState();

  function toggleAddNewColumnMenu() {
    setShowAddNewColumnMenu((prev) => !prev);
  }

  const currentBoardData = boards.find(
    (board) => board.id === currentBoard
  ).columns;
  return (
    <div className="min-h-[100vh] overflow-x-auto bg-neutral-700 dark:bg-primary-200 dark:text-primary-500 p-4">
      {currentBoardData.length > 0 && (
        <>
          <ColumnsList board={currentBoardData} />
          <div onClick={toggleAddNewColumnMenu}>+ New Column</div>
          {showAddNewColumnMenu && (
            <AddNewColumn
              handleColumnAdd={handleColumnAdd}
              closeFunction={toggleAddNewColumnMenu}
            />
          )}
        </>
      )}
      <div className="text-xl">
        {currentBoardData.length === 0 && (
          <>
            This board is empty. Create a new column to get started.
            {showAddNewColumnMenu && (
              <AddNewColumn
                handleColumnAdd={handleColumnAdd}
                closeFunction={toggleAddNewColumnMenu}
              />
            )}
            <button className="btn-primary-sm" onClick={toggleAddNewColumnMenu}>
              +Add New Column
            </button>
          </>
        )}
      </div>
    </div>
  );
}

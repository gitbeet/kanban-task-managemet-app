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
    <div>
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
      {currentBoardData.length === 0 && (
        <>
          This board is empty. Create a new column to get started.
          {showAddNewColumnMenu && (
            <AddNewColumn
              handleColumnAdd={handleColumnAdd}
              closeFunction={toggleAddNewColumnMenu}
            />
          )}
          <button onClick={toggleAddNewColumnMenu}>Add New Column</button>
        </>
      )}
    </div>
  );
}

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
      {currentBoardData.length > 0 && <ColumnsList board={currentBoardData} />}
      {currentBoardData.length === 0 && (
        <>
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

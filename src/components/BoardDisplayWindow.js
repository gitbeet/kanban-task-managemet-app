import { useState } from "react";
import { useBoardData } from "../context/BoardDataContext";
import AddNewColumn from "./AddNewColumn";
import ColumnsList from "./ColumnsList";
import Button from "./Button";

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
    <div className="scrollbar-thin scrollbar-track-neutral-900 scrollbar-thumb-primary-600 w-full min-h-full overflow-auto ">
      <div className=" min-h-full min-w-fit bg-neutral-700 dark:bg-primary-200 text-primary-100 dark:text-primary-500 p-4">
        {currentBoardData.length > 0 && (
          <div className="flex min-h-full  justify-start items-stretch">
            {/* boards */}
            <ColumnsList board={currentBoardData} />
            {/* ADD COL MENU  */}
            <div
              onClick={toggleAddNewColumnMenu}
              className="cursor-pointer min-w-[17rem] min-h-[100vh]  bg-neutral-500 dark:bg-primary-300 dark:bg-opacity-50 rounded-md ml-6 mr-6"
            >
              <h2 className="text-primary-500 w-fit relative left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                + New Column
              </h2>
            </div>
          </div>
        )}
        {currentBoardData.length === 0 && (
          <>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2  w-[22rem] flex flex-col items-center p-4 space-y-4 text-primary-100 dark:text-neutral-900">
              <h2 className="text-center text-primary-500 font-bold">
                This board is empty. Create a new column to get started.
              </h2>
              <Button
                type="primary"
                size="lg"
                text="+Add New Column"
                onClick={toggleAddNewColumnMenu}
              />
            </div>
          </>
        )}
        {showAddNewColumnMenu && (
          <>
            <AddNewColumn
              handleColumnAdd={handleColumnAdd}
              closeFunction={toggleAddNewColumnMenu}
            />
          </>
        )}
      </div>
    </div>
  );
}

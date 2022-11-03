import { useRef, useState } from "react";
import AddNewColumn from "./AddNewColumn";
import ColumnsList from "./ColumnsList";
import Button from "./Button";
import ScrollButtons from "./ScrollButtons";

const BoardDisplayWindow = ({
  dropTask,
  openTaskViewWindow,
  currentBoardId,
  boards,
  handleColumnAdd,
  toggleDraggedTask,
  debugFunc,
  draggedTask,
  draggedTaskColumn,
}) => {
  const [showAddNewColumnMenu, setShowAddNewColumnMenu] = useState();

  const toggleAddNewColumnMenu = () => {
    setShowAddNewColumnMenu((prev) => !prev);
  };

  const scrollToRightRef = useRef();
  const scrollToLeftRef = useRef();

  const scrollToLeft = () => {
    if (!scrollToLeftRef.current) return;
    scrollToLeftRef.current.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  };

  const scrollToRight = () => {
    if (!scrollToRightRef.current) return;
    scrollToRightRef.current.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  };

  const currentBoardData = boards?.find(
    (board) => board.id === currentBoardId
  ).columns;

  return (
    <div className="scrollbar-thin scrollbar-track-neutral-900 scrollbar-thumb-primary-600 w-full min-h-full overflow-auto ">
      {/* pseudo element to scroll left */}
      <div ref={scrollToLeftRef} className="top-0 left-0 bg-danger-400"></div>
      <ScrollButtons
        scrollToLeft={scrollToLeft}
        scrollToRight={scrollToRight}
      />
      <div className=" min-h-full min-w-fit bg-neutral-700 dark:bg-primary-200 text-primary-100 dark:text-primary-500 p-4">
        {currentBoardData.length > 0 && (
          <div className="flex min-h-full  justify-start items-stretch">
            {/* boards */}
            <ColumnsList
              debugFunc={debugFunc}
              boards={boards}
              currentBoardId={currentBoardId}
              toggleDraggedTask={toggleDraggedTask}
              dropTask={dropTask}
              board={currentBoardData}
              openTaskViewWindow={openTaskViewWindow}
              draggedTask={draggedTask}
              draggedTaskColumn={draggedTaskColumn}
            />
            {/* ADD COL MENU  */}
            <div
              onClick={toggleAddNewColumnMenu}
              className="cursor-pointer min-w-[17rem] min-h-[100vh]  bg-neutral-500 dark:bg-primary-300 dark:bg-opacity-50 rounded-md ml-6 mr-6"
            >
              <h2 className="text-primary-500 w-fit relative left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                + New Column
              </h2>
            </div>
            {/* PSEUDO ELEMENT SCROLL TO RIGHT   */}
            <div
              ref={scrollToRightRef}
              className=" top-0 left-full w-1 h-1"
            ></div>
          </div>
        )}
        {currentBoardData.length === 0 && (
          <div className="fixed z-0 left-1/2 top-[50vh] -translate-x-1/2 -translate-y-full  w-[22rem] flex flex-col items-center p-4 space-y-4 text-primary-100 dark:text-neutral-900">
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
        )}
        {showAddNewColumnMenu && (
          <>
            <AddNewColumn
              currentBoardId={currentBoardId}
              boards={boards}
              handleColumnAdd={handleColumnAdd}
              closeFunction={toggleAddNewColumnMenu}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default BoardDisplayWindow;

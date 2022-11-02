import Board from "./Board";
import { v4 as uuid } from "uuid";

const BoardsList = ({
  boards,
  currentBoardId,
  changeCurrentBoard,
  toggleCreateNewBoardWindow,
  toggleSidebar,
}) => {
  const showCreateBoardWindow = () => {
    toggleCreateNewBoardWindow();
    toggleSidebar();
  };

  return (
    <div className="w-full pr-4 space-y-2">
      {boards.map((board) => (
        <Board
          key={board.id}
          currentBoardId={currentBoardId}
          changeCurrentBoard={changeCurrentBoard}
          boards={boards}
          boardId={board.id}
        />
      ))}
      <div
        onClick={showCreateBoardWindow}
        className="cursor-pointer flex items-center space-x-3 py-2 pl-4 text-primary-600 hover-hover:hover:text-primary-700 transition-all md:pl-10 md:hidden"
      >
        <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z"
            fill="currentColor"
          />
        </svg>
        <p>+Create New Board</p>
      </div>
      <div
        onClick={toggleCreateNewBoardWindow}
        className="hidden cursor-pointer  items-center space-x-3 py-2 pl-4 text-primary-600 hover-hover:hover:text-primary-700 transition-all md:pl-10 md:flex"
      >
        <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z"
            fill="currentColor"
          />
        </svg>
        <p>+Create New Board</p>
      </div>
    </div>
  );
};

export default BoardsList;

const Board = ({ boardId, currentBoardId, changeCurrentBoard, boards }) => {
  const isBoardCurrent = currentBoardId === boardId;

  return (
    <div
      onClick={() => changeCurrentBoard(boardId)}
      className={
        isBoardCurrent
          ? "cursor-pointer bg-primary-600 text-neutral-900 flex items-center space-x-3 rounded-r-full pl-4 py-4 font-semibold md:pl-10"
          : "cursor-pointer bg-neutral-900 text-primary-500 dark:bg-primary-300 dark:text-primary-500 flex items-center space-x-3 pl-4  py-4 font-semibold md:pl-10"
      }
    >
      <svg
        className={isBoardCurrent ? "board-icon-current" : ""}
        width="16"
        height="16"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z"
          fill="currentColor"
        />
      </svg>
      <p className="truncate w-[13rem] md:w-[11rem] pr-6">
        {boards.find((b) => b.id === boardId).name}
      </p>
    </div>
  );
};

export default Board;

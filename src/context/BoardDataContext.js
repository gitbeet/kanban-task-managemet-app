import { createContext, useContext, useEffect, useState } from "react";
import data from "../data.json";
import { v4 as uuid } from "uuid";
import { usePopUp } from "./PopUpContext";

const emptyBoard = {
  name: "",
  columns: [{ id: uuid(), name: "" }],
};

const boardsContext = createContext();

export function useBoardData() {
  const context = useContext(boardsContext);
  if (!context) throw new Error("No board data context was found");
  return context;
}

export default function BoardDataProvider({ children }) {
  const { viewedTask } = usePopUp();
  const [boards, setBoards] = useState(data.boards);
  const [currentBoard, setCurrentBoard] = useState(boards[0].name);
  const [statusList, setStatusList] = useState();
  const [newBoard, setNewBoard] = useState(emptyBoard);
  const [draggedTask, setDraggedTask] = useState();

  useEffect(() => {
    setStatusList(
      boards
        .find((board) => board.name === currentBoard)
        .columns.map((column) => column.name)
    );
  }, [currentBoard]);

  function changeCurrentBoard(board) {
    setCurrentBoard(board);
  }

  function handleChange(boardIndex, board) {
    const updatedBoard = [...boards];
    const index = updatedBoard.findIndex(
      (board, index) => index === boardIndex
    );
    updatedBoard[index] = board;
    setBoards(updatedBoard);
  }

  function dropTask(value, draggedTask) {
    let duplicateBoards = [...boards].map((board) => {
      return board.name === currentBoard
        ? {
            ...board,
            columns: board.columns.map((column) => {
              return column.name === value
                ? {
                    ...column,
                    tasks: column.tasks.map((task) => {
                      return task.title === draggedTask.title
                        ? { ...task, status: value }
                        : task;
                    }),
                  }
                : column;
            }),
          }
        : board;
    });
    duplicateBoards = [...boards].map((board) => {
      return board.name === currentBoard
        ? {
            ...board,
            columns: board.columns.map((column) => {
              return column.name === value
                ? { ...column, tasks: [...column.tasks, { ...draggedTask }] }
                : column;
            }),
          }
        : board;
    });
    setBoards(duplicateBoards);
    toggleDraggedTask(null);
  }

  function toggleDraggedTask(task) {
    setDraggedTask(task);
  }

  function toggleSubtaskCompleted(subtaskTitle) {
    const duplicateBoards = [...boards].map((board) => {
      return board.name === currentBoard
        ? {
            ...board,
            columns: board.columns.map((column) => {
              return column.name === viewedTask[1]
                ? {
                    ...column,
                    tasks: column.tasks.map((task) => {
                      return task.title === viewedTask[0]
                        ? {
                            ...task,
                            subtasks: task.subtasks.map((subtask) => {
                              return subtask.title === subtaskTitle
                                ? {
                                    ...subtask,
                                    isCompleted: !subtask.isCompleted,
                                  }
                                : subtask;
                            }),
                          }
                        : task;
                    }),
                  }
                : column;
            }),
          }
        : board;
    });
    setBoards(duplicateBoards);
    console.log(boards);
  }

  function handleChangeTaskStatus(value, task) {
    let duplicateBoards = [...boards].map((board) => {
      return board.name === currentBoard
        ? {
            ...board,
            columns: board.columns.map((column) => {
              return column.name === viewedTask[1]
                ? {
                    ...column,
                    tasks: column.tasks.map((task) => {
                      return task.title === viewedTask[0]
                        ? { ...task, status: value }
                        : task;
                    }),
                  }
                : column;
            }),
          }
        : board;
    });
    duplicateBoards = [...boards].map((board) => {
      return board.name === currentBoard
        ? {
            ...board,
            columns: board.columns.map((column) => {
              return column.name === value
                ? { ...column, tasks: [...column.tasks, { ...task }] }
                : column;
            }),
          }
        : board;
    });
    setBoards(duplicateBoards);
    console.log(boards);
  }

  function handleChangeTaskStatusClose() {
    let duplicateBoards = [...boards].map((board) => {
      return board.name === currentBoard
        ? {
            ...board,
            columns: board.columns.map((column) => {
              return column.name === viewedTask[1]
                ? {
                    ...column,
                    tasks: column.tasks.filter(
                      (t) => t.title !== viewedTask[0]
                    ),
                  }
                : column;
            }),
          }
        : board;
    });
    setBoards(duplicateBoards);
  }

  function handleChangeNewBoard(changes) {
    setNewBoard((prev) => {
      return { ...prev, ...changes };
    });
  }

  function createNewBoard() {
    setBoards((prev) => {
      return [...prev, { ...newBoard }];
    });
    setNewBoard(emptyBoard);
  }

  return (
    <boardsContext.Provider
      value={{
        currentBoard,
        boards,
        newBoard,
        handleChange,
        changeCurrentBoard,
        handleChangeNewBoard,
        createNewBoard,
        toggleSubtaskCompleted,
        handleChangeTaskStatus,
        statusList,
        handleChangeTaskStatusClose,
        dropTask,
        toggleDraggedTask,
        draggedTask,
      }}
    >
      {children}
    </boardsContext.Provider>
  );
}

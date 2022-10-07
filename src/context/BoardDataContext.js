import { createContext, useContext, useEffect, useState } from "react";
import data from "../data.json";
import { v4 as uuid } from "uuid";

const dataWithId = data.boards.map((board) => {
  return {
    ...board,
    id: uuid(),
    columns: board.columns.map((column) => {
      return {
        ...column,
        id: uuid(),
        tasks: column.tasks.map((task) => {
          return {
            ...task,
            id: uuid(),
            subtasks: task.subtasks.map((subtask) => {
              return { ...subtask, id: uuid() };
            }),
          };
        }),
      };
    }),
  };
});

const emptyTask = {
  id: uuid(),
  title: "",
  description: "",
  status: "Todo",
  subtasks: [
    {
      id: uuid(),
      title: "",
      isCompleted: false,
    },
    {
      id: uuid(),
      title: "",
      isCompleted: false,
    },
  ],
};

const boardsContext = createContext();

export function useBoardData() {
  const context = useContext(boardsContext);
  if (!context) throw new Error("No board data context was found");
  return context;
}

export default function BoardDataProvider({ children }) {
  const emptyBoard = {
    id: uuid(),
    name: "",
    columns: [{ id: uuid(), name: "" }],
  };

  const [boards, setBoards] = useState(dataWithId);
  const [currentBoard, setCurrentBoard] = useState(dataWithId[0].id);
  const [statusList, setStatusList] = useState();
  const [newBoard, setNewBoard] = useState(emptyBoard);

  const [draggedTask, setDraggedTask] = useState();
  const [draggedTaskColumn, setDraggedTaskColumn] = useState();

  const [viewedTask, setViewedTask] = useState(null);
  const [viewedTaskColumn, setviewedTaskColumn] = useState(null);
  const [viewedStatus, setViewedStatus] = useState();

  useEffect(() => {
    setStatusList(
      boards
        .find((board) => board.id === currentBoard)
        .columns.map((column) => column.name)
    );
  }, [currentBoard]);

  function assignViewedStatus(status) {
    setViewedStatus(status);
  }

  function assignNewBoard(board) {
    setNewBoard(board);
  }

  function emptyViewedTask() {
    setViewedTask(emptyTask);
  }

  function assignViewedTaskAndColumn(task, column) {
    setViewedTask(task);
    setviewedTaskColumn(column);
  }

  function handleCangeNewTask(type, change) {
    setViewedTask((prev) => {
      return { ...prev, ...change };
    });
  }

  function deleteTask() {
    setBoards((prev) => {
      return prev.map((board) => {
        return board.id === currentBoard
          ? {
              ...board,
              columns: board.columns.map((column) => {
                return column.name === viewedTaskColumn
                  ? {
                      ...column,
                      tasks: column.tasks.filter(
                        (task) => task.id !== viewedTask.id
                      ),
                    }
                  : column;
              }),
            }
          : board;
      });
    });
  }

  function deleteBoard() {
    if (boards.length < 2) return;
    const boardToDelete = currentBoard;
    const index = boards.findIndex((board) => board.id === currentBoard);
    setCurrentBoard(boards[index + 1].name || boards[index - 1].name || 0);
    setBoards((prev) => prev.filter((board) => board.name !== boardToDelete));
  }

  function createNewTask(type) {
    console.log(viewedTask.status);
    if (type === "new") {
      let duplicateBoards = [...boards].map((board) => {
        return board.id === currentBoard
          ? {
              ...board,
              columns: board.columns.map((column) => {
                return column.name === viewedTask.status
                  ? { ...column, tasks: [...column.tasks, viewedTask] }
                  : column;
              }),
            }
          : board;
      });
      setBoards(duplicateBoards);
      setViewedTask(emptyTask);
    }

    if (type === "edit") {
      if (viewedTask.status === viewedTaskColumn) {
        const duplicateBoards = [...boards].map((board) => {
          return board.id === currentBoard
            ? {
                ...board,
                columns: board.columns.map((column) => {
                  return column.name === viewedTask.status
                    ? {
                        ...column,
                        tasks: column.tasks.map((task) => {
                          return task.id === viewedTask.id ? viewedTask : task;
                        }),
                      }
                    : column;
                }),
              }
            : board;
        });
        setBoards(duplicateBoards);
      }

      if (viewedTask.status !== viewedTaskColumn) {
        const duplicateBoards = [...boards]
          .map((board) => {
            return board.id === currentBoard
              ? {
                  ...board,
                  columns: board.columns.map((column) => {
                    return column.name === viewedTask.status
                      ? {
                          ...column,
                          tasks: [...column.tasks, viewedTask],
                        }
                      : column;
                  }),
                }
              : board;
          })
          .map((board) => {
            return board.id === currentBoard
              ? {
                  ...board,
                  columns: board.columns.map((column) => {
                    return column.name === viewedTaskColumn
                      ? {
                          ...column,
                          tasks: column.tasks.filter((task) => {
                            return task.id !== viewedTask.id;
                          }),
                        }
                      : column;
                  }),
                }
              : board;
          });
        setBoards(duplicateBoards);
      }
    }
  }

  function changeCurrentBoard(board) {
    setCurrentBoard(board);
  }

  function assignDraggedTask(task) {
    setDraggedTask(task);
  }

  function dropTask(value) {
    if (draggedTaskColumn === value) return;

    const duplicateTask = { ...draggedTask };
    duplicateTask.status = value;

    let duplicateBoards = [...boards].map((board) => {
      return board.id === currentBoard
        ? {
            ...board,
            columns: board.columns.map((column) => {
              return column.name === value
                ? { ...column, tasks: [...column.tasks, { ...duplicateTask }] }
                : column;
            }),
          }
        : board;
    });

    duplicateBoards = [...duplicateBoards].map((board) => {
      return board.id === currentBoard
        ? {
            ...board,
            columns: board.columns.map((column) => {
              return column.name === draggedTaskColumn
                ? {
                    ...column,
                    tasks: column.tasks.filter(
                      (task) => task.title !== draggedTask.title
                    ),
                  }
                : column;
            }),
          }
        : board;
    });
    setBoards(duplicateBoards);
    toggleDraggedTask(null);
  }

  function toggleDraggedTask(task, column) {
    setDraggedTask(task);
    setDraggedTaskColumn(column);
    console.log("dragged task", draggedTask);
  }

  function toggleSubtaskCompleted(subtaskTitle) {
    setViewedTask((prev) => {
      return {
        ...prev,
        subtasks: prev.subtasks.map((subtask) => {
          return subtask.title === subtaskTitle
            ? { ...subtask, isCompleted: !subtask.isCompleted }
            : subtask;
        }),
      };
    });
    console.log(viewedTask);
  }

  function handleChangeTaskStatus(value) {
    setViewedStatus(value);
    setViewedTask((prev) => {
      return { ...prev, status: value };
    });
    console.log(viewedTask);
  }

  function handleChangeTaskStatusClose() {
    console.log(viewedTaskColumn, viewedStatus);
    if (viewedTaskColumn === viewedStatus) {
      let duplicateBoards = [...boards].map((board) => {
        return board.id === currentBoard
          ? {
              ...board,
              columns: board.columns.map((column) => {
                return column.name === viewedStatus
                  ? {
                      ...column,
                      tasks: column.tasks.map((task) => {
                        return task.title === viewedTask.title
                          ? viewedTask
                          : task;
                      }),
                    }
                  : column;
              }),
            }
          : board;
      });
      setBoards(duplicateBoards);
    } else {
      let duplicateBoards = [...boards].map((board) => {
        return board.id === currentBoard
          ? {
              ...board,
              columns: board.columns.map((column) => {
                return column.name === viewedStatus
                  ? {
                      ...column,
                      tasks: [...column.tasks, viewedTask],
                    }
                  : column;
              }),
            }
          : board;
      });
      duplicateBoards = [...duplicateBoards].map((board) => {
        return board.id === currentBoard
          ? {
              ...board,
              columns: board.columns.map((column) => {
                return column.name === viewedTaskColumn
                  ? {
                      ...column,
                      tasks: column.tasks.filter(
                        (task) => task.title !== viewedTask.title
                      ),
                    }
                  : column;
              }),
            }
          : board;
      });
      console.log("Hello");
      setBoards(duplicateBoards);
    }
  }

  function handleChangeNewBoard(changes) {
    setNewBoard((prev) => {
      return { ...prev, ...changes };
    });
  }

  function editBoard() {
    setBoards((prev) => {
      return prev.map((board) => {
        return board.id === currentBoard ? newBoard : board;
      });
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
        handleCangeNewTask,
        createNewTask,
        assignViewedTaskAndColumn,
        viewedTaskColumn,
        viewedTask,
        assignViewedStatus,
        assignDraggedTask,
        deleteTask,
        deleteBoard,
        emptyViewedTask,
        emptyBoard,
        assignNewBoard,
        editBoard,
      }}
    >
      {children}
    </boardsContext.Provider>
  );
}

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

const boardsContext = createContext();

export function useBoardData() {
  const context = useContext(boardsContext);
  if (!context) throw new Error("No board data context was found");
  return context;
}

export default function BoardDataProvider({ children }) {
  const [boards, setBoards] = useState(dataWithId);
  const [currentBoard, setCurrentBoard] = useState(dataWithId[0].id);
  const [statusList, setStatusList] = useState();
  const [newBoard, setNewBoard] = useState(spawnNewEmptyBoard());

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
  }, [currentBoard, boards]);

  // useEffect(() => {
  //   console.log(viewedTask);
  // });

  function handleColumnAdd(columnName) {
    let duplicateBoards = [...boards].map((board) => {
      return board.id === currentBoard
        ? {
            ...board,
            columns: [
              ...board.columns,
              { name: columnName, tasks: [], id: uuid() },
            ],
          }
        : board;
    });
    setBoards(duplicateBoards);
  }

  function assignViewedStatus(status) {
    setViewedStatus(status);
  }

  function assignNewBoard(board) {
    setNewBoard(board);
  }

  function spawnNewEmptyColumn() {
    return {
      id: uuid(),
      name: "",
      tasks: [],
    };
  }

  function spawnNewEmptyBoard() {
    return {
      id: uuid(),
      name: "",
      columns: [],
    };
  }

  function spawnNewEmptyTask() {
    return {
      id: uuid(),
      title: "",
      description: "",
      status: "",
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
  }

  function emptyViewedTask() {
    setViewedTask(spawnNewEmptyTask());
  }

  function assignViewedTaskAndColumn(task, column) {
    setViewedTask(task);
    setviewedTaskColumn(column);
  }

  function handleCangeNewTask(change) {
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
                return column.id === viewedTaskColumn
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
    setCurrentBoard(boards[index + 1].id || boards[index - 1].id || 0);
    setBoards((prev) => prev.filter((board) => board.id !== boardToDelete));
  }

  function createNewTask(type) {
    console.log(boards);
    console.log(viewedTask);

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
      setViewedTask(spawnNewEmptyTask());
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
    console.log(draggedTaskColumn, value);
    if (draggedTaskColumn === value) return;
    const duplicateTask = { ...draggedTask };
    duplicateTask.status = boards
      .find((board) => board.id === currentBoard)
      .columns.find((column) => column.id === value).name;
    console.log(duplicateTask.status);
    let duplicateBoards = [...boards].map((board) => {
      return board.id === currentBoard
        ? {
            ...board,
            columns: board.columns.map((column) => {
              return column.id === value
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
              return column.id === draggedTaskColumn
                ? {
                    ...column,
                    tasks: column.tasks.filter(
                      (task) => task.id !== draggedTask.id
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
  }

  function toggleSubtaskCompleted(id) {
    console.log(id);
    setViewedTask((prev) => {
      return {
        ...prev,
        subtasks: prev.subtasks.map((subtask) => {
          return subtask.id === id
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
    let viewedStatusId = boards
      .find((board) => board.id === currentBoard)
      .columns.find((column) => column.name === viewedStatus).id;
    console.log(viewedTask.id);
    console.log(viewedTaskColumn === viewedStatusId);
    if (viewedTaskColumn === viewedStatusId) {
      let duplicateBoards = [...boards].map((board) => {
        return board.id === currentBoard
          ? {
              ...board,
              columns: board.columns.map((column) => {
                return column.id === viewedStatusId
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
      setViewedTask(null);
    } else {
      let duplicateBoards = [...boards].map((board) => {
        return board.id === currentBoard
          ? {
              ...board,
              columns: board.columns.map((column) => {
                return column.id === viewedStatusId
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
                return column.id === viewedTaskColumn
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
    if (
      newBoard.columns.length !==
      new Set(newBoard.columns.map((column) => column.name)).size
    )
      return;

    setBoards((prev) => {
      return [...prev, { ...newBoard }];
    });
    setNewBoard(spawnNewEmptyBoard());
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
        assignNewBoard,
        editBoard,
        handleColumnAdd,
      }}
    >
      {children}
    </boardsContext.Provider>
  );
}

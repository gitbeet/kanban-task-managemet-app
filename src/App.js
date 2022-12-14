import Sidebar from "./components/Sidebar";
import Nav from "./components/Nav";
import CreateNewBoardWindow from "./components/CreateNewBoardWindow";
import BoardDisplayWindow from "./components/BoardDisplayWindow";
import TaskViewWindow from "./components/TaskViewWindow";
import AddNewTaskWindow from "./components/AddNewTaskWindow";
import DeleteWindow from "./components/DeleteWindow";
import { useDarkMode } from "./context/DarkModeContext";
import { useEffect, useState } from "react";
import useLocalStorage from "./hooks/useLocalStorage";
import { v4 as uuid } from "uuid";
import data from "./data.json";
import { generateColor } from "./utilities/generateColor";
import Button from "./components/Button";

const dataWithId = data.boards.map((board) => {
  return {
    ...board,
    id: uuid(),
    error: "",
    columns: board.columns.map((column) => {
      return {
        ...column,
        error: "",
        color: generateColor(),
        id: uuid(),
        tasks: column.tasks.map((task) => {
          return {
            ...task,
            id: uuid(),
            error: "",
            subtasks: task.subtasks.map((subtask) => {
              return { ...subtask, id: uuid(), error: "" };
            }),
          };
        }),
      };
    }),
  };
});

const App = () => {
  // const [boards, setBoards] = useLocalStorage("boards", dataWithId);
  const [boards, setBoards] = useState(dataWithId);

  const [currentBoardId, setCurrentBoard] = useState(boards[0].id);
  const [statusList, setStatusList] = useState();
  const [newBoard, setNewBoard] = useState(spawnNewEmptyBoard());

  const [draggedTask, setDraggedTask] = useState(null);
  const [draggedTaskColumn, setDraggedTaskColumn] = useState(null);

  const [viewedTask, setViewedTask] = useState(null);
  const [viewedTaskColumnId, setviewedTaskColumnId] = useState(null);

  useEffect(() => {
    if (!boards) return;
    setStatusList(
      boards
        .find((board) => board.id === currentBoardId)
        .columns.map((column) => column.name)
    );
  }, [currentBoardId, boards]);

  const handleColumnAdd = (columnName) => {
    let duplicateBoards = [...boards].map((board) => {
      return board.id === currentBoardId
        ? {
            ...board,
            columns: [
              ...board.columns,
              {
                name: columnName,
                tasks: [],
                id: uuid(),
                error: "",
                color: generateColor(),
              },
            ],
          }
        : board;
    });
    setBoards(duplicateBoards);
  };

  const assignNewBoard = (board) => {
    setNewBoard(board);
  };

  function spawnNewEmptyBoard() {
    return {
      id: uuid(),
      name: "",
      columns: [],
      error: "",
      columnError: "",
    };
  }

  const spawnNewEmptyTask = () => {
    return {
      id: uuid(),
      title: "",
      description: "",
      status: "",
      error: "",
      subtasks: [
        {
          id: uuid(),
          title: "",
          isCompleted: false,
          error: "",
        },
        {
          id: uuid(),
          title: "",
          isCompleted: false,
          error: "",
        },
      ],
    };
  };

  const emptyViewedTask = () => {
    setViewedTask(spawnNewEmptyTask());
  };

  const assignViewedTaskAndColumn = (task, column) => {
    setViewedTask(task);
    setviewedTaskColumnId(column);
  };

  const handleChangeNewTask = (change) => {
    setViewedTask((prev) => {
      return { ...prev, ...change };
    });
  };

  const deleteTask = () => {
    setBoards((prev) => {
      return prev.map((board) => {
        return board.id === currentBoardId
          ? {
              ...board,
              columns: board.columns.map((column) => {
                return column.id === viewedTaskColumnId
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
  };

  const deleteBoard = () => {
    if (boards.length < 2) return;
    const boardToDelete = currentBoardId;
    const index = boards.findIndex((board) => board.id === currentBoardId);
    setCurrentBoard(boards[index + 1]?.id || boards[index - 1].id);
    setBoards((prev) => prev.filter((board) => board.id !== boardToDelete));
  };

  const createNewTask = (type, taskToAdd) => {
    if (type === "new") {
      let duplicateBoards = [...boards].map((board) => {
        return board.id === currentBoardId
          ? {
              ...board,
              columns: board.columns.map((column) => {
                return column.name === taskToAdd.status
                  ? { ...column, tasks: [...column.tasks, taskToAdd] }
                  : column;
              }),
            }
          : board;
      });
      setBoards(duplicateBoards);
      setViewedTask(spawnNewEmptyTask());
    }

    if (type === "edit") {
      let isTaskStillInTheSameColumn =
        boards
          .find((board) => board.id === currentBoardId)
          .columns.find((column) => column.id === viewedTaskColumnId)
          .tasks.find((task) => task.id === taskToAdd.id).status ===
        taskToAdd.status;
      if (isTaskStillInTheSameColumn) {
        const duplicateBoards = [...boards].map((board) => {
          return board.id === currentBoardId
            ? {
                ...board,
                columns: board.columns.map((column) => {
                  return column.name === taskToAdd.status
                    ? {
                        ...column,
                        tasks: column.tasks.map((task) => {
                          return task.id === taskToAdd.id ? taskToAdd : task;
                        }),
                      }
                    : column;
                }),
              }
            : board;
        });
        setBoards(duplicateBoards);
      }
      if (!isTaskStillInTheSameColumn) {
        const duplicateBoards = [...boards]
          .map((board) => {
            return board.id === currentBoardId
              ? {
                  ...board,
                  columns: board.columns.map((column) => {
                    return column.name === taskToAdd.status
                      ? {
                          ...column,
                          tasks: [...column.tasks, taskToAdd],
                        }
                      : column;
                  }),
                }
              : board;
          })
          .map((board) => {
            return board.id === currentBoardId
              ? {
                  ...board,
                  columns: board.columns.map((column) => {
                    return column.id === viewedTaskColumnId
                      ? {
                          ...column,
                          tasks: column.tasks.filter((task) => {
                            return task.id !== taskToAdd.id;
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
  };

  const changeCurrentBoard = (board) => {
    setCurrentBoard(board);
  };

  function debugFunc() {
    console.log(draggedTask, draggedTaskColumn);
  }

  function dropTask(columnIdToDropTaskOn) {
    console.log(draggedTask, draggedTaskColumn);
    if (draggedTask == null) {
      return;
    }
    if (draggedTaskColumn === columnIdToDropTaskOn) return;
    const duplicateTask = { ...draggedTask };
    duplicateTask.status = boards
      .find((board) => board.id === currentBoardId)
      .columns.find((column) => column.id === columnIdToDropTaskOn).name;
    let duplicateBoards = [...boards].map((board) => {
      return board.id === currentBoardId
        ? {
            ...board,
            columns: board.columns.map((column) => {
              return column.id === columnIdToDropTaskOn
                ? { ...column, tasks: [...column.tasks, { ...duplicateTask }] }
                : column;
            }),
          }
        : board;
    });

    duplicateBoards = [...duplicateBoards].map((board) => {
      return board.id === currentBoardId
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
    toggleDraggedTask(null, null);
  }

  const toggleDraggedTask = (task, column) => {
    setDraggedTask((prev) => (prev = task));
    setDraggedTaskColumn((prev) => (prev = column));
  };

  const toggleSubtaskCompleted = (id) => {
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
  };

  const handleChangeTaskStatusClose = (taskToChange) => {
    let viewedStatusId = boards
      .find((board) => board.id === currentBoardId)
      .columns.find((column) => column.name === taskToChange.status).id;
    if (viewedTaskColumnId === viewedStatusId) {
      let duplicateBoards = [...boards].map((board) => {
        return board.id === currentBoardId
          ? {
              ...board,
              columns: board.columns.map((column) => {
                return column.id === viewedStatusId
                  ? {
                      ...column,
                      tasks: column.tasks.map((task) => {
                        return task.id === taskToChange.id
                          ? taskToChange
                          : task;
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
        return board.id === currentBoardId
          ? {
              ...board,
              columns: board.columns.map((column) => {
                return column.id === viewedStatusId
                  ? {
                      ...column,
                      tasks: [...column.tasks, taskToChange],
                    }
                  : column;
              }),
            }
          : board;
      });
      duplicateBoards = [...duplicateBoards].map((board) => {
        return board.id === currentBoardId
          ? {
              ...board,
              columns: board.columns.map((column) => {
                return column.id === viewedTaskColumnId
                  ? {
                      ...column,
                      tasks: column.tasks.filter(
                        (task) => task.id !== taskToChange.id
                      ),
                    }
                  : column;
              }),
            }
          : board;
      });
      setBoards(duplicateBoards);
    }
  };

  const editBoard = (EditedBoard) => {
    setBoards((prev) => {
      return prev.map((board) => {
        return board.id === currentBoardId ? EditedBoard : board;
      });
    });
  };

  const createNewBoard = (boardToAdd) => {
    if (
      boardToAdd.columns.length !==
      new Set(boardToAdd.columns.map((column) => column.name)).size
    )
      return;

    setBoards((prev) => {
      return [...prev, { ...boardToAdd }];
    });
    setNewBoard(spawnNewEmptyBoard());
  };

  const [showSidebar, setShowSidebar] = useState(false);
  const [showCreateNewBoardWindow, setShowCreateNewBoardWindow] =
    useState(false);
  const [showTaskViewWindow, setShowTaskViewWindow] = useState(false);
  const [showAddNewTaskWindow, setShowAddNewTaskWindow] = useState(false);
  const [showTaskEditWindow, setShowTaskEditWindow] = useState(false);
  const [showTaskDeleteWindow, setShowTaskDeleteWindow] = useState(false);
  const [showBoardDeleteWindow, setShowBoardDeleteWindow] = useState(false);
  const [showEditBoardWindow, setShowEditBoardWindow] = useState(false);

  const toggleEditBoardWindow = () => {
    setShowEditBoardWindow((prev) => !prev);
  };

  const toggleBoardDeleteWindow = () => {
    setShowBoardDeleteWindow((prev) => !prev);
  };

  const toggleTaskDeleteWindow = () => {
    setShowTaskDeleteWindow((prev) => !prev);
  };

  const openTaskEditWindow = () => {
    setShowTaskEditWindow(true);
    setShowTaskViewWindow(false);
  };

  const closeTaskEditWindow = () => {
    setShowTaskEditWindow(false);
  };

  const toggleAddNewTaskWindow = () => {
    setShowAddNewTaskWindow((prev) => !prev);
  };

  const toggleSidebar = () => {
    setShowSidebar((prev) => !prev);
  };

  const toggleCreateNewBoardWindow = () => {
    setShowCreateNewBoardWindow((prev) => !prev);
  };

  const openTaskViewWindow = (task, column) => {
    assignViewedTaskAndColumn(task, column);
    setShowTaskViewWindow(true);
  };

  const closeTaskViewWindow = () => {
    setShowTaskViewWindow(false);
  };

  const { darkMode } = useDarkMode();

  const deleteTaskFunc = () => {
    deleteTask();
    toggleTaskDeleteWindow();
    closeTaskViewWindow();
  };

  const deleteBoardFunc = () => {
    deleteBoard();
    toggleBoardDeleteWindow();
  };

  const SaveEditBoardChanges = (EditedBoard) => {
    editBoard(EditedBoard);
    toggleEditBoardWindow();
  };

  const saveAndCloseAddNewBoardWindow = (boardToAdd) => {
    createNewBoard(boardToAdd);
    toggleCreateNewBoardWindow();
  };

  return (
    <div
      className={
        darkMode
          ? "dark flex justify-center h-full min-w-full  items-stretch"
          : "flex justify-center h-full min-w-full  items-stretch "
      }
    >
      <div className="flex flex-col min-w-[100vw] h-full scrollbar-thin scrollbar-track-neutral-900 scrollbar-thumb-primary-600 ">
        <Nav
          boards={boards}
          currentBoardId={currentBoardId}
          emptyViewedTask={emptyViewedTask}
          assignNewBoard={assignNewBoard}
          toggleSidebar={toggleSidebar}
          toggleAddNewTaskWindow={toggleAddNewTaskWindow}
          toggleBoardDeleteWindow={toggleBoardDeleteWindow}
          toggleEditBoardWindow={toggleEditBoardWindow}
          showSidebar={showSidebar}
        />
        <div className="flex h-full md:h-[calc(100%-90px)]">
          {showSidebar && (
            <Sidebar
              currentBoardId={currentBoardId}
              changeCurrentBoard={changeCurrentBoard}
              boards={boards}
              toggleSidebar={toggleSidebar}
              toggleCreateNewBoardWindow={toggleCreateNewBoardWindow}
            />
          )}

          <BoardDisplayWindow
            debugFunc={debugFunc}
            toggleDraggedTask={toggleDraggedTask}
            dropTask={dropTask}
            currentBoardId={currentBoardId}
            boards={boards}
            handleColumnAdd={handleColumnAdd}
            openTaskViewWindow={openTaskViewWindow}
            draggedTask={draggedTask}
            draggedTaskColumn={draggedTaskColumn}
          />
        </div>
      </div>

      {showCreateNewBoardWindow && (
        <CreateNewBoardWindow
          newBoard={newBoard}
          changeCurrentBoard={changeCurrentBoard}
          assignNewBoard={assignNewBoard}
          spawnNewEmptyBoard={spawnNewEmptyBoard}
          header="Add New Board"
          closeFunction={toggleCreateNewBoardWindow}
          buttonText="Create New Board"
          submitFunction={saveAndCloseAddNewBoardWindow}
          disabled={newBoard.name.length === 0}
        />
      )}
      {showEditBoardWindow && (
        <CreateNewBoardWindow
          newBoard={newBoard}
          changeCurrentBoard={changeCurrentBoard}
          assignNewBoard={assignNewBoard}
          spawnNewEmptyBoard={spawnNewEmptyBoard}
          header="Edit Board"
          buttonText="Save Changes"
          submitFunction={SaveEditBoardChanges}
          closeFunction={toggleEditBoardWindow}
        />
      )}
      {showTaskViewWindow && (
        <TaskViewWindow
          statusList={statusList}
          toggleSubtaskCompleted={toggleSubtaskCompleted}
          closeTaskViewWindow={closeTaskViewWindow}
          openTaskEditWindow={openTaskEditWindow}
          toggleTaskDeleteWindow={toggleTaskDeleteWindow}
          viewedTask={viewedTask}
          handleChangeTaskStatusClose={handleChangeTaskStatusClose}
        />
      )}
      {showAddNewTaskWindow && (
        <AddNewTaskWindow
          statusList={statusList}
          currentBoardId={currentBoardId}
          boards={boards}
          handleChangeNewTask={handleChangeNewTask}
          viewedTask={viewedTask}
          header="Add New Task"
          task={viewedTask}
          type="new"
          closeFunction={toggleAddNewTaskWindow}
          buttonText="Create Task"
          createTaskFunc={createNewTask}
        />
      )}
      {showTaskEditWindow && (
        <AddNewTaskWindow
          statusList={statusList}
          handleChangeNewTask={handleChangeNewTask}
          viewedTask={viewedTask}
          header="Edit Task"
          task={viewedTask}
          type="edit"
          closeFunction={closeTaskEditWindow}
          buttonText="Save Changes"
          createTaskFunc={createNewTask}
        />
      )}
      {showTaskDeleteWindow && (
        <DeleteWindow
          boards={boards}
          viewedTask={viewedTask}
          viewedTaskColumnId={viewedTaskColumnId}
          currentBoardId={currentBoardId}
          onDelete={deleteTaskFunc}
          onCancel={toggleTaskDeleteWindow}
          name={viewedTask.id}
          type="task"
          message=" and its subtasks? This action cannot be reversed."
        />
      )}
      {showBoardDeleteWindow && (
        <DeleteWindow
          boards={boards}
          viewedTask={viewedTask}
          viewedTaskColumnId={viewedTaskColumnId}
          currentBoardId={currentBoardId}
          onDelete={deleteBoardFunc}
          onCancel={toggleBoardDeleteWindow}
          name={currentBoardId}
          type="board"
          message="? This action will remove all columns and tasks and cannot be reversed."
        />
      )}
    </div>
  );
};

export default App;

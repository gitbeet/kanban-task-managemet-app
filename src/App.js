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

const dataWithId = data.boards.map((board) => {
  return {
    ...board,
    id: uuid(),
    error: "",
    columns: board.columns.map((column) => {
      return {
        ...column,
        error: "",
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

function App() {
  const [boards, setBoards] = useLocalStorage("boards", dataWithId);
  const [currentBoardId, setCurrentBoard] = useState(boards[0].id);
  const [statusList, setStatusList] = useState();
  const [newBoard, setNewBoard] = useState(spawnNewEmptyBoard());

  const [draggedTask, setDraggedTask] = useState();
  const [draggedTaskColumn, setDraggedTaskColumn] = useState();

  const [viewedTask, setViewedTask] = useState(null);
  const [viewedTaskColumn, setviewedTaskColumn] = useState(null);
  const [viewedStatus, setViewedStatus] = useState();

  useEffect(() => {
    if (!boards) return;
    setStatusList(
      boards
        .find((board) => board.id === currentBoardId)
        .columns.map((column) => column.name)
    );
  }, [currentBoardId, boards]);

  function handleColumnAdd(columnName) {
    let duplicateBoards = [...boards].map((board) => {
      return board.id === currentBoardId
        ? {
            ...board,
            columns: [
              ...board.columns,
              { name: columnName, tasks: [], id: uuid(), error: "" },
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

  function spawnNewEmptyBoard() {
    return {
      id: uuid(),
      name: "",
      columns: [],
      error: "",
      columnError: "",
    };
  }

  function spawnNewEmptyTask() {
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
  }

  function emptyViewedTask() {
    setViewedTask(spawnNewEmptyTask());
  }

  function assignViewedTaskAndColumn(task, column) {
    setViewedTask(task);
    setviewedTaskColumn(column);
  }

  function handleChangeNewTask(change) {
    setViewedTask((prev) => {
      return { ...prev, ...change };
    });
  }

  function deleteTask() {
    setBoards((prev) => {
      return prev.map((board) => {
        return board.id === currentBoardId
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
    const boardToDelete = currentBoardId;
    const index = boards.findIndex((board) => board.id === currentBoardId);
    setCurrentBoard(boards[index + 1]?.id || boards[index - 1].id);
    setBoards((prev) => prev.filter((board) => board.id !== boardToDelete));
  }

  function createNewTask(type, taskToAdd) {
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
          .columns.find((column) => column.id === viewedTaskColumn)
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
                    return column.id === viewedTaskColumn
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
    duplicateTask.status = boards
      .find((board) => board.id === currentBoardId)
      .columns.find((column) => column.id === value).name;
    let duplicateBoards = [...boards].map((board) => {
      return board.id === currentBoardId
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
    toggleDraggedTask(null);
  }

  function toggleDraggedTask(task, column) {
    setDraggedTask(task);
    setDraggedTaskColumn(column);
  }

  function toggleSubtaskCompleted(id) {
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
  }

  function handleChangeTaskStatus(value) {
    setViewedStatus(value);
    setViewedTask((prev) => {
      return { ...prev, status: value };
    });
  }

  function handleChangeTaskStatusClose() {
    let viewedStatusId = boards
      .find((board) => board.id === currentBoardId)
      .columns.find((column) => column.name === viewedStatus).id;
    if (viewedTaskColumn === viewedStatusId) {
      let duplicateBoards = [...boards].map((board) => {
        return board.id === currentBoardId
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
        return board.id === currentBoardId
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
        return board.id === currentBoardId
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
        return board.id === currentBoardId ? newBoard : board;
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

  const [showSidebar, setShowSidebar] = useState(false);
  const [showCreateNewBoardWindow, setShowCreateNewBoardWindow] =
    useState(false);
  const [showTaskViewWindow, setShowTaskViewWindow] = useState(false);
  const [showAddNewTaskWindow, setShowAddNewTaskWindow] = useState(false);
  const [showTaskEditWindow, setShowTaskEditWindow] = useState(false);
  const [showTaskDeleteWindow, setShowTaskDeleteWindow] = useState(false);
  const [showBoardDeleteWindow, setShowBoardDeleteWindow] = useState(false);
  const [showEditBoardWindow, setShowEditBoardWindow] = useState(false);

  function toggleEditBoardWindow() {
    setShowEditBoardWindow((prev) => !prev);
  }

  function toggleBoardDeleteWindow() {
    setShowBoardDeleteWindow((prev) => !prev);
  }

  function toggleTaskDeleteWindow() {
    setShowTaskDeleteWindow((prev) => !prev);
  }

  function openTaskEditWindow() {
    setShowTaskEditWindow(true);
    setShowTaskViewWindow(false);
  }

  function closeTaskEditWindow() {
    setShowTaskEditWindow(false);
  }

  function toggleAddNewTaskWindow() {
    setShowAddNewTaskWindow((prev) => !prev);
  }

  function toggleSidebar() {
    setShowSidebar((prev) => !prev);
  }

  function toggleCreateNewBoardWindow() {
    setShowCreateNewBoardWindow((prev) => !prev);
  }

  function openTaskViewWindow(task, column) {
    assignViewedTaskAndColumn(task, column);
    assignViewedStatus(task.status);
    setShowTaskViewWindow(true);
  }

  function closeTaskViewWindow() {
    setShowTaskViewWindow(false);
  }

  const { darkMode } = useDarkMode();

  function deleteTaskFunc() {
    deleteTask();
    toggleTaskDeleteWindow();
    closeTaskViewWindow();
  }

  function deleteBoardFunc() {
    deleteBoard();
    toggleBoardDeleteWindow();
  }

  function SaveEditBoardChanges() {
    editBoard();
    toggleEditBoardWindow();
  }

  function saveAndCloseAddNewBoardWindow() {
    createNewBoard();
    toggleCreateNewBoardWindow();
  }

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
            toggleDraggedTask={toggleDraggedTask}
            dropTask={dropTask}
            currentBoardId={currentBoardId}
            boards={boards}
            handleColumnAdd={handleColumnAdd}
            openTaskViewWindow={openTaskViewWindow}
          />
        </div>
      </div>

      {showCreateNewBoardWindow && (
        <CreateNewBoardWindow
          newBoard={newBoard}
          handleChangeNewBoard={handleChangeNewBoard}
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
          handleChangeNewBoard={handleChangeNewBoard}
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
          handleChangeTaskStatus={handleChangeTaskStatus}
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
          viewedTaskColumn={viewedTaskColumn}
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
          viewedTaskColumn={viewedTaskColumn}
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
}

export default App;

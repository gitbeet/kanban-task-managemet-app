import { createContext, useContext, useEffect, useState } from "react";
import data from "../data.json";
import { v4 as uuid } from "uuid";
import { usePopUp } from "./PopUpContext";

const emptyBoard = {
  name: "",
  columns: [{ id: uuid(), name: "" }],
};

const emptyTask = {
  title: "",
  description: "",
  status: "",
  subtasks: [
    {
      title: "",
      isCompleted: false,
    },
    {
      title: "",
      isCompleted: false,
    },
  ],
};

const emptySubtask = {
  title: "",
  isCompleted: false,
};

const boardsContext = createContext();

export function useBoardData() {
  const context = useContext(boardsContext);
  if (!context) throw new Error("No board data context was found");
  return context;
}

export default function BoardDataProvider({ children }) {
  const [boards, setBoards] = useState(data.boards);
  const [currentBoard, setCurrentBoard] = useState(boards[0].name);
  const [statusList, setStatusList] = useState();
  const [newBoard, setNewBoard] = useState(emptyBoard);
  const [draggedTask, setDraggedTask] = useState();
  const [draggedTaskColumn, setDraggedTaskColumn] = useState();
  const [newTask, setNewTask] = useState(emptyTask);

  const [viewedTask, setViewedTask] = useState(null);
  const [viewedTaskColumn, setviewedTaskColumn] = useState(null);
  const [viewedStatus, setViewedStatus] = useState();

  useEffect(() => {
    setStatusList(
      boards
        .find((board) => board.name === currentBoard)
        .columns.map((column) => column.name)
    );
  }, [currentBoard]);

  function assignViewedStatus(status) {
    setViewedStatus(status);
  }

  function assignViewedTaskAndColumn(task, column) {
    setViewedTask(task);
    setviewedTaskColumn(column);
  }

  function handleCangeNewTask(type, change) {
    console.log(type);
    console.log(change);
    if (type === "new") {
      setNewTask((prev) => {
        return { ...prev, ...change };
      });
    }
    if (type === "edit") {
      setViewedTask((prev) => {
        return { ...prev, ...change };
      });
    }
  }

  function handleChangeNewTaskSubtasks(id, changes) {
    setNewTask((prev) => {
      return {
        ...prev,
        subtasks: prev.subtasks.map((subtask, index) => {
          return index === id ? { ...subtask, ...changes } : subtask;
        }),
      };
    });
    console.log(newTask);
  }

  function createNewTask() {
    const duplicateBoards = [...boards].map((board) => {
      return board.name === currentBoard
        ? {
            ...board,
            columns: board.columns.map((column) => {
              return column.name === newTask.status
                ? { ...column, tasks: [...column.tasks, newTask] }
                : column;
            }),
          }
        : board;
    });
    setBoards(duplicateBoards);
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
      return board.name === currentBoard
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
      return board.name === currentBoard
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
        return board.name === currentBoard
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
        return board.name === currentBoard
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
        return board.name === currentBoard
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
        newTask,
        handleCangeNewTask,
        handleChangeNewTaskSubtasks,
        createNewTask,
        assignViewedTaskAndColumn,
        viewedTaskColumn,
        viewedTask,
        assignViewedStatus,
        assignDraggedTask,
      }}
    >
      {children}
    </boardsContext.Provider>
  );
}

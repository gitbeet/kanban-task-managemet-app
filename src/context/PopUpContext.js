import { createContext, useContext, useState } from "react";
import { useBoardData } from "./BoardDataContext";

const popUpcontext = createContext();

export function usePopUp() {
  const context = useContext(popUpcontext);
  if (!context) throw new Error("No PopUp context was found");
  return context;
}

export default function PopUpProvider({ children }) {
  const { assignViewedTaskAndColumn, assignViewedStatus } = useBoardData();

  const [showSidebar, setShowSidebar] = useState(false);
  const [showCreateNewBoardWindow, setShowCreateNewBoardWindow] =
    useState(false);
  const [showTaskViewWindow, setShowTaskViewWindow] = useState(false);
  const [showAddNewTaskWindow, setShowAddNewTaskWindow] = useState(false);
  const [showTaskEditWindow, setShowTaskEditWindow] = useState(false);

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

  return (
    <popUpcontext.Provider
      value={{
        showSidebar,
        toggleSidebar,
        showCreateNewBoardWindow,
        toggleCreateNewBoardWindow,
        showTaskViewWindow,
        openTaskViewWindow,
        closeTaskViewWindow,
        toggleAddNewTaskWindow,
        showAddNewTaskWindow,
        openTaskEditWindow,
        showTaskEditWindow,
        closeTaskEditWindow,
      }}
    >
      {children}
    </popUpcontext.Provider>
  );
}

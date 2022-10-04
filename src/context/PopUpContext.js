import { createContext, useContext, useState } from "react";

const popUpcontext = createContext();

export function usePopUp() {
  const context = useContext(popUpcontext);
  if (!context) throw new Error("No PopUp context was found");
  return context;
}

export default function PopUpProvider({ children }) {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showCreateNewBoardWindow, setShowCreateNewBoardWindow] =
    useState(false);
  const [showTaskViewWindow, setShowTaskViewWindow] = useState(false);
  const [viewedTask, setViewedTask] = useState();

  function toggleSidebar() {
    setShowSidebar((prev) => !prev);
  }

  function toggleCreateNewBoardWindow() {
    setShowCreateNewBoardWindow((prev) => !prev);
  }

  function openTaskViewWindow(task, column) {
    setViewedTask([task, column]);
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
        viewedTask,
      }}
    >
      {children}
    </popUpcontext.Provider>
  );
}

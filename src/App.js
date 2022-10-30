import Sidebar from "./components/Sidebar";
import Nav from "./components/Nav";
import { usePopUp } from "./context/PopUpContext";
import CreateNewBoardWindow from "./components/CreateNewBoardWindow";
import BoardDisplayWindow from "./components/BoardDisplayWindow";
import TaskViewWindow from "./components/TaskViewWindow";
import AddNewTaskWindow from "./components/AddNewTaskWindow";
import DeleteWindow from "./components/DeleteWindow";
import { useBoardData } from "./context/BoardDataContext";
import { useDarkMode } from "./context/DarkModeContext";

function App() {
  const { darkMode } = useDarkMode();

  const {
    showSidebar,
    showCreateNewBoardWindow,
    showTaskViewWindow,
    showAddNewTaskWindow,
    showTaskEditWindow,
    showTaskDeleteWindow,
    showBoardDeleteWindow,
    toggleBoardDeleteWindow,
    toggleTaskDeleteWindow,
    closeTaskViewWindow,
    showEditBoardWindow,
    toggleAddNewTaskWindow,
    closeTaskEditWindow,
    toggleCreateNewBoardWindow,
    toggleEditBoardWindow,
  } = usePopUp();

  const {
    viewedTask,
    deleteTask,
    deleteBoard,
    currentBoardId,
    createNewTask,
    createNewBoard,
    editBoard,
    newBoard,
  } = useBoardData();
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
        <Nav />
        <div className="flex h-full md:h-[calc(100%-90px)]">
          {showSidebar && <Sidebar />}
          <BoardDisplayWindow />
        </div>
      </div>

      {/* CREATE / EDIT BOARD */}
      {showCreateNewBoardWindow && (
        <CreateNewBoardWindow
          header="Add New Board"
          closeFunction={toggleCreateNewBoardWindow}
          buttonText="Create New Board"
          submitFunction={saveAndCloseAddNewBoardWindow}
          disabled={newBoard.name.length === 0}
        />
      )}
      {showEditBoardWindow && (
        <CreateNewBoardWindow
          header="Edit Board"
          buttonText="Save Changes"
          submitFunction={SaveEditBoardChanges}
          closeFunction={toggleEditBoardWindow}
        />
      )}
      {showTaskViewWindow && <TaskViewWindow />}
      {showAddNewTaskWindow && (
        <AddNewTaskWindow
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
          onDelete={deleteTaskFunc}
          onCancel={toggleTaskDeleteWindow}
          name={viewedTask.id}
          type="task"
          message=" and its subtasks? This action cannot be reversed."
        />
      )}
      {showBoardDeleteWindow && (
        <DeleteWindow
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

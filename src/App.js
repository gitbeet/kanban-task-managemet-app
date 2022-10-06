import "./css/App.css";
import Sidebar from "./components/Sidebar";
import Nav from "./components/Nav";
import { usePopUp } from "./context/PopUpContext";
import CreateNewBoardWindow from "./components/CreateNewBoardWindow";
import BoardDisplayWindow from "./components/BoardDisplayWindow";
import TaskViewWindow from "./components/TaskViewWindow";
import AddNewTaskWindow from "./components/AddNewTaskWindow";
import DeleteWindow from "./components/DeleteWindow";
import { useBoardData } from "./context/BoardDataContext";

function App() {
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
  } = usePopUp();

  const { deleteTask, deleteBoard, viewedTask, currentBoard } = useBoardData();

  function deleteTaskFunc() {
    deleteTask();
    toggleTaskDeleteWindow();
    closeTaskViewWindow();
  }

  function deleteBoardFunc() {
    deleteBoard();
    toggleBoardDeleteWindow();
  }

  return (
    <div>
      <Nav />
      {showSidebar && <Sidebar />}
      {showCreateNewBoardWindow && <CreateNewBoardWindow />}
      {showTaskViewWindow && <TaskViewWindow />}
      {showAddNewTaskWindow && <AddNewTaskWindow type="new" />}
      {showTaskEditWindow && <AddNewTaskWindow type="edit" />}
      {showTaskDeleteWindow && (
        <DeleteWindow
          onDelete={deleteTaskFunc}
          onCancel={toggleTaskDeleteWindow}
          name={viewedTask.title}
          type="task"
          message=" and its subtasks? This action cannot be reversed."
        />
      )}
      {showBoardDeleteWindow && (
        <DeleteWindow
          onDelete={deleteBoardFunc}
          onCancel={toggleBoardDeleteWindow}
          name={currentBoard}
          type="board"
          message="? This action will remove all columns and tasks and cannot be reversed."
        />
      )}
      <BoardDisplayWindow />
    </div>
  );
}

export default App;

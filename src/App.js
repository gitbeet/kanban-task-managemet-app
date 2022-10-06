import "./css/App.css";
import Sidebar from "./components/Sidebar";
import Nav from "./components/Nav";
import { usePopUp } from "./context/PopUpContext";
import CreateNewBoardWindow from "./components/CreateNewBoardWindow";
import BoardDisplayWindow from "./components/BoardDisplayWindow";
import TaskViewWindow from "./components/TaskViewWindow";
import AddNewTaskWindow from "./components/AddNewTaskWindow";
import DeleteWindow from "./components/DeleteWindow";

function App() {
  const {
    showSidebar,
    showCreateNewBoardWindow,
    showTaskViewWindow,
    showAddNewTaskWindow,
    showTaskEditWindow,
    showTaskDeleteWindow,
    toggleTaskDeleteWindow,
  } = usePopUp();

  return (
    <div>
      <Nav />
      {showSidebar && <Sidebar />}
      {showCreateNewBoardWindow && <CreateNewBoardWindow />}
      {showTaskViewWindow && <TaskViewWindow />}
      {showAddNewTaskWindow && <AddNewTaskWindow type="new" />}
      {showTaskEditWindow && <AddNewTaskWindow type="edit" />}
      {showTaskDeleteWindow && <DeleteWindow type="task" />}
      <BoardDisplayWindow />
    </div>
  );
}

export default App;

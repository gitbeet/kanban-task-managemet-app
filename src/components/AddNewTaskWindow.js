import { usePopUp } from "../context/PopUpContext";
import Backdrop from "./Backdrop";
import "../css/AddNewTaskWindow.css";
import EditSubtask from "./EditSubtask";
import EditStatus from "./EditStatus";
import { useBoardData } from "../context/BoardDataContext";

export default function AddNewTaskWindow() {
  const { toggleAddNewTaskWindow } = usePopUp();
  const { newTask, statusList, handleCangeNewTask, createNewTask } =
    useBoardData();

  function handleSubtaskAdd() {
    handleCangeNewTask({
      subtasks: [
        ...newTask.subtasks,
        {
          title: "",
          isCompleted: false,
        },
      ],
    });
  }

  function handleSubtaskDelete(id) {
    handleCangeNewTask({
      subtasks: newTask.subtasks.filter((subtask, index) => index !== id),
    });
  }

  function createTask() {
    createNewTask();
    toggleAddNewTaskWindow();
  }

  return (
    <>
      <div className="add-new-task-window">
        <div>Add New Task</div>
        <label htmlFor="title">Title</label>
        <input
          value={newTask.title}
          onChange={(e) => handleCangeNewTask({ title: e.target.value })}
          name="title"
        />
        <label htmlFor="description">Description</label>
        <textarea
          onChange={(e) => handleCangeNewTask({ description: e.target.value })}
          value={newTask.description}
          name="description"
        />
        {newTask.subtasks.map((subtask, index) => {
          return (
            <EditSubtask
              handleSubtaskDelete={handleSubtaskDelete}
              key={index}
              id={index}
              subtask={subtask}
            />
          );
        })}
        <button onClick={handleSubtaskAdd} className="btn-secondary-sm">
          Add New Subtask
        </button>
        <EditStatus options={statusList} />
        <button onClick={createTask} className="btn-primary-sm">
          Create Task
        </button>
      </div>

      <Backdrop clickFunction={toggleAddNewTaskWindow} />
    </>
  );
}

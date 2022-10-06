import { usePopUp } from "../context/PopUpContext";
import Backdrop from "./Backdrop";
import "../css/AddNewTaskWindow.css";
import EditSubtask from "./EditSubtask";
import EditStatus from "./EditStatus";
import { useBoardData } from "../context/BoardDataContext";

export default function AddNewTaskWindow({ type }) {
  const { toggleAddNewTaskWindow, closeTaskEditWindow } = usePopUp();
  const { newTask, viewedTask, handleCangeNewTask, createNewTask } =
    useBoardData();

  function handleSubtaskAdd() {
    handleCangeNewTask(type, {
      subtasks: [
        ...newTask.subtasks,
        {
          title: "",
          isCompleted: false,
        },
      ],
    });
  }

  function handleEditSubtaskAdd() {
    handleCangeNewTask(type, {
      subtasks: [
        ...viewedTask.subtasks,
        {
          title: "",
          isCompleted: false,
        },
      ],
    });
  }

  function handleSubtaskDelete(id) {
    handleCangeNewTask(type, {
      subtasks: newTask.subtasks.filter((subtask, index) => index !== id),
    });
  }

  function handleEditSubtaskDelete(id) {
    handleCangeNewTask(type, {
      subtasks: viewedTask.subtasks.filter((subtask, index) => index !== id),
    });
  }

  function createTask() {
    createNewTask(type);
    toggleAddNewTaskWindow();
  }

  function saveChanges() {
    createNewTask(type);
    closeTaskEditWindow();
  }

  return (
    <>
      <div className="add-new-task-window">
        <div>{type === "edit" ? "Edit Task" : "Add New Task"}</div>
        <label htmlFor="title">Title</label>
        <input
          value={type === "edit" ? viewedTask.title : newTask.title}
          onChange={(e) => handleCangeNewTask(type, { title: e.target.value })}
          name="title"
        />
        <label htmlFor="description">Description</label>
        <textarea
          onChange={(e) =>
            handleCangeNewTask(type, { description: e.target.value })
          }
          value={type === "edit" ? viewedTask.description : newTask.description}
          name="description"
        />
        {type === "edit"
          ? viewedTask.subtasks.map((subtask, index) => {
              return (
                <EditSubtask
                  handleSubtaskDelete={handleEditSubtaskDelete}
                  key={subtask.id}
                  subtask={subtask}
                  type={type}
                />
              );
            })
          : newTask.subtasks.map((subtask) => {
              return (
                <EditSubtask
                  handleSubtaskDelete={handleSubtaskDelete}
                  key={subtask.id}
                  subtask={subtask}
                  type={type}
                />
              );
            })}
        <button
          onClick={type === "edit" ? handleEditSubtaskAdd : handleSubtaskAdd}
          className="btn-secondary-sm"
        >
          Add New Subtask
        </button>
        <EditStatus type={type} />
        <button
          onClick={type === "edit" ? saveChanges : createTask}
          className="btn-primary-sm"
        >
          {type === "edit" ? "Save Changes" : "Create Task"}
        </button>
      </div>

      <Backdrop
        clickFunction={type === "edit" ? () => {} : toggleAddNewTaskWindow}
      />
    </>
  );
}

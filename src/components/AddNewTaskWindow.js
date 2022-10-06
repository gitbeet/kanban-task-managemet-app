import { usePopUp } from "../context/PopUpContext";
import Backdrop from "./Backdrop";
import "../css/AddNewTaskWindow.css";
import EditSubtask from "./EditSubtask";
import EditStatus from "./EditStatus";
import { useBoardData } from "../context/BoardDataContext";

export default function AddNewTaskWindow({ type = "add" }) {
  const { toggleAddNewTaskWindow } = usePopUp();
  const { newTask, statusList, handleCangeNewTask, createNewTask, viewedTask } =
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
    createNewTask();
    toggleAddNewTaskWindow();
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
                  key={index}
                  id={index}
                  subtask={subtask}
                />
              );
            })
          : newTask.subtasks.map((subtask, index) => {
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
        <EditStatus type={type} options={statusList} />
        <button onClick={createTask} className="btn-primary-sm">
          {type === "edit" ? "Save Changes" : "Create Task"}
        </button>
      </div>

      <Backdrop
        clickFunction={type === "edit" ? () => {} : toggleAddNewTaskWindow}
      />
    </>
  );
}

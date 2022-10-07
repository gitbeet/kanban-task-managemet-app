import { usePopUp } from "../context/PopUpContext";
import Backdrop from "./Backdrop";
import "../css/AddNewTaskWindow.css";
import EditSubtask from "./EditSubtask";
import EditStatus from "./EditStatus";
import { useBoardData } from "../context/BoardDataContext";
import { v4 as uuid } from "uuid";

export default function AddNewTaskWindow({
  buttonText,
  type,
  header,
  task,
  closeFunction,
  createTaskFunc,
}) {
  const { handleCangeNewTask } = useBoardData();

  function handleSubtaskAdd() {
    handleCangeNewTask({
      subtasks: [
        ...task.subtasks,
        {
          id: uuid(),
          title: "",
          isCompleted: false,
        },
      ],
    });
  }
  // Check code
  function handleSubtaskDelete(id) {
    handleCangeNewTask({
      subtasks: task.subtasks.filter((subtask, index) => index !== id),
    });
  }

  function saveChanges() {
    createTaskFunc(type);
    closeFunction();
  }

  return (
    <>
      <div className="add-new-task-window">
        <div>{header}</div>
        <label htmlFor="title">Title</label>
        <input
          value={task.title}
          onChange={(e) => handleCangeNewTask({ title: e.target.value })}
          name="title"
        />
        <label htmlFor="description">Description</label>
        <textarea
          onChange={(e) => handleCangeNewTask({ description: e.target.value })}
          value={task.description}
          name="description"
        />
        {task.subtasks.map((subtask) => {
          return (
            <EditSubtask
              handleSubtaskDelete={handleSubtaskDelete}
              key={subtask.id}
              subtask={subtask}
              type={type}
            />
          );
        })}
        <button onClick={handleSubtaskAdd} className="btn-secondary-sm">
          Add New Subtask
        </button>
        <EditStatus type={type} />
        <button onClick={saveChanges} className="btn-primary-sm">
          {buttonText}
        </button>
      </div>

      <Backdrop clickFunction={closeFunction} />
    </>
  );
}

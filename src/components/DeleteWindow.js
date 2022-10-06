import { useBoardData } from "../context/BoardDataContext";
import { usePopUp } from "../context/PopUpContext";

export default function DeleteWindow() {
  const { viewedTask, deleteTask } = useBoardData();
  const { toggleTaskDeleteWindow, closeTaskViewWindow } = usePopUp();

  function deleteTaskFunc() {
    deleteTask();
    toggleTaskDeleteWindow();
    closeTaskViewWindow();
  }

  return (
    <div className="add-new-task-window">
      <div>Delete this task?</div>
      <div>
        Are you sure you want to delete the ‘{viewedTask.title}’ task and its
        subtasks? This action cannot be reversed.
      </div>
      <button onClick={deleteTaskFunc} className="btn-danger-sm">
        Delete
      </button>
      <button onClick={toggleTaskDeleteWindow} className="btn-secondary-sm">
        Cancel
      </button>
    </div>
  );
}

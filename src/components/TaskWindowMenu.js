import { usePopUp } from "../context/PopUpContext";

export default function TaskWindowMenu() {
  const { openTaskEditWindow, toggleTaskDeleteWindow } = usePopUp();

  return (
    <div className="task-view-menu">
      <div onClick={openTaskEditWindow}>Edit</div>
      <div onClick={toggleTaskDeleteWindow}>Delete</div>
    </div>
  );
}

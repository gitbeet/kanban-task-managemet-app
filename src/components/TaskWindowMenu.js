import { usePopUp } from "../context/PopUpContext";

export default function TaskWindowMenu() {
  const { openTaskEditWindow } = usePopUp();

  return (
    <div className="task-view-menu">
      <div onClick={openTaskEditWindow}>Edit</div>
      <div>Delete</div>
    </div>
  );
}

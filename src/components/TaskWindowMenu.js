import Backdrop from "./Backdrop";
import * as ReactDOM from "react-dom";
import { useDarkMode } from "../context/DarkModeContext";

export default function TaskWindowMenu({
  onEdit,
  onDelete,
  onClose,
  onDisable = false,
  show,
  backdropOpacity,
  position,
}) {
  const { darkMode } = useDarkMode();
  return ReactDOM.createPortal(
    <>
      <div className={`${darkMode ? "dark z-[500] fixed" : " z-[500] fixed"}`}>
        <div
          className={`fixed border-primary-450 bg-neutral-900 dark:bg-primary-300 text-primary-200 dark:text-neutral-900 py-4  shadow-lg rounded-md space-y-4 -translate-x-1/2 ]`}
          style={{
            top: `${(position[1] + 30).toString()}px`,
            left: `${(position[0] - 30).toString()}px`,
          }}
        >
          <div
            className="cursor-pointer hover:bg-primary-600 pl-3 pr-8 py-2 mr-3 rounded-r-full font-bold"
            onClick={onEdit}
          >
            Edit
          </div>
          <button
            className="disabled:opacity-30 cursor-pointer hover:bg-primary-600 pl-3 pr-8 py-2 mr-3 rounded-r-full font-bold "
            onClick={onDelete}
            disabled={onDisable}
          >
            Delete
          </button>
        </div>
      </div>
      {show && (
        <div className="fixed z-[400]">
          <Backdrop clickFunction={onClose} opacity={backdropOpacity} />
        </div>
      )}
    </>,
    document.getElementById("menu")
  );
}

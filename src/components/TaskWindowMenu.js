import Backdrop from "./Backdrop";
import * as ReactDOM from "react-dom";
import { useDarkMode } from "../context/DarkModeContext";

const TaskWindowMenu = ({
  onEdit,
  onDelete,
  onClose,
  onDisable = false,
  show,
  backdropOpacity,
  position,
  buttonText,
}) => {
  const { darkMode } = useDarkMode();

  const editFunction = () => {
    onEdit();
    onClose();
  };

  const deleteFunction = () => {
    onDelete();
    onClose();
  };

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
            className="cursor-pointer text-primary-500 hover:text-primary-200 dark:hover:text-neutral-900  pl-3 pr-12 py-2 mr-3  font-bold capitalize whitespace-nowrap"
            onClick={editFunction}
          >
            Edit {buttonText}
          </div>
          <button
            className="disabled:opacity-30 cursor-pointer text-danger-500 hover:text-danger-400 dark:hover:text-danger-600 pl-3 pr-12 py-2 mr-3  font-bold capitalize whitespace-nowrap"
            onClick={deleteFunction}
            disabled={onDisable}
          >
            Delete {buttonText}
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
};

export default TaskWindowMenu;

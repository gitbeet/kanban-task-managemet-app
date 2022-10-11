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
  console.log(position[0], position[1]);

  let posX = `left-[${position[0].toString()}px]`;
  let posY = `top-[${position[1].toString()}px]`;

  return ReactDOM.createPortal(
    <>
      <div className={`${darkMode && "dark"}`}>
        <div
          className={`absolute border-primary-450 bg-neutral-900 dark:bg-primary-300 text-primary-200 dark:text-neutral-900 py-4  shadow-lg rounded-md space-y-4 -translate-x-1/2 z-[1200]`}
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
        <Backdrop
          clickFunction={onClose}
          zIndex="1100"
          opacity={backdropOpacity}
        />
      )}
    </>,
    document.getElementById("menu")
  );
}

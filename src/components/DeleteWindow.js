import Backdrop from "./Backdrop";
import Button from "./Button";
import * as ReactDOM from "react-dom";
import { useDarkMode } from "../context/DarkModeContext";
import { useBoardData } from "../context/BoardDataContext";

export default function DeleteWindow({
  onDelete,
  onCancel,
  name,
  type,
  message,
}) {
  const { darkMode } = useDarkMode();
  const { boards, viewedTask, viewedTaskColumn, currentBoard } = useBoardData();

  const elementName =
    type === "board"
      ? boards.find((board) => board.id === name).name
      : boards
          .find((board) => board.id === currentBoard)
          .columns.find((column) => column.id === viewedTaskColumn)
          .tasks.find((task) => task.id === viewedTask.id).title;
  console.log(viewedTaskColumn);
  return ReactDOM.createPortal(
    <>
      <div className={darkMode ? "dark fixed z-[800]" : " fixed z-[800]"}>
        <div className="fixed  w-[min(90%,350px)] md:w-[550px] bg-neutral-900 dark:bg-primary-300 text-primary-200 dark:text-neutral-900 rounded-md left-1/2 top-1/4 -translate-x-1/2 p-6 space-y-6">
          <div className="text-danger-500 text-lg font-bold">
            Delete this {type}?
          </div>
          <div className="text-sm  leading-7 text-primary-200 dark:text-primary-500">
            Are you sure you want to delete the ‘{elementName}’ {type}
            {message}
          </div>
          <div className="flex flex-col space-y-4">
            <Button onClick={onDelete} type="danger" text="Delete" size="sm" />
            <Button
              onClick={onCancel}
              type="secondary"
              text="Cancel"
              size="sm"
            />
          </div>
        </div>
      </div>
      <div className="fixed z-[700]">
        <Backdrop clickFunction={onCancel} />
      </div>
    </>,
    document.getElementById("menu")
  );
}
